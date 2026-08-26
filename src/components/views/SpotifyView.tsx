import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../ui/StatCard';
import { ContentTable } from '../ui/ContentTable';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Music, Radio, Bookmark, ListPlus, UserCheck, HeadphoneIcon, Disc, Flame } from 'lucide-react';

export const SpotifyView: React.FC = () => {
  const { platformDataMap } = useDashboard();
  const data = platformDataMap.spotify;

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header Banner - Abel Pintos Spotify Official */}
      <div className="glass-panel-gold p-6 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
            <Music className="w-4 h-4" />
            Spotify Perfil Oficial de Artista
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Abel Pintos en Spotify</h2>
          <p className="text-xs text-slate-300 mt-1">4.4M+ Oyentes Mensuales | 3.8M+ Seguidores | Oncemil, Motivos, Sin Principio Ni Final</p>
        </div>

        <div className="glass-panel px-4 py-2 rounded-xl text-right border-emerald-500/30">
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Perfil Verificado</span>
          <div className="text-lg font-bold text-slate-100">Abel Pintos</div>
        </div>
      </div>

      {/* Specified KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label={data.kpis.listenerToFollower.label}
          value={data.kpis.listenerToFollower.value}
          previousValue={data.kpis.listenerToFollower.previousValue}
          unit="%"
          format="percent"
          brandColor="#1DB954"
          status={data.kpis.listenerToFollower.status}
          description={data.kpis.listenerToFollower.description}
        />
        <StatCard
          label={data.kpis.savesToStream.label}
          value={data.kpis.savesToStream.value}
          previousValue={data.kpis.savesToStream.previousValue}
          unit="%"
          format="percent"
          brandColor="#D4AF37"
          status={data.kpis.savesToStream.status}
          description={data.kpis.savesToStream.description}
        />
        <StatCard
          label={data.kpis.streamsPerListener.label}
          value={data.kpis.streamsPerListener.value}
          previousValue={data.kpis.streamsPerListener.previousValue}
          unit="streams"
          brandColor="#C5A059"
          status={data.kpis.streamsPerListener.status}
          description={data.kpis.streamsPerListener.description}
        />
      </div>

      {/* Core Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label={data.metrics.listeners.label}
          value={data.metrics.listeners.value}
          previousValue={data.metrics.listeners.previousValue}
          sparkline={data.metrics.listeners.sparkline}
          brandColor="#1DB954"
        />
        <StatCard
          label={data.metrics.streams.label}
          value={data.metrics.streams.value}
          previousValue={data.metrics.streams.previousValue}
          sparkline={data.metrics.streams.sparkline}
          brandColor="#D4AF37"
        />
        <StatCard
          label={data.metrics.librarySaves.label}
          value={data.metrics.librarySaves.value}
          previousValue={data.metrics.librarySaves.previousValue}
          sparkline={data.metrics.librarySaves.sparkline}
          brandColor="#1AA34A"
        />
        <StatCard
          label={data.metrics.playlistAdds.label}
          value={data.metrics.playlistAdds.value}
          previousValue={data.metrics.playlistAdds.previousValue}
          sparkline={data.metrics.playlistAdds.sparkline}
          brandColor="#C5A059"
        />
        <StatCard
          label={data.metrics.followers.label}
          value={data.metrics.followers.value}
          previousValue={data.metrics.followers.previousValue}
          sparkline={data.metrics.followers.sparkline}
          brandColor="#A7F3D0"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
          <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            Evolución de Streams Diarios en Spotify (Abel Pintos)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.timeSeries}>
                <defs>
                  <linearGradient id="spStreamsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1DB954" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1DB954" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1DB954', borderRadius: '0.75rem', fontSize: '12px' }} />
                <Area type="monotone" dataKey="Streams" stroke="#1DB954" strokeWidth={2.5} fill="url(#spStreamsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-base font-bold text-slate-100 mb-4">Canciones Más Escuchadas (%)</h3>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.contentDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                  {data.contentDistribution.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1DB954', borderRadius: '0.75rem', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5 text-xs">
            {data.contentDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-slate-100">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContentTable title="Canciones Clave de Abel Pintos en Spotify" items={data.topContent} />
    </div>
  );
};
