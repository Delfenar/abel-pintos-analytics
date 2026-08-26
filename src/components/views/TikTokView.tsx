import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { Video, Play, Share2, Heart, Users, Clock } from 'lucide-react';

export const TikTokView: React.FC = () => {
  const { platformDataMap } = useDashboard();
  const data = platformDataMap.tiktok;

  if (!data) return null;

  // Retention curve mockup points for TikTok
  const retentionCurve = [
    { second: '0s', retention: 100 },
    { second: '3s', retention: 82 },
    { second: '10s', retention: 64 },
    { second: '20s', retention: 48 },
    { second: '30s', retention: 41 },
    { second: '45s', retention: 36 },
    { second: '60s', retention: 34 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-rose-950/30 border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
            <Video className="w-4 h-4" />
            TikTok Video Performance
          </div>
          <h2 className="text-2xl font-black text-slate-100">Métricas & KPIs de TikTok</h2>
          <p className="text-xs text-slate-400 mt-1">Análisis de retención por segundo, virabilidad y watch-through rate</p>
        </div>
      </div>

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label={data.kpis.watchThrough.label}
          value={data.kpis.watchThrough.value}
          previousValue={data.kpis.watchThrough.previousValue}
          unit="%"
          format="percent"
          brandColor="#00F2FE"
          status={data.kpis.watchThrough.status}
          description={data.kpis.watchThrough.description}
        />
        <StatCard
          label={data.kpis.viralityRate.label}
          value={data.kpis.viralityRate.value}
          previousValue={data.kpis.viralityRate.previousValue}
          unit="%"
          format="percent"
          brandColor="#FE2C55"
          status={data.kpis.viralityRate.status}
          description={data.kpis.viralityRate.description}
        />
        <StatCard
          label={data.kpis.erPerVideo.label}
          value={data.kpis.erPerVideo.value}
          previousValue={data.kpis.erPerVideo.previousValue}
          unit="%"
          format="percent"
          brandColor="#25F4EE"
          status={data.kpis.erPerVideo.status}
          description={data.kpis.erPerVideo.description}
        />
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          label={data.metrics.videoViews.label}
          value={data.metrics.videoViews.value}
          previousValue={data.metrics.videoViews.previousValue}
          sparkline={data.metrics.videoViews.sparkline}
          brandColor="#00F2FE"
        />
        <StatCard
          label={data.metrics.avgPlayTime.label}
          value={data.metrics.avgPlayTime.value}
          previousValue={data.metrics.avgPlayTime.previousValue}
          unit="s"
          format="duration"
          sparkline={data.metrics.avgPlayTime.sparkline}
          brandColor="#FE2C55"
        />
        <StatCard
          label={data.metrics.retention.label}
          value={data.metrics.retention.value}
          previousValue={data.metrics.retention.previousValue}
          unit="%"
          format="percent"
          sparkline={data.metrics.retention.sparkline}
          brandColor="#25F4EE"
        />
        <StatCard
          label={data.metrics.shares.label}
          value={data.metrics.shares.value}
          previousValue={data.metrics.shares.previousValue}
          sparkline={data.metrics.shares.sparkline}
          brandColor="#FF0050"
        />
        <StatCard
          label={data.metrics.likes.label}
          value={data.metrics.likes.value}
          previousValue={data.metrics.likes.previousValue}
          sparkline={data.metrics.likes.sparkline}
          brandColor="#00F2FE"
        />
        <StatCard
          label={data.metrics.followers.label}
          value={data.metrics.followers.value}
          previousValue={data.metrics.followers.previousValue}
          sparkline={data.metrics.followers.sparkline}
          brandColor="#999999"
        />
      </div>

      {/* Retention Curve & Time Series */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Curva de Retención Media (0s - 60s)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="second" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
                <Line type="monotone" dataKey="retention" stroke="#FE2C55" strokeWidth={3} dot={{ r: 4, fill: '#00F2FE' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Play className="w-4 h-4 text-rose-400" />
            Reproducciones Diarias
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.timeSeries}>
                <defs>
                  <linearGradient id="tkViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F2FE" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00F2FE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
                <Area type="monotone" dataKey="Views" stroke="#00F2FE" strokeWidth={2.5} fill="url(#tkViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <ContentTable title="Videos Virales en TikTok" items={data.topContent} />
    </div>
  );
};
