import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

interface StatCardProps {
  label: string;
  value: number | string;
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

  // Large number formatting
  if (val >= 1000000) {
    return `${prefix}${(val / 1000000).toFixed(2)}M${suffix}`;
  }
  if (val >= 1000) {
    return `${prefix}${(val / 1000).toFixed(1)}K${suffix}`;
  }
  return `${prefix}${val.toLocaleString()}${suffix}`;
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  previousValue,
  unit,
  prefix = '',
  suffix = '',
  format = 'number',
  description,
  sparkline,
  brandColor = '#6366F1',
  status,
}) => {
  let percentChange = 0;
  if (typeof value === 'number' && previousValue && previousValue > 0) {
    percentChange = ((value - previousValue) / previousValue) * 100;
  }

  const isPositive = percentChange >= 0;

  // Convert sparkline array to recharts structure
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
    <div className="glass-panel p-5 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-slate-600/50 hover:shadow-lg hover:shadow-indigo-500/5 group">
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
        {getStatusBadge()}
      </div>

      <div className="flex items-baseline justify-between gap-4 my-1">
        <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          {formatValue(value, format, prefix, suffix)}
          {unit && format !== 'percent' && format !== 'currency' && (
            <span className="text-sm font-medium text-slate-400 ml-1">{unit}</span>
          )}
        </div>

        {previousValue !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-300'
                : 'bg-rose-500/10 text-rose-400 dark:bg-rose-500/20 dark:text-rose-300'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
            <span>{Math.abs(percentChange).toFixed(1)}%</span>
          </div>
        )}
      </div>

      {/* Sparkline & Subtitle */}
      <div className="mt-3 pt-2 border-t border-slate-800/40 dark:border-slate-800/60 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 dark:text-slate-400">
          vs período anterior
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
