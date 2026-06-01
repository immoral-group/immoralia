"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Search, FileCode, Hammer, ShieldCheck, BookOpen, HeadphonesIcon } from 'lucide-react';

export function HowWeWorkSection() {
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
    
    // Initial check and on resize
    updateSticky();
    window.addEventListener('resize', updateSticky);
    return () => window.removeEventListener('resize', updateSticky);
  }, []);

  const phases = [
    {
      number: "01",
      title: "Diagnóstico",
      description: "Entendemos tu flujo, herramientas y puntos de dolor.",
      icon: Search,
    },
    {
      number: "02",
      title: "Blueprint",
      description: "Diseñamos la arquitectura de datos y reglas de negocio.",
      icon: FileCode,
    },
    {
      number: "03",
      title: "Implementación",
      description: "Conectamos APIs, webhooks y bases de datos.",
      icon: Hammer,
    },
    {
      number: "04",
      title: "Testing & QA",
      description: "Pruebas de estrés y validación de casos borde.",
      icon: ShieldCheck,
    },
    {
      number: "05",
      title: "Handover",
      description: "Entrega de documentación técnica y formación.",
      icon: BookOpen,
    },
    {
      number: "06",
      title: "Soporte",
      description: "Monitoreo proactivo y ajustes post-lanzamiento.",
      icon: HeadphonesIcon,
    }
  ];

  return (
    <section 
      id="method-section" 
      ref={ref} 
      className="sticky py-32 bg-[#001156] relative overflow-hidden"
      style={{ top: stickyTop }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Animated Grid */}
         <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
            animate={{
              backgroundPosition: ["0px 0px", "60px 60px"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
         />
         
         {/* Floating Glows */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ffff]/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00ffff]/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
         
         {/* Vignette for depth */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#001156] via-transparent to-[#001156]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 px-6">
        
        {/* Header */}
        <div className="mb-24 max-w-2xl mx-auto text-center">
           <motion.h2
             initial={{ opacity: 0, y: 20 }}
             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
             transition={{ duration: 0.6 }}
             style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
             className="text-4xl lg:text-6xl text-white mb-6 leading-tight"
           >
             Cómo lo hacemos
           </motion.h2>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-[#00ffff] text-lg lg:text-4xl font-light"
           >
             (para que salga bien)
           </motion.p>
        </div>

        {/* Timeline Container - Flex Column for Staircase Layout */}
        <div className="relative flex flex-col gap-12 md:gap-0">
          
          {/* Central Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ffff] via-gray-500/30 to-gray-900 md:-translate-x-1/2" />

          {phases.map((phase, index) => {
            const isEven = index % 2 === 0;
            const PhaseIcon = phase.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`
                  relative flex flex-col justify-center w-full md:w-1/2
                  pl-12 md:pl-0
                  ${isEven 
                    ? 'md:self-start md:items-end md:pr-16 md:text-right' 
                    : 'md:self-end md:items-start md:pl-16 md:text-left'}
                `}
              >
                 {/* 
                    Connection Elements Container 
                    Positioned relative to the Item, but aligned to the Central Line.
                 */}
                 
                 {/* Horizontal Connector Line */}
                 <div 
                   className={`
                     absolute h-px bg-[#00ffff]/50
                     top-1/2 -translate-y-1/2
                     left-0 w-12 
                     ${isEven ? 'md:left-auto md:right-0 md:w-16' : 'md:left-0 md:w-16'}
                   `}
                 />

                 {/* Dot on Main Line */}
                 <div 
                   className={`
                     absolute w-4 h-4 bg-[#001156] border-2 border-[#00ffff] rounded-full z-20
                     top-1/2 -translate-y-1/2
                     ${isEven 
                        ? 'left-[-8px] md:left-auto md:right-[-8px]' 
                        : 'left-[-8px]' 
                     }
                   `}
                 >
                   <div className="absolute inset-0 bg-[#00ffff] opacity-80 blur-[2px] rounded-full" />
                 </div>

                 {/* Card */}
                 <div className="relative bg-[#000829]/80 backdrop-blur-sm border border-[#00ffff]/20 p-2 pr-8 rounded-3xl flex flex-row items-stretch gap-6 w-full max-w-lg group hover:border-[#00ffff]/50 hover:bg-[#000f3d] transition-all duration-500 z-10 shadow-lg shadow-[#001156]/50">
                    
                    {/* Tab - Always on Left */}
                    <div className="bg-[#001156] rounded-2xl w-14 flex flex-col items-center justify-center py-4 flex-shrink-0 border border-[#00ffff]/10 group-hover:bg-[#00ffff]/10 transition-colors">
                       <span 
                         className="text-[#00ffff] text-base font-thin uppercase tracking-widest" 
                         style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                       >
                          PASO {phase.number}
                       </span>
                    </div>

                    <div className="py-6 pr-4 flex flex-col justify-center text-left">
                       <div className="flex items-center gap-3 mb-3">
                          <PhaseIcon className="w-5 h-5 text-gray-400 group-hover:text-[#00ffff] transition-colors" />
                          <h3 
                            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                            className="text-white text-2xl"
                          >
                            {phase.title}
                          </h3>
                       </div>
                       
                       <p className="text-gray-400 text-sm leading-relaxed text-left">
                          {phase.description}
                       </p>
                    </div>
                 </div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
