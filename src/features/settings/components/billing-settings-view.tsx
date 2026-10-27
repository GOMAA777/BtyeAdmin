"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  Building,
  CheckCircle2,
  Copy,
  QrCode,
  FileText,
  DollarSign,
  Calendar,
  Percent,
  Check,
  RefreshCw,
  Wifi,
  Trash2,
  BellRing,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { useCentralBillingSettings } from "../controllers/use-central-billing-settings";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function CentralBillingSettingsView() {
  const {
    state,
    updateField,
    copyToClipboard,
    handleTestConnection,
    handleDisconnectGateway,
    handleChangeGateway,
    handleSave,
    handleReset,
  } = useCentralBillingSettings();

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:34198"
      data-name="إعدادات الدفع والفوترة المركزية"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:34200"
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]">
            إعدادات الدفع والفوترة المركزية
          </h1>
          <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
            تهيئة بوابات التحصيل الإلكتروني، قواعد الفوترة الضريبية الافتراضية، وقنوات الدفع المعتمدة على مستوى منصة BYTE HOME لإدارة
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0"
          data-node-id="1:34209"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Main Modular Layout: Asymmetric 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start" data-node-id="1:34214">
        {/* RIGHT/MAIN COLUMN (8 cols): Primary Configurations */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full order-2 lg:order-1">
          {/* SECTION 1: Electronic Payment Gateway Engine */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-5"
            data-node-id="1:34216"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#f1f5eb] pb-4">
              <div className="bg-[#eaf1e8] flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-cairo font-semibold text-[#3e8a5a]">
                <span>متصل ومفعّل بنجاح</span>
                <span className="size-2 rounded-full bg-[#3e8a5a]" />
              </div>

              <div className="flex items-center gap-3 text-right">
                <div className="flex flex-col items-end">
                  <h2 className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    بوابة الدفع الإلكتروني المعتمدة
                  </h2>
                  <p className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]">
                    محرك معالجة العمليات المالية لحسابات الملاك والمستأجرين
                  </p>
                </div>
                <div className="bg-[#ebefe6] size-11 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0">
                  <CreditCard className="size-5" />
                </div>
              </div>
            </div>

            {/* Gateway Provider & Environment Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 space-y-1.5 text-right">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  البوابة النشطة حالياً
                </label>
                <div className="bg-[#f1f5eb] rounded-[12px] h-11 px-4 flex items-center justify-between">
                  <ChevronDown className="size-4 text-[#75786f]" />
                  <span className="font-cairo font-normal text-[#181d17] text-[14px]">
                    {state.activeGateway}
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 space-y-1.5 text-right">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  بيئة التشغيل
                </label>
                <div className="bg-[#f1f5eb] rounded-[12px] h-11 px-4 flex items-center justify-between">
                  <span className="size-2 rounded-full bg-[#3e8a5a] animate-pulse" />
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    الإنتاج الحي (Live Production)
                  </span>
                </div>
              </div>
            </div>

            {/* Merchant Credentials Banner */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              data-node-id="1:34249"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-cairo font-medium text-[#454840] text-[11px]">
                  معايير الأمان المصرفي
                </span>
                <div className="flex items-center gap-1.5 text-[#34422a] font-cairo font-semibold text-[12px]">
                  <ShieldCheck className="size-4 text-[#34422a]" />
                  <span>PCI-DSS Level 1 • تشفير TLS 1.3 معتمد</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span className="bg-[#dfe4db] px-2 py-0.5 rounded-[4px] font-cairo font-medium text-[#454840] text-[11px]">
                    سري ومشفر
                  </span>
                  <span className="font-cairo font-medium text-[#454840] text-[11px]">
                    معرّف التاجر المعتمد (Merchant ID):
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(state.merchantId, "Merchant ID")}
                    className="p-1 text-[#454840] hover:text-[#181d17] transition-colors"
                    title="نسخ المعرف"
                  >
                    <Copy className="size-3.5" />
                  </button>
                  <span className="font-cairo font-bold text-[#181d17] text-[18px] tracking-[0.9px]">
                    {state.merchantId}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Bar for Gateway */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f1f5eb]">
              <button
                type="button"
                onClick={handleDisconnectGateway}
                className="font-cairo font-semibold text-[#d85c5c] text-[12px] px-3 py-2 hover:underline flex items-center gap-1.5"
              >
                <span>فصل الاتصال</span>
                <Trash2 className="size-3.5" />
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleChangeGateway}
                  className="bg-[#f1f5eb] hover:bg-[#e4ebdc] transition-colors font-cairo font-semibold text-[#181d17] text-[14px] px-4 py-2 rounded-[12px] flex items-center gap-2"
                >
                  <span>تغيير البوابة</span>
                  <RefreshCw className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleTestConnection}
                  className="bg-[#34422a] hover:bg-[#283320] transition-colors font-cairo font-semibold text-white text-[14px] px-4 py-2 rounded-[12px] flex items-center gap-2"
                >
                  <span>اختبار الاتصال</span>
                  <Wifi className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 2: ZATCA Invoicing & Tax Rules */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-5"
            data-node-id="1:34285"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#f1f5eb] pb-3">
              <div className="bg-[#f1f5eb] flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] font-cairo font-semibold text-[#181d17] text-[11px]">
                <QrCode className="size-3.5" />
                <span>تشفير QR التلقائي مفعل</span>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div className="flex flex-col items-end">
                  <h2 className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                    قواعد الفواتير والامتثال الضريبي
                  </h2>
                  <p className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]">
                    الترميز المحاسبي والمعايير المتوافقة مع هيئة الزكاة والضريبة والجمارك
                  </p>
                </div>
                <div className="bg-[#ebefe6] size-11 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0">
                  <FileText className="size-5" />
                </div>
              </div>
            </div>

            {/* 2x2 Field Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Tax Number */}
              <div className="space-y-1.5 text-right">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  الرقم الضريبي للمنشأة المشغلة
                </label>
                <div className="bg-[#f1f5eb] rounded-[12px] h-11 px-3 flex items-center justify-between">
                  <span className="bg-[#eaf1e8] text-[#3e8a5a] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-full">
                    موثق
                  </span>
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    {state.taxNumber}
                  </span>
                </div>
                <p className="font-cairo font-medium text-[#454840] text-[11px]">
                  مربوط مباشرة مع بوابة مطابقة وتأكيد الأهلية الضريبية
                </p>
              </div>

              {/* Invoice Prefix */}
              <div className="space-y-1.5 text-right">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  بادئة ترقيم الفواتير الافتراضية
                </label>
                <input
                  type="text"
                  value={state.invoicePrefix}
                  onChange={(e) => updateField("invoicePrefix", e.target.value)}
                  className="w-full bg-white border border-[#EBEBEB] shadow-sm rounded-[12px] h-11 px-4 text-right font-cairo font-regular text-[#181d17] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#34422a]"
                />
                <p className="font-cairo text-[11px]">
                  <span className="text-[#454840] font-medium">صيغة المعاينة: </span>
                  <span className="font-cairo font-bold text-[#34422a]">
                    {state.invoicePrefix}-2026-000492
                  </span>
                </p>
              </div>

              {/* Base Currency */}
              <div className="space-y-1.5 text-right">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  العملة الافتراضية للعمليات
                </label>
                <div className="bg-white border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] h-11 px-4 flex items-center justify-between">
                  <ChevronDown className="size-4 text-[#75786f]" />
                  <span className="font-cairo font-normal text-[#181d17] text-[14px]">
                    {state.currency}
                  </span>
                </div>
                <p className="font-cairo font-medium text-[#454840] text-[11px]">
                  يتم قيد الفواتير والتقارير المالية الأساسية بهذه العملة
                </p>
              </div>

              {/* Invoice Due Period */}
              <div className="space-y-1.5 text-right">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  مهلة استحقاق الفاتورة
                </label>
                <div className="bg-white border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] h-11 px-4 flex items-center justify-between">
                  <ChevronDown className="size-4 text-[#75786f]" />
                  <span className="font-cairo font-normal text-[#181d17] text-[14px]">
                    {state.invoiceDueDays} أيام (الافتراضي الموصى به)
                  </span>
                </div>
                <p className="font-cairo font-medium text-[#454840] text-[11px]">
                  المهلة الممنوحة لسداد فواتير الإيجارات والرسوم الإدارية
                </p>
              </div>
            </div>

            {/* VAT Feature Toggle Panel */}
            <div
              className="bg-[#f1f5eb] rounded-[16px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              data-node-id="1:34351"
            >
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => updateField("vatEnabled", !state.vatEnabled)}
                  className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${
                    state.vatEnabled ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`size-6 rounded-full bg-white shadow-sm transition-transform ${
                      state.vatEnabled ? "-translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
                <div className="flex flex-col items-start text-right">
                  <span className="font-cairo font-medium text-[#454840] text-[11px]">
                    النسبة المعتمدة
                  </span>
                  <span className="font-cairo font-bold text-[#34422a] text-[18px] leading-[28px]">
                    {state.vatRate}%
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-right">
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#eaf1e8] text-[#3e8a5a] font-cairo font-bold text-[11px] px-2 py-0.5 rounded-full">
                      {state.vatRate}% نشطة
                    </span>
                    <h3 className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                      تطبيق ضريبة القيمة المضافة
                    </h3>
                  </div>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] max-w-xl">
                    إدراج الضريبة آلياً في فواتير الرسوم الإدارية، تأجير الوحدات، وفواتير الوساطة مع إرفاق الختم المشفر لمتطلبات المرحلة الثانية لمنظومة (فاتورة).
                  </p>
                </div>
                <div className="bg-[#d8e8cb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5">
                  <Percent className="size-4" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Accepted Payment Channels Matrix */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-5"
            data-node-id="1:34372"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#f1f5eb] pb-3">
              <span className="font-cairo font-medium text-[#454840] text-[11px]">
                4 قنوات مفعّلة
              </span>

              <div className="flex items-center gap-2">
                <h2 className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[28px]">
                  قنوات وطرق الدفع المقبولة
                </h2>
                <CreditCard className="size-5 text-[#34422a]" />
              </div>
            </div>

            <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] text-right">
              تتيح هذه القنوات للملاك والنزلاء سداد الاشتراكات ومستحقات الحجوزات بسلاسة وأمان تام وفق الضوابط المركزية.
            </p>

            {/* 2x2 Grid of Channels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option 1: Mada & Credit Cards */}
              <div
                onClick={() =>
                  updateField("enableMadaAndCreditCards", !state.enableMadaAndCreditCards)
                }
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-start justify-between cursor-pointer border border-transparent hover:border-[#dfe4db] transition-colors"
                data-node-id="1:34385"
              >
                <CheckCircle2
                  className={`size-4 mt-0.5 ${
                    state.enableMadaAndCreditCards ? "text-[#34422a]" : "text-[#75786f]"
                  }`}
                />
                <div className="flex items-start gap-3 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                      بطاقات مَدى والبطاقات الائتمانية
                    </span>
                    <span className="font-cairo font-normal text-[#454840] text-[13px]">
                      Mada, Visa, Mastercard
                    </span>
                    <div className="flex items-center gap-1.5 pt-2">
                      <span className="bg-white px-2 py-0.5 rounded-[4px] font-cairo font-semibold text-[#181d17] text-[11px]">
                        Mastercard
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-[4px] font-cairo font-semibold text-[#181d17] text-[11px]">
                        VISA
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-[4px] font-cairo font-bold text-[#34422a] text-[11px]">
                        مدى
                      </span>
                    </div>
                  </div>
                  <div className="size-5 rounded-[2.5px] bg-[#34422a] flex items-center justify-center text-white shrink-0 mt-0.5">
                    {state.enableMadaAndCreditCards && <Check className="size-3.5" />}
                  </div>
                </div>
              </div>

              {/* Option 2: Apple Pay */}
              <div
                onClick={() => updateField("enableApplePay", !state.enableApplePay)}
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-start justify-between cursor-pointer border border-transparent hover:border-[#dfe4db] transition-colors"
                data-node-id="1:34403"
              >
                <CheckCircle2
                  className={`size-4 mt-0.5 ${
                    state.enableApplePay ? "text-[#34422a]" : "text-[#75786f]"
                  }`}
                />
                <div className="flex items-start gap-3 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                      أبل باي (Apple Pay)
                    </span>
                    <span className="font-cairo font-normal text-[#454840] text-[13px]">
                      الدفع السريع الموثق عبر أجهزة iOS وSafari
                    </span>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="font-cairo font-medium text-[#454840] text-[11px]">
                        التحقق البيومتري نشط
                      </span>
                      <span className="bg-white px-2.5 py-0.5 rounded-[4px] font-cairo font-semibold text-[#181d17] text-[11px]">
                        Apple Pay
                      </span>
                    </div>
                  </div>
                  <div className="size-5 rounded-[2.5px] bg-[#34422a] flex items-center justify-center text-white shrink-0 mt-0.5">
                    {state.enableApplePay && <Check className="size-3.5" />}
                  </div>
                </div>
              </div>

              {/* Option 3: STC Pay */}
              <div
                onClick={() => updateField("enableStcPay", !state.enableStcPay)}
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-start justify-between cursor-pointer border border-transparent hover:border-[#dfe4db] transition-colors"
                data-node-id="1:34421"
              >
                <CheckCircle2
                  className={`size-4 mt-0.5 ${
                    state.enableStcPay ? "text-[#34422a]" : "text-[#75786f]"
                  }`}
                />
                <div className="flex items-start gap-3 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                      إس تي سي باي (STC Pay)
                    </span>
                    <span className="font-cairo font-normal text-[#454840] text-[13px]">
                      المحفظة الرقمية الأكثر انتشاراً في المملكة
                    </span>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="font-cairo font-medium text-[#454840] text-[11px]">
                        تسوية فورية
                      </span>
                      <span className="bg-white px-2.5 py-0.5 rounded-[4px] font-cairo font-semibold text-[#34422a] text-[11px]">
                        stc pay
                      </span>
                    </div>
                  </div>
                  <div className="size-5 rounded-[2.5px] bg-[#34422a] flex items-center justify-center text-white shrink-0 mt-0.5">
                    {state.enableStcPay && <Check className="size-3.5" />}
                  </div>
                </div>
              </div>

              {/* Option 4: Direct Bank Transfer */}
              <div
                onClick={() =>
                  updateField("enableDirectBankTransfer", !state.enableDirectBankTransfer)
                }
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-start justify-between cursor-pointer border border-transparent hover:border-[#dfe4db] transition-colors"
                data-node-id="1:34437"
              >
                <CheckCircle2
                  className={`size-4 mt-0.5 ${
                    state.enableDirectBankTransfer ? "text-[#34422a]" : "text-[#75786f]"
                  }`}
                />
                <div className="flex items-start gap-3 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                      التحويل البنكي المباشر (IBAN Match)
                    </span>
                    <span className="font-cairo font-normal text-[#454840] text-[13px]">
                      الربط بالحسابات الافتراضية للتدقيق الآلي
                    </span>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="bg-white px-2.5 py-0.5 rounded-[4px] font-cairo font-semibold text-[#181d17] text-[11px]">
                        سداد / آيبان افتراضي
                      </span>
                    </div>
                  </div>
                  <div className="size-5 rounded-[2.5px] bg-[#34422a] flex items-center justify-center text-white shrink-0 mt-0.5">
                    {state.enableDirectBankTransfer && <Check className="size-3.5" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT/SIDEBAR COLUMN (4 cols): Automation Triggers */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full order-1 lg:order-2">
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-5"
            data-node-id="1:34454"
          >
            {/* Header */}
            <div className="flex items-center justify-end gap-3 text-right border-b border-[#f1f5eb] pb-3">
              <div className="flex flex-col items-end">
                <h2 className="font-cairo font-semibold text-[#181d17] text-[18px] leading-[26px]">
                  أتمتة إشعارات الفوترة والتحصيل
                </h2>
                <p className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]">
                  الرسائل الذكية والتنبيهات المسبقة
                </p>
              </div>
              <div className="bg-[#ebefe6] size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0">
                <BellRing className="size-5" />
              </div>
            </div>

            {/* Triggers List */}
            <div className="space-y-4">
              {/* Trigger 1 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-2 text-right">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => updateField("autoSendInvoice", !state.autoSendInvoice)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                      state.autoSendInvoice ? "bg-[#34422a]" : "bg-[#dfe4db]"
                    }`}
                  >
                    <div
                      className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                        state.autoSendInvoice ? "-translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    إرسال الفاتورة تلقائيًا
                  </span>
                </div>
                <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[21px]">
                  إصدار وإرسال الفاتورة الضريبية فور إنشاء الحجز أو استحقاق الاشتراك عبر البريد الإلكتروني وواتساب.
                </p>
              </div>

              {/* Trigger 2 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-2 text-right">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      updateField("autoSendPaymentReceipt", !state.autoSendPaymentReceipt)
                    }
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                      state.autoSendPaymentReceipt ? "bg-[#34422a]" : "bg-[#dfe4db]"
                    }`}
                  >
                    <div
                      className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                        state.autoSendPaymentReceipt ? "-translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    إرسال إيصال السداد الفوري
                  </span>
                </div>
                <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[21px]">
                  إشعار العميل والمالك فوريًا بإيصال الاستلام والرقم المرجعي للعملية المالية متضمناً تفاصيل المحفظة.
                </p>
              </div>

              {/* Trigger 3 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-2 text-right">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      updateField("smartPaymentReminder", !state.smartPaymentReminder)
                    }
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                      state.smartPaymentReminder ? "bg-[#34422a]" : "bg-[#dfe4db]"
                    }`}
                  >
                    <div
                      className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                        state.smartPaymentReminder ? "-translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    تذكير بالسداد الذكي
                  </span>
                </div>
                <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[21px]">
                  تنبيه آلي استباقي قبل موعد الاستحقاق بـ 48 ساعة وعند تجاوز المهلة المحددة بدون سداد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PERSISTENT DOCKING BAR */}
      <DockingBottomBar>
        <div
          className="bg-white/95 backdrop-blur-md rounded-[16px] p-4 border border-[rgba(197,200,189,0.6)] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full"
          data-node-id="1:34492"
        >
          {/* Actions Left */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#4b5940] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#34422a] transition-colors flex items-center gap-2 px-9 h-11 rounded-[12px] font-cairo font-normal text-white text-[14px]"
            >
              <span>حفظ التغييرات</span>
              <Check className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#ebefe6] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#dfe4db] transition-colors px-6 h-11 rounded-[12px] font-cairo font-normal text-[#181d17] text-[14px]"
            >
              الغاء
            </button>
          </div>

          {/* Telemetry compliance note Right */}
          <div className="flex items-center gap-2.5 text-right">
            <p className="font-cairo font-semibold text-[#454840] text-[12px] leading-[18px]">
              تسري هذه الإعدادات كضوابط افتراضية على كافة عمليات المنصة والعقارات المشتركة ما لم يتم تخصيصها لكل محفظة.
            </p>
            <div className="bg-[#f1f5eb] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
              <ShieldCheck className="size-4" />
            </div>
          </div>
        </div>
      </DockingBottomBar>
    </div>
  );
}
