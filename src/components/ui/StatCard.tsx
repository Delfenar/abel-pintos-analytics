import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, HelpCircle, Pin } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { evaluateDeltaWithThresholds } from '../../services/mockDataService';

interface StatCardProps {
  id?: string;
  label: string;
  value: number | string;
  previousWeekValue?: number;
  previousMonthValue?: number;
  previousYearValue?: number;
  previousValue?: number;
  unit?: string;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'percent' | 'currency' | 'duration';
  description?: string;
  sparkline?: number[];
  brandColor?: string;
  status?: 'excellent' | 'good' | 'average' | 'needs_improvement';
}

const formatValue = (
  val: number | string,
  format?: 'number' | 'percent' | 'currency' | 'duration',
  prefix = '',
  suffix = ''
): string => {
  if (typeof val === 'string') return `${prefix}${val}${suffix}`;
  
  if (format === 'percent') {
    return `${prefix}${val.toFixed(1)}%${suffix}`;
  }
  if (format === 'currency') {
    return `${prefix}$${val.toFixed(2)}${suffix}`;
  }
  if (format === 'duration') {
    return `${prefix}${val}s${suffix}`;
  }

  if (val >= 1000000) {
    return `${prefix}${(val / 1000000).toFixed(2)}M${suffix}`;
  }
  if (val >= 1000) {
    return `${prefix}${(val / 1000).toFixed(1)}K${suffix}`;
  }
  return `${prefix}${val.toLocaleString()}${suffix}`;
};

export const StatCard: React.FC<StatCardProps> = ({
  id,
  label,
  value,
  previousWeekValue,
  previousMonthValue,
  previousYearValue,
  previousValue: fallbackPrev,
  unit,
  prefix = '',
  suffix = '',
  format = 'number',
  description,
  sparkline,
  brandColor = '#D4AF37',
  status,
}) => {
  const { 
    comparisonMode, 
    customComparisonType, 
    displayValueType, 
    customThresholds,
    pinnedMetrics,
    togglePinnedMetric
  } = useDashboard();

  let prevVal: number | undefined = fallbackPrev;
  let compLabel = 'vs. periodo anterior';

  if (customComparisonType === 'year_ago') {
    prevVal = previousYearValue ?? fallbackPrev;
    compLabel = 'vs. año anterior (YoY)';
  } else if (comparisonMode === 'wow' && previousWeekValue !== undefined) {
    prevVal = previousWeekValue;
    compLabel = 'vs. semana anterior (WoW)';
  } else if (comparisonMode === 'mom' && previousMonthValue !== undefined) {
    prevVal = previousMonthValue;
    compLabel = 'vs. mes anterior (MoM)';
  } else if (comparisonMode === 'yoy' && previousYearValue !== undefined) {
    prevVal = previousYearValue;
    compLabel = 'vs. año anterior (YoY)';
  } else if (previousMonthValue !== undefined) {
    prevVal = previousMonthValue;
  }

  const numVal = typeof value === 'number' ? value : 0;
  const numPrev = prevVal || 0;

  const deltaEval = evaluateDeltaWithThresholds(numVal, numPrev, customThresholds);
  const isPinned = id ? !!pinnedMetrics[id] : false;

  const sparklineData = sparkline ? sparkline.map((val, idx) => ({ idx, val })) : [];

  const getStatusBadge = () => {
    if (!status) return null;
    const colors = {
      excellent: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      good: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      average: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      needs_improvement: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    };
    const labels = {
      excellent: 'Excelente',
      good: 'Bueno',
      average: 'Medio',
      needs_improvement: 'A mejorar'
    };
    return (
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className={`glass-panel p-5 rounded-2xl relative overflow-hidden transition-all duration-300 group ${
      isPinned ? 'border-gold-400/60 bg-gold-400/5 shadow-lg shadow-gold-500/5' : 'hover:border-gold-400/40'
    }`}>
      {/* Top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 opacity-70 transition-all group-hover:opacity-100" 
        style={{ backgroundColor: brandColor }} 
      />

      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 tracking-wide uppercase flex items-center gap-1.5">
          {label}
          {description && (
            <span className="cursor-help text-slate-500 hover:text-slate-300 transition-colors" title={description}>
              <HelpCircle className="w-3.5 h-3.5" />
            </span>
          )}
        </span>
        <div className="flex items-center gap-1.5">
          {id && (
            <button
              onClick={() => togglePinnedMetric(id)}
              className={`p-1 rounded-md transition-colors ${
                isPinned ? 'text-gold-400 bg-gold-400/10' : 'text-slate-600 hover:text-slate-300'
              }`}
              title={isPinned ? 'Fijado en prioridad' : 'Fijar KPI en panel'}
            >
              <Pin className="w-3.5 h-3.5" />
            </button>
          )}
          {getStatusBadge()}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-4 my-1">
        <div className="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
          {formatValue(value, format, prefix, suffix)}
          {unit && format !== 'percent' && format !== 'currency' && (
            <span className="text-sm font-medium text-slate-400 ml-1">{unit}</span>
          )}
        </div>

        {prevVal !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
              deltaEval.status === 'positive'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : deltaEval.status === 'negative'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
            }`}
          >
            {deltaEval.status === 'positive' && <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />}
            {deltaEval.status === 'negative' && <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />}
            {deltaEval.status === 'neutral' && <Minus className="w-3.5 h-3.5 stroke-[2.5]" />}
            
            <span>
              {displayValueType === 'absolute'
                ? `${deltaEval.absolute >= 0 ? '+' : ''}${formatValue(deltaEval.absolute, format, prefix, suffix)}`
                : `${deltaEval.percent >= 0 ? '+' : ''}${deltaEval.percent.toFixed(1)}%`}
            </span>
          </div>
        )}
      </div>

      {/* Secondary Context & Sparkline */}
      <div className="mt-3 pt-2 border-t border-slate-800/40 dark:border-slate-800/60 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 dark:text-slate-400">
          {prevVal !== undefined ? (
            <>vs. <strong className="text-slate-300">{formatValue(prevVal, format, prefix, suffix)}</strong> ({comparisonMode.toUpperCase()})</>
          ) : (
            compLabel
          )}
        </span>

        {sparklineData.length > 0 && (
          <div className="w-24 h-7">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="val"
                  stroke={brandColor}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
