"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";

export function OperationsHeader() {
  const handleExport = () => {
    toast.success("جاري تصدير قائمة العمليات (CSV / Excel)...");
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-[#DCE2D7] shadow-xs font-cairo">
      <div>
        <h1 className="text-2xl font-bold text-[#252A24]">العمليات</h1>
        <p className="text-sm text-[#687163] mt-1">
          متابعة كل عمليات التنظيف والصيانة على مستوى المنصة.
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-[#CCD4C6] text-[#252A24] hover:bg-[#EFF2EB] transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#252A24]" />
          <span>تصدير القائمة (CSV / Excel)</span>
        </button>
      </div>
    </div>
  );
}
