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
  CheckCircle2,
  Scale,
  TrendingUp,
  Percent,
  BarChart3,
  ArrowRightLeft
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

  const dual = aggregation.dualMetrics;

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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold">
                <Scale className="w-3.5 h-3.5" />
                Modo Métricas Dual Activo
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight flex items-center gap-2 flex-wrap">
              <span>Resultados para:</span>
              <span className="text-gold-300 drop-shadow-sm font-extrabold underline decoration-gold-400/60 decoration-2 underline-offset-4">
                "{aggregation.query}"
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300">
              Cruza relacional en las 7 plataformas oficiales, discografía, campañas y análisis dual de impacto vs. benchmark global.
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

      {/* 2. Tarjeta Principal Comparativa de Impacto Dual (Hero Benchmark Card) */}
      <div className="glass-panel p-6 rounded-3xl border border-gold-400/40 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-100 tracking-tight">
                  Vista de Métricas Dual — Impacto Exclusivo vs. Total Global
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 text-[10px] font-bold">
                  Share of Voice
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Contraste simultáneo del volumen de <strong className="text-gold-300">"{aggregation.query}"</strong> frente al total consolidado del artista
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Participación: {dual.shareOfVoice}%
            </span>
          </div>
        </div>

        {/* 3-Column Comparative Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Valor A: Impacto Filtrado */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-gold-400/30 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                Impacto de "{aggregation.query}"
              </span>
              <span className="px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-300 text-[10px] font-bold border border-gold-400/20">
                Filtrado
              </span>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-100 font-mono tracking-tight">
                {dual.filteredImpact.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Streams + Vistas + Alcance exclusivo de las <strong>{aggregation.totalResults}</strong> piezas encontradas
              </div>
            </div>
            <div className="text-[11px] text-gold-300/80 font-medium border-t border-slate-800 pt-2 flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-400" />
              <span>{dual.filteredInteractions.toLocaleString()} interacciones directas</span>
            </div>
          </div>

          {/* Valor Central: Cuota de Aporte / Share of Voice */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/40 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="w-4 h-4" />
                Cuota de Aporte (% Global)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-bold border border-emerald-500/20">
                Share of Voice
              </span>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight flex items-baseline gap-1">
                <span>{dual.shareOfVoice}%</span>
                <span className="text-xs font-normal text-slate-400">del total</span>
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Representa el <strong className="text-emerald-300">{dual.shareOfVoice}%</strong> del volumen total del ecosistema en el periodo.
              </div>
            </div>
            {/* Visual Contribution Progress Bar */}
            <div className="space-y-1 border-t border-slate-800 pt-2">
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-gold-400 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${Math.min(Math.max(dual.shareOfVoice, 2), 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Tema: {dual.shareOfVoice}%</span>
                <span>Resto del Catálogo: {(100 - dual.shareOfVoice).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Valor B: Impacto Total Global de Referencia */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-sky-500/30 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                Impacto Global en el Periodo
              </span>
              <span className="px-2 py-0.5 rounded-full bg-sky-400/10 text-sky-300 text-[10px] font-bold border border-sky-400/20">
                Benchmark
              </span>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-100 font-mono tracking-tight">
                {dual.globalBenchmarkImpact.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Volumen consolidado de todas las canciones y campañas en las 7 redes oficiales
              </div>
            </div>
            <div className="text-[11px] text-sky-300/80 font-medium border-t border-slate-800 pt-2 flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-400" />
              <span>{dual.globalInteractions.toLocaleString()} interacciones globales</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Desglose Multiplataforma Lado a Lado (Side-by-Side Platform Grid) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-gold-400" />
            <h3 className="text-lg font-black text-slate-100">
              Desglose Multiplataforma Lado a Lado (Tema vs. Canal)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Métrica exclusiva del tema vs. volumen total de la red
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {platformsList.map(platform => {
            const data = dual.platformBreakdowns[platform];
            if (!data) return null;
            const hasMatches = data.filteredCount > 0;

            return (
              <div 
                key={platform} 
                className={`glass-panel p-4 rounded-2xl border transition-all ${
                  hasMatches 
                    ? 'border-slate-800 bg-slate-900/90 hover:border-gold-400/50 shadow-md' 
                    : 'border-slate-800/50 bg-slate-950/50 opacity-60'
                }`}
              >
                {/* Platform Header */}
                <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    {platformIcons[platform]}
                    <span className="text-sm font-bold text-slate-100">{platform}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    hasMatches ? 'bg-gold-400/10 text-gold-400 border border-gold-400/30' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {data.sharePercent}% cuota
                  </span>
                </div>

                {/* Side-by-Side Metric Columns */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-gold-400/20">
                    <span className="text-[10px] font-semibold text-gold-400 uppercase block truncate">
                      "{aggregation.query}"
                    </span>
                    <span className="text-sm font-black text-slate-100 font-mono block mt-0.5">
                      {data.filteredImpact.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {data.filteredCount} {data.filteredCount === 1 ? 'post' : 'posts'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">
                      Total Red
                    </span>
                    <span className="text-sm font-black text-slate-300 font-mono block mt-0.5">
                      {data.globalImpact.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {data.globalCount} {data.globalCount === 1 ? 'post' : 'posts'}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-gold-400 to-amber-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(Math.max(data.sharePercent, hasMatches ? 3 : 0), 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Aporte: {data.sharePercent}%</span>
                    <span>{hasMatches ? 'Activo' : 'Sin registros'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Desglose de Publicaciones por Canal (Listado de Contenido) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gold-400" />
            <h3 className="text-lg font-black text-slate-100">
              Listado de Publicaciones Indexadas
            </h3>
          </div>

          {/* Platform Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-gold-400 text-slate-950 shadow-md shadow-gold-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Todas ({aggregation.totalResults})
            </button>

            {platformsList.map((p) => {
              const count = aggregation.platformCounts[p] || 0;
              if (count === 0) return null;

              return (
                <button
                  key={p}
                  onClick={() => setActiveTab(p)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === p
                      ? 'bg-slate-100 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {platformIcons[p]}
                  <span>{p}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === p ? 'bg-slate-900 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedRecords.map((rec) => {
            const metrics = rec.metricas;
            const impact = metrics.reproducciones + metrics.alcance;

            return (
              <div
                key={rec.id}
                className="glass-panel p-5 rounded-3xl border border-slate-800 bg-slate-900/80 hover:border-gold-400/40 hover:bg-slate-900 transition-all flex flex-col justify-between space-y-4 group shadow-lg"
              >
                <div className="space-y-3">
                  {/* Top Row: Platform Badge + Content Type + Date */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200">
                        {platformIcons[rec.plataforma]}
                        <span>{rec.plataforma}</span>
                      </span>

                      <span className="px-2 py-0.5 rounded-lg bg-gold-400/10 border border-gold-400/20 text-gold-300 text-[10px] font-semibold">
                        {rec.tipoContenido}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {rec.fecha}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-gold-300 transition-colors line-clamp-2">
                      {rec.titulo}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {rec.descripcion}
                    </p>
                  </div>

                  {/* Metadata Chips: Campaign, Album, City */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {rec.campania && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium flex items-center gap-1">
                        <Flame className="w-2.5 h-2.5 text-amber-400" />
                        {rec.campania}
                      </span>
                    )}

                    {rec.album && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium flex items-center gap-1">
                        <Disc className="w-2.5 h-2.5 text-emerald-400" />
                        {rec.album}
                      </span>
                    )}

                    {rec.ciudad && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-sky-400" />
                        {rec.ciudad}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1">
                    {rec.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded bg-slate-950/70 border border-slate-800/80 text-[10px] text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Metrics Grid + Action Link */}
                <div className="border-t border-slate-800/80 pt-3 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Impacto
                      </span>
                      <span className="text-xs font-black text-gold-300 font-mono block mt-0.5">
                        {impact.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Interacciones
                      </span>
                      <span className="text-xs font-black text-rose-300 font-mono block mt-0.5">
                        {metrics.interacciones.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                        Guardados
                      </span>
                      <span className="text-xs font-black text-sky-300 font-mono block mt-0.5">
                        {metrics.guardados.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {rec.enlacePublicacion && (
                    <a
                      href={rec.enlacePublicacion}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-slate-800/60 hover:bg-gold-400/20 text-slate-300 hover:text-gold-300 text-xs font-bold transition-all border border-slate-700/50 hover:border-gold-400/40"
                    >
                      <span>Ver publicación en {rec.plataforma}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Printable Report Modal */}
      <PrintReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        query={aggregation.query}
      />
    </div>
  );
};
