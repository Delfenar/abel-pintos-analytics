import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ActiveFilterBanner } from '../ui/ActiveFilterBanner';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Facebook, DollarSign, MousePointer, Users, ThumbsUp } from 'lucide-react';

export const FacebookView: React.FC = () => {
  const { filteredPlatformDataMap, platformDataMap, comparisonMode, searchQuery, setSearchQuery } = useDashboard();
  const data = filteredPlatformDataMap.facebook || platformDataMap.facebook;

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
      <div className="glass-panel-gold p-6 rounded-3xl border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-2">
            <Facebook className="w-4 h-4" />
            Facebook Page & Ads Insights — Abel Pintos
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Abel Pintos en Facebook</h2>
          <p className="text-xs text-slate-300 mt-1">3.1M+ Seguidores | Análisis de Alcance Orgánico vs Anuncios de Gira</p>
        </div>
      </div>

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label={data.kpis.pageEr.label}
          value={data.kpis.pageEr.value}
          previousWeekValue={data.kpis.pageEr.previousWeekValue}
          previousMonthValue={data.kpis.pageEr.previousMonthValue}
          previousYearValue={data.kpis.pageEr.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#1877F2"
          status={data.kpis.pageEr.status}
          description={data.kpis.pageEr.description}
        />
        <StatCard
          label={data.kpis.cpc.label}
          value={data.kpis.cpc.value}
          previousWeekValue={data.kpis.cpc.previousWeekValue}
          previousMonthValue={data.kpis.cpc.previousMonthValue}
          previousYearValue={data.kpis.cpc.previousYearValue}
          unit="$"
          format="currency"
          brandColor="#10B981"
          status={data.kpis.cpc.status}
          description={data.kpis.cpc.description}
        />
        <StatCard
          label={data.kpis.videoRetention.label}
          value={data.kpis.videoRetention.value}
          previousWeekValue={data.kpis.videoRetention.previousWeekValue}
          previousMonthValue={data.kpis.videoRetention.previousMonthValue}
          previousYearValue={data.kpis.videoRetention.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#D4AF37"
          status={data.kpis.videoRetention.status}
          description={data.kpis.videoRetention.description}
        />
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          label={data.metrics.totalReach.label}
          value={data.metrics.totalReach.value}
          previousWeekValue={data.metrics.totalReach.previousWeekValue}
          previousMonthValue={data.metrics.totalReach.previousMonthValue}
          previousYearValue={data.metrics.totalReach.previousYearValue}
          sparkline={data.metrics.totalReach.sparkline}
          brandColor="#1877F2"
        />
        <StatCard
          label={data.metrics.organicReach.label}
          value={data.metrics.organicReach.value}
          previousWeekValue={data.metrics.organicReach.previousWeekValue}
          previousMonthValue={data.metrics.organicReach.previousMonthValue}
          previousYearValue={data.metrics.organicReach.previousYearValue}
          sparkline={data.metrics.organicReach.sparkline}
          brandColor="#3B82F6"
        />
        <StatCard
          label={data.metrics.paidReach.label}
          value={data.metrics.paidReach.value}
          previousWeekValue={data.metrics.paidReach.previousWeekValue}
          previousMonthValue={data.metrics.paidReach.previousMonthValue}
          previousYearValue={data.metrics.paidReach.previousYearValue}
          sparkline={data.metrics.paidReach.sparkline}
          brandColor="#60A5FA"
        />
        <StatCard
          label={data.metrics.interactions.label}
          value={data.metrics.interactions.value}
          previousWeekValue={data.metrics.interactions.previousWeekValue}
          previousMonthValue={data.metrics.interactions.previousMonthValue}
          previousYearValue={data.metrics.interactions.previousYearValue}
          sparkline={data.metrics.interactions.sparkline}
          brandColor="#D4AF37"
        />
        <StatCard
          label={data.metrics.clicks.label}
          value={data.metrics.clicks.value}
          previousWeekValue={data.metrics.clicks.previousWeekValue}
          previousMonthValue={data.metrics.clicks.previousMonthValue}
          previousYearValue={data.metrics.clicks.previousYearValue}
          sparkline={data.metrics.clicks.sparkline}
          brandColor="#1D4ED8"
        />
        <StatCard
          label={data.metrics.followers.label}
          value={data.metrics.followers.value}
          previousWeekValue={data.metrics.followers.previousWeekValue}
          previousMonthValue={data.metrics.followers.previousMonthValue}
          previousYearValue={data.metrics.followers.previousYearValue}
          sparkline={data.metrics.followers.sparkline}
          brandColor="#93C5FD"
        />
      </div>

      {/* Chart: Organic vs Paid Reach */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-base font-bold text-slate-100 mb-4">Alcance Orgánico vs Pagado (Facebook)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.timeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1877F2', borderRadius: '0.75rem', fontSize: '12px' }} />
              <Bar dataKey="Alcance Orgánico" fill="#1877F2" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Alcance Pagado" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ContentTable title="Anuncios & Publicaciones con Más Clics" items={data.topContent} />
    </div>
  );
};
