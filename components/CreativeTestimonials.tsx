"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Quote, Star } from 'lucide-react';

export function CreativeTestimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Director de Marketing",
      company: "TechFlow",
      content: "Los anuncios en 3D que creó Immoral superaron nuestras expectativas. Vimos un incremento del 240% en engagement y un 85% de mejora en conversión en nuestras campañas de Meta.",
      rating: 5
    },
    {
      name: "Ana Rodríguez",
      role: "CEO",
      company: "FitGear",
      content: "La calidad cinematográfica de sus motion ads nos posicionó como una marca premium. El ROI fue 3x superior comparado con nuestros anuncios tradicionales.",
      rating: 5
    },
    {
      name: "Miguel Santos",
      role: "Growth Manager",
      company: "EcoHome",
      content: "El equipo de Immoral entendió perfectamente nuestra visión. Los anuncios 3D con IA nos permitieron lanzar 15 variaciones en tiempo récord, optimizando cada plataforma.",
      rating: 5
    }
  ];

  return (
    <section ref={ref} className="w-full py-12 xl:py-32 px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#001156] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#00FFFF] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
        
          <h2
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
            className="text-4xl xl:text-5xl xl:max-w-3xl text-white mb-6 mx-auto"
          >
            Lo que dicen nuestros clientes
          </h2>
          <p
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
            className="text-gray-400 text-xl"
          >
            Resultados reales de marcas que confiaron en nosotros
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="h-full p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl hover:bg-white/10 hover:border-[#00FFFF]/50 transition-all duration-300 hover:-translate-y-2 relative">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#001156] to-[#00FFFF] rounded-2xl flex items-center justify-center shadow-xl shadow-[#00FFFF]/20 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-8 h-8 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#00FFFF] fill-[#00FFFF]" />
                  ))}
                </div>

                {/* Content */}
                <p
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                  className="text-gray-300 text-lg leading-relaxed mb-8"
                >
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-white/10 pt-6">
                  <p
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                    className="text-white text-lg mb-1"
                  >
                    {testimonial.name}
                  </p>
                  <p
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                    className="text-gray-400 text-sm"
                  >
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
