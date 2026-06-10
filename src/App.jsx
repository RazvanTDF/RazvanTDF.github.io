import { useReveal } from "./hooks/useReveal.js";
import { LightboxProvider } from "./components/Lightbox.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Creative from "./components/Creative.jsx";
import AISection from "./components/AISection.jsx";
import Certifications from "./components/Certifications.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  useReveal();

  return (
    <LightboxProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Creative />
        <AISection />
        <Certifications />
        <Education />
        <Contact />
      </main>

      <Footer />
    </LightboxProvider>
  );
}
