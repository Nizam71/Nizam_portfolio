import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

interface Project {
  project_number: string;
  title: string;
  category: string;
  image: string;
  link: string;
}

const defaultProjects: Project[] = [
  {
    project_number: '01',
    title: 'TYPE MASTER',
    category: 'TYPING SPEED TEST APP',
    image: '/Images/typemaster.png',
    link: 'https://nizam71.github.io/type-master/'
  },
  {
    project_number: '02',
    title: 'TERA 2K26 EEE',
    category: 'COLLEGE EVENT WEBSITE',
    image: '/Images/tera2k26.png',
    link: 'https://nizam71.github.io/TERA_2K26_EEE/'
  },
  {
    project_number: '03',
    title: 'PORTFOLIO V1',
    category: 'PERSONAL WEBSITE',
    image: '/Images/portfolio_v1.png',
    link: '#'
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('project_number', { ascending: true });
        
      if (!error && data && data.length > 0) {
        setProjects(data);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="w-full bg-[#050505] pt-12 pb-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <h2 className="text-[28px] font-bold tracking-widest text-white uppercase">BUILT PROJECTS</h2>
          <a href="#" className="text-[10px] font-semibold text-neutral-400 tracking-[0.2em] hover:text-white transition-colors uppercase">
            VIEW ALL PROJECTS
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.project_number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group block"
            >
              <div className="relative aspect-[16/10] mb-6 overflow-hidden bg-[#111] border-t-2 border-transparent group-hover:border-[#d91b23] transition-all duration-300">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-start pt-2">
                <div className="flex gap-4">
                  <span className="text-[#d91b23] font-['Bebas_Neue'] text-[42px] leading-none mt-0">{project.project_number}</span>
                  <div className="pt-1">
                    <h3 className="text-white font-bold tracking-wider text-[15px] uppercase mb-1">{project.title}</h3>
                    <p className="text-neutral-500 text-[10px] tracking-widest uppercase">{project.category}</p>
                  </div>
                </div>
                <span className="text-neutral-600 group-hover:text-white transition-colors text-xl font-light mt-1">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
