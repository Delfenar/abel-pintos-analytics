import React from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewView } from './components/views/OverviewView';
import { InstagramView } from './components/views/InstagramView';
import { ThreadsView } from './components/views/ThreadsView';
import { TikTokView } from './components/views/TikTokView';
import { FacebookView } from './components/views/FacebookView';
import { TwitterView } from './components/views/TwitterView';
import { YouTubeView } from './components/views/YouTubeView';
import { SpotifyView } from './components/views/SpotifyView';
import { ApiSimulatorView } from './components/views/ApiSimulatorView';

const MainContent: React.FC = () => {
  const { activeView } = useDashboard();

  return (
    <main className="p-6 transition-all duration-300">
      {activeView === 'overview' && <OverviewView />}
      {activeView === 'instagram' && <InstagramView />}
      {activeView === 'threads' && <ThreadsView />}
      {activeView === 'tiktok' && <TikTokView />}
      {activeView === 'facebook' && <FacebookView />}
      {activeView === 'twitter' && <TwitterView />}
      {activeView === 'youtube' && <YouTubeView />}
      {activeView === 'spotify' && <SpotifyView />}
      {activeView === 'simulator' && <ApiSimulatorView />}
    </main>
  );
};

export function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Header />
          <MainContent />
        </div>
      </div>
    </DashboardProvider>
  );
}

export default App;
