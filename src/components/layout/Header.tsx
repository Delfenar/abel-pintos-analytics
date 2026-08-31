import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { DateRangeKey, PlatformId, ComparisonMode, CampaignId } from '../../types/analytics';
import { ComparisonSettingsModal } from '../ui/ComparisonSettingsModal';
import { CampaignModal } from '../ui/CampaignModal';
import { GlobalSearch } from '../ui/GlobalSearch';
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
  Hash,
  PlusCircle,
  Filter,
  Cloud,
  Loader2
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
    campaigns,
    campaignSearchQuery,
    setCampaignSearchQuery,
    isCampaignModalOpen,
    setIsCampaignModalOpen,
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
    isSyncingSheets,
    syncWithGoogleSheets,
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

  const filteredCampaigns = campaigns.filter((c) => {
    if (!campaignSearchQuery.trim()) return true;
    const q = campaignSearchQuery.toLowerCase();
    const typeLabel = c.type === 'tour' ? 'gira show' : c.type === 'release' ? 'lanzamiento música' : c.type === 'merch' ? 'merchandising libro' : 'prensa';
    return (
      c.label.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.year.toString().includes(q) ||
      (c.city && c.city.toLowerCase().includes(q)) ||
      typeLabel.includes(q)
    );
  });

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

          {/* Center Global Smart Search */}
          <div className="w-full lg:max-w-xs xl:max-w-md">
            <GlobalSearch />
          </div>

          {/* Controls & Campaign Management System */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Dynamic Campaign Search & Selector Box */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-gold-400/30 rounded-xl p-1 text-xs">
              <div className="relative flex items-center">
                <Filter className="w-3.5 h-3.5 text-gold-400 ml-2 mr-1 shrink-0" />
                <input
                  type="text"
                  value={campaignSearchQuery}
                  onChange={(e) => setCampaignSearchQuery(e.target.value)}
                  placeholder="Buscar campaña..."
                  className="w-28 bg-transparent text-slate-200 focus:outline-none text-[11px] placeholder:text-slate-500"
                />
              </div>

              <select
                value={activeCampaign}
                onChange={(e) => setActiveCampaign(e.target.value as CampaignId)}
                className="bg-transparent text-gold-300 font-bold focus:outline-none pr-2 cursor-pointer max-w-[180px] truncate"
              >
                {filteredCampaigns.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-950 text-slate-200">
                    🎯 {c.label} {c.year ? `(${c.year})` : ''}
                  </option>
                ))}
                {filteredCampaigns.length === 0 && (
                  <option value="" disabled className="bg-slate-950 text-slate-400">
                    Sin resultados
                  </option>
                )}
              </select>
            </div>

            {/* + Nueva Campaña Button */}
            <button
              onClick={() => setIsCampaignModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-gold-400 hover:from-amber-400 hover:to-gold-300 text-slate-950 font-black text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer shrink-0"
              title="Cargar nueva iniciativa de campaña"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>+ Campaña</span>
            </button>

            {/* Google Sheets Sync Webhook Button */}
            <button
              onClick={syncWithGoogleSheets}
              disabled={isSyncingSheets}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 font-bold text-xs transition-all shadow-sm cursor-pointer shrink-0"
              title="Sincronizar métricas con la hoja maestra de Google Sheets en la nube"
            >
              {isSyncingSheets ? (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              ) : (
                <Cloud className="w-4 h-4 text-emerald-400" />
              )}
              <span>Sincronizar con Google Sheets</span>
            </button>

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

      {/* Modals */}
      <ComparisonSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      <CampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
      />
    </>
  );
};
