import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { ApiPayloadSample, PlatformId } from '../../types/analytics';
import { Zap, Terminal, CheckCircle2, RefreshCw, Send, Server, Database } from 'lucide-react';

export const ApiSimulatorView: React.FC = () => {
  const { apiSamples, refreshData, isRefreshing } = useDashboard();
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] API Ingest layer initialized successfully.',
    '[META GRAPH API] Webhook listener connected on port 8443.',
    '[TIKTOK API v2] OAuth 2.0 token refreshed. Scope: research.data.read',
    '[YOUTUBE DATA v3] Batch report sync completed.'
  ]);

  const activeSample: ApiPayloadSample = apiSamples[selectedSampleIndex] || apiSamples[0];

  const handleSimulateEvent = () => {
    const newLog = `[WEBHOOK] ${activeSample.platform.toUpperCase()} emitted real-time metric event at ${new Date().toLocaleTimeString()}`;
    setLogs((prev) => [newLog, ...prev.slice(0, 8)]);
    refreshData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/30 border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Zap className="w-4 h-4" />
            Backend / API Layer Simulator
          </div>
          <h2 className="text-2xl font-black text-slate-100">Simulador de Ingesta de Datos APIs</h2>
          <p className="text-xs text-slate-400 mt-1">Prueba interactiva de la capa de API Routes & Webhooks oficiales de Meta, TikTok, YouTube y Spotify</p>
        </div>

        <button
          onClick={handleSimulateEvent}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Simular Evento Webhook</span>
        </button>
      </div>

      {/* API Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {apiSamples.map((sample, idx) => (
          <button
            key={sample.platform}
            onClick={() => setSelectedSampleIndex(idx)}
            className={`glass-panel p-4 rounded-2xl text-left border transition-all ${
              selectedSampleIndex === idx
                ? 'border-amber-500/60 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                {sample.platform}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                HTTP {sample.status}
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 truncate">{sample.endpoint}</div>
          </button>
        ))}
      </div>

      {/* Payload Inspection Window & Live Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* JSON Viewer */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200">Payload JSON de Ingesta ({activeSample.platform})</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">{activeSample.timestamp}</span>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 text-amber-300 font-mono text-xs overflow-x-auto border border-slate-800 max-h-96">
            {JSON.stringify(activeSample.payload, null, 2)}
          </pre>
        </div>

        {/* Live Logs Terminal */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-slate-200">Logs de Servidor Backend</span>
            </div>
          </div>

          <div className="space-y-2 font-mono text-[11px] text-slate-400 max-h-80 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="p-2 rounded bg-slate-950/70 border border-slate-800/60 leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
