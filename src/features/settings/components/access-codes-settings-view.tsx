"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  KeyRound,
  Cloud,
  RefreshCw,
  Cpu,
  Clock,
  ShieldCheck,
  Zap,
  Save,
  CheckCircle2,
  Key,
  DoorClosed,
  Lock,
  EyeOff,
  ClipboardList,
  Router,
  ChevronDown,
  Award,
  LogIn,
  LogOut,
  Hash,
} from "lucide-react";
import { useAccessCodesSettings } from "../controllers/use-access-codes-settings";
import { ChangeAccessCodeMethodModal } from "./modals/change-access-code-method-modal";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function AccessCodesSettingsView() {
  const {
    config,
    updateField,
    sampleDigits,
    isChangeMethodModalOpen,
    setIsChangeMethodModalOpen,
    handleSelectCodeType,
    confirmMethodChange,
    handleCodeLengthChange,
    handleSave,
    handleReset,
  } = useAccessCodesSettings();

  const [isCheckinDropdownOpen, setIsCheckinDropdownOpen] = useState(false);
  const [isCheckoutDropdownOpen, setIsCheckoutDropdownOpen] = useState(false);

  const validityTimeOptions = [
    { value: 15, label: "15 دقيقة" },
    { value: 30, label: "30 دقيقة" },
    { value: 45, label: "45 دقيقة" },
    { value: 60, label: "60 دقيقة (ساعة واحدة)" },
  ];

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:31456"
      data-name="إعدادات اكواد الدخول"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:31458"
        data-name="Section - TOP HERO GREETING BAR"
      >
        <div className="flex flex-col items-start gap-1">
          <h1
            className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]"
            data-node-id="1:31466"
          >
            إعدادات اكواد الدخول
          </h1>
          <p
            className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]"
            data-node-id="1:31462"
          >
            تهيئة المعايير الموحدة لتوليد وتشفير وصلاحيات أكواد الأقفال الذكية عبر كافة عقارات ووحدات المنصة.
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0 cursor-pointer"
          data-node-id="1:31467"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Main 2-Column Responsive Layout (8 cols primary, 4 cols sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* PRIMARY CONFIGURATION COLUMN (8 Cols in RTL - Right Side on Desktop) */}
        <div
          className="lg:col-span-8 flex flex-col gap-6 w-full"
          data-node-id="1:31473"
          data-name="Primary Configuration Column (8 cols)"
        >
          {/* CARD A: Code Type (نوع الكود الافتراضي) */}
          <div
            className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] overflow-hidden flex flex-col"
            data-node-id="1:31474"
            data-name="Card A: Code Type"
          >
            {/* Overlay Header */}
            <div
              className="bg-[rgba(241,245,235,0.4)] px-6 py-4 flex items-center justify-between border-b border-[#e5eae0]"
              data-node-id="1:31475"
            >
              <div className="flex items-center gap-2.5">
                <div className="text-[#181d17]">
                  <KeyRound className="size-5" />
                </div>
                <h2
                  className="font-cairo font-semibold text-[#181d17] text-[20px] leading-[30px]"
                  data-node-id="1:31480"
                >
                  نوع الكود الافتراضي
                </h2>
              </div>
              <span
                className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]"
                data-node-id="1:31477"
              >
                الخيار الحاكم لعملية التوليد
              </span>
            </div>

            {/* Body */}
            <div
              className="p-6 flex flex-col sm:flex-row gap-4 items-stretch justify-center"
              data-node-id="1:31483"
            >
              {/* Option 1: كود لكل حجز (Per Booking - Selected by default) */}
              <div
                onClick={() => handleSelectCodeType("per_booking")}
                className={`flex-1 rounded-[12px] p-4 flex flex-col justify-between gap-3 text-right cursor-pointer transition-all ${
                  config.defaultCodeType === "per_booking"
                    ? "bg-[rgba(216,232,203,0.25)] border-2 border-[#34422a] shadow-sm"
                    : "bg-[#f1f5eb] border-2 border-transparent hover:border-[#c5c8bd]"
                }`}
                data-node-id="1:31502"
                data-name="Label - Option 1: Per Booking (Selected)"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-5 rounded-full flex items-center justify-center transition-colors ${
                        config.defaultCodeType === "per_booking"
                          ? "bg-[#34422a]"
                          : "bg-[#c5c8bd]"
                      }`}
                    >
                      {config.defaultCodeType === "per_booking" && (
                        <div className="size-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                      كود لكل حجز
                    </span>
                  </div>

                  <span className="bg-[#d8e8cb] text-[#3d4b36] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-full">
                    موصى به للأمان
                  </span>
                </div>

                <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[21.13px]">
                  يتم إنشاء كود دخول فريد ومؤقت مخصص لكل حجز جديد تلقائياً، وتنتهي صلاحيته تلقائياً بانتهاء الحجز لضمان عزل النزلاء.
                </p>

                <div className="flex items-center gap-1.5 pt-2 border-t border-[#e5eae0]/50 text-[#34422a]">
                  <Cloud className="size-3.5" />
                  <span className="font-cairo font-medium text-[11px]">
                    تحديث هوائي فوري OTA
                  </span>
                </div>
              </div>

              {/* Option 2: كود ثابت للوحدة (Static Code) */}
              <div
                onClick={() => handleSelectCodeType("static_unit")}
                className={`flex-1 rounded-[12px] p-4 flex flex-col justify-between gap-3 text-right cursor-pointer transition-all ${
                  config.defaultCodeType === "static_unit"
                    ? "bg-[rgba(216,232,203,0.25)] border-2 border-[#34422a] shadow-sm"
                    : "bg-[#f1f5eb] border-2 border-transparent hover:border-[#c5c8bd]"
                }`}
                data-node-id="1:31484"
                data-name="Label - Option 2: Static"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-5 rounded-full flex items-center justify-center transition-colors ${
                        config.defaultCodeType === "static_unit"
                          ? "bg-[#34422a]"
                          : "bg-[#c5c8bd]"
                      }`}
                    >
                      {config.defaultCodeType === "static_unit" && (
                        <div className="size-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                      كود ثابت للوحدة
                    </span>
                  </div>

                  <span className="bg-[#dfe4db] text-[#454840] font-cairo font-medium text-[11px] px-2 py-0.5 rounded-full">
                    عقود طويلة الأمد
                  </span>
                </div>

                <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[21.13px]">
                  كود رئيسي ثابت للوحدة يُستخدم في حالات التأجير السنوي أو الصيانة والتشغيل المستمر مع إمكانية التدوير اليدوي المجدول.
                </p>

                <div className="flex items-center gap-1.5 pt-2 border-t border-[#e5eae0]/50 text-[#75786f]">
                  <RefreshCw className="size-3.5" />
                  <span className="font-cairo font-medium text-[11px]">
                    يتطلب تدوير ربع سنوي
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD B: Code Generation Rules (قواعد إنشاء وتوليد الكود) */}
          <div
            className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] overflow-hidden flex flex-col"
            data-node-id="1:31520"
            data-name="Card B: Code Generation Rules"
          >
            {/* Overlay Header */}
            <div
              className="bg-[rgba(241,245,235,0.4)] px-6 py-4 flex items-center justify-between border-b border-[#e5eae0]"
              data-node-id="1:31521"
            >
              <div className="flex items-center gap-2.5">
                <div className="text-[#181d17]">
                  <Cpu className="size-5" />
                </div>
                <h2
                  className="font-cairo font-semibold text-[#181d17] text-[20px] leading-[30px]"
                  data-node-id="1:31526"
                >
                  قواعد إنشاء وتوليد الكود
                </h2>
              </div>
              <span
                className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]"
                data-node-id="1:31523"
              >
                الخوارزمية الرقمية
              </span>
            </div>

            {/* Rules Content */}
            <div
              className="p-6 flex flex-col gap-4"
              data-node-id="1:31529"
            >
              {/* Toggle 1: Auto-generate on booking confirmation */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:31530"
              >
                <div className="flex flex-col text-right">
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]">
                    إنشاء كود الدخول تلقائيًا عند تأكيد الحجز
                  </span>
                  <span className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px]">
                    توليد كود دخول فوري ومشفّر لحظة تأكيد الحجز وإرساله مباشرة إلى القفل الذكي للوحدة.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => updateField("autoGenerateOnConfirm", !config.autoGenerateOnConfirm)}
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    config.autoGenerateOnConfirm ? "bg-[#34422a] justify-start" : "bg-[#dfe4db] justify-end"
                  }`}
                  data-node-id="1:31531"
                  aria-label="إنشاء كود الدخول تلقائيًا عند تأكيد الحجز"
                >
                  <div
                    className={`size-5 rounded-full shadow-sm transition-transform ${
                      config.autoGenerateOnConfirm ? "bg-white" : "bg-[#75786f]"
                    }`}
                  />
                </button>
              </div>

              {/* Code Length Selector */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col gap-3"
                data-node-id="1:31538"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col text-right">
                    <span className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]">
                      طول كود الدخول (Code Length)
                    </span>
                    <span className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px]">
                      تحديد عدد الخانات المكونة لكود الأقفال الذكية
                    </span>
                  </div>
                  <span className="font-cairo font-medium text-[#34422a] text-[11px] leading-[16px]">
                    الافتراضي: 6 خانات
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {/* Option 1: 6 Digits (Selected by default) */}
                  <div
                    onClick={() => handleCodeLengthChange(6)}
                    className={`p-3 rounded-[12px] flex items-center justify-between cursor-pointer transition-all ${
                      config.codeLength === 6
                        ? "bg-[#34422a] text-white shadow-sm drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                        : "bg-white text-[#181d17] border border-transparent hover:border-[#c5c8bd]"
                    }`}
                    data-node-id="1:31549"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-4 rounded-full flex items-center justify-center shrink-0 ${
                          config.codeLength === 6 ? "bg-white" : "bg-[#c5c8bd]"
                        }`}
                      >
                        {config.codeLength === 6 && (
                          <div className="size-1.5 rounded-full bg-[#34422a]" />
                        )}
                      </div>
                      <div className="flex flex-col text-right">
                        <span
                          className={`font-cairo font-semibold text-[12px] leading-[18px] ${
                            config.codeLength === 6 ? "text-white" : "text-[#181d17]"
                          }`}
                        >
                          6 أرقام (6 Digits)
                        </span>
                        <span
                          className={`font-cairo font-medium text-[11px] leading-[16px] ${
                            config.codeLength === 6 ? "text-[#bcccac]" : "text-[#75786f]"
                          }`}
                        >
                          المعيار المعتمد للمنصة • أعلى حماية
                        </span>
                      </div>
                    </div>
                    {config.codeLength === 6 && (
                      <ShieldCheck className="size-4 text-[#bcccac]" />
                    )}
                  </div>

                  {/* Option 2: 4 Digits */}
                  <div
                    onClick={() => handleCodeLengthChange(4)}
                    className={`p-3 rounded-[12px] flex items-center justify-between cursor-pointer transition-all ${
                      config.codeLength === 4
                        ? "bg-[#34422a] text-white shadow-sm drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                        : "bg-white text-[#181d17] border border-transparent hover:border-[#c5c8bd]"
                    }`}
                    data-node-id="1:31560"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-4 rounded-full flex items-center justify-center shrink-0 ${
                          config.codeLength === 4 ? "bg-white" : "bg-[#c5c8bd]"
                        }`}
                      >
                        {config.codeLength === 4 && (
                          <div className="size-1.5 rounded-full bg-[#34422a]" />
                        )}
                      </div>
                      <div className="flex flex-col text-right">
                        <span
                          className={`font-cairo font-semibold text-[12px] leading-[18px] ${
                            config.codeLength === 4 ? "text-white" : "text-[#181d17]"
                          }`}
                        >
                          4 أرقام (4 Digits)
                        </span>
                        <span
                          className={`font-cairo font-medium text-[11px] leading-[16px] ${
                            config.codeLength === 4 ? "text-[#bcccac]" : "text-[#454840]"
                          }`}
                        >
                          سريع للأقفال الكلاسيكية
                        </span>
                      </div>
                    </div>
                    {config.codeLength === 4 && (
                      <Hash className="size-4 text-[#bcccac]" />
                    )}
                  </div>
                </div>
              </div>

              {/* Toggle 2: Repeated digits permission */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:31568"
              >
                <div className="flex flex-col text-right">
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]">
                    السماح بتكرار الأرقام أو المتتاليات البسيطة
                  </span>
                  <span className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px]">
                    تعطيل هذا الخيار يحظر الأكواد مثل (111111 أو 123456) ويلزم الخوارزمية بالتوليد العشوائي الصارم.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateField("allowRepeatedOrSequentialDigits", !config.allowRepeatedOrSequentialDigits)
                  }
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    config.allowRepeatedOrSequentialDigits ? "bg-[#34422a] justify-start" : "bg-[#dfe4db] justify-end"
                  }`}
                  data-node-id="1:31569"
                  aria-label="السماح بتكرار الأرقام أو المتتاليات البسيطة"
                >
                  <div
                    className={`size-5 rounded-full shadow-sm transition-transform ${
                      config.allowRepeatedOrSequentialDigits ? "bg-white" : "bg-[#75786f]"
                    }`}
                  />
                </button>
              </div>

              {/* Live Preview Card */}
              <div
                className="bg-[#ebefe6] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                data-node-id="1:31576"
              >
                <div className="flex flex-col text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[12px] leading-[18px]">
                    نموذج حي لكود مولد تلقائياً:
                  </span>
                  <span className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px]">
                    محاكاة فورية لتطبيق خوارزمية AES-256 العشوائية
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Generated code live box */}
                  <div
                    className="bg-white rounded-[12px] px-4 py-2 flex items-center gap-2 shadow-sm border border-[#e5eae0]"
                    data-node-id="1:31582"
                  >
                    {sampleDigits.map((digit, idx) => (
                      <React.Fragment key={idx}>
                        <span className="font-cairo font-bold text-[#34422a] text-[18px] tracking-[1.8px] leading-[28px]">
                          {digit}
                        </span>
                        {idx < sampleDigits.length - 1 && (
                          <span className="font-cairo font-bold text-[#c5c8bd] text-[18px]">
                            •
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Complexity Badge */}
                  <div
                    className="bg-[#d8e8cb] px-2.5 py-1.5 rounded-[8px] flex items-center gap-1.5 shrink-0"
                    data-node-id="1:31578"
                  >
                    <ShieldCheck className="size-3.5 text-[#3d4b36]" />
                    <span className="font-cairo font-semibold text-[#3d4b36] text-[11px] leading-[16px]">
                      تعقيد فائق
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD C: Code Validity Window (صلاحية وتوقيت الكود) */}
          <div
            className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] overflow-hidden flex flex-col"
            data-node-id="1:31610"
            data-name="Card C: Code Validity Window"
          >
            {/* Overlay Header */}
            <div
              className="bg-[rgba(241,245,235,0.4)] px-6 py-4 flex items-center justify-between border-b border-[#e5eae0]"
              data-node-id="1:31611"
            >
              <div className="flex items-center gap-2.5">
                <div className="text-[#181d17]">
                  <Clock className="size-5" />
                </div>
                <h2
                  className="font-cairo font-semibold text-[#181d17] text-[20px] leading-[30px]"
                  data-node-id="1:31616"
                >
                  صلاحية وتوقيت الكود
                </h2>
              </div>
              <span
                className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]"
                data-node-id="1:31613"
              >
                الجدولة التلقائية للحجوزات
              </span>
            </div>

            {/* Description & Selectors */}
            <div className="p-6 flex flex-col gap-4">
              <p
                className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px] text-right"
                data-node-id="1:31620"
              >
                تحديد نافذة التفعيل الإضافية قبل وبعد تواريخ الإقامة لضمان سلاسة وصول النزيل ومنع حالات التكدس أو التعدي على أوقات التنظيف.
              </p>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start"
                data-node-id="1:31621"
              >
                {/* 1. Start Window (بدء الصلاحية قبل موعد الدخول) */}
                <div
                  className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col gap-2.5 text-right relative"
                  data-node-id="1:31640"
                >
                  <div className="flex items-center gap-2">
                    <LogIn className="size-4 text-[#181d17]" />
                    <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                      بدء الصلاحية قبل موعد الدخول
                    </span>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCheckinDropdownOpen((prev) => !prev);
                        setIsCheckoutDropdownOpen(false);
                      }}
                      className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] px-4 py-2.5 flex items-center justify-between text-[#181d17] font-cairo text-[14px] border border-transparent hover:border-[#c5c8bd] transition-colors cursor-pointer"
                      data-node-id="1:31648"
                    >
                      <ChevronDown className="size-4 text-[#75786f]" />
                      <span>
                        {config.validityStartMinutesBeforeCheckin} دقيقة قبل موعد تسجيل الدخول
                      </span>
                    </button>

                    {isCheckinDropdownOpen && (
                      <div className="absolute top-full right-0 left-0 mt-1.5 bg-white rounded-[12px] shadow-lg border border-[#e5eae0] py-1 z-20">
                        {validityTimeOptions.map((opt) => (
                          <div
                            key={opt.value}
                            onClick={() => {
                              updateField("validityStartMinutesBeforeCheckin", opt.value);
                              setIsCheckinDropdownOpen(false);
                            }}
                            className={`px-4 py-2 text-[13px] font-cairo cursor-pointer hover:bg-[#f1f5eb] transition-colors text-right ${
                              config.validityStartMinutesBeforeCheckin === opt.value
                                ? "text-[#34422a] font-bold bg-[#f1f5eb]/60"
                                : "text-[#181d17]"
                            }`}
                          >
                            {opt.label} قبل موعد تسجيل الدخول
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className="bg-[#ebefe6] rounded-[8px] px-3 py-2 flex items-center gap-2 text-[#454840] font-cairo text-[11px] leading-[16px]"
                    data-node-id="1:31653"
                  >
                    <Clock className="size-3.5 text-[#34422a] shrink-0" />
                    <span>
                      يبدأ تفعيل الكود في القفل الذكي في تمام الساعة 02:30 م.
                    </span>
                  </div>
                </div>

                {/* 2. End Window (انتهاء الصلاحية بعد موعد المغادرة) */}
                <div
                  className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col gap-2.5 text-right relative"
                  data-node-id="1:31622"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="size-4 text-[#181d17]" />
                    <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                      انتهاء الصلاحية بعد موعد المغادرة
                    </span>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCheckoutDropdownOpen((prev) => !prev);
                        setIsCheckinDropdownOpen(false);
                      }}
                      className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] px-4 py-2.5 flex items-center justify-between text-[#181d17] font-cairo text-[14px] border border-transparent hover:border-[#c5c8bd] transition-colors cursor-pointer"
                      data-node-id="1:31630"
                    >
                      <ChevronDown className="size-4 text-[#75786f]" />
                      <span>
                        {config.validityEndMinutesAfterCheckout} دقيقة بعد موعد المغادرة
                      </span>
                    </button>

                    {isCheckoutDropdownOpen && (
                      <div className="absolute top-full right-0 left-0 mt-1.5 bg-white rounded-[12px] shadow-lg border border-[#e5eae0] py-1 z-20">
                        {validityTimeOptions.map((opt) => (
                          <div
                            key={opt.value}
                            onClick={() => {
                              updateField("validityEndMinutesAfterCheckout", opt.value);
                              setIsCheckoutDropdownOpen(false);
                            }}
                            className={`px-4 py-2 text-[13px] font-cairo cursor-pointer hover:bg-[#f1f5eb] transition-colors text-right ${
                              config.validityEndMinutesAfterCheckout === opt.value
                                ? "text-[#34422a] font-bold bg-[#f1f5eb]/60"
                                : "text-[#181d17]"
                            }`}
                          >
                            {opt.label} بعد موعد المغادرة
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className="bg-[#ebefe6] rounded-[8px] px-3 py-2 flex items-center gap-2 text-[#454840] font-cairo text-[11px] leading-[16px]"
                    data-node-id="1:31635"
                  >
                    <Clock className="size-3.5 text-[#ba1a1a] shrink-0" />
                    <span>
                      يتعطل الكود نهائياً ويلغى من القفل في تمام الساعة 12:30 م لمنع إعادة الدخول.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD D: Security & Privacy Governance (الأمان وحماية الخصوصية) */}
          <div
            className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] overflow-hidden flex flex-col"
            data-node-id="1:31658"
            data-name="Card D: Security & Privacy Governance"
          >
            {/* Overlay Header */}
            <div
              className="bg-[rgba(241,245,235,0.4)] px-6 py-4 flex items-center justify-between border-b border-[#e5eae0]"
              data-node-id="1:31659"
            >
              <div className="flex items-center gap-2.5">
                <div className="text-[#181d17]">
                  <ShieldCheck className="size-5" />
                </div>
                <h2
                  className="font-cairo font-semibold text-[#181d17] text-[20px] leading-[30px]"
                  data-node-id="1:31664"
                >
                  الأمان وحماية الخصوصية
                </h2>
              </div>
              <span
                className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]"
                data-node-id="1:31661"
              >
                معايير حماية البيانات وسجلات التدقيق
              </span>
            </div>

            {/* Toggles */}
            <div
              className="p-6 flex flex-col gap-4"
              data-node-id="1:31667"
            >
              {/* Toggle 1: Mask Code */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:31668"
              >
                <div className="flex flex-col text-right">
                  <div className="flex items-center gap-2">
                    <span className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]">
                      إخفاء كود الدخول الكامل افتراضيًا
                    </span>
                    <span className="bg-[#dfe4db] text-[#181d17] font-cairo text-[11px] px-2 py-0.5 rounded-[4px]">
                      •••• 21
                    </span>
                  </div>
                  <span className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px]">
                    إظهار الكود مقنعاً بالرموز المشفرة في الجداول العامة لتفادي التلصص البصري من شاشات الموظفين.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => updateField("maskCodeByDefault", !config.maskCodeByDefault)}
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    config.maskCodeByDefault ? "bg-[#34422a] justify-start" : "bg-[#dfe4db] justify-end"
                  }`}
                  data-node-id="1:31669"
                  aria-label="إخفاء كود الدخول الكامل افتراضيًا"
                >
                  <div
                    className={`size-5 rounded-full shadow-sm transition-transform ${
                      config.maskCodeByDefault ? "bg-white" : "bg-[#75786f]"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2: Identity Verification before Reveal */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:31679"
              >
                <div className="flex flex-col text-right">
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]">
                    اشتراط التحقق وتوثيق الهوية قبل كشف الكود
                  </span>
                  <span className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px]">
                    إبراز نافذة تحقق أمني سريعة ومصادقة ثنائية عند طلب المشرف أو المالك استعراض الكود الصريح.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateField("requireVerificationBeforeReveal", !config.requireVerificationBeforeReveal)
                  }
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    config.requireVerificationBeforeReveal ? "bg-[#34422a] justify-start" : "bg-[#dfe4db] justify-end"
                  }`}
                  data-node-id="1:31680"
                  aria-label="اشتراط التحقق وتوثيق الهوية قبل كشف الكود"
                >
                  <div
                    className={`size-5 rounded-full shadow-sm transition-transform ${
                      config.requireVerificationBeforeReveal ? "bg-white" : "bg-[#75786f]"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3: Log all code views */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:31687"
              >
                <div className="flex flex-col text-right">
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]">
                    تسجيل كافة عمليات استعراض كود الدخول
                  </span>
                  <span className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px]">
                    تدوين هوية الموظف، عنوان IP، التوقيت، وسبب الكشف في سجل تدقيق العمليات المحصن ضد الحذف والتعديل.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => updateField("logAllCodeViews", !config.logAllCodeViews)}
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    config.logAllCodeViews ? "bg-[#34422a] justify-start" : "bg-[#dfe4db] justify-end"
                  }`}
                  data-node-id="1:31688"
                  aria-label="تسجيل كافة عمليات استعراض كود الدخول"
                >
                  <div
                    className={`size-5 rounded-full shadow-sm transition-transform ${
                      config.logAllCodeViews ? "bg-white" : "bg-[#75786f]"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* CARD E: OTA & Booking Sync (المزامنة والتحديث اللحظي) */}
          <div
            className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] overflow-hidden flex flex-col"
            data-node-id="1:31695"
            data-name="Card E: OTA & Booking Sync"
          >
            {/* Overlay Header */}
            <div
              className="bg-[rgba(241,245,235,0.4)] px-6 py-4 flex items-center justify-between border-b border-[#e5eae0]"
              data-node-id="1:31696"
            >
              <div className="flex items-center gap-2.5">
                <div className="text-[#181d17]">
                  <Zap className="size-5" />
                </div>
                <h2
                  className="font-cairo font-semibold text-[#181d17] text-[20px] leading-[30px]"
                  data-node-id="1:31701"
                >
                  المزامنة والتحديث اللحظي
                </h2>
              </div>
              <span
                className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]"
                data-node-id="1:31698"
              >
                تكامل البوابات السحابية
              </span>
            </div>

            {/* Sync Content */}
            <div
              className="p-6 flex flex-col gap-4"
              data-node-id="1:31704"
            >
              {/* Toggle: Auto-sync on modification */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:31705"
              >
                <div className="flex flex-col text-right">
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]">
                    تحديث صلاحية كود الدخول تلقائيًا عند تعديل الحجز
                  </span>
                  <span className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px]">
                    مزامنة سحابية لحظية لأوقات تفعيل وتعطيل الكود على القفل فور قيام النزيل بتمديد الإقامة أو تعديل الوصول.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateField("autoSyncOnBookingModification", !config.autoSyncOnBookingModification)
                  }
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    config.autoSyncOnBookingModification ? "bg-[#34422a] justify-start" : "bg-[#dfe4db] justify-end"
                  }`}
                  data-node-id="1:31706"
                  aria-label="تحديث صلاحية كود الدخول تلقائيًا عند تعديل الحجز"
                >
                  <div
                    className={`size-5 rounded-full shadow-sm transition-transform ${
                      config.autoSyncOnBookingModification ? "bg-white" : "bg-[#75786f]"
                    }`}
                  />
                </button>
              </div>

              {/* Lock Hub Latency Details */}
              <div
                className="bg-[#ebefe6] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                data-node-id="1:31713"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="bg-white rounded-[12px] size-10 flex items-center justify-center text-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shrink-0"
                    data-node-id="1:31726"
                  >
                    <Router className="size-5" />
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-cairo font-bold text-[#181d17] text-[12px] leading-[18px]">
                      معدل استجابة بوابات الأقفال (Lock Hub Latency)
                    </span>
                    <span className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]">
                      تكامل مباشر عبر بروتوكولات Zigbee / Tuya / TTLock / Yale
                    </span>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2"
                  data-node-id="1:31714"
                >
                  <span className="bg-[#d8e8cb] text-[#3d4b36] font-cairo font-medium text-[11px] px-2 py-1 rounded-[8px]">
                    اتصال مستقر
                  </span>
                  <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] px-2.5 py-1 rounded-[8px] flex items-center gap-1.5 text-[#34422a] font-cairo font-bold text-[12px]">
                    <span>1.8 ثانية</span>
                    <span className="size-2 rounded-full bg-[#54624c]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECONDARY TELEMETRY & COMPLIANCE SIDEBAR (4 Cols in RTL - Left Side on Desktop) */}
        <div
          className="lg:col-span-4 flex flex-col gap-6 w-full"
          data-node-id="1:31729"
          data-name="Secondary Telemetry & Compliance Sidebar (4 cols)"
        >
          {/* Side Card 1: Key Metrics (مؤشرات الأقفال النشطة) */}
          <div
            className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] p-6 flex flex-col gap-4"
            data-node-id="1:31730"
            data-name="Side Card 1: Key Metrics"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between pb-2 border-b border-[#e5eae0]"
              data-node-id="1:31731"
            >
              <div className="flex items-center gap-2">
                <DoorClosed className="size-4.5 text-[#181d17]" />
                <h3
                  className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]"
                  data-node-id="1:31734"
                >
                  مؤشرات الأقفال النشطة
                </h3>
              </div>
              <div className="size-2.5 rounded-full bg-[#54624c] animate-pulse" />
            </div>

            {/* 2x2 Metric Grid */}
            <div
              className="grid grid-cols-2 gap-2.5"
              data-node-id="1:31737"
            >
              {/* Metric 1: إجمالي الأقفال المتصلة */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex flex-col justify-between gap-1 text-right"
                data-node-id="1:31738"
              >
                <span className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]">
                  إجمالي الأقفال المتصلة
                </span>
                <span className="font-cairo font-bold text-[#181d17] text-[24px] tracking-[-0.6px] leading-[34px]">
                  11,290
                </span>
                <div className="flex items-center gap-1 text-[#34422a] pt-1">
                  <ShieldCheck className="size-3 text-[#34422a]" />
                  <span className="font-cairo font-medium text-[11px]">
                    تغطية 100%
                  </span>
                </div>
              </div>

              {/* Metric 2: أكواد مفعّلة حالياً */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex flex-col justify-between gap-1 text-right"
                data-node-id="1:31748"
              >
                <span className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]">
                  أكواد مفعّلة حالياً
                </span>
                <span className="font-cairo font-bold text-[#34422a] text-[24px] tracking-[-0.6px] leading-[34px]">
                  2,484
                </span>
                <div className="flex items-center gap-1 text-[#454840] pt-1">
                  <Key className="size-3 text-[#75786f]" />
                  <span className="font-cairo font-medium text-[11px]">
                    سارية الصلاحية
                  </span>
                </div>
              </div>

              {/* Metric 3: نجاح المزامنة اللحظية */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex flex-col justify-between gap-1 text-right"
                data-node-id="1:31758"
              >
                <span className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]">
                  نجاح المزامنة اللحظية
                </span>
                <span className="font-cairo font-bold text-[#181d17] text-[24px] tracking-[-0.6px] leading-[34px]">
                  99.94%
                </span>
                <div className="flex items-center gap-1 text-[#34422a] pt-1">
                  <CheckCircle2 className="size-3 text-[#34422a]" />
                  <span className="font-cairo font-medium text-[11px]">
                    أداء موثوق
                  </span>
                </div>
              </div>

              {/* Metric 4: أكواد تنتهي اليوم */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex flex-col justify-between gap-1 text-right"
                data-node-id="1:31768"
              >
                <span className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]">
                  أكواد تنتهي اليوم
                </span>
                <span className="font-cairo font-bold text-[#54624c] text-[24px] tracking-[-0.6px] leading-[34px]">
                  618
                </span>
                <div className="flex items-center gap-1 text-[#454840] pt-1">
                  <Clock className="size-3 text-[#75786f]" />
                  <span className="font-cairo font-medium text-[11px]">
                    حسب المغادرة
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Card 2: Compliance WORM & NCA (حوكمة السجلات والامتثال WORM) */}
          <div
            className="bg-[#34422a] rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-6 text-white flex flex-col justify-between gap-5 relative overflow-hidden"
            data-node-id="1:31778"
            data-name="Side Card 2: Compliance WORM & NCA"
          >
            {/* Header */}
            <div
              className="flex items-start justify-between"
              data-node-id="1:31779"
            >
              <div className="flex flex-col text-right">
                <h3
                  className="font-cairo font-bold text-[18px] leading-[26px] text-white"
                  data-node-id="1:31782"
                >
                  حوكمة السجلات والامتثال WORM
                </h3>
                <span
                  className="font-cairo font-medium text-[#bcccac] text-[11px] leading-[16px]"
                  data-node-id="1:31784"
                >
                  متوافق مع ضوابط الأمن السيبراني
                </span>
              </div>
              <div
                className="bg-white/10 rounded-[12px] size-10 flex items-center justify-center text-white shrink-0"
                data-node-id="1:31785"
              >
                <Lock className="size-5 text-white" />
              </div>
            </div>

            {/* Bullets */}
            <div
              className="flex flex-col gap-3 text-right"
              data-node-id="1:31788"
            >
              <div className="flex items-start gap-2.5">
                <Lock className="size-4 text-[#d8e8c7] shrink-0 mt-0.5" />
                <p className="font-cairo font-normal text-[#d8e8c7] text-[13px] leading-[20px]">
                  لا يتم تخزين الأكواد الصريحة نهائياً في قواعد البيانات، بل تحفظ بصيغ مشفرة خوارزمياً بمفاتيح غير مكررة.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="size-4 text-[#d8e8c7] shrink-0 mt-0.5" />
                <p className="font-cairo font-normal text-[#d8e8c7] text-[13px] leading-[20px]">
                  تشفير شامل End-to-End من خوادم السحاب حتى الشريحة المدمجة بالقفل الذكي مع سجل تدقيق غير قابل للتعديل.
                </p>
              </div>
            </div>

            {/* Certificate pill */}
            <div
              className="bg-white/10 rounded-[12px] px-3.5 py-2 flex items-center justify-center gap-2 text-white font-cairo font-medium text-[11px]"
              data-node-id="1:31800"
            >
              <Award className="size-3.5 text-[#d8e8c7]" />
              <span>شهادة اعتماد التشفير سارية المفعول</span>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Action Toolbar */}
      <DockingBottomBar>
        <div
          className="backdrop-blur-md bg-white/95 rounded-[16px] p-4 shadow-xl border border-[#e5eae0] flex flex-col sm:flex-row items-center justify-between gap-3 w-full"
          data-node-id="1:31804"
          data-name="Bottom Persistent Action Toolbar"
        >
          {/* Action Buttons */}
          <div
            className="flex items-center gap-2 w-full sm:w-auto justify-end order-1 sm:order-2"
            data-node-id="1:31806"
          >
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#34422a] text-white px-6 py-2.5 rounded-[12px] font-cairo font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#273220] transition-colors shadow-sm flex-1 sm:flex-none cursor-pointer"
              data-node-id="1:31807"
            >
              <span>حفظ التغييرات</span>
              <Save className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#ebefe6] text-[#181d17] px-4 py-2.5 rounded-[12px] font-cairo font-semibold text-[14px] hover:bg-[#dde4d7] transition-colors flex-1 sm:flex-none cursor-pointer"
              data-node-id="1:31813"
            >
              إلغاء التعديلات
            </button>
          </div>

          {/* Audit Telemetry */}
          <div
            className="flex items-center gap-2 text-[#75786f] text-[13px] font-cairo order-2 sm:order-1"
            data-node-id="1:31815"
          >
            <Clock className="size-3.5" />
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

      {/* Method Change Confirmation Modal (Node 1:31945) */}
      <ChangeAccessCodeMethodModal
        isOpen={isChangeMethodModalOpen}
        onClose={() => setIsChangeMethodModalOpen(false)}
        onConfirm={confirmMethodChange}
      />
    </div>
  );
}
