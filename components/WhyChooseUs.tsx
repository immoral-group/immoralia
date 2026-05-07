"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Users, Target, TrendingUp, Award } from 'lucide-react';

const reasons = [
  {
    icon: Users,
    title: 'Equipo creativo + técnico in-house',
    description: 'Talento multidisciplinario trabajando en conjunto'
  },
  {
    icon: Target,
    title: 'Especialistas en Meta Ads, Google Ads y TikTok Ads',
    description: 'Conocemos cada plataforma en profundidad'
  },
  {
    icon: TrendingUp,
    title: 'Estrategia Brandformance',
    description: 'Diseño atractivo + performance real'
  },
  {
    icon: Award,
    title: 'Experiencia con +45 marcas',
    description: 'De diferentes industrias y objetivos'
  }
];

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-32 px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
          className="text-center mb-20 text-5xl"
        >
          Por qué elegirnos
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="flex space-x-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#3B80DF] rounded-lg flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3
                    style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
                    className="mb-2"
                  >
                    {reason.title}
                  </h3>
                  <p
                    style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
                    className="text-gray-400"
                  >
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-[#3B80DF]/30 rounded-2xl p-12 max-w-4xl">
            <blockquote
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            >
              "Diseñamos páginas que piensan en conversión y respiran marca."
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
