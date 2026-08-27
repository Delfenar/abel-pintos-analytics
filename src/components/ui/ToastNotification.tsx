import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { BlackPantherIcon } from './BlackPantherIcon';

export interface ToastState {
  text: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastNotificationProps {
  toast: ToastState | null;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div className="fixed top-20 right-6 z-50 animate-bounce-in max-w-md">
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center gap-3.5 ${
        isSuccess
          ? 'bg-slate-950/95 border-emerald-500/50 shadow-emerald-500/10 text-slate-100'
          : isError
          ? 'bg-slate-950/95 border-rose-500/50 shadow-rose-500/10 text-slate-100'
          : 'bg-slate-950/95 border-gold-400/50 shadow-gold-500/10 text-slate-100'
      }`}>
        <div className={`p-2 rounded-xl shrink-0 ${
          isSuccess ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
        }`}>
          {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <BlackPantherIcon size={14} />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-400">
              Sincronización Nube
            </span>
          </div>
          <p className="text-xs font-bold text-slate-100 leading-snug">
            {toast.text}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
