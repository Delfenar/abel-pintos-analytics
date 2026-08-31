import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ActiveFilterBanner } from '../ui/ActiveFilterBanner';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { AtSign, MessageCircle, Repeat, Heart, Eye } from 'lucide-react';

export const ThreadsView: React.FC = () => {
  const { filteredPlatformDataMap, platformDataMap, comparisonMode, searchQuery, setSearchQuery } = useDashboard();
  const data = filteredPlatformDataMap.threads || platformDataMap.threads;

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
      <div className="glass-panel-gold p-6 rounded-3xl border border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold mb-2">
            <AtSign className="w-4 h-4" />
            Threads Conversation Analytics — @abelpintos
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Abel Pintos en Threads</h2>
          <p className="text-xs text-slate-300 mt-1">420K+ Seguidores | Análisis de respuestas, hilos sobre canciones y virabilidad de texto</p>
        </div>
      </div>

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label={data.kpis.convRate.label}
          value={data.kpis.convRate.value}
          previousWeekValue={data.kpis.convRate.previousWeekValue}
          previousMonthValue={data.kpis.convRate.previousMonthValue}
          previousYearValue={data.kpis.convRate.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#D4AF37"
          status={data.kpis.convRate.status}
          description={data.kpis.convRate.description}
        />
        <StatCard
          label={data.kpis.viralityRate.label}
          value={data.kpis.viralityRate.value}
          previousWeekValue={data.kpis.viralityRate.previousWeekValue}
          previousMonthValue={data.kpis.viralityRate.previousMonthValue}
          previousYearValue={data.kpis.viralityRate.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#94A3B8"
          status={data.kpis.viralityRate.status}
          description={data.kpis.viralityRate.description}
        />
        <StatCard
          label={data.kpis.threadsEr.label}
          value={data.kpis.threadsEr.value}
          previousWeekValue={data.kpis.threadsEr.previousWeekValue}
          previousMonthValue={data.kpis.threadsEr.previousMonthValue}
          previousYearValue={data.kpis.threadsEr.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#C5A059"
          status={data.kpis.threadsEr.status}
          description={data.kpis.threadsEr.description}
        />
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label={data.metrics.replies.label}
          value={data.metrics.replies.value}
          previousWeekValue={data.metrics.replies.previousWeekValue}
          previousMonthValue={data.metrics.replies.previousMonthValue}
          previousYearValue={data.metrics.replies.previousYearValue}
          sparkline={data.metrics.replies.sparkline}
          brandColor="#94A3B8"
        />
        <StatCard
          label={data.metrics.reposts.label}
          value={data.metrics.reposts.value}
          previousWeekValue={data.metrics.reposts.previousWeekValue}
          previousMonthValue={data.metrics.reposts.previousMonthValue}
          previousYearValue={data.metrics.reposts.previousYearValue}
          sparkline={data.metrics.reposts.sparkline}
          brandColor="#D4AF37"
        />
        <StatCard
          label={data.metrics.likes.label}
          value={data.metrics.likes.value}
          previousWeekValue={data.metrics.likes.previousWeekValue}
          previousMonthValue={data.metrics.likes.previousMonthValue}
          previousYearValue={data.metrics.likes.previousYearValue}
          sparkline={data.metrics.likes.sparkline}
          brandColor="#F43F5E"
        />
        <StatCard
          label={data.metrics.followers.label}
          value={data.metrics.followers.value}
          previousWeekValue={data.metrics.followers.previousWeekValue}
          previousMonthValue={data.metrics.followers.previousMonthValue}
          previousYearValue={data.metrics.followers.previousYearValue}
          sparkline={data.metrics.followers.sparkline}
          brandColor="#E2E8F0"
        />
        <StatCard
          label={data.metrics.impressions.label}
          value={data.metrics.impressions.value}
          previousWeekValue={data.metrics.impressions.previousWeekValue}
          previousMonthValue={data.metrics.impressions.previousMonthValue}
          previousYearValue={data.metrics.impressions.previousYearValue}
          sparkline={data.metrics.impressions.sparkline}
          brandColor="#475569"
        />
      </div>

      {/* Chart */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-slate-300" />
          Impresiones Diarias en Threads ({comparisonMode.toUpperCase()})
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.timeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="threadsImp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
              <Area type="monotone" dataKey="current" name="Impresiones Actuales" stroke="#94A3B8" strokeWidth={2.5} fill="url(#threadsImp)" />
              <Area type="monotone" dataKey="comparison" name={`Impresiones Comparadas (${comparisonMode.toUpperCase()})`} stroke="#64748B" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ContentTable title="Hilos con Mayor Conversación" items={data.topContent} />
    </div>
  );
};
