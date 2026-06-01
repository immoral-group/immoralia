'use client';

import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';

type Props = {
  value: string;
  onChange: (next: string) => void;
  resultsCount?: number;
  totalCount?: number;
};

export default function SearchBar({ value, onChange, resultsCount, totalCount }: Props) {
  const hasQuery = value.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="px-6 mb-16"
    >
      <div className="max-w-3xl mx-auto">
        <div className="relative group">
          {/* Animated focus glow */}
          <div
            className={`absolute -inset-px rounded-full transition-opacity duration-500 pointer-events-none ${
              hasQuery ? 'opacity-100' : 'opacity-0 group-focus-within:opacity-100'
            }`}
            style={{
              background:
                'linear-gradient(135deg, rgba(0,17,86,0.08), rgba(0,255,255,0.2))',
              filter: 'blur(15px)',
            }}
          />

          <div className="relative flex items-center gap-3 bg-[#F4F4F6] border border-black/10 group-focus-within:border-[#001156]/30 group-focus-within:bg-white rounded-full px-6 py-3.5 transition-all duration-300">
            <Search className="w-5 h-5 text-black/35 group-focus-within:text-[#001156] transition-colors duration-300 shrink-0" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Buscar en el archivo…"
              className="flex-1 bg-transparent outline-none text-black placeholder:text-black/35 text-base"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
              aria-label="Buscar artículos"
            />

            {hasQuery && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="shrink-0 w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 text-black/50 hover:text-black flex items-center justify-center transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <kbd
              className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md bg-black/5 border border-black/10 text-black/40 text-[10px] tracking-wider uppercase"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
            >
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Result counter */}
        {hasQuery && typeof resultsCount === 'number' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-black/60"
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
          >
            {resultsCount === 0 ? (
              <span>
                Sin resultados para{' '}
                <span className="text-black font-semibold">«{value}»</span>
              </span>
            ) : (
              <span>
                <span className="text-black font-bold">{resultsCount}</span>{' '}
                {resultsCount === 1 ? 'resultado' : 'resultados'}
                {typeof totalCount === 'number' && (
                  <span className="text-black/40"> de {totalCount}</span>
                )}{' '}
                para <span className="text-[#001156] font-semibold">«{value}»</span>
              </span>
            )}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
