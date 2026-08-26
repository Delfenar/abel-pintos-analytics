import React from 'react';
import { ContentItem } from '../../types/analytics';
import { Eye, Heart, Share2, Bookmark, ArrowUpRight, Flame } from 'lucide-react';

interface ContentTableProps {
  title?: string;
  items: ContentItem[];
}

export const ContentTable: React.FC<ContentTableProps> = ({ title = 'Contenido Destacado por Rendimiento', items }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-500" />
          {title}
        </h3>
        <span className="text-xs text-slate-400 font-medium">Ordenado por ER & Alcance</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 px-3">Publicación / Contenido</th>
              <th className="pb-3 px-3">Plataforma</th>
              <th className="pb-3 px-3">Formato</th>
              <th className="pb-3 px-3 text-right">Alcance / Views</th>
              <th className="pb-3 px-3 text-right">Interacciones</th>
              <th className="pb-3 px-3 text-right">Engagement Rate</th>
              <th className="pb-3 px-3 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                <td className="py-3.5 px-3">
                  <div className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors line-clamp-1 max-w-md">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.publishedAt}</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="capitalize font-medium text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.platform}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-xs text-slate-300 font-medium">
                  {item.type}
                </td>
                <td className="py-3.5 px-3 text-right font-semibold text-slate-200">
                  <div className="flex items-center justify-end gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {item.metrics.viewsOrReach.toLocaleString()}
                  </div>
                </td>
                <td className="py-3.5 px-3 text-right font-semibold text-slate-200">
                  <div className="flex items-center justify-end gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    {item.metrics.interactions.toLocaleString()}
                  </div>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <span className="font-bold text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.metrics.engagementRate.toFixed(1)}%
                  </span>
                </td>
                <td className="py-3.5 px-3 text-center">
                  <button
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
                    title="Ver detalle"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
