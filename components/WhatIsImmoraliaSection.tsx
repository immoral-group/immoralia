"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { FileText, Zap, ShieldCheck, Users } from 'lucide-react';
// Image import removed as requested, replaced by iframe

export function WhatIsImmoraliaSection() {
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

  const deliverables = [
    { text: "Mapa del proceso + documentación (SOP)", icon: FileText },
    { text: "Automatización implementada y testeada", icon: Zap },
    { text: "Alertas, logs, control y mantenimiento", icon: ShieldCheck },
    { text: "Handover y formación para tu equipo", icon: Users }
  ];

  return (
    <section 
      ref={ref} 
      className="sticky py-32 relative bg-black overflow-hidden flex flex-col justify-center min-h-[800px]"
      style={{ top: stickyTop }}
    >
      
      {/* Background Iframe */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none" />
         <iframe 
           src="https://kinescope.io/embed/a1vKbe1foMwUuc3TrnxZgQ" 
           allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" 
           frameBorder="0" 
           allowFullScreen 
           className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full min-h-full h-[56.25vw] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-auto"
           title="Kinescope Video"
         ></iframe>
      </div>

      <div className="relative z-20 max-w-3xl px-6 w-full text-left ml-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h2
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 800 }}
            className="text-[36px] lg:text-[52px] mb-8 text-[#001156] leading-[1.1] tracking-tight"
          >
            Somos tu equipo de automatización <br/>
            <span className="text-[#00ffff]">(sin postureo)</span>
          </h2>
          <p 
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
            className="text-gray-900 text-base lg:text-xl leading-relaxed max-w-3xl mb-12"
          >
            Immoralia es la división técnica de Immoral dedicada a documentar e implementar automatizaciones. Nos sentamos contigo, entendemos el proceso, lo convertimos en un flujo claro y lo dejamos funcionando.
          </p>

           {/* Static Grid (formerly Carousel) */}
           <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
             {deliverables.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 bg-white/5 border border-[#001156]/10 backdrop-blur-md px-6 py-4 rounded-xl hover:border-[#001156]/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00ffff]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#001156] transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-[#001156] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span 
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                    className="text-[#001156] text-base"
                  >
                    {item.text}
                  </span>
                </div>
             ))}
           </div>
        </motion.div>
      </div>

    </section>
  );
}
