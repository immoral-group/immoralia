"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Key, Activity, FileText, ShieldCheck } from 'lucide-react';

export function WhyTrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: Key,
      title: "Propiedad",
      description: "La infraestructura y los flujos quedan en tu entorno y a tu nombre cuando aplica."
    },
    {
      icon: Activity,
      title: "Trazabilidad",
      description: "Logs, alertas, control de fallos y reintentos para que nada se pierda."
    },
    {
      icon: FileText,
      title: "Documentación",
      description: "SOP y mapa del proceso para que no dependas de memoria humana."
    },
    {
      icon: ShieldCheck,
      title: "Calidad",
      description: "Testeamos con casos reales de tu negocio, no con demos genéricas."
    }
  ];

  return (
    <section ref={ref} className="w-full py-24 px-8 bg-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#3B80DF] rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#3B80DF] rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            className="text-3xl lg:text-5xl max-w-4xl mx-auto text-[#001156] mb-4 leading-tight"
          >
            Esto no va de “automatizar por automatizar”. <span className="text-[#3B80DF]">Va de control.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group h-full"
              >
                <div className="p-8 bg-white border-2 border-dashed border-[#001156]/30 rounded-[2rem] group-hover:bg-[#001156] group-hover:border-transparent transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="w-14 h-14 bg-[#001156]/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#001156] group-hover:text-[#00ffff] transition-colors duration-300" />
                    </div>
                    <div>
                      <h3
                        style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 600 }}
                        className="text-xl text-[#001156] mb-3 group-hover:text-white transition-colors duration-300"
                      >
                        {reason.title}
                      </h3>
                      <p
                        style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
                        className="text-[#001156]/80 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                      >
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
