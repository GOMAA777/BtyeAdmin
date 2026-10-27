"use client";

import Link from "next/link";
import { useAppDataStore } from "@/stores/use-app-data-store";

export function DashboardStatusBreakdown() {
  const owners = useAppDataStore((s) => s.owners);
  const total = owners.length;
  const activeCount = owners.filter((o) => o.status === "active").length;
  const inactiveCount = owners.filter((o) => o.status === "inactive").length;
  const pendingCount = owners.filter((o) => o.status === "pending").length;

  const activePct = total > 0 ? Math.round((activeCount / total) * 100) : 0;
  const inactivePct = total > 0 ? Math.round((inactiveCount / total) * 100) : 0;
  const pendingPct = total > 0 ? Math.round((pendingCount / total) * 100) : 0;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E0E4D8]/60 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-base font-bold text-[#172115]">حالة أصحاب العقارات</h2>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EAF0E6] text-[#2C382A] select-none">
            {total} إجمالي
          </span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#EAF0E6] mt-4 mb-4">
          <div style={{ width: `${activePct}%` }} className="bg-[#347A4B] h-full" title={`نشط ${activePct}%`} />
          <div style={{ width: `${inactivePct}%` }} className="bg-[#6B7268] h-full" title={`غير نشط ${inactivePct}%`} />
          <div style={{ width: `${pendingPct}%` }} className="bg-[#E58B24] h-full" title={`بانتظار المراجعة ${pendingPct}%`} />
        </div>

        {/* 3 Status Item Cards */}
        <div className="space-y-3 pt-1">
          {/* Active Status */}
          <div className="p-4 rounded-2xl bg-[#F1F5EB] flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#347A4B]" />
                <span className="text-sm font-bold text-[#172115]">نشط</span>
              </div>
              <div className="flex items-center gap-1.5" dir="ltr">
                <span className="text-xs text-[#7A8574] font-normal">({activePct}%)</span>
                <span className="text-sm font-bold text-[#172115]">{activeCount}</span>
              </div>
            </div>
            {/* Mini Progress Track */}
            <div className="w-full h-1.5 bg-[#E2E7DB] rounded-full overflow-hidden mt-3 flex justify-start">
              <div style={{ width: `${activePct}%` }} className="h-full bg-[#347A4B] rounded-full" />
            </div>
          </div>

          {/* Inactive Status */}
          <div className="p-4 rounded-2xl bg-[#F1F5EB] flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6B7268]" />
                <span className="text-sm font-bold text-[#172115]">غير نشط</span>
              </div>
              <div className="flex items-center gap-1.5" dir="ltr">
                <span className="text-xs text-[#7A8574] font-normal">({inactivePct}%)</span>
                <span className="text-sm font-bold text-[#172115]">{inactiveCount}</span>
              </div>
            </div>
            {/* Mini Progress Track */}
            <div className="w-full h-1.5 bg-[#E2E7DB] rounded-full overflow-hidden mt-3 flex justify-start">
              <div style={{ width: `${inactivePct}%` }} className="h-full bg-[#6B7268] rounded-full" />
            </div>
          </div>

          {/* Pending Status */}
          <div className="p-4 rounded-2xl bg-[#F1F5EB] flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E58B24]" />
                <span className="text-sm font-bold text-[#172115]">بانتظار المراجعة</span>
              </div>
              <div className="flex items-center gap-1.5" dir="ltr">
                <span className="text-xs text-[#7A8574] font-normal">({pendingPct}%)</span>
                <span className="text-sm font-bold text-[#172115]">{pendingCount}</span>
              </div>
            </div>
            {/* Mini Progress Track */}
            <div className="w-full h-1.5 bg-[#E2E7DB] rounded-full overflow-hidden mt-3 flex justify-start">
              <div style={{ width: `${pendingPct}%` }} className="h-full bg-[#E58B24] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex items-center justify-between text-xs text-[#7A8574]">
        <span>متوسط اعتماد الحساب: 24 ساعة</span>
        <Link
          href="/owners/?status=pending"
          className="font-medium text-[#2E3A2B] hover:text-[#172115] hover:underline flex items-center gap-1.5 transition-colors"
          dir="ltr"
        >
          <span className="text-sm leading-none">←</span>
          <span>مراجعة فورية</span>
        </Link>
      </div>
    </div>
  );
}
