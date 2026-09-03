export type PlatformName = 'Spotify' | 'YouTube' | 'Instagram' | 'TikTok' | 'Facebook' | 'X' | 'Threads';
export type ContentTypeName = 'Canción' | 'Videoclip' | 'Reel' | 'Post' | 'Story' | 'Tweet' | 'TikTok' | 'Prensa';

export interface UniversalRecordMetrics {
  reproducciones: number;
  alcance: number;
  impresiones: number;
  interacciones: number;
  guardados: number;
  clics: number;
}

export interface UniversalRecord {
  id: string;
  fecha: string; // YYYY-MM-DD
  plataforma: PlatformName;
  tipoContenido: ContentTypeName;
  titulo: string;
  descripcion: string;
  campania: string;
  album: string;
  ciudad: string;
  tags: string[];
  metricas: UniversalRecordMetrics;
  enlacePublicacion?: string;
  relevanceScore?: number;
}

export interface PlatformDualMetric {
  filteredImpact: number;
  globalImpact: number;
  sharePercent: number;
  filteredInteractions: number;
  globalInteractions: number;
  filteredCount: number;
  globalCount: number;
}

export interface DualMetricsCalculation {
  filteredImpact: number; // Impacto exclusivo del término/tema filtrado
  globalBenchmarkImpact: number; // Impacto total global en el periodo
  shareOfVoice: number; // Porcentaje de contribución ((filteredImpact / globalBenchmarkImpact) * 100)
  filteredInteractions: number;
  globalInteractions: number;
  interactionsShare: number;
  platformBreakdowns: Record<PlatformName, PlatformDualMetric>;
}

export interface UniversalSearchAggregation {
  query: string;
  totalResults: number;
  totalImpacts: number; // Reproducciones + Alcance
  totalReproducciones: number; // Suma de Reproducciones
  totalAlcance: number; // Suma de Alcance
  totalImpactoCombinado: number; // totalReproducciones + totalAlcance
  totalInteractions: number; // Interacciones
  totalSaves: number; // Guardados
  totalClicks: number; // Clics
  topPlatform: PlatformName;
  platformCounts: Record<PlatformName, number>;
  groupedResults: Record<PlatformName, UniversalRecord[]>;
  allResults: UniversalRecord[]; // Latest snapshots by default
  latestSnapshots: UniversalRecord[]; // Consolidated latest snapshots per unique publication
  allHistoryRecords: UniversalRecord[]; // Full matching records with complete history
  hasMultipleSnapshots: boolean; // Indicates if there are historical progression rows
  dualMetrics: DualMetricsCalculation;
}

// Master Indexable Universal Dataset for Abel Pintos (Strictly Segregated by Song/Campaign)
export const MASTER_INDEXABLE_RECORDS: UniversalRecord[] = [
  // ==========================================
  // --- ONCEMIL ---
  // ==========================================
  {
    id: 'sp-rec-oncemil',
    fecha: '2026-08-25',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Oncemil',
    descripcion: 'Single insignia de Abel Pintos. Tema más reproducido del álbum 11 con presencia fija en el Top 50.',
    campania: 'Lanzamiento Álbum 11',
    album: '11',
    ciudad: 'Buenos Aires',
    tags: ['Oncemil', 'Álbum 11', 'Top Track', 'Streaming'],
    metricas: { reproducciones: 6200000, alcance: 4420000, impresiones: 8900000, interacciones: 720000, guardados: 540000, clics: 120000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },
  {
    id: 'yt-rec-oncemil',
    fecha: '2026-08-26',
    plataforma: 'YouTube',
    tipoContenido: 'Videoclip',
    titulo: 'Abel Pintos - Oncemil (Video Oficial)',
    descripcion: 'Videoclip oficial en 4K del single Oncemil con millones de reproducciones acumuladas.',
    campania: 'Lanzamiento Álbum 11',
    album: '11',
    ciudad: 'Buenos Aires',
    tags: ['Oncemil', 'Videoclip', 'Oficial', 'Álbum 11'],
    metricas: { reproducciones: 5200000, alcance: 3900000, impresiones: 7400000, interacciones: 480000, guardados: 180000, clics: 145000 },
    enlacePublicacion: 'https://youtube.com/@AbelPintos'
  },
  {
    id: 'tk-rec-oncemil',
    fecha: '2026-08-25',
    plataforma: 'TikTok',
    tipoContenido: 'TikTok',
    titulo: 'El público cantando el estribillo de "Oncemil" a todo pulmón ❤️',
    descripcion: 'Video viral capturado desde el escenario durante la interpretación de Oncemil.',
    campania: 'Lanzamiento Álbum 11',
    album: '11',
    ciudad: 'Rosario',
    tags: ['Oncemil', 'En Vivo', 'TikTok', 'Viral'],
    metricas: { reproducciones: 2450000, alcance: 1850000, impresiones: 3700000, interacciones: 440000, guardados: 118000, clics: 62000 },
    enlacePublicacion: 'https://tiktok.com/@abel.pintos.musica'
  },
  {
    id: 'fb-rec-oncemil',
    fecha: '2026-08-23',
    plataforma: 'Facebook',
    tipoContenido: 'Post',
    titulo: '🎧 Reviví "Oncemil" en alta definición en tu plataforma favorita',
    descripcion: 'Publicación oficial destacando el impacto de Oncemil en los rankings digitales.',
    campania: 'Lanzamiento Álbum 11',
    album: '11',
    ciudad: 'Buenos Aires',
    tags: ['Oncemil', 'Álbum 11', 'Éxito'],
    metricas: { reproducciones: 1800000, alcance: 2450000, impresiones: 3800000, interacciones: 230000, guardados: 44000, clics: 125000 },
    enlacePublicacion: 'https://facebook.com/AbelPintosOficial'
  },

  // ==========================================
  // --- MOTIVOS ---
  // ==========================================
  {
    id: 'sp-rec-motivos',
    fecha: '2026-08-20',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Motivos',
    descripcion: 'Himno emotivo de Abel Pintos y pieza central del álbum Único.',
    campania: 'Gira 30 Años',
    album: 'Único',
    ciudad: 'Rosario',
    tags: ['Motivos', 'Único', 'Clásico', 'En Vivo'],
    metricas: { reproducciones: 4800000, alcance: 3850000, impresiones: 6700000, interacciones: 580000, guardados: 410000, clics: 95000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },
  {
    id: 'yt-rec-motivos',
    fecha: '2026-08-22',
    plataforma: 'YouTube',
    tipoContenido: 'Videoclip',
    titulo: 'Abel Pintos - Motivos (En Vivo Teatro Ópera Buenos Aires)',
    descripcion: 'Registro en directo de la interpretación de Motivos en el emblemático Teatro Ópera.',
    campania: 'Gira 30 Años',
    album: 'Único',
    ciudad: 'Buenos Aires',
    tags: ['Motivos', 'En Vivo', 'Teatro Ópera', 'Único'],
    metricas: { reproducciones: 3800000, alcance: 2950000, impresiones: 5300000, interacciones: 340000, guardados: 140000, clics: 98000 },
    enlacePublicacion: 'https://youtube.com/@AbelPintos'
  },
  {
    id: 'ig-rec-motivos',
    fecha: '2026-08-21',
    plataforma: 'Instagram',
    tipoContenido: 'Reel',
    titulo: '🎤 Cantando "Motivos" a capella con el público en Rosario',
    descripcion: 'Momento conmovedor en Rosario interpretando Motivos solo con la voz del público.',
    campania: 'Gira 30 Años',
    album: 'Único',
    ciudad: 'Rosario',
    tags: ['Motivos', 'Rosario', 'Reel', 'En Vivo'],
    metricas: { reproducciones: 1280000, alcance: 1750000, impresiones: 2600000, interacciones: 195000, guardados: 62000, clics: 45000 },
    enlacePublicacion: 'https://instagram.com/abelpintos'
  },
  {
    id: 'tk-rec-motivos',
    fecha: '2026-08-28',
    plataforma: 'TikTok',
    tipoContenido: 'TikTok',
    titulo: 'Acordes y versión acústica de "Motivos" en camerinos 🎸',
    descripcion: 'Sesión acústica íntima tocando la guitarra antes de salir a escena.',
    campania: 'Gira 30 Años',
    album: 'Único',
    ciudad: 'Buenos Aires',
    tags: ['Motivos', 'Acústico', 'TikTok', 'Guitarra'],
    metricas: { reproducciones: 2850000, alcance: 2100000, impresiones: 4200000, interacciones: 510000, guardados: 145000, clics: 78000 },
    enlacePublicacion: 'https://tiktok.com/@abel.pintos.musica'
  },

  // ==========================================
  // --- IBUPROFENO ---
  // ==========================================
  {
    id: 'sp-rec-ibuprofeno',
    fecha: '2026-08-28',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Ibuprofeno',
    descripcion: 'Nuevo single inédito y estreno exclusivo de la temporada 2026.',
    campania: 'Lanzamiento Single Ibuprofeno',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Buenos Aires',
    tags: ['Ibuprofeno', 'Single', 'Estreno', 'Lanzamiento'],
    metricas: { reproducciones: 1950000, alcance: 1650000, impresiones: 2800000, interacciones: 275000, guardados: 190000, clics: 89000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },
  {
    id: 'yt-rec-ibuprofeno',
    fecha: '2026-08-27',
    plataforma: 'YouTube',
    tipoContenido: 'Videoclip',
    titulo: 'Abel Pintos - Ibuprofeno (Sesión Acústica Exclusiva)',
    descripcion: 'Presentación audiovisual del nuevo tema Ibuprofeno con piano y guitarra acústica.',
    campania: 'Lanzamiento Single Ibuprofeno',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Rosario',
    tags: ['Ibuprofeno', 'Acústico', 'Sesión En Vivo', 'Estreno'],
    metricas: { reproducciones: 1650000, alcance: 1420000, impresiones: 2400000, interacciones: 195000, guardados: 98000, clics: 68000 },
    enlacePublicacion: 'https://youtube.com/@AbelPintos'
  },
  {
    id: 'ig-rec-ibuprofeno',
    fecha: '2026-08-27',
    plataforma: 'Instagram',
    tipoContenido: 'Reel',
    titulo: '🎶 Ensayo exclusivo: Arreglos y melodía de "Ibuprofeno"',
    descripcion: 'Detrás de escena en el estudio preparando el lanzamiento del single Ibuprofeno.',
    campania: 'Lanzamiento Single Ibuprofeno',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Córdoba',
    tags: ['Ibuprofeno', 'Reel', 'Estudio', 'Ensayo'],
    metricas: { reproducciones: 1150000, alcance: 1520000, impresiones: 2300000, interacciones: 178000, guardados: 58000, clics: 42000 },
    enlacePublicacion: 'https://instagram.com/abelpintos'
  },
  {
    id: 'tk-rec-ibuprofeno',
    fecha: '2026-08-27',
    plataforma: 'TikTok',
    tipoContenido: 'TikTok',
    titulo: 'Descubriendo la letra de "Ibuprofeno": ¿Ya la escuchaste? 🎵',
    descripcion: 'Fragmento en video de la nueva canción Ibuprofeno compartida con fans.',
    campania: 'Lanzamiento Single Ibuprofeno',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Buenos Aires',
    tags: ['Ibuprofeno', 'Estreno', 'TikTok', 'Letra'],
    metricas: { reproducciones: 1980000, alcance: 1450000, impresiones: 2900000, interacciones: 345000, guardados: 94000, clics: 51000 },
    enlacePublicacion: 'https://tiktok.com/@abel.pintos.musica'
  },
  {
    id: 'fb-rec-ibuprofeno',
    fecha: '2026-08-26',
    plataforma: 'Facebook',
    tipoContenido: 'Post',
    titulo: '🎵 Estreno Oficial: Ya disponible nuestro nuevo single "Ibuprofeno"',
    descripcion: 'Anuncio formal del lanzamiento de Ibuprofeno en todas las tiendas digitales.',
    campania: 'Lanzamiento Single Ibuprofeno',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Buenos Aires',
    tags: ['Ibuprofeno', 'Lanzamiento', 'Single', 'Estreno'],
    metricas: { reproducciones: 1450000, alcance: 1950000, impresiones: 3100000, interacciones: 185000, guardados: 36000, clics: 92000 },
    enlacePublicacion: 'https://facebook.com/AbelPintosOficial'
  },
  {
    id: 'tw-rec-ibuprofeno',
    fecha: '2026-08-27',
    plataforma: 'X',
    tipoContenido: 'Tweet',
    titulo: 'Felices de compartir "Ibuprofeno" con ustedes. ¡Gracias por recibirla con tanto amor! ❤️',
    descripcion: 'Tweet de agradecimiento por la repercusión del estreno del tema Ibuprofeno.',
    campania: 'Lanzamiento Single Ibuprofeno',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Buenos Aires',
    tags: ['Ibuprofeno', 'Tweet', 'Estreno', 'Agradecimiento'],
    metricas: { reproducciones: 840000, alcance: 1420000, impresiones: 2100000, interacciones: 132000, guardados: 24000, clics: 54000 },
    enlacePublicacion: 'https://twitter.com/AbelPintos'
  },
  {
    id: 'th-rec-ibuprofeno',
    fecha: '2026-08-26',
    plataforma: 'Threads',
    tipoContenido: 'Post',
    titulo: 'El proceso íntimo de composición detrás del nuevo single "Ibuprofeno" 🧵',
    descripcion: 'Hilo reflexivo sobre la gestación de Ibuprofeno y la conexión con el público.',
    campania: 'Lanzamiento Single Ibuprofeno',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Buenos Aires',
    tags: ['Ibuprofeno', 'Composición', 'Hilo', 'Single'],
    metricas: { reproducciones: 790000, alcance: 380000, impresiones: 1100000, interacciones: 118000, guardados: 17500, clics: 29000 },
    enlacePublicacion: 'https://threads.net/@abelpintos'
  },

  // ==========================================
  // --- SIN PRINCIPIO NI FINAL ---
  // ==========================================
  {
    id: 'sp-rec-sin-principio',
    fecha: '2026-08-15',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Sin Principio Ni Final',
    descripcion: 'Balada romántica icónica del álbum Sueño Dorado.',
    campania: 'Gira 30 Años',
    album: 'Sueño Dorado',
    ciudad: 'Buenos Aires',
    tags: ['Sin Principio Ni Final', 'Sueño Dorado', 'Balada', 'Romántico'],
    metricas: { reproducciones: 4100000, alcance: 3400000, impresiones: 5800000, interacciones: 490000, guardados: 380000, clics: 82000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },
  {
    id: 'yt-rec-sin-principio',
    fecha: '2026-08-18',
    plataforma: 'YouTube',
    tipoContenido: 'Videoclip',
    titulo: 'Abel Pintos - Sin Principio Ni Final (Video Oficial)',
    descripcion: 'Video oficial de la balada Sin Principio Ni Final.',
    campania: 'Gira 30 Años',
    album: 'Sueño Dorado',
    ciudad: 'Buenos Aires',
    tags: ['Sin Principio Ni Final', 'Videoclip', 'Sueño Dorado', 'Oficial'],
    metricas: { reproducciones: 3100000, alcance: 2500000, impresiones: 4500000, interacciones: 290000, guardados: 120000, clics: 75000 },
    enlacePublicacion: 'https://youtube.com/@AbelPintos'
  },

  // ==========================================
  // --- PIEDRA LIBRE ---
  // ==========================================
  {
    id: 'sp-rec-piedra-libre',
    fecha: '2026-08-10',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Piedra Libre',
    descripcion: 'Canción dedicada a la paternidad y pieza central del álbum El Amor en Mi Vida.',
    campania: 'El Amor en Mi Vida',
    album: 'El Amor en Mi Vida',
    ciudad: 'Bahía Blanca',
    tags: ['Piedra Libre', 'El Amor en Mi Vida', 'Familia', 'Acústico'],
    metricas: { reproducciones: 3400000, alcance: 2900000, impresiones: 4700000, interacciones: 390000, guardados: 290000, clics: 64000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },

  // ==========================================
  // --- ALTA EN EL CIELO ---
  // ==========================================
  {
    id: 'sp-rec-alta-cielo',
    fecha: '2026-08-01',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Alta en el Cielo',
    descripcion: 'Álbum patrio histórico grabado con la orquesta académica del Teatro Colón.',
    campania: 'Patria & Cultura',
    album: 'Alta en el Cielo',
    ciudad: 'Buenos Aires',
    tags: ['Alta en el Cielo', 'Teatro Colón', 'Himnos', 'Cultura'],
    metricas: { reproducciones: 2900000, alcance: 2400000, impresiones: 3900000, interacciones: 340000, guardados: 240000, clics: 55000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },

  // ==========================================
  // --- GIRA 30 AÑOS (CONCIERTOS & SHOWS) ---
  // ==========================================
  {
    id: 'ig-rec-gira-30',
    fecha: '2026-08-29',
    plataforma: 'Instagram',
    tipoContenido: 'Reel',
    titulo: '✨ GIRA 30 ANIVERSARIO: ¡Nuevas fechas Buenos Aires & Rosario!',
    descripcion: 'Anuncio masivo de los nuevos shows de la Gira 30 Años con localidades agotadas en Buenos Aires y Rosario.',
    campania: 'Gira 30 Años',
    album: 'Gira 30 Aniversario',
    ciudad: 'Buenos Aires',
    tags: ['Gira 30 Años', 'Buenos Aires', 'Rosario', 'Entradas', 'Concierto'],
    metricas: { reproducciones: 1850000, alcance: 2550000, impresiones: 3800000, interacciones: 310000, guardados: 89000, clics: 142000 },
    enlacePublicacion: 'https://instagram.com/abelpintos'
  },
  {
    id: 'fb-rec-gira-30',
    fecha: '2026-08-28',
    plataforma: 'Facebook',
    tipoContenido: 'Post',
    titulo: '🎫 ¡Entradas a la venta para los shows de Buenos Aires & Rosario! (Gira 30 Años)',
    descripcion: 'Venta de boletos para el Teatro Ópera, Luna Park y el anfiteatro de Rosario.',
    campania: 'Gira 30 Años',
    album: 'Gira 30 Aniversario',
    ciudad: 'Buenos Aires',
    tags: ['Gira 30 Años', 'Entradas', 'Buenos Aires', 'Rosario', 'Luna Park', 'Teatro Ópera'],
    metricas: { reproducciones: 2100000, alcance: 3100000, impresiones: 4500000, interacciones: 280000, guardados: 52000, clics: 185000 },
    enlacePublicacion: 'https://facebook.com/AbelPintosOficial'
  },
  {
    id: 'tw-rec-gira-30',
    fecha: '2026-08-30',
    plataforma: 'X',
    tipoContenido: 'Tweet',
    titulo: 'Nos vemos pronto en Buenos Aires y Rosario. ¡Gracias por estos 30 años de gira juntos! ❤️',
    descripcion: 'Mensaje especial para el público que agotó las funciones de la Gira 30 Años.',
    campania: 'Gira 30 Años',
    album: 'Gira 30 Aniversario',
    ciudad: 'Buenos Aires',
    tags: ['Gira 30 Años', 'Buenos Aires', 'Rosario', 'Tweet'],
    metricas: { reproducciones: 920000, alcance: 1700000, impresiones: 2400000, interacciones: 145000, guardados: 28000, clics: 68000 },
    enlacePublicacion: 'https://twitter.com/AbelPintos'
  },
  {
    id: 'th-rec-gira-30',
    fecha: '2026-08-28',
    plataforma: 'Threads',
    tipoContenido: 'Post',
    titulo: 'Reflexionando sobre 30 años de música y giras. ¿Cuál fue el primer show al que viniste? 🧵',
    descripcion: 'Conversación con los seguidores sobre anécdotas de recitales a lo largo de 30 años.',
    campania: 'Gira 30 Años',
    album: 'Gira 30 Aniversario',
    ciudad: 'Buenos Aires',
    tags: ['Gira 30 Años', 'Pregunta', 'Fans', 'Recuerdos'],
    metricas: { reproducciones: 840000, alcance: 420000, impresiones: 1250000, interacciones: 128000, guardados: 19000, clics: 34000 },
    enlacePublicacion: 'https://threads.net/@abelpintos'
  },

  // ==========================================
  // --- LIBRO CONMEMORATIVO ---
  // ==========================================
  {
    id: 'ig-rec-libro',
    fecha: '2026-08-24',
    plataforma: 'Instagram',
    tipoContenido: 'Post',
    titulo: '📖 Presentación del Libro Conmemorativo con fotos inéditas',
    descripcion: 'Lanzamiento de la edición de lujo del libro oficial conmemorando la trayectoria de Abel Pintos.',
    campania: 'Libro Conmemorativo',
    album: 'Libro 30 Años',
    ciudad: 'Buenos Aires',
    tags: ['Libro Conmemorativo', 'Fotos Inéditas', 'Libro', 'Historia'],
    metricas: { reproducciones: 1420000, alcance: 1980000, impresiones: 2900000, interacciones: 210000, guardados: 74000, clics: 88000 },
    enlacePublicacion: 'https://instagram.com/abelpintos'
  }
];

// Helper: Normalize string (remove #, /, accents, and extra whitespace)
export const normalizeSearchQuery = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[/#,;.:\-_"']/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
};

// Strict Token / Word Boundary Match Helper
const isStrictMatch = (targetText: string, queryToken: string): boolean => {
  if (!targetText || !queryToken) return false;
  const normalizedTarget = normalizeSearchQuery(targetText);
  const normalizedQuery = normalizeSearchQuery(queryToken);

  if (normalizedTarget === normalizedQuery) return true;

  // Word boundary regex match (e.g. \bibuprofeno\b)
  const escapedQuery = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|\\s)${escapedQuery}(\\s|$)`, 'i');
  return regex.test(normalizedTarget);
};

// Generic Terms to Exclude from Broad Search
const GENERIC_EXCLUDED_TERMS = new Set([
  'abel', 'pintos', 'abel pintos', '2026', 'musica', 'cancion', 'single', 'artista', 'oficial'
]);

/**
 * 1. Normalización Estricta de Identificadores (Sanitización):
 * Agrupa mediciones del mismo contenido eliminando URL query parameters y trailing slashes.
 * 
 * Reglas:
 * - Si existe 'Link' (o enlacePublicacion/Enlace/link):
 *   * Elimina parámetros de consulta (?igsh=, ?si=, #, etc.)
 *   * Elimina barras inclinadas finales (trailing slashes)
 *   * Convierte a minúsculas y elimina espacios (.trim().toLowerCase())
 * - Si no hay 'Link':
 *   * Combina '${Plataforma.trim().toLowerCase()}_${Titulo.trim().toLowerCase()}'
 */
export const normalizeContentId = (
  row: UniversalRecord | { Link?: string; link?: string; Enlace?: string; enlace?: string; enlacePublicacion?: string; Plataforma?: string; plataforma?: string; Titulo?: string; titulo?: string }
): string => {
  if (!row) return '';

  const rawLink = (row as any).enlacePublicacion || (row as any).Link || (row as any).link || (row as any).Enlace || (row as any).enlace;

  if (rawLink && typeof rawLink === 'string' && rawLink.trim().length > 0) {
    let cleanUrl = rawLink.trim().toLowerCase();
    // 1. Elimina parámetros de consulta (?igsh=, ?si=, etc.) y fragmentos hash (#)
    cleanUrl = cleanUrl.split('?')[0].split('#')[0].trim();
    // 2. Elimina barras inclinadas finales (trailing slashes)
    cleanUrl = cleanUrl.replace(/\/+$/, '').trim();

    if (cleanUrl.length > 5) {
      return cleanUrl;
    }
  }

  // Fallback: Si no hay link, combina Plataforma + Titulo sanitizados
  const rawPlat = (row as any).plataforma || (row as any).Plataforma || '';
  const rawTit = (row as any).titulo || (row as any).Titulo || '';

  const plataforma = String(rawPlat).trim().toLowerCase();
  const titulo = String(rawTit).trim().toLowerCase();

  return `${plataforma}_${titulo}`;
};

// Backwards-compatible alias for getContentItemKey
export const getContentItemKey = normalizeContentId;

export interface ConsolidatedMetrics {
  totalViews: number;
  totalReach: number;
  totalInteractions: number;
  totalCombinedImpact: number;
  uniqueContentsCount: number;
  consolidatedRecords: UniversalRecord[];
  allHistoryRecords: UniversalRecord[];
}

/**
 * 2. Pipeline de Agregación Inmutable (getConsolidatedMetrics):
 * Calcula los totales globales o de un tema/campaña (ej. "Ibuprofeno"):
 * - Paso 1: Filtra las filas donde 'Tema_Campania' coincida con la campaña solicitada.
 * - Paso 2: Agrupa por 'normalizeContentId'.
 * - Paso 3: Dentro de cada grupo, ordena por 'Fecha' (timestamp) y toma ÚNICAMENTE el registro con la fecha más reciente.
 * - Paso 4: Reduce la lista final de registros únicos para calcular:
 *   * totalViews = sum(Reproducciones)
 *   * totalReach = sum(Alcance)
 *   * totalInteractions = sum(Interacciones)
 *   * totalCombinedImpact = totalViews + totalReach
 */
export const getConsolidatedMetrics = (
  records: UniversalRecord[],
  filtroCampania?: string
): ConsolidatedMetrics => {
  if (!records || records.length === 0) {
    return {
      totalViews: 0,
      totalReach: 0,
      totalInteractions: 0,
      totalCombinedImpact: 0,
      uniqueContentsCount: 0,
      consolidatedRecords: [],
      allHistoryRecords: []
    };
  }

  // Paso 1: Filtra las filas donde Tema_Campania coincida exactamente con la campaña solicitada
  const filteredRows = records.filter(r => {
    if (!filtroCampania || filtroCampania === 'all' || filtroCampania.trim() === '') {
      return true;
    }
    const camp = (r.campania || '').trim().toLowerCase();
    const query = filtroCampania.trim().toLowerCase();
    const cleanCampId = camp.replace(/[^a-z0-9]/g, '_');
    const cleanQueryId = query.replace(/[^a-z0-9]/g, '_');

    return camp === query || cleanCampId === cleanQueryId || isStrictMatch(r.campania, query) || isStrictMatch(r.titulo, query);
  });

  // Paso 2: Agrupa por normalizeContentId
  const groups = new Map<string, UniversalRecord[]>();
  filteredRows.forEach(row => {
    const contentId = normalizeContentId(row);
    if (!groups.has(contentId)) {
      groups.set(contentId, []);
    }
    groups.get(contentId)!.push(row);
  });

  // Paso 3: Dentro de cada grupo, ordena por Fecha (timestamp) y toma ÚNICAMENTE el registro con la fecha más reciente
  const consolidatedRecords: UniversalRecord[] = [];
  groups.forEach((groupRows) => {
    // Inmutable sort descending by date timestamp
    const sorted = [...groupRows].sort((a, b) => {
      const timeA = new Date(a.fecha).getTime();
      const timeB = new Date(b.fecha).getTime();
      if (!isNaN(timeA) && !isNaN(timeB) && timeA !== timeB) {
        return timeB - timeA;
      }
      if (a.fecha !== b.fecha) {
        return b.fecha.localeCompare(a.fecha);
      }
      return (b.metricas.reproducciones + b.metricas.alcance) - (a.metricas.reproducciones + a.metricas.alcance);
    });

    if (sorted[0]) {
      consolidatedRecords.push(sorted[0]);
    }
  });

  // Paso 4: Reduce la lista final de registros únicos para calcular métricas consolidadas
  const totalViews = consolidatedRecords.reduce((sum, r) => sum + Number(r.metricas?.reproducciones || (r.metricas as any)?.streams || (r.metricas as any)?.views || 0), 0);
  const totalReach = consolidatedRecords.reduce((sum, r) => sum + Number(r.metricas?.alcance || (r.metricas as any)?.reach || 0), 0);
  const totalInteractions = consolidatedRecords.reduce((sum, r) => sum + Number(r.metricas?.interacciones || 0), 0);
  const totalCombinedImpact = totalViews + totalReach;

  return {
    totalViews,
    totalReach,
    totalInteractions,
    totalCombinedImpact,
    uniqueContentsCount: consolidatedRecords.length,
    consolidatedRecords,
    allHistoryRecords: filteredRows
  };
};

/**
 * Consolidates a list of records by keeping EXCLUSIVELY the latest snapshot (most recent date)
 * for each unique publication item using normalizeContentId.
 */
export const getLatestSnapshotsByItem = (records: UniversalRecord[]): UniversalRecord[] => {
  return getConsolidatedMetrics(records, 'all').consolidatedRecords;
};

// Exact Calculation helper for Impacto Total (Streams & Alcance) using Latest Snapshots
export const calcularImpactoTotal = (itemsFiltrados: UniversalRecord[]): number => {
  const consolidated = getConsolidatedMetrics(itemsFiltrados, 'all');
  return consolidated.totalCombinedImpact;
};

// Exact Calculation helper for Interacciones Totales using Latest Snapshots
export const calcularInteraccionesTotales = (itemsFiltrados: UniversalRecord[]): number => {
  const consolidated = getConsolidatedMetrics(itemsFiltrados, 'all');
  return consolidated.totalInteractions;
};

// Universal Relational Search Engine with Strict Filtering & Latest Snapshot Aggregation
export const searchUniversalRecords = (
  rawQuery: string,
  records: UniversalRecord[] = MASTER_INDEXABLE_RECORDS
): UniversalSearchAggregation => {
  const query = normalizeSearchQuery(rawQuery);

  // If query is empty, return empty summary with 0 impacts
  if (!query) {
    const emptyCounts: Record<PlatformName, number> = {
      Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
    };
    const emptyGrouped: Record<PlatformName, UniversalRecord[]> = {
      Spotify: [], YouTube: [], Instagram: [], TikTok: [], Facebook: [], X: [], Threads: []
    };

    const emptyPlatformBreakdowns: Record<PlatformName, PlatformDualMetric> = {
      Spotify: { filteredImpact: 0, globalImpact: 0, sharePercent: 0, filteredInteractions: 0, globalInteractions: 0, filteredCount: 0, globalCount: 0 },
      YouTube: { filteredImpact: 0, globalImpact: 0, sharePercent: 0, filteredInteractions: 0, globalInteractions: 0, filteredCount: 0, globalCount: 0 },
      Instagram: { filteredImpact: 0, globalImpact: 0, sharePercent: 0, filteredInteractions: 0, globalInteractions: 0, filteredCount: 0, globalCount: 0 },
      TikTok: { filteredImpact: 0, globalImpact: 0, sharePercent: 0, filteredInteractions: 0, globalInteractions: 0, filteredCount: 0, globalCount: 0 },
      Facebook: { filteredImpact: 0, globalImpact: 0, sharePercent: 0, filteredInteractions: 0, globalInteractions: 0, filteredCount: 0, globalCount: 0 },
      X: { filteredImpact: 0, globalImpact: 0, sharePercent: 0, filteredInteractions: 0, globalInteractions: 0, filteredCount: 0, globalCount: 0 },
      Threads: { filteredImpact: 0, globalImpact: 0, sharePercent: 0, filteredInteractions: 0, globalInteractions: 0, filteredCount: 0, globalCount: 0 }
    };

    return {
      query: '',
      totalResults: 0,
      totalImpacts: 0,
      totalReproducciones: 0,
      totalAlcance: 0,
      totalImpactoCombinado: 0,
      totalInteractions: 0,
      totalSaves: 0,
      totalClicks: 0,
      topPlatform: 'Spotify',
      platformCounts: emptyCounts,
      groupedResults: emptyGrouped,
      allResults: [],
      latestSnapshots: [],
      allHistoryRecords: [],
      hasMultipleSnapshots: false,
      dualMetrics: {
        filteredImpact: 0,
        globalBenchmarkImpact: 0,
        shareOfVoice: 0,
        filteredInteractions: 0,
        globalInteractions: 0,
        interactionsShare: 0,
        platformBreakdowns: emptyPlatformBreakdowns
      }
    };
  }

  // Check if searching explicitly by platform name
  const platformKeywords: Record<string, PlatformName> = {
    spotify: 'Spotify',
    youtube: 'YouTube',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    facebook: 'Facebook',
    twitter: 'X',
    x: 'X',
    threads: 'Threads'
  };

  const isPlatformSearch = platformKeywords[query] !== undefined;
  const targetPlatform = platformKeywords[query];

  // Step 1: Perform Strict Filtering across all records
  const matchedRecords = records.filter(record => {
    // 1. If explicit platform search, return all records of that platform
    if (isPlatformSearch && targetPlatform) {
      return record.plataforma === targetPlatform;
    }

    // 2. Ignore generic terms that would match everything
    if (GENERIC_EXCLUDED_TERMS.has(query)) {
      return false;
    }

    // 3. Strict Title Match
    const titleMatch = isStrictMatch(record.titulo, query);

    // 4. Strict Tag Match
    const tagMatch = record.tags.some(tag => isStrictMatch(tag, query));

    // 5. Strict Campaign / Album Match
    const campaignMatch = isStrictMatch(record.campania, query);
    const albumMatch = isStrictMatch(record.album, query);

    // 6. Strict City Match
    const cityMatch = isStrictMatch(record.ciudad, query);

    return titleMatch || tagMatch || campaignMatch || albumMatch || cityMatch;
  });

  // Steps 2 & 3: Group by unique content item and select the single latest snapshot row
  const latestSnapshots = getLatestSnapshotsByItem(matchedRecords);
  const hasMultipleSnapshots = matchedRecords.length > latestSnapshots.length;

  // Group latest snapshots by platform
  const platformCounts: Record<PlatformName, number> = {
    Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
  };
  const groupedResults: Record<PlatformName, UniversalRecord[]> = {
    Spotify: [], YouTube: [], Instagram: [], TikTok: [], Facebook: [], X: [], Threads: []
  };

  const platformImpactTotals: Record<PlatformName, number> = {
    Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
  };

  latestSnapshots.forEach(rec => {
    platformCounts[rec.plataforma] = (platformCounts[rec.plataforma] || 0) + 1;
    groupedResults[rec.plataforma].push(rec);

    const impact = Number(rec.metricas?.reproducciones || 0) + Number(rec.metricas?.alcance || 0);
    platformImpactTotals[rec.plataforma] += impact;
  });

  // Step 4: Final KPI summation strictly on latest snapshots
  const totalReproducciones = latestSnapshots.reduce((acc, item) => acc + Number(item.metricas?.reproducciones || 0), 0);
  const totalAlcance = latestSnapshots.reduce((acc, item) => acc + Number(item.metricas?.alcance || 0), 0);
  const totalImpactoCombinado = totalReproducciones + totalAlcance;
  const totalImpacts = totalImpactoCombinado;
  const totalInteractions = latestSnapshots.reduce((acc, item) => acc + Number(item.metricas?.interacciones || 0), 0);
  const totalSaves = latestSnapshots.reduce((acc, r) => acc + Number(r.metricas?.guardados || 0), 0);
  const totalClicks = latestSnapshots.reduce((acc, r) => acc + Number(r.metricas?.clics || 0), 0);

  // Platform with highest volume of reproducciones / streams among latest snapshots
  const platformReproduccionesTotals: Record<PlatformName, number> = {
    Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
  };
  latestSnapshots.forEach(rec => {
    platformReproduccionesTotals[rec.plataforma] += Number(rec.metricas?.reproducciones || 0);
  });
  const sortedByReproducciones = (Object.entries(platformReproduccionesTotals) as [PlatformName, number][])
    .sort((a, b) => b[1] - a[1]);
  const sortedPlatforms = (Object.entries(platformImpactTotals) as [PlatformName, number][])
    .sort((a, b) => b[1] - a[1]);
  const topPlatform: PlatformName = sortedByReproducciones[0] && sortedByReproducciones[0][1] > 0 
    ? sortedByReproducciones[0][0] 
    : (sortedPlatforms[0] && sortedPlatforms[0][1] > 0 ? sortedPlatforms[0][0] : 'Spotify');

  // Global Benchmark Totals across all master records (deduplicated to latest snapshots for fair benchmark)
  const globalLatestSnapshots = getLatestSnapshotsByItem(records);
  const globalPlatformImpactTotals: Record<PlatformName, number> = {
    Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
  };
  const globalPlatformInteractionTotals: Record<PlatformName, number> = {
    Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
  };
  const globalPlatformCounts: Record<PlatformName, number> = {
    Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
  };

  let globalBenchmarkImpact = 0;
  let globalInteractions = 0;

  globalLatestSnapshots.forEach(rec => {
    const impact = Number(rec.metricas?.reproducciones || 0) + Number(rec.metricas?.alcance || 0);
    const interactions = Number(rec.metricas?.interacciones || 0);

    globalPlatformImpactTotals[rec.plataforma] += impact;
    globalPlatformInteractionTotals[rec.plataforma] += interactions;
    globalPlatformCounts[rec.plataforma] += 1;

    globalBenchmarkImpact += impact;
    globalInteractions += interactions;
  });

  // Calculate Share of Voice (%)
  const shareOfVoice = globalBenchmarkImpact > 0
    ? Number(((totalImpacts / globalBenchmarkImpact) * 100).toFixed(1))
    : 0;

  const interactionsShare = globalInteractions > 0
    ? Number(((totalInteractions / globalInteractions) * 100).toFixed(1))
    : 0;

  // Platform by Platform Dual Metrics
  const platformBreakdowns: Record<PlatformName, PlatformDualMetric> = {
    Spotify: {
      filteredImpact: platformImpactTotals.Spotify,
      globalImpact: globalPlatformImpactTotals.Spotify,
      sharePercent: globalPlatformImpactTotals.Spotify > 0 
        ? Number(((platformImpactTotals.Spotify / globalPlatformImpactTotals.Spotify) * 100).toFixed(1))
        : 0,
      filteredInteractions: latestSnapshots.filter(r => r.plataforma === 'Spotify').reduce((a, r) => a + Number(r.metricas?.interacciones || 0), 0),
      globalInteractions: globalPlatformInteractionTotals.Spotify,
      filteredCount: platformCounts.Spotify,
      globalCount: globalPlatformCounts.Spotify
    },
    YouTube: {
      filteredImpact: platformImpactTotals.YouTube,
      globalImpact: globalPlatformImpactTotals.YouTube,
      sharePercent: globalPlatformImpactTotals.YouTube > 0 
        ? Number(((platformImpactTotals.YouTube / globalPlatformImpactTotals.YouTube) * 100).toFixed(1))
        : 0,
      filteredInteractions: latestSnapshots.filter(r => r.plataforma === 'YouTube').reduce((a, r) => a + Number(r.metricas?.interacciones || 0), 0),
      globalInteractions: globalPlatformInteractionTotals.YouTube,
      filteredCount: platformCounts.YouTube,
      globalCount: globalPlatformCounts.YouTube
    },
    Instagram: {
      filteredImpact: platformImpactTotals.Instagram,
      globalImpact: globalPlatformImpactTotals.Instagram,
      sharePercent: globalPlatformImpactTotals.Instagram > 0 
        ? Number(((platformImpactTotals.Instagram / globalPlatformImpactTotals.Instagram) * 100).toFixed(1))
        : 0,
      filteredInteractions: latestSnapshots.filter(r => r.plataforma === 'Instagram').reduce((a, r) => a + Number(r.metricas?.interacciones || 0), 0),
      globalInteractions: globalPlatformInteractionTotals.Instagram,
      filteredCount: platformCounts.Instagram,
      globalCount: globalPlatformCounts.Instagram
    },
    TikTok: {
      filteredImpact: platformImpactTotals.TikTok,
      globalImpact: globalPlatformImpactTotals.TikTok,
      sharePercent: globalPlatformImpactTotals.TikTok > 0 
        ? Number(((platformImpactTotals.TikTok / globalPlatformImpactTotals.TikTok) * 100).toFixed(1))
        : 0,
      filteredInteractions: latestSnapshots.filter(r => r.plataforma === 'TikTok').reduce((a, r) => a + Number(r.metricas?.interacciones || 0), 0),
      globalInteractions: globalPlatformInteractionTotals.TikTok,
      filteredCount: platformCounts.TikTok,
      globalCount: globalPlatformCounts.TikTok
    },
    Facebook: {
      filteredImpact: platformImpactTotals.Facebook,
      globalImpact: globalPlatformImpactTotals.Facebook,
      sharePercent: globalPlatformImpactTotals.Facebook > 0 
        ? Number(((platformImpactTotals.Facebook / globalPlatformImpactTotals.Facebook) * 100).toFixed(1))
        : 0,
      filteredInteractions: latestSnapshots.filter(r => r.plataforma === 'Facebook').reduce((a, r) => a + Number(r.metricas?.interacciones || 0), 0),
      globalInteractions: globalPlatformInteractionTotals.Facebook,
      filteredCount: platformCounts.Facebook,
      globalCount: globalPlatformCounts.Facebook
    },
    X: {
      filteredImpact: platformImpactTotals.X,
      globalImpact: globalPlatformImpactTotals.X,
      sharePercent: globalPlatformImpactTotals.X > 0 
        ? Number(((platformImpactTotals.X / globalPlatformImpactTotals.X) * 100).toFixed(1))
        : 0,
      filteredInteractions: latestSnapshots.filter(r => r.plataforma === 'X').reduce((a, r) => a + Number(r.metricas?.interacciones || 0), 0),
      globalInteractions: globalPlatformInteractionTotals.X,
      filteredCount: platformCounts.X,
      globalCount: globalPlatformCounts.X
    },
    Threads: {
      filteredImpact: platformImpactTotals.Threads,
      globalImpact: globalPlatformImpactTotals.Threads,
      sharePercent: globalPlatformImpactTotals.Threads > 0 
        ? Number(((platformImpactTotals.Threads / globalPlatformImpactTotals.Threads) * 100).toFixed(1))
        : 0,
      filteredInteractions: latestSnapshots.filter(r => r.plataforma === 'Threads').reduce((a, r) => a + Number(r.metricas?.interacciones || 0), 0),
      globalInteractions: globalPlatformInteractionTotals.Threads,
      filteredCount: platformCounts.Threads,
      globalCount: globalPlatformCounts.Threads
    }
  };

  const dualMetrics: DualMetricsCalculation = {
    filteredImpact: totalImpacts,
    globalBenchmarkImpact,
    shareOfVoice,
    filteredInteractions: totalInteractions,
    globalInteractions,
    interactionsShare,
    platformBreakdowns
  };

  return {
    query: rawQuery,
    totalResults: latestSnapshots.length,
    totalImpacts,
    totalReproducciones,
    totalAlcance,
    totalImpactoCombinado,
    totalInteractions,
    totalSaves,
    totalClicks,
    topPlatform,
    platformCounts,
    groupedResults,
    allResults: latestSnapshots,
    latestSnapshots,
    allHistoryRecords: matchedRecords,
    hasMultipleSnapshots,
    dualMetrics
  };
};
