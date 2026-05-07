"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

export function CreativeMotionCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleContact = () => {
    window.location.href = 'mailto:contacto@immoralia.com';
  };

  return (
    <section id="final-cta" ref={ref} className="w-full py-24 lg:py-64 px-8 bg-black relative overflow-hidden">
      {/* Background Spline 3D */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://my.spline.design/retrofuturisticcircuitloop-0QZmfxZrMQyAXdNt9RzlI1Vi/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="w-full h-full relative z-0"
          title="Spline 3D Background"
        />
        {/* Overlay to ensure text legibility - pointer-events-none so it doesn't block iframe interaction */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
      </div>

      <div className="max-w-4xl mx-auto relative z-20 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            className="text-[30px] lg:text-[50px] text-white mb-8 leading-tight"
          >
            Si quieres orden operativo, <br/>
            <span className="text-[#00ffff]">empieza por un proceso.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto">
            <a
              href="https://procesos.immoralia.es/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 100 }}
              className="group px-8 py-4 bg-[#00ffff] hover:bg-[#03e0da] text-black text-lg rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(59,128,223,0.3)] hover:shadow-[0_0_40px_rgba(59,128,223,0.5)] flex items-center gap-3"
            >
              Ir al selector de procesos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button
              onClick={handleContact}
              className="px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white rounded-xl transition-all duration-300 flex items-center gap-3 hover:bg-white/5"
            >
              <Mail className="w-5 h-5" />
              Contáctanos
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-500 text-sm font-light"
        >
          O si prefieres, escríbenos y lo planteamos contigo en diagnóstico.
        </motion.p>
      </div>
    </section>
  );
}