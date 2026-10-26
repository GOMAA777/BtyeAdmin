"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Radio,
  Unlink,
  RefreshCw,
  BadgeCheck,
  Phone,
  Send,
  CheckCheck,
  Eye,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  KeyRound,
  MessageSquare,
  Wrench,
  Receipt,
  ShieldCheck,
  ChevronDown,
  Clock,
  Save,
  Check,
} from "lucide-react";
import { useWhatsAppSettings } from "../controllers/use-whatsapp-settings";
import { DisconnectWhatsAppModal } from "./modals/disconnect-whatsapp-modal";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function WhatsAppSettingsView() {
  const {
    config,
    isDirty,
    isDisconnectModalOpen,
    isSyncing,
    toggleAutomation,
    toggleMasterBroadcast,
    toggleQuietHours,
    setRetryAttempts,
    setRetryDelay,
    handleResync,
    handleOpenDisconnectModal,
    handleCloseDisconnectModal,
    handleConfirmDisconnect,
    handleSave,
    handleReset,
  } = useWhatsAppSettings();

  const [isRetryAttemptsOpen, setIsRetryAttemptsOpen] = useState(false);
  const [isRetryDelayOpen, setIsRetryDelayOpen] = useState(false);

  const retryAttemptOptions = [
    "3 محاولات تلقائية (الموصى به من Meta)",
    "محاولتان فقط (للرسائل غير الحرجة)",
    "5 محاولات (مع فترات متباعدة)",
    "إيقاف إعادة الإرسال التلقائي",
  ];

  const retryDelayOptions = [
    "5 دقائق (Exponential Backoff الموصى به)",
    "دقيقتان (إعادة محاولة سريعة)",
    "10 دقائق (لتجنب حظر التردد)",
    "15 دقيقة (وضع الحماية القصوى)",
  ];

  return (
    <div
      className="w-full pb-32 flex flex-col gap-6 font-cairo"
      dir="rtl"
      data-node-id="1:32816"
      data-name="إعدادات WhatsApp"
    >
      {/* 1. TOP HERO GREETING BAR (Figma 1:32818) */}
      <div
        className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#e5eae0]"
        data-node-id="1:32818"
      >
        <div className="flex flex-col items-start gap-1">
          <h1
            className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]"
            data-node-id="1:32826"
          >
            إعدادات WhatsApp
          </h1>
          <p
            className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]"
            data-node-id="1:32822"
          >
            إدارة ربط مزود خدمة WhatsApp Business API، ضوابط الأتمتة المباشرة، وحوكمة وتيرة الإرسال لكافة عقارات ووحدات المنصة.
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] hover:bg-[#e4ebd9] text-[#181d17] px-4 py-2.5 rounded-[12px] font-cairo font-semibold text-[14px] leading-[20px] flex items-center gap-2 transition-colors cursor-pointer shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
          data-node-id="1:32827"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowLeft className="size-[14px]" />
        </Link>
      </div>

      {/* 2. CONNECTION CARD - بطاقة حالة الاتصال السحابي (Figma 1:32833) */}
      <div
        className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 flex flex-col gap-4 border border-[#e5eae0]"
        data-node-id="1:32833"
        data-name="Section - Connection Card (بطاقة حالة الاتصال السحابي)"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 w-full">
          {/* Right side: Identity & Status (Figma 1:32846) */}
          <div className="flex items-center gap-4">
            <div
              className={`size-[56px] rounded-[16px] flex items-center justify-center shrink-0 ${
                config.account.isConnected
                  ? "bg-[#eaf1e8] text-[#3e8a5a]"
                  : "bg-[#ffdad6] text-[#ba1a1a]"
              }`}
              data-node-id="1:32857"
            >
              <Radio className="size-[26px]" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2
                  className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]"
                  data-node-id="1:32850"
                >
                  {config.account.accountName} ({config.account.osName})
                </h2>
                {config.account.isConnected ? (
                  <div
                    className="bg-[#eaf1e8] px-3 py-1 rounded-full flex items-center gap-1.5"
                    data-node-id="1:32851"
                  >
                    <span className="size-2 rounded-full bg-[#3e8a5a]" />
                    <span className="font-cairo font-medium text-[#3e8a5a] text-[11px] leading-[16px]">
                      متصل بالبوابة السحابية
                    </span>
                  </div>
                ) : (
                  <div className="bg-[#ffdad6] px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#ba1a1a]" />
                    <span className="font-cairo font-medium text-[#ba1a1a] text-[11px] leading-[16px]">
                      تم فصل الاتصال
                    </span>
                  </div>
                )}
              </div>
              <p
                className="font-cairo font-normal text-[#54624c] text-[13px] leading-[20px]"
                data-node-id="1:32856"
              >
                Meta Cloud Platform (Direct Enterprise Gateway - v20.0) • مركز استضافة الشرق الأوسط
              </p>
            </div>
          </div>

          {/* Left side: Action Buttons (Figma 1:32835) */}
          <div className="flex items-center gap-2 self-end md:self-center">
            {config.account.isConnected ? (
              <button
                type="button"
                onClick={handleOpenDisconnectModal}
                className="bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#ba1a1a] text-[12px] font-cairo font-semibold px-3.5 py-2 rounded-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
                data-node-id="1:32841"
              >
                <Unlink className="size-[14px]" />
                <span>فصل الاتصال</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResync}
                className="bg-[#d8e8cb] hover:bg-[#c2dbae] text-[#34422a] text-[12px] font-cairo font-semibold px-3.5 py-2 rounded-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Radio className="size-[14px]" />
                <span>إعادة الربط</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleResync}
              disabled={isSyncing}
              className="bg-[#f1f5eb] hover:bg-[#e4ebd9] text-[#181d17] text-[12px] font-cairo font-semibold px-3.5 py-2 rounded-[12px] flex items-center gap-1.5 transition-colors cursor-pointer drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] disabled:opacity-50"
              data-node-id="1:32836"
            >
              <RefreshCw className={`size-[12px] ${isSyncing ? "animate-spin" : ""}`} />
              <span>إعادة المزامنة</span>
            </button>
          </div>
        </div>

        {/* Metadata Details Grid (Figma 1:32860) */}
        <div
          className="bg-[#f1f5eb] rounded-[12px] p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
          data-node-id="1:32860"
        >
          {/* Col 1: WABA ID */}
          <div className="flex flex-col items-start gap-1">
            <span className="font-cairo font-medium text-[#54624c] text-[11px] leading-[16px]">
              معرّف حساب Meta التجاري (WABA ID)
            </span>
            <div className="flex items-center gap-1.5">
              <BadgeCheck className="size-[13px] text-[#3e8a5a] shrink-0" />
              <span className="font-cairo font-bold text-[#181d17] text-[12px] leading-[18px]">
                {config.account.wabaId}
              </span>
            </div>
          </div>

          {/* Col 2: Official Phone */}
          <div className="flex flex-col items-start gap-1">
            <span className="font-cairo font-medium text-[#54624c] text-[11px] leading-[16px]">
              رقم الهاتف المرسل الرسمي
            </span>
            <div className="flex items-center gap-1.5">
              <Phone className="size-[12px] text-[#181d17] shrink-0" />
              <span className="font-cairo font-bold text-[#181d17] text-[12px] leading-[18px] dir-ltr text-right">
                {config.account.officialPhoneNumber}
              </span>
            </div>
          </div>

          {/* Col 3: Webhook Latency */}
          <div className="flex flex-col items-start gap-1">
            <span className="font-cairo font-medium text-[#54624c] text-[11px] leading-[16px]">
              زمن استجابة الخطاف (Webhook Latency)
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-cairo font-bold text-[#3e8a5a] text-[12px] leading-[18px]">
                {config.account.webhookLatency}
              </span>
              <span className="font-cairo font-medium text-[#54624c] text-[11px] leading-[16px]">
                • اتصال فوري مباشر
              </span>
            </div>
          </div>

          {/* Col 4: Certificate Expiry */}
          <div className="flex flex-col items-start gap-1">
            <span className="font-cairo font-medium text-[#54624c] text-[11px] leading-[16px]">
              سريان الاتصال وشهادة التوثيق
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-cairo font-semibold text-[#181d17] text-[12px] leading-[18px]">
                {config.account.certificateExpiryDate}
              </span>
              <span className="font-cairo font-medium text-[#54624c] text-[11px] leading-[16px]">
                {config.account.certificateStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 4 METRICS & DELIVERY ANALYTICS SECTION (Figma 1:32898) */}
      <div
        className="flex flex-col gap-2 w-full"
        data-node-id="1:32898"
        data-name="4 Metrics & Delivery Analytics Section"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3
              className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]"
              data-node-id="1:32906"
            >
              مؤشرات الأداء وصحة البث السحابي
            </h3>
            <span
              className="font-cairo font-medium text-[#54624c] text-[11px] leading-[16px]"
              data-node-id="1:32904"
            >
              (آخر 24 ساعة)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Card 1: Total Sent (Figma 1:33114) */}
          <div
            className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-4 flex flex-col justify-between border border-[#e5eae0]"
            data-node-id="1:33114"
            data-name="Sent Metric"
          >
            <div className="flex items-center justify-between pb-2 w-full">
              <div className="bg-[#ebefe6] size-8 rounded-[8px] flex items-center justify-center text-[#34422a]">
                <Send className="size-3.5" />
              </div>
              <span className="font-cairo font-semibold text-[#54624c] text-[12px] leading-[18px]">
                إجمالي المرسل
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="font-cairo font-bold text-[#181d17] text-[30px] leading-[42px]">
                {config.kpis.totalSent.toLocaleString()}
              </span>
              <div className="flex items-center gap-0.5 text-[#3e8a5a]">
                <TrendingUp className="size-3" />
                <span className="font-cairo font-medium text-[11px] leading-[16px]">
                  {config.kpis.totalSentTrend}
                </span>
              </div>
            </div>
            <div className="pt-3 w-full">
              <div className="bg-[#f1f5eb] h-1.5 rounded-full overflow-hidden w-full">
                <div className="bg-[#34422a] h-full w-full rounded-full" />
              </div>
            </div>
          </div>

          {/* Card 2: Delivered (Figma 1:33098) */}
          <div
            className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-4 flex flex-col justify-between border border-[#e5eae0]"
            data-node-id="1:33098"
            data-name="Delivered Metric"
          >
            <div className="flex items-center justify-between pb-2 w-full">
              <div className="bg-[#eaf1e8] size-8 rounded-[8px] flex items-center justify-center text-[#3e8a5a]">
                <CheckCheck className="size-4" />
              </div>
              <span className="font-cairo font-semibold text-[#54624c] text-[12px] leading-[18px]">
                تم التسليم بنجاح
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="font-cairo font-bold text-[#181d17] text-[30px] leading-[42px]">
                {config.kpis.delivered.toLocaleString()}
              </span>
              <span className="bg-[#eaf1e8] text-[#3e8a5a] text-[11px] font-cairo font-bold px-2 py-0.5 rounded-[6px]">
                {config.kpis.deliveredRate}
              </span>
            </div>
            <div className="pt-3 w-full">
              <div className="bg-[#f1f5eb] h-1.5 rounded-full overflow-hidden w-full">
                <div className="bg-[#3e8a5a] h-full w-[99.1%] rounded-full" />
              </div>
            </div>
          </div>

          {/* Card 3: Read (Figma 1:32924) */}
          <div
            className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-4 flex flex-col justify-between border border-[#e5eae0]"
            data-node-id="1:32924"
            data-name="Read Metric"
          >
            <div className="flex items-center justify-between pb-2 w-full">
              <div className="bg-[#ebefe6] size-8 rounded-[8px] flex items-center justify-center text-[#34422a]">
                <Eye className="size-4" />
              </div>
              <span className="font-cairo font-semibold text-[#54624c] text-[12px] leading-[18px]">
                تمت القراءة والتفاعل
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="font-cairo font-bold text-[#181d17] text-[30px] leading-[42px]">
                {config.kpis.read.toLocaleString()}
              </span>
              <span className="bg-[#e5eae0] text-[#181d17] text-[11px] font-cairo font-bold px-2 py-0.5 rounded-[6px]">
                {config.kpis.readRate}
              </span>
            </div>
            <div className="pt-3 w-full">
              <div className="bg-[#f1f5eb] h-1.5 rounded-full overflow-hidden w-full">
                <div className="bg-[#54624c] h-full w-[93.3%] rounded-full" />
              </div>
            </div>
          </div>

          {/* Card 4: Failed (Figma 1:32908) */}
          <div
            className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-4 flex flex-col justify-between border border-[#e5eae0]"
            data-node-id="1:32908"
            data-name="Failed Metric"
          >
            <div className="flex items-center justify-between pb-2 w-full">
              <div className="bg-[#ffdad6] size-8 rounded-[8px] flex items-center justify-center text-[#ba1a1a]">
                <AlertCircle className="size-4" />
              </div>
              <span className="font-cairo font-semibold text-[#54624c] text-[12px] leading-[18px]">
                فشل الإرسال / أرقام غير صالحة
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="font-cairo font-bold text-[#ba1a1a] text-[30px] leading-[42px]">
                {config.kpis.failed}
              </span>
              <span className="bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-cairo font-bold px-2 py-0.5 rounded-[6px]">
                {config.kpis.failedRate}
              </span>
            </div>
            <div className="pt-3 w-full">
              <div className="bg-[#f1f5eb] h-1.5 rounded-full overflow-hidden w-full">
                <div className="bg-[#ba1a1a] h-full w-[2%] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TWO-COLUMN OPERATIONAL LAYOUT (Figma 1:32938) */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full"
        data-node-id="1:32938"
        data-name="Two-Column Operational Layout: Automation Triggers & Dispatch Throttling"
      >
        {/* RIGHT COLUMN (lg:col-span-7): Section 2: Automated Sending Rules (Figma 1:32939) */}
        <div
          className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#e5eae0] lg:col-span-7 flex flex-col"
          data-node-id="1:32939"
          data-name="Section 2: Automated Sending Rules (الإرسال والأتمتة التشغيلية)"
        >
          {/* Header & Master Switch */}
          <div className="flex items-start justify-between pb-4 border-b border-[#f1f5eb] w-full">
            <div className="flex flex-col gap-1">
              <h3
                className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]"
                data-node-id="1:32949"
              >
                الإرسال والأتمتة التشغيلية
              </h3>
              <p
                className="font-cairo font-normal text-[#54624c] text-[13px] leading-[20px]"
                data-node-id="1:32952"
              >
                تحدد هذه المفاتيح النوافذ التلقائية لإرسال الرسائل الفورية لضيوف وملاك كافة عقارات المنصة.
              </p>
            </div>

            {/* Master Switch (Figma 1:32942) */}
            <div
              onClick={() => toggleMasterBroadcast(!config.automations.masterBroadcastEnabled)}
              className="bg-[#f1f5eb] hover:bg-[#e4ebd9] rounded-[12px] px-3 py-1.5 flex items-center gap-2 cursor-pointer transition-colors shrink-0 select-none"
              data-node-id="1:32942"
              data-name="Master Switch"
            >
              <div
                className={`w-[34px] h-[24px] rounded-full p-[2px] transition-colors flex items-center ${
                  config.automations.masterBroadcastEnabled ? "bg-[#4b5940] justify-end" : "bg-[#c2ccbe] justify-start"
                }`}
              >
                <div className="size-[20px] rounded-full bg-white shadow-xs" />
              </div>
              <span className="font-cairo font-semibold text-[#181d17] text-[11px] leading-[14px] text-right">
                تفعيل البث
                <br />
                العام
              </span>
            </div>
          </div>

          {/* 5 Automation Rules List (Figma 1:32953) */}
          <div className="flex flex-col divide-y divide-[#f1f5eb] pt-2 w-full" data-node-id="1:32953">
            {/* Rule 1: Booking Confirmation (Figma 1:32954) */}
            <div
              className="py-4 flex items-start justify-between gap-4 w-full"
              data-node-id="1:32954"
              data-name="Rule 1"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className="size-[36px] rounded-[12px] bg-[#ebefe6] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5"
                  data-node-id="1:32967"
                >
                  <CheckCircle className="size-4 text-[#34422a]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4
                    className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]"
                    data-node-id="1:32960"
                  >
                    إرسال تأكيد الحجوزات فور الدفع
                  </h4>
                  <p
                    className="font-cairo font-normal text-[#54624c] text-[13px] leading-[20px]"
                    data-node-id="1:32962"
                  >
                    يُرسل إشعار الحجز ورقم المرجع والبيانات المالية للنزيل فور اكتمال الدفع الإلكتروني بنجاح.
                  </p>
                  <span
                    className="font-cairo font-medium text-[#34422a] text-[11px] leading-[16px] pt-1"
                    data-node-id="1:32965"
                  >
                    الوجهة: رقم النزيل المسجل • القالب: booking_confirmation_v2
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleAutomation("bookingConfirmation")}
                className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors flex items-center shrink-0 cursor-pointer ${
                  config.automations.bookingConfirmation ? "bg-[#4b5940] justify-end" : "bg-[#c2ccbe] justify-start"
                }`}
                data-node-id="1:32955"
              >
                <div className="size-[20px] rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Rule 2: Smart Access PIN (Figma 1:32971) */}
            <div
              className="py-4 flex items-start justify-between gap-4 w-full"
              data-node-id="1:32971"
              data-name="Rule 2"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className="size-[36px] rounded-[12px] bg-[#ebefe6] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5"
                  data-node-id="1:32984"
                >
                  <KeyRound className="size-4 text-[#34422a]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4
                    className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]"
                    data-node-id="1:32977"
                  >
                    إرسال كود الدخول والتعليمات الذكية
                  </h4>
                  <p
                    className="font-cairo font-normal text-[#54624c] text-[13px] leading-[20px]"
                    data-node-id="1:32979"
                  >
                    يُرسل كود القفل الإلكتروني وإحداثيات الموقع وتعليمات ركن السيارات قبل ساعتين من موعد تسجيل الوصول.
                  </p>
                  <span
                    className="font-cairo font-medium text-[#34422a] text-[11px] leading-[16px] pt-1"
                    data-node-id="1:32982"
                  >
                    الوجهة: النزيل الرئيسي • القالب: smart_access_pin_ar
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleAutomation("smartAccessPin")}
                className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors flex items-center shrink-0 cursor-pointer ${
                  config.automations.smartAccessPin ? "bg-[#4b5940] justify-end" : "bg-[#c2ccbe] justify-start"
                }`}
                data-node-id="1:32972"
              >
                <div className="size-[20px] rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Rule 3: Checkout and Survey (Figma 1:32988) */}
            <div
              className="py-4 flex items-start justify-between gap-4 w-full"
              data-node-id="1:32988"
              data-name="Rule 3"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className="size-[36px] rounded-[12px] bg-[#ebefe6] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5"
                  data-node-id="1:33001"
                >
                  <MessageSquare className="size-4 text-[#34422a]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4
                    className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]"
                    data-node-id="1:32994"
                  >
                    إرسال تذكير موعد المغادرة وتقييم الإقامة
                  </h4>
                  <p
                    className="font-cairo font-normal text-[#54624c] text-[13px] leading-[20px]"
                    data-node-id="1:32996"
                  >
                    رسالة لطيفة تُرسل عند الساعة 09:00 صباحاً من يوم المغادرة تتضمن إرشادات تسليم الوحدة ورابط التقييم المباشر.
                  </p>
                  <span
                    className="font-cairo font-medium text-[#34422a] text-[11px] leading-[16px] pt-1"
                    data-node-id="1:32999"
                  >
                    الوجهة: النزيل • القالب: checkout_and_survey_v1
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleAutomation("checkoutReminderAndSurvey")}
                className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors flex items-center shrink-0 cursor-pointer ${
                  config.automations.checkoutReminderAndSurvey ? "bg-[#4b5940] justify-end" : "bg-[#c2ccbe] justify-start"
                }`}
                data-node-id="1:32989"
              >
                <div className="size-[20px] rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Rule 4: Maintenance Status Update (Figma 1:33005) */}
            <div
              className="py-4 flex items-start justify-between gap-4 w-full"
              data-node-id="1:33005"
              data-name="Rule 4"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className="size-[36px] rounded-[12px] bg-[#ebefe6] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5"
                  data-node-id="1:33018"
                >
                  <Wrench className="size-4 text-[#34422a]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4
                    className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]"
                    data-node-id="1:33011"
                  >
                    إرسال إشعار تسجيل وتحديث بلاغات الصيانة
                  </h4>
                  <p
                    className="font-cairo font-normal text-[#54624c] text-[13px] leading-[20px]"
                    data-node-id="1:33013"
                  >
                    إبلاغ النزيل فور وصول فني الصيانة وتوثيق إغلاق التذكرة لضمان الجودة التشغيلية الفورية.
                  </p>
                  <span
                    className="font-cairo font-medium text-[#34422a] text-[11px] leading-[16px] pt-1"
                    data-node-id="1:33016"
                  >
                    الوجهة: النزيل ومسؤول الصيانة • القالب: maintenance_status_update
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleAutomation("maintenanceStatusAlert")}
                className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors flex items-center shrink-0 cursor-pointer ${
                  config.automations.maintenanceStatusAlert ? "bg-[#4b5940] justify-end" : "bg-[#c2ccbe] justify-start"
                }`}
                data-node-id="1:33006"
              >
                <div className="size-[20px] rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Rule 5: Stay Extension and ZATCA Receipt (Figma 1:33022) */}
            <div
              className="py-4 flex items-start justify-between gap-4 w-full"
              data-node-id="1:33022"
              data-name="Rule 5"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className="size-[36px] rounded-[12px] bg-[#ebefe6] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5"
                  data-node-id="1:33035"
                >
                  <Receipt className="size-4 text-[#34422a]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4
                    className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]"
                    data-node-id="1:33028"
                  >
                    إرسال تأكيد تمديد الإقامة والإيصال المالي
                  </h4>
                  <p
                    className="font-cairo font-normal text-[#54624c] text-[13px] leading-[20px]"
                    data-node-id="1:33030"
                  >
                    تحديث تلقائي لمواعيد المغادرة وإرفاق فاتورة ضريبة القيمة المضافة (ZATCA) في حال تمديد الحجز.
                  </p>
                  <span
                    className="font-cairo font-medium text-[#34422a] text-[11px] leading-[16px] pt-1"
                    data-node-id="1:33033"
                  >
                    الوجهة: النزيل • القالب: stay_extension_zatca_receipt
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleAutomation("stayExtensionAndReceipt")}
                className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors flex items-center shrink-0 cursor-pointer ${
                  config.automations.stayExtensionAndReceipt ? "bg-[#4b5940] justify-end" : "bg-[#c2ccbe] justify-start"
                }`}
                data-node-id="1:33023"
              >
                <div className="size-[20px] rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN (lg:col-span-5): Section 3: Sending Limits & Retry Policies (Figma 1:33038) */}
        <div
          className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#e5eae0] lg:col-span-5 flex flex-col gap-4"
          data-node-id="1:33038"
          data-name="Section 3: Sending Limits & Retry Policies (حدود وتيرة الإرسال والأمان)"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-1 w-full" data-node-id="1:33040">
            <div className="flex flex-col gap-0.5">
              <h3
                className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]"
                data-node-id="1:33043"
              >
                حدود وتيرة الإرسال والأمان
              </h3>
              <span
                className="font-cairo font-medium text-[#54624c] text-[11px] leading-[16px]"
                data-node-id="1:33044"
              >
                إدارة سعة Meta Tier وسياسات الإخفاق
              </span>
            </div>
            <div
              className="bg-[#ebefe6] size-[36px] rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0"
              data-node-id="1:33045"
            >
              <ShieldCheck className="size-[18px]" />
            </div>
          </div>

          {/* Quota Usage Card (Figma 1:33048) */}
          <div
            className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col gap-2 w-full"
            data-node-id="1:33048"
            data-name="Quota Usage Card"
          >
            <div className="flex items-center justify-between w-full" data-node-id="1:33049">
              <span
                className="font-cairo font-semibold text-[#181d17] text-[12px] leading-[18px]"
                data-node-id="1:33053"
              >
                الحد الأقصى للرسائل اليومية
              </span>
              <span
                className="font-cairo font-semibold text-[#34422a] text-[11px] leading-[16px]"
                data-node-id="1:33051"
              >
                {config.rateLimits.tierName}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div className="flex items-baseline gap-1" data-node-id="1:33057">
                <span
                  className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px]"
                  data-node-id="1:33059"
                >
                  {config.rateLimits.dailyQuotaUsed.toLocaleString()}
                </span>
                <span
                  className="font-cairo font-normal text-[#54624c] text-[13px] leading-[20px]"
                  data-node-id="1:33058"
                >
                  / {config.rateLimits.dailyQuotaLimit.toLocaleString()} رسالة
                </span>
              </div>
              <span
                className="font-cairo font-bold text-[#3e8a5a] text-[11px] leading-[16px]"
                data-node-id="1:33056"
              >
                {config.rateLimits.quotaUsedPercentage}% مستهلك
              </span>
            </div>

            <div className="py-1 w-full" data-node-id="1:33060">
              <div className="bg-[#dfe4db] h-2 rounded-full overflow-hidden w-full">
                <div
                  className="bg-[#34422a] h-full rounded-full transition-all"
                  style={{ width: `${config.rateLimits.quotaUsedPercentage}%` }}
                  data-node-id="1:33061"
                />
              </div>
            </div>

            <p
              className="font-cairo font-medium text-[#54624c] text-[11px] leading-[16.5px]"
              data-node-id="1:33063"
            >
              يتم ترقية الحصة التشغيلية إلى المستوى الرابع (غير محدود) تلقائياً عند الحفاظ على معيار جودة عالي لأكثر من 7 أيام متتالية.
            </p>
          </div>

          {/* Configuration Controls Form (Figma 1:33064) */}
          <div className="flex flex-col gap-4 w-full" data-node-id="1:33064">
            {/* Retry Attempts Select (Figma 1:33065) */}
            <div className="flex flex-col gap-1.5 w-full relative" data-node-id="1:33065">
              <label
                className="font-cairo font-semibold text-[#181d17] text-[12px] leading-[18px]"
                data-node-id="1:33069"
              >
                محاولات إعادة الإرسال عند الفشل
              </label>
              <button
                type="button"
                onClick={() => setIsRetryAttemptsOpen(!isRetryAttemptsOpen)}
                className="bg-[#f1f5eb] hover:bg-[#eaf0e3] rounded-[12px] h-[44px] px-4 flex items-center justify-between text-[#181d17] text-[13px] font-cairo transition-colors cursor-pointer w-full text-right"
                data-node-id="1:33071"
              >
                <span className="truncate">{config.rateLimits.retryAttempts}</span>
                <ChevronDown className="size-4 text-[#54624c] shrink-0" />
              </button>

              {isRetryAttemptsOpen && (
                <div className="absolute top-[72px] right-0 left-0 bg-white rounded-[12px] shadow-lg border border-[#e5eae0] p-1.5 z-20 flex flex-col gap-1">
                  {retryAttemptOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setRetryAttempts(opt);
                        setIsRetryAttemptsOpen(false);
                      }}
                      className="px-3 py-2 rounded-[8px] text-[12px] font-cairo text-right hover:bg-[#f1f5eb] transition-colors text-[#181d17]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Retry Delay Select (Figma 1:33075) */}
            <div className="flex flex-col gap-1.5 w-full relative" data-node-id="1:33075">
              <div className="flex items-center justify-between">
                <label
                  className="font-cairo font-semibold text-[#181d17] text-[12px] leading-[18px]"
                  data-node-id="1:33080"
                >
                  الفاصل الزمني بين المحاولات
                </label>
                <span
                  className="font-cairo font-medium text-[#54624c] text-[11px] leading-[16px]"
                  data-node-id="1:33078"
                >
                  تجنب حظر التردد
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsRetryDelayOpen(!isRetryDelayOpen)}
                className="bg-[#f1f5eb] hover:bg-[#eaf0e3] rounded-[12px] h-[44px] px-4 flex items-center justify-between text-[#181d17] text-[13px] font-cairo transition-colors cursor-pointer w-full text-right"
                data-node-id="1:33082"
              >
                <span className="truncate">{config.rateLimits.retryDelay}</span>
                <ChevronDown className="size-4 text-[#54624c] shrink-0" />
              </button>

              {isRetryDelayOpen && (
                <div className="absolute top-[72px] right-0 left-0 bg-white rounded-[12px] shadow-lg border border-[#e5eae0] p-1.5 z-20 flex flex-col gap-1">
                  {retryDelayOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setRetryDelay(opt);
                        setIsRetryDelayOpen(false);
                      }}
                      className="px-3 py-2 rounded-[8px] text-[12px] font-cairo text-right hover:bg-[#f1f5eb] transition-colors text-[#181d17]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CITC Quiet Hours Rate Limiting Checkbox Box (Figma 1:33086) */}
            <label
              onClick={() => toggleQuietHours(!config.rateLimits.quietHoursEnabled)}
              className="bg-[#f1f5eb] hover:bg-[#eaf0e3] rounded-[12px] p-4 flex items-start gap-3 cursor-pointer select-none transition-colors w-full"
              data-node-id="1:33086"
              data-name="CITC Quiet Hours Rate Limiting"
            >
              <div className="relative shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={config.rateLimits.quietHoursEnabled}
                  onChange={() => {}}
                  className="sr-only"
                />
                <div
                  className={`size-[20px] rounded-[2.5px] flex items-center justify-center transition-colors ${
                    config.rateLimits.quietHoursEnabled
                      ? "bg-[#34422a] text-white"
                      : "bg-white border border-[#767676]"
                  }`}
                  data-node-id="1:33094"
                >
                  {config.rateLimits.quietHoursEnabled && <Check className="size-3.5 stroke-[3]" />}
                </div>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <span
                  className="font-cairo font-semibold text-[#181d17] text-[12px] leading-[18px]"
                  data-node-id="1:33089"
                >
                  مراعاة ساعات الهدوء التنظيمية
                </span>
                <p
                  className="font-cairo font-normal text-[#54624c] text-[13px] leading-[20px]"
                  data-node-id="1:33092"
                >
                  حظر إرسال الرسائل التسويقية وغير الطارئة من الساعة 09:00 مساءً حتى 08:00 صباحاً، مع استثناء رسائل OTP وأكواد الدخول اللحظية المشروطة بحجوزات الوصول الليلي.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* 5. DOCKING BOTTOM BAR - شريط الإجراءات السفلي (Figma 1:33132) */}
      <DockingBottomBar>
        <div
          className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] rounded-[16px] p-4 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border border-[#e5eae0] flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
          data-node-id="1:33132"
          data-name="Bottom Persistent Action Toolbar"
        >
          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end order-2 sm:order-1">
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#34422a] hover:bg-[#283420] text-white px-6 py-2.5 rounded-[12px] font-cairo font-semibold text-[12px] leading-[18px] flex items-center justify-center gap-2 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-colors flex-1 sm:flex-none cursor-pointer"
              data-node-id="1:33135"
            >
              <span>حفظ التغييرات</span>
              <Save className="size-[15px]" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#ebefe6] hover:bg-[#d8e0d1] text-[#181d17] px-4 py-2.5 rounded-[12px] font-cairo font-semibold text-[12px] leading-[18px] transition-colors flex-1 sm:flex-none cursor-pointer"
              data-node-id="1:33141"
            >
              إلغاء التعديلات
            </button>
          </div>

          {/* Audit Telemetry */}
          <div
            className="flex items-center gap-2 text-[#75786f] text-[13px] font-cairo order-1 sm:order-2"
            data-node-id="1:33143"
          >
            <Clock className="size-[14px]" />
            <p>
              <span>آخر تحديث: </span>
              <strong className="text-[#181d17] font-semibold">{config.lastUpdated}</strong>
              <span> — بواسطة مدير النظام (</span>
              <span className="text-[#34422a] font-medium">{config.updatedBy}</span>
              <span>)</span>
            </p>
          </div>
        </div>
      </DockingBottomBar>

      {/* Disconnect WhatsApp Modal (Figma 1:33273) */}
      <DisconnectWhatsAppModal
        isOpen={isDisconnectModalOpen}
        onClose={handleCloseDisconnectModal}
        onConfirm={handleConfirmDisconnect}
        accountName={config.account.accountName}
        phoneNumber={config.account.officialPhoneNumber}
        wabaId={config.account.wabaId}
        provider={config.account.provider}
      />
    </div>
  );
}
