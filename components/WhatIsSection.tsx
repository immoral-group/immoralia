"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Sparkles, Zap, Layers, Target } from 'lucide-react';

export function WhatIsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Sparkles, text: "Conceptualización visual a medida" },
    { icon: Layers, text: "Producción de modelos 3D (desde cero o con referencias)" },
    { icon: Zap, text: "Aplicación de IA para eficiencia y adaptación multiformato" },
    { icon: Target, text: "Entrega optimizada para Meta Ads, TikTok, YouTube, DOOH y más" }
  ];

  return (
    <section ref={ref} className="w-full min-h-screen px-8 bg-white relative flex items-start">
      {/* Background 3D Interactive */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-white/80" />
        <div className="absolute inset-0 opacity-100 pointer-events-auto">
          <iframe
            src="https://my.spline.design/r4xbot-1zRqYf1VsVQQtYeanLIQZ6jB/"
            frameBorder="0"
            className="w-full h-full"
            title="3D Robot Interactive Background"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 pointer-events-none w-full pt-12 xl:pt-24">
        <div className="text-center space-y-8 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none"
          >
            <h2
              style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900, userSelect: 'none' }}
              className="xl: max-w-3xl text-4xl xl:text-6xl text-black mb-6 pointer-events-none"
            >
              Un nuevo enfoque para tus anuncios digitales
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300, userSelect: 'none' }}
            className="text-gray-600 text-base leading-relaxed xl:leading-5 pointer-events-none max-w-3xl mx-auto"
          >
            Creative Motion Ads es nuestro servicio de diseño y producción de anuncios con motion graphics en 3D, optimizados con IA.
            Piezas visuales impactantes, pensadas para mejorar la performance de tus campañas y destacar frente to la competencia.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300, userSelect: 'none' }}
            className="text-gray-600 text-base leading-relaxed xl:leading-5 pointer-events-none max-w-3xl mx-auto"
          >
            
          </motion.p>
        </div>
      </div>
    </section>
  );
}
