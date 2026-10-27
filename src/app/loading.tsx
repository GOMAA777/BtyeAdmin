import { Logo } from "@/components/shared/logo";

export default function RootLoading() {
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
      </header>

      {/* Main Loading Card */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 sm:p-12 rounded-3xl bg-white/85 border border-[#E0E4D8] backdrop-blur-xs shadow-xs text-center space-y-6">
          {/* Animated Emblem with Logo & Spinning Ring */}
          <div className="relative inline-flex items-center justify-center">
            {/* Spinning decorative ring */}
            <div className="absolute -inset-2 rounded-3xl border-2 border-dashed border-[#4B5940]/30 animate-spin [animation-duration:8s]" />

            {/* Pulsing glow background */}
            <div className="absolute inset-0 rounded-2xl bg-[#EBF0E6] scale-110 blur-xs animate-pulse" />

            {/* Center Logo Box */}
            <div className="relative w-20 h-20 rounded-2xl bg-[#303A2C] border border-[#252A24] flex items-center justify-center p-3 shadow-md">
              <Logo size={36} priority />
            </div>
          </div>

          {/* Texts */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#172115] tracking-tight">
              جاري تحميل البيانات...
            </h1>
            <p className="text-xs sm:text-sm text-[#616E5D] leading-relaxed max-w-xs mx-auto">
              يرجى الانتظار قليلاً بينما نجهز لك واجهة النظام والمعلومات العقارية.
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full max-w-[200px] mx-auto space-y-2">
            <div className="h-1.5 w-full bg-[#EBF0E6] rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 bg-[#4B5940] rounded-full w-1/2 animate-[shimmer_1.6s_infinite_linear] bg-gradient-to-r from-[#4B5940] via-[#C9B99A] to-[#4B5940]" />
            </div>
            <div className="flex justify-center gap-1.5 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4B5940] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C694E] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9B99A] animate-bounce" />
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
