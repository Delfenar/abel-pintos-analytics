import { GlobalOverviewData, PlatformData, CampaignId, DateRangeKey, CampaignFilter } from '../types/analytics';

export const GOOGLE_SHEETS_WEBHOOK_URL_V2 = 'https://script.google.com/macros/s/AKfycbwBHyzYzCpYlk6Moy_Yr6GfF3akREPpBKEZxuVlI88ujJAB9y5sBmu8FjdRGw1w7mit/exec';

export interface GoogleSheetsRowV2 {
  fecha: string;
  anio: number;
  mes: string;
  campania: string;
  plataforma: string;
  metrica: string;
  valorActual: number;
  unidad: string;
  valorAnterior: number;
  estadoKpi: string;
}

export const sendMetricsToGoogleSheets = async (
  overview: GlobalOverviewData,
  platformDataMap: Record<string, PlatformData>,
  activeCampaign: CampaignId,
  dateRange: DateRangeKey,
  campaigns: CampaignFilter[] = []
): Promise<boolean> => {
  try {
    const fechaStr = '2026-08-27';
    const anioNum = 2026;
    const mesStr = 'Agosto';

    const currentCampaign = campaigns.find(c => c.id === activeCampaign);
    const campaniaLabel = currentCampaign ? currentCampaign.label : (activeCampaign === 'all' ? 'General' : activeCampaign);

    const rows: GoogleSheetsRowV2[] = [];

    const platformNameMap: Record<string, string> = {
      spotify: 'Spotify',
      instagram: 'Instagram',
      youtube: 'YouTube',
      facebook: 'Facebook',
      twitter: 'Twitter',
      tiktok: 'TikTok',
      threads: 'Threads'
    };

    // Iterate through all platforms and compile metric rows (EXACT 10 KEYS, NO variacionPorcentual)
    Object.entries(platformDataMap).forEach(([platKey, platData]) => {
      const platName = platformNameMap[platKey] || platData.name;

      // 1. Core Metrics
      Object.values(platData.metrics).forEach((metric) => {
        const valCur = Number(metric.value) || 0;
        const valPrev = Number(metric.previousMonthValue ?? metric.previousWeekValue ?? metric.previousValue) || 0;
        
        let diff = 0;
        if (valPrev > 0) {
          diff = ((valCur - valPrev) / valPrev) * 100;
        }

        const estadoKpi = valPrev > 0 ? (diff >= 0 ? 'Superado' : 'En progreso') : 'Neutro';

        let unitStr = metric.unit || 'Unidades';
        if (metric.format === 'percent') unitStr = '%';
        else if (metric.format === 'currency') unitStr = 'USD';
        else if (metric.id.includes('follower') || metric.id.includes('sub')) unitStr = 'Seguidores';
        else if (metric.id.includes('reach')) unitStr = 'Cuentas';
        else if (metric.id.includes('view') || metric.id.includes('stream')) unitStr = 'Reproducciones';

        rows.push({
          fecha: fechaStr,
          anio: anioNum,
          mes: mesStr,
          campania: campaniaLabel,
          plataforma: platName,
          metrica: metric.label,
          valorActual: Number(valCur),
          unidad: unitStr,
          valorAnterior: Number(valPrev),
          estadoKpi: estadoKpi
        });
      });

      // 2. KPIs
      Object.values(platData.kpis).forEach((kpi) => {
        const valCur = Number(kpi.value) || 0;
        const valPrev = Number(kpi.previousMonthValue ?? kpi.previousWeekValue ?? kpi.previousValue) || 0;
        
        let diff = 0;
        if (valPrev > 0) {
          diff = ((valCur - valPrev) / valPrev) * 100;
        }

        const estadoKpi = valPrev > 0 ? (diff >= 0 ? 'Superado' : 'En progreso') : (kpi.status === 'excellent' ? 'Superado' : 'En progreso');

        rows.push({
          fecha: fechaStr,
          anio: anioNum,
          mes: mesStr,
          campania: campaniaLabel,
          plataforma: platName,
          metrica: kpi.label,
          valorActual: Number(valCur),
          unidad: kpi.unit || '%',
          valorAnterior: Number(valPrev),
          estadoKpi: estadoKpi
        });
      });
    });

    // Console verification log
    console.log('[GoogleSheetsSyncV2] Payload final v2 enviado a Webhook Google Apps Script (10 claves exactas, sin variacionPorcentual):', rows);

    await fetch(GOOGLE_SHEETS_WEBHOOK_URL_V2, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(rows),
    });

    return true;
  } catch (error) {
    console.error('Error sending metric rows to Google Sheets Webhook v2:', error);
    return false;
  }
};
