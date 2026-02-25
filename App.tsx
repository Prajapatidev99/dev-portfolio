
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import TerminalMode from './components/TerminalMode';
import { INITIAL_PROJECTS } from './constants';
import { Project } from './types';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load from local storage if available (mocking a DB)
  useEffect(() => {
    const saved = localStorage.getItem('dev_portfolio_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const handleAddProject = (newProject: Project) => {
    const updated = [...projects, newProject];
    setProjects(updated);
    localStorage.setItem('dev_portfolio_projects', JSON.stringify(updated));
  };

  return (
    <div className="relative min-h-screen bg-black selection:bg-white selection:text-black">
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Full-bleed Hero — outside the constrained container */}
      <section id="home">
        <Hero />
      </section>

      <main className="max-w-screen-xl mx-auto px-6 md:px-12">
        <section id="about" className="py-24 md:py-32">
          <About />
        </section>

        <section id="skills" className="py-24 md:py-32">
          <Skills />
        </section>

        <section id="projects" className="py-24 md:py-32">
          <Projects projects={projects} />
        </section>

        <section id="certifications" className="py-24 md:py-32">
          <Certifications />
        </section>

        <section id="contact" className="py-24 md:py-32">
          <Contact />
        </section>
      </main>

      <Footer />
      <TerminalMode />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onAdd={handleAddProject}
      />
    </div>
  );
};

export default App;
