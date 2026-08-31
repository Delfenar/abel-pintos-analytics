import React from 'react';
import { LiveHeader } from '../ui/LiveHeader';
import { LiveStatCards } from '../ui/LiveStatCards';
import { LiveDailyPulse } from '../ui/LiveDailyPulse';
import { ComparativeHeaderBanner } from '../ui/ComparativeHeaderBanner';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { SearchHeaderBanner } from '../ui/SearchHeaderBanner';
import { SearchExecutiveSummary } from '../ui/SearchExecutiveSummary';
import { SearchEmptyState } from '../ui/SearchEmptyState';
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
  PieChart, 
  Pie, 
  Cell, 
  ReferenceDot 
} from 'recharts';
import { Disc, Award, ShieldCheck, Layers, Sparkles, Music2, Users, ArrowRightLeft, Flag, Settings } from 'lucide-react';

// Custom Panther Face Marker Dot for Recharts Graphs
const PantherMarkerDot = (props: any) => {
  const { cx, cy } = props;
  if (cx === undefined || cy === undefined || isNaN(cx) || isNaN(cy)) return null;
  return (
    <g transform={`translate(${cx - 14}, ${cy - 14})`} className="cursor-pointer">
      <circle cx="14" cy="14" r="15" fill="#0F172A" stroke="#D4AF37" strokeWidth="1.5" className="shadow-lg shadow-gold-500/50" />
      <BlackPantherIcon size={28} />
    </g>
  );
};

export const OverviewView: React.FC = () => {
  const { 
    filteredOverview, 
    filteredPlatformDataMap, 
    matchedContentCount,
    hasMatches,
    searchQuery,
    setSearchQuery,
    dateRange, 
    activeCampaign, 
    comparisonMode,
    customComparisonType,
    displayValueType,
    showMilestones,
    setIsSettingsModalOpen
  } = useDashboard();

  const currentCampaignInfo = CAMPAIGNS.find(c => c.id === activeCampaign) || CAMPAIGNS[0];

  const allTopContent = Object.values(filteredPlatformDataMap)
    .flatMap((p) => p.topContent)
    .filter((c) => activeCampaign === 'all' || c.campaignId === activeCampaign)
    .sort((a, b) => b.metrics.viewsOrReach - a.metrics.viewsOrReach);

  const pieData = filteredOverview.platformComparison.map((p) => ({
    name: p.platform,
    value: p.reach,
  }));

  const COLORS = ['#1DB954', '#E1306C', '#FF0000', '#1877F2', '#1DA1F2', '#00F2FE', '#000000'];

  // Custom Dual Tooltip with Absolute vs Percentage Display & Panther Badge
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const cur = payload.find((p: any) => p.dataKey === 'current' || p.dataKey === 'Spotify' || p.dataKey === 'Streams');
      const comp = payload.find((p: any) => p.dataKey === 'comparison' || p.dataKey === 'Spotify Anterior' || p.dataKey === 'Streams Anterior');

      const curVal = cur ? Number(cur.value) : 0;
      const compVal = comp ? Number(comp.value) : 0;
      const diff = curVal - compVal;
      const pct = compVal > 0 ? ((diff / compVal) * 100).toFixed(1) : '0.0';

      const milestoneMatch = filteredOverview.milestones.find(m => m.date === label);

      return (
        <div className="glass-panel p-3.5 rounded-2xl border border-gold-400/50 text-xs shadow-2xl space-y-1.5 bg-slate-950/95 text-slate-100 max-w-xs">
          <div className="font-extrabold border-b border-slate-800 pb-1.5 flex items-center justify-between text-gold-300">
            <span className="flex items-center gap-1.5">
              <BlackPantherIcon size={18} />
              {label}
            </span>
            {milestoneMatch && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-400 border border-gold-400/40 flex items-center gap-1">
                <Flag className="w-3 h-3" /> Hito Panter
              </span>
            )}
          </div>

          {milestoneMatch && (
            <div className="p-2 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-300 font-semibold text-[11px] flex items-center gap-2">
              <BlackPantherIcon size={16} />
              <span>🎯 {milestoneMatch.title}</span>
            </div>
          )}

          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 font-medium">Periodo Actual:</span>
              <span className="font-mono font-bold text-gold-400 text-sm">
                {curVal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500 font-medium">Periodo Comparativo:</span>
              <span className="font-mono font-semibold text-slate-400">
                {compVal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1.5 border-t border-slate-800/80">
              <span className="text-slate-400 font-semibold">Variación Temporal:</span>
              <span className={`font-mono font-black ${diff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {displayValueType === 'absolute' 
                  ? `${diff >= 0 ? '+' : ''}${diff.toLocaleString()} ΔN`
                  : `${diff >= 0 ? '+' : ''}${pct}%`}
              </span>
            </div>
          </div>

          {milestoneMatch?.category && (
            <div className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-900">
              Categoría de Hito: {milestoneMatch.category}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 1. Dynamic Live Header with Real-Time Clock & Pulsing Badge */}
      <LiveHeader />

      {/* 2. Prominent Search Header Banner when Search is Active */}
      {searchQuery && (
        <SearchHeaderBanner 
          query={searchQuery} 
          matchedCount={matchedContentCount} 
          onClear={() => setSearchQuery('')} 
        />
      )}

      {/* 3. Dynamic Executive Summary Widget when Search is Active and has matches */}
      {searchQuery && hasMatches && (
        <SearchExecutiveSummary query={searchQuery} />
      )}

      {/* 4. Live Moment Sampling Stat Cards (Audiencia 17.4M+, Spotify, YouTube, IG, TikTok, FB, X, Threads) */}
      <LiveStatCards />

      {/* 5. 24h Daily Pulse (Hourly Streams/Interactions) & Live Featured Content Feed */}
      <LiveDailyPulse />

      {/* 6. Dynamic Comparative Header Banner */}
      <ComparativeHeaderBanner />

      {/* Empty State vs Normal Dashboard Detailed Evolution Content */}
      {!hasMatches ? (
        <SearchEmptyState 
          query={searchQuery} 
          onReset={() => setSearchQuery('')}
          onSuggestionClick={(suggestion) => setSearchQuery(suggestion)}
        />
      ) : (
        <>
          {/* Main Evolution Timeline Chart with Panther Face Markers */}
          <div className="glass-panel p-6 rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                  <BlackPantherIcon size={20} />
                  Evolución Multicanal & Hitos Clave
                </h3>
                <p className="text-xs text-slate-400">
                  Contrastando Periodo Actual vs. Periodo Comparativo con marcadores de hitos oficiales.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gold-400 shadow-sm shadow-gold-500/50" />
                  <span className="text-slate-200">Periodo Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 border-b-2 border-dashed border-slate-500" />
                  <span className="text-slate-400">Comparativo</span>
                </div>
                {showMilestones && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gold-400/10 border border-gold-400/30 text-gold-300">
                    <BlackPantherIcon size={14} />
                    <span>Hitos Activos</span>
                  </div>
                )}
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredOverview.multiPlatformTimeSeries} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="compAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748B" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />

                  <Area
                    type="monotone"
                    dataKey="comparison"
                    name="Periodo Anterior"
                    stroke="#64748B"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#compAreaGrad)"
                  />

                  <Area
                    type="monotone"
                    dataKey="current"
                    name="Periodo Actual"
                    stroke="#D4AF37"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#goldAreaGrad)"
                  />

                  {/* Render Panther Face Marker Dots on Milestone Days */}
                  {showMilestones && filteredOverview.milestones.map((ms) => {
                    const matchedPoint = filteredOverview.multiPlatformTimeSeries.find(p => p.date === ms.date);
                    if (!matchedPoint) return null;
                    return (
                      <ReferenceDot
                        key={ms.id}
                        x={ms.date}
                        y={matchedPoint.current}
                        shape={<PantherMarkerDot />}
                      />
                    );
                  })}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution and Performance Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pie Chart: Distribution by Network */}
            <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-100 mb-1">
                  Distribución de Audiencia por Canal
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Cuota de impacto relativo en la comunidad digital de Abel Pintos.
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#090D16',
                        borderColor: '#D4AF37',
                        borderRadius: '1rem',
                        color: '#FFFFFF',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                      }}
                      itemStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
                      labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
                      formatter={(val: any) => [`${Number(val).toLocaleString()} cuentas`, 'Alcance']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-800">
                {pieData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Content Breakdown Table */}
            <div className="lg:col-span-2">
              <ContentTable
                title={searchQuery ? `Contenido Filtrado para "${searchQuery}"` : 'Contenido Destacado del Artista'}
                items={allTopContent}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
