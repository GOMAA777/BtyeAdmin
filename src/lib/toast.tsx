"use client";

import { toast } from "sonner";
import { Clock, CheckCircle2, Info } from "lucide-react";

/**
 * Displays a toast notification styled with the website's brand colors
 * indicating that a tab, button, or feature is currently under construction.
 */
export function showUnderConstructionToast(
  title: string = "هذا القسم",
  description: string = "يجري العمل على إتاحة هذا التبويب بجميع بياناته وتفاصيله قريباً ضمن التحديث القادم لمنظومة أبراج."
) {
  toast(
    <div className="flex items-start gap-2.5 w-full text-start select-none pe-1 font-cairo" dir="rtl">
      <div className="size-8 rounded-[10px] bg-[rgba(75,89,64,0.3)] text-[#d8e8c7] border border-[#4b5940]/40 flex items-center justify-center shrink-0">
        <Clock className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-0.5 min-w-0">
        <div className="text-[12.5px] font-bold text-[#eef2e9] leading-tight truncate">
          {title} قيد الإنشاء والتطوير
        </div>
        <div className="text-[11px] text-[#eef2e9]/75 leading-relaxed">
          {description}
        </div>
      </div>
    </div>,
    {
      duration: 4000,
      className:
        "border-[#3d453b]/60 shadow-xl rounded-[14px] py-2.5 px-3 bg-[#2d322c] text-[#eef2e9] select-none cursor-grab active:cursor-grabbing font-cairo w-[360px] max-w-[calc(100vw-32px)]",
    }
  );
}

export function showSuccessToast(title: string, description?: string) {
  toast(
    <div className="flex items-start gap-2.5 w-full text-start select-none pe-1 font-cairo" dir="rtl">
      <div className="size-8 rounded-[10px] bg-[#d8e8c7] text-[#181d17] flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-0.5 min-w-0">
        <div className="text-[12.5px] font-bold text-[#eef2e9] leading-tight truncate">
          {title}
        </div>
        {description && (
          <div className="text-[11px] text-[#eef2e9]/75 leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </div>,
    {
      duration: 3500,
      className:
        "border-[#3d453b]/60 shadow-xl rounded-[14px] py-2.5 px-3 bg-[#2d322c] text-[#eef2e9] select-none cursor-grab active:cursor-grabbing font-cairo w-[360px] max-w-[calc(100vw-32px)]",
    }
  );
}

export function showInfoToast(title: string, description?: string) {
  toast(
    <div className="flex items-start gap-2.5 w-full text-start select-none pe-1 font-cairo" dir="rtl">
      <div className="size-8 rounded-[10px] bg-[rgba(75,89,64,0.3)] text-[#d8e8c7] border border-[#4b5940]/40 flex items-center justify-center shrink-0">
        <Info className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-0.5 min-w-0">
        <div className="text-[12.5px] font-bold text-[#eef2e9] leading-tight truncate">
          {title}
        </div>
        {description && (
          <div className="text-[11px] text-[#eef2e9]/75 leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </div>,
    {
      duration: 3500,
      className:
        "border-[#3d453b]/60 shadow-xl rounded-[14px] py-2.5 px-3 bg-[#2d322c] text-[#eef2e9] select-none cursor-grab active:cursor-grabbing font-cairo w-[360px] max-w-[calc(100vw-32px)]",
    }
  );
}
