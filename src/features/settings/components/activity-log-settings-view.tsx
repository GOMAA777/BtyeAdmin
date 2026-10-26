"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Server,
  Users,
  Building2,
  CalendarDays,
  Layers,
  Receipt,
  Network,
  KeyRound,
  Zap,
  ShieldCheck,
  Eye,
  FileDown,
  Save,
  Check,
  History,
} from "lucide-react";
import { useActivityLogSettings } from "../controllers/use-activity-log-settings";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";
import { DataRetentionPeriod } from "../types";

export function ActivityLogSettingsView() {
  const {
    config,
    updateField,
    setRetention,
    handleToggleExport,
    handleSave,
    handleReset,
  } = useActivityLogSettings();

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:36132"
      data-name="إعدادات السجل والنشاط"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:36134"
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]">
            إعدادات السجل والنشاط
          </h1>
          <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
            تهيئة محرك التدقيق الأمني ، وضوابط أرشفة الأحداث التشغيلية، وسياسات الامتثال التنظيمي لحماية بيانات المنصة
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0"
          data-node-id="1:36143"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full flex flex-col gap-6">
        {/* 1. Activity Tracking Scopes Section */}
        <div
          className="bg-white rounded-[16px] p-6 sm:p-8 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-6 text-right"
          data-node-id="1:36151"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-[#e5eae0] border-b pb-4">
            <span className="bg-[#d8e8cb] text-[#121f0d] font-cairo font-medium text-[11px] px-2.5 py-1 rounded-full">
              9 نطاقات نشطة
            </span>
            <div className="flex flex-col items-end">
              <h2 className="font-cairo font-semibold text-[#181d17] text-[20px] leading-[30px]">
                نطاقات تتبع الأحداث التشغيلية والبرمجية
              </h2>
            </div>
          </div>

          <p className="font-cairo text-[#454840] text-[14px] leading-[22px]">
            تفعيل الرقابة اللحظية لكافة التغييرات والعمليات الحساسة عبر المنصة ومحافظ العقارات، وتوثيق هويات المستخدمين وعناوين IP.
          </p>

          {/* 9 Scope Items */}
          <div className="flex flex-col gap-3">
            {/* Item 1: System Activity */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36162"
            >
              <button
                type="button"
                onClick={() => updateField("trackSystemActivity", !config.trackSystemActivity)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.trackSystemActivity ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.trackSystemActivity ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    تسجيل نشاط النظام المركزي
                  </span>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    يرصد أخطاء الخوادم واستدعاءات API والمهام الخلفية المجدولة مع قياس أوقات الاستجابة.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <Server className="size-4" />
                </div>
              </div>
            </div>

            {/* Item 2: User Activity */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36180"
            >
              <button
                type="button"
                onClick={() => updateField("trackUserBehavior", !config.trackUserBehavior)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.trackUserBehavior ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.trackUserBehavior ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    تسجيل نشاط وتصرفات المستخدمين
                  </span>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    يرصد تسجيل الدخول، محاولات الاختراق، تغيير كلمات المرور، وإجراءات المشرفين وصلاحياتهم.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <Users className="size-4" />
                </div>
              </div>
            </div>

            {/* Item 3: Property Changes */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36198"
            >
              <button
                type="button"
                onClick={() => updateField("trackPropertyChanges", !config.trackPropertyChanges)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.trackPropertyChanges ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.trackPropertyChanges ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    تغييرات العقارات والمحافظ
                  </span>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    تسجيل إضافة، تعديل، أرشفة العقارات، صكوك الملكية، وتحديث بيانات الملاك ووثائق العقود.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <Building2 className="size-4" />
                </div>
              </div>
            </div>

            {/* Item 4: Booking Changes */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36216"
            >
              <button
                type="button"
                onClick={() => updateField("trackBookingChanges", !config.trackBookingChanges)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.trackBookingChanges ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.trackBookingChanges ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    تعديلات وتحديثات الحجوزات
                  </span>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    توثيق إنشاء الحجوزات، تمديد الإقامة، الإلغاء، وتغيير الوحدات السكنية مع هوية القائم بالإجراء.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <CalendarDays className="size-4" />
                </div>
              </div>
            </div>

            {/* Item 5: Subscription Changes */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36234"
            >
              <button
                type="button"
                onClick={() => updateField("trackSubscriptionChanges", !config.trackSubscriptionChanges)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.trackSubscriptionChanges ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.trackSubscriptionChanges ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    تعديلات الاشتراكات والخطط
                  </span>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    رصد عمليات الترقية، التخفيض، التعليق المؤقت، ونقل المشتركين بين باقات إدارة الأصول.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <Layers className="size-4" />
                </div>
              </div>
            </div>

            {/* Item 6: Payment & Billing Changes */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36252"
            >
              <button
                type="button"
                onClick={() => updateField("trackFinancialPayments", !config.trackFinancialPayments)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.trackFinancialPayments ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.trackFinancialPayments ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    العمليات المالية وحركات الدفع
                  </span>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    تتبع سداد الفواتير، عمليات الاسترداد البنكي، والربط مع بوابات الدفع بالتوافق مع هيئة الزكاة.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <Receipt className="size-4" />
                </div>
              </div>
            </div>

            {/* Item 7: Integration Changes */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36270"
            >
              <button
                type="button"
                onClick={() => updateField("trackIntegrationChanges", !config.trackIntegrationChanges)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.trackIntegrationChanges ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.trackIntegrationChanges ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    تغييرات التكاملات وقنوات التوزيع
                  </span>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    تتبع ربط وفصل Booking.com و Airbnb ومزامنة جداول التوافر والأسعار ومفاتيح API.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <Network className="size-4" />
                </div>
              </div>
            </div>

            {/* Item 8: Access-code Changes */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36288"
            >
              <button
                type="button"
                onClick={() => updateField("trackAccessCodes", !config.trackAccessCodes)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.trackAccessCodes ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.trackAccessCodes ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    تغييرات وتوليد أكواد الدخول الذكية
                  </span>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    تسجيل إصدار وتعديل وإلغاء رموز الأقفال الذكية وفترات صلاحيتها لكل نزيل وموظف صيانة.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <KeyRound className="size-4" />
                </div>
              </div>
            </div>

            {/* Item 9: Automation Events */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36306"
            >
              <button
                type="button"
                onClick={() => updateField("trackAutomationEvents", !config.trackAutomationEvents)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.trackAutomationEvents ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.trackAutomationEvents ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    أحداث ومحفزات محرك الأتمتة
                  </span>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    تتبع إرسال رسائل WhatsApp التلقائية، وجداول التنظيف، ونتائج تنفيذ القواعد الذكية.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <Zap className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Data Retention & Archival Policies */}
        <div
          className="bg-white rounded-[16px] p-6 sm:p-8 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-6 text-right"
          data-node-id="1:36324"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-[#e5eae0] border-b pb-4">
            <div className="flex items-center gap-1.5 text-[#34422a]">
              <span className="font-cairo font-semibold text-[12px]">
                متوافق مع ZATCA
              </span>
              <ShieldCheck className="size-4" />
            </div>

            <h2 className="font-cairo font-semibold text-[#181d17] text-[20px] leading-[30px]">
              مدة الاحتفاظ بالسجلات
            </h2>
          </div>

          <p className="font-cairo text-[#454840] text-[14px] leading-[22px]">
            تحديد فترة بقاء الأحداث وسجلات التدقيق في وحدات التخزين السريع عالية الأداء قبل نقلها التلقائي للأرشيف البارد المشفر.
          </p>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option 1: 1 Year */}
            <div
              onClick={() => setRetention("1_year")}
              className={`p-4 rounded-[16px] flex flex-col justify-between cursor-pointer border transition-all text-right ${
                config.retentionPeriod === "1_year"
                  ? "bg-[#d8e8cb] border-[#34422a]/40 shadow-sm"
                  : "bg-[#f1f5eb] border-transparent hover:border-[#c5c8bd]"
              }`}
              data-node-id="1:36337"
            >
              <div className="flex items-start justify-between pb-2">
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  تشغيلي أساسي
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px]">
                    سنة واحدة
                  </span>
                  <div
                    className={`size-5 rounded-full border flex items-center justify-center ${
                      config.retentionPeriod === "1_year"
                        ? "border-[#34422a] bg-[#34422a]"
                        : "border-[#75786f] bg-white"
                    }`}
                  >
                    {config.retentionPeriod === "1_year" && (
                      <div className="size-2 rounded-full bg-[#d8e8cb]" />
                    )}
                  </div>
                </div>
              </div>

              <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-2">
                الحد الأدنى للعمليات التشغيلية الاعتيادية. لا يُوصى به للشركات الخاضعة للفوترة الضريبية.
              </p>
            </div>

            {/* Option 2: 2 Years */}
            <div
              onClick={() => setRetention("2_years")}
              className={`p-4 rounded-[16px] flex flex-col justify-between cursor-pointer border transition-all text-right ${
                config.retentionPeriod === "2_years"
                  ? "bg-[#d8e8cb] border-[#34422a]/40 shadow-sm"
                  : "bg-[#f1f5eb] border-transparent hover:border-[#c5c8bd]"
              }`}
              data-node-id="1:36349"
            >
              <div className="flex items-start justify-between pb-2">
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  متوسط
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px]">
                    سنتان
                  </span>
                  <div
                    className={`size-5 rounded-full border flex items-center justify-center ${
                      config.retentionPeriod === "2_years"
                        ? "border-[#34422a] bg-[#34422a]"
                        : "border-[#75786f] bg-white"
                    }`}
                  >
                    {config.retentionPeriod === "2_years" && (
                      <div className="size-2 rounded-full bg-[#d8e8cb]" />
                    )}
                  </div>
                </div>
              </div>

              <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-2">
                متوافق مع متطلبات النزاعات الإيجارية المحدودة وفترات التقادم للضيافة قصيرة المدى.
              </p>
            </div>

            {/* Option 3: 5 Years (Active & Recommended) */}
            <div
              onClick={() => setRetention("5_years")}
              className={`p-4 rounded-[16px] flex flex-col justify-between cursor-pointer border transition-all text-right ${
                config.retentionPeriod === "5_years"
                  ? "bg-[#d8e8cb] border-[#34422a]/40 shadow-[0px_4px_16px_-4px_rgba(75,89,64,0.15)]"
                  : "bg-[#f1f5eb] border-transparent hover:border-[#c5c8bd]"
              }`}
              data-node-id="1:36361"
            >
              <div className="flex items-start justify-between pb-2">
                <span className="bg-[#34422a] text-white font-cairo font-semibold text-[11px] px-2.5 py-0.5 rounded-full">
                  موصى به
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px]">
                    5 سنوات
                  </span>
                  <div
                    className={`size-5 rounded-full border flex items-center justify-center ${
                      config.retentionPeriod === "5_years"
                        ? "border-[#34422a] bg-[#34422a]"
                        : "border-[#75786f] bg-white"
                    }`}
                  >
                    {config.retentionPeriod === "5_years" && (
                      <div className="size-2 rounded-full bg-[#d8e8cb]" />
                    )}
                  </div>
                </div>
              </div>

              <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-2">
                معتمد نظامياً وفق اشتراطات هيئة الزكاة والضريبة والجمارك (ZATCA) وضوابط الهيئة العامة للعقار لضمان الامتثال التام.
              </p>
            </div>

            {/* Option 4: Unlimited */}
            <div
              onClick={() => setRetention("unlimited")}
              className={`p-4 rounded-[16px] flex flex-col justify-between cursor-pointer border transition-all text-right ${
                config.retentionPeriod === "unlimited"
                  ? "bg-[#d8e8cb] border-[#34422a]/40 shadow-sm"
                  : "bg-[#f1f5eb] border-transparent hover:border-[#c5c8bd]"
              }`}
              data-node-id="1:36374"
            >
              <div className="flex items-start justify-between pb-2">
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  أرشيف مطلق
                </span>

                <div className="flex items-center gap-2">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px]">
                    غير محدود
                  </span>
                  <div
                    className={`size-5 rounded-full border flex items-center justify-center ${
                      config.retentionPeriod === "unlimited"
                        ? "border-[#34422a] bg-[#34422a]"
                        : "border-[#75786f] bg-white"
                    }`}
                  >
                    {config.retentionPeriod === "unlimited" && (
                      <div className="size-2 rounded-full bg-[#d8e8cb]" />
                    )}
                  </div>
                </div>
              </div>

              <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-2">
                أرشفة دائمة لا متناهية دون حذف أي سجل، قد تتطلب استهلاك سعة تخزينية سحابية إضافية.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Access Control & Export Permissions */}
        <div
          className="bg-white rounded-[16px] p-6 sm:p-8 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-6 text-right"
          data-node-id="1:36386"
        >
          {/* Header */}
          <div className="border-[#e5eae0] border-b pb-4">
            <h2 className="font-cairo font-semibold text-[#181d17] text-[20px] leading-[30px]">
              الوصول للسجلات وتصدير البيانات
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {/* Control 1: View Permission */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36392"
            >
              <button
                type="button"
                onClick={() => updateField("allowAdminViewAuditLog", !config.allowAdminViewAuditLog)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.allowAdminViewAuditLog ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.allowAdminViewAuditLog ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    السماح لمديري المنصة باستعراض سجلات التدقيق
                  </span>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    تمكين المشرفين الحاصلين على رتبة &quot;Platform Admin&quot; فقط من استعراض واجهة التدقيق المباشرة.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <Eye className="size-4" />
                </div>
              </div>
            </div>

            {/* Control 2: Export Permission (Disabled with 2FA badge) */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:36408"
            >
              <button
                type="button"
                onClick={() => handleToggleExport(!config.allowExportAuditLog)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.allowExportAuditLog ? "bg-[#34422a]" : "bg-[#d7dbd2]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.allowExportAuditLog ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex gap-3 items-center flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#ffdad6] text-[#93000a] font-cairo font-medium text-[11px] px-2 py-0.5 rounded-full">
                      يتطلب موافقة أمنية ثنائية
                    </span>
                    <span className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                      السماح بتصدير واستخراج السجلات خارج المنصة
                    </span>
                  </div>
                  <p className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                    معطل افتراضياً لمنع تسريب سجلات العملاء والعقود. يتطلب رمز توثيق OTP ورسالة موافقة خطية.
                  </p>
                </div>

                <div className="bg-white size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm shrink-0">
                  <FileDown className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PERSISTENT ACTION TOOLBAR */}
      <DockingBottomBar
        innerClassName="w-full bg-white/95 backdrop-blur-[6px] rounded-[16px] p-4 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border border-[#EBEBEB] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {/* Buttons on Left in RTL */}
        <div className="flex items-center gap-2 w-full sm:w-auto order-2 sm:order-1">
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#4b5940] hover:bg-[#3d4934] text-white px-8 py-2.5 rounded-[12px] font-cairo font-medium text-[14px] flex items-center justify-center gap-2 transition-colors drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] cursor-pointer flex-1 sm:flex-none"
            data-node-id="1:36430"
          >
            <span>حفظ التغييرات</span>
            <Save className="size-3.5" />
          </button>
          <Link
            href="/activity"
            className="bg-[#ebefe6] hover:bg-[#e0e5db] text-[#181d17] px-6 py-2.5 rounded-[12px] font-cairo font-normal text-[14px] transition-colors drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2 flex-1 sm:flex-none"
            data-node-id="1:36435"
          >
            <span>عرض سجل النشاط</span>
            <History className="size-3.5" />
          </Link>
        </div>

        {/* Security Notice on Right in RTL */}
        <div className="flex items-center gap-2.5 order-1 sm:order-2 text-right">
          <p className="font-cairo text-[#454840] text-[12px] leading-[18px]">
            <span>تسري تعديلات سياسات التتبع والاحتفاظ فور الحفظ، ويتم توثيق هذا الإجراء نفسه في </span>
            <span className="font-semibold">سجل التدقيق الإداري.</span>
          </p>
          <div className="bg-[#f1f5eb] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
            <ShieldCheck className="size-4" />
          </div>
        </div>
      </DockingBottomBar>
    </div>
  );
}
