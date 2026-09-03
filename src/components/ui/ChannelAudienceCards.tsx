import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { PlatformName } from '../../services/searchEngineService';
import { ChannelAudienceMetric } from '../../services/googleSheetsService';
import { Eye, Heart, Share2, UserPlus, Sparkles, TrendingUp, Music, Youtube, Instagram, Video, Facebook, Twitter, AtSign } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

interface ChannelAudienceCardsProps {
  platform?: PlatformName;
  title?: string;
  subtitle?: string;
}

export const ChannelAudienceCards: React.FC<ChannelAudienceCardsProps> = ({ 
  platform,
  title = "Métricas Globales de Canal — Audiencia General",
  subtitle = "Datos consolidados de perfil leídos en tiempo real desde Google Sheets"
}) => {
  const { channelAudienceMetrics, liveSheetsRecords } = useDashboard();

  const platformIcons: Record<PlatformName, React.ReactNode> = {
    Spotify: <Music className="w-5 h-5 text-emerald-400" />,
    YouTube: <Youtube className="w-5 h-5 text-red-500" />,
    Instagram: <Instagram className="w-5 h-5 text-pink-400" />,
    TikTok: <Video className="w-5 h-5 text-cyan-400" />,
    Facebook: <Facebook className="w-5 h-5 text-blue-400" />,
    X: <Twitter className="w-5 h-5 text-sky-400" />,
    Threads: <AtSign className="w-5 h-5 text-slate-200" />,
  };

  const platformColors: Record<PlatformName, string> = {
    Spotify: 'border-emerald-500/30 text-emerald-400',
    YouTube: 'border-red-500/30 text-red-400',
    Instagram: 'border-pink-500/30 text-pink-400',
    TikTok: 'border-cyan-500/30 text-cyan-400',
    Facebook: 'border-blue-500/30 text-blue-400',
    X: 'border-sky-500/30 text-sky-400',
    Threads: 'border-slate-500/30 text-slate-300',
  };

  // If specific platform is requested, show 4 detailed KPI blocks for that platform
  if (platform) {
    const data: ChannelAudienceMetric = channelAudienceMetrics[platform] || {
      platform,
      visualizaciones: 0,
      interacciones: 0,
      contenidosCompartidos: 0,
      nuevosSeguidores: 0,
      totalSeguidores: 0,
      publicacionesCount: 0,
      fechaActualizacion: '2026-08-31'
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl bg-slate-900 border ${platformColors[platform]}`}>
              {platformIcons[platform]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-100 flex items-center gap-2">
                  <span>{title} ({platform})</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Snapshot Vigente
                </span>
                {data.fechaActualizacion && (
                  <span className="text-[11px] text-slate-400 font-mono">
                    al {data.fechaActualizacion}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 font-mono text-slate-200">
              {data.totalSeguidores ? `${(data.totalSeguidores / 1000000).toFixed(2)}M seguidores` : 'Perfil Oficial'}
            </span>
            <span>•</span>
            <span>{data.publicacionesCount} posts indexados</span>
          </div>
        </div>

        {/* 4 Core Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Visualizaciones Totales del Perfil */}
          <div className="glass-panel p-5 rounded-3xl border border-gold-400/30 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-extrabold text-gold-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Eye className="w-4 h-4 text-gold-400" />
                {platform === 'Spotify' ? 'Oyentes Mensuales' : 'Visualizaciones Totales'}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
                {platform === 'Spotify' && data.oyentesMensuales 
                  ? data.oyentesMensuales.toLocaleString()
                  : data.visualizaciones.toLocaleString()}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-semibold mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>{platform === 'Spotify' ? 'Audiencia Mensual Activa' : 'Reproducciones / Views'}</span>
              <span className="text-gold-400 font-bold">100% Real</span>
            </div>
          </div>

          {/* 2. Interacciones Globales */}
          <div className="glass-panel p-5 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-extrabold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Heart className="w-4 h-4 text-rose-400" />
                Interacciones Globales
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
                {data.interacciones.toLocaleString()}
              </div>
            </div>
            <div className="text-[11px] text-rose-300 font-semibold mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>Likes, comments & replies</span>
              <span className="text-emerald-400 font-bold">Activo</span>
            </div>
          </div>

          {/* 3. Contenidos Compartidos (Shares) */}
          <div className="glass-panel p-5 rounded-3xl border border-sky-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-extrabold text-sky-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Share2 className="w-4 h-4 text-sky-400" />
                Contenidos Compartidos
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
                {data.contenidosCompartidos.toLocaleString()}
              </div>
            </div>
            <div className="text-[11px] text-sky-300 font-semibold mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>Shares & Reposts</span>
              <span className="text-sky-400 font-bold">Difusión</span>
            </div>
          </div>

          {/* 4. Nuevos Seguidores ganados */}
          <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <UserPlus className="w-4 h-4 text-emerald-400" />
                {platform === 'YouTube' ? 'Suscriptores del Canal' : 'Nuevos Seguidores'}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight">
                {platform === 'YouTube' && data.suscriptores
                  ? data.suscriptores.toLocaleString()
                  : `+${data.nuevosSeguidores.toLocaleString()}`}
              </div>
            </div>
            <div className="text-[11px] text-emerald-300 font-semibold mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>{platform === 'YouTube' ? 'Comunidad YouTube' : 'Crecimiento de Audiencia'}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +Neto
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Multiplatform Overview Grid (Instagram, TikTok, Facebook, YouTube, Spotify, X)
  const platformsToShow: PlatformName[] = ['Instagram', 'TikTok', 'Facebook', 'YouTube', 'Spotify', 'X'];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <BlackPantherIcon size={20} />
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-100 flex items-center gap-2">
              <span>{title}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-400/10 text-gold-300 text-[10px] font-bold border border-gold-400/20">
                Solapa Audiencia_General
              </span>
            </h3>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platformsToShow.map((plat) => {
          const item = channelAudienceMetrics[plat] || {
            platform: plat,
            visualizaciones: 0,
            interacciones: 0,
            contenidosCompartidos: 0,
            nuevosSeguidores: 0,
            totalSeguidores: 0,
            publicacionesCount: 0
          };

          return (
            <div 
              key={plat}
              className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-gold-400/40 bg-slate-900/90 transition-all space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-xl bg-slate-950 ${platformColors[plat]}`}>
                    {platformIcons[plat]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{plat}</h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <span>{item.publicacionesCount} posts</span>
                      {item.fechaActualizacion && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400 font-mono">al {item.fechaActualizacion}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                  {item.totalSeguidores ? `${(item.totalSeguidores / 1000000).toFixed(2)}M fans` : 'Oficial'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[10px] font-semibold text-gold-400 uppercase block">
                    Visualizaciones
                  </span>
                  <span className="text-sm font-black text-slate-100 font-mono block mt-0.5">
                    {item.visualizaciones.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[10px] font-semibold text-rose-400 uppercase block">
                    Interacciones
                  </span>
                  <span className="text-sm font-black text-slate-100 font-mono block mt-0.5">
                    {item.interacciones.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[10px] font-semibold text-sky-400 uppercase block">
                    Compartidos
                  </span>
                  <span className="text-sm font-black text-slate-100 font-mono block mt-0.5">
                    {item.contenidosCompartidos.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase block">
                    +Seguidores
                  </span>
                  <span className="text-sm font-black text-emerald-400 font-mono block mt-0.5">
                    +{item.nuevosSeguidores.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
