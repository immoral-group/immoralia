"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Eye, Layers, MessageCircle, Sparkles, Zap } from 'lucide-react';

export function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    { 
      icon: Eye, 
      title: "Diferenciación visual inmediata",
      description: "Destaca entre la saturación de anuncios planos"
    },
    { 
      icon: Layers, 
      title: "Versatilidad para múltiples canales",
      description: "Optimizado para cada plataforma y formato"
    },
    { 
      icon: MessageCircle, 
      title: "Narrativa inmersiva y memorable",
      description: "Cuenta historias que conectan con tu audiencia"
    },
    { 
      icon: Sparkles, 
      title: "Mayor percepción de innovación",
      description: "Posiciona tu marca como líder tecnológico"
    },
    { 
      icon: Zap, 
      title: "Engagement elevado desde el primer segundo",
      description: "Captura atención y genera acción"
    }
  ];

  return (
    <section ref={ref} className="w-full py-12 xl:py-32 px-8 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1 flex justify-center"
          >
            <div className="relative w-full max-w-md bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-200" style={{ aspectRatio: '9/16' }}>
              {/* Kinescope Video Embed - Vertical Format */}
              <iframe 
                src="https://kinescope.io/embed/hr5uPutwivH74ggdvBKhqX" 
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" 
                frameBorder="0" 
                allowFullScreen
                className="w-full h-full"
                title="Creative Motion Ad Example"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#3B80DF]/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-black/5 rounded-full blur-2xl" />
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -right-4 px-6 py-3 bg-[#3B80DF] rounded-full shadow-2xl shadow-[#3B80DF]/40 border border-white/20"
            >
              <p style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }} className="text-white text-sm">
                Anuncio real
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Benefits */}
          <div className="space-y-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              
              <h2
                style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
                className="text-4xl xl:text-5xl text-black mb-6"
              >
                Impacto visual que se traduce en resultados
              </h2>
            </motion.div>

            <div className="space-y-6 pt-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#3B80DF]/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#3B80DF] to-[#2d6bc7] rounded-xl flex items-center justify-center shadow-lg shadow-[#3B80DF]/30">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3
                          style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
                          className="text-lg text-black group-hover:text-[#3B80DF] transition-colors duration-300"
                        >
                          {benefit.title}
                        </h3>
                        <p
                          style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
                          className="text-gray-600"
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
