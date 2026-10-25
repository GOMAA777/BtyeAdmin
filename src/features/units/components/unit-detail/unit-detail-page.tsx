"use client";

import { useState } from "react";
import { initialUnits } from "../../data/mock-units";
import { UnitHeroCard } from "./unit-hero-card";
import { UnitTimelineStrip } from "./unit-timeline-strip";
import { UnitAvailableStateCard } from "./unit-available-state-card";
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
import { cn } from "@/lib/utils";

interface UnitDetailPageProps {
  unitId?: string;
  initialShowOperationsLog?: boolean;
  statusOverride?: "available" | "occupied";
}

export function UnitDetailPage({
  unitId = "1",
  initialShowOperationsLog = false,
  statusOverride,
}: UnitDetailPageProps) {
  // Find matching unit or fallback to Unit 204
  const unit = initialUnits.find((u) => u.id === unitId || u.unitNumber === unitId) ?? initialUnits[0];

  // Dynamic status: available (Figma 1:16492) vs occupied/unavailable (Figma 1:14682)
  const isAvailable =
    statusOverride !== undefined
      ? statusOverride === "available"
      : unit.status === "available";
  const currentStatus: "available" | "occupied" = isAvailable ? "available" : "occupied";

  // Interactive modal states
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showOperationsLog, setShowOperationsLog] = useState(initialShowOperationsLog);

  useSetBreadcrumbTitle(
    showOperationsLog ? `سجل نشاط الوحدة ${unit.unitNumber}` : `وحدة ${unit.unitNumber}`,
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
            : unit.status === "cleaning"
            ? "تحت التنظيف"
            : unit.status === "maintenance"
            ? "تحت الصيانة"
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

      {/* 7-Day Visual Timeline Strip (ONLY in Available Unit Design 1:16492) */}
      {isAvailable && <UnitTimelineStrip />}

      {/* Main Two-Column Layout (Master Administrative Record Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Primary Column (approx 65% width / 8 columns in RTL) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Available Mode: Real-time State Card comes FIRST */}
          {isAvailable && <UnitAvailableStateCard />}

          {/* Section: بيانات ومواصفات الوحدة */}
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

          {/* Section: Booking Card (Scheduled for Available, Active for Occupied) */}
          <UnitActiveBookingCard
            variant={isAvailable ? "scheduled" : "active"}
            bookingId={unit.currentBookingCode || (isAvailable ? "BK-10490" : "BK-10482")}
            guestName="خالد العتيبي"
            guestPhone="+966 54 887 2311"
            guestInitial="خ"
            stayDates="18 سبتمبر — 21 سبتمبر 2026"
            stayRemaining="متبقي ليلتان (تسجيل الخروج: 12:00 م)"
            totalAmount={String(unit.pricePerNight * 3) + ".00"}
            paymentStatus="مدفوع بالكامل عبر منصة شريكة"
            channelName={
              isAvailable
                ? "قناة الحجز: بوابة Whatsapp المزامنة"
                : "قناة الحجز: بوابة Booking المزامنة"
            }
            bookingRef={`معرف الحجز: ${unit.currentBookingCode || (isAvailable ? "BK-10490" : "BK-10482")}`}
          />

          {/* Section: نظام وكود الدخول الذكي */}
          <UnitSmartLockCard
            unitNumber={unit.unitNumber}
            onOpenAccessCodeModal={() => setShowAccessCodeModal(true)}
            onOpenShowCode={() => setShowCodeModal(true)}
            lockProtocol="TTLock Cloud Gateway v4.2"
            validityText="صلاحية الكود: ساري حتى 21 سبتمبر 2026 — 12:00 م (انتهاء الإقامة تلقائياً)"
          />

          {/* Section: معرض صور الوحدة */}
          <UnitGalleryCard />

          {/* Section: سجل النشاط والتدقيق الإداري */}
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
      {/* إدارة كود الدخول وسياسة الأمان */}
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

      {/* عرض كود الدخول */}
      <ShowCodeModal
        open={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        unitNumber={unit.unitNumber}
        propertyName={unit.propertyName}
      />
    </div>
  );
}
