"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle2, Sparkles } from 'lucide-react';

const features = [
  'Estrategia y diseño alineados a tu marca y objetivo.',
  'Copywriting persuasivo para captar la atención.',
  'Posibilidad de integración con CRM, formularios y herramientas de automatización.',
  'Optimización continua basada en datos reales.',
  'Implementación rápida: tu landing lista en 5 días.'
];

export function OptimizationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-32 px-8 bg-white overflow-visible">
      <div className="max-w-7xl mx-auto overflow-visible">
        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center overflow-visible">
          {/* Left - Image with overlay card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-visible"
          >
            <div className="relative overflow-visible">
              <iframe
                src="https://my.spline.design/cubeandballs-BWwSrzNuCNWuHMQk5DwdGXoe/?camera=camera"
                className="w-full h-[600px]"
                style={{ border: 'none' }}
              />
            </div>
            
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[rgb(255,255,255)] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                    className="text-white"
                  >
                    2x
                  </div>
                  <p
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                    className="text-sm text-white"
                  >
                    Conversión duplicada
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 80 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-1 bg-[#001156] mb-6 rounded-full"
              />
              <h2
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                className="mb-6 text-4xl"
              >
                Landing Pages creadas para VENDER, no solo para verse bien.
              </h2>
              <p
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                className="text-gray-700 mb-8"
              >
                El éxito de una campaña no depende solo del anuncio. La página de destino es clave para transformar clics en ventas, leads o reservas. Cada elemento está diseñado estratégicamente para guiar al usuario hacia la conversión.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-6 h-6 bg-[#001156]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#001156] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#001156] group-hover:text-white transition-colors" />
                  </div>
                  <p
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                    className="text-gray-700"
                  >
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
