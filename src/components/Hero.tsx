import { motion } from 'motion/react';
import { Globe, Plus } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-center pt-24 pb-0">
      {/* Background PORTFOLIO text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 mt-10">
        <h1 className="text-[34vw] font-['Bebas_Neue'] text-[#5e0a0f] leading-none tracking-tighter select-none scale-y-125">
          PORTFOLIO
        </h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-0 h-full min-h-[700px]">
        {/* Left Content */}
        <div className="lg:col-span-4 flex flex-col justify-center pb-20 order-2 lg:order-1 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-['Caveat'] text-[42px] text-white mb-2 tracking-wide">Hello, I'm</p>
            <h2 className="text-[80px] lg:text-[110px] font-['Bebas_Neue'] text-white leading-[0.8] tracking-normal mb-4 scale-y-110 origin-left">
              SHAIK<br/>MAHAMMAD<br/>NIZAM
            </h2>
            <h3 className="text-[#d91b23] font-bold tracking-widest text-[15px] uppercase leading-snug">
              WEB DESIGNER &<br/>FULL STACK DEVELOPER
            </h3>
            <p className="text-neutral-400 text-[13px] mt-6 leading-relaxed max-w-[320px]">
              I design and build stylish, user-focused web experiences that combine creativity with strategy. Passionate about clean design, smooth interactions, and details that make a difference.
            </p>
            <div className="flex items-center gap-3 mt-10 text-[#666] text-xs tracking-widest uppercase font-semibold">
              <Globe size={16} className="text-[#d91b23]" />
              AVAILABLE WORLDWIDE
            </div>
          </motion.div>
        </div>

        {/* Center Image */}
        <div className="lg:col-span-6 relative flex justify-center items-end h-[600px] lg:h-[800px] order-1 lg:order-2 self-end">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.7 }}
             className="relative z-10 w-full max-w-[650px] h-full flex items-end"
           >
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-20 h-full w-full bottom-0" style={{ background: 'linear-gradient(to top, #050505 0%, transparent 20%)' }}></div>
             <img 
               src="/Images/portfolio.png" 
               alt="Shaik Mahammad Nizam" 
               className="w-full h-full object-contain object-bottom transition-all duration-700 hover:scale-105"
             />
           </motion.div>
           
           {/* Floating element */}
           <motion.a 
             href="#projects"
             animate={{ y: [0, -10, 0] }}
             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
             className="group absolute top-[25%] -right-4 lg:-right-16 flex items-center gap-4 bg-transparent p-3 rounded-full z-30 cursor-pointer"
           >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm group-hover:border-[#d91b23] transition-colors">
                <Plus size={18} className="text-white" />
              </div>
              <p className="text-[11px] text-neutral-400 max-w-[140px] leading-relaxed hidden md:block group-hover:text-white transition-colors">
                Turning ideas<br/>into powerful<br/>digital experiences.
              </p>
           </motion.a>
        </div>

        {/* Right Stats */}
        <div className="lg:col-span-2 flex flex-row lg:flex-col gap-10 justify-end pb-20 order-3 w-full lg:w-auto relative z-20 items-start lg:items-end lg:pr-8">
          <Stat number="3+" label="YEARS OF B.TECH" />
          <Stat number="10+" label="PROJECTS COMPLETED" />
          <Stat number="100%" label="PASSION & DEDICATION" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6 text-center lg:text-left"
    >
      <div className="text-[44px] font-['Bebas_Neue'] text-[#d91b23] tracking-wider leading-none mt-1">{number}</div>
      <div className="text-[10px] text-neutral-400 tracking-widest uppercase leading-snug mt-1 max-w-[90px]">{label}</div>
    </motion.div>
  );
}
