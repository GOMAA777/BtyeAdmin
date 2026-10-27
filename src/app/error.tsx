"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, HelpCircle } from "lucide-react";
import { Logo } from "@/components/shared/logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring if configured
    console.error("Application error:", error);
  }, [error]);

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full flex flex-col justify-between bg-[#F4F6F0] p-6 sm:p-12 text-[#172115] font-cairo select-none"
    >
      {/* Top Header */}
      <header className="w-full flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#303A2C] border border-[#252A24] flex items-center justify-center p-2 shadow-xs">
            <Logo size={24} priority />
          </div>
          <div>
            <span className="text-lg font-bold text-[#172115] font-sans">
              BYTE HOME
            </span>
            <span className="hidden sm:inline-block ms-2 text-xs text-[#616E5D]">
              | إدارة وتشغيل الأصول العقارية
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#181D17] hover:text-[#4B5940] transition-colors"
          >
            <Home className="w-4 h-4 text-[#4B5940]" />
            <span>لوحة التحكم</span>
          </Link>
          <span className="text-[#DCE2D7]">|</span>
          <Link
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#616E5D] hover:text-[#181D17] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>الدعم الفني</span>
          </Link>
        </div>
      </header>

      {/* Main Error Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-xl p-8 sm:p-12 rounded-3xl bg-white/85 border border-[#E0E4D8] backdrop-blur-xs shadow-xs text-center space-y-6">
          {/* Warning Icon Emblem */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-[#FEF3E2] scale-110 blur-xs animate-pulse" />
            <div className="relative w-24 h-24 rounded-3xl bg-[#FEF3E2] border border-[#FADBB4] text-[#B45309] flex items-center justify-center shadow-2xs">
              <AlertTriangle className="w-12 h-12 text-[#B45309]" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
              حدث خطأ غير متوقع
            </h1>
            <p className="text-xs sm:text-sm text-[#616E5D] leading-relaxed max-w-md mx-auto">
              نعتذر عن حدوث هذا الخطأ غير المتوقع أثناء معالجة طلبك. تم تسجيل تفاصيل الخطأ
              في النظام، ويمكنك محاولة إعادة التحميل الآن أو العودة إلى لوحة التحكم.
            </p>
            {error.digest && (
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F1E9] border border-[#E2D7C5] text-[11px] font-mono text-[#7C694E]">
                  رمز الخطأ: {error.digest}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#4B5940] hover:bg-[#3E4A35] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة المحاولة</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white hover:bg-[#F4F6F0] border border-[#DCE2D7] text-[#252A24] text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#4B5940]" />
              <span>العودة إلى لوحة التحكم</span>
            </Link>
          </div>

          {/* Secondary Hint */}
          <div className="pt-6 border-t border-[#E0E4D8]/80 text-xs text-[#7B8775] flex flex-wrap items-center justify-center gap-2">
            <span>إذا استمرت المشكلة، يمكنك</span>
            <Link
              href="/login/"
              className="text-[#4B5940] hover:underline font-semibold"
            >
              تسجيل الدخول مجدداً
            </Link>
            <span>أو التواصل مع مسؤولي النظام.</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-[#7B8775] max-w-5xl mx-auto">
        © 2026 BYTE HOME - جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
