import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { RefreshCw, Radio, Sparkles, Clock, Calendar, Zap, ArrowRightLeft, Settings } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

export const LiveHeader: React.FC = () => {
  const { refreshData, isRefreshing, dateRange, setIsSettingsModalOpen } = useDashboard();
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  // Update clock every 10 seconds for real-time live accuracy
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayName = daysOfWeek[currentDate.getDay()];
  const dayNum = currentDate.getDate();
  const monthName = months[currentDate.getMonth()];
  const yearNum = currentDate.getFullYear();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');

  const formattedSubtitle = `Estado al ${dayName}, ${dayNum} de ${monthName} de ${yearNum} | Última actualización: ${hours}:${minutes} hs`;

  return (
    <div className="glass-panel-gold p-6 rounded-3xl border border-gold-400/40 shadow-2xl relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        {/* Title & Live Status */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 text-xs font-black tracking-wide">
              <BlackPantherIcon size={16} />
              PANTER LOOK — ECOSISTEMA DIGITAL
            </span>

            {/* Pulsing Live Green Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold shadow-sm shadow-emerald-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>En vivo / Tiempo Real</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight">
            Panel de Control en Vivo — Abel Pintos
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gold-300/90 font-medium">
            <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="font-mono">{formattedSubtitle}</span>
          </div>
        </div>

        {/* Action Controls: Refresh & Settings */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-gold-500/20 transition-all cursor-pointer disabled:opacity-75"
            title="Refrescar métricas del momento"
          >
            <RefreshCw className={`w-4 h-4 stroke-[2.5] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Actualizando...' : '↻ Actualizar datos'}</span>
          </button>

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            title="Configurar umbrales y periodos de comparación"
          >
            <Settings className="w-4 h-4 text-gold-400" />
            <span>Ajustes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
