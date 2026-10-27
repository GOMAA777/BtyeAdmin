"use client";

import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "حدث خطأ أثناء تحميل البيانات",
  message = "تعذر جلب البيانات المطلوبة من النظام. يرجى التحقق من الاتصال وإعادة المحاولة.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      dir="rtl"
      className={`py-12 px-4 flex flex-col items-center justify-center text-center space-y-4 font-cairo ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#FFDAD6]/60 text-[#BA1A1A] flex items-center justify-center shadow-xs">
        <AlertCircle className="w-7 h-7" />
      </div>
      <div className="space-y-1 max-w-md">
        <h3 className="text-base font-bold text-[#181D17]">{title}</h3>
        <p className="text-xs sm:text-sm text-[#75786F] leading-relaxed">
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="bg-[#4B5940] hover:bg-[#3D4934] text-white text-xs sm:text-sm font-semibold h-10 px-5 rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer select-none"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إعادة المحاولة</span>
        </button>
      )}
    </div>
  );
}

export function TableErrorRow({
  colSpan,
  title,
  message,
  onRetry,
}: {
  colSpan: number;
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-4 sm:p-8">
        <ErrorState title={title} message={message} onRetry={onRetry} />
      </td>
    </tr>
  );
}
