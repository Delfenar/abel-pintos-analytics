import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { CAMPAIGNS } from '../../services/mockDataService';
import { BlackPantherIcon } from '../ui/BlackPantherIcon';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  ReferenceDot
} from 'recharts';
import { Disc, Award, ShieldCheck, Layers, Sparkles, Music2, Users, ArrowRightLeft, Flag, Settings } from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { 
    globalOverview, 
    platformDataMap, 
    dateRange, 
    activeCampaign, 
    comparisonMode,
    customComparisonType,
    displayValueType,
    showMilestones,
    setIsSettingsModalOpen
  } = useDashboard();

  const currentCampaignInfo = CAMPAIGNS.find(c => c.id === activeCampaign) || CAMPAIGNS[0];

  const allTopContent = Object.values(platformDataMap)
    .flatMap((p) => p.topContent)
    .filter((c) => activeCampaign === 'all' || c.campaignId === activeCampaign)
    .sort((a, b) => b.metrics.viewsOrReach - a.metrics.viewsOrReach);

  const pieData = globalOverview.platformComparison.map((p) => ({
    name: p.platform,
    value: p.reach,
  }));

  const COLORS = ['#1DB954', '#E1306C', '#FF0000', '#1877F2', '#1DA1F2', '#00F2FE', '#000000'];

  const compModeLabel = customComparisonType === 'year_ago'
    ? 'Mismo periodo año anterior (YoY)'
    : comparisonMode === 'wow' ? 'Semana a Semana (WoW)' : comparisonMode === 'mom' ? 'Mes a Mes (MoM)' : 'Año a Año (YoY)';

  // Custom Dual Tooltip with Absolute vs Percentage Display
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const cur = payload.find((p: any) => p.dataKey === 'current' || p.dataKey === 'Spotify' || p.dataKey === 'Streams');
      const comp = payload.find((p: any) => p.dataKey === 'comparison' || p.dataKey === 'Spotify Anterior' || p.dataKey === 'Streams Anterior');

      const curVal = cur ? Number(cur.value) : 0;
      const compVal = comp ? Number(comp.value) : 0;
      const diff = curVal - compVal;
      const pct = compVal > 0 ? ((diff / compVal) * 100).toFixed(1) : '0.0';

      const milestoneMatch = globalOverview.milestones.find(m => m.date === label);

      return (
        <div className="glass-panel p-3.5 rounded-2xl border border-gold-400/40 text-xs shadow-2xl space-y-1.5 bg-slate-950/95 text-slate-100 max-w-xs">
          <div className="font-extrabold border-b border-slate-800 pb-1 flex items-center justify-between text-gold-300">
            <span>{label}</span>
            {milestoneMatch && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-400 border border-gold-400/40 flex items-center gap-1">
                <Flag className="w-3 h-3" /> Hito
              </span>
            )}
          </div>

          {milestoneMatch && (
            <div className="p-2 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-300 font-semibold text-[11px]">
              🎯 {milestoneMatch.title}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-1">
            <span className="flex items-center gap-1.5 font-semibold text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-400" />
              Periodo Actual:
            </span>
            <span className="font-black text-slate-100">{curVal.toLocaleString()}</span>
          </div>

          {compVal > 0 && (
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500 border border-dashed" />
                Periodo Comparado:
              </span>
              <span className="font-semibold text-slate-300">{compVal.toLocaleString()}</span>
            </div>
          )}

          {compVal > 0 && (
            <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between gap-4 text-[11px]">
              <span className="text-slate-400">Variación ($\Delta$):</span>
              <span className={`font-extrabold font-mono ${diff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {displayValueType === 'absolute'
                  ? `${diff >= 0 ? '+' : ''}${diff.toLocaleString()} alc.`
                  : `${diff >= 0 ? '+' : ''}${pct}%`}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner - Abel Pintos Official Gold Theme */}
      <div className="glass-panel-gold p-6 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                ARTISTA OFICIAL ABEL PINTOS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                <ArrowRightLeft className="w-3.5 h-3.5" />
                {compModeLabel}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              Ecosistema Social & Streaming Unificado
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/90 max-w-3xl mt-1 leading-relaxed">
              Monitoreo consolidado en 7 plataformas oficiales. Campaña activa: <strong className="text-gold-300">{currentCampaignInfo.label}</strong>. Rango: <strong className="text-gold-300 uppercase">{dateRange}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="glass-panel px-4 py-2.5 rounded-2xl border-gold-400/30 hover:border-gold-400 text-right transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-gold-400 group-hover:text-gold-300">
                <Settings className="w-4 h-4" />
                Personalizar Vista
              </div>
              <span className="text-[10px] text-slate-400">Fechas, Umbrales & Hitos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          id="totalReach"
          label={globalOverview.totalReach.label}
          value={globalOverview.totalReach.value}
          previousWeekValue={globalOverview.totalReach.previousWeekValue}
          previousMonthValue={globalOverview.totalReach.previousMonthValue}
          previousYearValue={globalOverview.totalReach.previousYearValue}
          sparkline={globalOverview.totalReach.sparkline}
          brandColor="#D4AF37"
          description="Alcance consolidado único en todas las plataformas oficiales de Abel Pintos."
        />
        <StatCard
          id="totalImpressions"
          label={globalOverview.totalImpressions.label}
          value={globalOverview.totalImpressions.value}
          previousWeekValue={globalOverview.totalImpressions.previousWeekValue}
          previousMonthValue={globalOverview.totalImpressions.previousMonthValue}
          previousYearValue={globalOverview.totalImpressions.previousYearValue}
          sparkline={globalOverview.totalImpressions.sparkline}
          brandColor="#C5A059"
          description="Suma total de streams en Spotify y reproducciones de video/posts."
        />
        <StatCard
          id="avgEngagementRate"
          label={globalOverview.avgEngagementRate.label}
          value={globalOverview.avgEngagementRate.value}
          previousWeekValue={globalOverview.avgEngagementRate.previousWeekValue}
          previousMonthValue={globalOverview.avgEngagementRate.previousMonthValue}
          previousYearValue={globalOverview.avgEngagementRate.previousYearValue}
          unit="%"
          format="percent"
          brandColor="#10B981"
          status={globalOverview.avgEngagementRate.status}
          description="Engagement rate medio de la comunidad activa de fans."
        />
        <StatCard
          id="totalFollowers"
          label={globalOverview.totalFollowers.label}
          value={globalOverview.totalFollowers.value}
          previousWeekValue={globalOverview.totalFollowers.previousWeekValue}
          previousMonthValue={globalOverview.totalFollowers.previousMonthValue}
          previousYearValue={globalOverview.totalFollowers.previousYearValue}
          sparkline={globalOverview.totalFollowers.sparkline}
          brandColor="#E1306C"
          description="Seguidores directos agregados en redes y suscriptores de YouTube."
        />
      </div>

      {/* Main Evolution Timeline Chart with Overlay Comparison Curves & Milestone Markers */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <BlackPantherIcon className="w-5 h-5" />
              Evolución Comparativa: Periodo Actual vs Comparado ({comparisonMode.toUpperCase()})
            </h3>
            <p className="text-xs text-slate-400">
              Superposición de curva actual (sólida) vs periodo anterior ({compModeLabel} - punteada)
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-gold-300">
              <span className="w-3 h-1 bg-gold-400 rounded-full" /> Periodo Actual
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-400">
              <span className="w-3 h-1 border-t-2 border-dashed border-slate-400" /> Periodo Comparado
            </span>
            {showMilestones && (
              <span className="flex items-center gap-1 font-bold text-gold-400">
                <Flag className="w-3.5 h-3.5" /> Hitos Activados
              </span>
            )}
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={globalOverview.multiPlatformTimeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCur" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="current" name="Periodo Actual" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorCur)" />
              <Area type="monotone" dataKey="comparison" name="Comparación" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />

              {/* Render Milestone Reference Dots */}
              {showMilestones && globalOverview.multiPlatformTimeSeries.map((point) => {
                if (point.milestone) {
                  return (
                    <ReferenceDot
                      key={point.date}
                      x={point.date}
                      y={point.current}
                      r={6}
                      fill="#D4AF37"
                      stroke="#07090E"
                      strokeWidth={2}
                    />
                  );
                }
                return null;
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid for Benchmark Radar & Distribution Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Benchmark Radar */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-400" />
                Benchmark Inter-Plataforma
              </h3>
              <p className="text-xs text-slate-400">Nivel de Engagement Rate % en cada red oficial</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={globalOverview.platformComparison}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="platform" stroke="#94A3B8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 25]} stroke="#64748B" fontSize={10} />
                <Radar name="Engagement Rate %" dataKey="engagement" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#D4AF37', borderRadius: '0.75rem', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reach Distribution Donut */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Distribución del Alcance por Red
              </h3>
              <p className="text-xs text-slate-400">Volumen relativo de audiencia por plataforma</p>
            </div>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#D4AF37', borderRadius: '0.75rem', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Content & Tracks Table */}
      <ContentTable title="Canciones & Publicaciones Más Exitosas (Abel Pintos)" items={allTopContent} />
    </div>
  );
};
