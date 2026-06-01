"use client";

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ArrowRight } from 'lucide-react';

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "¿Tengo que cambiar mis herramientas?",
      answer: "No. Normalmente integramos lo que ya usas. Si hay algo que no se puede automatizar por limitaciones de tus herramientas, te lo decimos con criterio."
    },
    {
      question: "¿Esto es “IA” o automatización?",
      answer: "Automatización real primero. IA cuando aporta (clasificar, extraer, resumir, enrutar). Sin humo."
    },
    {
      question: "¿Cuánto tarda?",
      answer: "En dos semanas tenemos la infraestructura tecnológica y el primer proceso automatizado. "
    },
    {
      question: "¿Y si mi banco / herramienta no tiene integración?",
      answer: "Se busca alternativa: conector, export/import, o incluso operación delegada si compensa. La prioridad es el resultado."
    }
  ];

  return (
    <section ref={ref} className="py-32 px-8 lg:px-32 bg-white relative">
      <div className="max-w-full mx-auto">
        
        {/* Header - Left Aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left"
        >
          <h2
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 900 }}
            className="text-4xl md:text-5xl lg:text-6xl text-[#001156] mb-6 tracking-tight"
          >
            Preguntas frecuentes
          </h2>
          <p 
             style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
             className="text-gray-600 text-lg max-w-2xl leading-relaxed"
          >
            Resolvemos tus dudas sobre cómo trabajamos, qué puedes esperar y cómo transformamos tu operativa diaria.
          </p>
        </motion.div>

        {/* List / Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Top Border Line */}
          <div className="w-full h-px bg-gray-200 mb-0" />

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-gray-200 px-0 bg-transparent"
              >
                <AccordionTrigger 
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}
                  className="text-[#001156] hover:text-[#001156]/80 hover:no-underline text-xl md:text-2xl py-8 [&>svg]:hidden group"
                >
                  <div className="flex w-full justify-between items-center pr-2">
                    <span className="text-left">{faq.question}</span>
                    <ArrowRight className="w-6 h-6 text-[#001156] transition-transform duration-300 group-data-[state=open]:rotate-90 shrink-0 ml-4" />
                  </div>
                </AccordionTrigger>
                <AccordionContent 
                  style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
                  className="text-gray-600 text-lg pb-8 leading-relaxed max-w-3xl"
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
