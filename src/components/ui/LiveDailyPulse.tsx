import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, Flame, Heart, MessageSquare, Share2, Eye, Play, Sparkles, Music2, Video, ArrowUpRight } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

export const LiveDailyPulse: React.FC = () => {
  const { dateRange } = useDashboard();

  // Hourly pulse data for the last 24 hours (00:00 to 23:00)
  const hourlyData = [
    { hour: '00:00', streams: 12400, interacciones: 1800 },
    { hour: '02:00', streams: 8100, interacciones: 950 },
    { hour: '04:00', streams: 5300, interacciones: 620 },
    { hour: '06:00', streams: 9800, interacciones: 1400 },
    { hour: '08:00', streams: 24500, interacciones: 3900 },
    { hour: '10:00', streams: 38200, interacciones: 6200 },
    { hour: '12:00', streams: 47600, interacciones: 8400 },
    { hour: '14:00', streams: 52100, interacciones: 9800 },
    { hour: '16:00', streams: 64800, interacciones: 12400 },
    { hour: '18:00', streams: 82500, interacciones: 16800 },
    { hour: '20:00', streams: 94200, interacciones: 19500 },
    { hour: '22:00', streams: 78900, interacciones: 15200 },
    { hour: '23:59', streams: 45300, interacciones: 8900 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 24h Hourly Pulse Chart (2 cols) */}
      <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-gold-400/30 flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gold-400/10 text-gold-400 border border-gold-400/30">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-100 flex items-center gap-2">
                Pulso en Vivo — Últimas 24 Horas
              </h3>
              <p className="text-xs text-slate-400">
                Flujo de streams, reproducciones de video e interacciones hora a hora.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gold-400" />
              <span className="text-slate-200">Reproducciones</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="text-slate-300">Interacciones</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="streamHourlyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="interactHourlyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FB7185" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FB7185" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="hour" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090D16',
                  borderColor: '#D4AF37',
                  borderRadius: '1rem',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                }}
                formatter={(val: any, name: any) => [
                  `${Number(val).toLocaleString()}`,
                  name === 'streams' ? 'Reproducciones / Streams' : 'Interacciones'
                ]}
              />
              <Area
                type="monotone"
                dataKey="streams"
                name="streams"
                stroke="#D4AF37"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#streamHourlyGrad)"
              />
              <Area
                type="monotone"
                dataKey="interacciones"
                name="interacciones"
                stroke="#FB7185"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#interactHourlyGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
          <span>Pico de actividad registrado a las <strong>20:00 hs</strong> (Shows & Primetime).</span>
          <span className="text-emerald-400 font-bold font-mono">563,800 impactos totales hoy</span>
        </div>
      </div>

      {/* Live Featured Content of the Moment (1 col) */}
      <div className="glass-panel p-6 rounded-3xl border border-pink-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              DESTACADO ÚLTIMAS 24 HS
            </span>
            <span className="text-[11px] text-slate-400">Instagram Reel</span>
          </div>

          <h4 className="text-base font-black text-slate-100 line-clamp-2 leading-snug">
            ✨ GIRA 30 ANIVERSARIO: ¡Nuevas fechas Buenos Aires & Rosario!
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Publicado hace 4 horas | Audio: <strong>Oncemil (En Vivo)</strong>
          </p>
        </div>

        {/* Live Counters */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-gold-400" />
              Reproducciones en Vivo
            </span>
            <span className="font-mono font-black text-slate-100 text-sm">
              184,500
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400" />
              Likes & Reacciones
            </span>
            <span className="font-mono font-black text-slate-100 text-sm">
              31,200
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-sky-400" />
              Comentarios de Fans
            </span>
            <span className="font-mono font-black text-slate-100 text-sm">
              2,450
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              Engagement del Post
            </span>
            <span className="font-mono font-black text-emerald-400 text-sm">
              18.2%
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 italic">
          Tracción excepcional impulsada por la venta anticipada de entradas.
        </div>
      </div>
    </div>
  );
};
