"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Wrench,
  Lock,
  ChevronDown,
  BarChart3,
  Hourglass,
  Workflow,
  ShieldCheck,
  Wifi,
  Ban,
  CheckCircle2,
  Boxes,
  Brush,
  Save,
  Clock,
} from "lucide-react";
import { useOperationsSettings } from "../controllers/use-operations-settings";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function OperationsSettingsView() {
  const {
    settings,
    isDirty,
    updateSetting,
    handleReset,
    handleSave,
  } = useOperationsSettings();

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto font-cairo pb-28" dir="rtl">
      {/* 1. TOP HERO GREETING BAR (Figma 1:31039) */}
      <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#181d17] tracking-tight">
              إعدادات التشغيل
            </h1>
          </div>
          <p className="text-[14px] text-[#454840] mt-1.5 leading-[22px]">
            تهيئة محرك التدفقات التشغيلية المؤتمتة بين الحجوزات، التنظيف، بلاغات الصيانة، وتوافر الوحدات السكنية عبر المنصة.
          </p>
        </div>

        <Link
          href="/settings/"
          className="bg-[#f1f5eb] hover:bg-[#dfe4db] text-[#181d17] px-4 py-2.5 rounded-[12px] text-[14px] font-semibold flex items-center gap-2 transition-colors shrink-0 shadow-2xs"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="w-4 h-4 text-[#34422a]" />
        </Link>
      </div>

      {/* 2. Main Workflow Settings Layout (Figma 1:31054) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RIGHT / MAIN CONTENT (8 COLS IN RTL) */}
        <div className="lg:col-span-8 space-y-6">
          {/* SECTION 1: أتمتة دورة التنظيف (Figma 1:31056) */}
          <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ebefe6]">
              <div className="flex items-center gap-2.5">
                <div className="size-[36px] rounded-[8px] bg-[#f1f5eb] flex items-center justify-center text-[#34422a]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-[18px] font-bold text-[#181d17]">
                  أتمتة دورة التنظيف
                </h3>
              </div>
              <span className="bg-[#d8e8cb] text-[#3d4b36] px-3 py-1 rounded-full text-[11px] font-semibold">
                نشط في جميع العقارات
              </span>
            </div>

            {/* Toggle 1: Auto create cleaning task */}
            <div className="bg-[rgba(241,245,235,0.6)] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e0e7db]/70">
              <div className="space-y-1">
                <h4 className="text-[15px] font-bold text-[#181d17]">
                  إنشاء مهمة تنظيف تلقائيًا بعد المغادرة
                </h4>
                <p className="text-[12px] text-[#454840] leading-[18px]">
                  جدولة إسناد مهمة التنظيف وإشعار مشرف الضيافة فور تسجيل مغادرة النزيل أو انتهاء موعد الحجز المعتمد (12:00 م).
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting("autoCreateCleaningAfterCheckout", !settings.autoCreateCleaningAfterCheckout)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.autoCreateCleaningAfterCheckout ? "bg-[#34422a]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    settings.autoCreateCleaningAfterCheckout ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Two Dropdown Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 1: Default unit status on schedule */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-2 border border-[#e5eae0]/50">
                <label className="text-[13px] font-bold text-[#181d17] block">
                  الحالة التلقائية للوحدة عند الجدولة
                </label>
                <div className="relative">
                  <select
                    value={settings.defaultUnitStatusOnSchedule}
                    onChange={(e) => updateSetting("defaultUnitStatusOnSchedule", e.target.value)}
                    className="w-full bg-white border border-[#dce2d7] rounded-[8px] px-3 py-2 text-[13px] font-semibold text-[#181d17] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#34422a]"
                  >
                    <option value="يحتاج تنظيف">يحتاج تنظيف</option>
                    <option value="تحت الفحص">تحت الفحص المبدئي</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#75786f] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#75786f]">
                  <span className="size-1.5 rounded-full bg-[#f59e0b]" />
                  <span>الحالة الحالية المقبولة: يحتاج تنظيف</span>
                </div>
              </div>

              {/* Field 2: Assignment method */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-2 border border-[#e5eae0]/50">
                <label className="text-[13px] font-bold text-[#181d17] block">
                  آلية تعيين مهام التنظيف الافتراضية
                </label>
                <div className="relative">
                  <select
                    value={settings.cleaningAssignmentMethod}
                    onChange={(e) => updateSetting("cleaningAssignmentMethod", e.target.value)}
                    className="w-full bg-white border border-[#dce2d7] rounded-[8px] px-3 py-2 text-[13px] font-semibold text-[#181d17] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#34422a]"
                  >
                    <option value="تعيين تلقائي لمشرف الموقع">تعيين تلقائي لمشرف الموقع</option>
                    <option value="إسناد يدوي من المشرف">إسناد يدوي من المشرف</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#75786f] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-[#75786f] leading-[16px]">
                  يُشعر المشرف تلقائياً عبر تطبيق الجوال الميداني
                </p>
              </div>
            </div>

            {/* Toggle 2: Require completion checklist */}
            <div className="bg-[rgba(241,245,235,0.6)] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e0e7db]/70">
              <div className="space-y-1">
                <h4 className="text-[15px] font-bold text-[#181d17]">
                  اشتراط تأكيد اكتمال التنظيف
                </h4>
                <p className="text-[12px] text-[#454840] leading-[18px]">
                  إلزام المشرف الميداني باعتماد قائمة الفحص والتحقق الرقمية وإرفاق الصور التوثيقية قبل اعتماد جاهزية الغرفة أو الجناح.
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting("requireCleaningCompletionApproval", !settings.requireCleaningCompletionApproval)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.requireCleaningCompletionApproval ? "bg-[#34422a]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    settings.requireCleaningCompletionApproval ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: Lock unit readiness */}
            <div className="bg-[rgba(241,245,235,0.6)] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e0e7db]/70">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[15px] font-bold text-[#181d17]">
                    قفل جهوزية الوحدة لحين اكتمال التنظيف
                  </h4>
                  <Lock className="w-3.5 h-3.5 text-[#55634d]" />
                </div>
                <p className="text-[12px] text-[#454840] leading-[18px]">
                  تمنع المنصة تلقائياً تحويل الوحدة إلى «متاحة» على قنوات الحجز (Airbnb / Booking / المحرك المباشر) حتى يتم إغلاق مهمة التنظيف رسمياً واعتمادها نظامياً.
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting("lockUnitReadinessUntilCleaningComplete", !settings.lockUnitReadinessUntilCleaningComplete)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.lockUnitReadinessUntilCleaningComplete ? "bg-[#34422a]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    settings.lockUnitReadinessUntilCleaningComplete ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* SECTION 2: حوكمة الصيانة والأعطال (Figma 1:31110) */}
          <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ebefe6]">
              <div className="flex items-center gap-2.5">
                <div className="size-[36px] rounded-[8px] bg-[#f1f5eb] flex items-center justify-center text-[#34422a]">
                  <Wrench className="w-4 h-4" />
                </div>
                <h3 className="text-[18px] font-bold text-[#181d17]">
                  حوكمة الصيانة والأعطال
                </h3>
              </div>
              <span className="bg-[#d8e8cb] text-[#3d4b36] px-3 py-1 rounded-full text-[11px] font-semibold">
                معايير الضيافة الفاخرة
              </span>
            </div>

            {/* Toggle 1: Field completion approval */}
            <div className="bg-[rgba(241,245,235,0.6)] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e0e7db]/70">
              <div className="space-y-1">
                <h4 className="text-[15px] font-bold text-[#181d17]">
                  اشتراط تأكيد اكتمال الصيانة الميدانية
                </h4>
                <p className="text-[12px] text-[#454840] leading-[18px]">
                  اعتماد مهندس التشغيل أو الفني لتقرير الإصلاح وقطع الغيار واختبار الأجهزة قبل إغلاق بلاغ الصيانة وإفراج القفل الفني.
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting("requireMaintenanceFieldCompletion", !settings.requireMaintenanceFieldCompletion)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.requireMaintenanceFieldCompletion ? "bg-[#34422a]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    settings.requireMaintenanceFieldCompletion ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Special Box 2: Mandatory cleaning after maintenance */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e0e7db]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[15px] font-bold text-[#181d17]">
                    مسار النظافة الإلزامي بعد أعمال الصيانة
                  </h4>
                  <span className="bg-[#ebefe6] text-[#34422a] border border-[#d8e8cb] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                    • قاعدة مفعلة إلزامياً
                  </span>
                </div>
                <p className="text-[12px] text-[#454840] leading-[18px]">
                  لضمان أعلى معايير الجودة الفندقية، لا تعود الوحدة متاحة مباشرة بعد الصيانة بل تخضع لدورة تعقيم وتجهيز إجبارية.
                </p>
              </div>

              <div className="size-[36px] rounded-[10px] bg-[#d8e8cb] flex items-center justify-center text-[#34422a] shrink-0">
                <Brush className="w-4 h-4" />
              </div>
            </div>

            {/* Toggle 3: Auto create cleaning after maintenance close */}
            <div className="bg-[rgba(241,245,235,0.6)] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e0e7db]/70">
              <div className="space-y-1">
                <h4 className="text-[15px] font-bold text-[#181d17]">
                  إنشاء مهمة تنظيف وتجهيز تلقائياً فور إغلاق بلاغ الصيانة
                </h4>
                <p className="text-[12px] text-[#454840] leading-[18px]">
                  إصدار تذكرة تنظيف جديدة مجدولة تلقائياً فور تسجيل الفني اكتمال أعمال الصيانة ونقل حالة الوحدة من «تحت الصيانة» إلى «تحت التنظيف».
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting("autoCreateCleaningAfterMaintenanceClose", !settings.autoCreateCleaningAfterMaintenanceClose)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.autoCreateCleaningAfterMaintenanceClose ? "bg-[#34422a]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    settings.autoCreateCleaningAfterMaintenanceClose ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* SECTION 3: دورة حالات الوحدة السكنية (Figma 1:31145) */}
          <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#ebefe6]">
              <div className="size-[36px] rounded-[8px] bg-[#f1f5eb] flex items-center justify-center text-[#34422a]">
                <Workflow className="w-4 h-4" />
              </div>
              <h3 className="text-[18px] font-bold text-[#181d17]">
                دورة حالات الوحدة السكنية
              </h3>
            </div>

            {/* 4 Sequential State Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* Card 01: متاحة */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 border border-[#e5eae0]/60 space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#d8e8cb] text-[#34422a] text-[11px] font-bold px-2 py-0.5 rounded-full">
                      • متاحة
                    </span>
                    <span className="text-[11px] font-mono text-[#75786f]">01</span>
                  </div>
                  <p className="text-[11px] text-[#454840] leading-[16px]">
                    عند خلو الوحدة وانتهاء التنظيف، جاهزة لاستقبال الحجوزات ومزامنة الـ OTA.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#75786f] pt-2 border-t border-[#e2e8dc]/60">
                  <Wifi className="w-3 h-3 text-[#34422a]" />
                  <span>تزامن القنوات</span>
                </div>
              </div>

              {/* Card 02: مشغولة */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 border border-[#e5eae0]/60 space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#dbeafe] text-[#1d4ed8] text-[11px] font-bold px-2 py-0.5 rounded-full">
                      • مشغولة
                    </span>
                    <span className="text-[11px] font-mono text-[#75786f]">02</span>
                  </div>
                  <p className="text-[11px] text-[#454840] leading-[16px]">
                    تنشط تلقائياً عند تسجيل وصول الضيف أو حلول وقت الحجز المؤكد.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#75786f] pt-2 border-t border-[#e2e8dc]/60">
                  <Lock className="w-3 h-3 text-[#1d4ed8]" />
                  <span>قفل الحجوزات</span>
                </div>
              </div>

              {/* Card 03: تحت التنظيف */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 border border-[#e5eae0]/60 space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#fef3c7] text-[#b45309] text-[11px] font-bold px-2 py-0.5 rounded-full">
                      • تحت التنظيف
                    </span>
                    <span className="text-[11px] font-mono text-[#75786f]">03</span>
                  </div>
                  <p className="text-[11px] text-[#454840] leading-[16px]">
                    تنشط فور تسجيل المغادرة أو عقب اكتمال بلاغ صيانة معتمد.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#75786f] pt-2 border-t border-[#e2e8dc]/60">
                  <Boxes className="w-3 h-3 text-[#b45309]" />
                  <span>مهمة ميدانية</span>
                </div>
              </div>

              {/* Card 04: تحت الصيانة */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 border border-[#e5eae0]/60 space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#fee2e2] text-[#b91c1c] text-[11px] font-bold px-2 py-0.5 rounded-full">
                      • تحت الصيانة
                    </span>
                    <span className="text-[11px] font-mono text-[#75786f]">04</span>
                  </div>
                  <p className="text-[11px] text-[#454840] leading-[16px]">
                    تنشط فور رفع بلاغ صيانة حرج يحظر التوافر ويعلق الحجوزات.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#75786f] pt-2 border-t border-[#e2e8dc]/60">
                  <Ban className="w-3 h-3 text-[#b91c1c]" />
                  <span>حظر تقويمي</span>
                </div>
              </div>
            </div>

            {/* Strict Technical Alert Box */}
            <div className="bg-[#fdf8f0] border border-[#f5deb3] rounded-[12px] p-4 flex gap-3.5 items-start">
              <div className="size-[32px] rounded-[8px] bg-[rgba(245,222,179,0.6)] flex items-center justify-center text-[#87581b] shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[13px] font-bold text-[#613d0e]">
                  تنبيه تقني صارم: منع التجاوز اليدوي المباشر
                </h4>
                <p className="text-[12px] text-[#87581b] leading-relaxed">
                  يتم تحديث حالة الوحدة تلقائياً بناءً على الحجوزات وعمليات التشغيل، لا يُسمح بالتجاوز اليدوي المباشر للحالة دون وجود حدث تشغيلي مسجل (حجز، إتمام نظافة، أو إغلاق بلاغ)، وذلك لضمان موثوقية التوافر ومنع الحجز المزدوج وتوافق سجلات التدقيق.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT / SIDEBAR WIDGETS (4 COLS IN RTL) */}
        <div className="lg:col-span-4 space-y-6">
          {/* WIDGET 1: مؤشرات التشغيل اللحظية (Figma 1:31174) */}
          <div className="bg-white rounded-[16px] p-5 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#34422a]" />
              <h3 className="text-[16px] font-bold text-[#181d17]">
                مؤشرات التشغيل اللحظية
              </h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-[#181d17]">توزيع حالات الوحدات الحالية</span>
                <span className="bg-[#ebefe6] text-[#454840] px-2 py-0.5 rounded-[6px] font-mono font-medium">
                  11,290 وحدة
                </span>
              </div>

              {/* Multi-segment progress bar */}
              <div className="h-3 w-full rounded-full overflow-hidden flex bg-gray-100">
                <div style={{ width: "68%" }} className="bg-[#34422a]" title="متاحة (7,677)" />
                <div style={{ width: "22%" }} className="bg-[#1d4ed8]" title="مشغولة (2,484)" />
                <div style={{ width: "7%" }} className="bg-[#f59e0b]" title="تنظيف (790)" />
                <div style={{ width: "3%" }} className="bg-[#dc2626]" title="صيانة (339)" />
              </div>

              {/* Legend Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#34422a]" />
                  <span className="text-[#454840]">متاحة (7,677)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#1d4ed8]" />
                  <span className="text-[#454840]">مشغولة (2,484)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#f59e0b]" />
                  <span className="text-[#454840]">تنظيف (790)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#dc2626]" />
                  <span className="text-[#454840]">صيانة (339)</span>
                </div>
              </div>
            </div>

            {/* Average Cleaning Cycle Metric Box */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between border border-[#e5eae0]/60">
              <div className="space-y-0.5">
                <span className="text-[11px] text-[#75786f] font-medium block">
                  متوسط زمن دورة التنظيف
                </span>
                <span className="text-[20px] font-bold text-[#181d17] font-mono block">
                  42 دقيقة
                </span>
              </div>
              <span className="bg-[#d8e8cb] text-[#34422a] px-2.5 py-1 rounded-[8px] text-[11px] font-bold">
                ممتاز &gt; 60m
              </span>
            </div>
          </div>

          {/* WIDGET 2: فترات التجهيز الفاصلة (Figma 1:31210) */}
          <div className="bg-white rounded-[16px] p-5 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Hourglass className="w-4 h-4 text-[#34422a]" />
              <h3 className="text-[16px] font-bold text-[#181d17]">
                فترات التجهيز الفاصلة
              </h3>
            </div>

            <p className="text-[12px] text-[#454840] leading-[18px]">
              تحديد هامش وقت إلزامي بين مغادرة النزيل السابق ودخول النزيل التالي لضمان إتمام التنظيف دون ضغط تشغيلي.
            </p>

            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-semibold text-[#75786f] block">
                هامش التجهيز التلقائي
              </label>
              <div className="relative">
                <select
                  value={settings.autoPreparationBuffer}
                  onChange={(e) => updateSetting("autoPreparationBuffer", e.target.value)}
                  className="w-full bg-[#f1f5eb] border border-[#dce2d7] rounded-[8px] px-3 py-2 text-[13px] font-bold text-[#181d17] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#34422a]"
                >
                  <option value="2 ساعات">2 ساعات</option>
                  <option value="3 ساعات (موصى به)">3 ساعات (موصى به)</option>
                  <option value="4 ساعات">4 ساعات</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#75786f] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Bar (Docking Bottom Bar) */}
      <DockingBottomBar>
        <div className="backdrop-blur-md bg-white/95 rounded-[16px] p-4 shadow-xl border border-[#e5eae0] flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#34422a] text-white px-6 py-2.5 rounded-[12px] font-cairo font-semibold text-[13px] flex items-center justify-center gap-2 hover:bg-[#273220] transition-colors shadow-sm flex-1 sm:flex-none cursor-pointer"
            >
              <span>حفظ التغييرات</span>
              <Save className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#ebefe6] text-[#181d17] px-4 py-2.5 rounded-[12px] font-cairo font-semibold text-[13px] hover:bg-[#dde4d7] transition-colors flex-1 sm:flex-none cursor-pointer"
            >
              إلغاء التعديلات
            </button>
          </div>

          {/* Audit Telemetry */}
          <div className="flex items-center gap-2 text-[#75786f] text-[13px] font-cairo">
            <Clock className="size-3.5" />
            <p>
              <span>آخر تحديث: </span>
              <strong className="text-[#181d17] font-semibold">{settings.lastUpdated}</strong>
              <span> — بواسطة </span>
              <span className="text-[#34422a] font-medium">{settings.updatedBy}</span>
            </p>
          </div>
        </div>
      </DockingBottomBar>
    </div>
  );
}
