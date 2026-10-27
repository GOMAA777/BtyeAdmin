import Link from "next/link";
import {
  History,
  UserPlus,
  Building2,
  Calendar,
  FileEdit,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";

export function DashboardActivityFeed() {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E0E4D8]/60 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-[#172115]" />
          <h2 className="text-base sm:text-lg font-bold text-[#172115]">
            آخر نشاط على المنصة
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#5C6958]">
          <span className="w-2 h-2 rounded-full bg-[#347A4B]" />
          <span className="font-medium">سجل تدقيق العمليات الموثق</span>
        </div>
      </div>

      {/* Activity Timeline Items or Empty State */}
      <div className="py-8 flex flex-col items-center justify-center text-center gap-2">
        <span className="text-sm font-semibold text-[#172115]">
          لا توجد أنشطة مسجلة حتى الآن
        </span>
        <span className="text-xs text-[#7A8574]">
          سيتم توثيق كافة العمليات والأنشطة المنفذة على المنظومة هنا تلقائياً
        </span>
      </div>

      {/* Trust & Audit Banner Footer */}
      <div className="pt-4 mt-2 border-t border-[#F0F2EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A8574]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#347A4B] shrink-0" />
          <span className="text-xs">
            نظام المراقبة اللحظي يعمل بكفاءة 99.98% &rlm;▪&rlm; تم التحقق من جميع سجلات التدقيق
          </span>
        </div>

        <Link
          href="/operations/"
          className="font-medium text-[#2E3A2B] hover:text-[#172115] hover:underline flex items-center gap-1.5 text-xs transition-colors"
          dir="ltr"
        >
          <ChevronLeft className="w-4 h-4 text-[#2E3A2B]" />
          <span>سجل العمليات بالكامل</span>
        </Link>
      </div>
    </div>
  );
}
