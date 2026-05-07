"use client";

import { motion } from 'motion/react';

const logos = [
  'SUPER PATCH',
  'IMFILMS',
  'VELITES',
  'BRAND ONE',
  'BRAND TWO',
  'BRAND THREE'
];

export function ClientLogos() {
  return (
    <section className="w-full py-16 px-8 bg-white border-y border-gray-100 hidden">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
          className="text-center text-gray-500 text-sm mb-12"
        >
          Marcas que ya convierten con nosotros
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <span
                style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 900 }}
                className="text-gray-400 hover:text-black transition-colors text-xs tracking-wider"
              >
                {logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
