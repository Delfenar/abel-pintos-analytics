import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { Video, Play, Share2, Heart, Users, Clock } from 'lucide-react';

export const TikTokView: React.FC = () => {
  const { platformDataMap, comparisonMode } = useDashboard();
  const data = platformDataMap.tiktok;

  if (!data) return null;

  const retentionCurve = [
    { second: '0s', retention: 100 },
    { second: '3s', retention: 84 },
    { second: '10s', retention: 68 },
    { second: '20s', retention: 54 },
    { second: '30s', retention: 49 },
    { second: '45s', retention: 42 },
    { second: '60s', retention: 39.8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel-gold p-6 rounded-3xl border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-2">
            <Video className="w-4 h-4" />
            TikTok Performance — @abel.pintos.musica
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Abel Pintos en TikTok</h2>
          <p className="text-xs text-slate-300 mt-1">850K+ Seguidores | Retención por segundo, acústicos virales y watch-through rate</p>
        </div>
      </div>

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label={data.kpis.watchThrough.label}
          value={data.kpis.watchThrough.value}
          previousWeekValue={data.kpis.watchThrough.previousWeekValue}
          previousMonthValue={data.kpis.watchThrough.previousMonthValue}
          previousYearValue={data.kpis.watchThrough.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#00F2FE"
          status={data.kpis.watchThrough.status}
          description={data.kpis.watchThrough.description}
        />
        <StatCard
          label={data.kpis.viralityRate.label}
          value={data.kpis.viralityRate.value}
          previousWeekValue={data.kpis.viralityRate.previousWeekValue}
          previousMonthValue={data.kpis.viralityRate.previousMonthValue}
          previousYearValue={data.kpis.viralityRate.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#D4AF37"
          status={data.kpis.viralityRate.status}
          description={data.kpis.viralityRate.description}
        />
        <StatCard
          label={data.kpis.erPerVideo.label}
          value={data.kpis.erPerVideo.value}
          previousWeekValue={data.kpis.erPerVideo.previousWeekValue}
          previousMonthValue={data.kpis.erPerVideo.previousMonthValue}
          previousYearValue={data.kpis.erPerVideo.previousYearValue}
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
          previousWeekValue={data.metrics.videoViews.previousWeekValue}
          previousMonthValue={data.metrics.videoViews.previousMonthValue}
          previousYearValue={data.metrics.videoViews.previousYearValue}
          sparkline={data.metrics.videoViews.sparkline}
          brandColor="#00F2FE"
        />
        <StatCard
          label={data.metrics.avgPlayTime.label}
          value={data.metrics.avgPlayTime.value}
          previousWeekValue={data.metrics.avgPlayTime.previousWeekValue}
          previousMonthValue={data.metrics.avgPlayTime.previousMonthValue}
          previousYearValue={data.metrics.avgPlayTime.previousYearValue}
          unit="s"
          format="duration"
          sparkline={data.metrics.avgPlayTime.sparkline}
          brandColor="#D4AF37"
        />
        <StatCard
          label={data.metrics.retention.label}
          value={data.metrics.retention.value}
          previousWeekValue={data.metrics.retention.previousWeekValue}
          previousMonthValue={data.metrics.retention.previousMonthValue}
          previousYearValue={data.metrics.retention.previousYearValue}
          unit="%"
          format="percent"
          sparkline={data.metrics.retention.sparkline}
          brandColor="#25F4EE"
        />
        <StatCard
          label={data.metrics.shares.label}
          value={data.metrics.shares.value}
          previousWeekValue={data.metrics.shares.previousWeekValue}
          previousMonthValue={data.metrics.shares.previousMonthValue}
          previousYearValue={data.metrics.shares.previousYearValue}
          sparkline={data.metrics.shares.sparkline}
          brandColor="#FF0050"
        />
        <StatCard
          label={data.metrics.likes.label}
          value={data.metrics.likes.value}
          previousWeekValue={data.metrics.likes.previousWeekValue}
          previousMonthValue={data.metrics.likes.previousMonthValue}
          previousYearValue={data.metrics.likes.previousYearValue}
          sparkline={data.metrics.likes.sparkline}
          brandColor="#00F2FE"
        />
        <StatCard
          label={data.metrics.followers.label}
          value={data.metrics.followers.value}
          previousWeekValue={data.metrics.followers.previousWeekValue}
          previousMonthValue={data.metrics.followers.previousMonthValue}
          previousYearValue={data.metrics.followers.previousYearValue}
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
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#00F2FE', borderRadius: '0.75rem', fontSize: '12px' }} />
                <Line type="monotone" dataKey="retention" stroke="#D4AF37" strokeWidth={3} dot={{ r: 4, fill: '#00F2FE' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Play className="w-4 h-4 text-cyan-400" />
            Reproducciones Diarias en TikTok ({comparisonMode.toUpperCase()})
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
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#00F2FE', borderRadius: '0.75rem', fontSize: '12px' }} />
                <Area type="monotone" dataKey="current" name="Views Actuales" stroke="#00F2FE" strokeWidth={2.5} fill="url(#tkViews)" />
                <Area type="monotone" dataKey="comparison" name={`Views Comparadas (${comparisonMode.toUpperCase()})`} stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <ContentTable title="Videos Virales en TikTok" items={data.topContent} />
    </div>
  );
};
