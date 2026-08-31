import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  UniversalSearchAggregation, 
  UniversalRecord, 
  PlatformName 
} from '../../services/searchEngineService';
import { 
  Search, 
  X, 
  Download, 
  ExternalLink, 
  Layers, 
  Flame, 
  Heart, 
  Eye, 
  Bookmark, 
  MousePointer, 
  Music, 
  Youtube, 
  Instagram, 
  Video, 
  Facebook, 
  Twitter, 
  AtSign, 
  Award,
  Calendar,
  MapPin,
  Disc,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';
import { PrintReportModal } from './PrintReportModal';

interface UniversalSearchResultsProps {
  aggregation: UniversalSearchAggregation;
  onClear: () => void;
}

export const UniversalSearchResults: React.FC<UniversalSearchResultsProps> = ({ aggregation, onClear }) => {
  const [activeTab, setActiveTab] = useState<PlatformName | 'all'>('all');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const platformIcons: Record<PlatformName, React.ReactNode> = {
    Spotify: <Music className="w-4 h-4 text-emerald-400" />,
    YouTube: <Youtube className="w-4 h-4 text-red-500" />,
    Instagram: <Instagram className="w-4 h-4 text-pink-400" />,
    TikTok: <Video className="w-4 h-4 text-cyan-400" />,
    Facebook: <Facebook className="w-4 h-4 text-blue-400" />,
    X: <Twitter className="w-4 h-4 text-sky-400" />,
    Threads: <AtSign className="w-4 h-4 text-slate-200" />,
  };

  const platformColors: Record<PlatformName, string> = {
    Spotify: '#1DB954',
    YouTube: '#FF0000',
    Instagram: '#E1306C',
    TikTok: '#00F2FE',
    Facebook: '#1877F2',
    X: '#1DA1F2',
    Threads: '#FFFFFF',
  };

  const platformsList: PlatformName[] = ['Spotify', 'YouTube', 'Instagram', 'TikTok', 'Facebook', 'X', 'Threads'];

  const displayedRecords = activeTab === 'all' 
    ? aggregation.allResults 
    : aggregation.groupedResults[activeTab];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Top Search Header Banner */}
      <div className="glass-panel-gold p-6 rounded-3xl border border-gold-400/50 shadow-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-xs font-black tracking-wide">
                <BlackPantherIcon size={16} />
                BÚSQUEDA RELACIONAL UNIVERSAL
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {aggregation.totalResults} publicaciones encontradas
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight flex items-center gap-2 flex-wrap">
              <span>Resultados para:</span>
              <span className="text-gold-300 drop-shadow-sm font-extrabold underline decoration-gold-400/60 decoration-2 underline-offset-4">
                "{aggregation.query}"
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300">
              Cruza relacional en las 7 plataformas oficiales, discografía, campañas y contenidos de Abel Pintos.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-gold-500/20 transition-all cursor-pointer"
              title="Descargar o imprimir informe formal en PDF"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Descargar Informe en PDF</span>
            </button>

            <button
              onClick={onClear}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer shadow-sm"
              title="Volver al panel general"
            >
              <X className="w-4 h-4" />
              <span>Limpiar búsqueda</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Consolidated Impact Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Impacts */}
        <div className="glass-panel p-5 rounded-3xl border border-gold-400/30 bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Eye className="w-4 h-4 text-gold-400" />
            Impacto Total (Streams & Alcance)
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
            {aggregation.totalImpacts.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            Streams + Vistas + Alcance directo filtrado
          </div>
        </div>

        {/* Total Interactions */}
        <div className="glass-panel p-5 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Heart className="w-4 h-4 text-rose-400" />
            Total Interacciones
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
            {aggregation.totalInteractions.toLocaleString()}
          </div>
          <div className="text-[11px] text-rose-300 font-semibold mt-1">
            Likes, comentarios & compartidos
          </div>
        </div>

        {/* Top Platform */}
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Award className="w-4 h-4 text-emerald-400" />
            Plataforma Líder
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight flex items-center gap-2">
            {platformIcons[aggregation.topPlatform]}
            <span>{aggregation.topPlatform}</span>
          </div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">
            Mayor tracción para "{aggregation.query}"
          </div>
        </div>

        {/* Channels & Records Count */}
        <div className="glass-panel p-5 rounded-3xl border border-sky-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Layers className="w-4 h-4 text-sky-400" />
            Publicaciones Indexadas
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
            {aggregation.totalResults} Registros
          </div>
          <div className="text-[11px] text-sky-300 font-semibold mt-1">
            En 7 redes oficiales
          </div>
        </div>
      </div>

      {/* 3. Desglose por Canal (Platform Filter Tabs) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gold-400" />
            <h3 className="text-lg font-black text-slate-100">
              Desglose de Publicaciones por Canal
            </h3>
          </div>

          {/* Platform Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-gold-400 text-slate-950 font-black shadow-md shadow-gold-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              Todos ({aggregation.totalResults})
            </button>

            {platformsList.map((plat) => {
              const count = aggregation.platformCounts[plat] || 0;
              if (count === 0) return null;
              return (
                <button
                  key={plat}
                  onClick={() => setActiveTab(plat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === plat
                      ? 'bg-slate-800 text-gold-300 border border-gold-400/50 shadow-sm'
                      : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {platformIcons[plat]}
                  <span>{plat}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedRecords.map((rec) => (
            <div
              key={rec.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-gold-400/40 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      {platformIcons[rec.plataforma]}
                    </span>
                    <span className="text-xs font-extrabold uppercase tracking-wide text-slate-200">
                      {rec.plataforma}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                      {rec.tipoContenido}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">
                    {rec.fecha}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-100 group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">
                  {rec.titulo}
                </h4>

                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  {rec.descripcion}
                </p>

                {/* Metadata Tags (City, Album, Campaign, Song Tags) */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  {rec.ciudad && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-900 text-amber-300/90 border border-amber-500/20">
                      <MapPin className="w-2.5 h-2.5" />
                      {rec.ciudad}
                    </span>
                  )}
                  {rec.album && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-900 text-emerald-300/90 border border-emerald-500/20">
                      <Disc className="w-2.5 h-2.5" />
                      {rec.album}
                    </span>
                  )}
                  {rec.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics Breakdown Row */}
              <div className="pt-3 border-t border-slate-850 grid grid-cols-3 gap-2 text-center text-xs bg-slate-950/40 p-2.5 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Reproducciones</span>
                  <span className="font-mono font-bold text-slate-200">
                    {rec.metricas.reproducciones > 0 ? rec.metricas.reproducciones.toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Alcance</span>
                  <span className="font-mono font-bold text-gold-400">
                    {rec.metricas.alcance > 0 ? rec.metricas.alcance.toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Interacciones</span>
                  <span className="font-mono font-bold text-rose-400">
                    {rec.metricas.interacciones.toLocaleString()}
                  </span>
                </div>
              </div>

              {rec.enlacePublicacion && (
                <div className="flex justify-end pt-1">
                  <a
                    href={rec.enlacePublicacion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <span>Ver en {rec.plataforma}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PDF Export Modal */}
      <PrintReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        query={aggregation.query}
      />
    </div>
  );
};
