import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { SingleDayCompType } from '../../types/analytics';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  ArrowRightLeft, 
  Flame, 
  Radio,
  Zap,
  RotateCcw
} from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

export const SingleDayControlBar: React.FC = () => {
  const {
    dateRange,
    setDateRange,
    selectedSingleDay,
    setSelectedSingleDay,
    singleDayCompType,
    setSingleDayCompType,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    goToYesterday,
    goToLaunchDay
  } = useDashboard();

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

  const formattedDayTitle = `${dayName}, ${dayNum} de ${monthName} de ${yearNum}`;

  return (
    <div className="glass-panel-gold p-5 rounded-3xl border border-gold-400/40 shadow-xl space-y-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Date Controls & Navigation Arrows */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/40 text-xs font-black">
            <BlackPantherIcon size={16} />
            VISTA DE DÍA ÚNICO
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 p-1 rounded-2xl">
            <button
              onClick={goToPreviousDay}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-sm"
              title="Ir al día anterior"
            >
              <ChevronLeft className="w-4 h-4 text-gold-400" />
              <span>Día anterior</span>
            </button>

            {/* Individual Native Date Picker */}
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-xl border border-gold-400/30">
              <Calendar className="w-4 h-4 text-gold-400" />
              <input
                type="date"
                value={selectedSingleDay}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedSingleDay(e.target.value);
                    setDateRange('1d');
                  }
                }}
                className="bg-transparent text-slate-100 text-xs font-bold font-mono focus:outline-none cursor-pointer"
              />
            </div>

            <button
              onClick={goToNextDay}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-sm"
              title="Ir al día siguiente"
            >
              <span>Día siguiente</span>
              <ChevronRight className="w-4 h-4 text-gold-400" />
            </button>
          </div>
        </div>

        {/* Quick Shortcut Buttons: Hoy, Ayer, Último Lanzamiento */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Accesos Rápidos:
          </span>
          <button
            onClick={goToToday}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedSingleDay === '2026-08-31'
                ? 'bg-gold-400 text-slate-950 font-black shadow-md shadow-gold-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Hoy (31 Ago)
          </button>

          <button
            onClick={goToYesterday}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedSingleDay === '2026-08-30'
                ? 'bg-gold-400 text-slate-950 font-black shadow-md shadow-gold-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Ayer (30 Ago)
          </button>

          <button
            onClick={goToLaunchDay}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedSingleDay === '2026-08-27'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-amber-300 hover:text-amber-200 border border-amber-500/30'
            }`}
            title="Lanzamiento de Ibuprofeno & Apertura de Gira"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Último Lanzamiento (27 Ago)</span>
          </button>
        </div>
      </div>

      {/* Comparison Selector (DoD vs Same Day Last Week vs None) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ArrowRightLeft className="w-4 h-4 text-gold-400" />
          <span className="font-semibold">Modo de Comparación Diaria:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSingleDayCompType('dod')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              singleDayCompType === 'dod'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Contra el Día Anterior (DoD)
          </button>

          <button
            onClick={() => setSingleDayCompType('same_day_last_week')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              singleDayCompType === 'same_day_last_week'
                ? 'bg-slate-800 text-gold-300 border border-gold-400/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Mismo Día Semana Anterior (-7d)
          </button>

          <button
            onClick={() => setSingleDayCompType('none')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              singleDayCompType === 'none'
                ? 'bg-slate-800 text-slate-200 border border-slate-600 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Sin Comparación (Solo Absolutos)
          </button>
        </div>
      </div>
    </div>
  );
};
