import Link from "next/link";
import {
  Home,
  Building2,
  Search,
  HelpCircle,
  DoorOpen,
  CalendarDays,
  Users,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";

export default function NotFound() {
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

      {/* Main 404 Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-xl p-8 sm:p-12 rounded-3xl bg-white/85 border border-[#E0E4D8] backdrop-blur-xs shadow-xs text-center space-y-6">
          {/* 404 Emblem */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-28 h-28 rounded-3xl bg-[#EBF0E6] border border-[#DCE2D7] text-[#4B5940] flex items-center justify-center shadow-2xs">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans text-[#4B5940]">
                404
              </span>
            </div>
            <div className="absolute -bottom-2 -end-2 w-9 h-9 rounded-xl bg-[#7C694E] text-white flex items-center justify-center shadow-sm border-2 border-white">
              <Search className="w-4 h-4" />
            </div>
          </div>

          {/* Headings */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
              الصفحة غير موجودة
            </h1>
            <p className="text-xs sm:text-sm text-[#616E5D] leading-relaxed max-w-md mx-auto">
              عذراً، لم نتمكن من العثور على الصفحة التي طلبتها. قد تكون الصفحة قد
              نُقلت أو تم تعديل الرابط، أو لم تعد متوفرة في النظام.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#4B5940] hover:bg-[#3E4A35] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>العودة إلى لوحة التحكم</span>
            </Link>

            <Link
              href="/properties/"
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white hover:bg-[#F4F6F0] border border-[#DCE2D7] text-[#252A24] text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#4B5940]" />
              <span>تصفح العقارات</span>
            </Link>
          </div>

          {/* Quick Shortcuts */}
          <div className="pt-6 border-t border-[#E0E4D8]/80 space-y-3">
            <p className="text-xs text-[#7B8775]">أو يمكنك الانتقال مباشرة إلى:</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/units/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F6F0] hover:bg-[#EBF0E6] text-[#252A24] text-xs font-medium transition-colors border border-[#E0E4D8]/60"
              >
                <DoorOpen className="w-3.5 h-3.5 text-[#4B5940]" />
                <span>الوحدات</span>
              </Link>
              <Link
                href="/bookings/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F6F0] hover:bg-[#EBF0E6] text-[#252A24] text-xs font-medium transition-colors border border-[#E0E4D8]/60"
              >
                <CalendarDays className="w-3.5 h-3.5 text-[#4B5940]" />
                <span>الحجوزات</span>
              </Link>
              <Link
                href="/owners/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F6F0] hover:bg-[#EBF0E6] text-[#252A24] text-xs font-medium transition-colors border border-[#E0E4D8]/60"
              >
                <Users className="w-3.5 h-3.5 text-[#4B5940]" />
                <span>الملاك</span>
              </Link>
              <Link
                href="/login/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F6F0] hover:bg-[#EBF0E6] text-[#616E5D] text-xs font-medium transition-colors border border-[#E0E4D8]/60"
              >
                <span>تسجيل الدخول</span>
              </Link>
            </div>
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
