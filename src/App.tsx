import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
