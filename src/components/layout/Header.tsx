import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { DateRangeKey, PlatformId, CampaignId } from '../../types/analytics';
import { CAMPAIGNS } from '../../services/mockDataService';
import { 
  Calendar, 
  RefreshCw, 
  Sun, 
  Moon, 
  Download, 
  Search, 
  Filter,
  Layers,
  Sparkles,
  Music2,
  Users
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    dateRange,
    setDateRange,
    activeCampaign,
    setActiveCampaign,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    isDarkMode,
    toggleDarkMode,
    refreshData,
    isRefreshing,
    searchQuery,
    setSearchQuery,
    globalOverview
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
    <header className="glass-panel border-b border-amber-500/20 sticky top-0 z-20 px-6 py-3.5 transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Title & Artist Profile Badge */}
        <div className="flex items-center gap-4">
          {/* Artist Avatar Circle */}
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
        <div className="relative hidden xl:block w-56">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar canción, show o post..."
            className="w-full bg-slate-900/80 border border-gold-400/20 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-gold-400 transition-colors"
          />
        </div>

        {/* Controls & Filters */}
        <div className="flex flex-wrap items-center gap-3">
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

          {/* Date Selector */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
            <Calendar className="w-3.5 h-3.5 text-gold-400 ml-2 mr-1" />
            <div className="flex items-center gap-1">
              {(['7d', '28d', '90d', 'custom'] as DateRangeKey[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    dateRange === r
                      ? 'bg-gold-400 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {r === '7d' ? '7D' : r === '28d' ? '28D' : r === '90d' ? '90D' : 'Pers.'}
                </button>
              ))}
            </div>
          </div>

          {dateRange === 'custom' && (
            <div className="flex items-center gap-1.5 text-xs bg-slate-900/80 border border-slate-800 rounded-xl px-2 py-1">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none"
              />
              <span className="text-slate-500">-</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none"
              />
            </div>
          )}

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
  );
};
