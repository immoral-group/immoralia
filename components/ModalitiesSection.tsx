"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { MousePointerClick } from 'lucide-react';
const rightBg = '/assets/31518b987878f01314c7a22d1aca1e6ff8f6f4c2.png';

export function ModalitiesSection() {
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

  return (
    <section 
      id="selector-section" 
      ref={ref} 
      className="sticky w-full flex flex-col lg:flex-row min-h-[85vh]"
      style={{ top: stickyTop }}
    >
      
      {/* Left Column (60%) - Content */}
      <div className="w-full lg:w-[60%] bg-[#001156] px-8 py-20 lg:px-24 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
            <h2 
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}
              className="text-4xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-10"
            >
              Elige tus procesos. <br/>
              Personalízalos. <br/>
              <span className="text-[#00ffff]">Pide implementación.</span>
            </h2>

            <div className="flex flex-col gap-6">
                <p 
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                  className="text-gray-300 text-lg lg:text-xl leading-relaxed"
                >
                  Tenemos un selector de procesos para que puedas solicitar lo que necesitas sin reuniones infinitas.
                </p>
                
                <p 
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                  className="text-gray-300 text-lg lg:text-xl leading-relaxed"
                >
                  Puedes elegir de una lista que vamos ampliando y personalizar cada proceso o podemos hacerlo juntos en una videollamada.
                </p>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 max-w-xl">
                 <p className="text-gray-400 text-sm italic font-light leading-relaxed">
                   “Te pedimos lo mínimo para estimar y arrancar. Y si nos falta contexto, lo resolvemos en el siguiente paso: el diagnóstico.”
                 </p>
            </div>
        </motion.div>
      </div>

      {/* Right Column (40%) - Image + Button */}
      <div className="w-full lg:w-[40%] relative min-h-[500px] lg:min-h-auto flex items-center justify-center p-12 bg-gray-900 overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0">
             <img 
               src={rightBg} 
               alt="Background" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/10" />
         </div>

         <motion.a
            href="https://immoralia.es/procesos"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}
            className="relative z-10 px-8 py-5 bg-white hover:bg-gray-100 text-[#001156] text-xl rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] flex items-center gap-3 transform hover:scale-105 inline-flex"
        >
            <MousePointerClick className="w-6 h-6" />
            Abrir selector de procesos
        </motion.a>
      </div>

    </section>
  );
}
