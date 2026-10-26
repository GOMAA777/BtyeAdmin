"use client";

import { Toaster as Sonner, ToasterProps, toast } from "sonner";
import { CheckCircle2, X, Info, AlertCircle, XCircle } from "lucide-react";

export interface CustomToastProps {
  title?: string;
  version?: string;
  description?: string;
  duration?: number;
}

/**
 * Custom toast notification matching Figma node 1:28510
 * "NOTIFICATION (Fixed Viewport Indicator)"
 * Refined with compact dimensions matching standard toaster size
 */
export function showFigmaSuccessToast({
  title = "تم تسجيل التحديث بنجاح",
  version = "V3.3",
  description = "أُدرجت المعاملة في سجل التدقيق الإداري بواسطة محمد أحمد...",
  duration = 4000,
}: CustomToastProps = {}) {
  return toast.custom(
    (t) => (
      <div
        dir="rtl"
        className="bg-[#2d322c] drop-shadow-[0px_8px_16px_rgba(0,0,0,0.25)] rounded-[14px] w-[360px] max-w-[calc(100vw-32px)] py-2.5 px-3 flex items-center justify-between gap-2.5 text-right select-none border border-[#3d453b]/60 font-cairo shadow-xl"
        data-node-id="1:28510"
        data-name="NOTIFICATION (Fixed Viewport Indicator)"
      >
        {/* Right side: Icon badge */}
        <div className="bg-[#d8e8c7] rounded-[10px] size-[32px] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-[#181d17]" />
        </div>

        {/* Middle: Title, Version tag & Subtitle */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#eef2e9] text-[12.5px] leading-[18px] truncate">
              {title}
            </span>
            {version && (
              <span className="bg-[#4b5940] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-[4px] shrink-0 leading-none">
                {version}
              </span>
            )}
          </div>
          {description && (
            <p className="text-[11px] text-[#eef2e9]/75 leading-[16px] truncate mt-0.5">
              {description}
            </p>
          )}
        </div>

        {/* Left side: Close Button */}
        <button
          type="button"
          onClick={() => toast.dismiss(t)}
          className="text-[#eef2e9]/50 hover:text-white p-1 rounded-md transition-colors shrink-0 cursor-pointer"
          aria-label="إغلاق الإشعار"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    ),
    { duration }
  );
}

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      dir="rtl"
      position="bottom-left"
      closeButton
      swipeDirections={["left", "right", "bottom"]}
      className="toaster group font-sans"
      icons={{
        success: (
          <div className="bg-[#d8e8c7] rounded-[10px] size-[30px] flex items-center justify-center shrink-0 text-[#181d17]">
            <CheckCircle2 className="w-4 h-4 text-[#181d17]" />
          </div>
        ),
        info: (
          <div className="bg-[rgba(75,89,64,0.3)] border border-[#4b5940]/40 rounded-[10px] size-[30px] flex items-center justify-center shrink-0 text-[#d8e8c7]">
            <Info className="w-4 h-4 text-[#d8e8c7]" />
          </div>
        ),
        warning: (
          <div className="bg-[rgba(217,119,6,0.2)] border border-[rgba(217,119,6,0.4)] rounded-[10px] size-[30px] flex items-center justify-center shrink-0 text-[#fde047]">
            <AlertCircle className="w-4 h-4 text-[#fde047]" />
          </div>
        ),
        error: (
          <div className="bg-[rgba(239,68,68,0.2)] border border-[rgba(239,68,68,0.4)] rounded-[10px] size-[30px] flex items-center justify-center shrink-0 text-[#fca5a5]">
            <XCircle className="w-4 h-4 text-[#fca5a5]" />
          </div>
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast select-none cursor-grab active:cursor-grabbing group-[.toaster]:bg-[#2d322c] group-[.toaster]:text-[#eef2e9] group-[.toaster]:border-[#3d453b]/60 group-[.toaster]:shadow-[0px_8px_16px_rgba(0,0,0,0.25)] group-[.toaster]:rounded-[14px] group-[.toaster]:py-2.5 group-[.toaster]:px-3.5 group-[.toaster]:border group-[.toaster]:font-cairo overflow-visible group-[.toaster]:gap-2.5",
          title:
            "group-[.toast]:text-[12.5px] group-[.toast]:font-bold group-[.toast]:text-[#eef2e9] leading-snug",
          description:
            "group-[.toast]:text-[#eef2e9]/75 group-[.toast]:text-[11px] group-[.toast]:mt-0.5 font-cairo leading-relaxed",
          actionButton:
            "group-[.toast]:bg-[#4b5940] group-[.toast]:text-white group-[.toast]:rounded-lg group-[.toast]:font-bold group-[.toast]:text-xs hover:group-[.toast]:bg-[#3d4933]",
          cancelButton:
            "group-[.toast]:bg-[#373e35] group-[.toast]:text-[#eef2e9] group-[.toast]:rounded-lg group-[.toast]:text-xs",
          closeButton:
            "!-top-2 !-left-2 !right-auto !bottom-auto !transform-none !bg-[#373e35] !text-[#eef2e9] hover:!text-white hover:!bg-[#4b5940] !border !border-[#4b5940]/60 !shadow-md !cursor-pointer !size-5 !rounded-full !flex !items-center !justify-center !transition-all !z-20",
          info: "group-[.toaster]:border-[#3d453b]/60",
          success: "group-[.toaster]:border-[#4b5940]/60",
        },
      }}
      {...props}
    />
  );
}

