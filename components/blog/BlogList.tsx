'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import FeaturedArticle from './FeaturedArticle';
import ArticleCard from './ArticleCard';
import SubscribeCTA from './SubscribeCTA';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ListFilter, Calendar, RefreshCw } from 'lucide-react';

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
  
  // Estados para los filtros de la barra lateral
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

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

  // Limpiar el selector de día si el mes cambia
  useEffect(() => {
    setSelectedDay(null);
  }, [selectedMonth]);

  // Reiniciar a la página 1 cuando cambia cualquier filtro o consulta
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCategory, selectedMonth, selectedDay]);

  // Scroll suave al inicio de la lista cuando cambia la página (excepto en el primer renderizado)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  const trimmed = query.trim().toLowerCase();
  
  // Determinar si hay alguna búsqueda o filtro activo
  const isFilteringOrSearching = useMemo(() => {
    return trimmed.length > 0 || selectedCategory !== null || selectedMonth !== null;
  }, [trimmed, selectedCategory, selectedMonth]);

  // Obtener estadísticas de categorías y la lista de categorías
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    articulos.forEach((a) => {
      if (a.categoria) {
        stats[a.categoria] = (stats[a.categoria] || 0) + 1;
      }
    });
    return stats;
  }, [articulos]);

  const categorias = useMemo(() => Object.keys(categoryStats).sort(), [categoryStats]);

  // Obtener meses únicos con publicaciones (formato AAAA-MM)
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    articulos.forEach((a) => {
      if (a.fecha_publicacion) {
        const d = new Date(a.fecha_publicacion);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        months.add(`${year}-${month}`);
      }
    });
    return Array.from(months).sort().reverse();
  }, [articulos]);

  const formatMonthLabel = (value: string) => {
    const [year, month] = value.split('-');
    const d = new Date(parseInt(year), parseInt(month) - 1, 1);
    const monthName = d.toLocaleString('es-ES', { month: 'long' });
    return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
  };

  // Obtener días disponibles con publicaciones para el mes seleccionado
  const availableDays = useMemo(() => {
    if (!selectedMonth) return [];
    const [selYear, selMonth] = selectedMonth.split('-').map(Number);
    const days = new Set<number>();
    articulos.forEach((a) => {
      if (a.fecha_publicacion) {
        const d = new Date(a.fecha_publicacion);
        if (d.getFullYear() === selYear && d.getMonth() + 1 === selMonth) {
          days.add(d.getDate());
        }
      }
    });
    return Array.from(days).sort((a, b) => b - a);
  }, [articulos, selectedMonth]);

  // Filtrado de artículos
  const filteredAndSorted = useMemo(() => {
    return articulos.filter((a) => {
      // Búsqueda de texto
      if (trimmed.length > 0) {
        const haystack = [a.titular, a.meta_description, a.categoria]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(trimmed)) return false;
      }

      // Filtro de categoría
      if (selectedCategory && a.categoria !== selectedCategory) {
        return false;
      }

      // Filtro de fecha (mes)
      if (selectedMonth && a.fecha_publicacion) {
        const d = new Date(a.fecha_publicacion);
        const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (yearMonth !== selectedMonth) return false;

        // Filtro de fecha (día)
        if (selectedDay !== null && d.getDate() !== selectedDay) {
          return false;
        }
      } else if (selectedMonth) {
        return false;
      }

      return true;
    });
  }, [articulos, trimmed, selectedCategory, selectedMonth, selectedDay]);

  const [featured, ...rest] = articulos;

  // Calcular el número total de páginas
  const totalPages = useMemo(() => {
    if (isFilteringOrSearching) {
      return Math.ceil(filteredAndSorted.length / 9) || 1;
    } else {
      return Math.ceil(rest.length / 9) || 1;
    }
  }, [isFilteringOrSearching, filteredAndSorted.length, rest.length]);

  // Obtener los artículos para la página actual
  const currentArchiveArticles = useMemo(() => {
    const sourceList = isFilteringOrSearching ? filteredAndSorted : rest;
    const start = (currentPage - 1) * 9;
    return sourceList.slice(start, start + 9);
  }, [isFilteringOrSearching, currentPage, filteredAndSorted, rest]);

  const clearAllFilters = () => {
    setQuery('');
    setSelectedCategory(null);
    setSelectedMonth(null);
    setSelectedDay(null);
  };

  return (
    <div ref={listRef} className="scroll-mt-24">
      {showTopCTA && !isFilteringOrSearching && (
        <SubscribeCTA variant="subtle" />
      )}

      <SearchBar
        value={query}
        onChange={setQuery}
        resultsCount={isFilteringOrSearching ? filteredAndSorted.length : undefined}
        totalCount={articulos.length}
      />

      {/* Artículo Destacado (solo página 1 y sin filtros/búsqueda) */}
      {!isFilteringOrSearching && currentPage === 1 && featured && (
        <FeaturedArticle articulo={featured} />
      )}

      {/* Disposición del listado principal del archivo */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* Bloque del Título */}
        <div className="flex items-end justify-between mb-8 border-b border-black/5 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#001156]" />
              <span
                className="text-xs tracking-[0.25em] text-black/50 uppercase"
                style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
              >
                Archivo
              </span>
            </div>
            <h2
              className="text-2xl md:text-3xl text-black tracking-tight"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 100,
                letterSpacing: '-0.025em',
              }}
            >
              {isFilteringOrSearching
                ? (trimmed.length > 0 ? "Resultados de búsqueda" : "Artículos filtrados")
                : "Más artículos"
              }
            </h2>
          </div>
          <span
            className="text-sm text-black/40"
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
          >
            {isFilteringOrSearching ? filteredAndSorted.length : rest.length}{' '}
            {(isFilteringOrSearching ? filteredAndSorted.length : rest.length) === 1 ? 'pieza' : 'piezas'}
          </span>
        </div>

        {/* Rejilla unificada (Artículos + Sidebar de Filtros) */}
        {currentArchiveArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            
            {/* Sidebar de Filtros (Superior en móvil/tablet, Col 3 Fila 1 en desktop) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1">
              <div className="space-y-6 bg-white/70 backdrop-blur-md border border-[#001156]/15 rounded-3xl p-6 shadow-sm sticky top-24">
                
                {/* Categorías */}
                <div>
                  <h3 
                    className="text-black/80 flex items-center gap-2 mb-4 uppercase tracking-wider font-extrabold"
                    style={{ fontSize: '11px', fontFamily: 'Roboto, sans-serif' }}
                  >
                    <ListFilter className="w-4 h-4 text-[#001156]" />
                    Categorías
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCategory === null
                          ? 'bg-[#001156]/10 text-[#001156] font-semibold'
                          : 'text-black/60 hover:bg-black/5 hover:text-black'
                      }`}
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      <span>Todas las categorías</span>
                      <span className="text-[10px] opacity-60">{articulos.length}</span>
                    </button>
                    {categorias.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#001156]/10 text-[#001156] font-semibold'
                            : 'text-black/60 hover:bg-black/5 hover:text-black'
                        }`}
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <span className="truncate">{cat}</span>
                        <span className="text-[10px] opacity-60">{categoryStats[cat]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-[#001156]/10" />

                {/* Archivo Histórico */}
                <div>
                  <h3 
                    className="text-black/80 flex items-center gap-2 mb-4 uppercase tracking-wider font-extrabold"
                    style={{ fontSize: '11px', fontFamily: 'Roboto, sans-serif' }}
                  >
                    <Calendar className="w-4 h-4 text-[#001156]" />
                    Archivo Histórico
                  </h3>
                  <div className="space-y-3">
                    
                    {/* Selector de Mes */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-black/40 font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Seleccionar Mes
                      </label>
                      <select
                        value={selectedMonth || ''}
                        onChange={(e) => setSelectedMonth(e.target.value || null)}
                        className="w-full bg-white border border-[#001156]/15 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#001156] text-black/80 transition-colors"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <option value="">Todos los meses</option>
                        {availableMonths.map((m) => (
                          <option key={m} value={m}>
                            {formatMonthLabel(m)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Selector de Día */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-black/40 font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Seleccionar Día
                      </label>
                      <select
                        value={selectedDay !== null ? selectedDay : ''}
                        onChange={(e) => setSelectedDay(e.target.value !== '' ? parseInt(e.target.value) : null)}
                        disabled={!selectedMonth}
                        className="w-full bg-white border border-[#001156]/15 disabled:bg-slate-50 disabled:text-black/30 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#001156] text-black/80 transition-colors"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <option value="">Todos los días</option>
                        {availableDays.map((d) => (
                          <option key={d} value={d}>
                            Día {d}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>

                {/* Botón de Reset de Filtros */}
                {isFilteringOrSearching && (
                  <div className="pt-2">
                    <button
                      onClick={clearAllFilters}
                      className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 border border-dashed border-red-200 hover:border-red-500 bg-red-50/20 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-xl text-xs transition-all duration-300 cursor-pointer font-bold"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Limpiar filtros
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* Artículos de archivo */}
            {currentArchiveArticles.map((articulo, i) => (
              <ArticleCard key={articulo.id} articulo={articulo} index={i} />
            ))}

          </div>
        ) : (
          <NoResults query={query} onClear={clearAllFilters} />
        )}

        {/* Paginación */}
        {currentArchiveArticles.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 mb-24">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-black/10 hover:border-[#001156]/40 text-black/60 hover:text-[#001156] disabled:opacity-40 disabled:hover:text-black/60 disabled:hover:border-black/10 transition-all duration-300 disabled:cursor-not-allowed cursor-pointer bg-white"
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
                    ? 'bg-[#001156] text-white border-[#001156] shadow-md shadow-[#001156]/25'
                    : 'bg-white border-black/10 text-black/60 hover:border-[#001156]/40 hover:text-[#001156]'
                }`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-black/10 hover:border-[#001156]/40 text-black/60 hover:text-[#001156] disabled:opacity-40 disabled:hover:text-black/60 disabled:hover:border-black/10 transition-all duration-300 disabled:cursor-not-allowed cursor-pointer bg-white"
              aria-label="Página siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function NoResults({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-24"
    >
      <div className="relative overflow-hidden rounded-3xl border border-black/8 bg-white p-12 md:p-16 text-center shadow-sm">
        <div
          className="text-xs tracking-[0.25em] text-black/40 uppercase mb-4"
          style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
        >
          Sin resultados
        </div>
        <h2
          className="text-3xl md:text-4xl text-black mb-3 tracking-tight"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.02em',
          }}
        >
          Búsqueda sin coincidencias
        </h2>
        <p
          className="text-black/55 max-w-md mx-auto mb-8 text-sm"
          style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
        >
          Prueba con otra palabra o limpia los filtros de categoría y fecha para ver el archivo completo.
        </p>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-black/15 hover:border-[#001156]/50 text-black/80 hover:text-[#001156] transition-all duration-300 text-xs font-semibold cursor-pointer"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Limpiar búsqueda y filtros
        </button>
      </div>
    </motion.section>
  );
}
