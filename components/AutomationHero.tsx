"use client";

const logo = '/assets/670488ee96b1db32aac78994e494876f5d2bfc92.png';
const heroBg = '/assets/05e92d423c52824b363d88b992c23d7af9262c16.png';
import { motion } from "motion/react";
import { Check, ArrowRight, PlayCircle } from "lucide-react";
import { useRef, useState, useEffect } from 'react';

export function AutomationHero() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [stickyTop1, setStickyTop1] = useState(0);
  const [stickyTop2, setStickyTop2] = useState(0);

  useEffect(() => {
    const updateSticky = () => {
      const wh = window.innerHeight;
      
      if (ref1.current) {
         const h1 = ref1.current.offsetHeight;
         setStickyTop1(h1 > wh ? wh - h1 : 0);
      }
      
      if (ref2.current) {
         const h2 = ref2.current.offsetHeight;
         setStickyTop2(h2 > wh ? wh - h2 : 0);
      }
    };
    
    updateSticky();
    window.addEventListener('resize', updateSticky);
    return () => window.removeEventListener('resize', updateSticky);
  }, []);

  const bullets = [
    "Menos tareas repetidas, menos errores, más visibilidad.",
    "Automatizaciones conectadas a tu stack (no “parches”).",
    "Documentación y handover para que no dependas de nadie.",
  ];

  const scrollToMethod = () => {
    document.getElementById("method-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      });
  };

  return (
    <div className="w-full bg-[rgb(14,14,14)]">
      {/* SECTION 1: Centered Hero */}
      <section 
        ref={ref1}
        style={{ top: stickyTop1 }}
        className="sticky relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe 
            src="https://kinescope.io/embed/3s4VzYD1qDXf8KYArCLmLs" 
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" 
            frameBorder="0" 
            allowFullScreen 
            className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full min-h-full h-[56.25vw] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
            title="Hero Video"
          ></iframe>
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto relative z-10"
        >
          <img
            src={logo}
            alt="Immoralia"
            className="h-12 w-auto mx-auto mb-10"
          />

          <h1
            style={{
              fontFamily: "Lexend, sans-serif",
              fontWeight: 900,
            }}
            className="text-white text-4xl lg:text-6xl leading-[1.1] tracking-tight"
          >
            Automatizamos tus operaciones para que tu empresa
            funcione con{" "}
            <span className="text-[#00ffff]">
              menos fricción
            </span>
            .
          </h1>
        </motion.div>

        {/* Subtle Background Glow - Adjusted opacity for new background */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B80DF] rounded-full blur-[150px] opacity-30" />
        </div>
      </section>

      {/* SECTION 2: Details & Iframe Placeholder */}
      <section 
        ref={ref2}
        style={{ top: stickyTop2 }}
        className="sticky relative w-full py-24 px-6 lg:px-24 overflow-hidden"
      >
        
        {/* Spline Background */}
        <div className="absolute inset-0 z-0">
          <iframe 
            src='https://my.spline.design/interactiveaiwebsite-gRFaqennH9qeJTbE1FpynL8v/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="w-full h-full"
            title="Spline 3D Background"
          />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start relative z-10 pointer-events-none">
          
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-10 pointer-events-none"
          >
            <p
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: 300,
              }}
              className="text-[#001156] text-xl lg:text-2xl leading-relaxed"
            >
              Somos un equipo técnico de automatización.
              Documentamos procesos, integramos herramientas y
              dejamos flujos funcionando de verdad:
              administración, finanzas, operaciones y RRHH.
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-3 items-start">
              {bullets.map((bullet, index) => (
                <div
                  key={index}
                  className="px-5 py-3 rounded-full border border-[#001156]/40 backdrop-blur-sm text-[#001156] text-sm font-light hover:border-[#3B80DF]/50 transition-colors cursor-default bg-white/5 pointer-events-auto"
                >
                  {bullet}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mt-4">
              <a
                href="https://procesos.immoralia.es/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#001156] hover:bg-[#333] text-white rounded-lg transition-all duration-300 border border-white/10 hover:border-white/30 flex items-center justify-center gap-2 text-sm font-medium pointer-events-auto"
              >
                Ir al selector de procesos
              </a>

              <button
                onClick={scrollToMethod}
                className="flex items-center gap-3 text-[#001156] hover:text-[#3B80DF] transition-colors group text-sm font-medium pointer-events-auto"
              >
                <div className="w-10 h-10 rounded-full border border-[#001156]/20 flex items-center justify-center group-hover:border-[#3B80DF] transition-colors">
                  <PlayCircle className="w-4 h-4" />
                </div>
                Ver cómo trabajamos
              </button>
            </div>
            
            <p className="text-gray-600 text-xs font-light tracking-wide">
              EN 3 MINUTOS PUEDES PEDIR TU IMPLEMENTACIÓN
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}