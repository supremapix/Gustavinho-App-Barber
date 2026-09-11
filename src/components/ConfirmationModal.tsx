import React, { useEffect } from "react";
import { AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";

export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info" | "success";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !loading) {
        onCancel();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, loading, onCancel]);

  if (!isOpen) return null;

  const iconMap = {
    danger: <XCircle className="w-6 h-6 text-red-400" />,
    warning: <AlertTriangle className="w-6 h-6 text-[#d4af37]" />,
    info: <Info className="w-6 h-6 text-blue-400" />,
    success: <CheckCircle className="w-6 h-6 text-emerald-400" />
  };

  const confirmBtnStyles = {
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400",
    warning: "bg-[#d4af37] text-[#0f0f0f] hover:bg-[#e5c158] focus:ring-2 focus:ring-[#d4af37]",
    info: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-[#18181b] border border-[#27272a] rounded-2xl p-6 shadow-2xl space-y-4 text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 p-2 text-[#a1a1aa] hover:text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4af37] min-h-[48px] min-w-[48px] flex items-center justify-center"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3 pt-1">
          <div className="p-2.5 rounded-xl bg-[#242428] border border-[#27272a] shrink-0">
            {iconMap[variant]}
          </div>
          <div>
            <h2 id="modal-title" className="text-lg font-extrabold text-white leading-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-3 border-t border-[#27272a]">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#242428] border border-[#27272a] text-white font-bold text-xs hover:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all min-h-[48px] flex items-center justify-center"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl font-extrabold text-xs transition-all min-h-[48px] flex items-center justify-center disabled:opacity-50 ${confirmBtnStyles[variant]}`}
          >
            {loading ? "Aguarde..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
