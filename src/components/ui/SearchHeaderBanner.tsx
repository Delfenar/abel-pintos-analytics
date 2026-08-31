import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Search, X, FileText, Download, Calendar, Layers, CheckCircle2, Music2 } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';
import { PrintReportModal } from './PrintReportModal';

interface SearchHeaderBannerProps {
  query: string;
  matchedCount: number;
  onClear: () => void;
}

export const SearchHeaderBanner: React.FC<SearchHeaderBannerProps> = ({ query, matchedCount, onClear }) => {
  const { filteredPlatformDataMap, dateRange } = useDashboard();
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  if (!query || !query.trim()) return null;

  // Extract platforms with matching content
  const activePlatforms = Object.entries(filteredPlatformDataMap)
    .filter(([_, p]) => p.topContent.length > 0)
    .map(([key, _]) => key.charAt(0).toUpperCase() + key.slice(1));

  const platformsLabel = activePlatforms.length > 0 
    ? activePlatforms.join(', ')
    : 'Spotify, Instagram, YouTube, Facebook, Twitter, TikTok, Threads';

  return (
    <>
      <div className="glass-panel-gold p-6 rounded-3xl border border-gold-400/50 shadow-2xl animate-fade-in relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          {/* Main Title & Metadata */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-xs font-bold">
                <BlackPantherIcon size={16} />
                BÚSQUEDA INTELIGENTE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {matchedCount} registros encontrados
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight flex items-center gap-2 flex-wrap">
              <span>Resultados para:</span>
              <span className="text-gold-300 drop-shadow-sm font-extrabold underline decoration-gold-400/60 decoration-2 underline-offset-4">
                "{query}"
              </span>
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300/90 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Layers className="w-3.5 h-3.5 text-gold-400" />
                Plataformas activas: <strong className="text-slate-100">{platformsLabel}</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Periodo: <strong className="text-slate-100 uppercase">{dateRange} (Agosto 2026)</strong>
              </span>
            </div>
          </div>

          {/* Action Buttons: PDF Export & Clear Search */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-gold-500/20 transition-all cursor-pointer"
              title="Descargar o imprimir informe formal en PDF"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Descargar Informe en PDF</span>
            </button>

            <button
              onClick={onClear}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer shadow-sm"
              title="Volver a la vista general"
            >
              <X className="w-4 h-4" />
              <span>Limpiar búsqueda</span>
            </button>
          </div>
        </div>
      </div>

      {/* PDF Export Preview & Print Modal */}
      <PrintReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        query={query}
      />
    </>
  );
};
