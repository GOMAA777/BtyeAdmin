"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Search,
  Building2,
  Home,
  Eye,
  CheckCircle2,
  Check,
} from "lucide-react";
import { FilterButton } from "@/components/shared/filter-button";
import { cn } from "@/lib/utils";
import { GuestBooking } from "../types";

interface GuestBookingsTableCardProps {
  bookings: GuestBooking[];
  totalRevenue?: number;
}

export function GuestBookingsTableCard({
  bookings,
  totalRevenue = 10300,
}: GuestBookingsTableCardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      statusFilter === "all" || b.status === statusFilter;

    if (!searchQuery.trim()) return matchesStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(q) ||
      b.propertyName.toLowerCase().includes(q) ||
      b.unitName.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const formatMoney = (val: number) => {
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val) + " ر.س"
    );
  };

  return (
    <div className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] space-y-6">
      {/* 1. Ledger Header & Filter Controls (Figma node 1:11152) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Right in RTL: Icon + Heading + Count Badge */}
        <div className="flex items-center gap-2">
          {/* Square chip (Figma node 1:11166) */}
          <div className="size-[40px] rounded-[12px] bg-[#D8E8CB] flex items-center justify-center text-[#34422A] shrink-0">
            <RotateCcw className="w-4 h-4 stroke-[2.2]" />
          </div>

          <h2 className="text-[20px] font-semibold font-cairo text-[#181D17] leading-[30px]">
            سجل الحجوزات على المنصة
          </h2>

          <span className="bg-[#E5EAE0] text-[#181D17] text-[12px] font-bold px-3 py-0.5 rounded-full select-none">
            {bookings.length} حجوزات
          </span>
        </div>

        {/* Left in RTL: Filter Button & Table Search Filter */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className="w-10 h-10 rounded-full bg-[#EFF2EB] hover:bg-[#E2E7DE] text-[#252A24] flex items-center justify-center transition-all cursor-pointer shrink-0 select-none active:scale-95 group"
            title="إعادة ضبط الفلاتر"
            aria-label="إعادة ضبط الفلاتر"
          >
            <RotateCcw className="w-4 h-4 text-[#252A24] group-hover:-rotate-45 transition-transform duration-200" />
          </button>

          <div className="relative">
            <FilterButton
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              activeCount={statusFilter !== "all" ? 1 : 0}
              title="تصفية حجوزات النزيل"
            />
            {isFilterOpen && (
              <div className="absolute top-full start-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#EEF2E6] p-2 z-30 space-y-1 font-cairo">
                <div className="text-[11px] font-bold text-[#556350] px-2.5 py-1">
                  حالة الحجز
                </div>
                {[
                  { id: "all", label: "الكل" },
                  { id: "upcoming", label: "الحجوزات القادمة" },
                  { id: "completed", label: "الحجوزات المكتملة" },
                  { id: "cancelled", label: "الحجوزات الملغاة" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setStatusFilter(opt.id);
                      setIsFilterOpen(false);
                    }}
                    className={cn(
                      "w-full px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between text-start cursor-pointer transition-colors",
                      statusFilter === opt.id
                        ? "bg-[#4B5940] text-white"
                        : "hover:bg-[#F6F8F4] text-[#252A24]"
                    )}
                  >
                    <span>{opt.label}</span>
                    {statusFilter === opt.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full sm:w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم الحجز أو اسم العقار..."
              className="w-full h-10 pe-4 ps-10 rounded-full bg-[#EAEFE6] border border-[#CCD4C6] text-xs text-[#252A24] placeholder:text-[#727A6E] focus:bg-white focus:border-[#4B5940] focus:outline-none focus:ring-2 focus:ring-[#4B5940]/20 transition-all shadow-2xs font-medium font-cairo"
            />
            <div className="absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#727A6E]">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Data Ledger Table (Figma node 1:11169) */}
      <div className="bg-[rgba(241,245,235,0.2)] rounded-[12px] overflow-x-auto border border-[#EBEFE6]">
        <table className="w-full text-right border-collapse">
          {/* Table Header (Figma node 1:11171) */}
          <thead>
            <tr className="bg-[#F1F5EB] text-[#75786F] text-[12px] font-semibold select-none h-[68px]">
              <th className="py-4 px-4 font-semibold text-right">رقم الحجز والمصدر</th>
              <th className="py-4 px-4 font-semibold text-right">العقار</th>
              <th className="py-4 px-4 font-semibold text-right">الوحدة المحجوزة</th>
              <th className="py-4 px-4 font-semibold text-right">تاريخ الوصول</th>
              <th className="py-4 px-4 font-semibold text-right">تاريخ المغادرة</th>
              <th className="py-4 px-4 font-semibold text-right">القيمة الإجمالية</th>
              <th className="py-4 px-4 font-semibold text-right">الحالة</th>
              <th className="py-4 px-4 font-semibold text-center">الإجراءات</th>
            </tr>
          </thead>

          {/* Table Body (Figma node 1:11188) */}
          <tbody className="divide-y divide-[#EBEFE6]">
            {filteredBookings.map((b) => {
              const isCancelled = b.status === "cancelled";
              const isUpcoming = b.status === "upcoming";

              return (
                <tr
                  key={b.id}
                  className="hover:bg-white/80 transition-colors h-[76px]"
                >
                  {/* Col 1: Booking Code & Source */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="font-bold text-[#181D17] text-[14px] font-mono">
                        {b.bookingCode}
                      </div>
                      <div className="bg-[#D8E8CB] text-[#121F0D] text-[11px] font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 select-none">
                        <span>{b.source}</span>
                        <span className="size-1.5 rounded-full bg-[#34422A]" />
                      </div>
                    </div>
                  </td>

                  {/* Col 2: Property */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 font-bold text-[#181D17] text-[13px]">
                      <span>{b.propertyName}</span>
                      {b.propertyType === "villa" ? (
                        <Home className="w-4 h-4 text-[#75786F] shrink-0" />
                      ) : (
                        <Building2 className="w-4 h-4 text-[#75786F] shrink-0" />
                      )}
                    </div>
                  </td>

                  {/* Col 3: Unit */}
                  <td className="py-4 px-4 whitespace-nowrap text-[13px] text-[#454840]">
                    {b.unitName}
                  </td>

                  {/* Col 4: Check-In Date */}
                  <td className="py-4 px-4 whitespace-nowrap text-[13px] font-medium text-[#181D17]">
                    {b.checkInDate}
                  </td>

                  {/* Col 5: Check-Out Date */}
                  <td className="py-4 px-4 whitespace-nowrap text-[13px] font-medium text-[#181D17]">
                    {b.checkOutDate}
                  </td>

                  {/* Col 6: Total Amount */}
                  <td className="py-4 px-4 whitespace-nowrap text-[14px] font-bold text-[#181D17]">
                    <span>{new Intl.NumberFormat("en-US").format(b.totalAmount)}</span>
                    <span className="text-[12px] text-[#75786F] font-normal mr-1">ر.س</span>
                  </td>

                  {/* Col 7: Status Pill */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {isCancelled ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFDAD6] text-[#BA1A1A] text-[12px] font-medium select-none">
                        <span>{b.statusText}</span>
                        <span className="size-1.5 rounded-full bg-[#BA1A1A]" />
                      </span>
                    ) : isUpcoming ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E8C7] text-[#181D17] text-[12px] font-medium select-none">
                        <span>{b.statusText}</span>
                        <span className="size-1.5 rounded-full bg-[#34422A]" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EAE0] text-[#181D17] text-[12px] font-medium select-none">
                        <span>{b.statusText}</span>
                        <span className="size-1.5 rounded-full bg-[#54624C]" />
                      </span>
                    )}
                  </td>

                  {/* Col 8: Action Button */}
                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <Link
                      href={`/bookings/${b.bookingCode}/`}
                      className="bg-[#E5EAE0] hover:bg-[#D8DDD3] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[#181D17] text-[12px] font-semibold h-[36px] px-3 rounded-[8px] inline-flex items-center gap-1.5 transition-all select-none active:scale-98"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#181D17]" />
                      <span>عرض الحجز</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. Footer Summary of Ledger (Figma node 1:11321) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* Right in RTL: Audit Note */}
        <div className="flex items-center gap-2 text-[#75786F] text-[11px] font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#34422A] shrink-0" />
          <span>
            جميع السجلات المالية للحجوزات مراجعة وموثقة بسجلات الفوترة المركزية.
          </span>
        </div>

        {/* Left in RTL: Total Revenue */}
        <div className="text-[11px] text-[#75786F] font-medium flex items-center gap-1">
          <span>إجمالي العوائد المحصلة من النزيل: </span>
          <span className="text-[14px] font-bold font-cairo text-[#181D17]">{formatMoney(totalRevenue)}</span>
        </div>
      </div>
    </div>
  );
}
