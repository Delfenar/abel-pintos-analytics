import { GlobalOverviewData, PlatformData, CampaignId, DateRangeKey } from '../types/analytics';

export const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzvs1Dp6NiVcAEoQVDFIlY-9ON08PLXUnXhXuAV4iiJSISLbW1boMxSZRQCc4vo_0pp/exec';

export interface SyncPayload {
  timestamp: string;
  artist: string;
  activeCampaign: string;
  dateRange: string;
  totalCommunity: number;
  totalReach: number;
  totalImpressions: number;
  avgEngagementRate: number;
  totalFollowers: number;
  platforms: Record<string, {
    handle: string;
    followersOrAudience: string;
    reachOrViews: number;
    engagement: number;
  }>;
}

export const sendMetricsToGoogleSheets = async (
  overview: GlobalOverviewData,
  platformDataMap: Record<string, PlatformData>,
  activeCampaign: CampaignId,
  dateRange: DateRangeKey
): Promise<boolean> => {
  try {
    const platformSummaries: Record<string, any> = {};

    Object.entries(platformDataMap).forEach(([key, p]) => {
      const mainReachKey = p.metrics.reach ? 'reach' : p.metrics.totalReach ? 'totalReach' : p.metrics.videoViews ? 'videoViews' : p.metrics.impressions ? 'impressions' : p.metrics.views ? 'views' : 'listeners';
      
      platformSummaries[key] = {
        name: p.name,
        handle: p.handle,
        audience: p.officialAudience,
        mainMetricValue: p.metrics[mainReachKey]?.value || 0,
        kpiValue: Object.values(p.kpis)[0]?.value || 0,
      };
    });

    const payload: SyncPayload = {
      timestamp: new Date().toISOString(),
      artist: 'Abel Pintos',
      activeCampaign,
      dateRange,
      totalCommunity: overview.totalCommunity,
      totalReach: overview.totalReach.value,
      totalImpressions: overview.totalImpressions.value,
      avgEngagementRate: overview.avgEngagementRate.value,
      totalFollowers: overview.totalFollowers.value,
      platforms: platformSummaries,
    };

    // Google Apps Script redirect mode no-cors post request
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error('Error sending metrics to Google Sheets Webhook:', error);
    return false;
  }
};
