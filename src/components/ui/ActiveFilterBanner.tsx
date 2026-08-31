import React from 'react';
import { Search, X, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

interface ActiveFilterBannerProps {
  query: string;
  matchedCount: number;
  onClear: () => void;
}

export const ActiveFilterBanner: React.FC<ActiveFilterBannerProps> = ({ query, matchedCount, onClear }) => {
  if (!query || !query.trim()) return null;

  return (
    <div className="glass-panel p-3.5 rounded-2xl border border-gold-400/40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-lg shadow-gold-500/5 animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-400 shrink-0">
          <Search className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-semibold">
              Mostrando resultados para:
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-gold-400/20 text-gold-300 font-extrabold text-xs border border-gold-400/40 flex items-center gap-1.5">
              <BlackPantherIcon size={12} />
              "{query}"
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {matchedCount > 0
              ? `Se encontraron ${matchedCount} métricas y contenidos coincidentes.`
              : 'Filtrado inteligente en tiempo real.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
          title="Remover filtro activo"
        >
          <X className="w-3.5 h-3.5" />
          <span>Remover filtro</span>
        </button>
      </div>
    </div>
  );
};
