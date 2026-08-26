import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Twitter, Repeat, MessageSquare, Heart, ExternalLink, Zap } from 'lucide-react';

export const TwitterView: React.FC = () => {
  const { platformDataMap } = useDashboard();
  const data = platformDataMap.twitter;

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-blue-950/30 border border-sky-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-2">
            <Twitter className="w-4 h-4" />
            X / Twitter Analytics
          </div>
          <h2 className="text-2xl font-black text-slate-100">Métricas & KPIs de X (Twitter)</h2>
          <p className="text-xs text-slate-400 mt-1">Análisis de impresiones, retweets, impresiones por tweet y clics en enlaces</p>
        </div>
      </div>

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          label={data.kpis.interactionRate.label}
          value={data.kpis.interactionRate.value}
          previousValue={data.kpis.interactionRate.previousValue}
          unit="%"
          format="percent"
          brandColor="#1DA1F2"
          status={data.kpis.interactionRate.status}
          description={data.kpis.interactionRate.description}
        />
        <StatCard
          label={data.kpis.avgReach.label}
          value={data.kpis.avgReach.value}
          previousValue={data.kpis.avgReach.previousValue}
          unit="usuarios"
          brandColor="#0C7ABF"
          status={data.kpis.avgReach.status}
          description={data.kpis.avgReach.description}
        />
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label={data.metrics.impressions.label}
          value={data.metrics.impressions.value}
          previousValue={data.metrics.impressions.previousValue}
          sparkline={data.metrics.impressions.sparkline}
          brandColor="#1DA1F2"
        />
        <StatCard
          label={data.metrics.retweets.label}
          value={data.metrics.retweets.value}
          previousValue={data.metrics.retweets.previousValue}
          sparkline={data.metrics.retweets.sparkline}
          brandColor="#0C7ABF"
        />
        <StatCard
          label={data.metrics.quotes.label}
          value={data.metrics.quotes.value}
          previousValue={data.metrics.quotes.previousValue}
          sparkline={data.metrics.quotes.sparkline}
          brandColor="#71C9F8"
        />
        <StatCard
          label={data.metrics.likes.label}
          value={data.metrics.likes.value}
          previousValue={data.metrics.likes.previousValue}
          sparkline={data.metrics.likes.sparkline}
          brandColor="#38BDF8"
        />
        <StatCard
          label={data.metrics.linkClicks.label}
          value={data.metrics.linkClicks.value}
          previousValue={data.metrics.linkClicks.previousValue}
          sparkline={data.metrics.linkClicks.sparkline}
          brandColor="#0284C7"
        />
      </div>

      {/* Evolution Chart */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-sky-400" />
          Evolución de Impresiones & Me Gusta (X)
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
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
              <Area type="monotone" dataKey="Impresiones" stroke="#1DA1F2" strokeWidth={2.5} fill="url(#twImp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ContentTable title="Tweets Destacados" items={data.topContent} />
    </div>
  );
};
