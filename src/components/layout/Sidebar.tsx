import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { PlatformId } from '../../types/analytics';
import { BlackPantherIcon } from '../ui/BlackPantherIcon';
import { 
  LayoutDashboard, 
  Instagram, 
  AtSign, 
  Video, 
  Facebook, 
  Twitter, 
  Youtube, 
  Music, 
  ChevronLeft, 
  ChevronRight,
  Radio
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useDashboard();
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  const menuItems: { id: PlatformId; label: string; sub: string; icon: React.FC<{ className?: string }>; color: string; badge?: string }[] = [
    { id: 'overview', label: 'Vista Global', sub: 'Ecosistema Abel Pintos', icon: LayoutDashboard, color: 'text-gold-400' },
    { id: 'spotify', label: 'Spotify', sub: 'Abel Pintos (3.7M)', icon: Music, color: 'text-emerald-500' },
    { id: 'instagram', label: 'Instagram', sub: '@abelpintos (2.55M)', icon: Instagram, color: 'text-pink-500' },
    { id: 'youtube', label: 'YouTube', sub: '@AbelPintos (1.71M)', icon: Youtube, color: 'text-red-500' },
    { id: 'facebook', label: 'Facebook', sub: 'Abel Pintos (3.1M)', icon: Facebook, color: 'text-blue-500' },
    { id: 'twitter', label: 'X (Twitter)', sub: '@AbelPintos (1.7M)', icon: Twitter, color: 'text-sky-400' },
    { id: 'tiktok', label: 'TikTok', sub: '@abel.pintos.musica', icon: Video, color: 'text-cyan-400' },
    { id: 'threads', label: 'Threads', sub: '@abelpintos (420K)', icon: AtSign, color: 'text-slate-200' },
    { id: 'simulator', label: 'API Simulator', sub: 'Feeds oficiales', icon: BlackPantherIcon, color: 'text-gold-400', badge: 'LIVE' },
  ];

  return (
    <aside
      className={`glass-panel border-r border-gold-400/15 transition-all duration-300 flex flex-col z-30 sticky top-0 h-screen ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* App Header / Logo */}
      <div className="p-4 flex items-center justify-between border-b border-gold-400/15">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 p-1.5 border border-gold-400/50 shadow-lg shadow-gold-500/20 flex items-center justify-center">
              <BlackPantherIcon className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-slate-100 tracking-tight leading-none">
                Panter <span className="text-gold-400">Look</span>
              </h1>
              <span className="text-[10px] text-gold-400/90 font-bold tracking-wider uppercase">Ecosistema Digital</span>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 mx-auto rounded-xl bg-slate-950 p-1.5 border border-gold-400/50 flex items-center justify-center">
            <BlackPantherIcon className="w-7 h-7" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors hidden md:block"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-gold-400/70 uppercase tracking-widest px-3 mb-2">
          {!collapsed ? 'Canales Monitoreados' : '•'}
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gold-400/15 text-gold-300 border border-gold-400/30 shadow-md shadow-gold-500/10'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? item.color : 'text-slate-400 group-hover:' + item.color}`} />
              {!collapsed && (
                <div className="flex-1 text-left min-w-0">
                  <div className="truncate font-bold text-slate-200 group-hover:text-gold-300">{item.label}</div>
                  <div className="text-[10px] text-slate-400 truncate">{item.sub}</div>
                </div>
              )}
              {!collapsed && item.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30 animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Status */}
      <div className="p-3.5 border-t border-gold-400/15">
        {!collapsed ? (
          <div className="glass-panel p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-bold text-slate-300">Live Panter Intelligence</span>
            </div>
            <Radio className="w-3.5 h-3.5 text-gold-400" />
          </div>
        ) : (
          <div className="w-2.5 h-2.5 mx-auto rounded-full bg-emerald-500" />
        )}
      </div>
    </aside>
  );
};
