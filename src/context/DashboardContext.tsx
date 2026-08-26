import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlatformId, DateRangeKey, CampaignId, PlatformData, GlobalOverviewData, ApiPayloadSample } from '../types/analytics';
import { getMockPlatformData, getGlobalOverviewData, getMockApiPayloads } from '../services/mockDataService';

interface DashboardContextType {
  activeView: PlatformId;
  setActiveView: (view: PlatformId) => void;
  dateRange: DateRangeKey;
  setDateRange: (range: DateRangeKey) => void;
  activeCampaign: CampaignId;
  setActiveCampaign: (campaign: CampaignId) => void;
  customStartDate: string;
  setCustomStartDate: (date: string) => void;
  customEndDate: string;
  setCustomEndDate: (date: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  platformDataMap: Record<string, PlatformData>;
  globalOverview: GlobalOverviewData;
  apiSamples: ApiPayloadSample[];
  refreshData: () => void;
  isRefreshing: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<PlatformId>('overview');
  const [dateRange, setDateRange] = useState<DateRangeKey>('28d');
  const [activeCampaign, setActiveCampaign] = useState<CampaignId>('all');
  const [customStartDate, setCustomStartDate] = useState<string>('2026-08-01');
  const [customEndDate, setCustomEndDate] = useState<string>('2026-08-26');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [platformDataMap, setPlatformDataMap] = useState<Record<string, PlatformData>>(() => getMockPlatformData(dateRange, activeCampaign));
  const [globalOverview, setGlobalOverview] = useState<GlobalOverviewData>(() => getGlobalOverviewData(dateRange, activeCampaign));
  const [apiSamples, setApiSamples] = useState<ApiPayloadSample[]>(() => getMockApiPayloads());

  useEffect(() => {
    setPlatformDataMap(getMockPlatformData(dateRange, activeCampaign));
    setGlobalOverview(getGlobalOverviewData(dateRange, activeCampaign));
  }, [dateRange, activeCampaign]);

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
      setPlatformDataMap(getMockPlatformData(dateRange, activeCampaign));
      setGlobalOverview(getGlobalOverviewData(dateRange, activeCampaign));
      setApiSamples(getMockApiPayloads());
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <DashboardContext.Provider
      value={{
        activeView,
        setActiveView,
        dateRange,
        setDateRange,
        activeCampaign,
        setActiveCampaign,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        isDarkMode,
        toggleDarkMode,
        platformDataMap,
        globalOverview,
        apiSamples,
        refreshData,
        isRefreshing,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
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
