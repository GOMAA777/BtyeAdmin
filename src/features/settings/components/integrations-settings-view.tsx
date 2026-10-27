"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Copy,
  Download,
  ShieldCheck,
  Building2,
  Home,
  CreditCard,
  MapPin,
  MessageSquare,
  AlertTriangle,
  Server,
  Link2,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { useIntegrationsSettings } from "../controllers/use-integrations-settings";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function IntegrationsSettingsView() {
  const {
    state,
    copyToClipboard,
    testConnection,
    toggleDisconnect,
    handleExportReport,
  } = useIntegrationsSettings();

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:33396"
      data-name="التكاملات والربط السحابي"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:33398"
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]">
            التكاملات والربط السحابي
          </h1>
          <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
            إدارة ومراقبة بوابات الربط السحابي ومزودي الخدمات الخارجية المعتمدة لمنصة BYTE HOME
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0"
          data-node-id="1:33407"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* SECTION 1: BOOKING & OTA CHANNELS */}
      <div className="w-full space-y-4" data-node-id="1:33430">
        <div className="flex items-center justify-between">
          <span className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]">
            قنوات العرض العالمية المباشرة
          </span>
          <div className="flex items-center gap-2">
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px]">
              منصات الحجز والتوزيع (Booking & OTA Distribution Channels)
            </h2>
            <div className="bg-[#34422a] h-6 w-2.5 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Airbnb Card */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col justify-between gap-6"
            data-node-id="1:33439"
          >
            <div className="space-y-4">
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div className="bg-[#d8e8cb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-cairo font-medium text-[#121f0d]">
                  <span>{state.airbnb.statusLabel}</span>
                  <span className="size-2 rounded-full bg-[#4b5940]" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-1">
                    <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                      {state.airbnb.title}
                    </h3>
                    <p className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                      {state.airbnb.subtitle}
                    </p>
                  </div>
                  <div className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-12 rounded-[12px] flex items-center justify-center text-[#34422a]">
                    <Home className="size-6" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-cairo text-[#454840] text-[14px] leading-[22px] text-right">
                {state.airbnb.description}
              </p>

              {/* Telemetry stats box */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 grid grid-cols-2 gap-2 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    زمن الاستجابة والجودة
                  </span>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    {state.airbnb.responseTime}
                  </span>
                </div>
                <div className="flex flex-col items-end border-r border-[#dfe4db] pr-3">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    آخر مزامنة دورية
                  </span>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    {state.airbnb.lastSync}
                  </span>
                </div>
              </div>

              {/* Identifier bar */}
              <div className="bg-[#e5eae0] rounded-[12px] px-4 py-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => copyToClipboard(state.airbnb.identifierKey, "Host Client ID")}
                  className="text-[#454840] hover:text-[#181d17] transition-colors p-1"
                  title="نسخ المعرف"
                >
                  <Copy className="size-3.5" />
                </button>
                <span className="font-cairo text-[#454840] text-[11px] tracking-[0.275px]">
                  {state.airbnb.identifierLabel}: {state.airbnb.identifierKey}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f1f5eb]">
              <button
                type="button"
                onClick={() => toggleDisconnect("airbnb")}
                className="font-cairo font-semibold text-[#ba1a1a] text-[12px] px-2 py-1 hover:underline"
              >
                {state.airbnb.isConnected ? "فصل الاتصال" : "إعادة الاتصال"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => testConnection(state.airbnb.title)}
                  className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#e4ebdc] transition-colors font-cairo font-semibold text-[#181d17] text-[12px] px-4 py-2 rounded-[12px]"
                >
                  اختبار الاتصال
                </button>
                <button
                  type="button"
                  onClick={() => testConnection(state.airbnb.title)}
                  className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#283320] transition-colors font-cairo font-semibold text-white text-[12px] px-4 py-2 rounded-[12px]"
                >
                  إدارة الاتصال
                </button>
              </div>
            </div>
          </div>

          {/* Booking.com Card */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col justify-between gap-6"
            data-node-id="1:33481"
          >
            <div className="space-y-4">
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div className="bg-[#d8e8cb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-cairo font-medium text-[#121f0d]">
                  <span>{state.bookingCom.statusLabel}</span>
                  <span className="size-2 rounded-full bg-[#4b5940]" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-1">
                    <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                      {state.bookingCom.title}
                    </h3>
                    <p className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                      {state.bookingCom.subtitle}
                    </p>
                  </div>
                  <div className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-12 rounded-[12px] flex items-center justify-center text-[#34422a]">
                    <Building2 className="size-6" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-cairo text-[#454840] text-[14px] leading-[22px] text-right">
                {state.bookingCom.description}
              </p>

              {/* Telemetry stats box */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 grid grid-cols-2 gap-2 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    زمن الاستجابة والجودة
                  </span>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    {state.bookingCom.responseTime}
                  </span>
                </div>
                <div className="flex flex-col items-end border-r border-[#dfe4db] pr-3">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    آخر مزامنة دورية
                  </span>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    {state.bookingCom.lastSync}
                  </span>
                </div>
              </div>

              {/* Identifier bar */}
              <div className="bg-[#e5eae0] rounded-[12px] px-4 py-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => copyToClipboard(state.bookingCom.identifierKey, "API Account ID")}
                  className="text-[#454840] hover:text-[#181d17] transition-colors p-1"
                  title="نسخ المعرف"
                >
                  <Copy className="size-3.5" />
                </button>
                <span className="font-cairo text-[#454840] text-[11px] tracking-[0.275px]">
                  {state.bookingCom.identifierLabel}: {state.bookingCom.identifierKey}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#f1f5eb]">
              <button
                type="button"
                onClick={() => toggleDisconnect("bookingCom")}
                className="font-cairo font-semibold text-[#ba1a1a] text-[12px] px-2 py-1 hover:underline"
              >
                {state.bookingCom.isConnected ? "فصل الاتصال" : "إعادة الاتصال"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => testConnection(state.bookingCom.title)}
                  className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#e4ebdc] transition-colors font-cairo font-semibold text-[#181d17] text-[12px] px-4 py-2 rounded-[12px]"
                >
                  اختبار الاتصال
                </button>
                <Link
                  href="/settings/integrations/booking-com"
                  className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#283320] transition-colors font-cairo font-semibold text-white text-[12px] px-4 py-2 rounded-[12px] inline-block"
                >
                  إدارة الاتصال
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Overbooking Protection Banner */}
        <div
          className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-end gap-3 text-right"
          data-node-id="1:33523"
        >
          <p className="font-cairo font-medium text-[#454840] text-[11px] leading-[16px]">
            تتم حماية الوحدات من الحجز المزدوج (Overbooking Protection) آلياً عبر بروتوكول القفل اللحظي للتقويم الموزع فور تسجيل أي طلب حجز مؤكد.
          </p>
          <div className="size-4 shrink-0 text-[#34422a]">
            <ShieldCheck className="size-4" />
          </div>
        </div>
      </div>

      {/* SECTION 2 & 3: PAYMENTS & MAPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full" data-node-id="1:33528">
        {/* Payments & Billing Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-end gap-2">
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px]">
              بوابات الدفع والتحصيل المالي (Payments & Billing)
            </h2>
            <div className="bg-[#34422a] h-6 w-2.5 rounded-full" />
          </div>

          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col justify-between gap-6"
            data-node-id="1:33576"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="bg-[#d8e8cb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-cairo font-medium text-[#121f0d]">
                  <span>{state.saudiPayment.statusLabel}</span>
                  <span className="size-2 rounded-full bg-[#4b5940]" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-1">
                    <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px] text-right">
                      بوابة الدفع الإلكتروني (Saudi Payment Gateway)
                    </h3>
                    <p className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                      {state.saudiPayment.subtitle}
                    </p>
                  </div>
                  <div className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-12 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0">
                    <CreditCard className="size-6" />
                  </div>
                </div>
              </div>

              <p className="font-cairo text-[#454840] text-[14px] leading-[22px] text-right">
                {state.saudiPayment.description}
              </p>

              <div className="bg-[#f1f5eb] rounded-[12px] p-4 grid grid-cols-2 gap-2 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    شهادات الأمان والامتثال
                  </span>
                  <span className="font-cairo font-semibold text-[#34422a] text-[14px]">
                    {state.saudiPayment.responseTime}
                  </span>
                </div>
                <div className="flex flex-col items-end border-r border-[#dfe4db] pr-3">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    فحص التسوية والتحصيل
                  </span>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    {state.saudiPayment.lastSync}
                  </span>
                </div>
              </div>

              <div className="bg-[#e5eae0] rounded-[12px] px-4 py-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => copyToClipboard(state.saudiPayment.identifierKey, "Merchant ID")}
                  className="text-[#454840] hover:text-[#181d17] transition-colors p-1"
                  title="نسخ المعرف"
                >
                  <Copy className="size-3.5" />
                </button>
                <span className="font-cairo text-[#454840] text-[11px] tracking-[0.275px]">
                  {state.saudiPayment.identifierLabel}: {state.saudiPayment.identifierKey}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-[#f1f5eb]">
              <Link
                href="/settings/billing"
                className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#283320] transition-colors font-cairo font-semibold text-white text-[12px] px-4 py-2 rounded-[12px]"
              >
                إدارة الاتصال
              </Link>
            </div>
          </div>
        </div>

        {/* Maps & Geolocation Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-end gap-2">
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px]">
              الخرائط والخدمات الجغرافية (Maps & Geolocation)
            </h2>
            <div className="bg-[#34422a] h-6 w-2.5 rounded-full" />
          </div>

          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col justify-between gap-6"
            data-node-id="1:33534"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="bg-[#d8e8cb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-cairo font-medium text-[#121f0d]">
                  <span>{state.googleMaps.statusLabel}</span>
                  <span className="size-2 rounded-full bg-[#4b5940]" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-1">
                    <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px] text-right">
                      {state.googleMaps.title}
                    </h3>
                    <p className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                      {state.googleMaps.subtitle}
                    </p>
                  </div>
                  <div className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-12 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0">
                    <MapPin className="size-6" />
                  </div>
                </div>
              </div>

              <p className="font-cairo text-[#454840] text-[14px] leading-[22px] text-right">
                {state.googleMaps.description}
              </p>

              <div className="bg-[#f1f5eb] rounded-[12px] p-4 grid grid-cols-2 gap-2 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    الحصة المستهلكة شهرياً
                  </span>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    {state.googleMaps.responseTime}
                  </span>
                </div>
                <div className="flex flex-col items-end border-r border-[#dfe4db] pr-3">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    حالة الاتصال السحابي
                  </span>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    {state.googleMaps.lastSync}
                  </span>
                </div>
              </div>

              <div className="bg-[#e5eae0] rounded-[12px] px-4 py-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => copyToClipboard(state.googleMaps.identifierKey, "Maps API Key")}
                  className="text-[#454840] hover:text-[#181d17] transition-colors p-1"
                  title="نسخ المفتاح"
                >
                  <Copy className="size-3.5" />
                </button>
                <span className="font-cairo text-[#454840] text-[11px] tracking-[0.275px]">
                  {state.googleMaps.identifierLabel}: {state.googleMaps.identifierKey}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-[#f1f5eb]">
              <button
                type="button"
                onClick={() => testConnection(state.googleMaps.title)}
                className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#283320] transition-colors font-cairo font-semibold text-white text-[12px] px-4 py-2 rounded-[12px]"
              >
                إدارة الاتصال
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4 & 5: MESSAGING & WARNING FAILOVER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full" data-node-id="1:33613">
        {/* WhatsApp Business API Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-end gap-2">
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px]">
              بوابات المراسلة والأتمتة
            </h2>
            <div className="bg-[#34422a] h-6 w-2.5 rounded-full" />
          </div>

          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col justify-between gap-6"
            data-node-id="1:33658"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="bg-[#d8e8cb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-cairo font-medium text-[#121f0d]">
                  <span>{state.whatsapp.statusLabel}</span>
                  <span className="size-2 rounded-full bg-[#4b5940]" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-1">
                    <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px] text-right">
                      {state.whatsapp.title}
                    </h3>
                    <p className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                      {state.whatsapp.subtitle}
                    </p>
                  </div>
                  <div className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-12 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0">
                    <MessageSquare className="size-6" />
                  </div>
                </div>
              </div>

              <p className="font-cairo text-[#454840] text-[14px] leading-[22px] text-right">
                {state.whatsapp.description}
              </p>

              <div className="bg-[#f1f5eb] rounded-[12px] p-4 grid grid-cols-2 gap-2 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    تصنيف جودة الحساب
                  </span>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    {state.whatsapp.responseTime}
                  </span>
                </div>
                <div className="flex flex-col items-end border-r border-[#dfe4db] pr-3">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    آخر عملية إرسال
                  </span>
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    {state.whatsapp.lastSync}
                  </span>
                </div>
              </div>

              <div className="bg-[#e5eae0] rounded-[12px] px-4 py-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => copyToClipboard(state.whatsapp.identifierKey, "WABA ID")}
                  className="text-[#454840] hover:text-[#181d17] transition-colors p-1"
                  title="نسخ المعرف"
                >
                  <Copy className="size-3.5" />
                </button>
                <span className="font-cairo text-[#454840] text-[11px] tracking-[0.275px]">
                  {state.whatsapp.identifierLabel}: {state.whatsapp.identifierKey}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#f1f5eb]">
              <button
                type="button"
                onClick={() => toggleDisconnect("whatsapp")}
                className="font-cairo font-semibold text-[#ba1a1a] text-[12px] px-2 py-1 hover:underline"
              >
                {state.whatsapp.isConnected ? "فصل الاتصال" : "إعادة الاتصال"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => testConnection(state.whatsapp.title)}
                  className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#e4ebdc] transition-colors font-cairo font-semibold text-[#181d17] text-[12px] px-4 py-2 rounded-[12px]"
                >
                  اختبار الاتصال
                </button>
                <Link
                  href="/whatsapp"
                  className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#283320] transition-colors font-cairo font-semibold text-white text-[12px] px-4 py-2 rounded-[12px]"
                >
                  إدارة الاتصال
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Failover SMS Gateway Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-end gap-2">
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px]">
              بوابة الطوارئ الاحتياطية (Failover Services)
            </h2>
            <div className="bg-[#ba1a1a] h-6 w-2.5 rounded-full" />
          </div>

          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col justify-between gap-6"
            data-node-id="1:33619"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="bg-[#ffdad6] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-cairo font-medium text-[#93000a]">
                  <span>{state.smsFailover.statusLabel}</span>
                  <span className="size-2 rounded-full bg-[#ba1a1a]" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-1">
                    <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px] text-right">
                      {state.smsFailover.title}
                    </h3>
                    <p className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                      {state.smsFailover.subtitle}
                    </p>
                  </div>
                  <div className="bg-[#ffdad6] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-12 rounded-[12px] flex items-center justify-center text-[#93000a] shrink-0">
                    <AlertTriangle className="size-6" />
                  </div>
                </div>
              </div>

              <p className="font-cairo text-[#454840] text-[14px] leading-[22px] text-right">
                {state.smsFailover.description}
              </p>

              {/* Critical Warning Callout */}
              <div className="bg-[rgba(255,218,214,0.4)] rounded-[12px] p-4 flex items-start gap-3 text-right">
                <div className="flex-1 text-[#93000a] text-[13px] leading-[21px] font-cairo">
                  <strong className="font-bold">تنبيه حرج: </strong>
                  <span>
                    بوابة الرسائل النصية البديلة غير نشطة حالياً. يرجى إتمام ربط الحساب المعتمد لدى هيئة الاتصالات والفضاء والتقنية (CITC) لضمان عدم توقف رسائل الطوارئ.
                  </span>
                </div>
                <AlertTriangle className="size-5 text-[#93000a] shrink-0 mt-0.5" />
              </div>

              {/* Disabled Identifier */}
              <div className="bg-[#e5eae0] opacity-70 rounded-[12px] px-4 py-2 flex items-center justify-between">
                <span className="text-[#75786f] text-[12px]">🔒</span>
                <span className="font-cairo text-[#454840] text-[11px] tracking-[0.275px]">
                  {state.smsFailover.identifierLabel}: {state.smsFailover.identifierKey}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-start pt-2 border-t border-[#f1f5eb]">
              <button
                type="button"
                onClick={() => testConnection("بوابة الرسائل النصية الاحتياطية")}
                className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#283320] transition-colors font-cairo font-semibold text-white text-[12px] px-6 py-2.5 rounded-[12px] flex items-center gap-2"
              >
                <span>ربط الخدمة وتفعيلها الآن</span>
                <Link2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PERSISTENT DOCKING BAR */}
      <DockingBottomBar>
        <div
          className="bg-white/95 backdrop-blur-md rounded-[16px] p-4 border border-[rgba(197,200,189,0.6)] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full"
          data-node-id="1:33413"
        >
          {/* Export Report Action */}
          <button
            type="button"
            onClick={handleExportReport}
            className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#e4ebdc] transition-colors flex items-center gap-2 px-4 py-2 rounded-[12px] font-cairo font-semibold text-[#181d17] text-[12px]"
            data-node-id="1:33416"
          >
            <span>تصدير التقرير</span>
            <Download className="size-3.5" />
          </button>

          {/* Telemetry compliance note */}
          <div className="flex items-center gap-3 text-right">
            <div className="flex flex-col items-end">
              <p className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]">
                تسري حالة التكاملات على مستوى كافة عقارات ووحدات المنصة فور التحديث.
              </p>
              <p className="font-cairo font-normal text-[#75786f] text-[13px] leading-[20px]">
                يتم توثيق كل تعديل وفصل في سجل الأمان المركزي المعتمد وفق متطلبات الرقابة السحابية.
              </p>
            </div>
            <div className="bg-[#f1f5eb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a] shrink-0">
              <Server className="size-5" />
            </div>
          </div>
        </div>
      </DockingBottomBar>
    </div>
  );
}
