import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = 'text-emerald-500';
        let borderColor = 'border-emerald-500/20';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'text-red-500';
          borderColor = 'border-red-500/20';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-sky-500';
          borderColor = 'border-sky-500/20';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-white/95 backdrop-blur-md border ${borderColor} rounded-xl shadow-xl p-3.5 flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200`}
          >
            <div className="flex items-start gap-2.5">
              <Icon className={`w-5 h-5 shrink-0 ${iconColor} mt-0.5`} />
              <div>
                <h6 className="text-xs font-bold text-zinc-900 leading-tight">
                  {toast.title}
                </h6>
                {toast.description && (
                  <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-2">
                    {toast.description}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
