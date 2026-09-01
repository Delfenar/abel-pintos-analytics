import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { SearchX, RotateCcw, Sparkles, Music2, MapPin } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

interface SearchEmptyStateProps {
  query: string;
  onReset: () => void;
  onSuggestionClick: (suggestion: string) => void;
}

export const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({ query, onReset, onSuggestionClick }) => {
  const { liveSheetsRecords } = useDashboard();

  // Dynamic campaigns extracted strictly from unique 'Tema_Campania' in Google Sheets
  const dynamicCampaigns = [...new Set(liveSheetsRecords.map(item => item.campania).filter(Boolean))];
  const campaignSuggestions = dynamicCampaigns.length > 0 ? dynamicCampaigns : ['Ibuprofeno', 'BUENAVENTURA TOUR 2026'];

  // Dynamic track titles
  const dynamicTitles = [...new Set(
    liveSheetsRecords
      .map(item => item.titulo.split('-')[0]?.trim() || item.campania)
      .filter(Boolean)
  )];
  const songSuggestions = dynamicTitles.length > 0 ? dynamicTitles.slice(0, 4) : ['Ibuprofeno'];

  return (
    <div className="glass-panel-gold rounded-3xl p-10 text-center max-w-2xl mx-auto my-8 border border-gold-400/40 shadow-2xl animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-gold-400/50 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-gold-500/10">
        <SearchX className="w-8 h-8 text-gold-400" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-bold mb-3">
        <BlackPantherIcon size={14} />
        Base de Datos Google Sheets — En Vivo
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight mb-2">
        Sin resultados registrados en la base de datos para "{query}"
      </h3>

      <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
        El término no cuenta con registros en la hoja maestra. Selecciona alguna de las campañas indexadas o limpia el filtro para ver todos los datos.
      </p>

      {/* Suggestion Chips */}
      <div className="space-y-4 mb-8 pt-4 border-t border-slate-800/80">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Campañas Disponibles en Google Sheets:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {campaignSuggestions.map((camp) => (
              <button
                key={camp}
                onClick={() => onSuggestionClick(camp)}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-gold-400/30 text-gold-300 hover:border-gold-400 hover:bg-gold-400/15 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                🎯 {camp}
              </button>
            ))}
          </div>
        </div>

        {songSuggestions.length > 0 && (
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center justify-center gap-1.5">
              <Music2 className="w-3.5 h-3.5 text-gold-400" />
              Lanzamientos Indexados:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {songSuggestions.map((song) => (
                <button
                  key={song}
                  onClick={() => onSuggestionClick(song)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 hover:border-gold-400 hover:text-gold-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  🎵 {song}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action button */}
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-gold-500/20 transition-all cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Limpiar Filtro de Búsqueda
      </button>
    </div>
  );
};
