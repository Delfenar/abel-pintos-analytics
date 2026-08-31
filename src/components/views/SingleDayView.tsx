import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { SingleDayControlBar } from '../ui/SingleDayControlBar';
import { MASTER_INDEXABLE_RECORDS } from '../../services/searchEngineService';
import { PrintReportModal } from '../ui/PrintReportModal';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  Calendar, 
  Download, 
  Play, 
  Eye, 
  UserPlus, 
  Heart, 
  Layers, 
  ArrowRightLeft, 
  Flame, 
  Music, 
  Youtube, 
  Instagram, 
  Video, 
  Facebook, 
  Twitter, 
  AtSign, 
  ExternalLink,
  MapPin,
  Disc,
  Clock,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { BlackPantherIcon } from '../ui/BlackPantherIcon';

export const SingleDayView: React.FC = () => {
  const {
    selectedSingleDay,
    singleDayCompType,
    setDateRange
  } = useDashboard();

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const parsedDate = new Date(selectedSingleDay + 'T12:00:00');
  const dayName = daysOfWeek[parsedDate.getDay()];
  const dayNum = parsedDate.getDate();
  const monthName = months[parsedDate.getMonth()];
  const yearNum = parsedDate.getFullYear();

  const formattedTitle = `Resultados del ${dayName}, ${dayNum} de ${monthName} de ${yearNum}`;

  // Comparative day label
  let compLabel = 'Modo Absoluto (Sin Comparación)';
  if (singleDayCompType === 'dod') {
    const prevDay = new Date(parsedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    compLabel = `vs. Día Anterior (${prevDay.getDate()} ${months[prevDay.getMonth()].slice(0, 3)})`;
  } else if (singleDayCompType === 'same_day_last_week') {
    const prevWeekDay = new Date(parsedDate);
    prevWeekDay.setDate(prevWeekDay.getDate() - 7);
    compLabel = `vs. ${daysOfWeek[prevWeekDay.getDay()]} Anterior (${prevWeekDay.getDate()} ${months[prevWeekDay.getMonth()].slice(0, 3)})`;
  }

  // Filter publications posted strictly on this single date
  const dayPublications = MASTER_INDEXABLE_RECORDS.filter(
    (rec) => rec.fecha === selectedSingleDay
  );

  // Calculate day metrics
  const isLaunchDay = selectedSingleDay === '2026-08-27';
  const isWeekend = parsedDate.getDay() === 0 || parsedDate.getDay() === 6;

  const baseStreams = isLaunchDay ? 940000 : isWeekend ? 680000 : 563800;
  const baseFollowers = isLaunchDay ? 2850 : isWeekend ? 1720 : 1420;
  const baseInteractions = isLaunchDay ? 142000 : isWeekend ? 98000 : 89500;
  const compStreams = Math.round(baseStreams * 0.88);

  // Hourly dataset for this single day
  const hourlyData = [
    { hour: '00:00', actual: Math.round(baseStreams * 0.022), anterior: Math.round(compStreams * 0.021) },
    { hour: '02:00', actual: Math.round(baseStreams * 0.014), anterior: Math.round(compStreams * 0.015) },
    { hour: '04:00', actual: Math.round(baseStreams * 0.009), anterior: Math.round(compStreams * 0.010) },
    { hour: '06:00', actual: Math.round(baseStreams * 0.017), anterior: Math.round(compStreams * 0.016) },
    { hour: '08:00', actual: Math.round(baseStreams * 0.043), anterior: Math.round(compStreams * 0.040) },
    { hour: '10:00', actual: Math.round(baseStreams * 0.068), anterior: Math.round(compStreams * 0.065) },
    { hour: '12:00', actual: Math.round(baseStreams * 0.084), anterior: Math.round(compStreams * 0.080) },
    { hour: '14:00', actual: Math.round(baseStreams * 0.092), anterior: Math.round(compStreams * 0.088) },
    { hour: '16:00', actual: Math.round(baseStreams * 0.115), anterior: Math.round(compStreams * 0.110) },
    { hour: '18:00', actual: Math.round(baseStreams * 0.146), anterior: Math.round(compStreams * 0.138) },
    { hour: '20:00', actual: Math.round(baseStreams * 0.167), anterior: Math.round(compStreams * 0.155) },
    { hour: '22:00', actual: Math.round(baseStreams * 0.140), anterior: Math.round(compStreams * 0.135) },
    { hour: '23:59', actual: Math.round(baseStreams * 0.080), anterior: Math.round(compStreams * 0.075) },
  ];

  const platformIcons: Record<string, React.ReactNode> = {
    Spotify: <Music className="w-4 h-4 text-emerald-400" />,
    YouTube: <Youtube className="w-4 h-4 text-red-500" />,
    Instagram: <Instagram className="w-4 h-4 text-pink-400" />,
    TikTok: <Video className="w-4 h-4 text-cyan-400" />,
    Facebook: <Facebook className="w-4 h-4 text-blue-400" />,
    X: <Twitter className="w-4 h-4 text-sky-400" />,
    Threads: <AtSign className="w-4 h-4 text-slate-200" />,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Single Day Navigation & Control Bar */}
      <SingleDayControlBar />

      {/* 2. Main Dynamic Header for the Selected Single Day */}
      <div className="glass-panel-gold p-6 rounded-3xl border border-gold-400/50 shadow-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-xs font-black">
                <BlackPantherIcon size={16} />
                AUDITORÍA DE 24 HORAS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                <ArrowRightLeft className="w-3.5 h-3.5" />
                {compLabel}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight">
              {formattedTitle}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300">
              Métricas consolidadas, flujo horario y publicaciones registradas en la jornada de 24 horas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-gold-500/20 transition-all cursor-pointer"
              title="Descargar o imprimir informe formal diario en PDF"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Descargar Informe Diario en PDF</span>
            </button>

            <button
              onClick={() => setDateRange('28d')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <span>Ver Periodo Completo (28D)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Daily Key Metric Cards (4 KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 24h Streams & Reproductions */}
        <div className="glass-panel p-5 rounded-3xl border border-gold-400/30 bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Play className="w-4 h-4 text-gold-400" />
            Streams & Vistas (24h)
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
            +{baseStreams.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            {singleDayCompType !== 'none' ? '+13.6% vs comparativa' : 'Consolidado del día'}
          </div>
        </div>

        {/* New Followers Today */}
        <div className="glass-panel p-5 rounded-3xl border border-pink-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <UserPlus className="w-4 h-4 text-pink-400" />
            Nuevos Seguidores Ganados
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
            +{baseFollowers.toLocaleString()}
          </div>
          <div className="text-[11px] text-pink-300 font-semibold mt-1">
            Crecimiento neto en 24h
          </div>
        </div>

        {/* Total Interactions Today */}
        <div className="glass-panel p-5 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Heart className="w-4 h-4 text-rose-400" />
            Interacciones Totales
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
            +{baseInteractions.toLocaleString()}
          </div>
          <div className="text-[11px] text-rose-300 font-semibold mt-1">
            Likes, comentarios & shares
          </div>
        </div>

        {/* Daily Posts Count */}
        <div className="glass-panel p-5 rounded-3xl border border-sky-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Layers className="w-4 h-4 text-sky-400" />
            Publicaciones del Día
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
            {dayPublications.length} {dayPublications.length === 1 ? 'Post' : 'Posts'}
          </div>
          <div className="text-[11px] text-sky-300 font-semibold mt-1">
            En redes oficiales de Abel Pintos
          </div>
        </div>
      </div>

      {/* 4. 24-Hour Hourly Activity Curve */}
      <div className="glass-panel p-6 rounded-3xl border border-gold-400/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
              <BlackPantherIcon size={20} />
              Pulso de Actividad Hora a Hora (00:00 – 23:59)
            </h3>
            <p className="text-xs text-slate-400">
              Curva horaria de reproducciones e interacciones registradas a lo largo del día.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gold-400 shadow-sm shadow-gold-500/50" />
              <span className="text-slate-200">Día Seleccionado</span>
            </div>
            {singleDayCompType !== 'none' && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 border-b-2 border-dashed border-slate-500" />
                <span className="text-slate-400">Jornada Comparativa</span>
              </div>
            )}
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="dayActualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="dayCompGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
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
                  `${Number(val).toLocaleString()} impactos`,
                  name === 'actual' ? 'Día Seleccionado' : 'Jornada Comparativa'
                ]}
              />

              {singleDayCompType !== 'none' && (
                <Area
                  type="monotone"
                  dataKey="anterior"
                  name="anterior"
                  stroke="#64748B"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#dayCompGrad)"
                />
              )}

              <Area
                type="monotone"
                dataKey="actual"
                name="actual"
                stroke="#D4AF37"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#dayActualGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
          <span>Pico diario registrado a las <strong>20:00 hs</strong>.</span>
          <span className="text-gold-400 font-bold font-mono">Total 24hs: {baseStreams.toLocaleString()} reproducciones</span>
        </div>
      </div>

      {/* 5. Publications Released Exclusively on this Single Date */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gold-400" />
            <h3 className="text-lg font-black text-slate-100">
              Publicaciones Realizadas el {formattedTitle}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {dayPublications.length} {dayPublications.length === 1 ? 'registro' : 'registros'}
          </span>
        </div>

        {dayPublications.length === 0 ? (
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-3">
            <div className="p-3 w-12 h-12 mx-auto rounded-2xl bg-slate-900 text-slate-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-200">
              No se registraron nuevos posteos directos el {selectedSingleDay}
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Las métricas reflejan el consumo orgánico continuo del catálogo, reproducciones en streaming y retención de la comunidad de Abel Pintos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayPublications.map((rec) => (
              <div
                key={rec.id}
                className="glass-panel p-5 rounded-2xl border border-gold-400/30 hover:border-gold-400/60 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                        {platformIcons[rec.plataforma]}
                      </span>
                      <span className="text-xs font-extrabold uppercase tracking-wide text-slate-200">
                        {rec.plataforma}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                        {rec.tipoContenido}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-gold-400 font-bold">
                      {rec.fecha}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100 group-hover:text-gold-300 transition-colors leading-snug">
                    {rec.titulo}
                  </h4>

                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                    {rec.descripcion}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {rec.ciudad && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-900 text-amber-300/90 border border-amber-500/20">
                        <MapPin className="w-2.5 h-2.5" />
                        {rec.ciudad}
                      </span>
                    )}
                    {rec.campania && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-900 text-emerald-300/90 border border-emerald-500/20">
                        <Disc className="w-2.5 h-2.5" />
                        {rec.campania}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs bg-slate-950/40 p-2.5 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Reproducciones</span>
                    <span className="font-mono font-bold text-slate-200">
                      {rec.metricas.reproducciones.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Alcance</span>
                    <span className="font-mono font-bold text-gold-400">
                      {rec.metricas.alcance.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Interacciones</span>
                    <span className="font-mono font-bold text-rose-400">
                      {rec.metricas.interacciones.toLocaleString()}
                    </span>
                  </div>
                </div>

                {rec.enlacePublicacion && (
                  <div className="flex justify-end pt-1">
                    <a
                      href={rec.enlacePublicacion}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      <span>Ver publicación oficial</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Export Modal */}
      <PrintReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        query={`Día ${selectedSingleDay}`}
      />
    </div>
  );
};
