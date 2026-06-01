"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';

const included = [
  'Kick-off estratégico',
  'Diseño visual y UX/UI optimizados',
  'Textos persuasivos y adaptados a tu público',
  'Adaptación mobile y responsive',
  'Hosting básico incluido y soporte post-publicación'
];

const optional = [
  'Analytics',
  'Integraciones avanzadas (CRM/APIs)',
  'Dominio personalizado',
  'Páginas adicionales'
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="plan-precio" ref={ref} className="w-full py-32 px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background elements */}
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#001156]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#001156]" />
            <span
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
              className="text-5xl text-[#001156]"
            >
              Plan & Precio
            </span>
          </div>
          <h2
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
            className="mb-4 text-4xl"
          >
            Todo incluido para que empieces a convertir
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main pricing card */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-black overflow-hidden">
            {/* Header gradient */}
            <div className="bg-black p-8 text-white text-center">
              <h3
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                className="text-3xl mb-2"
              >
                Landing Page Premium
              </h3>
              <p
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                className="text-white/90"
              >
                La solución completa para tu negocio
              </p>
            </div>

            <div className="p-10">
              {/* Features grid */}
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
                {/* Included */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-[#001156] rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <h4
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                      className="text-black"
                    >
                      Incluye:
                    </h4>
                  </div>
                  <ul className="space-y-4">
                    {included.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-[#001156] flex-shrink-0 mt-0.5" />
                        <span
                          style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                          className="text-gray-800"
                        >
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Optional */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-gray-600" />
                    </div>
                    <h4
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                      className="text-black"
                    >
                      Opcionales:
                    </h4>
                  </div>
                  <ul className="space-y-4">
                    {optional.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span
                          style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                          className="text-gray-600"
                        >
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price section */}
              <div className="border-t-2 border-gray-100 pt-8">
                <div className="text-center mb-8">
                  <p
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                    className="text-gray-600 mb-3"
                  >
                    Precio personalizado desde:
                  </p>
                  <div className="inline-block">
                    <span
                      style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                      className="bg-gradient-to-r from-[#001156] to-[#030834] bg-clip-text text-transparent"
                    >
                      Consultar
                    </span>
                  </div>
                </div>

                <button
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                  className=" text-center w-full py-5 bg-gradient-to-r from-[#001156] to-[#030834] text-white rounded-2xl hover:shadow-xl hover:shadow-[#001156]/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  Solicitar propuesta personalizada
                </button>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -top-4 -right-4 bg-black text-white px-6 py-3 rounded-2xl shadow-xl"
          >
            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
