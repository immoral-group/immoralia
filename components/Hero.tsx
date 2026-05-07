"use client";

import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black px-8 py-24 pt-32 relative overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe 
          src='https://my.spline.design/glowingplanetparticles-U6Yx9JQdUtoJxEbBxXOFCMWN/' 
          frameBorder='0' 
          className="w-full h-full"
          title="3D Background Animation"
        />
      </div>
      
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#3B80DF]" />
            <span
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
              className="text-sm text-white"
            >
              Landing Pages de Alto Impacto
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            className="max-w-5xl mx-auto bg-gradient-to-br from-white via-white to-gray-300 bg-clip-text text-transparent drop-shadow-2xl pb-24 xl:pb-64 text-3xl xl:text-6xl"
          >
            Tus anuncios merecen una landing que venda
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
            className="max-w-2xl mx-auto text-gray-300 drop-shadow-lg text-2xl"
          >
            Diseñamos y publicamos páginas 100% enfocadas en conversión para que cada clic cuente.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
              className="group px-10 py-4 bg-[#3B80DF] text-white rounded-[10px] hover:bg-[#2d6bc7] transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
              onClick={() => {
                document.getElementById('plan-precio')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Solicitar presupuesto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
              className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-[10px] hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
              onClick={() => {
                document.getElementById('casos-de-exito')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Ver casos de éxito
            </button>
          </motion.div>
          

        </div>
      </div>
    </section>
  );
}
