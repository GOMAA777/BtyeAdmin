"use client";

import { Toaster as Sonner, ToasterProps, toast } from "sonner";
import { CheckCircle2, X } from "lucide-react";

export interface CustomToastProps {
  title?: string;
  version?: string;
  description?: string;
  duration?: number;
}

/**
 * Custom toast notification matching Figma node 1:28510
 * "NOTIFICATION (Fixed Viewport Indicator)"
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
        className="bg-[#2d322c] drop-shadow-[0px_12px_16px_rgba(0,0,0,0.2)] rounded-[16px] w-[440px] max-w-[calc(100vw-32px)] p-3 px-4 flex items-center justify-between gap-3 text-right select-none border border-[#3d453b]/50 font-cairo shadow-2xl"
        data-node-id="1:28510"
        data-name="NOTIFICATION (Fixed Viewport Indicator)"
      >
        {/* Right side: Icon badge */}
        <div className="bg-[#d8e8c7] rounded-[12px] size-[40px] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-[#181d17]" />
        </div>

        {/* Middle: Title, Version tag & Subtitle */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#eef2e9] text-[14px] leading-[20px] truncate">
              {title}
            </span>
            {version && (
              <span className="bg-[#4b5940] text-white text-[11px] font-normal px-2 py-0.5 rounded-[4px] shrink-0">
                {version}
              </span>
            )}
          </div>
          <p className="text-[13px] text-[#eef2e9]/80 leading-[22px] truncate mt-0.5">
            {description}
          </p>
        </div>

        {/* Left side: Close Button */}
        <button
          type="button"
          onClick={() => toast.dismiss(t)}
          className="text-[#eef2e9]/60 hover:text-white p-1 rounded-md transition-colors shrink-0 cursor-pointer"
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
      toastOptions={{
        classNames: {
          toast:
            "group toast select-none cursor-grab active:cursor-grabbing group-[.toaster]:bg-[#2d322c] group-[.toaster]:text-[#eef2e9] group-[.toaster]:border-[#3d453b]/60 group-[.toaster]:shadow-[0px_12px_16px_rgba(0,0,0,0.2)] group-[.toaster]:rounded-[16px] group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:font-cairo overflow-visible",
          description:
            "group-[.toast]:text-[#eef2e9]/80 group-[.toast]:text-xs group-[.toast]:mt-1 font-cairo leading-relaxed",
          actionButton:
            "group-[.toast]:bg-[#4b5940] group-[.toast]:text-white group-[.toast]:rounded-xl group-[.toast]:font-bold group-[.toast]:text-xs hover:group-[.toast]:bg-[#3d4933]",
          cancelButton:
            "group-[.toast]:bg-[#373e35] group-[.toast]:text-[#eef2e9] group-[.toast]:rounded-xl group-[.toast]:text-xs",
          closeButton:
            "!-top-2.5 !-left-2.5 !right-auto !bottom-auto !transform-none !bg-[#373e35] !text-[#eef2e9] hover:!text-white hover:!bg-[#4b5940] !border !border-[#4b5940] !shadow-md !cursor-pointer !w-6 !h-6 !rounded-full !flex !items-center !justify-center !transition-all !z-20",
          info: "group-[.toaster]:border-[#3d453b]",
          success: "group-[.toaster]:border-[#4b5940]",
        },
      }}
      {...props}
    />
  );
}

