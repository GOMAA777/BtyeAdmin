"use client";

import { useState } from "react";
import { initialUnits } from "../../data/mock-units";
import { UnitHeroCard } from "./unit-hero-card";
import { UnitTimelineStrip } from "./unit-timeline-strip";
import { UnitAvailableStateCard } from "./unit-available-state-card";
import { UnitCleaningStateCard } from "./unit-cleaning-state-card";
import { UnitMaintenanceStateCard } from "./unit-maintenance-state-card";
import { UnitSpecsCard } from "./unit-specs-card";
import { UnitActiveBookingCard } from "./unit-active-booking-card";
import { UnitSmartLockCard } from "./unit-smart-lock-card";
import { UnitGalleryCard } from "./unit-gallery-card";
import { UnitActivityTimelineCard } from "./unit-activity-timeline-card";
import { UnitSidebarCards } from "./unit-sidebar-cards";
import { AccessCodeModal } from "./access-code-modal";
import { ShowCodeModal } from "./show-code-modal";
import { OperationsLogView } from "./operations-log-view";
import { useSetBreadcrumbTitle } from "@/hooks/use-navigation-trail";

interface UnitDetailPageProps {
  unitId?: string;
  initialShowOperationsLog?: boolean;
  statusOverride?: "available" | "occupied" | "cleaning" | "maintenance";
}

export function UnitDetailPage({
  unitId = "1",
  initialShowOperationsLog = false,
  statusOverride,
}: UnitDetailPageProps) {
  // Find matching unit or fallback to Unit 204
  const unit =
    initialUnits.find((u) => u.id === unitId || u.unitNumber === unitId) ??
    initialUnits[0];

  // Derive status strictly:
  // 1) "available" -> Figma 1:16492 (تفاصيل الوحدة المتاحة)
  // 2) "occupied" -> Figma 1:14682 (تفاصيل الوحدة المشغولة)
  // 3) "cleaning" -> Figma 1:17169 (تفاصيل الوحدة تحت التنظيف والتعقيم)
  // 4) "maintenance" -> Figma 1:17819 (تفاصيل الوحدة تحت الصيانة)
  const currentStatus: "available" | "occupied" | "cleaning" | "maintenance" =
    statusOverride !== undefined
      ? statusOverride
      : (unit.status as "available" | "occupied" | "cleaning" | "maintenance");

  const isAvailable = currentStatus === "available";
  const isOccupied = currentStatus === "occupied";
  const isCleaning = currentStatus === "cleaning";
  const isMaintenance = currentStatus === "maintenance";

  // Interactive modal states
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showOperationsLog, setShowOperationsLog] = useState(initialShowOperationsLog);

  useSetBreadcrumbTitle(
    showOperationsLog
      ? `سجل نشاط الوحدة ${unit.unitNumber}`
      : `وحدة ${unit.unitNumber}`,
    `#${unit.unitNumber}`
  );

  // If Operations Log view is active [1:15620]
  if (showOperationsLog) {
    return (
      <div className="space-y-6 pb-12" dir="rtl">
        <OperationsLogView
          onBack={() => setShowOperationsLog(false)}
          unitNumber={unit.unitNumber}
          propertyName={unit.propertyName}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* Top Hero Card with Unit Details */}
      <UnitHeroCard
        unitNumber={unit.unitNumber}
        status={currentStatus}
        statusLabel={
          isAvailable
            ? "متاحة للاستقبال"
            : isCleaning
            ? "تحت التنظيف والتعقيم"
            : isMaintenance
            ? "تحت الصيانة الطارئة"
            : "مشغولة (نزيل حالي)"
        }
        propertyName={unit.propertyName}
        location="الرياض — حي العليا"
        floor={unit.floor}
        iotStatus="متصل ونشط IoT"
        iotSubtitle="ربط القفل السحابي"
        onOpenOperationsLog={() => setShowOperationsLog(true)}
        onOpenAccessCodeModal={() => setShowAccessCodeModal(true)}
      />

      {/* 7-Day Visual Timeline Strip (Shown in Available 1:16492, Cleaning 1:17169, and Maintenance 1:17819; hidden in Occupied 1:14682) */}
      {!isOccupied && <UnitTimelineStrip />}

      {/* Main Two-Column Layout (Master Administrative Record Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Primary Column (approx 65% width / 8 columns in RTL) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. STATE-SPECIFIC HERO CARD */}
          {/* Available Mode (1:16492): Real-time State Card */}
          {isAvailable && <UnitAvailableStateCard />}

          {/* Cleaning Mode (1:17169): Cleaning Task & Inspection Progress Card */}
          {isCleaning && (
            <UnitCleaningStateCard
              ticketId={unit.currentBookingCode ? `CL-${unit.unitNumber}` : "CL-2048"}
              previousGuestName="خالد العتيبي"
              departureTimeText="المغادرة: 12:00 ظهراً (منذ 45 دقيقة)"
              contractorName="شركة رعاية الفندقية للنظافة والتعقيم"
              fieldSupervisor="طارق"
              estimatedRemainingTime="30 دقيقة"
            />
          )}

          {/* Maintenance Mode (1:17819): Hero Operational Maintenance Card */}
          {isMaintenance && (
            <UnitMaintenanceStateCard
              ticketId={unit.currentBookingCode ? `MT-${unit.unitNumber}` : "MT-1082"}
              issueTitle="خلل بالقفل الذكي (Smart Lock Failure / Disconnection)"
              reportDate="18 سبتمبر 2026 — 10:15 صباحاً"
              assignedTechnician="م. خالد الشمري (شركة الأقفال الذكية المعتمدة)"
              priorityText="حرجة وعاجلة — مرتبطة بأمن الوحدة والتحكم الإلكتروني"
              lastUpdateAgo="قبل 18 دقيقة"
            />
          )}

          {/* 2. SPECIFICATIONS CARD (All 4 States) */}
          <UnitSpecsCard
            unitNumber={unit.unitNumber}
            unitType={unit.type === "استوديو" ? "استوديو فندقي" : unit.type}
            floorLevel={`${unit.floor} (${unit.floorNumber})`}
            actualArea="45"
            capacity="2 ضيوف كحد أقصى"
            basePrice={String(unit.pricePerNight)}
            pricingModel="يومي (لكل ليلة)"
            systemEntryDate="10 سبتمبر 2026"
          />

          {/* 3. BOOKING CARD (Present in Available and Occupied modes; not in Cleaning/Maintenance) */}
          {isAvailable && (
            <UnitActiveBookingCard
              variant="scheduled"
              bookingId="BK-10490"
              guestName="خالد العتيبي"
              guestPhone="+966 54 887 2311"
              guestInitial="خ"
              stayDates="18 سبتمبر — 21 سبتمبر 2026"
              stayRemaining="متبقي ليلتان (تسجيل الخروج: 12:00 م)"
              totalAmount={String(unit.pricePerNight * 3) + ".00"}
              paymentStatus="مدفوع بالكامل عبر منصة شريكة"
              channelName="قناة الحجز: بوابة Whatsapp المزامنة"
              bookingRef="معرف الحجز: BK-10490"
            />
          )}

          {isOccupied && (
            <UnitActiveBookingCard
              variant="active"
              bookingId={unit.currentBookingCode || "BK-10482"}
              guestName="خالد العتيبي"
              guestPhone="+966 54 887 2311"
              guestInitial="خ"
              stayDates="18 سبتمبر — 21 سبتمبر 2026"
              stayRemaining="متبقي ليلتان (تسجيل الخروج: 12:00 م)"
              totalAmount={String(unit.pricePerNight * 3) + ".00"}
              paymentStatus="مدفوع بالكامل عبر منصة شريكة"
              channelName="قناة الحجز: بوابة Booking المزامنة"
              bookingRef={`معرف الحجز: ${unit.currentBookingCode || "BK-10482"}`}
            />
          )}

          {/* 4. SMART LOCK CARD (Customized for each state per Figma) */}
          <UnitSmartLockCard
            unitNumber={unit.unitNumber}
            variant={
              isCleaning
                ? "cleaning"
                : isMaintenance
                ? "maintenance"
                : "default"
            }
            onOpenAccessCodeModal={() => setShowAccessCodeModal(true)}
            onOpenShowCode={() => setShowCodeModal(true)}
            lockProtocol="TTLock Cloud Gateway v4.2"
            validityText="صلاحية الكود: ساري حتى 21 سبتمبر 2026 — 12:00 م (انتهاء الإقامة تلقائياً)"
          />

          {/* 5. UNIT GALLERY CARD */}
          <UnitGalleryCard />

          {/* 6. ADMINISTRATIVE ACTIVITY TIMELINE CARD */}
          <UnitActivityTimelineCard
            variant={currentStatus}
            onOpenOperationsLog={() => setShowOperationsLog(true)}
          />
        </div>

        {/* Secondary / Sidebar Column (approx 35% width / 4 columns in RTL) */}
        <div className="lg:col-span-4">
          <UnitSidebarCards
            propertyName={unit.propertyName}
            propertyType="مجمع سكني فندقي فاخر"
            cityArea="الرياض — حي العليا"
            totalUnits="12 وحدة مخدومة"
            connectionStatus="مكتمل التراخيص والمطابقة"
            propertyId={unit.propertyId}
            ownerName={unit.ownerName}
            ownerPhone="+966 50 123 4567"
            ownerPropertiesCount="3 مجمعات عقارية"
            ownerPayoutRate="مباشر إلى الحساب البنكي"
            ownerId={unit.ownerId}
            onOpenOperationsLog={() => setShowOperationsLog(true)}
          />
        </div>
      </div>

      {/* Interactive Modals */}
      <AccessCodeModal
        open={showAccessCodeModal}
        onClose={() => setShowAccessCodeModal(false)}
        onOpenShowCode={() => {
          setShowAccessCodeModal(false);
          setShowCodeModal(true);
        }}
        unitNumber={unit.unitNumber}
        propertyName={unit.propertyName}
      />

      <ShowCodeModal
        open={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        unitNumber={unit.unitNumber}
        propertyName={unit.propertyName}
      />
    </div>
  );
}
