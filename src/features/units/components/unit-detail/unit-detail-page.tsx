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

  // Dynamic status: available (Figma 1:16492) vs occupied (Figma 1:14682)
  const initialMode = statusOverride ?? (unit.status === "available" ? "available" : "occupied");
  const [currentStatus, setCurrentStatus] = useState<"available" | "occupied">(initialMode);
  const isAvailable = currentStatus === "available";

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
      {/* Visual State Preview Switcher (Allows seamless toggle between Available 1:16492 and Occupied 1:14682) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F1F5EB] border border-[#E2E6DC] rounded-[14px] p-2.5 px-4 text-xs">
        <div className="flex items-center gap-2 text-[#454840]">
          <span className="font-bold text-[#181D17]">معاينة نمط التصميم المعتمد من Figma:</span>
          <span className="text-[#75786F]">
            {isAvailable ? "تفاصيل الوحدة المتاحة (node-id: 1-16492)" : "تفاصيل الوحدة المشغولة (node-id: 1-14682)"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-[10px] border border-[#E2E6DC] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setCurrentStatus("available")}
            className={cn(
              "px-3 py-1 rounded-[8px] font-bold text-[11px] transition-colors cursor-pointer",
              isAvailable
                ? "bg-[#34422A] text-white shadow-xs"
                : "text-[#75786F] hover:text-[#181D17]"
            )}
          >
            متاحة للاستقبال (1-16492)
          </button>
          <button
            type="button"
            onClick={() => setCurrentStatus("occupied")}
            className={cn(
              "px-3 py-1 rounded-[8px] font-bold text-[11px] transition-colors cursor-pointer",
              !isAvailable
                ? "bg-[#34422A] text-white shadow-xs"
                : "text-[#75786F] hover:text-[#181D17]"
            )}
          >
            مشغولة - نزيل حالي (1-14682)
          </button>
        </div>
      </div>

      {/* Top Hero Card with Unit Details */}
      <UnitHeroCard
        unitNumber={unit.unitNumber}
        status={currentStatus}
        propertyName={unit.propertyName}
        location="الرياض — حي العليا"
        floor="الطابق الثاني"
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
            unitType="استوديو فندقي"
            floorLevel="الطابق الثاني (2)"
            actualArea="45"
            capacity="2 ضيوف كحد أقصى"
            basePrice="250"
            pricingModel="يومي (لكل ليلة)"
            systemEntryDate="10 سبتمبر 2026"
          />

          {/* Section: Booking Card (Scheduled for Available, Active for Occupied) */}
          <UnitActiveBookingCard
            variant={isAvailable ? "scheduled" : "active"}
            bookingId="BK-10482"
            guestName="خالد العتيبي"
            guestPhone="+966 54 887 2311"
            guestInitial="خ"
            stayDates="18 سبتمبر — 21 سبتمبر 2026"
            stayRemaining="متبقي ليلتان (تسجيل الخروج: 12:00 م)"
            totalAmount="750.00"
            paymentStatus="مدفوع بالكامل عبر منصة شريكة"
            channelName={
              isAvailable
                ? "قناة الحجز: بوابة Whatsapp المزامنة"
                : "قناة الحجز: بوابة Booking المزامنة"
            }
            bookingRef="معرف الحجز: BK-10482"
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
