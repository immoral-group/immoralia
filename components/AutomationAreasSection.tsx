"use client";

import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { FileText, Users, Package, ArrowRight, Sparkles } from 'lucide-react';
const exampleImage = '/assets/d28d30ba0ed3f1c7fd602efb4e5f8de3b17340ef.png';

export function AutomationAreasSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // State to manage exact video dimensions for perfect cover
  const [videoSize, setVideoSize] = useState({ width: '100%', height: '100%' });
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return;
      
      // Video Size Logic
      const { clientWidth: cw, clientHeight: ch } = ref.current;
      const targetRatio = 16 / 9;
      const containerRatio = cw / ch;

      let w, h;
      if (containerRatio > targetRatio) {
        // Container is wider than 16:9 - Width limits size
        w = cw;
        h = cw / targetRatio;
      } else {
        // Container is taller than 16:9 - Height limits size
        h = ch;
        w = ch * targetRatio;
      }

      setVideoSize({ width: `${w}px`, height: `${h}px` });
      
      // Sticky Position Logic
      const wh = window.innerHeight;
      const sectionHeight = ref.current.offsetHeight;
      if (sectionHeight > wh) {
        setStickyTop(wh - sectionHeight);
      } else {
        setStickyTop(0);
      }
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const areas = [
    {
      title: "Administración y finanzas",
      subtitle: "Control total",
      icon: FileText,
      items: [
        "Facturación auto.",
        "Cobros (Dunning)",
        "Control de gastos",
        "Conciliación",
        "Reportes KPI"
      ],
      cta: "Optimizar Finanzas"
    },
    {
      title: "Operaciones",
      subtitle: "Flujo continuo",
      icon: Package,
      items: [
        "Enrutado tareas",
        "Sync de datos",
        "Control calidad",
        "Aprobaciones",
        "Sistemas ERP"
      ],
      cta: "Escalar Operaciones"
    },
    {
      title: "Recursos Humanos",
      subtitle: "Gestión de talento",
      icon: Users,
      items: [
        "Onboarding",
        "Gestión accesos",
        "Documentación",
        "Solicitudes",
        "Evaluaciones"
      ],
      cta: "Mejorar Cultura"
    }
  ];

  return (
    <section 
      ref={ref} 
      className="sticky py-24 px-4 lg:px-8 relative overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ top: stickyTop }}
    >
      {/* Background Image/Video Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src={exampleImage} 
          alt="Green nature containers" 
          className="w-full h-full object-cover hidden" 
        />
        {/* Background Video with JS-calculated dimensions for perfect cover */}
        <iframe 
          src="https://kinescope.io/embed/szRJyWNS4Yw894XkBRHu3W?autoplay=1&muted=1&loop=1&controls=0&background=1" 
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" 
          frameBorder="0" 
          allowFullScreen 
          width="1920"
          height="1080"
          style={{
            width: videoSize.width,
            height: videoSize.height
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none z-0 bg-black max-w-none max-h-none"
          title="Background Video"
        />
        
        {/* Top Gradient Transition (White to Transparent) */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white via-white/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
            className="text-4xl md:text-5xl lg:text-6xl text-[#001156] tracking-tight drop-shadow-lg"
          >
            Procesos típicos que <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#3B80DF]">implementamos</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.15), ease: "easeOut" }}
                className="relative group"
              >
                {/* Glassmorphism Card */}
                <div 
                  className="relative h-full rounded-[40px] bg-gradient-to-b from-[#001156]/80 to-[#001156]/100 backdrop-blur-xl border border-[#001156] p-8 flex flex-col shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                >
                  
                  {/* Card Header: Icon + Badge */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-inner">
                      <Icon className="w-7 h-7 text-[#00ffff]" />
                    </div>
                    
                    
                  </div>

                  {/* Title Section */}
                  <div className="mb-8">
                    <p className="text-gray-400 text-sm font-medium mb-1 tracking-wider uppercase">{area.subtitle}</p>
                    <h3
                      style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 600 }}
                      className="text-3xl text-white leading-tight"
                    >
                      {area.title}
                    </h3>
                  </div>

                  {/* Tags / Items */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {area.items.map((item, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-200 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Footer / CTA */}
                  <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                    <div className="text-white font-medium text-sm">
                      <span className="text-[#00ffff]">100%</span> Automatizado
                    </div>
                    <a
                      href="https://procesos.immoralia.es/"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition-all flex items-center gap-2 group-hover:gap-3"
                    >
                      {area.cta}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  
                  {/* Subtle shine effect */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-[40px] bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20 max-w-7xl mx-auto"
        >
          <p className="text-white/80 text-lg font-light backdrop-blur-md py-4 px-8 rounded-full bg-[#001156] border border-white/10 inline-block">
            Si existe un proceso repetible, se puede documentar. <span className="text-[#00ffff] font-medium">Si se puede documentar, se puede automatizar (bien).</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}