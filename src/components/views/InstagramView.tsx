import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Instagram, Bookmark, Link2, Sparkles, Heart, MessageSquare, Share2 } from 'lucide-react';

export const InstagramView: React.FC = () => {
  const { platformDataMap, comparisonMode } = useDashboard();
  const data = platformDataMap.instagram;

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel-gold p-6 rounded-3xl border border-pink-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold mb-2">
            <Instagram className="w-4 h-4" />
            Instagram Perfil Oficial — @abelpintos
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Abel Pintos en Instagram</h2>
          <p className="text-xs text-slate-300 mt-1">2.55M+ Seguidores | Gira 30 Aniversario, Anuncios de Shows & Libro Conmemorativo</p>
        </div>

        <div className="glass-panel px-4 py-2 rounded-xl text-right border-pink-500/30">
          <span className="text-[10px] font-bold text-pink-400 uppercase">Perfil Oficial</span>
          <div className="text-lg font-bold text-slate-100">@abelpintos</div>
        </div>
      </div>

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label={data.kpis.engagementRate.label}
          value={data.kpis.engagementRate.value}
          previousWeekValue={data.kpis.engagementRate.previousWeekValue}
          previousMonthValue={data.kpis.engagementRate.previousMonthValue}
          previousYearValue={data.kpis.engagementRate.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#E1306C"
          status={data.kpis.engagementRate.status}
          description={data.kpis.engagementRate.description}
        />
        <StatCard
          label={data.kpis.savedRatio.label}
          value={data.kpis.savedRatio.value}
          previousWeekValue={data.kpis.savedRatio.previousWeekValue}
          previousMonthValue={data.kpis.savedRatio.previousMonthValue}
          previousYearValue={data.kpis.savedRatio.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#D4AF37"
          status={data.kpis.savedRatio.status}
          description={data.kpis.savedRatio.description}
        />
        <StatCard
          label={data.kpis.bioCtr.label}
          value={data.kpis.bioCtr.value}
          previousWeekValue={data.kpis.bioCtr.previousWeekValue}
          previousMonthValue={data.kpis.bioCtr.previousMonthValue}
          previousYearValue={data.kpis.bioCtr.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#C5A059"
          status={data.kpis.bioCtr.status}
          description={data.kpis.bioCtr.description}
        />
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label={data.metrics.reach.label}
          value={data.metrics.reach.value}
          previousWeekValue={data.metrics.reach.previousWeekValue}
          previousMonthValue={data.metrics.reach.previousMonthValue}
          previousYearValue={data.metrics.reach.previousYearValue}
          sparkline={data.metrics.reach.sparkline}
          brandColor="#E1306C"
        />
        <StatCard
          label={data.metrics.impressions.label}
          value={data.metrics.impressions.value}
          previousWeekValue={data.metrics.impressions.previousWeekValue}
          previousMonthValue={data.metrics.impressions.previousMonthValue}
          previousYearValue={data.metrics.impressions.previousYearValue}
          sparkline={data.metrics.impressions.sparkline}
          brandColor="#C13584"
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
          label={data.metrics.followers.label}
          value={data.metrics.followers.value}
          previousWeekValue={data.metrics.followers.previousWeekValue}
          previousMonthValue={data.metrics.followers.previousMonthValue}
          previousYearValue={data.metrics.followers.previousYearValue}
          sparkline={data.metrics.followers.sparkline}
          brandColor="#F56040"
        />
        <StatCard
          label={data.metrics.profileVisits.label}
          value={data.metrics.profileVisits.value}
          previousWeekValue={data.metrics.profileVisits.previousWeekValue}
          previousMonthValue={data.metrics.profileVisits.previousMonthValue}
          previousYearValue={data.metrics.profileVisits.previousYearValue}
          sparkline={data.metrics.profileVisits.sparkline}
          brandColor="#FFDC80"
        />
      </div>

      {/* Chart & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Alcance e Impresiones Diarias en @abelpintos ({comparisonMode.toUpperCase()})
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.timeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="igAlcance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E1306C" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#E1306C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#E1306C', borderRadius: '0.75rem', fontSize: '12px' }} />
                <Area type="monotone" dataKey="current" name="Alcance Actual" stroke="#E1306C" strokeWidth={2.5} fill="url(#igAlcance)" />
                <Area type="monotone" dataKey="comparison" name={`Alcance Comparado (${comparisonMode.toUpperCase()})`} stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-base font-bold text-slate-100 mb-4">Distribución por Formato</h3>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.contentDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                  {data.contentDistribution.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#E1306C', borderRadius: '0.75rem', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <ContentTable title="Publicaciones Destacadas en @abelpintos" items={data.topContent} />
    </div>
  );
};
