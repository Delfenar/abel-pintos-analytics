import React, { useState, useRef, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Search, X, Music2, MapPin, Sparkles, Layers, TrendingUp } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

export const GlobalSearch: React.FC = () => {
  const { searchQuery, setSearchQuery } = useDashboard();
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const songChips = ['Oncemil', 'Motivos', 'Sin Principio Ni Final', 'Piedra Libre', 'Alta en el Cielo'];
  const campaignChips = ['Gira 30 Años', 'Rosario', 'Buenos Aires', 'Lanzamiento Libro', 'Streaming 2026'];

  // Handle outside click to close suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
    setIsFocused(false);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md lg:max-w-lg">
      {/* Search Input Container */}
      <div className={`relative flex items-center bg-slate-900/90 border rounded-2xl transition-all duration-300 ${
        isFocused || searchQuery
          ? 'border-gold-400/80 shadow-lg shadow-gold-500/10 ring-1 ring-gold-400/30'
          : 'border-gold-400/30 hover:border-gold-400/50'
      }`}>
        <div className="pl-3.5 text-gold-400">
          <Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Buscar campaña, canción (ej. Oncemil, Motivos), ciudad o palabra clave..."
          className="w-full bg-transparent pl-3 pr-9 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />

        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title="Limpiar búsqueda"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Quick Suggestions Popover when focused */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 glass-panel-gold rounded-2xl border border-gold-400/50 shadow-2xl z-40 space-y-3.5 animate-fade-in bg-slate-950/98 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
              <BlackPantherIcon size={14} />
              Sugerencias Rápidas
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Click para filtrar</span>
          </div>

          {/* Songs Section */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1.5">
              <Music2 className="w-3 h-3 text-gold-400" />
              Canciones Populares:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {songChips.map((song) => (
                <button
                  key={song}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectTag(song);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                    searchQuery.toLowerCase() === song.toLowerCase()
                      ? 'bg-gold-400 text-slate-950 border-gold-400 font-bold'
                      : 'bg-slate-900/90 text-gold-300 border-gold-400/30 hover:border-gold-400 hover:bg-gold-400/10'
                  }`}
                >
                  🎵 {song}
                </button>
              ))}
            </div>
          </div>

          {/* Campaigns / Cities Section */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1.5">
              <MapPin className="w-3 h-3 text-amber-400" />
              Campañas & Ciudades:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {campaignChips.map((camp) => (
                <button
                  key={camp}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectTag(camp);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                    searchQuery.toLowerCase() === camp.toLowerCase()
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-amber-400 hover:text-amber-300'
                  }`}
                >
                  🎯 {camp}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
