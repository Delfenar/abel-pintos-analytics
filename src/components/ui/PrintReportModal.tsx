import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Printer, X, Download, FileText, CheckCircle2, Music2, MapPin, Eye, Heart, Flame, Layers } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({ isOpen, onClose, query }) => {
  const { universalSearchAggregation, dateRange } = useDashboard();

  if (!isOpen) return null;

  const now = new Date(2026, 7, 31, 16, 18);
  const formattedDate = `31 de Agosto de 2026, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hs`;

  const results = universalSearchAggregation.allResults;
  const totalImpacts = universalSearchAggregation.totalImpacts;
  const totalInteractions = universalSearchAggregation.totalInteractions;
  const totalSaves = universalSearchAggregation.totalSaves;
  const topPlatform = universalSearchAggregation.topPlatform;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-slate-900 border border-gold-400/40 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none print:w-full print:rounded-none print:bg-white text-slate-100 print:text-black">
        {/* Modal Action Controls (Hidden on Print) */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-100">
                Vista Previa del Informe Especial PDF
              </h4>
              <p className="text-[11px] text-slate-400">
                Listo para imprimir o guardar directamente en formato PDF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-gold-500/20 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div id="printable-report" className="p-8 overflow-y-auto space-y-6 text-slate-200 print:text-black print:p-8 print:overflow-visible font-sans bg-slate-950 print:bg-white">
          {/* Formal Editorial Header */}
          <div className="border-b-2 border-gold-400 pb-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <BlackPantherIcon size={24} />
                <span className="text-xs font-black uppercase tracking-widest text-gold-400 print:text-amber-700">
                  Panter Look — Ecosistema Digital Oficial
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-100 print:text-black tracking-tight">
                Informe Especial de Rendimiento: {query} — Abel Pintos
              </h1>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                Auditoría consolidada y búsqueda relacional universal en 7 plataformas digitales.
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold text-slate-400 print:text-slate-500 uppercase tracking-wider block">
                Fecha de Emisión
              </span>
              <span className="text-xs font-bold text-slate-200 print:text-slate-800 font-mono">
                {formattedDate}
              </span>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 print:text-emerald-700 text-[10px] font-black border border-emerald-500/30">
                REPORTE OFICIAL
              </span>
            </div>
          </div>

          {/* Executive Summary Synthesis */}
          <div className="p-4 rounded-2xl bg-gold-400/5 print:bg-slate-50 border border-gold-400/30 print:border-slate-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400 print:text-amber-800 mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Síntesis Ejecutiva del Término
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 print:text-slate-800 leading-relaxed">
              El análisis sobre el término <strong>"{query}"</strong> para el artista <strong>Abel Pintos</strong> arroja un total de <strong>{results.length} publicaciones/registros indexados</strong> con un impacto acumulado de <strong>{totalImpacts.toLocaleString()}</strong> reproducciones y alcance, registrando <strong>{totalInteractions.toLocaleString()}</strong> interacciones de la audiencia y posicionando a <strong>{topPlatform}</strong> como el canal con mayor tracción.
            </p>
          </div>

          {/* 4 Metric KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[10px] font-bold text-slate-400 print:text-slate-600 uppercase block">Impacto Total</span>
              <span className="text-base font-black text-slate-100 print:text-black font-mono mt-1 block">
                {totalImpacts.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-400 print:text-emerald-700 font-semibold">Streams & Alcance</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[10px] font-bold text-slate-400 print:text-slate-600 uppercase block">Interacciones</span>
              <span className="text-base font-black text-slate-100 print:text-black font-mono mt-1 block">
                {totalInteractions.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-400 print:text-emerald-700 font-semibold">Likes, Shares & Comentarios</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[10px] font-bold text-slate-400 print:text-slate-600 uppercase block">Plataforma Líder</span>
              <span className="text-base font-black text-emerald-400 print:text-emerald-700 font-mono mt-1 block">
                {topPlatform}
              </span>
              <span className="text-[10px] text-slate-400 print:text-slate-600 font-semibold">Mayor Rendimiento</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[10px] font-bold text-slate-400 print:text-slate-600 uppercase block">Publicaciones</span>
              <span className="text-base font-black text-gold-400 print:text-amber-800 font-mono mt-1 block">
                {results.length} Registros
              </span>
              <span className="text-[10px] text-slate-400 print:text-slate-600 font-semibold">7 Canales Oficiales</span>
            </div>
          </div>

          {/* Detailed Content Breakdown Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-black">
              Desglose de Publicaciones Indexadas
            </h3>
            <div className="border border-slate-800 print:border-slate-300 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 print:bg-slate-100 border-b border-slate-800 print:border-slate-300 text-[10px] font-bold text-slate-400 print:text-slate-700 uppercase">
                    <th className="py-2.5 px-3">Título / Publicación</th>
                    <th className="py-2.5 px-3">Plataforma</th>
                    <th className="py-2.5 px-3">Tipo</th>
                    <th className="py-2.5 px-3">Campaña / Álbum</th>
                    <th className="py-2.5 px-3 text-right">Reproducciones</th>
                    <th className="py-2.5 px-3 text-right">Alcance</th>
                    <th className="py-2.5 px-3 text-right">Interacciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-slate-200">
                  {results.map((item) => (
                    <tr key={item.id} className="text-slate-300 print:text-slate-900">
                      <td className="py-2.5 px-3 font-semibold">{item.titulo}</td>
                      <td className="py-2.5 px-3 uppercase text-[10px] font-bold">{item.plataforma}</td>
                      <td className="py-2.5 px-3">{item.tipoContenido}</td>
                      <td className="py-2.5 px-3 text-slate-400 print:text-slate-600">{item.campania}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold">{item.metricas.reproducciones.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-gold-400 print:text-amber-800">{item.metricas.alcance.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-rose-400 print:text-rose-700">{item.metricas.interacciones.toLocaleString()}</td>
                    </tr>
                  ))}
                  {results.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-4 text-center text-slate-500">
                        No hay registros directos para esta consulta.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Editorial Footer */}
          <div className="pt-4 border-t border-slate-800 print:border-slate-300 flex items-center justify-between text-[10px] text-slate-500 print:text-slate-600">
            <span>© 2026 Abel Pintos Analytics — Panter Look Ecosistema Digital</span>
            <span>Documento emitido para auditoría y seguimiento relacional de contenidos</span>
          </div>
        </div>
      </div>
    </div>
  );
};
