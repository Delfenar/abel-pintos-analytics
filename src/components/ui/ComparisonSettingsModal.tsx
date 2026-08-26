import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { CustomComparisonType, DisplayValueType } from '../../types/analytics';
import { ABEL_PINTOS_MILESTONES } from '../../services/mockDataService';
import { 
  X, 
  Settings, 
  Calendar, 
  Sliders, 
  Eye, 
  Check, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles,
  Pin,
  Flag,
  ArrowRightLeft
} from 'lucide-react';

interface ComparisonSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComparisonSettingsModal: React.FC<ComparisonSettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    customComparisonType,
    setCustomComparisonType,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    customCompStartDate,
    setCustomCompStartDate,
    customCompEndDate,
    setCustomCompEndDate,
    displayValueType,
    setDisplayValueType,
    customThresholds,
    setCustomThresholds,
    showMilestones,
    setShowMilestones,
    pinnedMetrics,
    togglePinnedMetric,
    setDateRange
  } = useDashboard();

  const [activeTab, setActiveTab] = useState<'dates' | 'display' | 'thresholds' | 'kpis'>('dates');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-gold w-full max-w-2xl rounded-3xl border border-gold-400/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-gold-400/20 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-100 tracking-tight">
                Personalizar Comparativa Temporal
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Configuración a medida para evaluar el rendimiento de Abel Pintos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/80 px-4 pt-2 gap-1 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('dates')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all ${
              activeTab === 'dates'
                ? 'bg-slate-900 text-gold-300 border-t-2 border-gold-400 border-x border-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            Fechas & Basal
          </button>
          <button
            onClick={() => setActiveTab('display')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all ${
              activeTab === 'display'
                ? 'bg-slate-900 text-gold-300 border-t-2 border-gold-400 border-x border-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            Absoluto vs Porcentual
          </button>
          <button
            onClick={() => setActiveTab('thresholds')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all ${
              activeTab === 'thresholds'
                ? 'bg-slate-900 text-gold-300 border-t-2 border-gold-400 border-x border-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Umbrales & Alertas
          </button>
          <button
            onClick={() => setActiveTab('kpis')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all ${
              activeTab === 'kpis'
                ? 'bg-slate-900 text-gold-300 border-t-2 border-gold-400 border-x border-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Pin className="w-4 h-4 text-emerald-400" />
            KPIs & Hitos
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* TAB 1: Fechas & Basal */}
          {activeTab === 'dates' && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
                  1. Rango de Fechas Principal
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold block mb-1">Fecha de Inicio</span>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => {
                        setCustomStartDate(e.target.value);
                        setDateRange('custom');
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold block mb-1">Fecha de Fin</span>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => {
                        setCustomEndDate(e.target.value);
                        setDateRange('custom');
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-3">
                  2. Criterio de Comparación Secundaria (Basal)
                </label>
                <div className="space-y-2.5">
                  <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    customComparisonType === 'previous_period'
                      ? 'border-gold-400 bg-gold-400/10'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}>
                    <input
                      type="radio"
                      name="compType"
                      checked={customComparisonType === 'previous_period'}
                      onChange={() => setCustomComparisonType('previous_period')}
                      className="mt-0.5 accent-gold-400"
                    />
                    <div>
                      <span className="font-bold text-slate-100 block">Periodo Inmediatamente Anterior</span>
                      <span className="text-[11px] text-slate-400">Compara contra la misma cantidad de días inmediatamente hacia atrás.</span>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    customComparisonType === 'year_ago'
                      ? 'border-gold-400 bg-gold-400/10'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}>
                    <input
                      type="radio"
                      name="compType"
                      checked={customComparisonType === 'year_ago'}
                      onChange={() => setCustomComparisonType('year_ago')}
                      className="mt-0.5 accent-gold-400"
                    />
                    <div>
                      <span className="font-bold text-slate-100 block">Mismo Periodo del Año Anterior (YoY)</span>
                      <span className="text-[11px] text-slate-400">Mismos días exactos del año pasado (ideal para medir impacto de giras).</span>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    customComparisonType === 'custom_range'
                      ? 'border-gold-400 bg-gold-400/10'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}>
                    <input
                      type="radio"
                      name="compType"
                      checked={customComparisonType === 'custom_range'}
                      onChange={() => setCustomComparisonType('custom_range')}
                      className="mt-0.5 accent-gold-400"
                    />
                    <div>
                      <span className="font-bold text-slate-100 block">Rango Personalizado Secundario</span>
                      <span className="text-[11px] text-slate-400">Elegir manualmente las fechas exactas del periodo base.</span>
                    </div>
                  </label>
                </div>

                {customComparisonType === 'custom_range' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 p-3 rounded-2xl bg-slate-900/90 border border-gold-400/30">
                    <div>
                      <span className="text-[10px] text-gold-400 font-semibold block mb-1">Inicio Comparación</span>
                      <input
                        type="date"
                        value={customCompStartDate}
                        onChange={(e) => setCustomCompStartDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gold-400 font-semibold block mb-1">Fin Comparación</span>
                      <input
                        type="date"
                        value={customCompEndDate}
                        onChange={(e) => setCustomCompEndDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Modo de Deltas */}
          {activeTab === 'display' && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
                  Formato de Variación en Tarjetas de KPI ($\Delta$)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setDisplayValueType('percentage')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      displayValueType === 'percentage'
                        ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-extrabold text-slate-100 text-sm mb-1 flex items-center justify-between">
                      <span>Deltas Porcentuales</span>
                      <span className="text-amber-400 font-mono font-bold">+12.5%</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Muestra el incremento o caída relativa en porcentaje respecto al periodo base.</p>
                  </button>

                  <button
                    onClick={() => setDisplayValueType('absolute')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      displayValueType === 'absolute'
                        ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-extrabold text-slate-100 text-sm mb-1 flex items-center justify-between">
                      <span>Deltas Absolutos</span>
                      <span className="text-amber-400 font-mono font-bold">+150.0K</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Muestra la diferencia neta en número de streams, vistas o seguidores.</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Umbrales & Alertas */}
          {activeTab === 'thresholds' && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
                  Reglas de Sensibilidad & Umbrales de Alerta
                </label>
                <p className="text-[11px] text-slate-400 mb-4">
                  Configura qué nivel de variación se requiere para marcar una métrica en Verde ($\uparrow$) o Rojo ($\downarrow$).
                </p>

                <div className="space-y-4">
                  {/* Positive Threshold */}
                  <div className="glass-panel p-4 rounded-2xl border-emerald-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4" />
                        Umbral Mínimo Verde (Crecimiento Destacado)
                      </span>
                      <span className="font-extrabold text-emerald-400 font-mono text-sm">
                        +{customThresholds.positiveThreshold}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={customThresholds.positiveThreshold}
                      onChange={(e) => setCustomThresholds({
                        ...customThresholds,
                        positiveThreshold: Number(e.target.value)
                      })}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Las subidas menores a +{customThresholds.positiveThreshold}% no se marcarán en verde como crecimiento extraordinario.
                    </span>
                  </div>

                  {/* Negative Threshold */}
                  <div className="glass-panel p-4 rounded-2xl border-rose-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        Umbral Alerta Roja (Caída Crítica)
                      </span>
                      <span className="font-extrabold text-rose-400 font-mono text-sm">
                        {customThresholds.negativeThreshold}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-30"
                      max="-1"
                      step="1"
                      value={customThresholds.negativeThreshold}
                      onChange={(e) => setCustomThresholds({
                        ...customThresholds,
                        negativeThreshold: Number(e.target.value)
                      })}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Solo las caídas superiores a {customThresholds.negativeThreshold}% activarán alerta roja.
                    </span>
                  </div>

                  {/* Ignore Noise */}
                  <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customThresholds.ignoreNoise}
                      onChange={(e) => setCustomThresholds({
                        ...customThresholds,
                        ignoreNoise: e.target.checked
                      })}
                      className="accent-gold-400 w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-slate-200 block">Ignorar ruido de fondo (Fluctuaciones menores)</span>
                      <span className="text-[10px] text-slate-400">Mostrar fluctuaciones intermedias como estables ($\rightarrow$).</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KPIs Prioritarios & Hitos */}
          {activeTab === 'kpis' && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-2">
                  Superposición de Hitos de Campaña en Gráficos
                </label>
                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900 border border-gold-400/30 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={showMilestones}
                    onChange={(e) => setShowMilestones(e.target.checked)}
                    className="accent-gold-400 w-4 h-4"
                  />
                  <div>
                    <span className="font-bold text-gold-300 block flex items-center gap-1.5">
                      <Flag className="w-4 h-4 text-gold-400" />
                      Mostrar Marcadore de Hitos (Lanzamientos & Conciertos)
                    </span>
                    <span className="text-[10px] text-slate-400">Superpone eventos como apertura de entradas, lanzamientos de sencillos y libro en la línea temporal.</span>
                  </div>
                </label>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Hitos Registrados para Abel Pintos:</span>
                  {ABEL_PINTOS_MILESTONES.map((m) => (
                    <div key={m.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                        <span className="font-bold text-slate-200">{m.title}</span>
                      </div>
                      <span className="text-[10px] text-gold-400 font-mono">{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gold-400/20 bg-slate-900/90 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium">Preferencias aplicadas automáticamente</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-gold-500/20 hover:from-gold-300 hover:to-amber-400 transition-all cursor-pointer"
          >
            Guardar & Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
