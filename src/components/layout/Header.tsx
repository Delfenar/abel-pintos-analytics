import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { DateRangeKey, PlatformId, ComparisonMode, CampaignId } from '../../types/analytics';
import { CAMPAIGNS } from '../../services/mockDataService';
import { ComparisonSettingsModal } from '../ui/ComparisonSettingsModal';
import { 
  Calendar, 
  RefreshCw, 
  Sun, 
  Moon, 
  Download, 
  Search, 
  Layers,
  Sparkles,
  ArrowRightLeft,
  Settings,
  Percent,
  Hash
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    dateRange,
    setDateRange,
    comparisonMode,
    setComparisonMode,
    activeCampaign,
    setActiveCampaign,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    displayValueType,
    setDisplayValueType,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    isDarkMode,
    toggleDarkMode,
    refreshData,
    isRefreshing,
    searchQuery,
    setSearchQuery,
  } = useDashboard();

  const handleExportCSV = () => {
    alert('Exportando reporte oficial de métricas de Abel Pintos en CSV...');
  };

  const viewsTitleMap: Record<PlatformId, string> = {
    overview: 'Panel Ejecutivo Consolidado',
    spotify: 'Spotify — Abel Pintos Oficial',
    instagram: 'Instagram — @abelpintos',
    youtube: 'YouTube — @AbelPintos',
    facebook: 'Facebook — Abel Pintos Oficial',
    twitter: 'X (Twitter) — @AbelPintos',
    tiktok: 'TikTok — @abel.pintos.musica',
    threads: 'Threads — @abelpintos',
    simulator: 'Servidor de Ingesta & API Feeds',
  };

  return (
    <>
      <header className="glass-panel border-b border-gold-400/20 sticky top-0 z-20 px-6 py-3.5 transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Title & Artist Profile Badge */}
          <div className="flex items-center gap-4">
            <div className="relative group shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gold-400 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-gold-500/20">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-black text-gold-400 text-lg border border-gold-400/40">
                  AP
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950" title="Perfil Verificado Oficial" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-100 tracking-tight">
                  Abel Pintos
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-400 border border-gold-400/30">
                  ARTISTA OFICIAL
                </span>
              </div>
              <p className="text-xs text-gold-300/80 font-medium">
                {viewsTitleMap[activeView]}
              </p>
            </div>
          </div>

          {/* Center Search */}
          <div className="relative hidden xl:block w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar canción..."
              className="w-full bg-slate-900/80 border border-gold-400/20 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>

          {/* Controls & Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Campaign Selector Filter */}
            <div className="flex items-center bg-slate-900/90 border border-gold-400/30 rounded-xl p-1 text-xs">
              <Layers className="w-3.5 h-3.5 text-gold-400 ml-2 mr-1" />
              <select
                value={activeCampaign}
                onChange={(e) => setActiveCampaign(e.target.value as CampaignId)}
                className="bg-transparent text-gold-300 font-bold focus:outline-none pr-2 cursor-pointer"
              >
                {CAMPAIGNS.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-950 text-slate-200">
                    🎯 {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Temporal Comparison Selector (WoW, MoM, YoY) */}
            <div className="flex items-center bg-slate-900/90 border border-gold-400/40 rounded-xl p-1 text-xs shadow-sm">
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400 ml-2 mr-1" />
              <div className="flex items-center gap-1">
                {([
                  { key: 'wow', label: 'WoW', title: 'Semana a Semana (7d vs prior 7d)' },
                  { key: 'mom', label: 'MoM', title: 'Mes a Mes (30d vs prior 30d)' },
                  { key: 'yoy', label: 'YoY', title: 'Año a Año (Mismo periodo año anterior)' }
                ] as { key: ComparisonMode; label: string; title: string }[]).map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => setComparisonMode(mode.key)}
                    title={mode.title}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      comparisonMode === mode.key
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Absolute vs Percentage Display Switch */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setDisplayValueType('percentage')}
                className={`p-1.5 rounded-lg transition-all ${
                  displayValueType === 'percentage' ? 'bg-gold-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Mostrar variaciones en porcentaje (%)"
              >
                <Percent className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDisplayValueType('absolute')}
                className={`p-1.5 rounded-lg transition-all ${
                  displayValueType === 'absolute' ? 'bg-gold-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Mostrar variaciones en números absolutos (ΔN)"
              >
                <Hash className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Advanced Personalization Button */}
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-gold-400/50 hover:border-gold-400 text-gold-300 font-bold text-xs shadow-sm transition-all cursor-pointer"
              title="Abrir panel de personalización comparativa"
            >
              <Settings className="w-3.5 h-3.5 text-gold-400" />
              <span>Personalizar</span>
            </button>

            {/* Date Selector */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
              <Calendar className="w-3.5 h-3.5 text-gold-400 ml-2 mr-1" />
              <div className="flex items-center gap-1">
                {(['7d', '28d', '90d', '1y', 'custom'] as DateRangeKey[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setDateRange(r)}
                    className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                      dateRange === r
                        ? 'bg-gold-400 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {r === '7d' ? '7D' : r === '28d' ? '28D' : r === '90d' ? '90D' : r === '1y' ? '1A' : 'Pers.'}
                  </button>
                ))}
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-gold-400 hover:border-gold-400/40 transition-all cursor-pointer"
              title="Refrescar métricas"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-gold-400' : ''}`} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-400 transition-all cursor-pointer"
              title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Export Report */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-gold-500/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Render Personalization Modal */}
      <ComparisonSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  );
};
