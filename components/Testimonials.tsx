"use client";

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    name: 'María',
    role: 'CEO, Super Patch Distribuidores',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MDM1OTU0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    content: 'Immoral transformó completamente nuestro funnel de conversión. En menos de una semana teníamos una landing que convierte el doble que la anterior.',
    metric: '+43% conversión'
  },
  {
    name: 'Carlos',
    role: 'CMO, ImFilms',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjAzNTk1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    content: 'No solo diseñan páginas bonitas, sino que entienden de performance. El ROI de nuestras campañas mejoró significativamente.',
    metric: 'CTR x2'
  },
  {
    name: 'Laura',
    role: 'CMO, Teamder',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMzU5NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    content: 'Profesionales, rápidos y con resultados medibles. La mejor inversión que hemos hecho en marketing digital este año.',
    metric: '5 días implementación'
  }
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-32 px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
            className="mb-4 text-5xl"
          >
            Lo que dicen nuestros clientes
          </h2>
          <p
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
            className="text-gray-600"
          >
            Resultados reales de marcas que ya están convirtiendo
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#001156] text-[#001156]" />
                ))}
              </div>
              
              <p
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                className="text-gray-700 mb-6"
              >
                "{testimonial.content}"
              </p>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                      className="text-black"
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                      className="text-gray-500 text-sm"
                    >
                      {testimonial.role}
                    </p>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
