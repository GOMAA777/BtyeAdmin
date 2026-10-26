"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Download,
  Copy,
  Check,
  Eye,
  CalendarSync,
  ArrowRightLeft,
  Trash2,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { hardNavigate } from "@/lib/constants";
import { AnimatedTabs } from "@/components/shared/animated-tabs";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { TablePagination } from "@/components/shared/table-pagination";
import { ExtendStayModal } from "@/features/bookings/components/extend-stay-modal";
import { CancelBookingModal } from "@/features/bookings/components/cancel-booking-modal";
import { ChangeUnitModal } from "@/features/bookings/components/change-unit-modal";
import { BookingsAdvancedFilterDrawer } from "./bookings-advanced-filter-drawer";
import { MainBookingItem, BookingStatus } from "../types";
import { defaultMainBookings } from "../data/mock-main-bookings";
import { useBookingsManager } from "../controllers/use-bookings-manager";

interface MainBookingsPageViewProps {
  initialBookings?: MainBookingItem[];
}

export function MainBookingsPageView({
  initialBookings = defaultMainBookings,
}: MainBookingsPageViewProps) {
  const router = useRouter();
  const {
    searchQuery,
    filterStatus,
    currentPage,
    rowsPerPage,
    copiedCode,
    isFilterDrawerOpen,
    bookingFilters,
    activeFiltersCount,
    isExtendModalOpen,
    isCancelModalOpen,
    isChangeUnitModalOpen,
    selectedBookingCode,
    statusCounts,
    filteredBookings,
    totalFiltered,
    totalPages,
    activePage,
    startIndex,
    paginatedBookings,
    setSearchQuery,
    setFilterStatus,
    setCurrentPage,
    setRowsPerPage,
    setIsFilterDrawerOpen,
    setBookingFilters,
    setIsExtendModalOpen,
    setIsCancelModalOpen,
    setIsChangeUnitModalOpen,
    handleCopyCode,
    handleExportCSV,
    handleResetFilters,
    openExtendModal,
    openCancelModal,
    openChangeUnitModal,
    handleConfirmExtend,
    handleConfirmChangeUnit,
    handleConfirmCancel,
  } = useBookingsManager(initialBookings);

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. TOP HERO GREETING BAR (Matching Figma node 1:6557) */}
      <div className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5e8e2]/60 px-6 sm:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Right Info */}
        <div>
          <h1 className="text-[24px] font-bold text-[#181d17] leading-[34px]">
            الحجوزات
          </h1>
          <p className="text-[14px] font-normal text-[#454840] leading-[22px] mt-0.5">
            إدارة ومتابعة جميع الحجوزات المسجلة على المنصة وحالات الوصول والمغادرة والمدفوعات المتزامنة.
          </p>
        </div>

        {/* Left Action Group */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Add Booking Primary Action */}
          <button
            type="button"
            onClick={() => hardNavigate("/bookings/new/")}
            className="bg-[#4b5940] hover:bg-[#3d4934] text-white text-[14px] font-semibold h-[44px] px-[20px] sm:px-[24px] rounded-[12px] flex items-center justify-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة حجز</span>
          </button>

          {/* Export Secondary Action */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="bg-white hover:bg-[#f6f7f4] border border-[#e5e8e2] text-[#181d17] text-[14px] font-medium h-[44px] px-[16px] rounded-[12px] flex items-center justify-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all cursor-pointer shadow-xs whitespace-nowrap"
          >
            <span>تصدير القائمة (CSV / Excel)</span>
            <Download className="w-4 h-4 text-[#181d17]" />
          </button>
        </div>
      </div>

      {/* 2. SEARCH & STATUS FILTER BAR (Matching Figma node 1:6577) */}
      <div className="bg-white border border-[#e5e8e2] rounded-[16px] drop-shadow-[0px_2px_5px_rgba(0,0,0,0.03)] px-5 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Right in RTL: Search Input with Magnifier on Far Right */}
        <div className="relative w-full lg:w-[480px]">
          <div className="bg-[#f6f7f4] rounded-[12px] h-[36px] flex items-center px-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="ابحث باسم العميل، رقم الحجز، العقار أو الوحدة..."
              className="w-full bg-transparent text-[12px] text-[#252a24] placeholder:text-[rgba(115,120,111,0.7)] pe-7 focus:outline-none placeholder:text-right font-medium"
            />
            <div className="absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[rgba(115,120,111,0.7)]">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Left in RTL: Filter Button & Status Filter Tabs */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto flex-wrap">
          {/* Advanced Filter Button */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className={cn(
              "h-[36px] px-3.5 rounded-[12px] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none",
              activeFiltersCount > 0
                ? "bg-[#34432E] text-white shadow-xs"
                : "bg-[#f6f7f4] hover:bg-[#e5ebd8] text-[#252a24]"
            )}
            title="تصفية الحجوزات"
          >
            {activeFiltersCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#4b5940]" />
            )}
            <span>فلتر</span>
            <SlidersHorizontal
              className={cn(
                "w-3.5 h-3.5",
                activeFiltersCount > 0 ? "text-white" : "text-[#252a24]"
              )}
            />
          </button>

          <AnimatedTabs
            tabs={[
              { id: "all", label: `الكل (${statusCounts.all})` },
              { id: "upcoming", label: `القادمة (${statusCounts.upcoming})` },
              { id: "active", label: `الحالية(${statusCounts.active})` },
              { id: "completed", label: `المنتهية(${statusCounts.completed})` },
              { id: "cancelled", label: `الملغاة (${statusCounts.cancelled})` },
            ]}
            value={filterStatus}
            onChange={(id) => {
              setFilterStatus(id as "all" | BookingStatus);
              setCurrentPage(1);
            }}
            layoutId="bookingsFilterPill"
            variant="light"
            trackClassName="bg-[#f6f7f4] rounded-[12px]"
          />
        </div>
      </div>

      {/* 3. HIGH-FIDELITY TABLE CONTAINER (Matching Figma node 1:6597) */}
      <div className="bg-white border border-[#e5e8e2] rounded-[16px] drop-shadow-[0px_2px_5px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#f9faf8] border-b border-[#e5e8e2] h-[52px]">
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  رقم الحجز
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  العميل
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  العقار
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  الوحدة
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  تاريخ الوصول
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  تاريخ المغادرة
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  المصدر
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  المبلغ والتحصيل
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  الحالة
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap text-center">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e8e2]/70 text-[14px]">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-[#73786f]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="font-semibold text-[15px] text-[#181d17]">
                        لا توجد حجوزات مطابقة
                      </p>
                      <p className="text-xs text-[#75786f]">
                        جرب تغيير معايير البحث أو تصفية الحالات
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-[#f9faf8]/60 transition-colors group"
                  >
                    {/* Booking Code with Quick Copy */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyCode(booking.bookingCode)}
                          className="opacity-0 group-hover:opacity-100 text-[#73786f] hover:text-[#34422a] transition-all cursor-pointer p-0.5"
                          title="نسخ رقم الحجز"
                        >
                          {copiedCode === booking.bookingCode ? (
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <Link
                          href={`/bookings/${booking.id}/`}
                          className="font-semibold text-[12px] text-[#34422a] hover:underline"
                        >
                          {booking.bookingCode}
                        </Link>
                      </div>
                    </td>

                    {/* Guest with Avatar Circle */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#d8e8cb] text-[#121f0d] font-bold text-xs size-8 rounded-full flex items-center justify-center shrink-0">
                          {booking.guest.avatarLetter}
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="font-bold text-[14px] text-[#181d17] leading-[20px]">
                            {booking.guest.name}
                          </span>
                          <span className="text-[11px] font-medium text-[#75786f] leading-[16px] dir-ltr text-right">
                            {booking.guest.phone}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Property */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-medium text-[14px] text-[#181d17] leading-[22px]">
                        {booking.propertyName}
                      </span>
                    </td>

                    {/* Unit */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-right">
                        <span className="font-semibold text-[14px] text-[#181d17] leading-[22px]">
                          {booking.unit.unitNumber}
                        </span>
                        <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                          {booking.unit.unitType}
                        </span>
                      </div>
                    </td>

                    {/* Check-in Date */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-right">
                        <span className="font-semibold text-[14px] text-[#181d17] leading-[22px]">
                          {booking.checkIn.date}
                        </span>
                        <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                          {booking.checkIn.time}
                        </span>
                      </div>
                    </td>

                    {/* Check-out Date */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-right">
                        <span className="font-semibold text-[14px] text-[#181d17] leading-[22px]">
                          {booking.checkOut.date}
                        </span>
                        <span className="text-[11px] font-medium text-[#54624c] leading-[16px]">
                          {booking.checkOut.nights}
                        </span>
                      </div>
                    </td>

                    {/* Booking Source Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="bg-[#ebefe6] px-2.5 py-1 rounded-[6px] inline-flex items-center gap-1.5">
                        <span className="font-semibold text-[11px] text-[#181d17]">
                          {booking.source}
                        </span>
                        <span className="size-2 rounded-full bg-[#4b5940]" />
                      </div>
                    </td>

                    {/* Amount & Payment Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-right">
                        <span className="font-bold text-[14px] text-[#181d17] leading-[22px]">
                          {booking.amount.total}
                        </span>
                        <span className="text-[11px] font-medium text-[#54624c] leading-[16px]">
                          {booking.amount.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {booking.status === "upcoming" && (
                        <div className="bg-[#e5eae0] text-[#34422a] text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                          <span>قادم</span>
                          <span className="size-2 rounded-full bg-[#34422a]" />
                        </div>
                      )}
                      {booking.status === "active" && (
                        <div className="bg-[#d8e8cb] text-[#121f0d] text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                          <span>حالي</span>
                          <span className="size-2 rounded-full bg-[#34422a]" />
                        </div>
                      )}
                      {booking.status === "completed" && (
                        <div className="bg-[#e5eae0] text-[#454840] text-[11px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                          <span>منتهي</span>
                          <span className="size-2 rounded-full bg-[#75786f]" />
                        </div>
                      )}
                      {booking.status === "cancelled" && (
                        <div className="bg-[#ffdad6] text-[#93000a] text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                          <span>ملغى</span>
                          <span className="size-2 rounded-full bg-[#ba1a1a]" />
                        </div>
                      )}
                    </td>

                    {/* Actions Menu */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <ActionDropdown
                        items={[
                          {
                            label: "عرض التفاصيل",
                            icon: Eye,
                            onClick: () => router.push(`/bookings/${booking.id}/`),
                          },
                          {
                            label: "تمديد الإقامة",
                            icon: CalendarSync,
                            onClick: () => openExtendModal(booking.bookingCode),
                          },
                          {
                            label: "تغيير الوحدة",
                            icon: ArrowRightLeft,
                            onClick: () => openChangeUnitModal(booking.bookingCode),
                          },
                          {
                            label: "إلغاء الحجز",
                            icon: Trash2,
                            variant: "destructive",
                            onClick: () => openCancelModal(booking.bookingCode),
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

        {/* 4. TABLE FOOTER / PAGINATION CONTROLS */}
        <TablePagination
          currentPage={activePage}
          totalPages={totalPages}
          totalCount={842}
          fromIndex={startIndex + 1}
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
          registeredLabel="مسجل"
        />
      </div>

      {/* Modals */}
      <ExtendStayModal
        isOpen={isExtendModalOpen}
        onClose={() => setIsExtendModalOpen(false)}
        bookingCode={selectedBookingCode}
        onConfirm={handleConfirmExtend}
      />

      <ChangeUnitModal
        isOpen={isChangeUnitModalOpen}
        onClose={() => setIsChangeUnitModalOpen(false)}
        bookingCode={selectedBookingCode}
        onConfirm={handleConfirmChangeUnit}
      />

      <CancelBookingModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        bookingCode={selectedBookingCode}
        onConfirm={handleConfirmCancel}
      />

      {/* Filter Drawer */}
      <BookingsAdvancedFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={bookingFilters}
        onApplyFilters={(f) => {
          setBookingFilters(f);
          setIsFilterDrawerOpen(false);
          setCurrentPage(1);
        }}
        onResetFilters={() => {
          handleResetFilters();
          setIsFilterDrawerOpen(false);
        }}
        totalResultsCount={totalFiltered}
      />
    </div>
  );
}
