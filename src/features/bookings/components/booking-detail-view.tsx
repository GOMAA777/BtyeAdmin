"use client";

import { useState, useEffect } from "react";
import { useSetBreadcrumbTitle } from "@/hooks/use-navigation-trail";
import { BookingDetail } from "../types";
import { bookingsService } from "@/services/bookings-service";
import { BookingDetailHeader } from "./booking-detail-header";
import { BookingCancellationBanner } from "./booking-cancellation-banner";
import { BookingGuestCard } from "./booking-guest-card";
import { BookingSmartLockCard } from "./booking-smart-lock-card";
import { BookingActivityTimelineCard } from "./booking-activity-timeline-card";
import { BookingStayScheduleCard } from "./booking-stay-schedule-card";
import { BookingAssignedUnitCard } from "./booking-assigned-unit-card";
import { BookingFinancialSettlementCard } from "./booking-financial-settlement-card";
import { BookingWhatsAppAutomationCard } from "./booking-whatsapp-automation-card";

interface BookingDetailViewProps {
  booking: BookingDetail;
}

export function BookingDetailView({ booking }: BookingDetailViewProps) {
  const [data, setData] = useState<BookingDetail>(booking);
  const [currentStatus, setCurrentStatus] = useState<BookingDetail["status"]>(booking.status);

  useEffect(() => {
    bookingsService.getDetailById(booking.bookingCode || booking.id).then((real) => {
      if (real) {
        setData(real);
        setCurrentStatus(real.status);
      }
    });
  }, [booking.bookingCode, booking.id]);

  useSetBreadcrumbTitle(`حجز ${data.bookingCode}`, data.guest?.name);

  const isCancelled = currentStatus === "cancelled";

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* 1. Top Header Card */}
      <BookingDetailHeader
        bookingCode={data.bookingCode}
        status={currentStatus}
      />

      {/* 2. Cancellation Top Banner (Visible when cancelled as in Screenshot 1) */}
      {isCancelled && (
        <BookingCancellationBanner
          cancelledBy="مدير المنصة (محمد أحمد)"
          reason="طلب العميل المباشر"
          cancelledAt="اليوم ▪ 02:45 م"
          refundAmount="2,450.00 ر.س (قيد الاسترداد)"
        />
      )}

      {/* 3. Main Two-Column Grid matching Design Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column in RTL: 65% width (col-span-8 on desktop) */}
        <div className="lg:col-span-8 space-y-6 order-1">
          {/* R1: Stay Dates & Schedule */}
          <BookingStayScheduleCard
            stay={data.stay}
            isCancelled={isCancelled}
          />

          {/* R2: Assigned Unit & Property */}
          <BookingAssignedUnitCard assigned={data.assigned} />

          {/* R3: Payment & Financial Settlement */}
          <BookingFinancialSettlementCard
            financial={data.financial}
            isCancelled={isCancelled}
          />

          {/* R4: WhatsApp Automation */}
          <BookingWhatsAppAutomationCard
            automation={data.automation}
            isCancelled={isCancelled}
            bookingCode={data.bookingCode || "BK-10482"}
          />
        </div>

        {/* Left Column in RTL: 35% width (col-span-4 on desktop) */}
        <div className="lg:col-span-4 space-y-6 order-2">
          {/* L1: Guest Profile */}
          <BookingGuestCard
            guest={data.guest}
            bookingCode={data.bookingCode || "BK-10482"}
          />

          {/* L2: Smart Lock Access Code */}
          <BookingSmartLockCard
            smartLock={data.smartLock}
            isCancelled={isCancelled}
          />

          {/* L3: Activity Log Timeline */}
          <BookingActivityTimelineCard
            activityLog={data.activityLog}
            isCancelled={isCancelled}
            bookingCode={data.bookingCode}
          />
        </div>
      </div>
    </div>
  );
}
