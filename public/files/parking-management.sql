-- Advanced Database Systems -- 1st Assignment
-- Todor Ovidiu-Razvan
-- Smart parking management database on PostgreSQL (Neon cloud).
--
-- Everything in one file: schema, data, indexing experiments,
-- execution plan comparisons, and the concurrency demos. All
-- EXPLAIN outputs pasted below the queries are the actual results
-- I got from running on Neon (via SQLTools in VS Code, and the
-- Neon web SQL editor for the two-session demo). Where the result
-- surprised me or contradicted my expectations, I left a note.



-- ============================ SCHEMA ============================

CREATE TABLE Owners (
    owner_id    SERIAL PRIMARY KEY,
    full_name   VARCHAR(100) NOT NULL,
    phone       VARCHAR(20),
    email       VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Vehicles (
    vehicle_id      SERIAL PRIMARY KEY,
    license_plate   VARCHAR(20) UNIQUE NOT NULL,
    brand           VARCHAR(50),
    model           VARCHAR(50),
    color           VARCHAR(30),
    owner_id        INT NOT NULL REFERENCES Owners(owner_id) ON DELETE CASCADE
);

CREATE TABLE ParkingZones (
    zone_id     SERIAL PRIMARY KEY,
    zone_name   VARCHAR(50) NOT NULL,
    level       VARCHAR(10)
);

-- spot_number was VARCHAR(10) in my first draft. I had to widen it
-- once I started generating 500 spots per zone ("Zone A-0001" is 11
-- chars), so it lives at VARCHAR(20) now.
CREATE TABLE ParkingSpots (
    spot_id     SERIAL PRIMARY KEY,
    zone_id     INT NOT NULL REFERENCES ParkingZones(zone_id),
    spot_number VARCHAR(20) NOT NULL,
    spot_type   VARCHAR(20) CHECK (spot_type IN ('standard','disabled','electric','compact')),
    status      VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available','occupied','reserved'))
);

CREATE TABLE Reservations (
    reservation_id  SERIAL PRIMARY KEY,
    vehicle_id      INT NOT NULL REFERENCES Vehicles(vehicle_id),
    spot_id         INT NOT NULL REFERENCES ParkingSpots(spot_id),
    start_time      TIMESTAMP NOT NULL,
    end_time        TIMESTAMP NOT NULL,
    status          VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','cancelled','completed')),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- duration_min is a generated column -- I never insert it directly.
CREATE TABLE ParkingSessions (
    session_id      SERIAL PRIMARY KEY,
    vehicle_id      INT NOT NULL REFERENCES Vehicles(vehicle_id),
    spot_id         INT NOT NULL REFERENCES ParkingSpots(spot_id),
    entry_time      TIMESTAMP NOT NULL DEFAULT NOW(),
    exit_time       TIMESTAMP,
    duration_min    INT GENERATED ALWAYS AS (
                        EXTRACT(EPOCH FROM (exit_time - entry_time)) / 60
                    ) STORED
);

CREATE TABLE Payments (
    payment_id      SERIAL PRIMARY KEY,
    session_id      INT REFERENCES ParkingSessions(session_id),
    reservation_id  INT REFERENCES Reservations(reservation_id),
    amount          NUMERIC(8,2) NOT NULL,
    paid_at         TIMESTAMP DEFAULT NOW(),
    method          VARCHAR(20) CHECK (method IN ('cash','card','app'))
);



-- ============================ DATA ==============================
-- Population sizes were picked so the indexing tests in the next
-- section would actually show something. With 50 rows per table the
-- planner just does Seq Scan everywhere; with the volumes below it
-- starts making interesting choices. Final counts after this block:
-- 5,000 owners, 10,000 vehicles, 10 zones, 5,000 spots, 50,000
-- reservations, 100,000 sessions, 100,000 payments.

TRUNCATE TABLE Payments, ParkingSessions, Reservations,
               ParkingSpots, ParkingZones, Vehicles, Owners
        RESTART IDENTITY CASCADE;

INSERT INTO Owners (full_name, phone, email)
SELECT 'Owner ' || g,
       '07' || LPAD((g % 100000000)::text, 8, '0'),
       'owner' || g || '@example.com'
FROM generate_series(1, 5000) AS g;

INSERT INTO Vehicles (license_plate, brand, model, color, owner_id)
SELECT
    'TM-' || LPAD(g::text, 6, '0') || '-' ||
        chr(65 + (g % 26)) || chr(65 + ((g / 26) % 26)) || chr(65 + ((g / 676) % 26)),
    (ARRAY['Dacia','VW','Renault','Ford','Skoda','Hyundai','Toyota','BMW','Audi','Mercedes',
           'Opel','Peugeot','Seat','Fiat','Nissan','Honda','Mazda','Kia','Volvo','Tesla'])[1 + (g % 20)],
    (ARRAY['Logan','Golf','Clio','Focus','Octavia','i30','Yaris','3 Series','A4','C-Class'])[1 + (g % 10)],
    (ARRAY['White','Black','Red','Blue','Silver','Grey','Green','Yellow','Orange'])[1 + (g % 9)],
    1 + (g % 5000)
FROM generate_series(1, 10000) AS g;

INSERT INTO ParkingZones (zone_name, level)
SELECT 'Zone ' || chr(64 + g),
       CASE g % 4 WHEN 0 THEN 'Ground' WHEN 1 THEN 'Level 1'
                  WHEN 2 THEN 'Level 2' ELSE 'Basement' END
FROM generate_series(1, 10) AS g;

INSERT INTO ParkingSpots (zone_id, spot_number, spot_type, status)
SELECT
    z.zone_id,
    z.zone_name || '-' || LPAD(s::text, 4, '0'),
    CASE s % 4 WHEN 0 THEN 'standard' WHEN 1 THEN 'compact'
               WHEN 2 THEN 'disabled' ELSE 'electric' END,
    CASE s % 3 WHEN 0 THEN 'available' WHEN 1 THEN 'occupied'
                                       ELSE 'reserved' END
FROM ParkingZones z CROSS JOIN generate_series(1, 500) AS s;

-- Reservations and sessions use RANDOM() for the timestamps. A
-- side-effect I only noticed later: some rows end up with
-- end_time < start_time. That bites me twice in the concurrency
-- section -- once in the overlap check, once when I try to add the
-- GiST exclusion constraint. I fix it there, not here.
INSERT INTO Reservations (vehicle_id, spot_id, start_time, end_time, status)
SELECT
    1 + (g % 10000),
    1 + (g % 5000),
    NOW() - (INTERVAL '1 hour' * ((RANDOM() * 1440)::INT)),
    NOW() - (INTERVAL '1 hour' * ((RANDOM() * 1440)::INT))
          + (INTERVAL '1 hour' * (1 + (RANDOM() * 5)::INT)),
    (ARRAY['active','completed','cancelled'])[1 + (g % 3)]
FROM generate_series(1, 50000) AS g;

INSERT INTO ParkingSessions (vehicle_id, spot_id, entry_time, exit_time)
SELECT
    1 + (g % 10000),
    1 + (g % 5000),
    NOW() - (INTERVAL '1 minute' * ((RANDOM() * 129600)::INT)),
    NOW() - (INTERVAL '1 minute' * ((RANDOM() * 129600)::INT))
          + (INTERVAL '1 minute' * (15 + (RANDOM() * 465)::INT))
FROM generate_series(1, 100000) AS g;

INSERT INTO Payments (session_id, amount, method)
SELECT s.session_id,
       ROUND((5 + RANDOM() * 45)::NUMERIC, 2),
       (ARRAY['cash','card','app'])[1 + ((s.session_id) % 3)]
FROM ParkingSessions s;

-- Refresh stats so the planner sees the new row counts.
ANALYZE;

SELECT 'Owners'           AS table_name, COUNT(*) FROM Owners
UNION ALL SELECT 'Vehicles',         COUNT(*) FROM Vehicles
UNION ALL SELECT 'ParkingZones',     COUNT(*) FROM ParkingZones
UNION ALL SELECT 'ParkingSpots',     COUNT(*) FROM ParkingSpots
UNION ALL SELECT 'Reservations',     COUNT(*) FROM Reservations
UNION ALL SELECT 'ParkingSessions',  COUNT(*) FROM ParkingSessions
UNION ALL SELECT 'Payments',         COUNT(*) FROM Payments;
-- Got exactly the expected counts.



-- ====================== INDEXING  (point b) =====================
-- PostgreSQL ships six index types: B-tree, Hash, GIN, GiST,
-- SP-GiST, BRIN. I focus on B-tree because that is what 90%+ of
-- queries on this schema benefit from, and then add a BRIN
-- experiment on a timestamp column for contrast. Hash, GIN and
-- SP-GiST do not really fit this workload (no full-text, no
-- arrays/JSONB, no exotic data types), so I only mention them.
-- GiST shows up later in the concurrency bonus.
--
-- For each B-tree scenario I run the same EXPLAIN twice -- once
-- with no index, once after CREATE INDEX -- and compare buffers
-- and execution time.


-- --- Scenario 1: lookup by a foreign key on a 100k-row table ---

DROP INDEX IF EXISTS idx_sessions_vehicle_id;

EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM ParkingSessions WHERE vehicle_id = 5000;
-- Seq Scan on parkingsessions  (cost=0.00..2084.00 rows=10 width=32)
--   Filter: (vehicle_id = 5000)
--   Rows Removed by Filter: 99990
--   Buffers: shared read=834
-- Planning Time: 3.501 ms / Execution Time: 121.706 ms
--
-- 834 pages from disk to find 10 rows. Worst case.

CREATE INDEX idx_sessions_vehicle_id ON ParkingSessions(vehicle_id);

EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM ParkingSessions WHERE vehicle_id = 5000;
-- Bitmap Heap Scan on parkingsessions
--   Heap Blocks: exact=10
--   Buffers: shared hit=10 read=2
-- ->  Bitmap Index Scan on idx_sessions_vehicle_id
--         Buffers: shared read=2
-- Execution Time: 0.291 ms
--
-- 121.7 ms -> 0.29 ms, about 418x faster, 834 reads -> 4. The
-- planner picked a Bitmap (rather than plain Index Scan) because it
-- expected ~10 rows scattered across the heap and wanted to read
-- them in physical order to avoid random I/O.


-- --- Scenario 2: filter that matches 1/3 of the table -------------------------------------
-- This one is meant to show that an index does not always help.

DROP INDEX IF EXISTS idx_spots_status;

EXPLAIN (ANALYZE, BUFFERS)
SELECT spot_id, spot_number, zone_id
FROM ParkingSpots WHERE status = 'available';
-- Seq Scan on parkingspots ... rows=1660
-- Buffers: shared read=42
-- Execution Time: 9.797 ms

CREATE INDEX idx_spots_status ON ParkingSpots(status);
ANALYZE ParkingSpots;

EXPLAIN (ANALYZE, BUFFERS)
SELECT spot_id, spot_number, zone_id
FROM ParkingSpots WHERE status = 'available';
-- First run after CREATE INDEX (cache was warm from the baseline):
--   Bitmap Heap Scan ... Heap Blocks: exact=42
--   Buffers: shared hit=42 read=3
--   Execution Time: 0.718 ms
-- That looked like a 13x speed-up. It is not -- the buffers say
-- "hit=42", everything was in cache from the previous query.
--
-- I re-ran the same query a few times to separate cache from index
-- effects:
--    Run | Cache         | Buffers          | Exec
--    ----+---------------+------------------+-----
--     1  | cold, no idx  | read=42          |  9.8 ms
--     2  | warm, with idx| hit=42 read=3    |  0.7 ms
--     3  | cold, with idx| read=45          |  8.8 ms
--     4  | warm          | hit=45           |  0.5 ms
-- Cold runs ~9 ms either way, warm runs ~0.5-0.7 ms either way.
-- The index made no real difference; the cache made all of it.
-- Neon drops the buffer pool after a few seconds of idle, which is
-- why I got cold runs at all in the middle of testing.
--
-- The reason the index does not help: a Bitmap Heap Scan with
-- Heap Blocks: exact=42 still ends up reading every single one of
-- the 42 heap pages. The index is doing index work for nothing.
-- B-tree pays off when you can prune the heap; not here.


-- --- Scenario 3: composite index, multi-column filter --------------------------------------------

DROP INDEX IF EXISTS idx_reservations_spot_time;

EXPLAIN (ANALYZE, BUFFERS)
SELECT reservation_id, vehicle_id, start_time, end_time
FROM Reservations
WHERE spot_id   = 1234
  AND start_time < NOW()
  AND end_time   > NOW() - INTERVAL '7 days';
-- Seq Scan on reservations
-- Rows Removed by Filter: 49998   (so only 2 rows match)
-- Buffers: shared read=500
-- Execution Time: 333.654 ms

CREATE INDEX idx_reservations_spot_time
    ON Reservations(spot_id, start_time, end_time);

EXPLAIN (ANALYZE, BUFFERS)
SELECT reservation_id, vehicle_id, start_time, end_time
FROM Reservations
WHERE spot_id   = 1234
  AND start_time < NOW()
  AND end_time   > NOW() - INTERVAL '7 days';
-- Index Scan using idx_reservations_spot_time on reservations
-- Buffers: shared hit=2 read=3
-- Execution Time: 0.137 ms
--
-- 333.7 ms -> 0.137 ms, about 2,400x. This is the best case for a
-- composite B-tree: leading column matches an equality predicate
-- (spot_id = 1234), the rest match range predicates, so the index
-- can walk straight to the answer.


-- --- BRIN on a timestamp ---------------------------------------------------------
-- BRIN stores min/max per block range (128 pages by default), so
-- it is much smaller than B-tree but only works when the column is
-- naturally ordered on disk. Want to see how it compares to B-tree
-- on the same column.

EXPLAIN (ANALYZE, BUFFERS)
SELECT COUNT(*) FROM ParkingSessions
WHERE entry_time >= NOW() - INTERVAL '24 hours';
-- No index, cold:
--   Seq Scan ... rows=1094 (~1% of the table)
--   Buffers: shared read=834
--   Execution Time: 140.991 ms

CREATE INDEX idx_sessions_entry_time_btree ON ParkingSessions(entry_time);
EXPLAIN (ANALYZE, BUFFERS)
SELECT COUNT(*) FROM ParkingSessions
WHERE entry_time >= NOW() - INTERVAL '24 hours';
-- With B-tree:
--   Index Only Scan using idx_sessions_entry_time_btree
--   Heap Fetches: 0
--   Buffers: shared hit=7 read=2
--   Execution Time: 0.256 ms
-- "Index Only Scan" + Heap Fetches=0 is the best possible plan:
-- the COUNT comes entirely from the index, the table is not even
-- touched. About 550x faster.

DROP INDEX idx_sessions_entry_time_btree;
CREATE INDEX idx_sessions_entry_time_brin
    ON ParkingSessions USING BRIN (entry_time);

EXPLAIN (ANALYZE, BUFFERS)
SELECT COUNT(*) FROM ParkingSessions
WHERE entry_time >= NOW() - INTERVAL '24 hours';
-- With BRIN:
--   Seq Scan on parkingsessions
--   Buffers: shared hit=834
--   Execution Time: 10.325 ms
--
-- The planner ignored the BRIN index entirely. This is exactly what
-- I should have expected once I thought about it: my entry_time
-- values came out of RANDOM(), so every 128-page range has rows
-- spanning the whole 90-day window. min/max summaries cannot rule
-- out any range, so BRIN has nothing to prune.
--
-- BRIN is for INSERT-only time-series workloads (logs, telemetry,
-- audit trails) where the column is monotonically growing. My
-- random seed is the opposite of that. Lesson learned: BRIN
-- behaviour is a property of the data layout, not the index itself.

-- Size comparison anyway, since this is the other reason to use BRIN.
CREATE INDEX idx_sessions_entry_time_btree ON ParkingSessions(entry_time);
SELECT indexname,
       pg_size_pretty(pg_relation_size(indexname::regclass)) AS size
FROM pg_indexes
WHERE tablename = 'parkingsessions'
  AND indexname IN ('idx_sessions_entry_time_btree',
                    'idx_sessions_entry_time_brin');
-- idx_sessions_entry_time_brin   ->   24 kB
-- idx_sessions_entry_time_btree  -> 2000 kB
-- ~83x difference. On a 100k-row table this is nothing; on a real
-- time-series of 100M+ rows it is the difference between 24 MB and
-- 2 GB of disk.

DROP INDEX IF EXISTS idx_sessions_entry_time_btree;
DROP INDEX IF EXISTS idx_sessions_entry_time_brin;

-- One more index that the next sections will rely on. I deliberately
-- do NOT add an index on Vehicles.license_plate -- the UNIQUE
-- constraint already created a B-tree for it.
CREATE INDEX IF NOT EXISTS idx_vehicles_owner_id ON Vehicles(owner_id);



-- ===================== EXECUTION PLANS  (point c) ===================
-- Two pairs of logically-equivalent queries. The first pair should
-- collapse to the same plan; the second pair should diverge.


-- --- Pair A: EXISTS vs IN. Same plan expected -----------------------
-- Question: which owners own at least one Tesla?

EXPLAIN (ANALYZE, BUFFERS)
SELECT o.owner_id, o.full_name
FROM Owners o
WHERE EXISTS (
    SELECT 1 FROM Vehicles v
    WHERE v.owner_id = o.owner_id AND v.brand = 'Tesla'
);
-- Hash Semi Join  (cost=219.25..335.56 rows=500 width=14)
--   Hash Cond: (o.owner_id = v.owner_id)
--   ->  Seq Scan on owners o
--   ->  Hash -> Seq Scan on vehicles v
--               Filter: brand = 'Tesla' (Rows Removed: 9500)
-- Buffers: shared read=135
-- Execution Time: 28.631 ms

EXPLAIN (ANALYZE, BUFFERS)
SELECT o.owner_id, o.full_name
FROM Owners o
WHERE o.owner_id IN (
    SELECT owner_id FROM Vehicles WHERE brand = 'Tesla'
);
-- Hash Semi Join  (cost=219.25..335.56 rows=500 width=14)
--   Hash Cond: (o.owner_id = vehicles.owner_id)
--   ->  Seq Scan on owners o
--   ->  Hash -> Seq Scan on vehicles
--               Filter: brand = 'Tesla' (Rows Removed: 9500)
-- Buffers: shared hit=135
-- Execution Time: 1.487 ms
--
-- The plans are identical -- same operator (Hash Semi Join), same
-- cost number to the second decimal (219.25..335.56), same row
-- estimate. The 19x runtime difference is purely the cache (read=135
-- on the cold first run vs hit=135 on the warm second run).
-- PostgreSQL rewrites both EXISTS and single-column IN into a Semi
-- Join internally, so the syntax does not matter here.


-- --- Pair B: scalar subquery vs LEFT JOIN. Different plans expected ---------------------------
-- Question: for each owner with id <= 100, how many vehicles?

EXPLAIN (ANALYZE, BUFFERS)
SELECT o.owner_id, o.full_name,
       (SELECT COUNT(*) FROM Vehicles v
          WHERE v.owner_id = o.owner_id) AS vehicle_count
FROM Owners o
WHERE o.owner_id <= 100
ORDER BY o.owner_id;
-- Index Scan using owners_pkey on owners o (cost=0.28..21311.53)
--   SubPlan 1
--     ->  Aggregate
--           ->  Seq Scan on vehicles v
--                 Filter: (owner_id = o.owner_id)
--                 Rows Removed by Filter: 9998
-- Buffers: shared hit=8803
-- Execution Time: 55.558 ms
--
-- That SubPlan node runs once for every outer owner -- 100 times --
-- and each run scans the entire vehicles table (10k rows). So this
-- query examines about 1,000,000 rows to produce 100 rows of output.

EXPLAIN (ANALYZE, BUFFERS)
SELECT o.owner_id, o.full_name, COUNT(v.vehicle_id) AS vehicle_count
FROM Owners o
LEFT JOIN Vehicles v ON v.owner_id = o.owner_id
WHERE o.owner_id <= 100
GROUP BY o.owner_id, o.full_name
ORDER BY o.owner_id;
-- Sort
--   ->  HashAggregate
--         ->  Hash Right Join
--               ->  Seq Scan on vehicles v (rows=10000)
--               ->  Hash -> Index Scan owners_pkey (rows=100)
-- Buffers: shared hit=94
-- Execution Time: 1.836 ms
--
-- Same answer, completely different shape. One Seq Scan of Vehicles,
-- one index scan of Owners, a hash join, one HashAggregate. About
-- 30x faster.
--
-- The reason PostgreSQL does not collapse B1 into B2 automatically:
-- a scalar subquery in the SELECT list returns at most one row per
-- outer row, which is a stronger guarantee than a join provides.
-- The planner cannot prove the two are equivalent and so it does
-- not rewrite. The lesson is that an obvious-looking correlated
-- subquery can be many times slower than the equivalent join, and
-- the optimizer will not save you.



-- ====================== CONCURRENCY  (point d) ======================
-- Two demos. The first one fits in a single session and shows the
-- locking primitives (FOR UPDATE, NOWAIT, SKIP LOCKED, pg_locks).
-- The second one needs two real sessions and demonstrates the
-- classic double-booking race condition. A small bonus at the end
-- shows the database-level prevention using an exclusion constraint.


-- --- Part 1: lock primitives in one session -------------------------------------------

-- Before locking anything, my own session is holding nothing:
SELECT locktype, relation::regclass AS rel, mode, granted, pid
FROM pg_locks
WHERE locktype IN ('relation','tuple','transactionid')
  AND pid = pg_backend_pid();
-- Just one row: AccessShareLock on pg_locks (the read lock this
-- very query takes). No data locks held. Baseline.

-- Now I open a transaction and grab spot 100 with FOR UPDATE:
BEGIN;
SELECT spot_id, spot_number, status
FROM ParkingSpots WHERE spot_id = 100
FOR UPDATE;
-- 100 | Zone J-0010 | occupied

-- And re-check pg_locks WHILE the transaction is still open:
SELECT locktype, relation::regclass AS rel, mode, granted, pid
FROM pg_locks
WHERE pid = pg_backend_pid()
  AND locktype IN ('relation','tuple','transactionid');
-- Now I see 5 rows:
--   relation       | pg_locks            | AccessShareLock  | t
--   relation       | parkingspots        | RowShareLock     | t
--   relation       | parkingspots_pkey   | RowShareLock     | t
--   relation       | idx_spots_status    | RowShareLock     | t
--   transactionid  | NULL                | ExclusiveLock    | t
--
-- The interesting two are the RowShareLock on parkingspots (which
-- lets other readers in but blocks other FOR UPDATEs on that row)
-- and the ExclusiveLock on the transaction id (other transactions
-- that need to wait for this one queue on this lock).
--
-- Something I half-expected to see but did not: a row of locktype
-- 'tuple'. Reading the docs afterwards I learned that PostgreSQL
-- writes the per-row lock directly into the row header (the xmax
-- field) and only materialises a tuple entry in pg_locks when
-- there is actual contention. There is none right now, so no
-- tuple lock shows up. Part 2 changes that.

ROLLBACK;

-- NOWAIT: fail immediately if the row is locked. Useful for UIs
-- that should not freeze.
BEGIN;
SELECT spot_id FROM ParkingSpots WHERE spot_id = 100 FOR UPDATE NOWAIT;
-- Right now nobody is holding it, so this just succeeds and returns
-- spot_id=100. If somebody else were holding it the error would be
-- "could not obtain lock on row in relation parkingspots".
ROLLBACK;

-- SKIP LOCKED: ignore rows somebody else has locked. The
-- canonical use is a work queue: every worker grabs the next free
-- row instead of waiting.
BEGIN;
SELECT spot_id, spot_number
FROM ParkingSpots
WHERE status = 'available'
ORDER BY spot_id LIMIT 5
FOR UPDATE SKIP LOCKED;
-- 21 | Zone A-0003
-- 22 | Zone B-0003
-- 23 | Zone C-0003
-- 24 | Zone D-0003
-- 25 | Zone E-0003
-- (ids 21-25 because my seed sets every third row to 'available'
--  by s%3.)
ROLLBACK;


-- --- Part 2: two real sessions, the double-booking race -------------------------------------
--
-- One catch I hit while building this: SQLTools reuses the same
-- Postgres backend connection across all its tabs. I confirmed it
-- by running SELECT pg_backend_pid() in two separate SQLTools tabs
-- and getting the same number both times. That means a BEGIN in
-- one tab "leaks" into the other -- they are not separate sessions.
--
-- The workaround is to use the Neon web SQL editor as the second
-- session. That spawns a different backend (different PID), so it
-- behaves as an independent client. So:
--   TAB A = this file in SQLTools
--   TAB B = Neon web (https://console.neon.tech)
--
-- Second catch: even in TAB A, SQLTools auto-commits any BEGIN
-- once the executed batch finishes. So I cannot do BEGIN in one
-- Cmd+E, FOR UPDATE in another, hoping the lock will persist
-- between executions -- it will not. Trick: keep TAB A holding
-- the lock by using pg_sleep() inside the same transaction.

DELETE FROM Reservations WHERE spot_id = 100 AND start_time > NOW();

-- TAB A: this whole block runs as one transaction. Total wall-clock
-- time ~20 s, during which TAB B has a window to try the same
-- FOR UPDATE and observe it blocking.
BEGIN;
SELECT spot_id, spot_number, status
FROM ParkingSpots WHERE spot_id = 100
FOR UPDATE;
SELECT pg_sleep(20);
INSERT INTO Reservations (vehicle_id, spot_id, start_time, end_time, status)
VALUES (1, 100,
        NOW() + INTERVAL '1 hour',
        NOW() + INTERVAL '3 hours',
        'active');
COMMIT;
-- What I saw: TAB A stayed "Running..." for ~20 seconds. Meanwhile
-- I switched to Neon web and ran a matching BEGIN + SELECT ... FOR
-- UPDATE on spot 100. Neon also went to "Running...". It stayed
-- there until the moment TAB A reached COMMIT, then it returned
-- the row immediately. Exactly the serialisation behaviour I
-- expected -- two transactions reduced to one at a time on this
-- specific row.

-- TAB B's query (run in Neon web AFTER B's SELECT returned):
--
--   SELECT EXISTS (
--       SELECT 1 FROM Reservations
--       WHERE spot_id   = 100
--         AND status    = 'active'
--         AND start_time < NOW() + INTERVAL '4 hours'
--         AND end_time   > NOW() + INTERVAL '2 hours'
--   ) AS conflict_exists;
--
-- Result: t (true). TAB A inserted a 1h-3h reservation, TAB B is
-- proposing a 2h-4h one, those overlap. The application would now
-- ROLLBACK and tell the user the spot is taken.
--
-- One small gotcha: I originally wrote the overlap check with
-- tsrange(...) && tsrange(...). Neon refused with
--   ERROR: range lower bound must be less than or equal to range
--   upper bound
-- because my random seed produced some reservations with
-- end_time < start_time. The two-comparison form above (a < d AND
-- c < b) is mathematically the same overlap test and side-steps
-- the bad data.

DELETE FROM Reservations WHERE spot_id = 100 AND start_time > NOW();


----- Bonus: exclusion constraint -- the DB enforces the rule ---------------------
-- The Part 2 demo only works if every booking transaction
-- remembers to do FOR UPDATE first. Application code can forget.
-- A safer design pushes the rule into the database itself with
-- an exclusion constraint using a GiST index.

-- I cannot create the constraint immediately because the random
-- seed has two problems:
--   (a) some active rows have end_time < start_time, which makes
--       tsrange() blow up during the index build;
--   (b) many existing active rows already overlap each other on
--       the same spot, which the constraint refuses to allow.
-- Both are noise from the random seed, not real bookings. The
-- pragmatic fix is to mark all current 'active' rows as
-- 'cancelled' so the partial index starts from an empty set, and
-- then the constraint enforces the rule for every future INSERT.
UPDATE Reservations SET status = 'cancelled'
WHERE status = 'active' AND start_time > end_time;
-- 8,247 rows updated (the inverted-timestamp rows).

UPDATE Reservations SET status = 'cancelled'
WHERE status = 'active';
-- 8,421 more updated (the remaining active rows, which all had
-- random overlaps).

CREATE EXTENSION IF NOT EXISTS btree_gist;

-- The constraint reads as: no two active rows may share a spot_id---------------------------------
-- AND have overlapping [start_time, end_time) intervals.
ALTER TABLE Reservations
    ADD CONSTRAINT no_overlap_per_spot
    EXCLUDE USING GIST (
        spot_id WITH =,
        tsrange(start_time, end_time) WITH &&
    )
    WHERE (status = 'active');

-- First insert -- nothing else on spot 200, should succeed.-------------------------------------------
INSERT INTO Reservations (vehicle_id, spot_id, start_time, end_time, status)
VALUES (1, 200,
        NOW() + INTERVAL '10 hours',
        NOW() + INTERVAL '12 hours',
        'active');
-- INSERT 0 1

-- Second insert overlaps the first one on the same spot. The
-- database itself refuses it:
INSERT INTO Reservations (vehicle_id, spot_id, start_time, end_time, status)
VALUES (2, 200,
        NOW() + INTERVAL '11 hours',
        NOW() + INTERVAL '13 hours',
        'active');
-- ERROR: conflicting key value violates exclusion constraint
--        "no_overlap_per_spot"
--
-- This is the part I find most satisfying about PostgreSQL. The
-- application code did not run a single check. The DB rejected the
-- write. There is no race window where two clients can both pass
-- a check and both insert -- the index serialises the write.

DELETE FROM Reservations WHERE spot_id = 200 AND start_time > NOW();
ALTER TABLE Reservations DROP CONSTRAINT no_overlap_per_spot;
-- I keep the btree_gist extension installed; it is harmless.



-- ============================== NOTES ==============================
-- A few things worth mentioning that the EXPLAINs above already
-- show but are easy to miss:
--
-- - The biggest performance wins come from indexes that are
--   actually selective. B-tree on vehicle_id gave 418x, the
--   composite (spot_id, start_time, end_time) gave 2,400x. B-tree
--   on status (only 3 distinct values, ~33% match) gave nothing.
--
-- - Cache state on Neon is unreliable for benchmarking. The buffer
--   pool gets dropped after a few seconds of idle, so the same
--   query can take 0.6 ms or 9 ms depending on whether the data is
--   in shared_buffers. The honest number is the cold one, and the
--   only reliable evidence is the Buffers line, not Execution Time.
--
-- - BRIN is impressive on paper (24 kB vs 2 MB) but useless on
--   randomly-distributed data. It is purely a tool for append-only
--   time-ordered workloads.
--
-- - The optimizer happily normalises EXISTS into IN (same plan) but
--   refuses to rewrite a correlated scalar subquery into a join
--   (30x slowdown left as is). The shape of the SQL still matters.
--
-- - The strongest concurrency guarantee in PostgreSQL is not
--   FOR UPDATE in application code, it is an exclusion constraint
--   pushed into the database itself.
