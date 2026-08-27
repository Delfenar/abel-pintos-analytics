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
    const today = new Date(2026, 7, 27); // 2026-08-27
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

      // 1. Iterate through core metrics
      Object.values(platData.metrics).forEach((metric) => {
        const valCur = metric.value || 0;
        const valPrev = metric.previousMonthValue ?? metric.previousWeekValue ?? 0;
        
        let pct = 0;
        if (valPrev > 0) {
          pct = ((valCur - valPrev) / valPrev) * 100;
        }

        const varStr = `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;

        let kpiStatus = 'Neutro';
        if (pct >= 5) {
          kpiStatus = 'Superado';
        } else if (pct <= -5) {
          kpiStatus = 'En progreso';
        } else {
          kpiStatus = 'Neutro';
        }

        let unitStr = metric.unit || 'Unidades';
        if (metric.format === 'percent') unitStr = '%';
        else if (metric.format === 'currency') fillCurrencyUnit: unitStr = 'USD';
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
          valorActual: valCur,
          unidad: unitStr,
          valorAnterior: valPrev,
          variacionPorcentual: varStr,
          estadoKpi: kpiStatus
        });
      });

      // 2. Iterate through KPIs
      Object.values(platData.kpis).forEach((kpi) => {
        const valCur = kpi.value || 0;
        const valPrev = kpi.previousMonthValue ?? kpi.previousWeekValue ?? 0;
        
        let pct = 0;
        if (valPrev > 0) {
          pct = ((valCur - valPrev) / valPrev) * 100;
        }

        const varStr = `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;

        let kpiStatus = 'Neutro';
        if (kpi.status === 'excellent' || pct >= 5) {
          kpiStatus = 'Superado';
        } else if (kpi.status === 'good' || kpi.status === 'average') {
          kpiStatus = 'En progreso';
        } else {
          kpiStatus = 'Neutro';
        }

        rows.push({
          fecha: fechaStr,
          anio: anioNum,
          mes: mesStr,
          campania: campaniaLabel,
          plataforma: platName,
          metrica: kpi.label,
          valorActual: valCur,
          unidad: kpi.unit || '%',
          valorAnterior: valPrev,
          variacionPorcentual: varStr,
          estadoKpi: kpiStatus
        });
      });
    });

    // Send array serialized with JSON.stringify(rows) using text/plain;charset=utf-8 to avoid CORS preflight
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
