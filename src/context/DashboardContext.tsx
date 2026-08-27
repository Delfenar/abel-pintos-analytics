import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PlatformId, 
  DateRangeKey, 
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
  saveCampaignsToStorage
} from '../services/mockDataService';
import { sendMetricsToGoogleSheets } from '../services/googleSheetsService';
import { ToastNotification, ToastState } from '../components/ui/ToastNotification';

interface DashboardContextType {
  activeView: PlatformId;
  setActiveView: (view: PlatformId) => void;
  dateRange: DateRangeKey;
  setDateRange: (range: DateRangeKey) => void;
  comparisonMode: ComparisonMode;
  setComparisonMode: (mode: ComparisonMode) => void;
  customComparisonType: CustomComparisonType;
  setCustomComparisonType: (type: CustomComparisonType) => void;
  activeCampaign: CampaignId;
  setActiveCampaign: (campaign: CampaignId) => void;
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
  apiSamples: ApiPayloadSample[];
  refreshData: () => void;
  isRefreshing: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSyncingSheets: boolean;
  syncWithGoogleSheets: () => Promise<void>;
  toast: ToastState | null;
  setToast: (toast: ToastState | null) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<PlatformId>('overview');
  const [dateRange, setDateRange] = useState<DateRangeKey>('28d');
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

  const [isSyncingSheets, setIsSyncingSheets] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const addCampaign = (newCamp: CampaignFilter) => {
    setCampaigns(prev => {
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
    setTimeout(() => {
      setPlatformDataMap(getMockPlatformData(dateRange, activeCampaign, comparisonMode, customComparisonType));
      setGlobalOverview(getGlobalOverviewData(dateRange, activeCampaign, comparisonMode, customComparisonType));
      setApiSamples(getMockApiPayloads());
      setIsRefreshing(false);
    }, 600);
  };

  const syncWithGoogleSheets = async () => {
    setIsSyncingSheets(true);
    const success = await sendMetricsToGoogleSheets(globalOverview, platformDataMap, activeCampaign, dateRange, campaigns);
    setIsSyncingSheets(false);
    
    if (success) {
      setToast({
        text: '¡Datos guardados con éxito en la hoja maestra!',
        type: 'success'
      });
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
        comparisonMode,
        setComparisonMode,
        customComparisonType,
        setCustomComparisonType,
        activeCampaign,
        setActiveCampaign,
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
        apiSamples,
        refreshData,
        isRefreshing,
        searchQuery,
        setSearchQuery,
        isSyncingSheets,
        syncWithGoogleSheets,
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
