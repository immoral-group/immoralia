"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Check, Lightbulb, Palette, Box, Sparkles, Grid3x3 } from 'lucide-react';

export function ServiceIncludesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    {
      number: "01",
      title: "Kick-off estratégico",
      description: "Definimos mensaje, objetivo y tono de tu campaña",
      icon: Lightbulb,
      span: "col-span-1 row-span-1"
    },
    {
      number: "02",
      title: "Guión visual y propuesta creativa",
      description: "Propuesta personalizada alineada con tu marca",
      icon: Palette,
      span: "col-span-1 row-span-1"
    },
    {
      number: "03",
      title: "Diseño en 3D",
      description: "Producción de alta calidad",
      icon: Box,
      span: "col-span-1 row-span-1 lg:row-span-2"
    },
    {
      number: "04",
      title: "Animación con IA",
      description: "Potenciada con inteligencia artificial",
      icon: Sparkles,
      span: "col-span-1 row-span-1"
    },
    {
      number: "05",
      title: "Adaptación multiformato",
      description: "Optimizado para diferentes plataformas y canales",
      icon: Grid3x3,
      span: "col-span-1 row-span-1"
    }
  ];

  return (
    <section id="servicios" ref={ref} className="w-full py-12 xl:py-32 px-8 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#001156] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00FFFF] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
            className="text-4xl xl:text-5xl xl:max-w-3xl text-white mb-8 mx-auto"
          >
            Desde la idea hasta el anuncio listo para lanzar
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 auto-rows-[240px]">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={step.span}
              >
                <div className={`
                  h-full p-8 bg-white/5 backdrop-blur-md border rounded-3xl
                  transition-all duration-300 hover:-translate-y-2
                  flex flex-col justify-between
                  ${hoveredIndex === index 
                    ? 'border-[#00FFFF] bg-white/10 shadow-2xl shadow-[#00FFFF]/10' 
                    : 'border-white/10 hover:border-white/20'
                  }
                `}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center
                      transition-all duration-300
                      ${hoveredIndex === index 
                        ? 'bg-[#001156] shadow-lg shadow-[#00FFFF]/30 scale-110' 
                        : 'bg-white/10 border border-white/20'
                      }
                    `}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <span
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                      className={`
                        text-5xl transition-colors duration-300
                        ${hoveredIndex === index ? 'text-[#00FFFF]' : 'text-white/20'}
                      `}
                    >
                      {step.number}
                    </span>
                  </div>
                  
                  <div>
                    <h3
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                      className={`
                        text-2xl mb-3 transition-colors duration-300
                        ${hoveredIndex === index ? 'text-[#00FFFF]' : 'text-white'}
                      `}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                      className="text-gray-400 text-base leading-relaxed"
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-8"
        >
          <div className="p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl">
            <p
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
              className="text-gray-200 text-base xl:text-xl leading-relaxed text-center"
            >
              Creamos anuncios pensados para productos, servicios, lanzamientos y catálogos, tanto en e-commerce como en campañas de marca. Nuestros motion ads están diseñados para captar atención y mejorar la conversión.
            </p>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
