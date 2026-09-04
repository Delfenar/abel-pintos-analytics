import React from 'react';
import { LiveHeader } from '../ui/LiveHeader';
import { LiveStatCards } from '../ui/LiveStatCards';
import { LiveDailyPulse } from '../ui/LiveDailyPulse';
import { ComparativeHeaderBanner } from '../ui/ComparativeHeaderBanner';
import { UniversalSearchResults } from '../ui/UniversalSearchResults';
import { SearchEmptyState } from '../ui/SearchEmptyState';
import { useDashboard } from '../../context/DashboardContext';
import { ChannelAudienceCards } from '../ui/ChannelAudienceCards';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { CAMPAIGNS } from '../../services/mockDataService';
import { getLatestSnapshotPerContent, getLatestSnapshotsByItem, cleanNumber, PlatformName } from '../../services/searchEngineService';
import { BlackPantherIcon } from '../ui/BlackPantherIcon';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  ReferenceDot 
} from 'recharts';
import { Disc, Award, ShieldCheck, Layers, Sparkles, Music2, Music, Youtube, Instagram, Video, Facebook, Twitter, AtSign, Users, ArrowRightLeft, Flag, Settings } from 'lucide-react';
import { SingleDayView } from './SingleDayView';

// Custom Panther Face Marker Dot for Recharts Graphs
const PantherMarkerDot = (props: any) => {
  const { cx, cy } = props;
  if (cx === undefined || cy === undefined || isNaN(cx) || isNaN(cy)) return null;
  return (
    <g transform={`translate(${cx - 14}, ${cy - 14})`} className="cursor-pointer">
      <circle cx="14" cy="14" r="15" fill="#0F172A" stroke="#D4AF37" strokeWidth="1.5" className="shadow-lg shadow-gold-500/50" />
      <BlackPantherIcon size={28} />
    </g>
  );
};

export const OverviewView: React.FC = () => {
  const { 
    filteredOverview, 
    filteredPlatformDataMap, 
    searchQuery,
    setSearchQuery,
    universalSearchAggregation,
    liveSheetsRecords,
    channelAudienceMetrics,
    consolidatedCampaignMetrics,
    campaigns,
    dateRange, 
    activeCampaign, 
    comparisonMode,
    customComparisonType,
    displayValueType,
    showMilestones,
    setIsSettingsModalOpen
  } = useDashboard();

  const currentCampaignInfo = campaigns.find(c => c.id === activeCampaign) || campaigns[0] || CAMPAIGNS[0];

  const allTopContent = React.useMemo(() => {
    if (liveSheetsRecords && liveSheetsRecords.length > 0) {
      const latestRecords = getLatestSnapshotPerContent(liveSheetsRecords);
      return latestRecords
        .filter(r => {
          if (activeCampaign === 'all') return true;
          return r.campania.toLowerCase().replace(/[^a-z0-9]/g, '_') === activeCampaign || r.campania.toLowerCase() === activeCampaign.toLowerCase();
        })
        .map(r => ({
          id: r.id,
          platform: (r.plataforma.toLowerCase() === 'x' ? 'twitter' : r.plataforma.toLowerCase()) as any,
          title: r.titulo,
          type: r.tipoContenido,
          campaignId: r.campania.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          publishedAt: r.fecha,
          url: r.enlacePublicacion,
          metrics: {
            viewsOrReach: cleanNumber(r.metricas.reproducciones) + cleanNumber(r.metricas.alcance),
            interactions: cleanNumber(r.metricas.interacciones),
            engagementRate: cleanNumber(r.metricas.alcance) > 0 ? Number(((cleanNumber(r.metricas.interacciones) / cleanNumber(r.metricas.alcance)) * 100).toFixed(2)) : 5.2,
            sharesOrReposts: cleanNumber(r.metricas.guardados),
            saves: cleanNumber(r.metricas.guardados)
          }
        }))
        .sort((a, b) => b.metrics.viewsOrReach - a.metrics.viewsOrReach);
    }
    return Object.values(filteredPlatformDataMap)
      .flatMap((p) => p.topContent)
      .filter((c) => activeCampaign === 'all' || c.campaignId === activeCampaign)
      .sort((a, b) => b.metrics.viewsOrReach - a.metrics.viewsOrReach);
  }, [liveSheetsRecords, activeCampaign, filteredPlatformDataMap]);

  // Distribution by Channel (Simultaneous Visible Metrics & Real-Time Consolidated Data)
  const audienceDistribution = React.useMemo(() => {
    const channelConfigs: {
      platform: PlatformName;
      name: string;
      icon: React.ReactNode;
      brandColor: string;
      barGradient: string;
    }[] = [
      {
        platform: 'Spotify',
        name: 'Spotify',
        icon: <Music className="w-4 h-4 text-emerald-400" />,
        brandColor: '#1DB954',
        barGradient: 'linear-gradient(90deg, #107C32 0%, #1DB954 100%)',
      },
      {
        platform: 'YouTube',
        name: 'YouTube',
        icon: <Youtube className="w-4 h-4 text-red-500" />,
        brandColor: '#FF0000',
        barGradient: 'linear-gradient(90deg, #990000 0%, #FF0000 100%)',
      },
      {
        platform: 'Instagram',
        name: 'Instagram',
        icon: <Instagram className="w-4 h-4 text-pink-400" />,
        brandColor: '#E1306C',
        barGradient: 'linear-gradient(90deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)',
      },
      {
        platform: 'TikTok',
        name: 'TikTok',
        icon: <Video className="w-4 h-4 text-cyan-400" />,
        brandColor: '#00F2FE',
        barGradient: 'linear-gradient(90deg, #0f172a 0%, #00F2FE 70%, #FE2C55 100%)',
      },
      {
        platform: 'Facebook',
        name: 'Facebook',
        icon: <Facebook className="w-4 h-4 text-blue-400" />,
        brandColor: '#1877F2',
        barGradient: 'linear-gradient(90deg, #0C51AB 0%, #1877F2 100%)',
      },
    ];

    const list = channelConfigs.map((cfg) => {
      const aud = channelAudienceMetrics[cfg.platform] || {
        platform: cfg.platform,
        visualizaciones: 0,
        interacciones: 0,
        contenidosCompartidos: 0,
        nuevosSeguidores: 0,
        totalSeguidores: 0,
        publicacionesCount: 0,
      };

      const platPosts = (consolidatedCampaignMetrics?.consolidatedRecords || []).filter(
        (r) => r.plataforma === cfg.platform
      );
      const postStreams = platPosts.reduce((acc, r) => acc + cleanNumber(r.metricas?.reproducciones), 0);
      const postInteractions = platPosts.reduce((acc, r) => acc + cleanNumber(r.metricas?.interacciones), 0);

      const streamsValue = postStreams > 0 ? postStreams : aud.visualizaciones;
      const interactionsValue = postInteractions > 0 ? postInteractions : aud.interacciones;

      let audienceValue = 0;
      let audienceFormatted = '';
      if (cfg.platform === 'Spotify') {
        audienceValue = aud.oyentesMensuales || 3700000;
        audienceFormatted = `${(audienceValue / 1000000).toFixed(1)}M oyentes`;
      } else if (cfg.platform === 'YouTube') {
        audienceValue = aud.suscriptores || aud.totalSeguidores || 1710000;
        audienceFormatted = `${(audienceValue / 1000000).toFixed(2)}M suscriptores`;
      } else if (cfg.platform === 'TikTok') {
        audienceValue = aud.totalSeguidores || 850000;
        audienceFormatted = `${(audienceValue / 1000).toFixed(0)}K seguidores`;
      } else if (cfg.platform === 'Facebook') {
        audienceValue = aud.totalSeguidores || 3800000;
        audienceFormatted = `${(audienceValue / 1000000).toFixed(2)}M seguidores`;
      } else {
        audienceValue = aud.totalSeguidores || 2550000;
        audienceFormatted = `${(audienceValue / 1000000).toFixed(2)}M seguidores`;
      }

      const streamsFormatted =
        streamsValue >= 1000000
          ? `${(streamsValue / 1000000).toFixed(1)}M ${cfg.platform === 'Spotify' ? 'streams' : cfg.platform === 'YouTube' ? 'views' : 'reprod.'}`
          : streamsValue > 0
          ? `${streamsValue.toLocaleString()} ${cfg.platform === 'Spotify' ? 'streams' : cfg.platform === 'YouTube' ? 'views' : 'reprod.'}`
          : '0 views';

      const interactionsFormatted =
        interactionsValue >= 1000000
          ? `${(interactionsValue / 1000000).toFixed(1)}M interac.`
          : interactionsValue >= 1000
          ? `${(interactionsValue / 1000).toFixed(0)}K interac.`
          : `${interactionsValue.toLocaleString()} interac.`;

      const impactScore = audienceValue + streamsValue + interactionsValue;

      return {
        ...cfg,
        audienceValue,
        audienceFormatted,
        streamsValue,
        streamsFormatted,
        interactionsValue,
        interactionsFormatted,
        impactScore,
        sharePercentage: 0,
        fechaActualizacion: aud.fechaActualizacion,
      };
    });

    const totalImpact = list.reduce((acc, item) => acc + item.impactScore, 0) || 1;

    const withShare = list.map((item) => ({
      ...item,
      sharePercentage: Math.round((item.impactScore / totalImpact) * 1000) / 10,
    }));

    // Ordered strictly from MAYOR a MENOR
    return withShare.sort((a, b) => b.impactScore - a.impactScore);
  }, [channelAudienceMetrics, consolidatedCampaignMetrics]);

  // Custom Dual Tooltip with Absolute vs Percentage Display & Panther Badge
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const cur = payload.find((p: any) => p.dataKey === 'current' || p.dataKey === 'Spotify' || p.dataKey === 'Streams');
      const comp = payload.find((p: any) => p.dataKey === 'comparison' || p.dataKey === 'Spotify Anterior' || p.dataKey === 'Streams Anterior');

      const curVal = cur ? Number(cur.value) : 0;
      const compVal = comp ? Number(comp.value) : 0;
      const diff = curVal - compVal;
      const pct = compVal > 0 ? ((diff / compVal) * 100).toFixed(1) : '0.0';

      const milestoneMatch = filteredOverview.milestones.find(m => m.date === label);

      return (
        <div className="glass-panel p-3.5 rounded-2xl border border-gold-400/50 text-xs shadow-2xl space-y-1.5 bg-slate-950/95 text-slate-100 max-w-xs">
          <div className="font-extrabold border-b border-slate-800 pb-1.5 flex items-center justify-between text-gold-300">
            <span className="flex items-center gap-1.5">
              <BlackPantherIcon size={18} />
              {label}
            </span>
            {milestoneMatch && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-400 border border-gold-400/40 flex items-center gap-1">
                <Flag className="w-3 h-3" /> Hito Panter
              </span>
            )}
          </div>

          {milestoneMatch && (
            <div className="p-2 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-300 font-semibold text-[11px] flex items-center gap-2">
              <BlackPantherIcon size={16} />
              <span>🎯 {milestoneMatch.title}</span>
            </div>
          )}

          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 font-medium">Periodo Actual:</span>
              <span className="font-mono font-bold text-gold-400 text-sm">
                {curVal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500 font-medium">Periodo Comparativo:</span>
              <span className="font-mono font-semibold text-slate-400">
                {compVal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1.5 border-t border-slate-800/80">
              <span className="text-slate-400 font-semibold">Variación Temporal:</span>
              <span className={`font-mono font-black ${diff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {displayValueType === 'absolute' 
                  ? `${diff >= 0 ? '+' : ''}${diff.toLocaleString()} ΔN`
                  : `${diff >= 0 ? '+' : ''}${pct}%`}
              </span>
            </div>
          </div>

          {milestoneMatch?.category && (
            <div className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-900">
              Categoría de Hito: {milestoneMatch.category}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // If a search query is active, render Universal Search Results or Empty State
  if (searchQuery && searchQuery.trim()) {
    if (universalSearchAggregation.totalResults === 0) {
      return (
        <div className="space-y-6">
          <SearchEmptyState 
            query={searchQuery} 
            onReset={() => setSearchQuery('')}
            onSuggestionClick={(suggestion) => setSearchQuery(suggestion)}
          />
        </div>
      );
    }

    return (
      <UniversalSearchResults
        aggregation={universalSearchAggregation}
        onClear={() => setSearchQuery('')}
      />
    );
  }

  // If Single Day View mode is active, render SingleDayView
  if (dateRange === '1d') {
    return <SingleDayView />;
  }

  // Default Home Screen: Live Real-Time Control Panel & Consolidated Overview
  return (
    <div className="space-y-6">
      {/* 1. Dynamic Live Header with Real-Time Clock & Pulsing Badge */}
      <LiveHeader />

      {/* 2. Live Stat Cards for 7 Official Networks */}
      <LiveStatCards />

      {/* 2.5 Global Channel Metrics from Audiencia_General (Visualizaciones, Interacciones, Compartidos, Nuevos Seguidores) */}
      <ChannelAudienceCards />

      {/* 3. 24h Daily Pulse (Hourly Streams/Interactions) & Live Featured Content Feed */}
      <LiveDailyPulse />

      {/* 4. Dynamic Comparative Header Banner */}
      <ComparativeHeaderBanner />

      {/* 5. Main Evolution Timeline Chart with Panther Face Markers */}
      <div className="glass-panel p-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
              <BlackPantherIcon size={20} />
              Evolución Multicanal & Hitos Clave
            </h3>
            <p className="text-xs text-slate-400">
              Contrastando Periodo Actual vs. Periodo Comparativo con marcadores de hitos oficiales.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gold-400 shadow-sm shadow-gold-500/50" />
              <span className="text-slate-200">Periodo Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 border-b-2 border-dashed border-slate-500" />
              <span className="text-slate-400">Comparativo</span>
            </div>
            {showMilestones && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gold-400/10 border border-gold-400/30 text-gold-300">
                <BlackPantherIcon size={14} />
                <span>Hitos Activos</span>
              </div>
            )}
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredOverview.multiPlatformTimeSeries} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="compAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="comparison"
                name="Periodo Anterior"
                stroke="#64748B"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#compAreaGrad)"
              />

              <Area
                type="monotone"
                dataKey="current"
                name="Periodo Actual"
                stroke="#D4AF37"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#goldAreaGrad)"
              />

              {/* Render Panther Face Marker Dots on Milestone Days */}
              {showMilestones && filteredOverview.milestones.map((ms) => {
                const matchedPoint = filteredOverview.multiPlatformTimeSeries.find(p => p.date === ms.date);
                if (!matchedPoint) return null;
                return (
                  <ReferenceDot
                    key={ms.id}
                    x={ms.date}
                    y={matchedPoint.current}
                    shape={<PantherMarkerDot />}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. Distribución de Audiencia por Canal (Barras con Métricas Visibles Simultáneas) */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-100 flex items-center gap-2">
                <span>Distribución de Audiencia por Canal</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-400/10 text-gold-300 text-[10px] font-bold border border-gold-400/30">
                100% Simultáneo
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cuota de impacto relativo en la comunidad digital de Abel Pintos — Métricas clave ordenadas de mayor a menor.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Consolidado oficial en tiempo real</span>
          </div>
        </div>

        {/* Horizontal Bar Cards Stack */}
        <div className="space-y-4">
          {audienceDistribution.map((item, idx) => (
            <div
              key={item.platform}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-gold-400/40 transition-all space-y-3.5 group shadow-lg"
            >
              {/* Row 1: Platform Header & Simultaneous Metric Badges */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Left: Platform Identity */}
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-950 font-mono text-xs font-bold text-gold-400 border border-slate-800">
                    #{idx + 1}
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-black text-slate-100 group-hover:text-gold-300 transition-colors">
                        {item.name}
                      </span>
                      {item.fechaActualizacion && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-emerald-400 border border-emerald-500/20 font-mono">
                          al {item.fechaActualizacion}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      Canal oficial verificado
                    </span>
                  </div>
                </div>

                {/* Right: Metric Pills visible at all times */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {/* Audiencia / Seguidores / Oyentes */}
                  <div className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      {item.platform === 'Spotify' ? 'Oyentes Netos' : 'Audiencia / Fans'}
                    </span>
                    <span className="text-sm font-black text-slate-100 font-mono mt-0.5">
                      {item.audienceFormatted}
                    </span>
                  </div>

                  {/* Reproducciones / Streams */}
                  <div className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-gold-400/90 font-semibold uppercase tracking-wider">
                      Reproducciones
                    </span>
                    <span className="text-sm font-black text-gold-300 font-mono mt-0.5">
                      {item.streamsFormatted}
                    </span>
                  </div>

                  {/* Interacciones */}
                  <div className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col">
                    <span className="text-[10px] text-rose-400/90 font-semibold uppercase tracking-wider">
                      Interacciones
                    </span>
                    <span className="text-sm font-black text-rose-300 font-mono mt-0.5">
                      {item.interactionsFormatted}
                    </span>
                  </div>

                  {/* Cuota de Impacto (%) */}
                  <div className="px-3 py-2 rounded-xl bg-gold-400/10 border border-gold-400/30 flex flex-col">
                    <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider">
                      Cuota de Impacto
                    </span>
                    <span className="text-base font-black text-gold-300 font-mono mt-0.5">
                      {item.sharePercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Horizontal Bar */}
              <div className="space-y-1 pt-1">
                <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                    style={{
                      width: `${Math.max(item.sharePercentage, 5)}%`,
                      background: item.barGradient,
                      boxShadow: `0 0 12px ${item.brandColor}40`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Top Content Breakdown Table */}
      <ContentTable
        title="Contenido Destacado del Artista"
        items={allTopContent}
      />
    </div>
  );
};
