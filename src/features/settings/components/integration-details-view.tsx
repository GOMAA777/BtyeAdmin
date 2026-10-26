"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  CheckCircle2,
  Copy,
  Calendar,
  BedDouble,
  Receipt,
  Lock,
  Shield,
  Clock,
  Wifi,
  RefreshCw,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { useBookingComDetails } from "../controllers/use-booking-com-details";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function IntegrationDetailsView() {
  const {
    state,
    toggleScope,
    copyToClipboard,
    handleTestConnection,
    handleFullResync,
    handleDisconnect,
  } = useBookingComDetails();

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:33820"
      data-name="تفاصيل التكامل — Booking.com"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:33822"
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]">
            تفاصيل التكامل — Booking.com
          </h1>
          <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
            إدارة ومراقبة اتصال واجهة البرمجة (API) والمزامنة اللحظية مع قنوات التوزيع الفندقي العالمي
          </p>
        </div>

        <Link
          href="/settings/integrations"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0"
          data-node-id="1:33831"
        >
          <span>العودة إلى التكاملات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* CONTEXT SUMMARY REMINDER (Najdi Architectural Accent) */}
      <div
        className="w-full bg-[#f1f5eb] rounded-[16px] p-4 flex items-center justify-between gap-4 border border-[#e5eae0]"
        data-node-id="1:33898"
      >
        <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] px-3 py-1 rounded-[8px] text-[#34422a] font-cairo font-semibold text-[11px]">
          نفاذ كامل
        </div>

        <div className="flex items-center gap-3 text-right">
          <div className="flex flex-col items-end">
            <h3 className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]">
              نطاق التغطية المؤسسية للمنصة
            </h3>
            <p className="font-cairo font-normal text-[#75786f] text-[13px] leading-[20px]">
              يخدم هذا التكامل {state.totalPropertiesServed} عقاراً فاخراً و {state.totalUnitsServed} وحدة سكنية نشطة عبر منظومة ابراج.
            </p>
          </div>
          <div className="bg-[#4b5940] size-10 rounded-[12px] flex items-center justify-center text-white shrink-0">
            <Building className="size-5" />
          </div>
        </div>
      </div>

      {/* SECTION 2: CONNECTION OVERVIEW (Key Telemetry Tiles) */}
      <div className="w-full space-y-3" data-node-id="1:33836">
        <div className="flex items-center justify-between">
          <span className="font-cairo font-normal text-[#75786f] text-[14px]">
            بروتوكول شريك معتمد
          </span>
          <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
            نظرة عامة على قناة الاتصال
          </h2>
        </div>

        <div
          className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-4"
          data-node-id="1:33842"
        >
          {/* 2x2 Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tile 1: Protocol */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col justify-between gap-3 text-right">
              <span className="font-cairo font-normal text-[#75786f] text-[14px]">
                البروتوكول والمنصة
              </span>
              <div className="flex items-center justify-between">
                <span className="bg-[#ebefe6] px-2 py-0.5 rounded-[4px] font-cairo font-medium text-[#75786f] text-[11px]">
                  {state.partnerTier}
                </span>
                <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                  {state.protocol}
                </span>
              </div>
            </div>

            {/* Tile 2: First Connected */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col justify-between gap-3 text-right">
              <span className="font-cairo font-normal text-[#75786f] text-[14px]">
                تاريخ أول ربط موثق
              </span>
              <div className="flex items-center justify-between">
                <CheckCircle2 className="size-4 text-[#34422a]" />
                <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                  {state.firstConnectedDate}
                </span>
              </div>
            </div>

            {/* Tile 3: Last Sync */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col justify-between gap-3 text-right">
              <span className="font-cairo font-normal text-[#75786f] text-[14px]">
                آخر مزامنة ناجحة
              </span>
              <div className="flex items-center justify-between">
                <span className="font-cairo font-semibold text-[#54624c] text-[11px]">
                  {state.lastSyncStatus}
                </span>
                <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                  {state.lastSyncTime}
                </span>
              </div>
            </div>

            {/* Tile 4: Latency */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col justify-between gap-3 text-right">
              <span className="font-cairo font-normal text-[#75786f] text-[14px]">
                زمن استجابة واجهة الـ API
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#54624c]">
                  <span className="font-cairo font-semibold text-[11px]">نشط</span>
                  <Zap className="size-3.5 fill-[#54624c]" />
                </div>
                <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                  {state.apiLatency}
                </span>
              </div>
            </div>
          </div>

          {/* Webhook Card */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(state.webhookUrl, "رابط الويبهوك")}
                className="p-1.5 rounded-[8px] hover:bg-[#e4ebdc] transition-colors text-[#454840]"
                title="نسخ الرابط"
              >
                <Copy className="size-3.5" />
              </button>
              <span className="bg-[#d8e8cb] px-2.5 py-1 rounded-full font-cairo font-semibold text-[#3d4b36] text-[11px]">
                {state.webhookStatus}
              </span>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div className="flex flex-col items-end">
                <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                  نقطة استماع الويبهوك (Webhook Secure Endpoint)
                </span>
                <span className="font-cairo font-normal text-[#75786f] text-[14px] dir-ltr">
                  {state.webhookUrl}
                </span>
              </div>
              <div className="bg-[#d8e8cb] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
                <ExternalLink className="size-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SYNCHRONIZATION SCOPES (مجالات المزامنة النشطة) */}
      <div className="w-full space-y-3" data-node-id="1:33910">
        <div className="flex items-center justify-between">
          <span className="font-cairo font-semibold text-[#54624c] text-[14px]">
            {Object.values(state.scopes).filter(Boolean).length} من 3 مفعّلة تلقائياً
          </span>
          <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
            مجالات المزامنة اللحظية
          </h2>
        </div>

        <div className="space-y-3 w-full">
          {/* Scope 1: Bookings */}
          <div
            className="bg-white rounded-[16px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex items-center justify-between gap-4"
            data-node-id="1:33917"
          >
            {/* Toggle */}
            <button
              type="button"
              onClick={() => toggleScope("bookings")}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                state.scopes.bookings ? "bg-[#4b5940]" : "bg-[#dfe4db]"
              }`}
            >
              <div
                className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                  state.scopes.bookings ? "-translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <div className="flex items-center gap-4 text-right">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 font-cairo font-bold text-[#54624c] text-[11px]">
                    <span>مفعّل</span>
                    <CheckCircle2 className="size-3" />
                  </span>
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    مزامنة الحجوزات
                  </span>
                </div>
                <p className="font-cairo font-normal text-[#75786f] text-[13px] leading-[20px]">
                  استيراد وتحديث الحجوزات اللحظية، التعديلات الطارئة، وإلغاءات الضيوف عبر القناة.
                </p>
              </div>
              <div className="bg-[#d8e8cb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0">
                <Calendar className="size-5" />
              </div>
            </div>
          </div>

          {/* Scope 2: Availability */}
          <div
            className="bg-white rounded-[16px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex items-center justify-between gap-4"
            data-node-id="1:33934"
          >
            {/* Toggle */}
            <button
              type="button"
              onClick={() => toggleScope("availability")}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                state.scopes.availability ? "bg-[#4b5940]" : "bg-[#dfe4db]"
              }`}
            >
              <div
                className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                  state.scopes.availability ? "-translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <div className="flex items-center gap-4 text-right">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 font-cairo font-bold text-[#54624c] text-[11px]">
                    <span>مفعّل</span>
                    <CheckCircle2 className="size-3" />
                  </span>
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    التوافر والمخزون
                  </span>
                </div>
                <p className="font-cairo font-normal text-[#75786f] text-[13px] leading-[20px]">
                  مزامنة فورية لحالة الغرف والشقق السكنية لمنع الحجز المزدوج (Zero-Double-Booking).
                </p>
              </div>
              <div className="bg-[#d8e8cb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0">
                <BedDouble className="size-5" />
              </div>
            </div>
          </div>

          {/* Scope 3: Rates & Policies */}
          <div
            className="bg-white rounded-[16px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex items-center justify-between gap-4"
            data-node-id="1:33951"
          >
            {/* Toggle */}
            <button
              type="button"
              onClick={() => toggleScope("ratesAndPolicies")}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                state.scopes.ratesAndPolicies ? "bg-[#4b5940]" : "bg-[#dfe4db]"
              }`}
            >
              <div
                className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                  state.scopes.ratesAndPolicies ? "-translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <div className="flex items-center gap-4 text-right">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 font-cairo font-bold text-[#54624c] text-[11px]">
                    <span>مفعّل</span>
                    <CheckCircle2 className="size-3" />
                  </span>
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    الأسعار والسياسات
                  </span>
                </div>
                <p className="font-cairo font-normal text-[#75786f] text-[13px] leading-[20px]">
                  دفع تسعير مواسم الرياض والشرقية، قيود الحد الأدنى للإقامة، والرسوم الإضافية.
                </p>
              </div>
              <div className="bg-[#d8e8cb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0">
                <Receipt className="size-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: SECURITY & AUTHENTICATION (أمان المفاتيح والتوثيق المؤسسي) */}
      <div className="w-full space-y-3" data-node-id="1:33968">
        <div className="flex items-center justify-between">
          <div className="bg-[#ebefe6] flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] font-cairo font-semibold text-[#34422a] text-[11px]">
            <Lock className="size-3" />
            <span>تشفير HS256 فائق</span>
          </div>
          <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
            أمان المفاتيح والتوثيق المؤسسي
          </h2>
        </div>

        <div
          className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-4"
          data-node-id="1:33976"
        >
          {/* KMS Warning Callout */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-end gap-3 text-right">
            <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
              تلتزم ابراج بأعلى معايير الأمن السيبراني: يتم حجب المفاتيح السرية وتجزئتها آلياً داخل وحدة التخزين الآمنة (KMS).
            </p>
            <Shield className="size-5 text-[#34422a] shrink-0" />
          </div>

          {/* Account ID */}
          <div className="space-y-1.5 text-right">
            <label className="font-cairo font-normal text-[#75786f] text-[14px]">
              معرّف الحساب الموثق (Account ID)
            </label>
            <div className="bg-[#f1f5eb] rounded-[12px] h-11 px-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => copyToClipboard(state.accountId, "معرّف الحساب")}
                className="font-cairo font-semibold text-[#34422a] text-[14px] hover:underline flex items-center gap-1.5"
              >
                <Copy className="size-3.5" />
                <span>نسخ المعرّف</span>
              </button>
              <span className="font-cairo font-bold text-[#181d17] text-[14px] tracking-[0.7px]">
                {state.accountId}
              </span>
            </div>
          </div>

          {/* Masked Secret Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-cairo font-normal text-[#75786f] text-[14px]">
                تم التدوير: قبل 24 يوماً
              </span>
              <label className="font-cairo font-normal text-[#75786f] text-[14px]">
                المفتاح السري المشفر (API Secret Token)
              </label>
            </div>
            <div className="bg-[#f1f5eb] rounded-[12px] h-11 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-[#e5eae0] px-2 py-0.5 rounded-[4px] font-cairo font-normal text-[#454840] text-[11px]">
                  TLS 1.3 Mutual
                </span>
                <Lock className="size-3.5 text-[#75786f]" />
              </div>
              <span className="font-cairo font-normal text-[#75786f] text-[14px] tracking-[1.4px]">
                {state.secretToken}
              </span>
            </div>
          </div>

          {/* Security Badges Strip */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[#f1f5eb]">
            <div className="bg-[#ebefe6] px-3 py-1 rounded-[8px] flex items-center gap-1.5 font-cairo font-medium text-[#181d17] text-[11px]">
              <Shield className="size-3 text-[#34422a]" />
              <span>شهادة PCI-DSS Level 1</span>
            </div>
            <div className="bg-[#ebefe6] px-3 py-1 rounded-[8px] flex items-center gap-1.5 font-cairo font-medium text-[#181d17] text-[11px]">
              <CheckCircle2 className="size-3 text-[#34422a]" />
              <span>قائمة الـ IP المصرحة (CIDR Whitelisted)</span>
            </div>
            <div className="bg-[#ebefe6] px-3 py-1 rounded-[8px] flex items-center gap-1.5 font-cairo font-medium text-[#181d17] text-[11px]">
              <Lock className="size-3 text-[#34422a]" />
              <span>بروتوكول صارم TLS 1.3</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: AUDITING & RECENT ACTIVITY PREVIEW */}
      <div className="w-full space-y-3" data-node-id="1:34021">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => copyToClipboard("عرض سجل المزامنة الكامل", "سجل المعاملات")}
            className="font-cairo font-bold text-[#34422a] text-[14px] hover:underline"
          >
            عرض سجل المزامنة (Transactions Log)
          </button>
          <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
            سجلات التدقيق والمزامنة الميدانية
          </h2>
        </div>

        <div
          className="bg-white rounded-[16px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-2"
          data-node-id="1:34029"
        >
          {state.recentLogs.map((log) => (
            <div
              key={log.id}
              className="bg-[#f1f5eb] rounded-[12px] p-3 flex items-center justify-between text-right"
            >
              <span className="font-cairo font-normal text-[#75786f] text-[11px]">
                {log.timestamp}
              </span>

              <div className="flex items-center gap-2">
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  {log.target}
                </span>
                <span className="font-cairo font-medium text-[#181d17] text-[14px]">
                  {log.action}
                </span>
                <span className="font-cairo font-bold text-[#54624c] text-[11px]">
                  {log.statusCode}
                </span>
                <span className="size-2 rounded-full bg-[#54624c]" />
              </div>
            </div>
          ))}

          {/* Pending Errors Status Bar */}
          <div className="flex items-center justify-end gap-2 pt-2 px-2">
            <span className="font-cairo font-bold text-[#54624c] text-[14px]">
              {state.pendingErrorsCount} أخطاء
            </span>
            <span className="font-cairo font-normal text-[#181d17] text-[14px]">
              أخطاء معلقة:
            </span>
            <span className="size-2 rounded-full bg-[#54624c]" />
          </div>
        </div>
      </div>

      {/* BOTTOM PERSISTENT DOCKING BAR */}
      <DockingBottomBar>
        <div
          className="bg-white/95 backdrop-blur-md rounded-[16px] p-4 border border-[rgba(197,200,189,0.6)] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] flex items-center justify-between max-w-7xl mx-auto w-full"
          data-node-id="1:34059"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestConnection}
              className="bg-[#4b5940] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#34422a] transition-colors flex items-center gap-2 px-9 h-11 rounded-[12px] font-cairo font-normal text-white text-[14px]"
            >
              <span>اختبار الاتصال</span>
              <Wifi className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleFullResync}
              className="bg-[#ebefe6] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#dfe4db] transition-colors flex items-center gap-2 px-6 h-11 rounded-[12px] font-cairo font-normal text-[#181d17] text-[14px]"
            >
              <span>إعادة المزامنة الشاملة</span>
              <RefreshCw className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleDisconnect}
            className="bg-[#ebefe6] hover:bg-[#ffdad6] transition-colors flex items-center gap-2 px-4 h-11 rounded-[12px] font-cairo font-normal text-[#ba1a1a] text-[14px]"
          >
            <span>فصل الاتصال والقناة</span>
            <Trash2 className="size-4" />
          </button>
        </div>
      </DockingBottomBar>
    </div>
  );
}
