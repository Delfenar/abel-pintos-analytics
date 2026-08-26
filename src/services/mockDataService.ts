import { PlatformData, GlobalOverviewData, DateRangeKey, CampaignId, CampaignFilter, TimeSeriesPoint, ContentItem, ApiPayloadSample } from '../types/analytics';

export const CAMPAIGNS: CampaignFilter[] = [
  { id: 'all', label: 'Todas las Campañas', description: 'Visión consolidada de todo el ecosistema digital', badge: 'GLOBAL' },
  { id: 'tour30', label: 'Gira 30 Aniversario / Shows BA & Rosario', description: 'Promoción de conciertos masivos y venta de tickets', badge: 'SHOWS' },
  { id: 'album', label: 'Lanzamiento de Álbum & Singles', description: 'Promoción de nuevos sencillos y reproducción en streaming', badge: 'MÚSICA' },
  { id: 'book', label: 'Libro Conmemorativo', description: 'Lanzamiento editorial conmemorativo y firma de ejemplares', badge: 'LIBRO' },
];

const getMultiplier = (range: DateRangeKey): number => {
  switch (range) {
    case '7d': return 1;
    case '28d': return 3.8;
    case '90d': return 11.5;
    case 'custom': return 2.5;
    default: return 1;
  }
};

const getCampaignMultiplier = (campaign: CampaignId): number => {
  switch (campaign) {
    case 'all': return 1.0;
    case 'tour30': return 0.48; // Shows campaign represents ~48% of total current reach
    case 'album': return 0.35;  // Album campaign represents ~35% of reach
    case 'book': return 0.17;   // Book campaign represents ~17% of reach
    default: return 1.0;
  }
};

const getDaysCount = (range: DateRangeKey): number => {
  switch (range) {
    case '7d': return 7;
    case '28d': return 28;
    case '90d': return 30;
    case 'custom': return 14;
    default: return 7;
  }
};

const generateDates = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date(2026, 7, 26);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' }));
  }
  return dates;
};

export const getMockPlatformData = (range: DateRangeKey, campaign: CampaignId = 'all'): Record<string, PlatformData> => {
  const timeMult = getMultiplier(range);
  const campMult = getCampaignMultiplier(campaign);
  const mult = timeMult * campMult;
  const days = getDaysCount(range);
  const dateLabels = generateDates(days);

  // --- 1. SPOTIFY (Abel Pintos — ~4.4M oyentes mensuales, ~3.8M seguidores) ---
  const spListeners = Math.round(4420000 * (campaign === 'all' ? 1 : (0.7 + campMult * 0.3)));
  const spPrevListeners = Math.round(4180000 * (campaign === 'all' ? 1 : (0.7 + campMult * 0.3)));
  const spStreams = Math.round(18500000 * mult);
  const spPrevStreams = Math.round(16200000 * mult);
  const spLibrarySaves = Math.round(1920000 * mult);
  const spPrevLibrarySaves = Math.round(1650000 * mult);
  const spPlaylistAdds = Math.round(840000 * mult);
  const spPrevPlaylistAdds = Math.round(710000 * mult);
  const spFollowers = 3840000;
  const spPrevFollowers = 3760000;

  const spListenerToFollower = Number((((spFollowers - spPrevFollowers) / (spListeners * 0.2)) * 100).toFixed(2));
  const spSavesToStreamRatio = Number(((spLibrarySaves / spStreams) * 100).toFixed(2));
  const spStreamsPerListener = Number((spStreams / spListeners).toFixed(2));

  const spotifyTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 250000 * (1 + Math.cos(i * 0.4) * 0.2) * mult;
    return {
      date,
      Streams: Math.round(base * 2.8),
      'Oyentes Únicos': Math.round(base * 0.85),
      'Guardados Biblioteca': Math.round(base * 0.32),
      'Playlist Adds': Math.round(base * 0.14),
    };
  });

  const spotifyData: PlatformData = {
    id: 'spotify',
    name: 'Spotify Artista Oficial',
    handle: 'Abel Pintos',
    officialAudience: '4.4M Oyentes Mensuales',
    iconName: 'Music',
    brandColor: '#1DB954',
    metrics: {
      listeners: { id: 'listeners', label: 'Oyentes Mensuales (Spotify)', value: spListeners, previousValue: spPrevListeners, sparkline: [4.1, 4.18, 4.25, 4.31, 4.36, 4.40, 4.42] },
      streams: { id: 'streams', label: 'Streams Totales', value: spStreams, previousValue: spPrevStreams, sparkline: [15.2, 16.0, 16.8, 17.4, 17.9, 18.2, 18.5] },
      librarySaves: { id: 'librarySaves', label: 'Guardados en Biblioteca', value: spLibrarySaves, previousValue: spPrevLibrarySaves, sparkline: [1.5, 1.6, 1.68, 1.75, 1.82, 1.88, 1.92] },
      playlistAdds: { id: 'playlistAdds', label: 'Adiciones a Playlists', value: spPlaylistAdds, previousValue: spPrevPlaylistAdds, sparkline: [680, 710, 740, 770, 800, 820, 840] },
      followers: { id: 'followers', label: 'Seguidores Spotify', value: spFollowers, previousValue: spPrevFollowers, sparkline: [3.76, 3.78, 3.79, 3.81, 3.82, 3.83, 3.84] },
    },
    kpis: {
      listenerToFollower: {
        id: 'listenerToFollower',
        label: 'Conversión Oyente a Seguidor',
        value: spListenerToFollower,
        previousValue: 8.2,
        unit: '%',
        target: 8.0,
        description: 'Porcentaje de oyentes únicos que decidieron seguir la página oficial de Abel Pintos.',
        status: 'excellent'
      },
      savesToStream: {
        id: 'savesToStream',
        label: 'Ratio Guardados / Stream',
        value: spSavesToStreamRatio,
        previousValue: 10.18,
        unit: '%',
        target: 10.0,
        description: 'Tasa de recurrencia y guardado de canciones principales (Oncemil, Motivos, Sin Principio Ni Final).',
        status: 'excellent'
      },
      streamsPerListener: {
        id: 'streamsPerListener',
        label: 'Escuchas por Oyente Único',
        value: spStreamsPerListener,
        previousValue: 4.02,
        unit: 'streams',
        target: 4.0,
        description: 'Frecuencia media de reproducción por cada fan único en Spotify.',
        status: 'good'
      }
    },
    timeSeries: spotifyTimeSeries,
    contentDistribution: [
      { name: 'Oncemil (Single Exitoso)', value: 28, color: '#D4AF37' },
      { name: 'Motivos (En Vivo / Estudio)', value: 22, color: '#C5A059' },
      { name: 'Sin Principio Ni Final', value: 20, color: '#1DB954' },
      { name: 'Piedra Libre & La Llave', value: 18, color: '#1AA34A' },
      { name: 'Alta en el Cielo & Otros', value: 12, color: '#14833B' }
    ],
    topContent: [
      { id: 'sp-1', platform: 'spotify', title: 'Oncemil', type: 'Single Principal', campaignId: 'album', publishedAt: 'Top 1 Spotify AR', metrics: { viewsOrReach: Math.round(6200000 * mult), interactions: Math.round(720000 * mult), engagementRate: 14.8, saves: Math.round(540000 * mult) } },
      { id: 'sp-2', platform: 'spotify', title: 'Motivos', type: 'Track Clásico', campaignId: 'tour30', publishedAt: 'Populares', metrics: { viewsOrReach: Math.round(4800000 * mult), interactions: Math.round(580000 * mult), engagementRate: 13.9, saves: Math.round(410000 * mult) } },
      { id: 'sp-3', platform: 'spotify', title: 'Sin Principio Ni Final', type: 'Balada Icónica', campaignId: 'album', publishedAt: 'Populares', metrics: { viewsOrReach: Math.round(4100000 * mult), interactions: Math.round(490000 * mult), engagementRate: 13.2, saves: Math.round(380000 * mult) } },
      { id: 'sp-4', platform: 'spotify', title: 'Piedra Libre', type: 'Single', campaignId: 'album', publishedAt: 'Éxitos', metrics: { viewsOrReach: Math.round(3400000 * mult), interactions: Math.round(390000 * mult), engagementRate: 12.5, saves: Math.round(290000 * mult) } },
      { id: 'sp-5', platform: 'spotify', title: 'Alta en el Cielo', type: 'Álbum Patrio', campaignId: 'album', publishedAt: 'Edición Especial', metrics: { viewsOrReach: Math.round(2900000 * mult), interactions: Math.round(340000 * mult), engagementRate: 12.0, saves: Math.round(240000 * mult) } }
    ]
  };

  // --- 2. INSTAGRAM (@abelpintos — ~2.55M seguidores) ---
  const instaReach = Math.round(6800000 * mult);
  const instaPrevReach = Math.round(5900000 * mult);
  const instaImpressions = Math.round(14200000 * mult);
  const instaPrevImpressions = Math.round(12400000 * mult);
  const instaLikes = Math.round(890000 * mult);
  const instaComments = Math.round(112000 * mult);
  const instaSaves = Math.round(340000 * mult);
  const instaShares = Math.round(280000 * mult);
  const instaInteractions = instaLikes + instaComments + instaSaves + instaShares;
  const instaPrevInteractions = Math.round(1410000 * mult);
  const instaFollowers = 2550000;
  const instaPrevFollowers = 2510000;
  const instaProfileVisits = Math.round(780000 * mult);
  const instaPrevProfileVisits = Math.round(640000 * mult);

  const instaEr = Number(((instaInteractions / instaReach) * 100).toFixed(2));
  const instaSavedRatio = Number(((instaSaves / instaReach) * 100).toFixed(2));
  const instaBioCtr = Number(((142000 * mult / instaProfileVisits) * 100).toFixed(2));

  const instagramTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 120000 * (1 + Math.sin(i * 0.5) * 0.3) * mult;
    return {
      date,
      Alcance: Math.round(base * 4.2),
      Impresiones: Math.round(base * 8.8),
      Interacciones: Math.round(base * 1.15),
      Guardados: Math.round(base * 0.24),
    };
  });

  const instagramData: PlatformData = {
    id: 'instagram',
    name: 'Instagram Oficial',
    handle: '@abelpintos',
    officialAudience: '2.55M Seguidores',
    iconName: 'Instagram',
    brandColor: '#E1306C',
    metrics: {
      reach: { id: 'reach', label: 'Alcance Único', value: instaReach, previousValue: instaPrevReach, sparkline: [5.8, 6.0, 6.2, 6.4, 6.6, 6.7, 6.8] },
      impressions: { id: 'impressions', label: 'Impresiones Totales', value: instaImpressions, previousValue: instaPrevImpressions, sparkline: [12.2, 12.6, 13.0, 13.4, 13.8, 14.0, 14.2] },
      interactions: { id: 'interactions', label: 'Interacciones Totales', value: instaInteractions, previousValue: instaPrevInteractions, sparkline: [1.38, 1.42, 1.48, 1.52, 1.57, 1.60, 1.62] },
      followers: { id: 'followers', label: 'Seguidores Instagram', value: instaFollowers, previousValue: instaPrevFollowers, sparkline: [2.51, 2.52, 2.53, 2.54, 2.545, 2.548, 2.55] },
      profileVisits: { id: 'profileVisits', label: 'Visitas al Perfil', value: instaProfileVisits, previousValue: instaPrevProfileVisits, sparkline: [620, 650, 680, 710, 740, 760, 780] },
    },
    kpis: {
      engagementRate: {
        id: 'engagementRate',
        label: 'Engagement Rate (ER)',
        value: instaEr,
        previousValue: 22.8,
        unit: '%',
        target: 20.0,
        description: 'Compromiso orgánico de la comunidad en anuncios de conciertos y lanzamientos.',
        status: 'excellent'
      },
      savedRatio: {
        id: 'savedRatio',
        label: 'Ratio Guardados / Alcance',
        value: instaSavedRatio,
        previousValue: 4.8,
        unit: '%',
        target: 5.0,
        description: 'Guardado de reel sobre fechas de la Gira 30 Aniversario y venta de entradas.',
        status: 'good'
      },
      bioCtr: {
        id: 'bioCtr',
        label: 'CTR Enlace en Bio',
        value: instaBioCtr,
        previousValue: 17.5,
        unit: '%',
        target: 15.0,
        description: 'Clicks en enlace a boletería de shows en Buenos Aires y Rosario.',
        status: 'excellent'
      }
    },
    timeSeries: instagramTimeSeries,
    contentDistribution: [
      { name: 'Reels Conciertos & En Vivo', value: 50, color: '#D4AF37' },
      { name: 'Carruseles Gira 30 Aniversario', value: 30, color: '#E1306C' },
      { name: 'Historias / Backstage', value: 12, color: '#F77737' },
      { name: 'Lanzamiento Libro & Fotos', value: 8, color: '#C5A059' }
    ],
    topContent: [
      { id: 'ig-1', platform: 'instagram', title: '✨ GIRA 30 ANIVERSARIO: ¡Nuevas fechas Buenos Aires & Rosario!', type: 'Reel En Vivo', campaignId: 'tour30', publishedAt: 'Hace 2 días', metrics: { viewsOrReach: Math.round(1850000 * mult), interactions: Math.round(310000 * mult), engagementRate: 16.7, saves: Math.round(89000 * mult) } },
      { id: 'ig-2', platform: 'instagram', title: '📖 Presentación del Libro Conmemorativo con fotos inéditas', type: 'Carrusel', campaignId: 'book', publishedAt: 'Hace 5 días', metrics: { viewsOrReach: Math.round(1420000 * mult), interactions: Math.round(210000 * mult), engagementRate: 14.8, saves: Math.round(74000 * mult) } },
      { id: 'ig-3', platform: 'instagram', title: '🎤 Cantando "Motivos" a capella con el público', type: 'Reel Viral', campaignId: 'tour30', publishedAt: 'Hace 1 semana', metrics: { viewsOrReach: Math.round(1280000 * mult), interactions: Math.round(195000 * mult), engagementRate: 15.2, saves: Math.round(62000 * mult) } }
    ]
  };

  // --- 3. YOUTUBE (@AbelPintos — ~1.71M suscriptores, >2.15B reproducciones) ---
  const ytViews = Math.round(14500000 * mult);
  const ytPrevViews = Math.round(12800000 * mult);
  const ytWatchTime = Number((385000 * mult).toFixed(0)); // Hours
  const ytPrevWatchTime = Number((340000 * mult).toFixed(0));
  const ytNetSubscribers = Math.round(48000 * mult);
  const ytPrevNetSubscribers = Math.round(41000 * mult);
  const ytCtr = 9.4; // %
  const ytPrevCtr = 8.6;
  const ytAudienceRetention = 54.2; // %
  const ytPrevAudienceRetention = 50.1;

  const ytSubGrowthRate = Number(((ytNetSubscribers / 1710000) * 100).toFixed(2));

  const ytTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 210000 * (1 + Math.sin(i * 0.5) * 0.3) * mult;
    return {
      date,
      Views: Math.round(base * 7.5),
      'Horas de Reproducción': Math.round(base * 0.18),
      Suscriptores: Math.round(base * 0.08),
      'CTR Miniaturas (%)': Number((8.8 + (i % 5) * 0.3).toFixed(1)),
    };
  });

  const youtubeData: PlatformData = {
    id: 'youtube',
    name: 'YouTube Canal Oficial',
    handle: '@AbelPintos',
    officialAudience: '1.71M Suscriptores (>2.15B Vistas)',
    iconName: 'Youtube',
    brandColor: '#FF0000',
    metrics: {
      views: { id: 'views', label: 'Vistas Totales Canal', value: ytViews, previousValue: ytPrevViews, sparkline: [12.5, 12.9, 13.4, 13.8, 14.1, 14.3, 14.5] },
      watchTime: { id: 'watchTime', label: 'Tiempo de Reproducción (Horas)', value: ytWatchTime, previousValue: ytPrevWatchTime, unit: 'hrs', sparkline: [330, 345, 355, 368, 375, 380, 385] },
      netSubscribers: { id: 'netSubscribers', label: 'Suscriptores Netos', value: ytNetSubscribers, previousValue: ytPrevNetSubscribers, sparkline: [40, 42, 44, 45, 46, 47, 48] },
      thumbnailCtr: { id: 'thumbnailCtr', label: 'CTR de Miniaturas (Videoclips)', value: ytCtr, previousValue: ytPrevCtr, unit: '%', sparkline: [8.4, 8.6, 8.8, 9.0, 9.1, 9.3, 9.4] },
      retention: { id: 'retention', label: 'Retención de Audiencia', value: ytAudienceRetention, previousValue: ytPrevAudienceRetention, unit: '%', sparkline: [49, 50.5, 51.8, 52.5, 53.2, 53.8, 54.2] },
    },
    kpis: {
      thumbnailCtrKpi: {
        id: 'thumbnailCtrKpi',
        label: 'Thumbnail CTR (Videoclips)',
        value: ytCtr,
        previousValue: ytPrevCtr,
        unit: '%',
        target: 8.5,
        description: 'Tasa de clics en miniaturas de videoclips y recitales completos en vivo.',
        status: 'excellent'
      },
      retentionKpi: {
        id: 'retentionKpi',
        label: 'Tasa de Retención Promedio (%)',
        value: ytAudienceRetention,
        previousValue: ytPrevAudienceRetention,
        unit: '%',
        target: 50.0,
        description: 'Permanencia media de reproducción en videos musicales y shows completos.',
        status: 'excellent'
      },
      subGrowthKpi: {
        id: 'subGrowthKpi',
        label: 'Crecimiento de Suscriptores (%)',
        value: ytSubGrowthRate,
        previousValue: 2.39,
        unit: '%',
        target: 2.0,
        description: 'Crecimiento relativo sobre la comunidad de 1.71M de suscriptores.',
        status: 'excellent'
      }
    },
    timeSeries: ytTimeSeries,
    contentDistribution: [
      { name: 'Videoclips Oficiales (Oncemil, Motivos)', value: 55, color: '#FF0000' },
      { name: 'Conciertos En Vivo (30 Aniversario)', value: 30, color: '#D4AF37' },
      { name: 'Shorts & Detrás de Escena', value: 15, color: '#C5A059' }
    ],
    topContent: [
      { id: 'yt-1', platform: 'youtube', title: 'Abel Pintos - Oncemil (Video Oficial)', type: 'Videoclip Oficial', campaignId: 'album', publishedAt: 'Más Visto', metrics: { viewsOrReach: Math.round(5200000 * mult), interactions: Math.round(480000 * mult), engagementRate: 9.2, conversionRate: 8.5 } },
      { id: 'yt-2', platform: 'youtube', title: 'Abel Pintos - Motivos (En Vivo Teatro Ópera)', type: 'Recital En Vivo', campaignId: 'tour30', publishedAt: 'Popular', metrics: { viewsOrReach: Math.round(3800000 * mult), interactions: Math.round(340000 * mult), engagementRate: 8.9, conversionRate: 7.8 } },
      { id: 'yt-3', platform: 'youtube', title: 'Abel Pintos - Sin Principio Ni Final', type: 'Videoclip Oficial', campaignId: 'album', publishedAt: 'Clásico', metrics: { viewsOrReach: Math.round(3100000 * mult), interactions: Math.round(290000 * mult), engagementRate: 9.4, conversionRate: 8.1 } }
    ]
  };

  // --- 4. FACEBOOK (Página Oficial Abel Pintos — ~3.1M seguidores) ---
  const fbTotalReach = Math.round(5800000 * mult);
  const fbOrganicReach = Math.round(4200000 * mult);
  const fbPaidReach = Math.round(1600000 * mult);
  const fbPrevReach = Math.round(5100000 * mult);
  const fbInteractions = Math.round(740000 * mult);
  const fbPrevInteractions = Math.round(620000 * mult);
  const fbClicks = Math.round(310000 * mult);
  const fbPrevClicks = Math.round(250000 * mult);
  const fbFollowers = 3100000;
  const fbPrevFollowers = 3070000;

  const fbPageEr = Number(((fbInteractions / fbTotalReach) * 100).toFixed(2));
  const fbCpc = 0.34;
  const fbVideoRetention = 38.4;

  const fbTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 90000 * (1 + Math.sin(i * 0.4) * 0.2) * mult;
    return {
      date,
      'Alcance Orgánico': Math.round(base * 3.8),
      'Alcance Pagado': Math.round(base * 1.5),
      Interacciones: Math.round(base * 0.65),
      Clics: Math.round(base * 0.3),
    };
  });

  const facebookData: PlatformData = {
    id: 'facebook',
    name: 'Facebook Página Oficial',
    handle: 'Abel Pintos',
    officialAudience: '3.1M Seguidores / Me Gusta',
    iconName: 'Facebook',
    brandColor: '#1877F2',
    metrics: {
      totalReach: { id: 'totalReach', label: 'Alcance Total (Org. + Ads)', value: fbTotalReach, previousValue: fbPrevReach, sparkline: [5.1, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8] },
      organicReach: { id: 'organicReach', label: 'Alcance Orgánico', value: fbOrganicReach, previousValue: Math.round(3700000 * mult), sparkline: [3.7, 3.8, 3.9, 4.0, 4.1, 4.15, 4.2] },
      paidReach: { id: 'paidReach', label: 'Alcance Pagado Gira', value: fbPaidReach, previousValue: Math.round(1400000 * mult), sparkline: [1.4, 1.45, 1.5, 1.52, 1.55, 1.58, 1.6] },
      interactions: { id: 'interactions', label: 'Interacciones Totales', value: fbInteractions, previousValue: fbPrevInteractions, sparkline: [620, 640, 660, 680, 700, 720, 740] },
      clicks: { id: 'clicks', label: 'Clics a Boletería / Entradas', value: fbClicks, previousValue: fbPrevClicks, sparkline: [250, 260, 275, 288, 295, 305, 310] },
      followers: { id: 'followers', label: 'Seguidores Facebook', value: fbFollowers, previousValue: fbPrevFollowers, sparkline: [3.07, 3.075, 3.08, 3.085, 3.09, 3.095, 3.1] },
    },
    kpis: {
      pageEr: {
        id: 'pageEr',
        label: 'Page Engagement Rate',
        value: fbPageEr,
        previousValue: 12.15,
        unit: '%',
        target: 11.0,
        description: 'Nivel de respuesta en posts sobre conciertos, anuncios de gira y nuevos lanzamientos.',
        status: 'excellent'
      },
      cpc: {
        id: 'cpc',
        label: 'Costo Por Clic (CPC Ads)',
        value: fbCpc,
        previousValue: 0.39,
        unit: '$',
        prefix: '$',
        target: 0.40,
        description: 'Costo promedio por clic directo hacia la compra de entradas para la Gira 30 Aniversario.',
        status: 'excellent'
      },
      videoRetention: {
        id: 'videoRetention',
        label: 'Retención de Video Recitales',
        value: fbVideoRetention,
        previousValue: 34.1,
        unit: '%',
        target: 30.0,
        description: 'Consumo prolongado de clips en vivo en la página oficial.',
        status: 'excellent'
      }
    },
    timeSeries: fbTimeSeries,
    contentDistribution: [
      { name: 'Anuncios de Gira (BA & Rosario)', value: 45, color: '#D4AF37' },
      { name: 'Publicaciones de Álbum', value: 35, color: '#1877F2' },
      { name: 'Eventos del Libro', value: 20, color: '#C5A059' }
    ],
    topContent: [
      { id: 'fb-1', platform: 'facebook', title: '🎫 ¡Entradas a la venta para los shows de Buenos Aires & Rosario!', type: 'Anuncio con Enlace', campaignId: 'tour30', publishedAt: 'Hace 3 días', metrics: { viewsOrReach: Math.round(2100000 * mult), interactions: Math.round(280000 * mult), engagementRate: 13.3, conversionRate: 6.4 } }
    ]
  };

  // --- 5. X (TWITTER) (@AbelPintos — ~1.7M seguidores) ---
  const twitterImpressions = Math.round(4900000 * mult);
  const twitterPrevImpressions = Math.round(4200000 * mult);
  const twitterRetweets = Math.round(112000 * mult);
  const twitterPrevRetweets = Math.round(94000 * mult);
  const twitterQuotes = Math.round(28000 * mult);
  const twitterPrevQuotes = Math.round(22000 * mult);
  const twitterLikes = Math.round(480000 * mult);
  const twitterPrevLikes = Math.round(410000 * mult);
  const twitterLinkClicks = Math.round(185000 * mult);
  const twitterPrevLinkClicks = Math.round(152000 * mult);
  const twitterFollowers = 1700000;
  const twitterPrevFollowers = 1690000;

  const twitterErPerTweet = Number((((twitterRetweets + twitterQuotes + twitterLikes + twitterLinkClicks) / twitterImpressions) * 100).toFixed(2));
  const twitterAvgReach = Math.round(185000 * mult);

  const twitterTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 80000 * (1 + Math.sin(i * 0.6) * 0.3) * mult;
    return {
      date,
      Impresiones: Math.round(base * 8),
      Likes: Math.round(base * 0.8),
      Retweets: Math.round(base * 0.2),
      'Clics en Enlace': Math.round(base * 0.3),
    };
  });

  const twitterData: PlatformData = {
    id: 'twitter',
    name: 'X (Twitter) Oficial',
    handle: '@AbelPintos',
    officialAudience: '1.7M Seguidores',
    iconName: 'Twitter',
    brandColor: '#1DA1F2',
    metrics: {
      impressions: { id: 'impressions', label: 'Impresiones Totales', value: twitterImpressions, previousValue: twitterPrevImpressions, sparkline: [4.2, 4.35, 4.5, 4.65, 4.75, 4.85, 4.9] },
      retweets: { id: 'retweets', label: 'Retweets', value: twitterRetweets, previousValue: twitterPrevRetweets, sparkline: [94, 97, 101, 105, 108, 110, 112] },
      quotes: { id: 'quotes', label: 'Citas (Quotes)', value: twitterQuotes, previousValue: twitterPrevQuotes, sparkline: [22, 23, 24, 25, 26, 27, 28] },
      likes: { id: 'likes', label: 'Me gusta', value: twitterLikes, previousValue: twitterPrevLikes, sparkline: [410, 425, 440, 455, 465, 475, 480] },
      linkClicks: { id: 'linkClicks', label: 'Clics en Links de Shows', value: twitterLinkClicks, previousValue: twitterPrevLinkClicks, sparkline: [152, 158, 165, 172, 178, 182, 185] },
    },
    kpis: {
      interactionRate: {
        id: 'interactionRate',
        label: 'Tasa de Interacción por Tweet',
        value: twitterErPerTweet,
        previousValue: 16.1,
        unit: '%',
        target: 14.0,
        description: 'Participación directa en mensajes sobre la Gira 30 Aniversario y reflexiones con fans.',
        status: 'excellent'
      },
      avgReach: {
        id: 'avgReach',
        label: 'Alcance Promedio por Tweet',
        value: twitterAvgReach,
        previousValue: Math.round(160000 * mult),
        unit: 'users',
        target: 150000,
        description: 'Exposición orgánica promedio de cada Tweet oficial enviado por Abel Pintos.',
        status: 'excellent'
      }
    },
    timeSeries: twitterTimeSeries,
    contentDistribution: [
      { name: 'Anuncios Gira 30 Aniversario', value: 50, color: '#D4AF37' },
      { name: 'Mensajes a los Fans', value: 30, color: '#1DA1F2' },
      { name: 'Novedades Musicales', value: 20, color: '#C5A059' }
    ],
    topContent: [
      { id: 'tw-1', platform: 'twitter', title: 'Nos vemos pronto en Buenos Aires y Rosario. ¡Gracias por estos 30 años juntos! ❤️', type: 'Tweet Oficial', campaignId: 'tour30', publishedAt: 'Ayer', metrics: { viewsOrReach: Math.round(920000 * mult), interactions: Math.round(145000 * mult), engagementRate: 15.7, sharesOrReposts: Math.round(24000 * mult) } }
    ]
  };

  // --- 6. TIKTOK (@abel.pintos.musica — ~850K seguidores) ---
  const tiktokViews = Math.round(8200000 * mult);
  const tiktokPrevViews = Math.round(7100000 * mult);
  const tiktokAvgPlayTime = 22.4;
  const tiktokPrevPlayTime = 19.8;
  const tiktokRetention = 49.5;
  const tiktokPrevRetention = 45.2;
  const tiktokShares = Math.round(310000 * mult);
  const tiktokPrevShares = Math.round(240000 * mult);
  const tiktokLikes = Math.round(1150000 * mult);
  const tiktokPrevLikes = Math.round(980000 * mult);
  const tiktokFollowers = 850000;
  const tiktokPrevFollowers = 810000;

  const tiktokWatchThrough = 39.8;
  const tiktokVirality = Number(((tiktokShares / tiktokViews) * 100).toFixed(2));
  const tiktokErPerVideo = Number((((tiktokLikes + tiktokShares) / tiktokViews) * 100).toFixed(2));

  const tiktokTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 110000 * (1 + Math.sin(i * 0.8) * 0.4) * mult;
    return {
      date,
      Views: Math.round(base * 12),
      Likes: Math.round(base * 1.8),
      Compartidos: Math.round(base * 0.45),
      'Retención (%)': Math.round(44 + (i % 6) * 1.2),
    };
  });

  const tiktokData: PlatformData = {
    id: 'tiktok',
    name: 'TikTok Oficial',
    handle: '@abel.pintos.musica',
    officialAudience: '850K Seguidores',
    iconName: 'Video',
    brandColor: '#00F2FE',
    metrics: {
      videoViews: { id: 'videoViews', label: 'Reproducciones de Video', value: tiktokViews, previousValue: tiktokPrevViews, sparkline: [7.1, 7.3, 7.5, 7.7, 7.9, 8.1, 8.2] },
      avgPlayTime: { id: 'avgPlayTime', label: 'Tiempo Promedio de Reproducción', value: tiktokAvgPlayTime, previousValue: tiktokPrevPlayTime, unit: 's', sparkline: [19.8, 20.3, 20.9, 21.4, 21.8, 22.1, 22.4] },
      retention: { id: 'retention', label: 'Tasa de Retención Media', value: tiktokRetention, previousValue: tiktokPrevRetention, unit: '%', sparkline: [45, 46.2, 47.1, 48.0, 48.7, 49.1, 49.5] },
      shares: { id: 'shares', label: 'Compartidos Totales', value: tiktokShares, previousValue: tiktokPrevShares, sparkline: [240, 255, 270, 282, 295, 305, 310] },
      likes: { id: 'likes', label: 'Me gusta Acumulados', value: tiktokLikes, previousValue: tiktokPrevLikes, sparkline: [980, 1010, 1050, 1080, 1110, 1130, 1150] },
      followers: { id: 'followers', label: 'Seguidores TikTok', value: tiktokFollowers, previousValue: tiktokPrevFollowers, sparkline: [810, 818, 825, 832, 840, 845, 850] },
    },
    kpis: {
      watchThrough: {
        id: 'watchThrough',
        label: 'Watch-Through Rate',
        value: tiktokWatchThrough,
        previousValue: 35.2,
        unit: '%',
        target: 35.0,
        description: 'Porcentaje de usuarios que escuchan la interpretación musical completa en TikTok.',
        status: 'excellent'
      },
      viralityRate: {
        id: 'viralityRate',
        label: 'Tasa de Viralidad (Shares / Views)',
        value: tiktokVirality,
        previousValue: 3.38,
        unit: '%',
        target: 3.5,
        description: 'Shares de acústicos y fragmentos en vivo cantando "Oncemil" y "Motivos".',
        status: 'good'
      },
      erPerVideo: {
        id: 'erPerVideo',
        label: 'ER Promedio por Video TikTok',
        value: tiktokErPerVideo,
        previousValue: 17.18,
        unit: '%',
        target: 15.0,
        description: 'Compromiso directo por cada TikTok publicado.',
        status: 'excellent'
      }
    },
    timeSeries: tiktokTimeSeries,
    contentDistribution: [
      { name: 'Acústicos en Vivo (Oncemil, Motivos)', value: 50, color: '#D4AF37' },
      { name: 'Ensayos Gira 30 Aniversario', value: 30, color: '#00F2FE' },
      { name: 'Momentos Íntimos / Lectura Libro', value: 20, color: '#C5A059' }
    ],
    topContent: [
      { id: 'tk-1', platform: 'tiktok', title: 'Cantando "Motivos" acústico antes de salir al escenario 🎸', type: 'Short Video', campaignId: 'tour30', publishedAt: 'Hace 2 días', metrics: { viewsOrReach: Math.round(2850000 * mult), interactions: Math.round(510000 * mult), engagementRate: 17.8, sharesOrReposts: Math.round(112000 * mult) } }
    ]
  };

  // --- 7. THREADS (@abelpintos — ~420K seguidores) ---
  const threadsReplies = Math.round(84000 * mult);
  const threadsPrevReplies = Math.round(68000 * mult);
  const threadsReposts = Math.round(38000 * mult);
  const threadsPrevReposts = Math.round(31000 * mult);
  const threadsLikes = Math.round(390000 * mult);
  const threadsPrevLikes = Math.round(320000 * mult);
  const threadsFollowers = 420000;
  const threadsPrevFollowers = 405000;
  const threadsImpressions = Math.round(2900000 * mult);
  const threadsPrevImpressions = Math.round(2400000 * mult);

  const threadsConvRate = Number(((threadsReplies / threadsImpressions) * 100).toFixed(2));
  const threadsVirality = Number(((threadsReposts / threadsImpressions) * 100).toFixed(2));
  const threadsEr = Number((((threadsReplies + threadsReposts + threadsLikes) / threadsImpressions) * 100).toFixed(2));

  const threadsTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 40000 * (1 + Math.cos(i * 0.7) * 0.3) * mult;
    return {
      date,
      Impresiones: Math.round(base * 7.5),
      Respuestas: Math.round(base * 0.3),
      Reposts: Math.round(base * 0.14),
      Likes: Math.round(base * 1.3),
    };
  });

  const threadsData: PlatformData = {
    id: 'threads',
    name: 'Threads Oficial',
    handle: '@abelpintos',
    officialAudience: '420K Seguidores',
    iconName: 'AtSign',
    brandColor: '#000000',
    metrics: {
      replies: { id: 'replies', label: 'Respuestas de Fans', value: threadsReplies, previousValue: threadsPrevReplies, sparkline: [68, 71, 74, 77, 80, 82, 84] },
      reposts: { id: 'reposts', label: 'Reposts', value: threadsReposts, previousValue: threadsPrevReposts, sparkline: [31, 32, 34, 35, 36, 37, 38] },
      likes: { id: 'likes', label: 'Me gusta', value: threadsLikes, previousValue: threadsPrevLikes, sparkline: [320, 335, 350, 365, 375, 385, 390] },
      followers: { id: 'followers', label: 'Seguidores Threads', value: threadsFollowers, previousValue: threadsPrevFollowers, sparkline: [405, 408, 411, 414, 417, 419, 420] },
      impressions: { id: 'impressions', label: 'Impresiones', value: threadsImpressions, previousValue: threadsPrevImpressions, sparkline: [2.4, 2.5, 2.6, 2.7, 2.8, 2.85, 2.9] },
    },
    kpis: {
      convRate: {
        id: 'convRate',
        label: 'Conversión de Conversación',
        value: threadsConvRate,
        previousValue: 2.83,
        unit: '%',
        target: 2.5,
        description: 'Tasa de respuestas generadas en reflexiones y conversaciones sobre las canciones.',
        status: 'excellent'
      },
      viralityRate: {
        id: 'viralityRate',
        label: 'Tasa de Viralidad',
        value: threadsVirality,
        previousValue: 1.29,
        unit: '%',
        target: 1.2,
        description: 'Reposts directos de mensajes del artista.',
        status: 'good'
      },
      threadsEr: {
        id: 'threadsEr',
        label: 'Engagement Rate de Hilo',
        value: threadsEr,
        previousValue: 17.45,
        unit: '%',
        target: 15.0,
        description: 'Interacción agregada en Threads.',
        status: 'excellent'
      }
    },
    timeSeries: threadsTimeSeries,
    contentDistribution: [
      { name: 'Mensajes & Agradecimientos a Fans', value: 55, color: '#D4AF37' },
      { name: 'Reflexiones sobre 30 Años de Carrera', value: 30, color: '#64748B' },
      { name: 'Lanzamiento de Canciones & Libro', value: 15, color: '#C5A059' }
    ],
    topContent: [
      { id: 'th-1', platform: 'threads', title: 'Reflexionando sobre 30 años de música. ¿Cuál fue la primera canción que escuchaste? 🧵', type: 'Hilo Reflexión', campaignId: 'tour30', publishedAt: 'Hace 3 días', metrics: { viewsOrReach: Math.round(840000 * mult), interactions: Math.round(128000 * mult), engagementRate: 15.2, sharesOrReposts: Math.round(14200 * mult) } }
    ]
  };

  return {
    spotify: spotifyData,
    instagram: instagramData,
    youtube: youtubeData,
    facebook: facebookData,
    twitter: twitterData,
    tiktok: tiktokData,
    threads: threadsData,
  };
};

export const getGlobalOverviewData = (range: DateRangeKey, campaign: CampaignId = 'all'): GlobalOverviewData => {
  const platformData = getMockPlatformData(range, campaign);
  const timeMult = getMultiplier(range);
  const campMult = getCampaignMultiplier(campaign);
  const mult = timeMult * campMult;
  const days = getDaysCount(range);
  const dateLabels = generateDates(days);

  // Total Official Community across all platforms (~17.36M listeners & followers combined)
  const totalCommunityVal = 4420000 + 3840000 + 2550000 + 1710000 + 3100000 + 1700000 + 850000 + 420000; // ~18.59M total

  const totalReachVal = Object.values(platformData).reduce((acc, p) => {
    const reachKey = p.metrics.reach ? 'reach' : p.metrics.totalReach ? 'totalReach' : p.metrics.videoViews ? 'videoViews' : p.metrics.impressions ? 'impressions' : p.metrics.views ? 'views' : 'listeners';
    return acc + (p.metrics[reachKey]?.value || 0);
  }, 0);

  const totalPrevReachVal = Object.values(platformData).reduce((acc, p) => {
    const reachKey = p.metrics.reach ? 'reach' : p.metrics.totalReach ? 'totalReach' : p.metrics.videoViews ? 'videoViews' : p.metrics.impressions ? 'impressions' : p.metrics.views ? 'views' : 'listeners';
    return acc + (p.metrics[reachKey]?.previousValue || 0);
  }, 0);

  const totalImpressionsVal = Math.round(totalReachVal * 2.22);
  const totalPrevImpressionsVal = Math.round(totalPrevReachVal * 2.18);

  const totalFollowersVal = Object.values(platformData).reduce((acc, p) => {
    return acc + (p.metrics.followers?.value || p.metrics.netSubscribers?.value || 0);
  }, 0);

  const totalPrevFollowersVal = Object.values(platformData).reduce((acc, p) => {
    return acc + (p.metrics.followers?.previousValue || p.metrics.netSubscribers?.previousValue || 0);
  }, 0);

  const multiPlatformTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    return {
      date,
      Spotify: Math.round((280000 + Math.sin(i * 0.4) * 40000) * mult),
      YouTube: Math.round((210000 + Math.cos(i * 0.5) * 35000) * mult),
      Instagram: Math.round((140000 + Math.sin(i * 0.5) * 30000) * mult),
      TikTok: Math.round((160000 + Math.sin(i * 0.8) * 45000) * mult),
      Facebook: Math.round((95000 + Math.sin(i * 0.3) * 18000) * mult),
      Twitter: Math.round((85000 + Math.cos(i * 0.6) * 15000) * mult),
    };
  });

  return {
    totalCommunity: totalCommunityVal,
    totalReach: {
      id: 'totalReach',
      label: 'Alcance Integrado Multicanal',
      value: totalReachVal,
      previousValue: totalPrevReachVal,
      sparkline: [42.1, 43.5, 44.8, 46.0, 47.2, 48.5, 49.3]
    },
    totalImpressions: {
      id: 'totalImpressions',
      label: 'Impresiones & Streams Acumulados',
      value: totalImpressionsVal,
      previousValue: totalPrevImpressionsVal,
      sparkline: [95.2, 98.4, 101.5, 104.2, 106.8, 108.5, 109.4]
    },
    avgEngagementRate: {
      id: 'avgEngagementRate',
      label: 'Engagement Rate Promedio Abel Pintos',
      value: 15.6,
      previousValue: 14.8,
      unit: '%',
      target: 14.0,
      description: 'Promedio ponderado de interacción orgánica de los fans.',
      status: 'excellent'
    },
    totalFollowers: {
      id: 'totalFollowers',
      label: 'Comunidad Total Redes',
      value: totalFollowersVal,
      previousValue: totalPrevFollowersVal,
      sparkline: [14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7]
    },
    platformComparison: [
      { platform: 'Spotify', reach: Math.round(4420000 * (campaign === 'all' ? 1 : 0.7)), engagement: 19.8, conversion: 9.2, followers: 3840000 },
      { platform: 'Instagram', reach: Math.round(6800000 * mult), engagement: 18.2, conversion: 6.8, followers: 2550000 },
      { platform: 'YouTube', reach: Math.round(14500000 * mult), engagement: 12.4, conversion: 8.6, followers: 1710000 },
      { platform: 'Facebook', reach: Math.round(5800000 * mult), engagement: 12.8, conversion: 6.4, followers: 3100000 },
      { platform: 'X (Twitter)', reach: Math.round(4900000 * mult), engagement: 15.7, conversion: 5.9, followers: 1700000 },
      { platform: 'TikTok', reach: Math.round(8200000 * mult), engagement: 17.8, conversion: 4.8, followers: 850000 },
      { platform: 'Threads', reach: Math.round(2900000 * mult), engagement: 15.2, conversion: 7.5, followers: 420000 },
    ],
    multiPlatformTimeSeries,
  };
};

export const getMockApiPayloads = (): ApiPayloadSample[] => [
  {
    platform: 'spotify',
    endpoint: 'GET /v1/artists/0a6YpL... (Abel Pintos Official)',
    timestamp: new Date().toISOString(),
    status: 200,
    payload: {
      artist_name: 'Abel Pintos',
      monthly_listeners: 4420000,
      followers: 3840000,
      top_tracks: [
        { name: 'Oncemil', streams: 142500000 },
        { name: 'Motivos', streams: 118400000 },
        { name: 'Sin Principio Ni Final', streams: 98200000 }
      ]
    }
  },
  {
    platform: 'instagram',
    endpoint: 'GET /v18.0/@abelpintos/insights',
    timestamp: new Date().toISOString(),
    status: 200,
    payload: {
      username: 'abelpintos',
      followers_count: 2550000,
      reach_28d: 6800000,
      top_reel: 'GIRA 30 ANIVERSARIO Buenos Aires & Rosario'
    }
  },
  {
    platform: 'youtube',
    endpoint: 'GET /v3/channels?id=AbelPintos&part=statistics',
    timestamp: new Date().toISOString(),
    status: 200,
    payload: {
      channel: 'AbelPintos',
      subscribers: 1710000,
      total_views: 2154000000,
      top_video: 'Oncemil (Official Video)'
    }
  }
];
