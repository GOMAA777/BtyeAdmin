"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Plus,
  Minus,
  Lock,
  Boxes,
  RotateCw,
  Sparkles,
  Network,
  Globe,
  Home,
  Laptop,
  Archive,
  Users2,
  ShieldCheck,
  Save,
  Check,
  ChevronDown,
} from "lucide-react";
import { useBookingSettings } from "../controllers/use-booking-settings";
import { ConfirmBookingRulesModal } from "./modals/confirm-booking-rules-modal";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function BookingSettingsView() {
  const {
    settings,
    isDirty,
    updateSetting,
    handleReset,
    handleSaveClick,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    comparisonItems,
    handleConfirmUpdate,
  } = useBookingSettings();

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto font-cairo pb-28" dir="rtl">
      {/* 1. TOP HERO GREETING BAR (Figma 1:30414) */}
      <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#181d17] tracking-tight">
              إعدادات الحجوزات
            </h1>
          </div>
          <p className="text-[14px] text-[#454840] mt-1.5 leading-[22px]">
            إدارة القواعد التشغيلية الموحدة والمعايير الافتراضية المطبقة على عقارات ووحدات ومحافظ الملاك عبر المملكة
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

      {/* 2. Main Settings Matrix (2 Column Layout - Figma 1:30428) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* RIGHT COLUMN IN RTL */}
        <div className="space-y-6">
          {/* SECTION 1: قواعد التواريخ (Figma 1:30498) */}
          <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2.5">
                <div className="size-[32px] rounded-[10px] bg-[#f1f5eb] flex items-center justify-center text-[#34422a]">
                  <Calendar className="w-4 h-4" />
                </div>
                <h2 className="text-[18px] font-bold text-[#181d17]">
                  قواعد التواريخ
                </h2>
              </div>
              <span className="bg-[#ebefe6] text-[#54624c] px-2.5 py-1 rounded-[8px] text-[12px] font-medium">
                إلزامي للمطابقة
              </span>
            </div>

            {/* Check-in & Check-out Side-by-side Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Check-in */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-2 border border-[#e5eae0]/50">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#181d17]">
                    تسجيل الدخول الافتراضي
                  </span>
                  <Clock className="w-4 h-4 text-[#55634d]" />
                </div>
                <div className="relative">
                  <select
                    value={settings.defaultCheckInTime}
                    onChange={(e) => updateSetting("defaultCheckInTime", e.target.value)}
                    className="w-full bg-white border border-[#dce2d7] rounded-[8px] px-3 py-2 text-[13px] font-semibold text-[#181d17] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#34422a]"
                  >
                    <option value="14:00">02:00 م (14:00)</option>
                    <option value="15:00">03:00 م (15:00)</option>
                    <option value="16:00">04:00 م (16:00)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#75786f] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-[#75786f] leading-[16px]">
                  الوقت الافتراضي المعتمد لتسليم المفتاح وتفعيل كود الدخول الذكي.
                </p>
              </div>

              {/* Check-out */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-2 border border-[#e5eae0]/50">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#181d17]">
                    تسجيل المغادرة الافتراضي
                  </span>
                  <Clock className="w-4 h-4 text-[#55634d]" />
                </div>
                <div className="relative">
                  <select
                    value={settings.defaultCheckOutTime}
                    onChange={(e) => updateSetting("defaultCheckOutTime", e.target.value)}
                    className="w-full bg-white border border-[#dce2d7] rounded-[8px] px-3 py-2 text-[13px] font-semibold text-[#181d17] appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#34422a]"
                  >
                    <option value="11:00">11:00 ص (11:00)</option>
                    <option value="12:00">12:00 م (12:00)</option>
                    <option value="13:00">01:00 م (13:00)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#75786f] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-[#75786f] leading-[16px]">
                  انتهاء صلاحية كود الدخول وبدء نافذة التنظيف الفني المجدولة.
                </p>
              </div>
            </div>

            {/* Same Day Booking Toggle */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e5eae0]/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-bold text-[#181d17]">
                    السماح بالحجز في نفس اليوم
                  </h4>
                  <span className="bg-[#d8e8cb] text-[#3d4b36] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                    {settings.allowSameDayBooking ? "مفعل" : "معطل"}
                  </span>
                </div>
                <p className="text-[12px] text-[#75786f] leading-[18px]">
                  إتاحة تأكيد الحجز والوصول الفوري خلال ساعات العمل المحددة قبل موعد الإغلاق المسائي.
                </p>
              </div>

              {/* Switch */}
              <button
                type="button"
                onClick={() => updateSetting("allowSameDayBooking", !settings.allowSameDayBooking)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.allowSameDayBooking ? "bg-[#34422a]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    settings.allowSameDayBooking ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Steppers: Min & Max Stay */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Min Stay */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-2 border border-[#e5eae0]/50">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#181d17]">
                    الحد الأدنى للمدة
                  </span>
                  <span className="text-[11px] text-[#75786f]">أيام الإقامة</span>
                </div>
                <div className="flex items-center justify-between bg-white border border-[#dce2d7] rounded-[8px] p-1.5">
                  <button
                    type="button"
                    onClick={() => updateSetting("minStayNights", Math.max(1, settings.minStayNights - 1))}
                    className="size-[28px] rounded-[6px] bg-[#f1f5eb] hover:bg-[#dfe4db] flex items-center justify-center text-[#181d17] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[14px] font-bold text-[#181d17] font-mono">
                    {settings.minStayNights} ليلة
                  </span>
                  <button
                    type="button"
                    onClick={() => updateSetting("minStayNights", settings.minStayNights + 1)}
                    className="size-[28px] rounded-[6px] bg-[#f1f5eb] hover:bg-[#dfe4db] flex items-center justify-center text-[#181d17] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-[#75786f] leading-[16px]">
                  القيمة الدنيا المسموح بطرحها عبر محركات البحث.
                </p>
              </div>

              {/* Max Stay */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-2 border border-[#e5eae0]/50">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#181d17]">
                    الحد الأقصى للمدة
                  </span>
                  <span className="text-[11px] text-[#75786f]">حد الضيافة</span>
                </div>
                <div className="flex items-center justify-between bg-white border border-[#dce2d7] rounded-[8px] p-1.5">
                  <button
                    type="button"
                    onClick={() => updateSetting("maxStayNights", Math.max(settings.minStayNights, settings.maxStayNights - 1))}
                    className="size-[28px] rounded-[6px] bg-[#f1f5eb] hover:bg-[#dfe4db] flex items-center justify-center text-[#181d17] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[14px] font-bold text-[#181d17] font-mono">
                    {settings.maxStayNights} ليلة
                  </span>
                  <button
                    type="button"
                    onClick={() => updateSetting("maxStayNights", settings.maxStayNights + 1)}
                    className="size-[28px] rounded-[6px] bg-[#f1f5eb] hover:bg-[#dfe4db] flex items-center justify-center text-[#181d17] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-[#75786f] leading-[16px]">
                  المدد الأطول تخضع لعقود منصة «إيجار» السكنية الموحدة.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: التوافر وإدارة المخزون (Figma 1:30548) */}
          <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2.5">
                <div className="size-[32px] rounded-[10px] bg-[#f1f5eb] flex items-center justify-center text-[#34422a]">
                  <Boxes className="w-4 h-4" />
                </div>
                <h2 className="text-[18px] font-bold text-[#181d17]">
                  التوافر وإدارة المخزون
                </h2>
              </div>
              <span className="bg-[#ebefe6] text-[#54624c] px-2.5 py-1 rounded-[8px] text-[12px] font-medium">
                حوكمة حيوية
              </span>
            </div>

            {/* Toggle 1: منع الحجز المزدوج (Locked) */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e5eae0]/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-bold text-[#181d17]">
                    منع الحجز المزدوج
                  </h4>
                  <span className="bg-[#34422a] text-white px-2 py-0.5 rounded-full text-[11px] font-semibold">
                    إلزامي
                  </span>
                </div>
                <p className="text-[12px] text-[#75786f] leading-[18px]">
                  حظر تأكيد أي حجز لنفس الوحدة في تواريخ متقاطعة عبر كافة القنوات والمنصات لحظياً مع قفل زمني تلقائي لمهلة الدفع.
                </p>
              </div>

              {/* Locked switch */}
              <div className="flex items-center gap-1.5 opacity-80 cursor-not-allowed">
                <Lock className="w-3.5 h-3.5 text-[#55634d]" />
                <div className="relative inline-flex h-6 w-12 shrink-0 rounded-full bg-[#34422a]">
                  <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md mt-0.5 mr-1" />
                </div>
              </div>
            </div>

            {/* Toggle 2: تحديث حالة الوحدات تلقائياً */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e5eae0]/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-bold text-[#181d17]">
                    تحديث حالة الوحدات تلقائياً
                  </h4>
                  <span className="bg-[#d8e8cb] text-[#3d4b36] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                    {settings.autoUpdateUnitStatus ? "مفعل" : "معطل"}
                  </span>
                </div>
                <p className="text-[12px] text-[#75786f] leading-[18px]">
                  تحويل حالة الوحدة فورياً بين مشغولة، تحت التنظيف، ومتاحة بناءً على حركة الحجوزات ونظام المفاتيح الرقمي.
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting("autoUpdateUnitStatus", !settings.autoUpdateUnitStatus)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.autoUpdateUnitStatus ? "bg-[#34422a]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    settings.autoUpdateUnitStatus ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: إنشاء مهمة تنظيف تلقائياً بعد المغادرة */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e5eae0]/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-bold text-[#181d17]">
                    إنشاء مهمة تنظيف تلقائياً بعد المغادرة
                  </h4>
                  <span className="bg-[#d8e8cb] text-[#3d4b36] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                    {settings.autoCreateCleaningOnCheckout ? "مفعل" : "معطل"}
                  </span>
                </div>
                <p className="text-[12px] text-[#75786f] leading-[18px]">
                  إسناد مهمة تنظيف مجدولة فور خروج النزيل مع إرسال إشعار لحظي للمشرف الميداني وطاقم الضيافة المعتمد.
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting("autoCreateCleaningOnCheckout", !settings.autoCreateCleaningOnCheckout)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.autoCreateCleaningOnCheckout ? "bg-[#34422a]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    settings.autoCreateCleaningOnCheckout ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN IN RTL */}
        <div className="space-y-6">
          {/* SECTION 3: مصادر الحجز والقنوات المتصلة (Figma 1:30430) */}
          <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2.5">
                <div className="size-[32px] rounded-[10px] bg-[#f1f5eb] flex items-center justify-center text-[#34422a]">
                  <Network className="w-4 h-4" />
                </div>
                <h2 className="text-[18px] font-bold text-[#181d17]">
                  مصادر الحجز والقنوات المتصلة
                </h2>
              </div>
              <span className="bg-[#ebefe6] text-[#54624c] px-2.5 py-1 rounded-[8px] text-[12px] font-medium">
                4 قنوات نشطة
              </span>
            </div>

            {/* Channels List */}
            <div className="space-y-2.5">
              {/* Channel 1: Booking.com */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex items-center justify-between gap-3 border border-[#e5eae0]/50">
                <div className="flex items-center gap-3">
                  <div className="size-[36px] rounded-[10px] bg-white flex items-center justify-center text-[#003580] font-bold text-[14px] shadow-2xs border border-[#dfe4db]">
                    B.
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#181d17]">Booking.com</span>
                      <span className="bg-[#d8e8cb] text-[#3d4b36] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                        نشط
                      </span>
                    </div>
                    <p className="text-[11px] text-[#75786f]">
                      مفعل • تزامن لحظي OTA XML ثنائي الاتجاه
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => updateSetting("enableBookingCom", !settings.enableBookingCom)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings.enableBookingCom ? "bg-[#34422a]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                      settings.enableBookingCom ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Channel 2: Airbnb */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex items-center justify-between gap-3 border border-[#e5eae0]/50">
                <div className="flex items-center gap-3">
                  <div className="size-[36px] rounded-[10px] bg-white flex items-center justify-center text-[#FF5A5F] shadow-2xs border border-[#dfe4db]">
                    <Home className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#181d17]">Airbnb</span>
                      <span className="bg-[#d8e8cb] text-[#3d4b36] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                        نشط
                      </span>
                    </div>
                    <p className="text-[11px] text-[#75786f]">
                      مفعل • تزامن مباشر API / iCal الشركاء المعتمد
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => updateSetting("enableAirbnb", !settings.enableAirbnb)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings.enableAirbnb ? "bg-[#34422a]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                      settings.enableAirbnb ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Channel 3: Direct Engine */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex items-center justify-between gap-3 border border-[#e5eae0]/50">
                <div className="flex items-center gap-3">
                  <div className="size-[36px] rounded-[10px] bg-white flex items-center justify-center text-[#34422a] shadow-2xs border border-[#dfe4db]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#181d17]">
                        الحجز المباشر (Direct Engine)
                      </span>
                      <span className="bg-[#ebefe6] text-[#34422a] px-2 py-0.5 rounded-full text-[11px] font-bold">
                        رئيسي
                      </span>
                    </div>
                    <p className="text-[11px] text-[#75786f]">
                      مفعل • بوابة المالك والموقع التعريفي الرسمي للمحفظة
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => updateSetting("enableDirectEngine", !settings.enableDirectEngine)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings.enableDirectEngine ? "bg-[#34422a]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                      settings.enableDirectEngine ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Channel 4: Manual / Reception */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex items-center justify-between gap-3 border border-[#e5eae0]/50">
                <div className="flex items-center gap-3">
                  <div className="size-[36px] rounded-[10px] bg-white flex items-center justify-center text-[#454840] shadow-2xs border border-[#dfe4db]">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#181d17]">
                        مصادر أخرى ومكاتب الاستقبال
                      </span>
                      <span className="bg-[#ebefe6] text-[#75786f] px-2 py-0.5 rounded-full text-[11px] font-medium">
                        يدوي
                      </span>
                    </div>
                    <p className="text-[11px] text-[#75786f]">
                      مفعل • الإدخال الإداري والمكتبي عبر لوحة التحكم
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => updateSetting("enableManualReception", !settings.enableManualReception)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings.enableManualReception ? "bg-[#34422a]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                      settings.enableManualReception ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 4: الحجوزات الملغاة وسياسة الأرشفة (Figma 1:30467) */}
          <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2.5">
                <div className="size-[32px] rounded-[10px] bg-[#f1f5eb] flex items-center justify-center text-[#34422a]">
                  <Archive className="w-4 h-4" />
                </div>
                <h2 className="text-[18px] font-bold text-[#181d17]">
                  الحجوزات الملغاة وسياسة الأرشفة
                </h2>
              </div>
              <span className="bg-[#fef2f2] text-[#991b1b] px-2.5 py-1 rounded-[8px] text-[12px] font-medium">
                تدقيق رقابي
              </span>
            </div>

            {/* Toggle 1: الاحتفاظ بسجل الحجوزات */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e5eae0]/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-bold text-[#181d17]">
                    الاحتفاظ بسجل الحجوزات الملغاة
                  </h4>
                  <span className="bg-[#d8e8cb] text-[#3d4b36] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                    {settings.retainCancelledBookings ? "مفعل" : "معطل"}
                  </span>
                </div>
                <p className="text-[12px] text-[#75786f] leading-[18px]">
                  أرشفة كافة بيانات الحجز وسجل الدفع والسبب للأغراض الضريبية والتدقيق المالي لمدة لا تقل عن 5 سنوات.
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting("retainCancelledBookings", !settings.retainCancelledBookings)}
                className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.retainCancelledBookings ? "bg-[#34422a]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                    settings.retainCancelledBookings ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: السماح بحذف الحجوزات الملغاة نهائياً (Locked Disabled) */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4 border border-[#e5eae0]/50 opacity-90">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-bold text-[#181d17]">
                    السماح بحذف الحجوزات الملغاة نهائياً
                  </h4>
                  <span className="bg-[#f1f5f9] text-[#64748b] border border-gray-200 px-2 py-0.5 rounded-full text-[11px] font-medium">
                    غير مسموح • محمي
                  </span>
                </div>
                <p className="text-[12px] text-[#75786f] leading-[18px]">
                  منع الحذف النهائي للحجوزات الملغاة للحفاظ على سجل التدقيق المالي ومطابقة أنظمة هيئة الزكاة والضريبة والجمارك (ZATCA).
                </p>
              </div>

              {/* Disabled Switch */}
              <div className="relative inline-flex h-6 w-12 shrink-0 rounded-full bg-gray-300 cursor-not-allowed">
                <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md mt-0.5 mr-6" />
              </div>
            </div>
          </div>

          {/* SECTION 5: صلاحيات تعديل الحجوزات (Figma 1:30480) */}
          <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2.5">
                <div className="size-[32px] rounded-[10px] bg-[#f1f5eb] flex items-center justify-center text-[#34422a]">
                  <Users2 className="w-4 h-4" />
                </div>
                <h2 className="text-[18px] font-bold text-[#181d17]">
                  صلاحيات تعديل الحجوزات
                </h2>
              </div>
              <span className="bg-[#ebefe6] text-[#54624c] px-2.5 py-1 rounded-[8px] text-[12px] font-medium">
                إدارة الشركاء
              </span>
            </div>

            {/* Permissions Toggles */}
            <div className="space-y-2.5">
              {/* Permission 1: تعديل بيانات الحجز */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex items-center justify-between gap-3 border border-[#e5eae0]/50">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#181d17]">
                      السماح للمالك بتعديل بيانات الحجز
                    </span>
                    <span className="bg-[#d8e8cb] text-[#3d4b36] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                      مسموح
                    </span>
                  </div>
                  <p className="text-[11px] text-[#75786f]">
                    تمكين صاحب العقار من تحديث ملاحظات النزيل وتفاصيل التواصل وعدد المرافقين.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => updateSetting("allowOwnerEditBookingDetails", !settings.allowOwnerEditBookingDetails)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings.allowOwnerEditBookingDetails ? "bg-[#34422a]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                      settings.allowOwnerEditBookingDetails ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Permission 2: تغيير تواريخ الحجز */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex items-center justify-between gap-3 border border-[#e5eae0]/50">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#181d17]">
                      السماح للمالك بتغيير تواريخ الحجز
                    </span>
                    <span className="bg-[#d8e8cb] text-[#3d4b36] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                      مسموح
                    </span>
                  </div>
                  <p className="text-[11px] text-[#75786f]">
                    إمكانية تعديل تاريخ الوصول والمغادرة قبل موعد تسجيل الدخول بـ 24 ساعة على الأقل.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => updateSetting("allowOwnerChangeDates", !settings.allowOwnerChangeDates)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings.allowOwnerChangeDates ? "bg-[#34422a]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                      settings.allowOwnerChangeDates ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Permission 3: تمديد فترة الإقامة */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex items-center justify-between gap-3 border border-[#e5eae0]/50">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#181d17]">
                      السماح للمالك بتمديد فترة الإقامة
                    </span>
                    <span className="bg-[#d8e8cb] text-[#3d4b36] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                      مسموح
                    </span>
                  </div>
                  <p className="text-[11px] text-[#75786f]">
                    تمكين إضافة ليالٍ إضافية للنزيل الحالي بسهولة وإعادة احتساب الفاتورة تلقائياً.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => updateSetting("allowOwnerExtendStay", !settings.allowOwnerExtendStay)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings.allowOwnerExtendStay ? "bg-[#34422a]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                      settings.allowOwnerExtendStay ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Permission 4: اشتراط التحقق من توافر الوحدة */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex items-center justify-between gap-3 border border-[#e5eae0]/50">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#181d17]">
                      اشتراط التحقق من توافر الوحدة قبل اعتماد التعديل
                    </span>
                    <span className="bg-[#34422a] text-white px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      فحص إلزامي
                    </span>
                  </div>
                  <p className="text-[11px] text-[#75786f]">
                    منع حفظ أي تعديل في التواريخ ما لم يتحقق النظام لحظياً من خلو الوحدة من أي تعارضات مجدولة.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => updateSetting("requireAvailabilityCheckBeforeEdit", !settings.requireAvailabilityCheckBeforeEdit)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings.requireAvailabilityCheckBeforeEdit ? "bg-[#34422a]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ${
                      settings.requireAvailabilityCheckBeforeEdit ? "mr-1 translate-x-0" : "mr-6 translate-x-0"
                    }`}
                  />
                </button>
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
              onClick={handleSaveClick}
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

      {/* Confirmation Modal */}
      <ConfirmBookingRulesModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        comparisonItems={comparisonItems}
      />
    </div>
  );
}
