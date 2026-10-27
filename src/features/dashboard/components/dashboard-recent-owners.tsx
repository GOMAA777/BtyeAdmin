"use client";

import Link from "next/link";
import { Users2 } from "lucide-react";
import { useAppDataStore } from "@/stores/use-app-data-store";

interface OwnerItem {
  id: string;
  name: string;
  email: string;
  initials: string;
  propertyCount: string;
  propertyLabel: string;
  unitCount: string;
  unitLabel: string;
  date: {
    primary: string;
    secondary?: string;
  };
  status: "active" | "pending";
}

export function DashboardRecentOwners() {
  const owners = useAppDataStore((s) => s.owners);

  const recentOwners: OwnerItem[] = owners.slice(0, 5).map((o) => ({
    id: o.id,
    name: o.name,
    email: o.email || "owner@example.sa",
    initials: o.initials || o.name.slice(0, 2),
    propertyCount: String(o.propertiesCount || 1),
    propertyLabel: "عقار",
    unitCount: String(o.unitsCount || 1),
    unitLabel: "وحدة",
    date: {
      primary: o.registrationDate || "اليوم",
    },
    status: o.status === "active" ? "active" : "pending",
  }));
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E0E4D8]/60 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <Users2 className="w-5 h-5 text-[#172115]" />
            <h2 className="text-base sm:text-lg font-bold text-[#172115]">
              أحدث أصحاب العقارات
            </h2>
          </div>

          <Link
            href="/owners/"
            className="font-medium text-[#2E3A2B] hover:text-[#172115] hover:underline flex items-center gap-1.5 text-xs sm:text-sm transition-colors"
            dir="ltr"
          >
            <span className="text-sm leading-none">←</span>
            <span>عرض جميع أصحاب العقارات</span>
          </Link>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="bg-[#F1F5EB] text-[#5C6958] text-xs font-medium">
                <th className="py-2.5 px-4 text-start font-medium rounded-r-xl">المالك</th>
                <th className="py-2.5 px-3 text-center font-medium">العقارات</th>
                <th className="py-2.5 px-3 text-center font-medium">الوحدات</th>
                <th className="py-2.5 px-3 text-center font-medium">تاريخ التسجيل</th>
                <th className="py-2.5 px-4 text-center font-medium rounded-l-xl">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {recentOwners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#7A8574]">
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <span className="text-sm font-semibold text-[#172115]">
                        لا يوجد أصحاب عقارات مسجلون حتى الآن
                      </span>
                      <span className="text-xs text-[#7A8574]">
                        سيظهر أصحاب العقارات الجدد هنا فور إضافتهم للنظام
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                recentOwners.map((owner) => (
                  <tr
                    key={owner.id}
                    className="hover:bg-[#F9FAF7] transition-colors"
                  >
                    {/* Owner Column */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#DCE6D7] text-[#2C3825] font-bold text-xs flex items-center justify-center shrink-0 select-none">
                          {owner.initials}
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-bold text-[#172115] text-sm">
                            {owner.name}
                          </div>
                          <div className="text-xs text-[#7A8574]" dir="ltr">
                            {owner.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Properties Column */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-[#172115]">
                          {owner.propertyCount}
                        </span>
                        <span className="text-xs text-[#7A8574]">
                          {owner.propertyLabel}
                        </span>
                      </div>
                    </td>

                    {/* Units Column */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-[#172115]">
                          {owner.unitCount}
                        </span>
                        <span className="text-xs text-[#7A8574]">
                          {owner.unitLabel}
                        </span>
                      </div>
                    </td>

                    {/* Date Column */}
                    <td className="py-3 px-3 text-center">
                      {owner.date.secondary ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs font-semibold text-[#172115]">
                            {owner.date.primary}
                          </span>
                          <span className="text-xs text-[#7A8574]">
                            {owner.date.secondary}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#5C6958] font-medium">
                          {owner.date.primary}
                        </span>
                      )}
                    </td>

                    {/* Status Column */}
                    <td className="py-3 px-4 text-center">
                      {owner.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0E6] text-[#2C6E33] text-xs font-semibold select-none">
                          <span className="w-2 h-2 rounded-full bg-[#347A4B]" />
                          <span>نشط</span>
                        </span>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#FFF6E7] text-[#D97706] text-xs font-semibold select-none leading-tight">
                          <span className="w-2 h-2 rounded-full bg-[#E58B24] shrink-0" />
                          <div className="flex flex-col text-start">
                            <span>بانتظار</span>
                            <span>المراجعة</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
