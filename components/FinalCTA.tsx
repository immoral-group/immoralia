"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="final-cta" ref={ref} className="w-full py-32 px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B80DF] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
          className="mb-6 text-5xl"
        >
          ¿Listo para convertir clics en clientes reales?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
          className="text-gray-600 mb-12 text-lg"
        >
          Tu landing page puede estar online en 5 días
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            className="px-10 py-4 bg-[#3B80DF] text-white rounded-[10px] hover:bg-[#2d6bc7] transition-all duration-300 hover:scale-105 shadow-xl shadow-[#3B80DF]/30"
          >
            Agenda tu café virtual sin compromiso
          </button>
          
          <button
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            className="px-10 py-4 bg-black text-white rounded-[10px] hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Quiero mi landing ya
          </button>
        </motion.div>
      </div>
    </section>
  );
}
