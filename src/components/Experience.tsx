import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Lightbulb, PenTool, Code, Rocket, LucideIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Skill {
  name: string;
}

interface Process {
  step_number: number;
  icon_name: string;
  title: string;
  description: string;
}

const defaultSkills = [
  'WEB DESIGN', 'UI/UX DESIGN', 'REACT', 'HTML/CSS', 
  'JAVASCRIPT', 'TAILWIND CSS', 'NODE.JS', 'TYPESCRIPT',
  'FULL STACK', 'GITHUB'
];

const getIcon = (name: string): LucideIcon => {
  switch (name) {
    case 'Search': return Search;
    case 'Lightbulb': return Lightbulb;
    case 'PenTool': return PenTool;
    case 'Code': return Code;
    case 'Rocket': return Rocket;
    default: return Search;
  }
};

const defaultProcesses = [
  { icon_name: 'Search', title: 'DISCOVER', desc: 'Understanding goals, audience, and project requirements.' },
  { icon_name: 'Lightbulb', title: 'IDEATE', desc: 'Planning, wireframing, and creating the right concept.' },
  { icon_name: 'PenTool', title: 'DESIGN', desc: 'Crafting visual design with a focus on user experience.' },
  { icon_name: 'Code', title: 'DEVELOP', desc: 'Building fast, responsive, and high-performing websites.' },
  { icon_name: 'Rocket', title: 'DELIVER', desc: 'Testing, optimizing, and launching with perfection.' },
];

export default function Experience() {
  const [skills, setSkills] = useState<string[]>(defaultSkills);
  const [processes, setProcesses] = useState(defaultProcesses);

  useEffect(() => {
    const fetchExperienceData = async () => {
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('name')
        .order('id', { ascending: true });
        
      if (!skillsError && skillsData && skillsData.length > 0) {
        setSkills(skillsData.map(s => s.name));
      }

      const { data: processData, error: processError } = await supabase
        .from('processes')
        .select('*')
        .order('step_number', { ascending: true });
        
      if (!processError && processData && processData.length > 0) {
        setProcesses(processData.map(p => ({
          icon_name: p.icon_name,
          title: p.title,
          desc: p.description
        })));
      }
    };
    
    fetchExperienceData();
  }, []);

  return (
    <section className="w-full bg-[#050505] py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* Left Column: Education & Skills */}
        <div className="lg:col-span-4 flex flex-col gap-12 lg:pr-12">
          <div>
            <h2 className="text-[22px] font-bold tracking-widest text-white uppercase mb-10">EDUCATION & SKILLS</h2>
            
            <h3 className="text-[#d91b23] text-[11px] tracking-widest uppercase mb-6 font-bold">EDUCATION</h3>
            <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-6">
              <div>
                <h4 className="text-white font-medium mb-1 tracking-wide text-sm">B.Tech, Third Year</h4>
                <p className="text-neutral-500 text-xs">Undergraduate Degree</p>
              </div>
              <span className="text-[#d91b23] text-[15px] font-['Bebas_Neue'] tracking-wider mt-1">PRESENT</span>
            </div>
            
            <div className="flex justify-between items-start border-b border-white/5 pb-6 mb-8">
              <div>
                <h4 className="text-white font-medium mb-1 tracking-wide text-sm">Full Stack Development</h4>
                <p className="text-neutral-500 text-xs">Self-Taught & Practical Exp.</p>
              </div>
              <span className="text-[#d91b23] text-[15px] font-['Bebas_Neue'] tracking-wider mt-1">ONGOING</span>
            </div>
          </div>

          <div>
            <h3 className="text-[#d91b23] text-[11px] tracking-widest uppercase mb-6 font-bold">SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span 
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-[6px] text-[10px] font-medium text-neutral-400 border border-neutral-800 rounded-sm hover:border-[#d91b23] hover:text-white transition-colors cursor-default tracking-widest bg-transparent"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Work Process */}
        <div className="lg:col-span-4 lg:col-start-6">
           <h2 className="text-[22px] font-bold tracking-widest text-white uppercase mb-10">WORK PROCESS</h2>
           <div className="relative border-l border-neutral-800 ml-6 space-y-12 pb-4">
             {processes.map((proc, idx) => (
               <motion.div 
                 key={proc.title}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ delay: idx * 0.1, duration: 0.5 }}
                 className="relative pl-12 group"
               >
                 <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#050505] border border-neutral-800 group-hover:border-[#d91b23] flex items-center justify-center transition-colors duration-300">
                   {(() => {
                     const Icon = getIcon(proc.icon_name);
                     return <Icon size={12} className="text-neutral-500 group-hover:text-[#d91b23] transition-colors duration-300" />;
                   })()}
                 </div>
                 <div className="absolute -left-12 top-0 text-[#d91b23] font-['Bebas_Neue'] text-[28px] leading-none transition-colors duration-300">0{idx + 1}</div>
                 <h4 className="text-[#d91b23] font-bold text-[11px] tracking-widest uppercase mb-2 transition-colors duration-300 pt-1">{proc.title}</h4>
                 <p className="text-neutral-400 text-xs leading-relaxed max-w-[220px]">{proc.desc}</p>
               </motion.div>
             ))}
           </div>
        </div>

        {/* Right Column: Quote Block */}
        <div className="lg:col-span-3 lg:col-start-10 mt-12 lg:mt-0 relative h-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#5c0b11] p-10 h-[105%] absolute -top-[5%] w-[110%] -right-[5%] flex flex-col justify-between"
          >
            <div>
              <span className="text-6xl text-white/30 font-serif leading-none block mb-6">“</span>
              <p className="text-white text-[17px] font-light leading-relaxed">
                Good design<br/>is not just how<br/>it looks, but how<br/>it works.
              </p>
            </div>
            <div className="pt-12">
              <p className="font-['Caveat'] text-5xl text-white mb-10 opacity-90 tracking-wide">Nizam</p>
              <div className="text-white/60 text-[10px] tracking-[0.25em] uppercase font-bold leading-loose border-t border-white/10 pt-8 flex flex-col">
                LET'S CREATE<br/>SOMETHING GREAT<br/>TOGETHER.
                <span className="text-xl text-[#d91b23] mt-8 block">+</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
