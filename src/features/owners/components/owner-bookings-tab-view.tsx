"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Eye,
  CalendarCheck,
  CalendarSync,
  Trash2,
  KeyRound,
  Lock,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedTabs } from "@/components/shared/animated-tabs";
import { FilterButton } from "@/components/shared/filter-button";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { ExtendStayModal } from "@/features/bookings/components/extend-stay-modal";
import { CancelBookingModal } from "@/features/bookings/components/cancel-booking-modal";
import { TablePagination } from "@/components/shared/table-pagination";
import { OwnerBookingsKPIs } from "./owner-bookings-kpis";
import { OwnerBookingItem, OwnerBookingsKPIData } from "../types";
import { defaultOwnerBookings, defaultOwnerBookingsKPIs } from "../data/mock-owner-bookings";
import { OwnerBookingsFilterDrawer, BookingFilterState } from "./owner-bookings-filter-drawer";
import { BookingsEmptyStateView } from "@/features/bookings/components/bookings-empty-state-view";

interface OwnerBookingsTabViewProps {
  bookings?: OwnerBookingItem[];
  kpis?: OwnerBookingsKPIData;
}

export function OwnerBookingsTabView({
  bookings = defaultOwnerBookings,
  kpis = defaultOwnerBookingsKPIs,
}: OwnerBookingsTabViewProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "upcoming" | "completed" | "cancelled"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [bookingFilters, setBookingFilters] = useState<BookingFilterState>({
    source: "all",
    accessStatus: "all",
    propertyName: "all",
    sortBy: "default",
  });

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (bookingFilters.source !== "all") count++;
    if (bookingFilters.accessStatus !== "all") count++;
    if (bookingFilters.propertyName !== "all") count++;
    if (bookingFilters.sortBy !== "default") count++;
    return count;
  }, [bookingFilters]);

  // Modals state for action dropdown
  const [selectedBookingForExtend, setSelectedBookingForExtend] =
    useState<OwnerBookingItem | null>(null);
  const [selectedBookingForCancel, setSelectedBookingForCancel] =
    useState<OwnerBookingItem | null>(null);

  // Dynamic status counts
  const statusCounts = useMemo(() => {
    return {
      all: bookings.length,
      active: bookings.filter((b) => b.status === "active" || b.status === "checkout_today").length,
      upcoming: bookings.filter((b) => b.status === "upcoming").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    };
  }, [bookings]);

  // Filter bookings based on status tabs, advanced drawer, and search query
  const filteredBookings = useMemo(() => {
    let list = bookings.filter((item) => {
      // 1. Status filter tab
      if (filterStatus === "active" && item.status !== "active" && item.status !== "checkout_today") {
        return false;
      }
      if (filterStatus === "upcoming" && item.status !== "upcoming") return false;
      if (filterStatus === "completed" && item.status !== "completed") return false;
      if (filterStatus === "cancelled" && item.status !== "cancelled") return false;

      // 2. Booking Source Filter (from drawer)
      if (bookingFilters.source !== "all" && item.source !== bookingFilters.source) {
        return false;
      }

      // 3. Access Status Filter (from drawer)
      if (bookingFilters.accessStatus !== "all" && item.accessStatus !== bookingFilters.accessStatus) {
        return false;
      }

      // 4. Property Name Filter (from drawer)
      if (bookingFilters.propertyName !== "all" && !item.propertyName.includes(bookingFilters.propertyName)) {
        return false;
      }

      // 5. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.guestName.toLowerCase().includes(q);
        const matchesCode = item.bookingCode.toLowerCase().includes(q);
        const matchesProperty = item.propertyName.toLowerCase().includes(q);
        const matchesLocation = item.propertyLocation.toLowerCase().includes(q);
        const matchesUnit = item.unitNumber.toLowerCase().includes(q);
        const matchesPhone = item.phone.toLowerCase().includes(q);

        if (
          !matchesName &&
          !matchesCode &&
          !matchesProperty &&
          !matchesLocation &&
          !matchesUnit &&
          !matchesPhone
        ) {
          return false;
        }
      }

      return true;
    });

    // 6. Sorting (from drawer)
    if (bookingFilters.sortBy === "checkin_desc") {
      list = [...list].sort((a, b) => b.checkInDate.localeCompare(a.checkInDate));
    } else if (bookingFilters.sortBy === "checkout_asc") {
      list = [...list].sort((a, b) => a.checkOutDate.localeCompare(b.checkOutDate));
    } else if (bookingFilters.sortBy === "code_asc") {
      list = [...list].sort((a, b) => a.bookingCode.localeCompare(b.bookingCode));
    }

    return list;
  }, [bookings, filterStatus, bookingFilters, searchQuery]);

  const totalFiltered = filteredBookings.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / rowsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * rowsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + rowsPerPage);

  const searchParams = useSearchParams();
  const forceEmpty =
    searchParams?.get("empty") === "true" ||
    searchParams?.get("state") === "empty";

  const handleResetAllFilters = () => {
    setBookingFilters({
      source: "all",
      accessStatus: "all",
      propertyName: "all",
      sortBy: "default",
    });
    setFilterStatus("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  if (bookings.length === 0 || forceEmpty) {
    return <BookingsEmptyStateView />;
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. 4 REQUIRED KPI CARDS (Matching Figma frame 1:3435 exactly) */}
      <OwnerBookingsKPIs kpis={kpis} />

      {/* 2. Search & Status Filter Bar */}
      <TableToolbar
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="ابحث باسم العقار أو المدينة أو الحي..."
        onOpenAdvancedFilter={() => setIsFilterDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
        filterButtonTitle="تصفية الحجوزات"
        onResetFilter={handleResetAllFilters}
        tabs={[
          { id: "all", label: `الكل (${statusCounts.all})` },
          { id: "active", label: `الحالية (${statusCounts.active})` },
          { id: "upcoming", label: `القادمة (${statusCounts.upcoming})` },
          { id: "completed", label: `المنتهية (${statusCounts.completed})` },
          { id: "cancelled", label: `الملغاة (${statusCounts.cancelled})` },
        ]}
        currentTab={filterStatus}
        onTabChange={(id) => {
          setFilterStatus(id as any);
          setCurrentPage(1);
        }}
        tabsLayoutId="ownerBookingsFilterPill"
      />

      {/* 3. Enterprise Bookings Table & Footer (Matching Figma frame 1:3513 & 1:3846) */}
      <div className="bg-white border border-[#e5e8e2] rounded-[16px] overflow-hidden drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#f6f7f4] border-b border-[#e5e8e2] text-[#73786f] text-xs font-bold">
                <th className="px-6 py-4 whitespace-nowrap text-right">العميل / النزيل</th>
                <th className="px-4 py-4 whitespace-nowrap text-right">العقار</th>
                <th className="px-4 py-4 whitespace-nowrap text-right">الوحدة</th>
                <th className="px-4 py-4 whitespace-nowrap text-right">مصدر الحجز</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="leading-tight">
                    <div>تاريخ</div>
                    <div>الدخول</div>
                  </div>
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="leading-tight">
                    <div>تاريخ</div>
                    <div>المغادرة</div>
                  </div>
                </th>
                <th className="px-4 py-4 whitespace-nowrap text-right">الحالة</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">أكواد الدخول</th>
                <th className="px-6 py-3 whitespace-nowrap text-center">
                  <div className="leading-tight">
                    <div>الإجراءات</div>
                    <div>(Admin)</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e8e2]">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-12 text-[#73786f] text-xs font-medium"
                  >
                    لا توجد حجوزات مطابقة لمعايير البحث
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-[#f6f7f4]/40 transition-colors"
                  >
                    {/* 1. العميل / النزيل */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0",
                            booking.avatarBg || "bg-[#eaf1e8]",
                            booking.avatarColor || "text-[#4b5940]"
                          )}
                        >
                          {booking.guestInitials}
                        </div>
                        <div>
                          <div className="font-bold text-[14px] text-[#252a24]">
                            {booking.guestName}
                          </div>
                          <div className="text-[11px] text-[#73786f] mt-0.5" dir="ltr">
                            {booking.bookingCode} • {booking.phone}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. العقار */}
                    <td className="px-4 py-5 whitespace-nowrap">
                      <div className="font-bold text-[12px] text-[#252a24]">
                        {booking.propertyName}
                      </div>
                      <div className="text-[11px] text-[#73786f] mt-0.5 font-medium">
                        {booking.propertyLocation}
                      </div>
                    </td>

                    {/* 3. الوحدة */}
                    <td className="px-4 py-5 whitespace-nowrap">
                      <div className="inline-block bg-[#f6f7f4] border border-[#e5e8e2] px-2.5 py-0.5 rounded-[8px] font-bold text-[12px] text-[#252a24]">
                        {booking.unitNumber}
                      </div>
                      <div
                        className={cn(
                          "text-[10px] mt-1 font-medium",
                          booking.isUnitNoteWarning
                            ? "text-[#b45309] font-semibold"
                            : "text-[#73786f]"
                        )}
                      >
                        {booking.unitDescription}
                      </div>
                    </td>

                    {/* 4. مصدر الحجز */}
                    <td className="px-4 py-5 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 bg-[rgba(0,53,128,0.08)] border border-[rgba(0,53,128,0.15)] px-2.5 py-1 rounded-[8px]">
                        <span className="font-bold text-[12px] text-[#003580]">
                          {booking.source}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#003580]" />
                      </div>
                      {booking.sourceId && (
                        <div className="text-[10px] text-[#73786f] mt-1 font-normal">
                          {booking.sourceId}
                        </div>
                      )}
                    </td>

                    {/* 5. تاريخ الدخول */}
                    <td className="px-4 py-5 whitespace-nowrap">
                      <div className="font-bold text-[12px] text-[#252a24] leading-tight">
                        {booking.checkInDate}
                      </div>
                      <div
                        className={cn(
                          "text-[10px] mt-0.5 font-medium",
                          booking.checkInIsToday ? "text-[#b45309]" : "text-[#73786f]"
                        )}
                      >
                        {booking.checkInNote || booking.checkInSubtext}
                      </div>
                    </td>

                    {/* 6. تاريخ المغادرة */}
                    <td className="px-4 py-5 whitespace-nowrap">
                      <div
                        className={cn(
                          "font-bold text-[12px] leading-tight",
                          booking.checkOutIsToday ? "text-[#be123c]" : "text-[#252a24]"
                        )}
                      >
                        {booking.checkOutDate}
                      </div>
                      <div
                        className={cn(
                          "text-[10px] mt-0.5",
                          booking.checkOutIsToday
                            ? "text-[#e11d48] font-semibold"
                            : "text-[#73786f] font-medium"
                        )}
                      >
                        {booking.checkOutNote || booking.checkOutSubtext}
                      </div>
                    </td>

                    {/* 7. الحالة */}
                    <td className="px-4 py-5 whitespace-nowrap">
                      {booking.status === "active" ? (
                        <div className="inline-flex items-center gap-1.5 bg-[#ecfdf5] border border-[#a7f3d0] px-3 py-1 rounded-full text-right">
                          <span className="font-bold text-[12px] text-[#065f46]">نشط</span>
                          <span className="w-[3px] h-2.5 rounded-full bg-[#10b981]" />
                        </div>
                      ) : booking.status === "upcoming" ? (
                        <div className="inline-flex items-center gap-1.5 bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 rounded-full text-right">
                          <span className="font-bold text-[12px] text-[#1e40af]">قادم</span>
                          <span className="w-[3px] h-2.5 rounded-full bg-[#2563eb]" />
                        </div>
                      ) : booking.status === "checkout_today" ? (
                        <div className="inline-flex items-center gap-1.5 bg-[#fffbeb] border border-[#fde68a] px-3 py-1 rounded-full text-right">
                          <span className="font-bold text-[12px] text-[#92400e]">مغادرة اليوم</span>
                          <span className="w-[3px] h-2.5 rounded-full bg-[#f59e0b]" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 bg-[#f3f4f6] border border-[#e5e7eb] px-3 py-1 rounded-full text-right">
                          <span className="font-semibold text-[11px] text-[#374151]">
                            منتهٍ (مغادرة مكتملة)
                          </span>
                          <span className="w-[3px] h-2.5 rounded-full bg-[#9ca3af]" />
                        </div>
                      )}
                    </td>

                    {/* 8. أكواد الدخول */}
                    <td className="px-4 py-5 whitespace-nowrap text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] border",
                            booking.accessStatus === "disabled"
                              ? "bg-[#f9fafb] border-[#e5e7eb]"
                              : booking.accessStatus === "pending"
                              ? "bg-[#f6f7f4] border-[#e5e8e2]"
                              : "bg-[#f5f1e8] border-[#e6dccf]"
                          )}
                        >
                          <span
                            className={cn(
                              "text-[12px] font-mono",
                              booking.accessStatus === "disabled"
                                ? "text-[#9ca3af]"
                                : booking.accessStatus === "pending"
                                ? "text-[#73786f]"
                                : "text-[#4b5940] font-medium"
                            )}
                          >
                            {booking.accessCode}
                          </span>
                          {booking.accessStatus === "disabled" ? (
                            <Lock className="w-3 h-3 text-[#9ca3af]" />
                          ) : (
                            <KeyRound
                              className={cn(
                                "w-3 h-3",
                                booking.accessStatus === "pending"
                                  ? "text-[#73786f]"
                                  : "text-[#4b5940]"
                              )}
                            />
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-[10px] font-medium",
                            booking.accessStatus === "connected" && "text-[#059669]",
                            booking.accessStatus === "pending" && "text-[#d97706]",
                            booking.accessStatus === "expiring" && "text-[#73786f]",
                            booking.accessStatus === "disabled" && "text-[#9ca3af]"
                          )}
                        >
                          {booking.accessCodeDevice || booking.accessDevice}
                        </span>
                      </div>
                    </td>

                    {/* 9. الإجراءات (Admin) */}
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <ActionDropdown
                        items={[
                          {
                            label: "تفاصيل الحجز",
                            icon: Eye,
                            onClick: () =>
                              router.push(
                                `/bookings/${booking.bookingCode || booking.id}/`
                              ),
                          },
                          {
                            label: "تعديل الحجز",
                            icon: CalendarCheck,
                            onClick: () =>
                              router.push(
                                `/bookings/${booking.bookingCode || booking.id}/edit/`
                              ),
                          },
                          {
                            label: "تمديد الإقامة",
                            icon: CalendarSync,
                            onClick: () => setSelectedBookingForExtend(booking),
                          },
                          {
                            label: "إلغاء الحجز",
                            icon: Trash2,
                            variant: "destructive",
                            onClick: () => setSelectedBookingForCancel(booking),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Table Footer & Pagination */}
        <TablePagination
          currentPage={activePage}
          totalPages={totalPages}
          totalCount={totalFiltered}
          fromIndex={totalFiltered === 0 ? 0 : startIndex + 1}
          toIndex={Math.min(startIndex + rowsPerPage, totalFiltered)}
          pageSize={rowsPerPage}
          pageSizeOptions={[5, 10]}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setRowsPerPage(size);
            setCurrentPage(1);
          }}
          entityName="حجز"
          pluralEntityName="حجوزات"
          registeredLabel="نشط"
        />
      </div>

      {/* 5. Modals for Booking Actions */}
      <ExtendStayModal
        isOpen={!!selectedBookingForExtend}
        onClose={() => setSelectedBookingForExtend(null)}
        bookingCode={selectedBookingForExtend?.bookingCode || "BK-2026-1048"}
        onConfirm={() => {
          setSelectedBookingForExtend(null);
        }}
      />

      <CancelBookingModal
        isOpen={!!selectedBookingForCancel}
        onClose={() => setSelectedBookingForCancel(null)}
        bookingCode={selectedBookingForCancel?.bookingCode || "BK-2026-1048"}
        onConfirm={() => {
          setSelectedBookingForCancel(null);
        }}
      />

      {/* 6. Advanced Filter Drawer */}
      <OwnerBookingsFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={bookingFilters}
        onApplyFilters={(filters) => {
          setBookingFilters(filters);
          setCurrentPage(1);
        }}
        onResetFilters={() => {
          setBookingFilters({
            source: "all",
            accessStatus: "all",
            propertyName: "all",
            sortBy: "default",
          });
          setCurrentPage(1);
        }}
        totalResultsCount={filteredBookings.length}
      />
    </div>
  );
}
