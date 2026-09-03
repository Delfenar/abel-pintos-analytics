import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  PlatformId, 
  DateRangeKey, 
  SingleDayCompType,
  ComparisonMode, 
  CustomComparisonType,
  DisplayValueType,
  CustomThresholds,
  CampaignId, 
  CampaignFilter,
  PlatformData, 
  GlobalOverviewData, 
  ApiPayloadSample 
} from '../types/analytics';
import { 
  getMockPlatformData, 
  getGlobalOverviewData, 
  getMockApiPayloads,
  loadCampaignsFromStorage,
  saveCampaignsToStorage,
  applyGlobalSearchFilter,
  GlobalSearchResult
} from '../services/mockDataService';
import { 
  searchUniversalRecords, 
  UniversalSearchAggregation, 
  MASTER_INDEXABLE_RECORDS,
  UniversalRecord,
  PlatformName,
  getConsolidatedMetrics,
  ConsolidatedMetrics,
  normalizeContentId
} from '../services/searchEngineService';
import { 
  sendMetricsToGoogleSheets, 
  fetchGoogleSheetsMetrics,
  fetchGoogleSheetsFullData,
  computeChannelAudienceMetrics,
  getAudienceEvolutionSeries,
  extractCampaignsFromRecords,
  ChannelAudienceMetric,
  AudienceRecord,
  AudienceEvolutionPoint
} from '../services/googleSheetsService';
import { ToastNotification, ToastState } from '../components/ui/ToastNotification';

interface DashboardContextType {
  activeView: PlatformId;
  setActiveView: (view: PlatformId) => void;
  dateRange: DateRangeKey;
  setDateRange: (range: DateRangeKey) => void;
  selectedSingleDay: string;
  setSelectedSingleDay: (day: string) => void;
  singleDayCompType: SingleDayCompType;
  setSingleDayCompType: (type: SingleDayCompType) => void;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
  goToToday: () => void;
  goToYesterday: () => void;
  goToLaunchDay: () => void;
  comparisonMode: ComparisonMode;
  setComparisonMode: (mode: ComparisonMode) => void;
  customComparisonType: CustomComparisonType;
  setCustomComparisonType: (type: CustomComparisonType) => void;
  activeCampaign: CampaignId;
  setActiveCampaign: (campaign: CampaignId) => void;
  consolidatedCampaignMetrics: ConsolidatedMetrics;
  campaigns: CampaignFilter[];
  addCampaign: (newCamp: CampaignFilter) => void;
  campaignSearchQuery: string;
  setCampaignSearchQuery: (query: string) => void;
  isCampaignModalOpen: boolean;
  setIsCampaignModalOpen: (open: boolean) => void;
  customStartDate: string;
  setCustomStartDate: (date: string) => void;
  customEndDate: string;
  setCustomEndDate: (date: string) => void;
  customCompStartDate: string;
  setCustomCompStartDate: (date: string) => void;
  customCompEndDate: string;
  setCustomCompEndDate: (date: string) => void;
  displayValueType: DisplayValueType;
  setDisplayValueType: (type: DisplayValueType) => void;
  customThresholds: CustomThresholds;
  setCustomThresholds: (thresholds: CustomThresholds) => void;
  showMilestones: boolean;
  setShowMilestones: (show: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
  pinnedMetrics: Record<string, boolean>;
  togglePinnedMetric: (id: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  platformDataMap: Record<string, PlatformData>;
  globalOverview: GlobalOverviewData;
  filteredPlatformDataMap: Record<string, PlatformData>;
  filteredOverview: GlobalOverviewData;
  matchedContentCount: number;
  hasMatches: boolean;
  universalSearchAggregation: UniversalSearchAggregation;
  apiSamples: ApiPayloadSample[];
  refreshData: () => void;
  isRefreshing: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSyncingSheets: boolean;
  syncWithGoogleSheets: () => Promise<void>;
  liveSheetsRecords: UniversalRecord[];
  liveAudienceRecords: AudienceRecord[];
  audienceEvolutionSeries: AudienceEvolutionPoint[];
  isLoadingSheets: boolean;
  loadLiveSheetsData: () => Promise<void>;
  channelAudienceMetrics: Record<PlatformName, ChannelAudienceMetric>;
  toast: ToastState | null;
  setToast: (toast: ToastState | null) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<PlatformId>('overview');
  const [dateRange, setDateRange] = useState<DateRangeKey>('28d');
  const [selectedSingleDay, setSelectedSingleDay] = useState<string>('2026-08-31');
  const [singleDayCompType, setSingleDayCompType] = useState<SingleDayCompType>('dod');

  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('mom');
  const [customComparisonType, setCustomComparisonType] = useState<CustomComparisonType>('previous_period');
  const [activeCampaign, setActiveCampaign] = useState<CampaignId>('all');

  const [campaigns, setCampaigns] = useState<CampaignFilter[]>(() => loadCampaignsFromStorage());
  const [campaignSearchQuery, setCampaignSearchQuery] = useState<string>('');
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState<boolean>(false);

  const [customStartDate, setCustomStartDate] = useState<string>('2026-08-01');
  const [customEndDate, setCustomEndDate] = useState<string>('2026-08-26');
  const [customCompStartDate, setCustomCompStartDate] = useState<string>('2026-07-05');
  const [customCompEndDate, setCustomCompEndDate] = useState<string>('2026-07-31');

  const [displayValueType, setDisplayValueType] = useState<DisplayValueType>('percentage');
  const [customThresholds, setCustomThresholds] = useState<CustomThresholds>({
    positiveThreshold: 5,
    negativeThreshold: -10,
    ignoreNoise: true,
  });

  const [showMilestones, setShowMilestones] = useState<boolean>(true);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [pinnedMetrics, setPinnedMetrics] = useState<Record<string, boolean>>({
    listeners: true,
    reach: true,
    totalReach: true,
    views: true,
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [liveSheetsRecords, setLiveSheetsRecords] = useState<UniversalRecord[]>([]);
  const [liveAudienceRecords, setLiveAudienceRecords] = useState<AudienceRecord[]>([]);
  const [isLoadingSheets, setIsLoadingSheets] = useState<boolean>(false);

  const [isSyncingSheets, setIsSyncingSheets] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Single Day Navigation Helpers
  const goToPreviousDay = () => {
    const current = new Date(selectedSingleDay + 'T12:00:00');
    current.setDate(current.getDate() - 1);
    const newDateStr = current.toISOString().split('T')[0];
    setSelectedSingleDay(newDateStr);
    setDateRange('1d');
  };

  const goToNextDay = () => {
    const current = new Date(selectedSingleDay + 'T12:00:00');
    current.setDate(current.getDate() + 1);
    const newDateStr = current.toISOString().split('T')[0];
    setSelectedSingleDay(newDateStr);
    setDateRange('1d');
  };

  const goToToday = () => {
    setSelectedSingleDay('2026-08-31');
    setDateRange('1d');
  };

  const goToYesterday = () => {
    setSelectedSingleDay('2026-08-30');
    setDateRange('1d');
  };

  const goToLaunchDay = () => {
    setSelectedSingleDay('2026-08-27');
    setDateRange('1d');
  };

  const addCampaign = (newCamp: CampaignFilter) => {
    setCampaigns(prev => {
      const exists = prev.some(c => c.id === newCamp.id);
      if (exists) return prev;
      const updated = [...prev, newCamp];
      saveCampaignsToStorage(updated);
      return updated;
    });
  };

  useEffect(() => {
    if (activeCampaign && activeCampaign !== 'all') {
      const selected = campaigns.find(c => c.id === activeCampaign);
      if (selected && selected.startDate && selected.endDate) {
        setDateRange('custom');
        setCustomStartDate(selected.startDate);
        setCustomEndDate(selected.endDate);
      }
    }
  }, [activeCampaign, campaigns]);

  const togglePinnedMetric = (id: string) => {
    setPinnedMetrics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [platformDataMap, setPlatformDataMap] = useState<Record<string, PlatformData>>(() => 
    getMockPlatformData(dateRange, activeCampaign, comparisonMode, customComparisonType)
  );
  const [globalOverview, setGlobalOverview] = useState<GlobalOverviewData>(() => 
    getGlobalOverviewData(dateRange, activeCampaign, comparisonMode, customComparisonType)
  );
  const [apiSamples, setApiSamples] = useState<ApiPayloadSample[]>(() => getMockApiPayloads());

  useEffect(() => {
    setPlatformDataMap(getMockPlatformData(dateRange, activeCampaign, comparisonMode, customComparisonType));
    setGlobalOverview(getGlobalOverviewData(dateRange, activeCampaign, comparisonMode, customComparisonType));
  }, [dateRange, activeCampaign, comparisonMode, customComparisonType]);

  // Multivariable Global Search Filtering Engine
  const searchResult: GlobalSearchResult = useMemo(() => {
    return applyGlobalSearchFilter(globalOverview, platformDataMap, searchQuery, activeCampaign, campaigns);
  }, [globalOverview, platformDataMap, searchQuery, activeCampaign, campaigns]);

  const loadLiveSheetsData = async () => {
    setIsLoadingSheets(true);
    try {
      const { metricRecords, audienceRecords } = await fetchGoogleSheetsFullData();
      if (metricRecords && metricRecords.length > 0) {
        setLiveSheetsRecords(metricRecords);
        const dynamicCampaigns = extractCampaignsFromRecords(metricRecords);
        setCampaigns(dynamicCampaigns);
      }
      if (audienceRecords && audienceRecords.length > 0) {
        setLiveAudienceRecords(audienceRecords);
      }
    } catch (e) {
      console.error('Error al obtener datos reales de Google Sheets:', e);
    } finally {
      setIsLoadingSheets(false);
    }
  };

  // Fetch real Google Sheets metrics on mount and clean up old local storage caches
  useEffect(() => {
    try {
      localStorage.removeItem('panter_look_custom_campaigns');
    } catch (e) {
      // Ignore
    }
    loadLiveSheetsData();
  }, []);

  // Universal Relational Search Engine Aggregation
  // Uses EXCLUSIVELY real Google Sheets records
  const universalSearchAggregation: UniversalSearchAggregation = useMemo(() => {
    const activeDataset = liveSheetsRecords.length > 0 ? liveSheetsRecords : [];
    return searchUniversalRecords(searchQuery, activeDataset);
  }, [searchQuery, liveSheetsRecords]);

  // Immutable Consolidated Metrics Pipeline (getConsolidatedMetrics)
  // Strictly deduplicates by normalizeContentId and picks the latest snapshot per publication
  const consolidatedCampaignMetrics: ConsolidatedMetrics = useMemo(() => {
    return getConsolidatedMetrics(liveSheetsRecords, activeCampaign);
  }, [liveSheetsRecords, activeCampaign]);

  // Channel Audience Metrics (Visualizaciones, Interacciones, Contenidos_Compartidos, Nuevos_Seguidores)
  // Groups by platform, takes ONLY the latest snapshot from 'Audiencia_General' without summing multiple dates
  const channelAudienceMetrics: Record<PlatformName, ChannelAudienceMetric> = useMemo(() => {
    return computeChannelAudienceMetrics(liveSheetsRecords, liveAudienceRecords);
  }, [liveSheetsRecords, liveAudienceRecords]);

  // Full Historical Time Series for Audience Evolution Charts
  const audienceEvolutionSeries: AudienceEvolutionPoint[] = useMemo(() => {
    return getAudienceEvolutionSeries(liveAudienceRecords);
  }, [liveAudienceRecords]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const refreshData = () => {
    setIsRefreshing(true);
    loadLiveSheetsData();
    setTimeout(() => {
      setPlatformDataMap(getMockPlatformData(dateRange, activeCampaign, comparisonMode, customComparisonType));
      setGlobalOverview(getGlobalOverviewData(dateRange, activeCampaign, comparisonMode, customComparisonType));
      setApiSamples(getMockApiPayloads());
      setIsRefreshing(false);
    }, 600);
  };

  const syncWithGoogleSheets = async () => {
    setIsSyncingSheets(true);
    const success = await sendMetricsToGoogleSheets(
      searchResult.filteredOverview, 
      searchResult.filteredPlatformDataMap, 
      activeCampaign, 
      dateRange, 
      campaigns
    );
    setIsSyncingSheets(false);
    
    if (success) {
      setToast({
        text: '¡Métricas sincronizadas correctamente en la hoja maestra!',
        type: 'success'
      });
      // Re-fetch updated rows from Google Sheets
      loadLiveSheetsData();
    } else {
      setToast({
        text: 'Error de conexión con la hoja de Google Sheets.',
        type: 'error'
      });
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        activeView,
        setActiveView,
        dateRange,
        setDateRange,
        selectedSingleDay,
        setSelectedSingleDay,
        singleDayCompType,
        setSingleDayCompType,
        goToPreviousDay,
        goToNextDay,
        goToToday,
        goToYesterday,
        goToLaunchDay,
        comparisonMode,
        setComparisonMode,
        customComparisonType,
        setCustomComparisonType,
        activeCampaign,
        setActiveCampaign,
        consolidatedCampaignMetrics,
        campaigns,
        addCampaign,
        campaignSearchQuery,
        setCampaignSearchQuery,
        isCampaignModalOpen,
        setIsCampaignModalOpen,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        customCompStartDate,
        setCustomCompStartDate,
        customCompEndDate,
        setCustomCompEndDate,
        displayValueType,
        setDisplayValueType,
        customThresholds,
        setCustomThresholds,
        showMilestones,
        setShowMilestones,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        pinnedMetrics,
        togglePinnedMetric,
        isDarkMode,
        toggleDarkMode,
        platformDataMap,
        globalOverview,
        filteredPlatformDataMap: searchResult.filteredPlatformDataMap,
        filteredOverview: searchResult.filteredOverview,
        matchedContentCount: searchResult.matchedCount,
        hasMatches: searchResult.hasMatches,
        universalSearchAggregation,
        apiSamples,
        refreshData,
        isRefreshing,
        searchQuery,
        setSearchQuery,
        isSyncingSheets,
        syncWithGoogleSheets,
        liveSheetsRecords,
        liveAudienceRecords,
        audienceEvolutionSeries,
        isLoadingSheets,
        loadLiveSheetsData,
        channelAudienceMetrics,
        toast,
        setToast,
      }}
    >
      {children}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
