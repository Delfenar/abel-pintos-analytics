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

export interface UniversalSearchAggregation {
  query: string;
  totalResults: number;
  totalImpacts: number; // Reproducciones + Alcance
  totalInteractions: number; // Interacciones
  totalSaves: number; // Guardados
  totalClicks: number; // Clics
  topPlatform: PlatformName;
  platformCounts: Record<PlatformName, number>;
  groupedResults: Record<PlatformName, UniversalRecord[]>;
  allResults: UniversalRecord[];
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

// Universal Relational Search Engine with Strict Filtering
export const searchUniversalRecords = (
  rawQuery: string,
  records: UniversalRecord[] = MASTER_INDEXABLE_RECORDS
): UniversalSearchAggregation => {
  const query = normalizeSearchQuery(rawQuery);

  // If query is empty, return empty summary
  if (!query) {
    const emptyCounts: Record<PlatformName, number> = {
      Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
    };
    const emptyGrouped: Record<PlatformName, UniversalRecord[]> = {
      Spotify: [], YouTube: [], Instagram: [], TikTok: [], Facebook: [], X: [], Threads: []
    };

    return {
      query: '',
      totalResults: 0,
      totalImpacts: 0,
      totalInteractions: 0,
      totalSaves: 0,
      totalClicks: 0,
      topPlatform: 'Spotify',
      platformCounts: emptyCounts,
      groupedResults: emptyGrouped,
      allResults: []
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

  // Perform Strict Filtering
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

  // Calculate Aggregations strictly on matched records
  const platformCounts: Record<PlatformName, number> = {
    Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
  };
  const groupedResults: Record<PlatformName, UniversalRecord[]> = {
    Spotify: [], YouTube: [], Instagram: [], TikTok: [], Facebook: [], X: [], Threads: []
  };

  let totalImpacts = 0;
  let totalInteractions = 0;
  let totalSaves = 0;
  let totalClicks = 0;

  const platformImpactTotals: Record<PlatformName, number> = {
    Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
  };

  matchedRecords.forEach(rec => {
    platformCounts[rec.plataforma] = (platformCounts[rec.plataforma] || 0) + 1;
    groupedResults[rec.plataforma].push(rec);

    const impact = rec.metricas.reproducciones + rec.metricas.alcance;
    totalImpacts += impact;
    totalInteractions += rec.metricas.interacciones;
    totalSaves += rec.metricas.guardados;
    totalClicks += rec.metricas.clics;

    platformImpactTotals[rec.plataforma] += impact;
  });

  const sortedPlatforms = (Object.entries(platformImpactTotals) as [PlatformName, number][])
    .sort((a, b) => b[1] - a[1]);
  const topPlatform: PlatformName = sortedPlatforms[0] && sortedPlatforms[0][1] > 0 ? sortedPlatforms[0][0] : 'Spotify';

  return {
    query: rawQuery,
    totalResults: matchedRecords.length,
    totalImpacts,
    totalInteractions,
    totalSaves,
    totalClicks,
    topPlatform,
    platformCounts,
    groupedResults,
    allResults: matchedRecords
  };
};
