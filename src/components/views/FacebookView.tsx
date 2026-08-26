import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Facebook, DollarSign, MousePointer, Users, ThumbsUp } from 'lucide-react';

export const FacebookView: React.FC = () => {
  const { platformDataMap } = useDashboard();
  const data = platformDataMap.facebook;

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/30 border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
            <Facebook className="w-4 h-4" />
            Facebook Page & Ads Insights
          </div>
          <h2 className="text-2xl font-black text-slate-100">Métricas & KPIs de Facebook</h2>
          <p className="text-xs text-slate-400 mt-1">Análisis de alcance orgánico vs pagado, CPC y conversión de anuncios</p>
        </div>
      </div>

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label={data.kpis.pageEr.label}
          value={data.kpis.pageEr.value}
          previousValue={data.kpis.pageEr.previousValue}
          unit="%"
          format="percent"
          brandColor="#1877F2"
          status={data.kpis.pageEr.status}
          description={data.kpis.pageEr.description}
        />
        <StatCard
          label={data.kpis.cpc.label}
          value={data.kpis.cpc.value}
          previousValue={data.kpis.cpc.previousValue}
          unit="$"
          format="currency"
          brandColor="#10B981"
          status={data.kpis.cpc.status}
          description={data.kpis.cpc.description}
        />
        <StatCard
          label={data.kpis.videoRetention.label}
          value={data.kpis.videoRetention.value}
          previousValue={data.kpis.videoRetention.previousValue}
          unit="%"
          format="percent"
          brandColor="#4267B2"
          status={data.kpis.videoRetention.status}
          description={data.kpis.videoRetention.description}
        />
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          label={data.metrics.totalReach.label}
          value={data.metrics.totalReach.value}
          previousValue={data.metrics.totalReach.previousValue}
          sparkline={data.metrics.totalReach.sparkline}
          brandColor="#1877F2"
        />
        <StatCard
          label={data.metrics.organicReach.label}
          value={data.metrics.organicReach.value}
          previousValue={data.metrics.organicReach.previousValue}
          sparkline={data.metrics.organicReach.sparkline}
          brandColor="#3B82F6"
        />
        <StatCard
          label={data.metrics.paidReach.label}
          value={data.metrics.paidReach.value}
          previousValue={data.metrics.paidReach.previousValue}
          sparkline={data.metrics.paidReach.sparkline}
          brandColor="#60A5FA"
        />
        <StatCard
          label={data.metrics.interactions.label}
          value={data.metrics.interactions.value}
          previousValue={data.metrics.interactions.previousValue}
          sparkline={data.metrics.interactions.sparkline}
          brandColor="#2563EB"
        />
        <StatCard
          label={data.metrics.clicks.label}
          value={data.metrics.clicks.value}
          previousValue={data.metrics.clicks.previousValue}
          sparkline={data.metrics.clicks.sparkline}
          brandColor="#1D4ED8"
        />
        <StatCard
          label={data.metrics.followers.label}
          value={data.metrics.followers.value}
          previousValue={data.metrics.followers.previousValue}
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
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }} />
              <Bar dataKey="Alcance Orgánico" fill="#1877F2" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Alcance Pagado" fill="#89B4F8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ContentTable title="Anuncios & Publicaciones con Más Clics" items={data.topContent} />
    </div>
  );
};
