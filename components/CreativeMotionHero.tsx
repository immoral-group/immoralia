"use client";

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function CreativeMotionHero() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black px-8 py-24 pt-32 relative overflow-hidden">
      {/* Background with subtle 3D gradient */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a1525] to-black" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3B80DF]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#3B80DF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
          <div className="absolute inset-0">
            <iframe
              src="https://my.spline.design/chainmailbackground-2LQjItRQ3u5x7o6hj8SDw2QP/"
              frameBorder="0"
              className="w-full h-full"
              title="3D Chain Mail Background"
            />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl w-full mx-auto relative z-10 pointer-events-none">
        <div className="flex flex-col items-center text-center space-y-8">
          
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-white via-white to-gray-300 bg-clip-text text-transparent drop-shadow-2xl text-4xl xl:text-7xl xl:leading-18"
          >
            Anuncios en 3D que transforman la forma de publicitar tu marca
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
            className="max-w-3xl mx-auto text-gray-300 drop-shadow-lg text-xl xl:text-1xl leading-relaxed"
          >
            Creamos piezas visuales dinámicas en 3D, potenciadas con inteligencia artificial, para marcas que buscan diferenciarse, generar impacto y mejorar su rendimiento en campañas digitales.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="pt-4 flex justify-center"
        >
          <button
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            className="group px-12 py-5 bg-[#3B80DF] text-white rounded-[10px] hover:bg-[#2d6bc7] transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center shadow-2xl shadow-[#3B80DF]/50 text-lg pointer-events-auto"
            onClick={() => {
              document.getElementById('final-cta')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            Solicita cotización
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
