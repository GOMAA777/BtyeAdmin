"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Clock,
  Banknote,
  Calendar,
  CalendarDays,
  ChevronDown,
  Check,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Save,
  Moon,
  Coins,
  Hash,
  Eye,
  Languages,
} from "lucide-react";
import { useLanguageRegionSettings } from "../controllers/use-language-region-settings";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function LanguageRegionSettingsView() {
  const {
    config,
    updateField,
    setTimeFormat,
    setCurrencyPosition,
    handleSave,
    handleReset,
  } = useLanguageRegionSettings();

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [timezoneDropdownOpen, setTimezoneDropdownOpen] = useState(false);
  const [dateFormatDropdownOpen, setDateFormatDropdownOpen] = useState(false);
  const [weekStartDropdownOpen, setWeekStartDropdownOpen] = useState(false);
  const [baseCalendarDropdownOpen, setBaseCalendarDropdownOpen] = useState(false);

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:35672"
      data-name="إعدادات اللغة والمنطقة والتقويم"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:35674"
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]">
            إعدادات اللغة والمنطقة
          </h1>
          <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
            تهيئة المعايير الإقليمية، اللغات المعتمدة، وضوابط التوقيت والتاريخ والعملات على مستوى منصة ابراج
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0"
          data-node-id="1:35683"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* 2-COLUMN RESPONSIVE GRID (approx 68% Configuration / 32% Preview & Governance) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* LEFT / MAIN CONFIGURATION COLUMN (8 Cols on desktop, on right in RTL) */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          {/* SECTION 1: Language & Interface */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-5 text-right"
            data-node-id="1:35708"
          >
            {/* Header */}
            <div className="flex items-center justify-end gap-3 border-[#e5eae0] border-b pb-3">
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                اللغة وواجهة المستخدم
              </h2>
              <div className="bg-[#ebefe6] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
                <Globe className="size-5" />
              </div>
            </div>

            {/* Default Language Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                لغة المنصة الافتراضية للواجهات والتقارير
              </label>
              <div className="relative">
                <div className="bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between font-cairo text-[#181d17] text-[14px] cursor-pointer">
                  <ChevronDown className="size-4 text-[#75786f]" />
                  <div className="flex items-center gap-2">
                    <span>{config.defaultLanguage}</span>
                    <Languages className="size-4 text-[#34422a]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Available Language Bundles */}
            <div className="flex flex-col gap-1.5">
              <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                حزم اللغات المتاحة في المنظومة
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* English Card */}
                <div
                  onClick={() => updateField("enableEnglishLanguage", !config.enableEnglishLanguage)}
                  className={`bg-[#f1f5eb] p-4 rounded-[12px] flex items-start justify-between cursor-pointer border transition-all ${
                    config.enableEnglishLanguage ? "border-[#34422a]/40" : "border-transparent"
                  }`}
                  data-node-id="1:35732"
                >
                  <div className="pt-0.5">
                    <div
                      className={`size-4 rounded-[4px] border flex items-center justify-center ${
                        config.enableEnglishLanguage
                          ? "bg-[#34422a] border-[#34422a] text-white"
                          : "border-[#75786f] bg-white"
                      }`}
                    >
                      {config.enableEnglishLanguage && <Check className="size-3 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                      الإنجليزية (English)
                    </span>
                    <p className="font-cairo text-[#54624c] text-[13px] leading-[20px] mt-1">
                      محاذاة لليسار (LTR) مع مراعاة قوالب العقود
                    </p>
                  </div>
                </div>

                {/* Arabic Card (Locked / Default) */}
                <div
                  className="bg-[#f1f5eb] p-4 rounded-[12px] flex items-start justify-between border border-[#34422a]/40 relative"
                  data-node-id="1:35744"
                >
                  <span className="bg-[#4b5940] text-white font-cairo font-normal text-[12px] px-2 py-0.5 rounded-full shrink-0">
                    أساسية
                  </span>

                  <div className="flex items-start gap-2.5">
                    <div className="flex flex-col items-end">
                      <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                        العربية (Arabic)
                      </span>
                      <p className="font-cairo text-[#54624c] text-[13px] leading-[20px] mt-1">
                        محاذاة كاملة لليمين (RTL) مع خط القاهرة القياسي
                      </p>
                    </div>

                    <div className="size-4 rounded-full bg-[#34422a] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-3 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Switch: Allow user override */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:35758"
            >
              <button
                type="button"
                onClick={() => updateField("allowUserLanguageOverride", !config.allowUserLanguageOverride)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.allowUserLanguageOverride ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.allowUserLanguageOverride ? "-translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex flex-col items-end">
                <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                  السماح للمستخدمين بتخصيص لغة واجهتهم
                </span>
                <p className="font-cairo text-[#54624c] text-[13px] leading-[20px] mt-0.5">
                  تمكين ملاك العقارات، النزلاء، والمشرفين من التبديل الفوري بين العربية والإنجليزية من شريط الرأس
                </p>
              </div>
            </div>

            {/* Coverage Bar */}
            <div
              className="bg-[#ebefe6] rounded-[12px] px-4 py-2 flex items-center justify-between"
              data-node-id="1:35767"
            >
              <span className="font-cairo font-medium text-[#54624c] text-[11px]">
                إصدار القاموس {config.dictionaryVersion}
              </span>

              <div className="flex items-center gap-2">
                <span className="font-cairo text-[#181d17] text-[13px]">
                  معدل التغطية اللغوية: 100% للغة العربية الرسمية • 99.4% للمصطلحات الفندقية والمالية بالإنجليزية
                </span>
                <CheckCircle2 className="size-4 text-[#34422a]" />
              </div>
            </div>
          </div>

          {/* SECTION 2: Region & Timezone */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-5 text-right"
            data-node-id="1:35775"
          >
            {/* Header */}
            <div className="flex items-center justify-end gap-3 border-[#e5eae0] border-b pb-3">
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                المنطقة والتوقيت
              </h2>
              <div className="bg-[#ebefe6] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
                <Clock className="size-5" />
              </div>
            </div>

            {/* Country and Timezone in 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  الدولة
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    className="w-full bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between font-cairo text-[#181d17] text-[14px] cursor-pointer"
                  >
                    <ChevronDown className="size-4 text-[#75786f]" />
                    <div className="flex items-center gap-2">
                      <span>{config.country}</span>
                      <Globe className="size-4 text-[#34422a]" />
                    </div>
                  </button>

                  {countryDropdownOpen && (
                    <div className="absolute top-full start-0 end-0 mt-1 bg-white border border-[#e5eae0] rounded-[12px] shadow-lg py-1 z-30 font-cairo text-[13px] text-right">
                      {["المملكة العربية السعودية (KSA)", "الإمارات العربية المتحدة (UAE)", "دولة الكويت (KWT)", "مملكة البحرين (BHR)"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            updateField("country", c);
                            setCountryDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-right hover:bg-[#f1f5eb] transition-colors"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Timezone */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  المنطقة الزمنية للخوادم والتشغيل
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setTimezoneDropdownOpen(!timezoneDropdownOpen)}
                    className="w-full bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between font-cairo text-[#181d17] text-[14px] cursor-pointer"
                  >
                    <ChevronDown className="size-4 text-[#75786f]" />
                    <div className="flex items-center gap-2">
                      <span>{config.timezone}</span>
                      <Clock className="size-4 text-[#34422a]" />
                    </div>
                  </button>

                  {timezoneDropdownOpen && (
                    <div className="absolute top-full start-0 end-0 mt-1 bg-white border border-[#e5eae0] rounded-[12px] shadow-lg py-1 z-30 font-cairo text-[13px] text-right">
                      {["توقيت الرياض —  (GMT+03:00)", "توقيت دبي — (GMT+04:00)", "توقit القاهرة — (GMT+02:00)"].map((tz) => (
                        <button
                          key={tz}
                          type="button"
                          onClick={() => {
                            updateField("timezone", tz);
                            setTimezoneDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-right hover:bg-[#f1f5eb] transition-colors"
                        >
                          {tz}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Time Format Selector */}
            <div className="flex flex-col gap-2">
              <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                نظام عرض التوقيت
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 24h format */}
                <div
                  onClick={() => setTimeFormat("24h")}
                  className={`bg-[#f1f5eb] h-[52px] px-4 rounded-[12px] flex items-center justify-between cursor-pointer border transition-all ${
                    config.timeFormat === "24h" ? "border-[#34422a]" : "border-transparent"
                  }`}
                  data-node-id="1:35809"
                >
                  <div
                    className={`size-4 rounded-full border flex items-center justify-center ${
                      config.timeFormat === "24h" ? "border-[#34422a]" : "border-[#767676] bg-white"
                    }`}
                  >
                    {config.timeFormat === "24h" && (
                      <div className="size-2 rounded-full bg-[#34422a]" />
                    )}
                  </div>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    24 ساعة (التنسيق العسكري)
                  </span>
                </div>

                {/* 12h format */}
                <div
                  onClick={() => setTimeFormat("12h")}
                  className={`bg-[#f1f5eb] h-[52px] px-4 rounded-[12px] flex items-center justify-between cursor-pointer border transition-all ${
                    config.timeFormat === "12h" ? "border-[#34422a]" : "border-transparent"
                  }`}
                  data-node-id="1:35814"
                >
                  <div
                    className={`size-4 rounded-full border flex items-center justify-center ${
                      config.timeFormat === "12h" ? "border-[#34422a]" : "border-[#767676] bg-white"
                    }`}
                  >
                    {config.timeFormat === "12h" && (
                      <div className="size-2 rounded-full bg-[#34422a]" />
                    )}
                  </div>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    12 ساعة (ص / م) — موصى به
                  </span>
                </div>
              </div>

              {/* Note */}
              <div className="flex items-center justify-end gap-1.5 text-[#54624c] text-[11px] font-cairo font-medium mt-1">
                <span>الوقت الحالي المعتمد في منظومة التشغيل: 02:45:18 م (توقيت مكة المكرمة القياسي)</span>
                <Clock className="size-3.5 text-[#34422a]" />
              </div>
            </div>

            {/* Date Format Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                تنسيق عرض التاريخ في الجداول والفواتير
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDateFormatDropdownOpen(!dateFormatDropdownOpen)}
                  className="w-full bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between font-cairo text-[#181d17] text-[14px] cursor-pointer"
                >
                  <ChevronDown className="size-4 text-[#75786f]" />
                  <div className="flex items-center gap-2">
                    <span>{config.dateFormat}</span>
                    <Calendar className="size-4 text-[#34422a]" />
                  </div>
                </button>

                {dateFormatDropdownOpen && (
                  <div className="absolute top-full start-0 end-0 mt-1 bg-white border border-[#e5eae0] rounded-[12px] shadow-lg py-1 z-30 font-cairo text-[13px] text-right">
                    {[
                      "DD/MM/YYYY (يوم / شهر / سنة) — المعتمد في السجلات السعودية (مثال: 05/10/2026)",
                      "YYYY-MM-DD (سنة - شهر - يوم) — المعيار الدولي ISO",
                      "DD MMM YYYY (يوم شهر سنة) — مثال: 05 أكتوبر 2026",
                    ].map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => {
                          updateField("dateFormat", fmt);
                          setDateFormatDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-right hover:bg-[#f1f5eb] transition-colors"
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 3: Currency & Monetary Standards */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-5 text-right"
            data-node-id="1:35834"
          >
            {/* Header */}
            <div className="flex items-center justify-end gap-3 border-[#e5eae0] border-b pb-3">
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                العملة والتسعير المالي
              </h2>
              <div className="bg-[#ebefe6] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
                <Banknote className="size-5" />
              </div>
            </div>

            {/* Default Currency Card */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              data-node-id="1:35844"
            >
              <span className="bg-[#d8e8cb] text-[#5a6952] font-cairo font-semibold text-[14px] px-4 py-2 rounded-full order-2 sm:order-1">
                العملة الثابتة
              </span>

              <div className="flex items-center gap-4 order-1 sm:order-2 flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    {config.currencyName} (Saudi Riyal — {config.currencyCode})
                  </span>
                  <p className="font-cairo text-[#54624c] text-[13px] leading-[20px] mt-0.5">
                    العملة الرسمية والوحيدة لتسوية عقود الوحدات والمحافظ في النظام
                  </p>
                </div>

                <div className="bg-white size-12 rounded-[12px] flex items-center justify-center text-[#34422a] font-cairo font-bold text-[18px] shadow-sm shrink-0">
                  ر.س
                </div>
              </div>
            </div>

            {/* 2 Sub-Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column: Number formatting & Decimals */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                    تنسيق فواصل الآلاف والكسور
                  </label>
                  <div className="bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between font-cairo text-[#181d17] text-[14px]">
                    <ChevronDown className="size-4 text-[#75786f]" />
                    <div className="flex items-center gap-2">
                      <span>{config.numberFormatting}</span>
                      <Hash className="size-4 text-[#34422a]" />
                    </div>
                  </div>
                </div>

                {/* Decimal display switch */}
                <div
                  className="bg-[#f1f5eb] rounded-[12px] p-3 flex items-center justify-between gap-4"
                  data-node-id="1:35866"
                >
                  <button
                    type="button"
                    onClick={() => updateField("showDecimals", !config.showDecimals)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                      config.showDecimals ? "bg-[#34422a]" : "bg-[#dfe4db]"
                    }`}
                  >
                    <div
                      className={`bg-white size-4 rounded-full shadow-sm transition-transform ${
                        config.showDecimals ? "-translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>

                  <div className="flex flex-col items-end">
                    <span className="font-cairo font-semibold text-[#181d17] text-[12px]">
                      إظهار الهللات (الكسر العشري .00)
                    </span>
                    <span className="font-cairo font-medium text-[#54624c] text-[11px]">
                      إلزامية للفواتير الضريبية ZATCA
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Currency symbol position */}
              <div className="flex flex-col gap-2">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  موضع رمز العملة بالنسبة للأرقام
                </label>
                <div className="flex flex-col gap-2">
                  {/* Option 1: After */}
                  <div
                    onClick={() => setCurrencyPosition("after")}
                    className={`bg-[#f1f5eb] p-3 rounded-[12px] flex items-center justify-between cursor-pointer border transition-all ${
                      config.currencyPosition === "after" ? "border-[#34422a]" : "border-transparent"
                    }`}
                    data-node-id="1:35879"
                  >
                    <span className="font-cairo font-semibold text-[#54624c] text-[11px]">
                      القياسي العربي
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-cairo font-normal text-[#181d17] text-[14px]">
                        بعد المبلغ (مثال: 450 ر.س)
                      </span>
                      <div
                        className={`size-3.5 rounded-full border flex items-center justify-center ${
                          config.currencyPosition === "after"
                            ? "border-[#34422a]"
                            : "border-[#767676] bg-white"
                        }`}
                      >
                        {config.currencyPosition === "after" && (
                          <div className="size-2 rounded-full bg-[#34422a]" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Option 2: Before */}
                  <div
                    onClick={() => setCurrencyPosition("before")}
                    className={`bg-[#f1f5eb] p-3 rounded-[12px] flex items-center justify-between cursor-pointer border transition-all ${
                      config.currencyPosition === "before" ? "border-[#34422a]" : "border-transparent"
                    }`}
                    data-node-id="1:35887"
                  >
                    <span className="font-cairo font-medium text-[#54624c] text-[11px]">
                      البديل التجاري
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-cairo font-normal text-[#181d17] text-[14px]">
                        قبل المبلغ (مثال: ر.س 450)
                      </span>
                      <div
                        className={`size-3.5 rounded-full border flex items-center justify-center ${
                          config.currencyPosition === "before"
                            ? "border-[#34422a]"
                            : "border-[#767676] bg-white"
                        }`}
                      >
                        {config.currencyPosition === "before" && (
                          <div className="size-2 rounded-full bg-[#34422a]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Calendar & Working Week */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-5 text-right"
            data-node-id="1:35894"
          >
            {/* Header */}
            <div className="flex items-center justify-end gap-3 border-[#e5eae0] border-b pb-3">
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                التقويم وبدء الأسبوع
              </h2>
              <div className="bg-[#ebefe6] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
                <Calendar className="size-5" />
              </div>
            </div>

            {/* Week start and Base calendar in 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Week start day */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  اليوم الأول في أسبوع التشغيل والحجوزات
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setWeekStartDropdownOpen(!weekStartDropdownOpen)}
                    className="w-full bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between font-cairo text-[#181d17] text-[14px] cursor-pointer"
                  >
                    <ChevronDown className="size-4 text-[#75786f]" />
                    <div className="flex items-center gap-2">
                      <span>{config.weekStartDay}</span>
                      <CalendarDays className="size-4 text-[#34422a]" />
                    </div>
                  </button>

                  {weekStartDropdownOpen && (
                    <div className="absolute top-full start-0 end-0 mt-1 bg-white border border-[#e5eae0] rounded-[12px] shadow-lg py-1 z-30 font-cairo text-[13px] text-right">
                      {["السبت (Saturday)", "الأحد (Sunday)", "الإثنين (Monday)"].map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            updateField("weekStartDay", day);
                            setWeekStartDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-right hover:bg-[#f1f5eb] transition-colors"
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Base calendar */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  التقويم الأساسي لحساب ليالي الإقامة والربط
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setBaseCalendarDropdownOpen(!baseCalendarDropdownOpen)}
                    className="w-full bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between font-cairo text-[#181d17] text-[14px] cursor-pointer"
                  >
                    <ChevronDown className="size-4 text-[#75786f]" />
                    <div className="flex items-center gap-2">
                      <span>{config.baseCalendar}</span>
                      <Calendar className="size-4 text-[#34422a]" />
                    </div>
                  </button>

                  {baseCalendarDropdownOpen && (
                    <div className="absolute top-full start-0 end-0 mt-1 bg-white border border-[#e5eae0] rounded-[12px] shadow-lg py-1 z-30 font-cairo text-[13px] text-right">
                      {["التقويم الميلادي ", "التقويم الهجري (أم القرى)"].map((cal) => (
                        <button
                          key={cal}
                          type="button"
                          onClick={() => {
                            updateField("baseCalendar", cal);
                            setBaseCalendarDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-right hover:bg-[#f1f5eb] transition-colors"
                        >
                          {cal}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hijri Dual Display Option */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
              data-node-id="1:35924"
            >
              <button
                type="button"
                onClick={() => updateField("showDualHijriDate", !config.showDualHijriDate)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                  config.showDualHijriDate ? "bg-[#34422a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.showDualHijriDate ? "-translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex items-start gap-3 flex-1 justify-end text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    عرض التاريخ الهجري المزدوج
                  </span>
                  <p className="font-cairo text-[#54624c] text-[13px] leading-[20px] mt-0.5">
                    إظهار التاريخ الهجري الرسمي بجانب الميلادي في عقود الإيجار، تقارير منصة إيجار، والفواتير الضريبية (مثال: 24 ربيع الأول 1448 هـ)
                  </p>
                </div>
                <div className="bg-[#ebefe6] size-9 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5">
                  <Moon className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN / PREVIEW & SYSTEM GOVERNANCE (4 Cols on desktop, on left in RTL) */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          {/* Live Localization Preview Widget */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-4 text-right"
            data-node-id="1:35939"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-[#e5eae0] border-b pb-3">
              <span className="bg-[#d8e8cb] text-[#5a6952] font-cairo font-semibold text-[14px] px-2.5 py-0.5 rounded-full">
                مطابقة حية
              </span>
              <div className="flex items-center gap-1.5">
                <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                  المعاينة اللحظية
                </h3>
                <Eye className="size-4 text-[#34422a]" />
              </div>
            </div>

            <p className="font-cairo text-[#54624c] text-[13px] leading-[20px]">
              هكذا تظهر المعطيات الزمنية والمالية لمشرفي العقارات والنزلاء بناءً على الخيارات الحالية:
            </p>

            {/* Preview Specimen Card */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col gap-3 font-cairo text-right"
              data-node-id="1:35950"
            >
              <div className="flex items-center justify-between pb-1 border-b border-[#e5eae0]/60">
                <span className="font-bold text-[#181d17] text-[14px]">
                  الإثنين، 5 أكتوبر 2026
                </span>
                <span className="text-[#54624c] text-[13px]">التاريخ الميلادي المعتمد:</span>
              </div>

              {config.showDualHijriDate && (
                <div className="flex items-center justify-between pb-1 border-b border-[#e5eae0]/60">
                  <span className="font-semibold text-[#34422a] text-[12px]">
                    24 ربيع الأول 1448 هـ
                  </span>
                  <span className="text-[#54624c] text-[13px]">المقابل الهجري :</span>
                </div>
              )}

              <div className="flex items-center justify-between pb-1 border-b border-[#e5eae0]/60">
                <span className="font-bold text-[#181d17] text-[14px]">
                  02:45:18 م (توقيت الرياض)
                </span>
                <span className="text-[#54624c] text-[13px]">توقيت المنصة الحالي:</span>
              </div>

              <div className="flex items-center justify-between pb-1 border-b border-[#e5eae0]/60">
                <span className="font-bold text-[#181d17] text-[14px]">
                  {config.currencyPosition === "after"
                    ? `750${config.showDecimals ? ".00" : ""} ر.س / ليلة`
                    : `ر.س 750${config.showDecimals ? ".00" : ""} / ليلة`}
                </span>
                <span className="text-[#54624c] text-[13px]">تسعير وحدة نموذجية:</span>
              </div>

              <div className="flex items-center justify-between pb-1 border-b border-[#e5eae0]/60">
                <span className="font-semibold text-[#181d17] text-[12px]">
                  السبت ← الجمعة
                </span>
                <span className="text-[#54624c] text-[13px]">أسبوع العمل الفندقي:</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-[#54624c] text-[12px] font-sans" dir="ltr">
                  ar-SA • Asia/Riyadh
                </span>
                <span className="text-[#54624c] text-[13px]">الرمز الإقليمي:</span>
              </div>
            </div>
          </div>

          {/* Regulatory & Government Compliance */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-4 text-right"
            data-node-id="1:35981"
          >
            <div className="flex items-center justify-end gap-2 border-[#e5eae0] border-b pb-3">
              <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                الامتثال والأنظمة الوطنية
              </h3>
              <ShieldCheck className="size-4 text-[#34422a]" />
            </div>

            <div className="flex flex-col gap-3">
              {/* Item 1 */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[13px]">
                    هيئة الزكاة والضريبة والجمارك (ZATCA)
                  </span>
                  <p className="font-cairo text-[#54624c] text-[13px] leading-[20px]">
                    مطابقة المرحلة الثانية للفاتورة الإلكترونية عبر ترميز العملة SAR وعلامة التوقيت الدقيقة.
                  </p>
                </div>
                <CheckCircle2 className="size-4 text-[#34422a] mt-1 shrink-0" />
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[13px]">
                    تقويم أم القرى الرسمي
                  </span>
                  <p className="font-cairo text-[#54624c] text-[13px] leading-[20px]">
                    تحديث جداول الإجازات الرسمية ومواسم الحج والعمرة طبقاً للمراصد الفلكية المعتمدة.
                  </p>
                </div>
                <CheckCircle2 className="size-4 text-[#34422a] mt-1 shrink-0" />
              </div>
            </div>
          </div>

          {/* Impact & Audit Warning */}
          <div
            className="bg-[#f1f5eb] rounded-[16px] p-4 flex items-start gap-3 text-right"
            data-node-id="1:36002"
          >
            <div className="flex flex-col items-end flex-1">
              <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                أثر تطبيق التعديلات
              </span>
              <p className="font-cairo text-[#54624c] text-[13px] leading-[20px] mt-1">
                التعديلات على العملة والمنطقة الزمنية تطبق فورياً على الحجوزات المستقبلية والواجهات التشغيلية. الفواتير الصادرة مسبقاً ستحتفظ ببياناتها التاريخية لضمان سلامة الإقرارات المحاسبية.
              </p>
            </div>
            <AlertCircle className="size-4 text-[#34422a] mt-1 shrink-0" />
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
            data-node-id="1:35692"
          >
            <span>حفظ التغييرات</span>
            <Save className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-[#ebefe6] hover:bg-[#e0e5db] text-[#181d17] px-6 py-2.5 rounded-[12px] font-cairo font-normal text-[14px] transition-colors drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] cursor-pointer flex-1 sm:flex-none"
            data-node-id="1:35697"
          >
            الغاء
          </button>
        </div>

        {/* Security Notice on Right in RTL */}
        <div className="flex items-center gap-2.5 order-1 sm:order-2 text-right">
          <p className="font-cairo text-[#454840] text-[12px] leading-[18px]">
            <span>تسري هذه الضوابط التلقائية على كافة الحسابات المنشأة حديثاً عبر لوحة الإدارة أو الدعوات </span>
            <span className="font-semibold">البريدية.</span>
          </p>
          <div className="bg-[#f1f5eb] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
            <ShieldCheck className="size-4" />
          </div>
        </div>
      </DockingBottomBar>
    </div>
  );
}
