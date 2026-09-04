import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ActiveFilterBanner } from '../ui/ActiveFilterBanner';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { BlackPantherIcon } from '../ui/BlackPantherIcon';
import { Twitter, Repeat, MessageSquare, Heart, ExternalLink } from 'lucide-react';
import { ChannelAudienceCards } from '../ui/ChannelAudienceCards';
import { getLatestSnapshotPerContent, cleanNumber } from '../../services/searchEngineService';

export const TwitterView: React.FC = () => {
  const { filteredPlatformDataMap, platformDataMap, comparisonMode, searchQuery, setSearchQuery, liveSheetsRecords } = useDashboard();
  const data = filteredPlatformDataMap.twitter || platformDataMap.twitter;

  const twitterContent = React.useMemo(() => {
    const liveItems = getLatestSnapshotPerContent(liveSheetsRecords.filter(r => r.plataforma === 'X'));
    if (liveItems.length > 0) {
      return liveItems.map(r => ({
        id: r.id,
        platform: 'twitter' as const,
        title: r.titulo,
        type: r.tipoContenido,
        campaignId: r.campania.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        publishedAt: r.fecha,
        url: r.enlacePublicacion,
        metrics: {
          viewsOrReach: cleanNumber(r.metricas.reproducciones) + cleanNumber(r.metricas.alcance),
          interactions: cleanNumber(r.metricas.interacciones),
          engagementRate: cleanNumber(r.metricas.alcance) > 0 ? Number(((cleanNumber(r.metricas.interacciones) / cleanNumber(r.metricas.alcance)) * 100).toFixed(2)) : 3.9,
          sharesOrReposts: cleanNumber(r.metricas.guardados),
          saves: cleanNumber(r.metricas.guardados)
        }
      })).sort((a, b) => b.metrics.viewsOrReach - a.metrics.viewsOrReach);
    }
    return data?.topContent || [];
  }, [liveSheetsRecords, data?.topContent]);

  if (!data) return null;

  return (
    <div className="space-y-6">
      {searchQuery && (
        <ActiveFilterBanner
          query={searchQuery}
          matchedCount={data.topContent.length}
          onClear={() => setSearchQuery('')}
        />
      )}
      {/* Header Banner */}
      <div className="glass-panel-gold p-6 rounded-3xl border border-sky-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-2">
            <Twitter className="w-4 h-4" />
            X / Twitter Analytics — @AbelPintos
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Abel Pintos en X (Twitter)</h2>
          <p className="text-xs text-slate-300 mt-1">1.7M+ Seguidores | Análisis de impresiones, retweets y clics en enlaces</p>
        </div>
      </div>

      {/* Global Channel Metrics from Audiencia_General (Visualizaciones, Interacciones, Compartidos, Nuevos Seguidores) */}
      <ChannelAudienceCards 
        platform="X" 
        title="Métricas Globales de Perfil — X (Twitter)"
        subtitle="Visualizaciones, Interacciones, Retweets/Compartidos y Nuevos Seguidores (Google Sheets)"
      />

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          label={data.kpis.interactionRate.label}
          value={data.kpis.interactionRate.value}
          previousWeekValue={data.kpis.interactionRate.previousWeekValue}
          previousMonthValue={data.kpis.interactionRate.previousMonthValue}
          previousYearValue={data.kpis.interactionRate.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#1DA1F2"
          status={data.kpis.interactionRate.status}
          description={data.kpis.interactionRate.description}
        />
        <StatCard
          label={data.kpis.avgReach.label}
          value={data.kpis.avgReach.value}
          previousWeekValue={data.kpis.avgReach.previousWeekValue}
          previousMonthValue={data.kpis.avgReach.previousMonthValue}
          previousYearValue={data.kpis.avgReach.previousYearValue}
          unit="usuarios"
          brandColor="#D4AF37"
          status={data.kpis.avgReach.status}
          description={data.kpis.avgReach.description}
        />
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label={data.metrics.impressions.label}
          value={data.metrics.impressions.value}
          previousWeekValue={data.metrics.impressions.previousWeekValue}
          previousMonthValue={data.metrics.impressions.previousMonthValue}
          previousYearValue={data.metrics.impressions.previousYearValue}
          sparkline={data.metrics.impressions.sparkline}
          brandColor="#1DA1F2"
        />
        <StatCard
          label={data.metrics.retweets.label}
          value={data.metrics.retweets.value}
          previousWeekValue={data.metrics.retweets.previousWeekValue}
          previousMonthValue={data.metrics.retweets.previousMonthValue}
          previousYearValue={data.metrics.retweets.previousYearValue}
          sparkline={data.metrics.retweets.sparkline}
          brandColor="#D4AF37"
        />
        <StatCard
          label={data.metrics.quotes.label}
          value={data.metrics.quotes.value}
          previousWeekValue={data.metrics.quotes.previousWeekValue}
          previousMonthValue={data.metrics.quotes.previousMonthValue}
          previousYearValue={data.metrics.quotes.previousYearValue}
          sparkline={data.metrics.quotes.sparkline}
          brandColor="#71C9F8"
        />
        <StatCard
          label={data.metrics.likes.label}
          value={data.metrics.likes.value}
          previousWeekValue={data.metrics.likes.previousWeekValue}
          previousMonthValue={data.metrics.likes.previousMonthValue}
          previousYearValue={data.metrics.likes.previousYearValue}
          sparkline={data.metrics.likes.sparkline}
          brandColor="#38BDF8"
        />
        <StatCard
          label={data.metrics.linkClicks.label}
          value={data.metrics.linkClicks.value}
          previousWeekValue={data.metrics.linkClicks.previousWeekValue}
          previousMonthValue={data.metrics.linkClicks.previousMonthValue}
          previousYearValue={data.metrics.linkClicks.previousYearValue}
          sparkline={data.metrics.linkClicks.sparkline}
          brandColor="#0284C7"
        />
      </div>

      {/* Evolution Chart */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
          <BlackPantherIcon className="w-4 h-4" />
          Evolución de Impresiones en X ({comparisonMode.toUpperCase()})
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.timeSeries}>
              <defs>
                <linearGradient id="twImp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1DA1F2" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#1DA1F2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1DA1F2', borderRadius: '0.75rem', fontSize: '12px' }} />
              <Area type="monotone" dataKey="current" name="Impresiones Actuales" stroke="#1DA1F2" strokeWidth={2.5} fill="url(#twImp)" />
              <Area type="monotone" dataKey="comparison" name={`Comparadas (${comparisonMode.toUpperCase()})`} stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ContentTable title="Tweets Destacados de Abel Pintos (Google Sheets)" items={twitterContent} />
    </div>
  );
};
