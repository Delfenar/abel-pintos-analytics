export type PlatformId = 'overview' | 'instagram' | 'threads' | 'tiktok' | 'facebook' | 'twitter' | 'youtube' | 'spotify' | 'simulator';

export type DateRangeKey = '7d' | '28d' | '90d' | 'custom';

export type CampaignId = 'all' | 'tour30' | 'album' | 'book';

export interface CampaignFilter {
  id: CampaignId;
  label: string;
  description: string;
  badge: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  unit?: string;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'percent' | 'currency' | 'duration';
  description?: string;
  sparkline: number[];
}

export interface KPIItem {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  unit: string;
  prefix?: string;
  suffix?: string;
  target?: number;
  description: string;
  status: 'excellent' | 'good' | 'average' | 'needs_improvement';
}

export interface TimeSeriesPoint {
  date: string;
  [key: string]: string | number;
}

export interface ContentItem {
  id: string;
  platform: PlatformId;
  title: string;
  type: string;
  campaignId?: CampaignId;
  publishedAt: string;
  thumbnail?: string;
  url?: string;
  metrics: {
    viewsOrReach: number;
    interactions: number;
    engagementRate: number;
    sharesOrReposts?: number;
    saves?: number;
    conversionRate?: number;
  };
}

export interface PlatformData {
  id: PlatformId;
  name: string;
  handle: string;
  officialAudience: string;
  iconName: string;
  brandColor: string;
  metrics: Record<string, MetricItem>;
  kpis: Record<string, KPIItem>;
  timeSeries: TimeSeriesPoint[];
  contentDistribution: { name: string; value: number; color: string }[];
  topContent: ContentItem[];
}

export interface GlobalOverviewData {
  totalCommunity: number;
  totalReach: MetricItem;
  totalImpressions: MetricItem;
  avgEngagementRate: KPIItem;
  totalFollowers: MetricItem;
  platformComparison: {
    platform: string;
    reach: number;
    engagement: number;
    conversion: number;
    followers: number;
  }[];
  multiPlatformTimeSeries: TimeSeriesPoint[];
}

export interface ApiPayloadSample {
  platform: PlatformId;
  endpoint: string;
  timestamp: string;
  status: number;
  payload: Record<string, any>;
}
