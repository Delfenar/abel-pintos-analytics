import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { AtSign, MessageCircle, Repeat, Heart, Eye } from 'lucide-react';

export const ThreadsView: React.FC = () => {
  const { platformDataMap } = useDashboard();
  const data = platformDataMap.threads;

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-zinc-900 border border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold mb-2">
            <AtSign className="w-4 h-4" />
            Threads Conversation Analytics
          </div>
          <h2 className="text-2xl font-black text-slate-100">Métricas & KPIs de Threads</h2>
          <p className="text-xs text-slate-400 mt-1">Análisis de profundidad de discusión, respuestas e interacciones de texto</p>
        </div>
      </div>

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label={data.kpis.convRate.label}
          value={data.kpis.convRate.value}
          previousValue={data.kpis.convRate.previousValue}
          unit="%"
          format="percent"
          brandColor="#64748B"
          status={data.kpis.convRate.status}
          description={data.kpis.convRate.description}
        />
        <StatCard
          label={data.kpis.viralityRate.label}
          value={data.kpis.viralityRate.value}
          previousValue={data.kpis.viralityRate.previousValue}
          unit="%"
          format="percent"
          brandColor="#94A3B8"
          status={data.kpis.viralityRate.status}
          description={data.kpis.viralityRate.description}
        />
        <StatCard
          label={data.kpis.threadsEr.label}
          value={data.kpis.threadsEr.value}
          previousValue={data.kpis.threadsEr.previousValue}
          unit="%"
          format="percent"
          brandColor="#CBD5E1"
          status={data.kpis.threadsEr.status}
          description={data.kpis.threadsEr.description}
        />
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label={data.metrics.replies.label}
          value={data.metrics.replies.value}
          previousValue={data.metrics.replies.previousValue}
          sparkline={data.metrics.replies.sparkline}
          brandColor="#94A3B8"
        />
        <StatCard
          label={data.metrics.reposts.label}
          value={data.metrics.reposts.value}
          previousValue={data.metrics.reposts.previousValue}
          sparkline={data.metrics.reposts.sparkline}
          brandColor="#64748B"
        />
        <StatCard
          label={data.metrics.likes.label}
          value={data.metrics.likes.value}
          previousValue={data.metrics.likes.previousValue}
          sparkline={data.metrics.likes.sparkline}
          brandColor="#F43F5E"
        />
        <StatCard
          label={data.metrics.followers.label}
          value={data.metrics.followers.value}
          previousValue={data.metrics.followers.previousValue}
          sparkline={data.metrics.followers.sparkline}
          brandColor="#E2E8F0"
        />
        <StatCard
          label={data.metrics.impressions.label}
          value={data.metrics.impressions.value}
          previousValue={data.metrics.impressions.previousValue}
          sparkline={data.metrics.impressions.sparkline}
          brandColor="#475569"
        />
      </div>

      {/* Chart */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-slate-300" />
          Impresiones y Respuestas Diarias (Threads)
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
              <Area type="monotone" dataKey="Impresiones" stroke="#94A3B8" strokeWidth={2.5} fill="url(#threadsImp)" />
              <Area type="monotone" dataKey="Respuestas" stroke="#38BDF8" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ContentTable title="Hilos con Mayor Conversación" items={data.topContent} />
    </div>
  );
};
