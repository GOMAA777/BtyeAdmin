"use client";

import Link from "next/link";
import { Building2, Home, Building } from "lucide-react";
import { useAppDataStore } from "@/stores/use-app-data-store";

interface PropertyItem {
  id: string;
  name: string;
  city: string;
  units: string;
  owner: string;
  dotColor: string;
  icon: "building-2" | "home" | "building";
}

export function DashboardRecentProperties() {
  const storeProperties = useAppDataStore((s) => s.properties);

  const properties: PropertyItem[] = storeProperties.slice(0, 5).map((p) => ({
    id: p.id,
    name: p.title || p.name || "عقار",
    city: p.city || "الرياض",
    units: `${p.totalUnits || p.unitsCount || 1} وحدات`,
    owner: p.ownerName || "المالك المسجل",
    dotColor: p.status === "active" ? "#347A4B" : "#E58B24",
    icon: "building-2",
  }));
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E0E4D8]/60 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#172115]" />
            <h2 className="text-base sm:text-lg font-bold text-[#172115]">
              أحدث العقارات
            </h2>
          </div>

          <Link
            href="/properties/"
            className="font-medium text-[#2E3A2B] hover:text-[#172115] hover:underline flex items-center gap-1.5 text-xs sm:text-sm transition-colors"
            dir="ltr"
          >
            <span className="text-sm leading-none">←</span>
            <span>عرض جميع العقارات</span>
          </Link>
        </div>

        {/* Property Items List or Empty State */}
        {properties.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-2">
            <span className="text-sm font-semibold text-[#172115]">
              لا توجد عقارات مسجلة حتى الآن
            </span>
            <span className="text-xs text-[#7A8574]">
              ستظهر العقارات هنا فور إضافتها إلى المنظومة
            </span>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            {properties.map((prop) => (
              <Link
                key={prop.id}
                href={`/properties/${prop.id}/`}
                className="py-2.5 px-3 flex items-center justify-between hover:bg-[#F9FAF7] rounded-2xl transition-colors group select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#EFF4E8] flex items-center justify-center text-[#374732] shrink-0">
                    {prop.icon === "building-2" && <Building2 className="w-5 h-5" />}
                    {prop.icon === "home" && <Home className="w-5 h-5" />}
                    {prop.icon === "building" && <Building className="w-5 h-5" />}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#172115]">
                        {prop.name}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${prop.dotColor}`} />
                    </div>
                    <div className="text-xs text-[#7A8574]">
                      {prop.city} &rlm;▪&rlm; {prop.units} &rlm;▪&rlm; المالك: {prop.owner}
                    </div>
                  </div>
                </div>

                <span className="text-sm text-[#8A9685] group-hover:text-[#172115] transition-colors leading-none">
                  ←
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-xs text-[#7A8574]">
        <span>إجمالي العقارات الموثقة: 0 عقار</span>
        <Link
          href="/properties/"
          className="font-medium text-[#2E3A2B] hover:text-[#172115] hover:underline flex items-center gap-1.5 transition-colors"
          dir="ltr"
        >
          <span className="text-sm leading-none">←</span>
          <span>إدارة الوثائق</span>
        </Link>
      </div>
    </div>
  );
}
