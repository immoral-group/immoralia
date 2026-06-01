"use client";

import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Users, Zap, Award } from 'lucide-react';

const metrics = [
  { icon: TrendingUp, value: 43, suffix: '%', label: 'Aumento en conversión promedio' },
  { icon: Users, value: 45, suffix: '+', label: 'Marcas que confían en nosotros' },
  { icon: Zap, value: 5, suffix: ' días', label: 'Para tener tu landing online' },
  { icon: Award, value: 98, suffix: '%', label: 'Tasa de satisfacción de clientes' }
];

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref} className="text-[32px]">{count}</span>;
}

export function MetricsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-24 px-8 bg-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#001156] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#00FFFF]/25">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <div
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
                  className="mb-2 text-xl"
                >
                  <Counter value={metric.value} />
                  <span className="text-[32px]">{metric.suffix}</span>
                </div>
                
                <p
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                  className="text-gray-400 text-lg"
                >
                  {metric.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
