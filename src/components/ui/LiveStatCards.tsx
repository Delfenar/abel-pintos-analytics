import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Users, 
  Music, 
  Youtube, 
  Instagram, 
  TrendingUp, 
  Flame, 
  Sparkles, 
  Eye, 
  Heart, 
  Share2, 
  Radio, 
  Twitter, 
  Facebook, 
  Video, 
  AtSign,
  Award
} from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

export const LiveStatCards: React.FC = () => {
  const { filteredPlatformDataMap, filteredOverview } = useDashboard();

  return (
    <div className="space-y-4">
      {/* 4 Main Hero Live Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Accumulated Community */}
        <div className="glass-panel p-5 rounded-3xl border border-gold-400/30 bg-gradient-to-b from-slate-900/90 to-slate-950 relative overflow-hidden group hover:border-gold-400/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-400">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 flex items-center gap-1">
              <BlackPantherIcon size={12} />
              TOTAL CONSOLIDADO
            </span>
          </div>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Audiencia Total Acumulada
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight my-1">
            17.4M+
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +2.4% este mes
            </span>
            <span className="text-[11px] text-slate-500">7 Plataformas</span>
          </div>
        </div>

        {/* 2. Spotify Live */}
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 relative overflow-hidden group hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Music className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              SPOTIFY
            </span>
          </div>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Spotify Artista Oficial
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight my-1">
            4.42M
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="text-gold-400 font-semibold flex items-center gap-1">
              🎵 Top Track: <strong className="text-slate-200">Oncemil</strong>
            </span>
            <span className="text-[11px] text-slate-500">Oyentes Mensuales</span>
          </div>
        </div>

        {/* 3. YouTube Live */}
        <div className="glass-panel p-5 rounded-3xl border border-red-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 relative overflow-hidden group hover:border-red-500/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
              <Youtube className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
              YOUTUBE
            </span>
          </div>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            YouTube Canal Oficial
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight my-1">
            1.71M
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +185K views 24h
            </span>
            <span className="text-[11px] text-slate-500">Suscriptores</span>
          </div>
        </div>

        {/* 4. Instagram Live */}
        <div className="glass-panel p-5 rounded-3xl border border-pink-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 relative overflow-hidden group hover:border-pink-500/60 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400">
              <Instagram className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
              INSTAGRAM
            </span>
          </div>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Instagram (@abelpintos)
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight my-1">
            2.55M
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="text-pink-400 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              ER hoy: 4.8%
            </span>
            <span className="text-[11px] text-slate-500">Seguidores</span>
          </div>
        </div>
      </div>

      {/* Compact Cards: TikTok, Facebook, X, Threads Live Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* TikTok */}
        <div className="p-3.5 rounded-2xl bg-slate-900/85 border border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">TikTok</div>
              <div className="text-sm font-black text-slate-100 font-mono">850K fans</div>
            </div>
          </div>
          <div className="text-right text-[11px] font-bold text-cyan-400 font-mono">
            +112K views hoy
          </div>
        </div>

        {/* Facebook */}
        <div className="p-3.5 rounded-2xl bg-slate-900/85 border border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Facebook className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Facebook</div>
              <div className="text-sm font-black text-slate-100 font-mono">3.1M fans</div>
            </div>
          </div>
          <div className="text-right text-[11px] font-bold text-blue-400 font-mono">
            +48K alcance hoy
          </div>
        </div>

        {/* X (Twitter) */}
        <div className="p-3.5 rounded-2xl bg-slate-900/85 border border-sky-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Twitter className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">X (Twitter)</div>
              <div className="text-sm font-black text-slate-100 font-mono">1.7M fans</div>
            </div>
          </div>
          <div className="text-right text-[11px] font-bold text-sky-400 font-mono">
            +34K impr. hoy
          </div>
        </div>

        {/* Threads */}
        <div className="p-3.5 rounded-2xl bg-slate-900/85 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800 text-slate-200">
              <AtSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Threads</div>
              <div className="text-sm font-black text-slate-100 font-mono">420K fans</div>
            </div>
          </div>
          <div className="text-right text-[11px] font-bold text-gold-400 font-mono">
            +18K resp. hoy
          </div>
        </div>
      </div>
    </div>
  );
};
