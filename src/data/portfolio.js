// ============================================================================
//  PORTFOLIO CONTENT  —  edit everything from this one file.
//  (Components just render what's here.)
// ============================================================================

// Prefixes a path inside /public with the correct base URL so links work
// both locally and on GitHub Pages (any repo name). Use for images/demos/files.
export const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

// ----------------------------------------------------------------------------
//  LINKS  —  ⬇️  EDIT THESE  ⬇️
// ----------------------------------------------------------------------------
export const links = {
  email: "razvantdf@gmail.com",
  phone: "+40 746 346 466",
  phoneHref: "tel:+40746346466",
  location: "Timișoara, Romania",
  github: "https://github.com/RazvanTDF",

  linkedin: "https://www.linkedin.com/in/razvantodor16/",

  // 👉 Paste the YouTube demo link for the Bachelor's thesis here.
  //    While empty (""), the "Demo" button on that project stays hidden.
  thesisYoutube: "", // ← e.g. "https://youtu.be/XXXXXXXX"
};

// ----------------------------------------------------------------------------
//  PROFILE
// ----------------------------------------------------------------------------
export const profile = {
  name: "Ovidiu Răzvan Todor",
  shortName: "Răzvan Todor",
  initials: "RT",
  title: "Entry-Level Software Developer",
  subtitle: "Backend & Full-Stack",
  location: links.location,
  // 👉 Optional profile photo. Save your headshot to: public/images/profile.jpg
  //    If the file isn't there, the site automatically falls back to the "RT" monogram.
  photo: "images/profile.jpg",
  // rotating words in the hero
  roles: ["Backend Developer", "Full-Stack Engineer", "Java + Spring Boot", "Problem Solver"],
  summary:
    "Computer Science graduate with hands-on experience in Java, Python and full-stack web development. I build production-style applications — most recently a professional Java Academy (Savnet × 3Pillar) covering Java Core, OOP, SOLID and Spring Boot. Comfortable across REST APIs, relational & NoSQL databases and modern frontend frameworks. I also bring a creative side: branding, front-end design and photo/video work for real projects. Currently pursuing an M.Sc. in Digital Media & Web Development.",
  aboutExtra:
    "I like the whole arc of a feature — designing the data model, writing the service that holds the business rules, exposing a clean REST API, then putting a usable interface in front of it. My favourite recent work leans backend and database-heavy (Spring Boot services, query optimization, concurrency control), but my design background means I care about how the end result looks and feels, not just whether it returns 200.",
};

// flat list for the scrolling tech ticker
export const techTicker = [
  "Java", "Spring Boot", "Hibernate", "Python", "Django", "FastAPI",
  "JavaScript", "React", "Vite", "Node.js", "Express", "TailwindCSS",
  "PostgreSQL", "MongoDB", "Neon", "REST API", "JWT", "Git",
  "Docker", "Postman", "spaCy", "Ollama", "Azure", "SQL",
];

// ----------------------------------------------------------------------------
//  SKILLS
// ----------------------------------------------------------------------------
export const skillGroups = [
  {
    id: "languages",
    icon: "code",
    title: "Languages",
    items: [
      "Java — OOP, Streams, Lambdas, Records (professional training)",
      "Python (projects)",
      "JavaScript (projects)",
      "SQL",
      "C / C++ / C# (academic)",
    ],
  },
  {
    id: "backend",
    icon: "server",
    title: "Backend",
    items: [
      "Spring Boot (Spring Web + Spring Data)",
      "Hibernate ORM",
      "Node.js · Express.js",
      "Django · FastAPI",
      "REST API design",
      "JWT Authentication",
    ],
  },
  {
    id: "frontend",
    icon: "layout",
    title: "Frontend",
    items: ["React.js", "Vite", "HTML5 · CSS3", "TailwindCSS (projects)", "Angular (intro)"],
  },
  {
    id: "databases",
    icon: "database",
    title: "Databases",
    items: [
      "PostgreSQL — indexing, query optimization, concurrency control",
      "MongoDB (NoSQL CRUD & schema design)",
      "Neon (cloud Postgres)",
    ],
  },
  {
    id: "tools",
    icon: "tool",
    title: "Tools & Platforms",
    items: ["Git · GitHub", "Postman", "SourceTree", "Docker", "Ollama (local LLM)"],
  },
  {
    id: "cloud",
    icon: "cloud",
    title: "Cloud",
    items: ["Microsoft Azure — cloud infrastructure (intro)"],
  },
  {
    id: "concepts",
    icon: "brain",
    title: "Concepts & AI",
    items: [
      "OOP · SOLID · Clean Code",
      "Design Patterns",
      "Multithreading",
      "Unit Testing",
      "NLP / spaCy",
      "LLM integration",
    ],
  },
  {
    id: "design",
    icon: "palette",
    title: "Design / Creative",
    items: [
      "Branding & brand boards",
      "UI / visual design",
      "Photo & video editing",
      "Meta Business Suite",
      "Social media content management",
      "Multilingual front-end menus",
    ],
  },
];

// ----------------------------------------------------------------------------
//  EXPERIENCE
// ----------------------------------------------------------------------------
export const experience = [
  {
    role: "Full-Stack Trainee",
    company: "Haufe Group / AC Labs",
    location: "Timișoara",
    period: "Mar 2025 – Jun 2025",
    context:
      'Liga AC LABS · "Product-First Development" lab · edition XVI (31 Mar – 13 Jun 2025)',
    bullets: [
      "Completed a structured full-stack training program, building a web application end-to-end from concept to deployment.",
      "Developed a React.js frontend and a Node.js / Express.js backend with JWT-based authentication.",
      "Designed and managed a MongoDB database — NoSQL CRUD operations and schema design.",
      "Used Git & GitHub for version control throughout the project lifecycle.",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Git"],
    image: "certificates/haufe-aclabs-diploma.jpg",
    imageLabel: "Haufe / Liga AC LABS — participation diploma",
  },
  {
    role: "Software Developer Intern",
    company: "DAFIO Digital",
    location: "Dumbrăvița",
    period: "Jul 2024 – Aug 2024",
    context: "University practice · Practicum Certificate (Atestat de Practică)",
    bullets: [
      "Built a support-ticket management application with a C# REST API and an HTML/CSS/JavaScript frontend.",
      "Tested API endpoints with Postman; used Git and SourceTree for version control.",
      "Completed the mandatory university practicum and certification.",
    ],
    tags: ["C#", "REST API", "JavaScript", "Postman", "SourceTree"],
  },
];

// ----------------------------------------------------------------------------
//  PROJECTS  (featured: true => wide hero card)
// ----------------------------------------------------------------------------
export const projects = [
  {
    id: "parking",
    name: "Cloud-Based Smart Parking Management System",
    kind: "Advanced Databases · M.Sc. (2025)",
    featured: true,
    accent: "Database engineering",
    blurb:
      "A relational database for parking operations in a shopping-center context (inspired by Iulius Town Timișoara), delivered as a single, heavily-commented SQL script on PostgreSQL (Neon cloud). Built as a serious study of indexing, the query planner, and concurrency — not just a schema.",
    highlights: [
      "Schema: Owners, Vehicles, ParkingZones, ParkingSpots, Reservations, ParkingSessions, Payments — realistic foreign keys and time-based attributes.",
      "Indexing strategies analysed (B-tree primarily; reviewed Hash, GiST, GIN) and benchmarked queries with vs. without indexes, accounting for caching effects.",
      "Execution plans compared with EXPLAIN / EXPLAIN ANALYZE — logically equivalent queries, plus same-result queries with similar vs. different optimizer behaviour.",
      "Concurrency & locking demonstrated via competing transactions reserving the same spot for overlapping intervals (BEGIN/COMMIT/ROLLBACK, isolation, double-booking prevention).",
    ],
    tags: ["PostgreSQL", "SQL", "Neon", "Indexing", "EXPLAIN ANALYZE", "Concurrency"],
    links: [{ type: "sql", label: "View SQL script", href: "files/parking-management.sql" }],
  },
  {
    id: "thesis",
    name: "Transporte del Futuro",
    kind: "Bachelor's Thesis · Jan – Jun 2025",
    featured: true,
    accent: "Full-stack + NLP automation",
    blurb:
      "A full-stack app that automates transport-offer processing: it pulls offer emails via the Gmail API, extracts journey data (destination, weight, remarks) with spaCy NLP, and estimates pricing through the Google Routes API.",
    highlights: [
      "Backend: Python + Django + PostgreSQL; Frontend: React + Vite, with JWT authentication.",
      "Gmail API integration for automated email retrieval and parsing.",
      "spaCy NLP pipeline to extract structured journey data from unstructured email text.",
      "Google Routes API for distance- and route-based price estimation.",
    ],
    tags: ["Django", "Python", "PostgreSQL", "React", "Vite", "spaCy / NLP", "Google APIs", "JWT"],
    links: [
      { type: "github", label: "GitHub", href: "https://github.com/RazvanTDF/Licenta" },
      // YouTube button auto-added from links.thesisYoutube when set
    ],
  },
  {
    id: "trr",
    name: "TRR — Tutor, Reviewer & Refactor",
    kind: "Hackathon · 2025",
    accent: "Local-first AI tooling",
    blurb:
      "A local-first web app for automated code review and refactoring that combines deterministic heuristics with a local LLM (Ollama — qwen2.5, llama3). Fully on-device and privacy-focused: nothing leaves the machine.",
    highlights: [
      "Backend: Python + FastAPI · Frontend: HTML + TailwindCSS + JavaScript.",
      "Multi-language detection with syntax highlighting.",
      "Custom review rules via JSON / YAML upload, plus token & cost tracking.",
    ],
    tags: ["FastAPI", "Python", "Ollama", "LLM", "TailwindCSS", "Privacy-first"],
    links: [
      { type: "demo", label: "Live demo", href: "demos/trr.html" },
      { type: "github", label: "GitHub", href: "https://github.com/RazvanTDF/HaufeInternship2025" },
    ],
  },
  {
    id: "bookrental",
    name: "BookRental",
    kind: "Java Academy capstone · 2025–2026",
    accent: "Enterprise-style Spring Boot",
    blurb:
      "A library rental system built end-to-end as the Java Academy project: a Java 21 + Spring Boot 3 REST backend with PostgreSQL, Hibernate, layered architecture, scheduled jobs and async email.",
    highlights: [
      "Clean layered architecture (Controller → Service → Mapper → Repository → Entity) with DTOs at the boundary.",
      "Rental status workflow (PENDING → IN_PROGRESS → FINISHED / DELAYED / CANCELED) with validated transitions.",
      "Cron schedulers, async SMTP email (@Async), pagination/search, and two-level validation.",
    ],
    tags: ["Java 21", "Spring Boot 3", "Spring Data JPA", "Hibernate", "PostgreSQL", "Docker"],
    links: [{ type: "demo", label: "Project page", href: "demos/bookrental.html" }],
    note: "Source code private — developed under a training organization.",
  },
  {
    id: "fsadd",
    name: "FSADD — Budget Wishlist App",
    kind: "Full-stack project",
    accent: "Real-time MERN",
    blurb:
      "A full-stack app for managing wishes on a budget: add products, track spending, share lists via link/QR, and get real-time notifications when a friend buys you a gift.",
    highlights: [
      "React 19 + TypeScript + Vite frontend; Node.js + Express + MongoDB backend.",
      "Real-time updates with Socket.IO; JWT auth; charts with Recharts.",
      "Budget tracking with sub-cost breakdowns, sharing/QR, and light/dark mode.",
    ],
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
    links: [{ type: "demo", label: "Live demo", href: "demos/fsadd.html" }],
  },
  {
    id: "ar-tourist",
    name: "AR Tourist",
    kind: "Interactive concept · Timișoara",
    accent: "AI + AR concept",
    blurb:
      "An interactive flow demo for an augmented-reality tourism app: point your camera at a historic Timișoara landmark to recognise it, then ask questions by voice or text and get spoken answers powered by an LLM (Gemini).",
    highlights: [
      "Camera-based landmark recognition with rich, layered information cards.",
      "Voice/text Q&A over recognised landmarks, with a map and a 'discovered' collection.",
      "Designed as a clickable, auto-playing product flow / prototype.",
    ],
    tags: ["Concept", "AR", "LLM / Gemini", "UX flow", "JavaScript"],
    links: [{ type: "demo", label: "Interactive demo", href: "demos/ar-tourist.html" }],
  },
];

// ----------------------------------------------------------------------------
//  CREATIVE / DESIGN
// ----------------------------------------------------------------------------
export const creative = [
  {
    id: "fortaleza",
    name: "Fortaleza 1786",
    kind: "Restaurant menu & social media",
    status: "Live · ongoing",
    blurb:
      "A multilingual digital menu I built and deployed for a family restaurant in the Basque Country — and an ongoing real-world responsibility: I run the restaurant's social media end-to-end.",
    points: [
      "Responsive, multilingual front-end menu, deployed on GitHub Pages.",
      "Content planning & scheduling via Meta Business Suite.",
      "Photo & video editing for posts.",
    ],
    tags: ["Front-end", "Multilingual UI", "Responsive", "Meta Business Suite", "Photo/Video"],
    links: [
      { type: "live", label: "Live site", href: "https://razvantdf.github.io/fortaleza-1786/" },
      { type: "github", label: "GitHub", href: "https://github.com/RazvanTDF/fortaleza-1786" },
    ],
    // gradient used for the card header since there's no single hero image
    gradient: "from-amber-500/25 via-orange-500/10 to-transparent",
    emoji: "🍽️",
  },
  {
    id: "fitly",
    name: "FITLY — Brand Identity",
    kind: "University project · case study",
    status: "Brand board",
    blurb:
      'A complete brand board for "FITLY — Outfits in a snap," a virtual-wardrobe app concept: logo system, palette, typography and social templates.',
    points: [
      "Logo system, colour palette and a full typography system (display: Brasika SemiCondensed; UI: Roboto, Poppins, Satoshi).",
      "Social-media post templates and imagery / mood direction.",
      "Design-system thinking applied to a product concept.",
    ],
    tags: ["Brand identity", "Visual design", "Design systems", "Social creative"],
    image: "images/fitly-brand-board.jpg",
    imageLabel: "FITLY — full brand board",
    emoji: "👗",
  },
];

// ----------------------------------------------------------------------------
//  AI  —  the "working with AI" frame
// ----------------------------------------------------------------------------
export const ai = {
  kicker: "How I work with AI",
  title: "AI is a force-multiplier in my workflow — not a substitute for understanding.",
  intro:
    "I've used AI on essentially every recent project, and I'm deliberate about how. It speeds me up on the parts that are about velocity — scaffolding, debugging, learning a new framework — while I stay the author of the architecture and the one who understands every line that ships. I also build products that integrate AI directly, from local LLMs to NLP pipelines.",
  workflow: {
    heading: "AI in my process",
    points: [
      { t: "Faster prototyping", d: "Spin up boilerplate and explore approaches quickly, then refine and own the result." },
      { t: "Debugging partner", d: "Rubber-duck tricky bugs and edge cases, validate the fix myself before committing." },
      { t: "Learning accelerator", d: "Get up to speed on new frameworks and patterns (Spring Boot, Django) far faster." },
      { t: "Review & refactor", d: "Use AI for a second opinion on readability and structure — I make the call on what to keep." },
    ],
  },
  building: {
    heading: "AI I've actually built with",
    points: [
      { t: "Local LLMs — Ollama", d: "qwen2.5 & llama3 powering on-device code review in TRR (privacy-first, nothing leaves the machine)." },
      { t: "NLP — spaCy", d: "Extracting structured journey data from unstructured emails in my Bachelor's thesis." },
      { t: "LLM Q&A — Gemini", d: "Voice/text answers over recognised landmarks in the AR Tourist concept." },
      { t: "Data Analytics with AI", d: "T8X course applying Python + AI to data analytics workflows." },
    ],
  },
  closing:
    "Bottom line: I treat AI like any other powerful tool — I know what it's good at, where it's wrong, and I take responsibility for the code. Happy to talk through exactly how I used it on any project below.",
};

// ----------------------------------------------------------------------------
//  CERTIFICATIONS
// ----------------------------------------------------------------------------
export const certifications = {
  featured: {
    title: "Java Academy — Certificate of Completion",
    issuer: "Savnet Training Center · sponsored by 3Pillar",
    badge: "Featured credential",
    meta: [
      "104 hours (theory + practice)",
      "Certificate No. SAV-26-26",
      "3 Nov 2025 – 18 May 2026",
      "Partner of Cisco Networking Academy",
    ],
    blurb:
      "A professional Java program that maps directly onto modern backend work — and ties straight into the Haufe trainee experience. Accompanied by a detailed Certificate of Acquired Competencies (Supplement SAV-26/18-05-2026).",
    modules: [
      {
        name: "Module 1 — Java Core & OOP",
        items:
          "JDK/JRE/JVM · classes & objects · inheritance · polymorphism · abstract classes & interfaces · collections (List/Set/Map) · exceptions · packages · SOLID · enums · generics · design patterns · threads · unit testing · Streams/Optional/Records",
      },
      {
        name: "Module 2 — Java Web with Spring Boot",
        items:
          "Java 8+ features · REST web services · Spring Boot (Web + Data) · Hibernate ORM · PostgreSQL · Git repos & organizations · Postman · intro to Angular",
      },
    ],
    evaluation: "Two exams with technical and integration exercises.",
    images: [
      { src: "certificates/java-academy-completion.jpg", label: "Certificate of Completion" },
      { src: "certificates/java-academy-competencies-1.jpg", label: "Acquired Competencies — p.1" },
      { src: "certificates/java-academy-competencies-2.jpg", label: "Acquired Competencies — p.2" },
    ],
  },
  additional: [
    {
      title: "Introduction to Cloud Infrastructure (Microsoft Azure)",
      issuer: "T8X",
      meta: "15 Jan – 6 Mar 2026 · Seria T8X nr 1054",
      image: "certificates/t8x-cloud-azure.jpg",
    },
    {
      title: "Software Application Testing: Web, API & Automated Testing",
      issuer: "T8X",
      meta: "15 Jan – 6 Mar 2026 · Seria T8X nr 1002",
      image: "certificates/t8x-software-testing.jpg",
    },
    {
      title: "Data Analytics using Python and AI",
      issuer: "T8X",
      meta: "15 Jan – 6 Mar 2026 · Seria T8X nr 516",
      image: "certificates/t8x-data-analytics.jpg",
    },
    {
      title: "Empowering Citizens — International Workshop",
      issuer: "Politehnica University of Timișoara × HGUt Bryne",
      meta: "Oct 2023 · Certificate of Appreciation · Timișoara 2023",
      image: "certificates/empowering-citizens.jpg",
    },
  ],
};

// ----------------------------------------------------------------------------
//  EDUCATION
// ----------------------------------------------------------------------------
export const education = [
  {
    degree: "M.Sc. Digital Media and Web Development",
    school: "Politehnica University of Timișoara",
    period: "2025 – 2027",
    detail: "Field: Computer Science",
    current: true,
  },
  {
    degree: "B.Sc. Computer Science",
    school: "Politehnica University of Timișoara",
    period: "2022 – 2025",
    detail: "Thesis: Transporte del Futuro — full-stack automation app (Django, React, PostgreSQL, NLP)",
  },
  {
    degree: "High School Diploma — Natural Sciences, Intensive English",
    school: 'National College "Mircea Eliade"',
    period: "2018 – 2022",
    detail: "",
  },
];

// ----------------------------------------------------------------------------
//  LANGUAGES & INTERESTS
// ----------------------------------------------------------------------------
export const languages = [
  { name: "Romanian", level: "Native", pct: 100 },
  { name: "English", level: "B2 — Upper Intermediate", pct: 75 },
  { name: "Spanish", level: "A2 — actively improving", pct: 35 },
];

export const interests = {
  headline: "Photography",
  text: "Photography is the thread that runs through my creative work — it's what drives the photo/video editing and visual-design side, and it trains the eye I bring to UI and branding.",
};

// ----------------------------------------------------------------------------
//  NAV
// ----------------------------------------------------------------------------
export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "creative", label: "Creative" },
  { id: "ai", label: "AI" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
