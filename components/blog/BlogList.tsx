'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import FeaturedArticle from './FeaturedArticle';
import ArticleCard from './ArticleCard';
import SubscribeCTA from './SubscribeCTA';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Articulo = {
  id: string;
  titular: string;
  slug: string;
  meta_description: string | null;
  imagen_url: string | null;
  categoria: string | null;
  fecha_publicacion: string | null;
};

export default function BlogList({ articulos }: { articulos: Articulo[] }) {
  const [query, setQuery] = useState('');
  const [showTopCTA, setShowTopCTA] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  // Cmd/Ctrl+K to focus search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>(
          'input[aria-label="Buscar artículos"]'
        );
        input?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Verificar la cookie de suscripción en el montaje
  useEffect(() => {
    const isSubscribed = document.cookie
      .split(';')
      .some((item) => item.trim().startsWith('newsletter_subscribed='));
    setShowTopCTA(!isSubscribed);
  }, []);

  // Reiniciar a la página 1 cuando cambia la consulta de búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Scroll suave al inicio de la lista cuando cambia la página (excepto en el primer renderizado)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  const trimmed = query.trim().toLowerCase();
  const isSearching = trimmed.length > 0;

  const filtered = useMemo(() => {
    if (!isSearching) return articulos;
    return articulos.filter((a) => {
      const haystack = [a.titular, a.meta_description, a.categoria]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [articulos, trimmed, isSearching]);

  const [featured, ...rest] = articulos;

  // Calcular el número total de páginas
  const totalPages = useMemo(() => {
    if (isSearching) {
      return Math.ceil(filtered.length / 10) || 1;
    } else {
      if (rest.length <= 9) return 1;
      return 1 + Math.ceil((rest.length - 9) / 10);
    }
  }, [isSearching, filtered.length, rest.length]);

  // Obtener los artículos para la página actual
  const currentArchiveArticles = useMemo(() => {
    if (isSearching) {
      const start = (currentPage - 1) * 10;
      return filtered.slice(start, start + 10);
    } else {
      if (currentPage === 1) {
        return rest.slice(0, 9);
      } else {
        const start = 9 + (currentPage - 2) * 10;
        return rest.slice(start, start + 10);
      }
    }
  }, [isSearching, currentPage, filtered, rest]);

  return (
    <div ref={listRef} className="scroll-mt-24">
      {showTopCTA && !isSearching && (
        <div className="mb-8">
          <SubscribeCTA />
        </div>
      )}

      <SearchBar
        value={query}
        onChange={setQuery}
        resultsCount={isSearching ? filtered.length : undefined}
        totalCount={articulos.length}
      />

      {!isSearching ? (
        <>
          {currentPage === 1 && featured && <FeaturedArticle articulo={featured} />}
          {currentArchiveArticles.length > 0 && (
            <ArchiveSection
              articulos={currentArchiveArticles}
              title="Más artículos"
              countLabel={rest.length}
            />
          )}
        </>
      ) : currentArchiveArticles.length > 0 ? (
        <ArchiveSection
          articulos={currentArchiveArticles}
          title="Resultados"
          countLabel={filtered.length}
        />
      ) : (
        <NoResults query={query} onClear={() => setQuery('')} />
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 mb-24">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-3 rounded-xl border border-black/10 hover:border-[#0077cc]/40 text-black/60 hover:text-[#0077cc] disabled:opacity-40 disabled:hover:text-black/60 disabled:hover:border-black/10 transition-all duration-300 disabled:cursor-not-allowed cursor-pointer bg-white"
            aria-label="Página anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm transition-all duration-300 font-semibold cursor-pointer border ${
                currentPage === page
                  ? 'bg-[#0077cc] text-white border-[#0077cc] shadow-md shadow-[#0077cc]/25'
                  : 'bg-white border-black/10 text-black/60 hover:border-[#0077cc]/40 hover:text-[#0077cc]'
              }`}
              style={{ fontFamily: 'Lexend, sans-serif' }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-3 rounded-xl border border-black/10 hover:border-[#0077cc]/40 text-black/60 hover:text-[#0077cc] disabled:opacity-40 disabled:hover:text-black/60 disabled:hover:border-black/10 transition-all duration-300 disabled:cursor-not-allowed cursor-pointer bg-white"
            aria-label="Página siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function ArchiveSection({
  articulos,
  title,
  countLabel,
}: {
  articulos: Articulo[];
  title: string;
  countLabel: number;
}) {
  return (
    <section className="px-6 mb-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B80DF]" />
              <span
                className="text-xs tracking-[0.25em] text-black/50 uppercase"
                style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
              >
                Archivo
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl text-black tracking-tight"
              style={{
                fontFamily: 'Lexend, sans-serif',
                fontWeight: 100,
                letterSpacing: '-0.025em',
              }}
            >
              {title}
            </h2>
          </div>
          <span
            className="hidden md:block text-sm text-black/40"
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
          >
            {countLabel} {countLabel === 1 ? 'pieza' : 'piezas'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articulos.map((articulo, i) => (
            <ArticleCard key={articulo.id} articulo={articulo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NoResults({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 mb-32"
    >
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-black/8 bg-white p-12 md:p-16 text-center shadow-sm">
          <div
            className="text-xs tracking-[0.25em] text-black/40 uppercase mb-4"
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
          >
            Sin resultados
          </div>
          <h2
            className="text-3xl md:text-4xl text-black mb-3 tracking-tight"
            style={{
              fontFamily: 'Lexend, sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
          >
            Nada para «{query}»
          </h2>
          <p
            className="text-black/55 max-w-md mx-auto mb-8"
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
          >
            Prueba con otra palabra o limpia la búsqueda para ver el archivo
            completo.
          </p>
          <button
            onClick={onClear}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-black/15 hover:border-[#0077cc]/50 text-black/80 hover:text-[#0077cc] transition-all duration-300 text-sm"
            style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 300 }}
          >
            Limpiar búsqueda
          </button>
        </div>
      </div>
    </motion.section>
  );
}
