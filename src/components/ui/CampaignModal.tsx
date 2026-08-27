import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { CampaignEventType, CampaignFilter } from '../../types/analytics';
import { X, PlusCircle, Calendar, MapPin, Target, Sparkles, Layers } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({ isOpen, onClose }) => {
  const { addCampaign, setActiveCampaign } = useDashboard();

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<CampaignEventType>('tour');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-09-20');
  const [city, setCity] = useState('Buenos Aires & Interior');
  const [targetStreams, setTargetStreams] = useState<string>('');
  const [targetTickets, setTargetTickets] = useState<string>('');
  const [targetReach, setTargetReach] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) {
      alert('Por favor, ingresa el nombre de la campaña.');
      return;
    }

    const typeBadges: Record<CampaignEventType, string> = {
      tour: 'SHOWS',
      release: 'MÚSICA',
      merch: 'LIBRO/MERCH',
      press: 'PRENSA'
    };

    const newCamp: CampaignFilter = {
      id: `custom-${Date.now()}`,
      label: label.trim(),
      description: description.trim() || 'Campaña personalizada creada por el usuario',
      badge: typeBadges[type],
      type,
      startDate,
      endDate,
      year: new Date(startDate).getFullYear() || 2026,
      city: city.trim() || 'Global',
      targetStreams: targetStreams ? Number(targetStreams) : undefined,
      targetTickets: targetTickets ? Number(targetTickets) : undefined,
      targetReach: targetReach ? Number(targetReach) : undefined,
      isUserCreated: true
    };

    addCampaign(newCamp);
    setActiveCampaign(newCamp.id);
    onClose();

    // Reset form
    setLabel('');
    setDescription('');
    setType('tour');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-gold w-full max-w-xl rounded-3xl border border-gold-400/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-gold-400/20 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gold-400/10 border border-gold-400/30 text-gold-400">
              <BlackPantherIcon size={24} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-100 tracking-tight">
                Cargar Nueva Campaña
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Alta de iniciativas digitales oficiales para Abel Pintos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Campaign Name */}
          <div>
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-1">
              Nombre de la Campaña *
            </label>
            <input
              type="text"
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ej. Gira Conciertos Córdoba & Mendoza 2026"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:border-gold-400 focus:outline-none text-xs"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-1">
              Descripción Objetivo
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Promoción de recintos masivos y venta de entradas anticipadas"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:border-gold-400 focus:outline-none text-xs"
            />
          </div>

          {/* Event Type & City Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-1">
                Tipo de Campaña / Evento *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as CampaignEventType)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 focus:border-gold-400 focus:outline-none text-xs"
              >
                <option value="tour">🎯 Show / Gira Conciertos</option>
                <option value="release">🎵 Lanzamiento Musical / Single</option>
                <option value="merch">📖 Merchandising / Libro</option>
                <option value="press">🎙️ Prensa / Institucional</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-1">
                Ciudad / Alcance Geográfico
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ej. Buenos Aires, Rosario, Córdoba"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:border-gold-400 focus:outline-none text-xs"
                />
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block mb-1">
              Duración de la Campaña (Inicio - Fin) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1 font-semibold">Fecha de Inicio</span>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:border-gold-400 focus:outline-none text-xs"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-1 font-semibold">Fecha de Fin</span>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:border-gold-400 focus:outline-none text-xs"
                />
              </div>
            </div>
          </div>

          {/* Target Goals Section (Optional) */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <label className="text-xs font-bold text-gold-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              Metas & Objetivos Esperados (Opcional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Meta Streams</span>
                <input
                  type="number"
                  placeholder="Ej. 10000000"
                  value={targetStreams}
                  onChange={(e) => setTargetStreams(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:border-gold-400 focus:outline-none text-xs font-mono"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Meta Tickets Vendid.</span>
                <input
                  type="number"
                  placeholder="Ej. 50000"
                  value={targetTickets}
                  onChange={(e) => setTargetTickets(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:border-gold-400 focus:outline-none text-xs font-mono"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Alcance Proyectado</span>
                <input
                  type="number"
                  placeholder="Ej. 5000000"
                  value={targetReach}
                  onChange={(e) => setTargetReach(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:border-gold-400 focus:outline-none text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-gold-400/20 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-slate-950 font-black shadow-lg shadow-gold-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Guardar & Cargar Campaña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
