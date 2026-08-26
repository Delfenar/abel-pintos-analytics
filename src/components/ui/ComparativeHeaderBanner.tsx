import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { getComparativePeriodLabel } from '../../services/mockDataService';
import { ArrowRightLeft, Calendar, Sparkles } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

export const ComparativeHeaderBanner: React.FC = () => {
  const {
    dateRange,
    comparisonMode,
    customComparisonType,
    customStartDate,
    customEndDate,
    customCompStartDate,
    customCompEndDate,
    setIsSettingsModalOpen
  } = useDashboard();

  const labels = getComparativePeriodLabel(
    dateRange,
    comparisonMode,
    customComparisonType,
    customStartDate,
    customEndDate,
    customCompStartDate,
    customCompEndDate
  );

  return (
    <div className="glass-panel-gold p-5 rounded-2xl border border-gold-400/40 shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title & Dynamic Dates Badge */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 text-[11px] font-bold border border-gold-400/30">
              <BlackPantherIcon size={14} />
              PANTER LOOK COMPARATIVE
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {comparisonMode.toUpperCase()}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-gold-400" />
            Comparativa de Rendimiento
          </h2>

          {/* Subtitle / Dynamic Date Badge */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold">
            {/* Current Period Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-gold-400/40 text-slate-100 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-400 shadow-sm shadow-gold-500/50" />
              <span className="text-gold-300 font-extrabold">{labels.currentLabel}</span>
            </div>

            <span className="text-xs font-black text-amber-400 italic">vs.</span>

            {/* Comparison Period Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500 border border-dashed border-slate-300" />
              <span className="text-slate-300 font-semibold">{labels.comparisonLabel}</span>
            </div>
          </div>
        </div>

        {/* Action Button to Adjust Settings */}
        <div className="shrink-0">
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-gold-400/40 text-gold-300 hover:border-gold-400 hover:text-gold-200 text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Ajustar Periodos</span>
          </button>
        </div>
      </div>
    </div>
  );
};
