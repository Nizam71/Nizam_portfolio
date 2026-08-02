import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 pointer-events-auto"
      >
        <div className="w-8 h-8 rounded-sm bg-white text-black font-['Bebas_Neue'] flex items-center justify-center text-xl leading-none">
          N
        </div>
        <span className="font-['Bebas_Neue'] text-xl tracking-widest uppercase">Nizam</span>
      </motion.div>
    </header>
  );
}
