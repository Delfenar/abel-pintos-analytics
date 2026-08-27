export type PlatformId = 'overview' | 'instagram' | 'threads' | 'tiktok' | 'facebook' | 'twitter' | 'youtube' | 'spotify' | 'simulator';

export type DateRangeKey = '7d' | '28d' | '90d' | '1y' | 'custom';

export type ComparisonMode = 'wow' | 'mom' | 'yoy';

export type CustomComparisonType = 'previous_period' | 'year_ago' | 'custom_range';

export type DisplayValueType = 'percentage' | 'absolute';

export type CampaignId = string;

export type CampaignEventType = 'tour' | 'release' | 'merch' | 'press';

export interface CampaignFilter {
  id: CampaignId;
  label: string;
  description: string;
  badge: string;
  type: CampaignEventType;
  startDate: string;
  endDate: string;
  year: number;
  city?: string;
  targetStreams?: number;
  targetTickets?: number;
  targetReach?: number;
  isUserCreated?: boolean;
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  category: string;
  color: string;
}

export interface CustomThresholds {
  positiveThreshold: number; // e.g. 5 for +5%
  negativeThreshold: number; // e.g. -10 for -10%
  ignoreNoise: boolean;
}

export interface ComparisonSettings {
  comparisonType: CustomComparisonType;
  customCompStartDate: string;
  customCompEndDate: string;
  displayValueType: DisplayValueType;
  thresholds: CustomThresholds;
  pinnedMetrics: Record<string, boolean>;
  showMilestones: boolean;
}

export interface MetricItem {
  id: string;
  label: string;
  value: number;
  previousWeekValue: number;
  previousMonthValue: number;
  previousYearValue: number;
  previousValue?: number;
  unit?: string;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'percent' | 'currency' | 'duration';
  description?: string;
  sparkline: number[];
  comparisonSparkline?: number[];
  isPinned?: boolean;
}

export interface KPIItem {
  id: string;
  label: string;
  value: number;
  previousWeekValue: number;
  previousMonthValue: number;
  previousYearValue: number;
  previousValue?: number;
  unit: string;
  prefix?: string;
  suffix?: string;
  target?: number;
  description: string;
  status: 'excellent' | 'good' | 'average' | 'needs_improvement';
  isPinned?: boolean;
}

export interface TimeSeriesPoint {
  date: string;
  current: number;
  comparison: number;
  milestone?: string;
  [key: string]: string | number | undefined;
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
  milestones: Milestone[];
}

export interface ApiPayloadSample {
  platform: PlatformId;
  endpoint: string;
  timestamp: string;
  status: number;
  payload: Record<string, any>;
}
