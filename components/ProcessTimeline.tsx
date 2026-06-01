"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Lightbulb, Palette, Eye, Rocket, BarChart3 } from 'lucide-react';

const stages = [
  { icon: Lightbulb, label: 'Kick-off & brief' },
  { icon: Palette, label: 'Diseño & copy' },
  { icon: Eye, label: 'Revisión' },
  { icon: Rocket, label: 'Publicación' },
  { icon: BarChart3, label: 'Medición & optimización' }
];

export function ProcessTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-32 px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
            className="mb-4 text-5xl"
          >
            Cómo trabajamos
          </h2>
          <p
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
            className="text-gray-600"
          >
            Un proceso simple, ágil y transparente
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gray-200" />
          
          <div className="grid md:grid-cols-5 gap-8 relative">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 bg-[#001156] rounded-full flex items-center justify-center mb-4 z-10 shadow-lg shadow-[#001156]/30 hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <p
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                    className="text-sm"
                  >
                    {stage.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
          className="text-center mt-16 max-w-3xl mx-auto text-gray-700"
        >
          En solo 5 días, tu landing puede estar online, optimizada y lista para escalar tus campañas.
        </motion.p>
      </div>
    </section>
  );
}
