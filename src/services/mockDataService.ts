import { 
  PlatformData, 
  GlobalOverviewData, 
  DateRangeKey, 
  ComparisonMode, 
  CustomComparisonType,
  CustomThresholds,
  CampaignId, 
  CampaignFilter, 
  Milestone,
  TimeSeriesPoint, 
  ContentItem, 
  ApiPayloadSample 
} from '../types/analytics';

export const CAMPAIGNS: CampaignFilter[] = [
  { id: 'all', label: 'Todas las Campañas', description: 'Visión consolidada de todo el ecosistema digital', badge: 'GLOBAL' },
  { id: 'tour30', label: 'Gira 30 Aniversario / Shows BA & Rosario', description: 'Promoción de conciertos masivos y venta de tickets', badge: 'SHOWS' },
  { id: 'album', label: 'Lanzamiento de Álbum & Singles', description: 'Promoción de nuevos sencillos y reproducción en streaming', badge: 'MÚSICA' },
  { id: 'book', label: 'Libro Conmemorativo', description: 'Lanzamiento editorial conmemorativo y firma de ejemplares', badge: 'LIBRO' },
];

export const ABEL_PINTOS_MILESTONES: Milestone[] = [
  { id: 'm-1', date: '12 Ago', title: 'Lanzamiento Single Oncemil Remastered', category: 'Música', color: '#D4AF37' },
  { id: 'm-2', date: '18 Ago', title: 'Apertura Venta Entradas Gira 30 Aniversario', category: 'Shows', color: '#E1306C' },
  { id: 'm-3', date: '22 Ago', title: 'Firma Ejemplares Libro Conmemorativo', category: 'Libro', color: '#C5A059' },
  { id: 'm-4', date: '25 Ago', title: 'Anuncio Sold Out Teatro Ópera', category: 'Shows', color: '#10B981' },
];

const getMultiplier = (range: DateRangeKey): number => {
  switch (range) {
    case '7d': return 1;
    case '28d': return 3.8;
    case '90d': return 11.5;
    case '1y': return 42.0;
    case 'custom': return 2.5;
    default: return 1;
  }
};

const getCampaignMultiplier = (campaign: CampaignId): number => {
  switch (campaign) {
    case 'all': return 1.0;
    case 'tour30': return 0.48;
    case 'album': return 0.35;
    case 'book': return 0.17;
    default: return 1.0;
  }
};

const getDaysCount = (range: DateRangeKey): number => {
  switch (range) {
    case '7d': return 7;
    case '28d': return 28;
    case '90d': return 30;
    case '1y': return 30;
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

// Calculates delta status (positive, negative, neutral) based on user's custom thresholds (+5% green, -10% red)
export const evaluateDeltaWithThresholds = (
  currentVal: number,
  prevVal: number,
  thresholds: CustomThresholds = { positiveThreshold: 5, negativeThreshold: -10, ignoreNoise: true }
): { percent: number; absolute: number; status: 'positive' | 'negative' | 'neutral' } => {
  if (!prevVal || prevVal === 0) {
    return { percent: 0, absolute: 0, status: 'neutral' };
  }

  const absolute = currentVal - prevVal;
  const percent = (absolute / prevVal) * 100;

  let status: 'positive' | 'negative' | 'neutral' = 'neutral';

  if (percent >= thresholds.positiveThreshold) {
    status = 'positive';
  } else if (percent <= thresholds.negativeThreshold) {
    status = 'negative';
  } else {
    status = 'neutral';
  }

  return { percent, absolute, status };
};

export const getComparisonValue = (
  item: { value: number; previousWeekValue: number; previousMonthValue: number; previousYearValue: number },
  mode: ComparisonMode,
  customType: CustomComparisonType = 'previous_period'
): { value: number; previousValue: number; label: string } => {
  if (customType === 'year_ago') {
    return { value: item.value, previousValue: item.previousYearValue, label: 'vs. mismo periodo año anterior (YoY)' };
  }

  switch (mode) {
    case 'wow':
      return { value: item.value, previousValue: item.previousWeekValue, label: 'vs. semana anterior (WoW)' };
    case 'mom':
      return { value: item.value, previousValue: item.previousMonthValue, label: 'vs. mes anterior (MoM)' };
    case 'yoy':
      return { value: item.value, previousValue: item.previousYearValue, label: 'vs. año anterior (YoY)' };
    default:
      return { value: item.value, previousValue: item.previousMonthValue, label: 'vs. periodo anterior' };
  }
};

export const getMockPlatformData = (
  range: DateRangeKey,
  campaign: CampaignId = 'all',
  comparison: ComparisonMode = 'mom',
  customType: CustomComparisonType = 'previous_period'
): Record<string, PlatformData> => {
  const timeMult = getMultiplier(range);
  const campMult = getCampaignMultiplier(campaign);
  const mult = timeMult * campMult;
  const days = getDaysCount(range);
  const dateLabels = generateDates(days);

  // --- 1. SPOTIFY (Abel Pintos — 4.42M Oyentes Mensuales, 3.84M Seguidores) ---
  const spListeners = Math.round(4420000 * (campaign === 'all' ? 1 : (0.7 + campMult * 0.3)));
  const spListenersWoW = Math.round(4280000 * (campaign === 'all' ? 1 : (0.7 + campMult * 0.3)));
  const spListenersMoM = Math.round(4120000 * (campaign === 'all' ? 1 : (0.7 + campMult * 0.3)));
  const spListenersYoY = Math.round(3550000 * (campaign === 'all' ? 1 : (0.7 + campMult * 0.3)));

  const spStreams = Math.round(18500000 * mult);
  const spStreamsWoW = Math.round(17200000 * mult);
  const spStreamsMoM = Math.round(16200000 * mult);
  const spStreamsYoY = Math.round(13400000 * mult);

  const spLibrarySaves = Math.round(1920000 * mult);
  const spLibrarySavesWoW = Math.round(1810000 * mult);
  const spLibrarySavesMoM = Math.round(1650000 * mult);
  const spLibrarySavesYoY = Math.round(1280000 * mult);

  const spPlaylistAdds = Math.round(840000 * mult);
  const spPlaylistAddsWoW = Math.round(790000 * mult);
  const spPlaylistAddsMoM = Math.round(710000 * mult);
  const spPlaylistAddsYoY = Math.round(540000 * mult);

  const spFollowers = 3840000;
  const spFollowersWoW = 3810000;
  const spFollowersMoM = 3760000;
  const spFollowersYoY = 3200000;

  const spListenerToFollower = Number((((spFollowers - spFollowersMoM) / (spListeners * 0.2)) * 100).toFixed(2));
  const spSavesToStreamRatio = Number(((spLibrarySaves / spStreams) * 100).toFixed(2));
  const spStreamsPerListener = Number((spStreams / spListeners).toFixed(2));

  const compFactor = customType === 'year_ago' ? 0.72 : comparison === 'wow' ? 0.92 : comparison === 'mom' ? 0.86 : 0.72;

  const spotifyTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 250000 * (1 + Math.cos(i * 0.4) * 0.2) * mult;
    const curVal = Math.round(base * 2.8);
    const compVal = Math.round(curVal * (compFactor + Math.sin(i * 0.5) * 0.04));
    
    // Check if any milestone matches this date label
    const ms = ABEL_PINTOS_MILESTONES.find(m => m.date === date);

    return {
      date,
      current: curVal,
      comparison: compVal,
      milestone: ms ? ms.title : undefined,
      Streams: curVal,
      'Streams Anterior': compVal,
      'Oyentes Únicos': Math.round(base * 0.85),
      'Guardados Biblioteca': Math.round(base * 0.32),
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
      listeners: {
        id: 'listeners',
        label: 'Oyentes Mensuales (Spotify)',
        value: spListeners,
        previousWeekValue: spListenersWoW,
        previousMonthValue: spListenersMoM,
        previousYearValue: spListenersYoY,
        sparkline: [4.1, 4.18, 4.25, 4.31, 4.36, 4.40, 4.42],
        comparisonSparkline: [3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.12]
      },
      streams: {
        id: 'streams',
        label: 'Streams Totales Acumulados',
        value: spStreams,
        previousWeekValue: spStreamsWoW,
        previousMonthValue: spStreamsMoM,
        previousYearValue: spStreamsYoY,
        sparkline: [15.2, 16.0, 16.8, 17.4, 17.9, 18.2, 18.5],
        comparisonSparkline: [13.4, 13.8, 14.2, 14.8, 15.2, 15.8, 16.2]
      },
      librarySaves: {
        id: 'librarySaves',
        label: 'Guardados en Biblioteca',
        value: spLibrarySaves,
        previousWeekValue: spLibrarySavesWoW,
        previousMonthValue: spLibrarySavesMoM,
        previousYearValue: spLibrarySavesYoY,
        sparkline: [1.5, 1.6, 1.68, 1.75, 1.82, 1.88, 1.92]
      },
      playlistAdds: {
        id: 'playlistAdds',
        label: 'Adiciones a Playlists',
        value: spPlaylistAdds,
        previousWeekValue: spPlaylistAddsWoW,
        previousMonthValue: spPlaylistAddsMoM,
        previousYearValue: spPlaylistAddsYoY,
        sparkline: [680, 710, 740, 770, 800, 820, 840]
      },
      followers: {
        id: 'followers',
        label: 'Seguidores en Spotify',
        value: spFollowers,
        previousWeekValue: spFollowersWoW,
        previousMonthValue: spFollowersMoM,
        previousYearValue: spFollowersYoY,
        sparkline: [3.76, 3.78, 3.79, 3.81, 3.82, 3.83, 3.84]
      },
    },
    kpis: {
      listenerToFollower: {
        id: 'listenerToFollower',
        label: 'Conversión Oyente a Seguidor',
        value: spListenerToFollower,
        previousWeekValue: 7.8,
        previousMonthValue: 7.2,
        previousYearValue: 5.8,
        unit: '%',
        target: 7.0,
        description: 'Porcentaje de oyentes únicos que decidieron seguir la cuenta oficial.',
        status: 'excellent'
      },
      savesToStream: {
        id: 'savesToStream',
        label: 'Ratio Guardados / Stream',
        value: spSavesToStreamRatio,
        previousWeekValue: 10.4,
        previousMonthValue: 10.18,
        previousYearValue: 9.55,
        unit: '%',
        target: 10.0,
        description: 'Tasa de recurrencia en canciones (Oncemil, Motivos, Sin Principio Ni Final).',
        status: 'excellent'
      },
      streamsPerListener: {
        id: 'streamsPerListener',
        label: 'Escuchas por Oyente Único',
        value: spStreamsPerListener,
        previousWeekValue: 4.12,
        previousMonthValue: 4.02,
        previousYearValue: 3.77,
        unit: 'streams',
        target: 4.0,
        description: 'Frecuencia media de reproducción por cada fan único.',
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
  const instaReachWoW = Math.round(6400000 * mult);
  const instaReachMoM = Math.round(5900000 * mult);
  const instaReachYoY = Math.round(4800000 * mult);

  const instaImpressions = Math.round(14200000 * mult);
  const instaImpressionsWoW = Math.round(13500000 * mult);
  const instaImpressionsMoM = Math.round(12400000 * mult);
  const instaImpressionsYoY = Math.round(9800000 * mult);

  const instaLikes = Math.round(890000 * mult);
  const instaComments = Math.round(112000 * mult);
  const instaSaves = Math.round(340000 * mult);
  const instaShares = Math.round(280000 * mult);
  const instaInteractions = instaLikes + instaComments + instaSaves + instaShares;
  const instaInteractionsWoW = Math.round(1520000 * mult);
  const instaInteractionsMoM = Math.round(1410000 * mult);
  const instaInteractionsYoY = Math.round(1100000 * mult);

  const instaFollowers = 2550000;
  const instaFollowersWoW = 2535000;
  const instaFollowersMoM = 2510000;
  const instaFollowersYoY = 2280000;

  const instaProfileVisits = Math.round(780000 * mult);
  const instaProfileVisitsWoW = Math.round(720000 * mult);
  const instaProfileVisitsMoM = Math.round(640000 * mult);
  const instaProfileVisitsYoY = Math.round(490000 * mult);

  const instaEr = Number(((instaInteractions / instaReach) * 100).toFixed(2));
  const instaSavedRatio = Number(((instaSaves / instaReach) * 100).toFixed(2));
  const instaBioCtr = Number(((142000 * mult / instaProfileVisits) * 100).toFixed(2));

  const instagramTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 120000 * (1 + Math.sin(i * 0.5) * 0.3) * mult;
    const curVal = Math.round(base * 4.2);
    const compVal = Math.round(curVal * (compFactor + Math.cos(i * 0.4) * 0.05));
    const ms = ABEL_PINTOS_MILESTONES.find(m => m.date === date);

    return {
      date,
      current: curVal,
      comparison: compVal,
      milestone: ms ? ms.title : undefined,
      Alcance: curVal,
      'Alcance Anterior': compVal,
      Interacciones: Math.round(base * 1.15),
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
      reach: {
        id: 'reach',
        label: 'Alcance Único Instagram',
        value: instaReach,
        previousWeekValue: instaReachWoW,
        previousMonthValue: instaReachMoM,
        previousYearValue: instaReachYoY,
        sparkline: [5.8, 6.0, 6.2, 6.4, 6.6, 6.7, 6.8]
      },
      impressions: {
        id: 'impressions',
        label: 'Impresiones Totales',
        value: instaImpressions,
        previousWeekValue: instaImpressionsWoW,
        previousMonthValue: instaImpressionsMoM,
        previousYearValue: instaImpressionsYoY,
        sparkline: [12.2, 12.6, 13.0, 13.4, 13.8, 14.0, 14.2]
      },
      interactions: {
        id: 'interactions',
        label: 'Interacciones Totales',
        value: instaInteractions,
        previousWeekValue: instaInteractionsWoW,
        previousMonthValue: instaInteractionsMoM,
        previousYearValue: instaInteractionsYoY,
        sparkline: [1.38, 1.42, 1.48, 1.52, 1.57, 1.60, 1.62]
      },
      followers: {
        id: 'followers',
        label: 'Seguidores en Instagram',
        value: instaFollowers,
        previousWeekValue: instaFollowersWoW,
        previousMonthValue: instaFollowersMoM,
        previousYearValue: instaFollowersYoY,
        sparkline: [2.51, 2.52, 2.53, 2.54, 2.545, 2.548, 2.55]
      },
      profileVisits: {
        id: 'profileVisits',
        label: 'Visitas al Perfil',
        value: instaProfileVisits,
        previousWeekValue: instaProfileVisitsWoW,
        previousMonthValue: instaProfileVisitsMoM,
        previousYearValue: instaProfileVisitsYoY,
        sparkline: [620, 650, 680, 710, 740, 760, 780]
      },
    },
    kpis: {
      engagementRate: {
        id: 'engagementRate',
        label: 'Engagement Rate (ER)',
        value: instaEr,
        previousWeekValue: 23.4,
        previousMonthValue: 22.8,
        previousYearValue: 19.5,
        unit: '%',
        target: 20.0,
        description: 'Compromiso orgánico de la comunidad en anuncios de conciertos y lanzamientos.',
        status: 'excellent'
      },
      savedRatio: {
        id: 'savedRatio',
        label: 'Ratio Guardados / Alcance',
        value: instaSavedRatio,
        previousWeekValue: 5.1,
        previousMonthValue: 4.8,
        previousYearValue: 4.1,
        unit: '%',
        target: 5.0,
        description: 'Guardado de reel sobre fechas de la Gira 30 Aniversario y venta de entradas.',
        status: 'good'
      },
      bioCtr: {
        id: 'bioCtr',
        label: 'CTR Enlace en Bio',
        value: instaBioCtr,
        previousWeekValue: 17.9,
        previousMonthValue: 17.5,
        previousYearValue: 14.2,
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
  const ytViewsWoW = Math.round(13800000 * mult);
  const ytViewsMoM = Math.round(12800000 * mult);
  const ytViewsYoY = Math.round(10200000 * mult);

  const ytWatchTime = Number((385000 * mult).toFixed(0));
  const ytWatchTimeWoW = Number((365000 * mult).toFixed(0));
  const ytWatchTimeMoM = Number((340000 * mult).toFixed(0));
  const ytWatchTimeYoY = Number((275000 * mult).toFixed(0));

  const ytNetSubscribers = Math.round(48000 * mult);
  const ytNetSubscribersWoW = Math.round(44000 * mult);
  const ytNetSubscribersMoM = Math.round(41000 * mult);
  const ytNetSubscribersYoY = Math.round(31000 * mult);

  const ytCtr = 9.4;
  const ytAudienceRetention = 54.2;
  const ytSubGrowthRate = Number(((ytNetSubscribers / 1710000) * 100).toFixed(2));

  const youtubeTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 210000 * (1 + Math.sin(i * 0.5) * 0.3) * mult;
    const curVal = Math.round(base * 7.5);
    const compVal = Math.round(curVal * (compFactor + Math.sin(i * 0.6) * 0.04));
    const ms = ABEL_PINTOS_MILESTONES.find(m => m.date === date);

    return {
      date,
      current: curVal,
      comparison: compVal,
      milestone: ms ? ms.title : undefined,
      Views: curVal,
      'Views Anterior': compVal,
      'Horas de Reproducción': Math.round(base * 0.18),
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
      views: {
        id: 'views',
        label: 'Vistas Totales Canal',
        value: ytViews,
        previousWeekValue: ytViewsWoW,
        previousMonthValue: ytViewsMoM,
        previousYearValue: ytViewsYoY,
        sparkline: [12.5, 12.9, 13.4, 13.8, 14.1, 14.3, 14.5]
      },
      watchTime: {
        id: 'watchTime',
        label: 'Tiempo de Reproducción (Horas)',
        value: ytWatchTime,
        previousWeekValue: ytWatchTimeWoW,
        previousMonthValue: ytWatchTimeMoM,
        previousYearValue: ytWatchTimeYoY,
        unit: 'hrs',
        sparkline: [330, 345, 355, 368, 375, 380, 385]
      },
      netSubscribers: {
        id: 'netSubscribers',
        label: 'Suscriptores Netos',
        value: ytNetSubscribers,
        previousWeekValue: ytNetSubscribersWoW,
        previousMonthValue: ytNetSubscribersMoM,
        previousYearValue: ytNetSubscribersYoY,
        sparkline: [40, 42, 44, 45, 46, 47, 48]
      },
      thumbnailCtr: {
        id: 'thumbnailCtr',
        label: 'CTR de Miniaturas (Videoclips)',
        value: ytCtr,
        previousWeekValue: 9.1,
        previousMonthValue: 8.6,
        previousYearValue: 7.8,
        unit: '%',
        sparkline: [8.4, 8.6, 8.8, 9.0, 9.1, 9.3, 9.4]
      },
      retention: {
        id: 'retention',
        label: 'Retención de Audiencia',
        value: ytAudienceRetention,
        previousWeekValue: 53.1,
        previousMonthValue: 50.1,
        previousYearValue: 44.2,
        unit: '%',
        sparkline: [49, 50.5, 51.8, 52.5, 53.2, 53.8, 54.2]
      },
    },
    kpis: {
      thumbnailCtrKpi: {
        id: 'thumbnailCtrKpi',
        label: 'Thumbnail CTR (Videoclips)',
        value: ytCtr,
        previousWeekValue: 9.1,
        previousMonthValue: 8.6,
        previousYearValue: 7.8,
        unit: '%',
        target: 8.5,
        description: 'Tasa de clics en miniaturas de videoclips y recitales completos en vivo.',
        status: 'excellent'
      },
      retentionKpi: {
        id: 'retentionKpi',
        label: 'Tasa de Retención Promedio (%)',
        value: ytAudienceRetention,
        previousWeekValue: 53.1,
        previousMonthValue: 50.1,
        previousYearValue: 44.2,
        unit: '%',
        target: 50.0,
        description: 'Permanencia media de reproducción en videos musicales y shows completos.',
        status: 'excellent'
      },
      subGrowthKpi: {
        id: 'subGrowthKpi',
        label: 'Crecimiento de Suscriptores (%)',
        value: ytSubGrowthRate,
        previousWeekValue: 2.57,
        previousMonthValue: 2.39,
        previousYearValue: 1.81,
        unit: '%',
        target: 2.0,
        description: 'Crecimiento relativo sobre la comunidad de 1.71M de suscriptores.',
        status: 'excellent'
      }
    },
    timeSeries: youtubeTimeSeries,
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
  const fbTotalReachWoW = Math.round(5400000 * mult);
  const fbTotalReachMoM = Math.round(5100000 * mult);
  const fbTotalReachYoY = Math.round(4100000 * mult);

  const fbOrganicReach = Math.round(4200000 * mult);
  const fbPaidReach = Math.round(1600000 * mult);

  const fbInteractions = Math.round(740000 * mult);
  const fbInteractionsWoW = Math.round(680000 * mult);
  const fbInteractionsMoM = Math.round(620000 * mult);
  const fbInteractionsYoY = Math.round(490000 * mult);

  const fbClicks = Math.round(310000 * mult);
  const fbClicksWoW = Math.round(280000 * mult);
  const fbClicksMoM = Math.round(250000 * mult);
  const fbClicksYoY = Math.round(180000 * mult);

  const fbFollowers = 3100000;
  const fbFollowersWoW = 3085000;
  const fbFollowersMoM = 3070000;
  const fbFollowersYoY = 2920000;

  const fbPageEr = Number(((fbInteractions / fbTotalReach) * 100).toFixed(2));
  const fbCpc = 0.34;
  const fbVideoRetention = 38.4;

  const fbTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 90000 * (1 + Math.sin(i * 0.4) * 0.2) * mult;
    const curVal = Math.round(base * 5.3);
    const compVal = Math.round(curVal * (compFactor + Math.cos(i * 0.3) * 0.05));
    const ms = ABEL_PINTOS_MILESTONES.find(m => m.date === date);

    return {
      date,
      current: curVal,
      comparison: compVal,
      milestone: ms ? ms.title : undefined,
      'Alcance Total': curVal,
      'Alcance Anterior': compVal,
      'Alcance Orgánico': Math.round(base * 3.8),
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
      totalReach: {
        id: 'totalReach',
        label: 'Alcance Total (Org. + Ads)',
        value: fbTotalReach,
        previousWeekValue: fbTotalReachWoW,
        previousMonthValue: fbTotalReachMoM,
        previousYearValue: fbTotalReachYoY,
        sparkline: [5.1, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8]
      },
      organicReach: {
        id: 'organicReach',
        label: 'Alcance Orgánico',
        value: fbOrganicReach,
        previousWeekValue: Math.round(3900000 * mult),
        previousMonthValue: Math.round(3700000 * mult),
        previousYearValue: Math.round(2900000 * mult),
        sparkline: [3.7, 3.8, 3.9, 4.0, 4.1, 4.15, 4.2]
      },
      paidReach: {
        id: 'paidReach',
        label: 'Alcance Pagado Gira',
        value: fbPaidReach,
        previousWeekValue: Math.round(1500000 * mult),
        previousMonthValue: Math.round(1400000 * mult),
        previousYearValue: Math.round(1200000 * mult),
        sparkline: [1.4, 1.45, 1.5, 1.52, 1.55, 1.58, 1.6]
      },
      interactions: {
        id: 'interactions',
        label: 'Interacciones Totales',
        value: fbInteractions,
        previousWeekValue: fbInteractionsWoW,
        previousMonthValue: fbInteractionsMoM,
        previousYearValue: fbInteractionsYoY,
        sparkline: [620, 640, 660, 680, 700, 720, 740]
      },
      clicks: {
        id: 'clicks',
        label: 'Clics a Boletería / Entradas',
        value: fbClicks,
        previousWeekValue: fbClicksWoW,
        previousMonthValue: fbClicksMoM,
        previousYearValue: fbClicksYoY,
        sparkline: [250, 260, 275, 288, 295, 305, 310]
      },
      followers: {
        id: 'followers',
        label: 'Seguidores Facebook',
        value: fbFollowers,
        previousWeekValue: fbFollowersWoW,
        previousMonthValue: fbFollowersMoM,
        previousYearValue: fbFollowersYoY,
        sparkline: [3.07, 3.075, 3.08, 3.085, 3.09, 3.095, 3.1]
      },
    },
    kpis: {
      pageEr: {
        id: 'pageEr',
        label: 'Page Engagement Rate',
        value: fbPageEr,
        previousWeekValue: 12.6,
        previousMonthValue: 12.15,
        previousYearValue: 10.8,
        unit: '%',
        target: 11.0,
        description: 'Nivel de respuesta en posts sobre conciertos y nuevos lanzamientos.',
        status: 'excellent'
      },
      cpc: {
        id: 'cpc',
        label: 'Costo Por Clic (CPC Ads)',
        value: fbCpc,
        previousWeekValue: 0.36,
        previousMonthValue: 0.39,
        previousYearValue: 0.44,
        unit: '$',
        prefix: '$',
        target: 0.40,
        description: 'Costo promedio por clic directo hacia la compra de entradas.',
        status: 'excellent'
      },
      videoRetention: {
        id: 'videoRetention',
        label: 'Retención de Video Recitales',
        value: fbVideoRetention,
        previousWeekValue: 36.2,
        previousMonthValue: 34.1,
        previousYearValue: 28.5,
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
  const twitterImpressionsWoW = Math.round(4500000 * mult);
  const twitterImpressionsMoM = Math.round(4200000 * mult);
  const twitterImpressionsYoY = Math.round(3400000 * mult);

  const twitterRetweets = Math.round(112000 * mult);
  const twitterQuotes = Math.round(28000 * mult);
  const twitterLikes = Math.round(480000 * mult);
  const twitterLinkClicks = Math.round(185000 * mult);
  const twitterFollowers = 1700000;

  const twitterErPerTweet = Number((((twitterRetweets + twitterQuotes + twitterLikes + twitterLinkClicks) / twitterImpressions) * 100).toFixed(2));
  const twitterAvgReach = Math.round(185000 * mult);

  const twitterTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 80000 * (1 + Math.sin(i * 0.6) * 0.3) * mult;
    const curVal = Math.round(base * 8);
    const compVal = Math.round(curVal * (compFactor + Math.sin(i * 0.4) * 0.05));
    const ms = ABEL_PINTOS_MILESTONES.find(m => m.date === date);

    return {
      date,
      current: curVal,
      comparison: compVal,
      milestone: ms ? ms.title : undefined,
      Impresiones: curVal,
      'Impresiones Anterior': compVal,
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
      impressions: {
        id: 'impressions',
        label: 'Impresiones Totales',
        value: twitterImpressions,
        previousWeekValue: twitterImpressionsWoW,
        previousMonthValue: twitterImpressionsMoM,
        previousYearValue: twitterImpressionsYoY,
        sparkline: [4.2, 4.35, 4.5, 4.65, 4.75, 4.85, 4.9]
      },
      retweets: {
        id: 'retweets',
        label: 'Retweets',
        value: twitterRetweets,
        previousWeekValue: Math.round(102000 * mult),
        previousMonthValue: Math.round(94000 * mult),
        previousYearValue: Math.round(72000 * mult),
        sparkline: [94, 97, 101, 105, 108, 110, 112]
      },
      quotes: {
        id: 'quotes',
        label: 'Citas (Quotes)',
        value: twitterQuotes,
        previousWeekValue: Math.round(25000 * mult),
        previousMonthValue: Math.round(22000 * mult),
        previousYearValue: Math.round(16000 * mult),
        sparkline: [22, 23, 24, 25, 26, 27, 28]
      },
      likes: {
        id: 'likes',
        label: 'Me gusta',
        value: twitterLikes,
        previousWeekValue: Math.round(440000 * mult),
        previousMonthValue: Math.round(410000 * mult),
        previousYearValue: Math.round(320000 * mult),
        sparkline: [410, 425, 440, 455, 465, 475, 480]
      },
      linkClicks: {
        id: 'linkClicks',
        label: 'Clics en Links de Shows',
        value: twitterLinkClicks,
        previousWeekValue: Math.round(168000 * mult),
        previousMonthValue: Math.round(152000 * mult),
        previousYearValue: Math.round(110000 * mult),
        sparkline: [152, 158, 165, 172, 178, 182, 185]
      },
    },
    kpis: {
      interactionRate: {
        id: 'interactionRate',
        label: 'Tasa de Interacción por Tweet',
        value: twitterErPerTweet,
        previousWeekValue: 16.5,
        previousMonthValue: 16.1,
        previousYearValue: 13.8,
        unit: '%',
        target: 14.0,
        description: 'Participación directa en mensajes sobre la Gira 30 Aniversario y reflexiones.',
        status: 'excellent'
      },
      avgReach: {
        id: 'avgReach',
        label: 'Alcance Promedio por Tweet',
        value: twitterAvgReach,
        previousWeekValue: Math.round(175000 * mult),
        previousMonthValue: Math.round(160000 * mult),
        previousYearValue: Math.round(125000 * mult),
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
  const tiktokViewsWoW = Math.round(7600000 * mult);
  const tiktokViewsMoM = Math.round(7100000 * mult);
  const tiktokViewsYoY = Math.round(5200000 * mult);

  const tiktokAvgPlayTime = 22.4;
  const tiktokRetention = 49.5;
  const tiktokShares = Math.round(310000 * mult);
  const tiktokLikes = Math.round(1150000 * mult);
  const tiktokFollowers = 850000;

  const tiktokWatchThrough = 39.8;
  const tiktokVirality = Number(((tiktokShares / tiktokViews) * 100).toFixed(2));
  const tiktokErPerVideo = Number((((tiktokLikes + tiktokShares) / tiktokViews) * 100).toFixed(2));

  const tiktokTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 110000 * (1 + Math.sin(i * 0.8) * 0.4) * mult;
    const curVal = Math.round(base * 12);
    const compVal = Math.round(curVal * (compFactor + Math.sin(i * 0.5) * 0.05));
    const ms = ABEL_PINTOS_MILESTONES.find(m => m.date === date);

    return {
      date,
      current: curVal,
      comparison: compVal,
      milestone: ms ? ms.title : undefined,
      Views: curVal,
      'Views Anterior': compVal,
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
      videoViews: {
        id: 'videoViews',
        label: 'Reproducciones de Video',
        value: tiktokViews,
        previousWeekValue: tiktokViewsWoW,
        previousMonthValue: tiktokViewsMoM,
        previousYearValue: tiktokViewsYoY,
        sparkline: [7.1, 7.3, 7.5, 7.7, 7.9, 8.1, 8.2]
      },
      avgPlayTime: {
        id: 'avgPlayTime',
        label: 'Tiempo Promedio de Reproducción',
        value: tiktokAvgPlayTime,
        previousWeekValue: 21.2,
        previousMonthValue: 19.8,
        previousYearValue: 16.4,
        unit: 's',
        sparkline: [19.8, 20.3, 20.9, 21.4, 21.8, 22.1, 22.4]
      },
      retention: {
        id: 'retention',
        label: 'Tasa de Retención Media',
        value: tiktokRetention,
        previousWeekValue: 47.8,
        previousMonthValue: 45.2,
        previousYearValue: 38.1,
        unit: '%',
        sparkline: [45, 46.2, 47.1, 48.0, 48.7, 49.1, 49.5]
      },
      shares: {
        id: 'shares',
        label: 'Compartidos Totales',
        value: tiktokShares,
        previousWeekValue: Math.round(280000 * mult),
        previousMonthValue: Math.round(240000 * mult),
        previousYearValue: Math.round(160000 * mult),
        sparkline: [240, 255, 270, 282, 295, 305, 310]
      },
      likes: {
        id: 'likes',
        label: 'Me gusta Acumulados',
        value: tiktokLikes,
        previousWeekValue: Math.round(1060000 * mult),
        previousMonthValue: Math.round(980000 * mult),
        previousYearValue: Math.round(710000 * mult),
        sparkline: [980, 1010, 1050, 1080, 1110, 1130, 1150]
      },
      followers: {
        id: 'followers',
        label: 'Seguidores TikTok',
        value: tiktokFollowers,
        previousWeekValue: 840000,
        previousMonthValue: 810000,
        previousYearValue: 620000,
        sparkline: [810, 818, 825, 832, 840, 845, 850]
      },
    },
    kpis: {
      watchThrough: {
        id: 'watchThrough',
        label: 'Watch-Through Rate',
        value: tiktokWatchThrough,
        previousWeekValue: 37.5,
        previousMonthValue: 35.2,
        previousYearValue: 28.4,
        unit: '%',
        target: 35.0,
        description: 'Porcentaje de usuarios que escuchan la interpretación musical completa en TikTok.',
        status: 'excellent'
      },
      viralityRate: {
        id: 'viralityRate',
        label: 'Tasa de Viralidad (Shares / Views)',
        value: tiktokVirality,
        previousWeekValue: 3.52,
        previousMonthValue: 3.38,
        previousYearValue: 2.85,
        unit: '%',
        target: 3.5,
        description: 'Shares de acústicos y fragmentos en vivo cantando "Oncemil" y "Motivos".',
        status: 'good'
      },
      erPerVideo: {
        id: 'erPerVideo',
        label: 'ER Promedio por Video TikTok',
        value: tiktokErPerVideo,
        previousWeekValue: 17.55,
        previousMonthValue: 17.18,
        previousYearValue: 14.8,
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
  const threadsRepliesWoW = Math.round(76000 * mult);
  const threadsRepliesMoM = Math.round(68000 * mult);
  const threadsRepliesYoY = Math.round(45000 * mult);

  const threadsReposts = Math.round(38000 * mult);
  const threadsLikes = Math.round(390000 * mult);
  const threadsFollowers = 420000;
  const threadsImpressions = Math.round(2900000 * mult);

  const threadsConvRate = Number(((threadsReplies / threadsImpressions) * 100).toFixed(2));
  const threadsVirality = Number(((threadsReposts / threadsImpressions) * 100).toFixed(2));
  const threadsEr = Number((((threadsReplies + threadsReposts + threadsLikes) / threadsImpressions) * 100).toFixed(2));

  const threadsTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const base = 40000 * (1 + Math.cos(i * 0.7) * 0.3) * mult;
    const curVal = Math.round(base * 7.5);
    const compVal = Math.round(curVal * (compFactor + Math.sin(i * 0.4) * 0.05));
    const ms = ABEL_PINTOS_MILESTONES.find(m => m.date === date);

    return {
      date,
      current: curVal,
      comparison: compVal,
      milestone: ms ? ms.title : undefined,
      Impresiones: curVal,
      'Impresiones Anterior': compVal,
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
      replies: {
        id: 'replies',
        label: 'Respuestas de Fans',
        value: threadsReplies,
        previousWeekValue: threadsRepliesWoW,
        previousMonthValue: threadsRepliesMoM,
        previousYearValue: threadsRepliesYoY,
        sparkline: [68, 71, 74, 77, 80, 82, 84]
      },
      reposts: {
        id: 'reposts',
        label: 'Reposts',
        value: threadsReposts,
        previousWeekValue: Math.round(34000 * mult),
        previousMonthValue: Math.round(31000 * mult),
        previousYearValue: Math.round(21000 * mult),
        sparkline: [31, 32, 34, 35, 36, 37, 38]
      },
      likes: {
        id: 'likes',
        label: 'Me gusta',
        value: threadsLikes,
        previousWeekValue: Math.round(355000 * mult),
        previousMonthValue: Math.round(320000 * mult),
        previousYearValue: Math.round(240000 * mult),
        sparkline: [320, 335, 350, 365, 375, 385, 390]
      },
      followers: {
        id: 'followers',
        label: 'Seguidores Threads',
        value: threadsFollowers,
        previousWeekValue: 415000,
        previousMonthValue: 405000,
        previousYearValue: 310000,
        sparkline: [405, 408, 411, 414, 417, 419, 420]
      },
      impressions: {
        id: 'impressions',
        label: 'Impresiones',
        value: threadsImpressions,
        previousWeekValue: Math.round(2650000 * mult),
        previousMonthValue: Math.round(2400000 * mult),
        previousYearValue: Math.round(1800000 * mult),
        sparkline: [2.4, 2.5, 2.6, 2.7, 2.8, 2.85, 2.9]
      },
    },
    kpis: {
      convRate: {
        id: 'convRate',
        label: 'Conversión de Conversación',
        value: threadsConvRate,
        previousWeekValue: 2.91,
        previousMonthValue: 2.83,
        previousYearValue: 2.35,
        unit: '%',
        target: 2.5,
        description: 'Tasa de respuestas generadas en reflexiones y conversaciones sobre las canciones.',
        status: 'excellent'
      },
      viralityRate: {
        id: 'viralityRate',
        label: 'Tasa de Viralidad',
        value: threadsVirality,
        previousWeekValue: 1.32,
        previousMonthValue: 1.29,
        previousYearValue: 1.05,
        unit: '%',
        target: 1.2,
        description: 'Reposts directos de mensajes del artista.',
        status: 'good'
      },
      threadsEr: {
        id: 'threadsEr',
        label: 'Engagement Rate de Hilo',
        value: threadsEr,
        previousWeekValue: 17.6,
        previousMonthValue: 17.45,
        previousYearValue: 14.5,
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

export const getGlobalOverviewData = (
  range: DateRangeKey,
  campaign: CampaignId = 'all',
  comparison: ComparisonMode = 'mom',
  customType: CustomComparisonType = 'previous_period'
): GlobalOverviewData => {
  const platformData = getMockPlatformData(range, campaign, comparison, customType);
  const timeMult = getMultiplier(range);
  const campMult = getCampaignMultiplier(campaign);
  const mult = timeMult * campMult;
  const days = getDaysCount(range);
  const dateLabels = generateDates(days);

  const totalCommunityVal = 4420000 + 3840000 + 2550000 + 1710000 + 3100000 + 1700000 + 850000 + 420000;

  const totalReachVal = Object.values(platformData).reduce((acc, p) => {
    const reachKey = p.metrics.reach ? 'reach' : p.metrics.totalReach ? 'totalReach' : p.metrics.videoViews ? 'videoViews' : p.metrics.impressions ? 'impressions' : p.metrics.views ? 'views' : 'listeners';
    return acc + (p.metrics[reachKey]?.value || 0);
  }, 0);

  const totalReachWoW = Math.round(totalReachVal * 0.93);
  const totalReachMoM = Math.round(totalReachVal * 0.86);
  const totalReachYoY = Math.round(totalReachVal * 0.71);

  const totalImpressionsVal = Math.round(totalReachVal * 2.22);
  const totalImpressionsWoW = Math.round(totalReachWoW * 2.18);
  const totalImpressionsMoM = Math.round(totalReachMoM * 2.15);
  const totalImpressionsYoY = Math.round(totalReachYoY * 2.05);

  const totalFollowersVal = Object.values(platformData).reduce((acc, p) => {
    return acc + (p.metrics.followers?.value || p.metrics.netSubscribers?.value || 0);
  }, 0);

  const totalFollowersWoW = Math.round(totalFollowersVal * 0.99);
  const totalFollowersMoM = Math.round(totalFollowersVal * 0.97);
  const totalFollowersYoY = Math.round(totalFollowersVal * 0.85);

  const compFactor = customType === 'year_ago' ? 0.72 : comparison === 'wow' ? 0.92 : comparison === 'mom' ? 0.86 : 0.72;

  const multiPlatformTimeSeries: TimeSeriesPoint[] = dateLabels.map((date, i) => {
    const spCur = Math.round((280000 + Math.sin(i * 0.4) * 40000) * mult);
    const spComp = Math.round(spCur * (compFactor + Math.sin(i * 0.5) * 0.04));
    const ms = ABEL_PINTOS_MILESTONES.find(m => m.date === date);

    return {
      date,
      current: spCur,
      comparison: spComp,
      milestone: ms ? ms.title : undefined,
      Spotify: spCur,
      'Spotify Anterior': spComp,
      YouTube: Math.round((210000 + Math.cos(i * 0.5) * 35000) * mult),
      Instagram: Math.round((140000 + Math.sin(i * 0.5) * 30000) * mult),
      TikTok: Math.round((160000 + Math.sin(i * 0.8) * 45000) * mult),
    };
  });

  return {
    totalCommunity: totalCommunityVal,
    totalReach: {
      id: 'totalReach',
      label: 'Alcance Integrado Multicanal',
      value: totalReachVal,
      previousWeekValue: totalReachWoW,
      previousMonthValue: totalReachMoM,
      previousYearValue: totalReachYoY,
      sparkline: [42.1, 43.5, 44.8, 46.0, 47.2, 48.5, 49.3]
    },
    totalImpressions: {
      id: 'totalImpressions',
      label: 'Impresiones & Streams Acumulados',
      value: totalImpressionsVal,
      previousWeekValue: totalImpressionsWoW,
      previousMonthValue: totalImpressionsMoM,
      previousYearValue: totalImpressionsYoY,
      sparkline: [95.2, 98.4, 101.5, 104.2, 106.8, 108.5, 109.4]
    },
    avgEngagementRate: {
      id: 'avgEngagementRate',
      label: 'Engagement Rate Promedio Abel Pintos',
      value: 15.6,
      previousWeekValue: 15.2,
      previousMonthValue: 14.8,
      previousYearValue: 12.5,
      unit: '%',
      target: 14.0,
      description: 'Promedio ponderado de interacción orgánica de los fans.',
      status: 'excellent'
    },
    totalFollowers: {
      id: 'totalFollowers',
      label: 'Comunidad Total Redes',
      value: totalFollowersVal,
      previousWeekValue: totalFollowersWoW,
      previousMonthValue: totalFollowersMoM,
      previousYearValue: totalFollowersYoY,
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
    milestones: ABEL_PINTOS_MILESTONES,
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

export const getComparativePeriodLabel = (
  range: DateRangeKey,
  mode: ComparisonMode,
  customType: CustomComparisonType = 'previous_period',
  customStart?: string,
  customEnd?: string,
  customCompStart?: string,
  customCompEnd?: string
): { currentLabel: string; comparisonLabel: string; fullSubtitle: string } => {
  const today = new Date(2026, 7, 26); // Aug 26, 2026

  const formatDateShort = (d: Date) => {
    return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
  };

  const formatDateWithYear = (d: Date) => {
    return `${d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}, ${d.getFullYear()}`;
  };

  if (range === 'custom' && customStart && customEnd) {
    const dStart = new Date(customStart);
    const dEnd = new Date(customEnd);
    const diffDays = Math.max(1, Math.round((dEnd.getTime() - dStart.getTime()) / (86400 * 1000)));

    const curLabel = `${formatDateShort(dStart)} – ${formatDateWithYear(dEnd)}`;

    let compLabel = '';
    if (customType === 'custom_range' && customCompStart && customCompEnd) {
      const cStart = new Date(customCompStart);
      const cEnd = new Date(customCompEnd);
      compLabel = `${formatDateShort(cStart)} – ${formatDateWithYear(cEnd)}`;
    } else if (customType === 'year_ago') {
      const cStart = new Date(dStart);
      cStart.setFullYear(cStart.getFullYear() - 1);
      const cEnd = new Date(dEnd);
      cEnd.setFullYear(cEnd.getFullYear() - 1);
      compLabel = `${formatDateShort(cStart)} – ${formatDateWithYear(cEnd)}`;
    } else {
      const cEnd = new Date(dStart);
      cEnd.setDate(cEnd.getDate() - 1);
      const cStart = new Date(cEnd);
      cStart.setDate(cStart.getDate() - diffDays);
      compLabel = `${formatDateShort(cStart)} – ${formatDateWithYear(cEnd)}`;
    }

    return {
      currentLabel: curLabel,
      comparisonLabel: compLabel,
      fullSubtitle: `${curLabel} vs. ${compLabel}`
    };
  }

  if (customType === 'year_ago' || mode === 'yoy') {
    const curEnd = today;
    const curStart = new Date(today);
    curStart.setDate(curStart.getDate() - (range === '7d' ? 6 : range === '28d' ? 27 : range === '90d' ? 89 : 365));

    const prevEnd = new Date(curEnd);
    prevEnd.setFullYear(prevEnd.getFullYear() - 1);
    const prevStart = new Date(curStart);
    prevStart.setFullYear(prevStart.getFullYear() - 1);

    const curLabel = `Agosto 2026 (${formatDateShort(curStart)} – ${formatDateWithYear(curEnd)})`;
    const compLabel = `Agosto 2025 (${formatDateShort(prevStart)} – ${formatDateWithYear(prevEnd)})`;

    return {
      currentLabel: curLabel,
      comparisonLabel: compLabel,
      fullSubtitle: `${curLabel} vs. ${compLabel}`
    };
  }

  if (range === '7d' || mode === 'wow') {
    const curEnd = today;
    const curStart = new Date(today);
    curStart.setDate(curStart.getDate() - 6);

    const prevEnd = new Date(curStart);
    prevEnd.setDate(prevEnd.getDate() - 1);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevStart.getDate() - 6);

    const curLabel = `Últimos 7 días (${formatDateShort(curStart)} – ${formatDateWithYear(curEnd)})`;
    const compLabel = `Semana anterior (${formatDateShort(prevStart)} – ${formatDateWithYear(prevEnd)})`;

    return {
      currentLabel: curLabel,
      comparisonLabel: compLabel,
      fullSubtitle: `${curLabel} vs. ${compLabel}`
    };
  }

  if (range === '28d' || mode === 'mom') {
    const curEnd = today;
    const curStart = new Date(today);
    curStart.setDate(curStart.getDate() - 27);

    const prevEnd = new Date(curStart);
    prevEnd.setDate(prevEnd.getDate() - 1);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevStart.getDate() - 27);

    const curLabel = `Agosto 2026 (${formatDateShort(curStart)} – ${formatDateWithYear(curEnd)})`;
    const compLabel = `Julio 2026 (${formatDateShort(prevStart)} – ${formatDateWithYear(prevEnd)})`;

    return {
      currentLabel: curLabel,
      comparisonLabel: compLabel,
      fullSubtitle: `${curLabel} vs. ${compLabel}`
    };
  }

  if (range === '90d') {
    const curEnd = today;
    const curStart = new Date(today);
    curStart.setDate(curStart.getDate() - 89);

    const prevEnd = new Date(curStart);
    prevEnd.setDate(prevEnd.getDate() - 1);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevStart.getDate() - 89);

    const curLabel = `Últimos 90 días (${formatDateShort(curStart)} – ${formatDateWithYear(curEnd)})`;
    const compLabel = `Trimestre anterior (${formatDateShort(prevStart)} – ${formatDateWithYear(prevEnd)})`;

    return {
      currentLabel: curLabel,
      comparisonLabel: compLabel,
      fullSubtitle: `${curLabel} vs. ${compLabel}`
    };
  }

  const curEnd = today;
  const curStart = new Date(today);
  curStart.setFullYear(curStart.getFullYear() - 1);

  const prevEnd = new Date(curStart);
  const prevStart = new Date(prevEnd);
  prevStart.setFullYear(prevStart.getFullYear() - 1);

  const curLabel = `Último Año (${formatDateWithYear(curStart)} – ${formatDateWithYear(curEnd)})`;
  const compLabel = `Año anterior (${formatDateWithYear(prevStart)} – ${formatDateWithYear(prevEnd)})`;

  return {
    currentLabel: curLabel,
    comparisonLabel: compLabel,
    fullSubtitle: `${curLabel} vs. ${compLabel}`
  };
};

