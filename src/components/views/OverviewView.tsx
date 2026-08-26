import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { CAMPAIGNS } from '../../services/mockDataService';
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
  Cell
} from 'recharts';
import { Disc, Award, ShieldCheck, Zap, Layers, Sparkles, Music2, Users } from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { globalOverview, platformDataMap, dateRange, activeCampaign } = useDashboard();

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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-gold-400/20 text-slate-300 text-xs font-semibold">
                Campaña: <strong className="text-gold-300">{currentCampaignInfo.label}</strong>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              Ecosistema Social & Streaming Unificado
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/90 max-w-3xl mt-1 leading-relaxed">
              Monitoreo consolidado de Spotify, YouTube, Instagram, Facebook, X, TikTok y Threads. Rango de tiempo: <strong className="text-gold-300 uppercase">{dateRange}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="glass-panel p-4 rounded-2xl border-gold-400/30 text-right">
              <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest block">Comunidad Global Total</span>
              <div className="text-2xl font-black text-slate-100 flex items-center justify-end gap-1.5">
                <Users className="w-5 h-5 text-gold-400" />
                ~18.5M+
              </div>
              <span className="text-[10px] text-slate-400">Oyentes & Seguidores Acumulados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={globalOverview.totalReach.label}
          value={globalOverview.totalReach.value}
          previousValue={globalOverview.totalReach.previousValue}
          sparkline={globalOverview.totalReach.sparkline}
          brandColor="#D4AF37"
          description="Alcance consolidado único en todas las plataformas oficiales de Abel Pintos."
        />
        <StatCard
          label={globalOverview.totalImpressions.label}
          value={globalOverview.totalImpressions.value}
          previousValue={globalOverview.totalImpressions.previousValue}
          sparkline={globalOverview.totalImpressions.sparkline}
          brandColor="#C5A059"
          description="Suma total de streams en Spotify y reproducciones de video/posts."
        />
        <StatCard
          label={globalOverview.avgEngagementRate.label}
          value={globalOverview.avgEngagementRate.value}
          previousValue={globalOverview.avgEngagementRate.previousValue}
          unit="%"
          format="percent"
          brandColor="#10B981"
          status={globalOverview.avgEngagementRate.status}
          description="Engagement rate medio de la comunidad activa de fans."
        />
        <StatCard
          label={globalOverview.totalFollowers.label}
          value={globalOverview.totalFollowers.value}
          previousValue={globalOverview.totalFollowers.previousValue}
          sparkline={globalOverview.totalFollowers.sparkline}
          brandColor="#E1306C"
          description="Seguidores directos agregados en redes y suscriptores de YouTube."
        />
      </div>

      {/* Main Evolution Timeline Chart */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-gold-400" />
              Evolución Diaria de Oyentes & Reproducciones por Plataforma
            </h3>
            <p className="text-xs text-slate-400">Comparativa de volumen de reproducciones y alcance durante el período</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-[#1DB954]" /> Spotify</span>
            <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-[#FF0000]" /> YouTube</span>
            <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-[#E1306C]" /> Instagram</span>
            <span className="flex items-center gap-1.5 text-slate-300"><span className="w-2.5 h-2.5 rounded-full bg-[#00F2FE]" /> TikTok</span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={globalOverview.multiPlatformTimeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1DB954" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#1DB954" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorYt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF0000" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorIg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E1306C" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#E1306C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#D4AF37', borderRadius: '0.75rem', color: '#F8FAFC', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="Spotify" stroke="#1DB954" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSp)" />
              <Area type="monotone" dataKey="YouTube" stroke="#FF0000" strokeWidth={2.5} fillOpacity={1} fill="url(#colorYt)" />
              <Area type="monotone" dataKey="Instagram" stroke="#E1306C" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIg)" />
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
