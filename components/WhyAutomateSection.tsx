"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { FileWarning, Banknote, Database, UserMinus, Clock } from 'lucide-react';
const aiChipImage = '/assets/2d1936e5046ea0a97cd33a773ae487e6fea3e13f.png';

export function WhyAutomateSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const updateSticky = () => {
      if (ref.current) {
         const h = ref.current.offsetHeight;
         const wh = window.innerHeight;
         // If section is taller than viewport, stick so that the bottom is visible at the end
         if (h > wh) {
           setStickyTop(wh - h);
         } else {
           setStickyTop(0);
         }
      }
    };
    
    updateSticky();
    window.addEventListener('resize', updateSticky);
    return () => window.removeEventListener('resize', updateSticky);
  }, []);

  const problems = [
    {
      title: "Facturación",
      text: "Facturas que se emiten tarde o mal.",
      icon: FileWarning
    },
    {
      title: "Cobros",
      text: "Cobros que nadie persigue hasta que duele.",
      icon: Banknote
    },
    {
      title: "Conciliación",
      text: "Manual, excels infinitos, datos que no cuadran.",
      icon: Database
    },
    {
      title: "Onboarding",
      text: "Procesos que dependen de que alguien “se acuerde”.",
      icon: UserMinus
    }
  ];

  return (
    <section 
      ref={ref} 
      className="sticky py-24 bg-[rgb(255,255,255)] relative overflow-hidden min-h-screen flex items-center"
      style={{ top: stickyTop }}
    >
      <div className="mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image (AI Chip) */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[800px] flex items-center justify-center">
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="relative w-full h-full flex items-center justify-center"
             >
                {/* Decorative floating particles/petals effect (subtle) */}
                <div className="absolute top-20 left-10 w-2 h-2 bg-[#001156] rounded-full opacity-40 blur-[1px]" />
                <div className="absolute top-40 right-20 w-3 h-3 bg-[#00FFFF] rounded-full opacity-50 blur-[2px]" />
                <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-[#001156] rounded-full opacity-50" />

                <motion.img 
                  src={aiChipImage} 
                  alt="AI Chip" 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-auto max-w-[700px] object-contain drop-shadow-2xl"
                />
             </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="max-w-3xl lg:col-span-7 pl-0 lg:pl-12 pt-10 lg:pt-0 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >

              {/* Title Block */}
              <h2
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                className="text-5xl lg:text-7xl leading-[0.9] text-black mb-8 tracking-tighter"
              >
                Si tu empresa
                crece, el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001156] to-[#05217a] mr-5">caos</span>
                 también.
              </h2>

              <p
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                className="text-gray-500 text-lg lg:text-xl max-w-xl mb-16 leading-relaxed"
              >
                Lo que te frena casi nunca es “marketing” o “ventas”. <br/>
                <span className="text-gray-900 font-medium">Es lo de siempre:</span>
              </p>

              {/* Grid of Problems */}
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
                {problems.map((problem, index) => {
                  const Icon = problem.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1), ease: "easeOut" }}
                      className="group"
                    >
                      <div className="mb-4">
                        <Icon className="w-8 h-8 text-[#001156]" strokeWidth={2} />
                      </div>
                      <h3 
                        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700 }}
                        className="text-lg text-gray-900 mb-2 group-hover:text-[#001156] transition-colors"
                      >
                        {problem.title}
                      </h3>
                      <p 
                        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                        className="text-gray-500 text-sm leading-relaxed"
                      >
                        {problem.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Tagline */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                 <p style={{ fontFamily: 'Roboto, sans-serif' }} className="text-gray-900 font-medium">
                    Eso no es “falta de ganas”. <span className="text-[#001156] font-bold">Es falta de sistema.</span>
                 </p>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
