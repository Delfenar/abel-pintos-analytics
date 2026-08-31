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

// Master Indexable Universal Dataset for Abel Pintos
export const MASTER_INDEXABLE_RECORDS: UniversalRecord[] = [
  // --- SPOTIFY ---
  {
    id: 'sp-rec-1',
    fecha: '2026-08-25',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Oncemil',
    descripcion: 'Single principal y tema insignia de Abel Pintos. Top 1 en reproducciones de Spotify Argentina.',
    campania: 'Lanzamiento Álbum 11',
    album: '11',
    ciudad: 'Buenos Aires',
    tags: ['Oncemil', 'Single', 'Top 1', 'Populares', 'Álbum 11', 'Streaming 2026'],
    metricas: { reproducciones: 6200000, alcance: 4420000, impresiones: 8900000, interacciones: 720000, guardados: 540000, clics: 120000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },
  {
    id: 'sp-rec-2',
    fecha: '2026-08-20',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Motivos',
    descripcion: 'Clásico indiscutido y uno de los momentos cumbres de cada recital en vivo de la Gira 30 Años.',
    campania: 'Gira 30 Años',
    album: 'Único',
    ciudad: 'Rosario',
    tags: ['Motivos', 'Clásico', 'En Vivo', 'Gira 30 Años', 'Rosario', 'Populares'],
    metricas: { reproducciones: 4800000, alcance: 3850000, impresiones: 6700000, interacciones: 580000, guardados: 410000, clics: 95000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },
  {
    id: 'sp-rec-3',
    fecha: '2026-08-15',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Sin Principio Ni Final',
    descripcion: 'Balada romántica icónica coreada por millones en estadios y teatros de todo el país.',
    campania: 'Gira 30 Años',
    album: 'Sueño Dorado',
    ciudad: 'Buenos Aires',
    tags: ['Sin Principio Ni Final', 'Balada', 'Romántico', 'Luna Park', 'Sueño Dorado', 'Buenos Aires'],
    metricas: { reproducciones: 4100000, alcance: 3400000, impresiones: 5800000, interacciones: 490000, guardados: 380000, clics: 82000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },
  {
    id: 'sp-rec-4',
    fecha: '2026-08-10',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Piedra Libre',
    descripcion: 'Emotivo single dedicado a la paternidad y familia con enorme tracción acústica.',
    campania: 'El Amor en Mi Vida',
    album: 'El Amor en Mi Vida',
    ciudad: 'Bahía Blanca',
    tags: ['Piedra Libre', 'Single', 'Familia', 'Acústico', 'El Amor en Mi Vida'],
    metricas: { reproducciones: 3400000, alcance: 2900000, impresiones: 4700000, interacciones: 390000, guardados: 290000, clics: 64000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },
  {
    id: 'sp-rec-5',
    fecha: '2026-08-01',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Alta en el Cielo',
    descripcion: 'Álbum patrio histórico grabado con la orquesta académica del Teatro Colón.',
    campania: 'Patria & Cultura',
    album: 'Alta en el Cielo',
    ciudad: 'Buenos Aires',
    tags: ['Alta en el Cielo', 'Álbum Patrio', 'Teatro Colón', 'Himnos', 'Cultura', 'Buenos Aires'],
    metricas: { reproducciones: 2900000, alcance: 2400000, impresiones: 3900000, interacciones: 340000, guardados: 240000, clics: 55000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },
  {
    id: 'sp-rec-6',
    fecha: '2026-08-28',
    plataforma: 'Spotify',
    tipoContenido: 'Canción',
    titulo: 'Ibuprofeno',
    descripcion: 'Nuevo single acústico reflexivo y adelanto del proyecto musical de la temporada 2026.',
    campania: 'Lanzamiento Single 2026',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Buenos Aires',
    tags: ['Ibuprofeno', 'Single', 'Lanzamiento', 'Agosto 2026', 'Inédito', 'Estreno'],
    metricas: { reproducciones: 1950000, alcance: 1650000, impresiones: 2800000, interacciones: 275000, guardados: 190000, clics: 89000 },
    enlacePublicacion: 'https://open.spotify.com/artist/AbelPintos'
  },

  // --- YOUTUBE ---
  {
    id: 'yt-rec-1',
    fecha: '2026-08-26',
    plataforma: 'YouTube',
    tipoContenido: 'Videoclip',
    titulo: 'Abel Pintos - Oncemil (Video Oficial)',
    descripcion: 'Videoclip oficial remasterizado en 4K. Más de 185 mil vistas diarias en YouTube.',
    campania: 'Lanzamiento Álbum 11',
    album: '11',
    ciudad: 'Buenos Aires',
    tags: ['Oncemil', 'Videoclip', '4K', 'YouTube', 'Oficial', 'Tendencias'],
    metricas: { reproducciones: 5200000, alcance: 3900000, impresiones: 7400000, interacciones: 480000, guardados: 180000, clics: 145000 },
    enlacePublicacion: 'https://youtube.com/@AbelPintos'
  },
  {
    id: 'yt-rec-2',
    fecha: '2026-08-22',
    plataforma: 'YouTube',
    tipoContenido: 'Videoclip',
    titulo: 'Abel Pintos - Motivos (En Vivo Teatro Ópera Buenos Aires)',
    descripcion: 'Concierto completo en vivo desde la icónica sala del Teatro Ópera de Buenos Aires.',
    campania: 'Gira 30 Años',
    album: 'Único',
    ciudad: 'Buenos Aires',
    tags: ['Motivos', 'En Vivo', 'Teatro Ópera', 'Buenos Aires', 'Gira 30 Años', 'Concierto'],
    metricas: { reproducciones: 3800000, alcance: 2950000, impresiones: 5300000, interacciones: 340000, guardados: 140000, clics: 98000 },
    enlacePublicacion: 'https://youtube.com/@AbelPintos'
  },
  {
    id: 'yt-rec-3',
    fecha: '2026-08-18',
    plataforma: 'YouTube',
    tipoContenido: 'Videoclip',
    titulo: 'Abel Pintos - Sin Principio Ni Final (Video Oficial)',
    descripcion: 'Video oficial de la balada más aclamada con millones de reproducciones acumuladas.',
    campania: 'Gira 30 Años',
    album: 'Sueño Dorado',
    ciudad: 'Buenos Aires',
    tags: ['Sin Principio Ni Final', 'Videoclip', 'Balada', 'Sueño Dorado', 'Oficial'],
    metricas: { reproducciones: 3100000, alcance: 2500000, impresiones: 4500000, interacciones: 290000, guardados: 120000, clics: 75000 },
    enlacePublicacion: 'https://youtube.com/@AbelPintos'
  },
  {
    id: 'yt-rec-4',
    fecha: '2026-08-27',
    plataforma: 'YouTube',
    tipoContenido: 'Videoclip',
    titulo: 'Abel Pintos - Ibuprofeno (Sesión Acústica Exclusiva)',
    descripcion: 'Presentación en vivo del nuevo tema "Ibuprofeno" con arreglos acústicos y piano.',
    campania: 'Lanzamiento Single 2026',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Rosario',
    tags: ['Ibuprofeno', 'Acústico', 'Estreno', 'Sesión En Vivo', 'Rosario', 'Agosto 2026'],
    metricas: { reproducciones: 1650000, alcance: 1420000, impresiones: 2400000, interacciones: 195000, guardados: 98000, clics: 68000 },
    enlacePublicacion: 'https://youtube.com/@AbelPintos'
  },

  // --- INSTAGRAM ---
  {
    id: 'ig-rec-1',
    fecha: '2026-08-29',
    plataforma: 'Instagram',
    tipoContenido: 'Reel',
    titulo: '✨ GIRA 30 ANIVERSARIO: ¡Nuevas fechas Buenos Aires & Rosario!',
    descripcion: 'Reel oficial anunciando las nuevas funciones masivas en Buenos Aires y Rosario con localidades agotadas.',
    campania: 'Gira 30 Años',
    album: 'Gira 30 Aniversario',
    ciudad: 'Buenos Aires',
    tags: ['Gira 30 Años', 'Buenos Aires', 'Rosario', 'Entradas', 'Sold Out', 'Reel'],
    metricas: { reproducciones: 1850000, alcance: 2550000, impresiones: 3800000, interacciones: 310000, guardados: 89000, clics: 142000 },
    enlacePublicacion: 'https://instagram.com/abelpintos'
  },
  {
    id: 'ig-rec-2',
    fecha: '2026-08-24',
    plataforma: 'Instagram',
    tipoContenido: 'Post',
    titulo: '📖 Presentación del Libro Conmemorativo con fotos inéditas',
    descripcion: 'Carrusel fotográfico con el detrás de escena y primeras páginas del libro conmemorativo oficial.',
    campania: 'Libro Conmemorativo',
    album: 'Libro 30 Años',
    ciudad: 'Buenos Aires',
    tags: ['Libro Conmemorativo', 'Fotos Inéditas', 'Merchandising', 'Historia', 'Buenos Aires'],
    metricas: { reproducciones: 1420000, alcance: 1980000, impresiones: 2900000, interacciones: 210000, guardados: 74000, clics: 88000 },
    enlacePublicacion: 'https://instagram.com/abelpintos'
  },
  {
    id: 'ig-rec-3',
    fecha: '2026-08-21',
    plataforma: 'Instagram',
    tipoContenido: 'Reel',
    titulo: '🎤 Cantando "Motivos" a capella con el público en Rosario',
    descripcion: 'Momento mágico en el anfiteatro de Rosario con todo el público cantando el estribillo al unísono.',
    campania: 'Gira 30 Años',
    album: 'Único',
    ciudad: 'Rosario',
    tags: ['Motivos', 'Rosario', 'A Capella', 'Recital', 'Emoción', 'Viral'],
    metricas: { reproducciones: 1280000, alcance: 1750000, impresiones: 2600000, interacciones: 195000, guardados: 62000, clics: 45000 },
    enlacePublicacion: 'https://instagram.com/abelpintos'
  },
  {
    id: 'ig-rec-4',
    fecha: '2026-08-27',
    plataforma: 'Instagram',
    tipoContenido: 'Reel',
    titulo: '🎶 Ensayo general: "Ibuprofeno" y "Oncemil" en camerinos',
    descripcion: 'Backstage íntimo repasando acordes antes del show.',
    campania: 'Lanzamiento Single 2026',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Córdoba',
    tags: ['Ibuprofeno', 'Oncemil', 'Ensayo', 'Córdoba', 'Backstage', 'Reel'],
    metricas: { reproducciones: 1150000, alcance: 1520000, impresiones: 2300000, interacciones: 178000, guardados: 58000, clics: 42000 },
    enlacePublicacion: 'https://instagram.com/abelpintos'
  },

  // --- TIKTOK ---
  {
    id: 'tk-rec-1',
    fecha: '2026-08-28',
    plataforma: 'TikTok',
    tipoContenido: 'TikTok',
    titulo: 'Cantando "Motivos" acústico antes de salir al escenario 🎸',
    descripcion: 'Video acústico exclusivo en TikTok con récord de reproducciones y compartidos de fans.',
    campania: 'Gira 30 Años',
    album: 'Único',
    ciudad: 'Buenos Aires',
    tags: ['Motivos', 'Acústico', 'TikTok', 'Viral', 'Guitarra', 'Gira 30 Años'],
    metricas: { reproducciones: 2850000, alcance: 2100000, impresiones: 4200000, interacciones: 510000, guardados: 145000, clics: 78000 },
    enlacePublicacion: 'https://tiktok.com/@abel.pintos.musica'
  },
  {
    id: 'tk-rec-2',
    fecha: '2026-08-25',
    plataforma: 'TikTok',
    tipoContenido: 'TikTok',
    titulo: 'Momento íntimo cantando "Oncemil" con el público en Rosario ❤️',
    descripcion: 'Registro en primera persona de la ovación en el concierto de Rosario.',
    campania: 'Gira 30 Años',
    album: '11',
    ciudad: 'Rosario',
    tags: ['Oncemil', 'Rosario', 'Concierto', 'Emotivo', 'TikTok', 'Abel'],
    metricas: { reproducciones: 2450000, alcance: 1850000, impresiones: 3700000, interacciones: 440000, guardados: 118000, clics: 62000 },
    enlacePublicacion: 'https://tiktok.com/@abel.pintos.musica'
  },
  {
    id: 'tk-rec-3',
    fecha: '2026-08-27',
    plataforma: 'TikTok',
    tipoContenido: 'TikTok',
    titulo: 'Descubriendo la letra de "Ibuprofeno": ¿Ya la escuchaste? 🎵',
    descripcion: 'Fragmento de la nueva canción compartida con la comunidad de TikTok.',
    campania: 'Lanzamiento Single 2026',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Buenos Aires',
    tags: ['Ibuprofeno', 'Estreno', 'Música Nueva', 'Single', 'Agosto 2026'],
    metricas: { reproducciones: 1980000, alcance: 1450000, impresiones: 2900000, interacciones: 345000, guardados: 94000, clics: 51000 },
    enlacePublicacion: 'https://tiktok.com/@abel.pintos.musica'
  },

  // --- FACEBOOK ---
  {
    id: 'fb-rec-1',
    fecha: '2026-08-28',
    plataforma: 'Facebook',
    tipoContenido: 'Post',
    titulo: '🎫 ¡Entradas a la venta para los shows de Buenos Aires & Rosario! (Gira 30 Años)',
    descripcion: 'Enlace oficial a boletería para los conciertos en Teatro Ópera, Luna Park y Rosario.',
    campania: 'Gira 30 Años',
    album: 'Gira 30 Aniversario',
    ciudad: 'Buenos Aires',
    tags: ['Gira 30 Años', 'Entradas', 'Buenos Aires', 'Rosario', 'Luna Park', 'Teatro Ópera'],
    metricas: { reproducciones: 2100000, alcance: 3100000, impresiones: 4500000, interacciones: 280000, guardados: 52000, clics: 185000 },
    enlacePublicacion: 'https://facebook.com/AbelPintosOficial'
  },
  {
    id: 'fb-rec-2',
    fecha: '2026-08-23',
    plataforma: 'Facebook',
    tipoContenido: 'Post',
    titulo: '🎧 Escuchá "Oncemil", "Motivos" y "Sin Principio Ni Final" en todas las plataformas',
    descripcion: 'Compilado especial de éxitos para revivir la discografía completa de Abel Pintos.',
    campania: 'Lanzamiento Álbum 11',
    album: '11',
    ciudad: 'Buenos Aires',
    tags: ['Oncemil', 'Motivos', 'Sin Principio Ni Final', 'Éxitos', 'Streaming'],
    metricas: { reproducciones: 1800000, alcance: 2450000, impresiones: 3800000, interacciones: 230000, guardados: 44000, clics: 125000 },
    enlacePublicacion: 'https://facebook.com/AbelPintosOficial'
  },
  {
    id: 'fb-rec-3',
    fecha: '2026-08-26',
    plataforma: 'Facebook',
    tipoContenido: 'Post',
    titulo: '🎵 Estreno: Presentamos "Ibuprofeno", nuestra nueva canción',
    descripcion: 'Mensaje especial para la comunidad de Facebook sobre el nuevo proceso creativo.',
    campania: 'Lanzamiento Single 2026',
    album: 'Nuevas Sesiones 2026',
    ciudad: 'Buenos Aires',
    tags: ['Ibuprofeno', 'Lanzamiento', 'Single', 'Comunidad', 'Agosto 2026'],
    metricas: { reproducciones: 1450000, alcance: 1950000, impresiones: 3100000, interacciones: 185000, guardados: 36000, clics: 92000 },
    enlacePublicacion: 'https://facebook.com/AbelPintosOficial'
  },

  // --- X (TWITTER) ---
  {
    id: 'tw-rec-1',
    fecha: '2026-08-30',
    plataforma: 'X',
    tipoContenido: 'Tweet',
    titulo: 'Nos vemos pronto en Buenos Aires y Rosario. ¡Gracias por estos 30 años juntos! ❤️',
    descripcion: 'Tweet oficial de agradecimiento con alta tasa de retweets y respuestas de la comunidad.',
    campania: 'Gira 30 Años',
    album: 'Gira 30 Aniversario',
    ciudad: 'Buenos Aires',
    tags: ['Gira 30 Años', 'Buenos Aires', 'Rosario', 'Agradecimiento', 'Tweet'],
    metricas: { reproducciones: 920000, alcance: 1700000, impresiones: 2400000, interacciones: 145000, guardados: 28000, clics: 68000 },
    enlacePublicacion: 'https://twitter.com/AbelPintos'
  },
  {
    id: 'tw-rec-2',
    fecha: '2026-08-27',
    plataforma: 'X',
    tipoContenido: 'Tweet',
    titulo: 'Cantando "Oncemil" e "Ibuprofeno" con ustedes en cada show de la Gira 30 Años 🎵',
    descripcion: 'Reflexión sobre el repertorio del nuevo tour y las canciones más pedidas.',
    campania: 'Gira 30 Años',
    album: '11',
    ciudad: 'Córdoba',
    tags: ['Oncemil', 'Ibuprofeno', 'Gira 30 Años', 'Córdoba', 'Música'],
    metricas: { reproducciones: 840000, alcance: 1420000, impresiones: 2100000, interacciones: 132000, guardados: 24000, clics: 54000 },
    enlacePublicacion: 'https://twitter.com/AbelPintos'
  },

  // --- THREADS ---
  {
    id: 'th-rec-1',
    fecha: '2026-08-28',
    plataforma: 'Threads',
    tipoContenido: 'Post',
    titulo: 'Reflexionando sobre 30 años de música. ¿Cuál fue la primera canción que escuchaste? 🧵',
    descripcion: 'Hilo de conversación abierto generando miles de respuestas de recuerdos de fans.',
    campania: 'Gira 30 Años',
    album: 'Gira 30 Aniversario',
    ciudad: 'Buenos Aires',
    tags: ['Gira 30 Años', 'Pregunta', 'Fans', 'Hilo', 'Recuerdos'],
    metricas: { reproducciones: 840000, alcance: 420000, impresiones: 1250000, interacciones: 128000, guardados: 19000, clics: 34000 },
    enlacePublicacion: 'https://threads.net/@abelpintos'
  },
  {
    id: 'th-rec-2',
    fecha: '2026-08-26',
    plataforma: 'Threads',
    tipoContenido: 'Post',
    titulo: 'El significado detrás de "Sin Principio Ni Final", "Oncemil" e "Ibuprofeno" ❤️',
    descripcion: 'Hilo detallando la inspiración compositiva detrás de las canciones más queridas.',
    campania: 'Lanzamiento Álbum 11',
    album: '11',
    ciudad: 'Buenos Aires',
    tags: ['Sin Principio Ni Final', 'Oncemil', 'Ibuprofeno', 'Composición', 'Inspiración'],
    metricas: { reproducciones: 790000, alcance: 380000, impresiones: 1100000, interacciones: 118000, guardados: 17500, clics: 29000 },
    enlacePublicacion: 'https://threads.net/@abelpintos'
  }
];

// Normalize helper: removes slashes, hashtags, accents, and extra whitespace
export const normalizeSearchQuery = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[/#]/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics / accents
    .trim()
    .replace(/\s+/g, ' ');
};

// Universal Relational Search Logic
export const searchUniversalRecords = (
  rawQuery: string,
  records: UniversalRecord[] = MASTER_INDEXABLE_RECORDS
): UniversalSearchAggregation => {
  const query = normalizeSearchQuery(rawQuery);

  if (!query) {
    const emptyCounts: Record<PlatformName, number> = {
      Spotify: 0, YouTube: 0, Instagram: 0, TikTok: 0, Facebook: 0, X: 0, Threads: 0
    };
    const emptyGrouped: Record<PlatformName, UniversalRecord[]> = {
      Spotify: [], YouTube: [], Instagram: [], TikTok: [], Facebook: [], X: [], Threads: []
    };

    records.forEach(r => {
      emptyCounts[r.plataforma] = (emptyCounts[r.plataforma] || 0) + 1;
      emptyGrouped[r.plataforma].push(r);
    });

    const totalImpacts = records.reduce((acc, r) => acc + r.metricas.reproducciones + r.metricas.alcance, 0);
    const totalInteractions = records.reduce((acc, r) => acc + r.metricas.interacciones, 0);
    const totalSaves = records.reduce((acc, r) => acc + r.metricas.guardados, 0);
    const totalClicks = records.reduce((acc, r) => acc + r.metricas.clics, 0);

    return {
      query: '',
      totalResults: records.length,
      totalImpacts,
      totalInteractions,
      totalSaves,
      totalClicks,
      topPlatform: 'Spotify',
      platformCounts: emptyCounts,
      groupedResults: emptyGrouped,
      allResults: records
    };
  }

  // Multi-field search scoring
  const scoredRecords = records
    .map(record => {
      const normTitle = normalizeSearchQuery(record.titulo);
      const normDesc = normalizeSearchQuery(record.descripcion);
      const normCamp = normalizeSearchQuery(record.campania);
      const normAlbum = normalizeSearchQuery(record.album);
      const normCity = normalizeSearchQuery(record.ciudad);
      const normType = normalizeSearchQuery(record.tipoContenido);
      const normPlat = normalizeSearchQuery(record.plataforma);
      const normTags = record.tags.map(t => normalizeSearchQuery(t));

      let score = 0;

      // Exact or partial tag match
      if (normTags.some(t => t === query)) score += 50;
      else if (normTags.some(t => t.includes(query) || query.includes(t))) score += 30;

      // Title match
      if (normTitle === query) score += 40;
      else if (normTitle.includes(query)) score += 25;

      // Campaign & Album match
      if (normCamp.includes(query)) score += 20;
      if (normAlbum.includes(query)) score += 20;

      // City match
      if (normCity.includes(query)) score += 15;

      // Platform match
      if (normPlat === query || (query === 'twitter' && record.plataforma === 'X')) score += 25;

      // Content type & description match
      if (normType.includes(query)) score += 10;
      if (normDesc.includes(query)) score += 10;

      return {
        ...record,
        relevanceScore: score
      };
    })
    .filter(r => (r.relevanceScore || 0) > 0)
    .sort((a, b) => {
      if ((b.relevanceScore || 0) !== (a.relevanceScore || 0)) {
        return (b.relevanceScore || 0) - (a.relevanceScore || 0);
      }
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });

  // Calculate aggregations
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

  scoredRecords.forEach(rec => {
    platformCounts[rec.plataforma] = (platformCounts[rec.plataforma] || 0) + 1;
    groupedResults[rec.plataforma].push(rec);

    const impact = rec.metricas.reproducciones + rec.metricas.alcance;
    totalImpacts += impact;
    totalInteractions += rec.metricas.interacciones;
    totalSaves += rec.metricas.guardados;
    totalClicks += rec.metricas.clics;

    platformImpactTotals[rec.plataforma] += impact;
  });

  // Find top platform by impact
  const sortedPlatforms = (Object.entries(platformImpactTotals) as [PlatformName, number][])
    .sort((a, b) => b[1] - a[1]);
  const topPlatform: PlatformName = sortedPlatforms[0] && sortedPlatforms[0][1] > 0 ? sortedPlatforms[0][0] : 'Spotify';

  return {
    query: rawQuery,
    totalResults: scoredRecords.length,
    totalImpacts,
    totalInteractions,
    totalSaves,
    totalClicks,
    topPlatform,
    platformCounts,
    groupedResults,
    allResults: scoredRecords
  };
};
