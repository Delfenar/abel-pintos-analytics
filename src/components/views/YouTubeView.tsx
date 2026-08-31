import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ActiveFilterBanner } from '../ui/ActiveFilterBanner';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Youtube, Play, Clock, UserPlus, Image, Award } from 'lucide-react';
import { ChannelAudienceCards } from '../ui/ChannelAudienceCards';

export const YouTubeView: React.FC = () => {
  const { filteredPlatformDataMap, platformDataMap, comparisonMode, searchQuery, setSearchQuery } = useDashboard();
  const data = filteredPlatformDataMap.youtube || platformDataMap.youtube;

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
      {/* Header Banner - Abel Pintos YouTube */}
      <div className="glass-panel-gold p-6 rounded-3xl border border-red-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold mb-2">
            <Youtube className="w-4 h-4" />
            Canal Oficial de YouTube — @AbelPintos
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Abel Pintos en YouTube</h2>
          <p className="text-xs text-slate-300 mt-1">1.71M Suscriptores | +2.15 Mil Millones de Vistas Acumuladas</p>
        </div>

        <div className="glass-panel px-4 py-2 rounded-xl text-right border-red-500/30">
          <span className="text-[10px] font-bold text-red-400 uppercase">Canal Oficial Verificado</span>
          <div className="text-lg font-bold text-slate-100">@AbelPintos</div>
        </div>
      </div>

      {/* Global Channel Metrics from Audiencia_General (Visualizaciones, Interacciones, Compartidos, Nuevos Seguidores) */}
      <ChannelAudienceCards 
        platform="YouTube" 
        title="Métricas Globales de Canal — YouTube"
        subtitle="Visualizaciones, Interacciones, Compartidos y Nuevos Suscriptores (Google Sheets)"
      />

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label={data.kpis.thumbnailCtrKpi.label}
          value={data.kpis.thumbnailCtrKpi.value}
          previousWeekValue={data.kpis.thumbnailCtrKpi.previousWeekValue}
          previousMonthValue={data.kpis.thumbnailCtrKpi.previousMonthValue}
          previousYearValue={data.kpis.thumbnailCtrKpi.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#FF0000"
          status={data.kpis.thumbnailCtrKpi.status}
          description={data.kpis.thumbnailCtrKpi.description}
        />
        <StatCard
          label={data.kpis.retentionKpi.label}
          value={data.kpis.retentionKpi.value}
          previousWeekValue={data.kpis.retentionKpi.previousWeekValue}
          previousMonthValue={data.kpis.retentionKpi.previousMonthValue}
          previousYearValue={data.kpis.retentionKpi.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#D4AF37"
          status={data.kpis.retentionKpi.status}
          description={data.kpis.retentionKpi.description}
        />
        <StatCard
          label={data.kpis.subGrowthKpi.label}
          value={data.kpis.subGrowthKpi.value}
          previousWeekValue={data.kpis.subGrowthKpi.previousWeekValue}
          previousMonthValue={data.kpis.subGrowthKpi.previousMonthValue}
          previousYearValue={data.kpis.subGrowthKpi.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#C5A059"
          status={data.kpis.subGrowthKpi.status}
          description={data.kpis.subGrowthKpi.description}
        />
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label={data.metrics.views.label}
          value={data.metrics.views.value}
          previousWeekValue={data.metrics.views.previousWeekValue}
          previousMonthValue={data.metrics.views.previousMonthValue}
          previousYearValue={data.metrics.views.previousYearValue}
          sparkline={data.metrics.views.sparkline}
          brandColor="#FF0000"
        />
        <StatCard
          label={data.metrics.watchTime.label}
          value={data.metrics.watchTime.value}
          previousWeekValue={data.metrics.watchTime.previousWeekValue}
          previousMonthValue={data.metrics.watchTime.previousMonthValue}
          previousYearValue={data.metrics.watchTime.previousYearValue}
          unit="hrs"
          sparkline={data.metrics.watchTime.sparkline}
          brandColor="#D4AF37"
        />
        <StatCard
          label={data.metrics.netSubscribers.label}
          value={data.metrics.netSubscribers.value}
          previousWeekValue={data.metrics.netSubscribers.previousWeekValue}
          previousMonthValue={data.metrics.netSubscribers.previousMonthValue}
          previousYearValue={data.metrics.netSubscribers.previousYearValue}
          sparkline={data.metrics.netSubscribers.sparkline}
          brandColor="#B91C1C"
        />
        <StatCard
          label={data.metrics.thumbnailCtr.label}
          value={data.metrics.thumbnailCtr.value}
          previousWeekValue={data.metrics.thumbnailCtr.previousWeekValue}
          previousMonthValue={data.metrics.thumbnailCtr.previousMonthValue}
          previousYearValue={data.metrics.thumbnailCtr.previousYearValue}
          unit="%"
          format="percent"
          sparkline={data.metrics.thumbnailCtr.sparkline}
          brandColor="#EF4444"
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
          brandColor="#F87171"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Play className="w-4 h-4 text-red-500" />
            Vistas y Horas de Reproducción en YouTube ({comparisonMode.toUpperCase()})
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.timeSeries}>
                <defs>
                  <linearGradient id="ytViewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF0000" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#FF0000', borderRadius: '0.75rem', fontSize: '12px' }} />
                <Area type="monotone" dataKey="current" name="Vistas Actuales" stroke="#FF0000" strokeWidth={2.5} fill="url(#ytViewsGrad)" />
                <Area type="monotone" dataKey="comparison" name={`Vistas Comparadas (${comparisonMode.toUpperCase()})`} stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-base font-bold text-slate-100 mb-4">Distribución por Formato de Video</h3>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.contentDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                  {data.contentDistribution.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#FF0000', borderRadius: '0.75rem', fontSize: '12px', color: '#FFFFFF' }} 
                  itemStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
                  labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <ContentTable title="Videoclips y Shows Más Vistos en YouTube" items={data.topContent} />
    </div>
  );
};
