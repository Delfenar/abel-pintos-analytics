import { GlobalOverviewData, PlatformData, CampaignId, DateRangeKey, CampaignFilter } from '../types/analytics';

export const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzvs1Dp6NiVcAEoQVDFIlY-9ON08PLXUnXhXuAV4iiJSISLbW1boMxSZRQCc4vo_0pp/exec';

export interface GoogleSheetsRow {
  fecha: string;
  anio: number;
  mes: string;
  campania: string;
  plataforma: string;
  metrica: string;
  valorActual: number;
  unidad: string;
  valorAnterior: number;
  variacionPorcentual: string;
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

    const rows: GoogleSheetsRow[] = [];

    const platformNameMap: Record<string, string> = {
      spotify: 'Spotify',
      instagram: 'Instagram',
      youtube: 'YouTube',
      facebook: 'Facebook',
      twitter: 'Twitter',
      tiktok: 'TikTok',
      threads: 'Threads'
    };

    // Iterate through all platforms and compile metric rows
    Object.entries(platformDataMap).forEach(([platKey, platData]) => {
      const platName = platformNameMap[platKey] || platData.name;

      // 1. Core Metrics
      Object.values(platData.metrics).forEach((metric) => {
        const valCur = Number(metric.value) || 0;
        const valPrev = Number(metric.previousMonthValue ?? metric.previousWeekValue ?? metric.previousValue) || 0;
        
        let variacionPorcentual = 'N/A';
        let diff = 0;

        if (valPrev > 0) {
          diff = ((valCur - valPrev) / valPrev) * 100;
          variacionPorcentual = `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}%`;
        } else {
          variacionPorcentual = 'N/A';
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
          variacionPorcentual: variacionPorcentual,
          estadoKpi: estadoKpi
        });
      });

      // 2. KPIs
      Object.values(platData.kpis).forEach((kpi) => {
        const valCur = Number(kpi.value) || 0;
        const valPrev = Number(kpi.previousMonthValue ?? kpi.previousWeekValue ?? kpi.previousValue) || 0;
        
        let variacionPorcentual = 'N/A';
        let diff = 0;

        if (valPrev > 0) {
          diff = ((valCur - valPrev) / valPrev) * 100;
          variacionPorcentual = `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}%`;
        } else {
          variacionPorcentual = 'N/A';
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
          variacionPorcentual: variacionPorcentual,
          estadoKpi: estadoKpi
        });
      });
    });

    // 3. Print final array payload in browser console before fetch
    console.log('[GoogleSheetsSync] Arreglo final de métricas a enviar a Google Sheets:', rows);

    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(rows),
    });

    return true;
  } catch (error) {
    console.error('Error sending metric rows to Google Sheets Webhook:', error);
    return false;
  }
};
