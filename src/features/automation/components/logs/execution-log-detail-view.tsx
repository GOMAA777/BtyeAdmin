"use client";

import { BackButton } from "@/components/shared/back-button";
import {
  MessageSquare,
  Lock,
  Layers,
  Calendar,
  User,
  Building2,
  Key,
  Check,
  CheckCheck,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { ExecutionLog } from "../../types";

interface ExecutionLogDetailViewProps {
  log: ExecutionLog;
}

export function ExecutionLogDetailView({ log }: ExecutionLogDetailViewProps) {
  const isFailed = log.status === "failed";
  const logCodeClean = log.id ? log.id.replace("#", "") : "EX-104829";

  return (
    <div className="space-y-[20px] font-cairo" dir="rtl">
      {/* 1. PAGE HEADER BAR (Figma node 1:25549) */}
      <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-[16px]">
          <BackButton
            fallbackHref="/automation/?tab=logs"
            className="size-[40px] rounded-[12px] bg-[#f1f5eb] hover:bg-[#e5eae0] flex items-center justify-center text-[#34422a] transition-colors shrink-0 mt-0.5 cursor-pointer"
          />

          <div>
            <div className="flex flex-wrap items-center gap-[8px]">
              <h1 className="text-[24px] font-semibold text-[#181d17] tracking-[-0.6px] leading-[34px]">
                تفاصيل تنفيذ الأتمتة — {logCodeClean}
              </h1>

              {/* Status Chip */}
              {!isFailed ? (
                <span className="bg-[#d8e8cb] text-[#34422a] text-[11px] font-semibold px-[12px] py-[4px] rounded-full drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] inline-flex items-center gap-[6px]">
                  <span>حالة العملية: نجح التوصيل</span>
                  <span className="bg-[#34422a] size-[8px] rounded-full inline-block" />
                </span>
              ) : (
                <span className="bg-[#ffdad6] text-[#93000a] text-[11px] font-semibold px-[12px] py-[4px] rounded-full drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] inline-flex items-center gap-[6px]">
                  <span>حالة العملية: فشل الإرسال</span>
                  <span className="bg-[#ba1a1a] size-[8px] rounded-full inline-block" />
                </span>
              )}

              {/* Action Type Chip */}
              <span className="bg-[#e5eae0] text-[#454840] text-[11px] font-medium px-[12px] py-[4px] rounded-full inline-flex items-center gap-[4px]">
                <span>نوع الإجراء: {log.actionBadgeLabel || "إرسال قالب WhatsApp"}</span>
                <MessageSquare className="size-[12px] text-[#454840]" />
              </span>

              {/* Read Only Audit History Chip */}
              <span className="bg-[#dde4dc] text-[#394039] text-[11px] font-medium px-[12px] py-[4px] rounded-full inline-flex items-center gap-[4px]">
                <span>سجل تاريخي للقراءة فقط</span>
                <Lock className="size-[11px] text-[#394039]" />
              </span>
            </div>

            <p className="text-[#454840] text-[13px] font-normal leading-[20px] mt-[4px]">
              سجل التدقيق الشامل لعملية التشغيل التلقائي وحالة تسليم الرسالة المشفرة.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Operational 2-Column Desktop Grid (Figma node 1:25572) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
        {/* RIGHT COLUMN IN RTL (8 cols out of 12) - Execution Data, Template Resolution, Payload */}
        <div className="lg:col-span-8 flex flex-col gap-[24px]">
          {/* SECTION A: Execution Metadata & Linked Context Bento (Figma node 1:25574) */}
          <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col gap-[16px]">
            {/* Header */}
            <div className="border-b border-[#e5eae0]/60 pb-[16px] flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <div className="size-[40px] rounded-[12px] bg-[#ebefe6] flex items-center justify-center text-[#4b5940]">
                  <Layers className="size-[20px]" />
                </div>
                <h2 className="font-bold text-[18px] text-[#181d17] leading-[28px]">
                  ملخص مسار التنفيذ والارتباط المباشر
                </h2>
              </div>
            </div>

            {/* Metric Grid (4 Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px]">
              {/* Card 1: Execution ID */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col justify-between border border-[#e5eae0]/60">
                <span className="font-medium text-[11px] text-[#454840] leading-[16px]">
                  معرّف التنفيذ
                </span>
                <div className="font-bold text-[18px] text-[#34422a] leading-[28px] mt-[6px]">
                  {logCodeClean}
                </div>
                <span className="font-medium text-[11px] text-[#75786f] leading-[16px] mt-[4px]">
                  {isFailed ? "غير مكتمل" : "معالج بنجاح"}
                </span>
              </div>

              {/* Card 2: Active Rule */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col justify-between border border-[#e5eae0]/60">
                <span className="font-medium text-[11px] text-[#454840] leading-[16px]">
                  القاعدة المفعّلة
                </span>
                <div className="font-semibold text-[14px] text-[#34422a] leading-[20px] truncate mt-[6px]" title={log.ruleName}>
                  {log.ruleName || "إرسال تفاصيل الوصول"}
                </div>
                <span className="font-medium text-[11px] text-[#75786f] leading-[16px] mt-[4px]">
                  معرّف القاعدة: #{log.ruleId || "RUL-882"}
                </span>
              </div>

              {/* Card 3: Scheduled Trigger */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col justify-between border border-[#e5eae0]/60">
                <span className="font-medium text-[11px] text-[#454840] leading-[16px]">
                  المحفز المجدول
                </span>
                <div className="font-semibold text-[14px] text-[#181d17] leading-[20px] mt-[6px]">
                  قبل الوصول بـ 24 س
                </div>
                <span className="font-medium text-[11px] text-[#75786f] leading-[16px] mt-[4px]">
                  توقيت آلي مجدول
                </span>
              </div>

              {/* Card 4: Latency & Network */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col justify-between border border-[#e5eae0]/60">
                <span className="font-medium text-[11px] text-[#454840] leading-[16px]">
                  زمن الاستجابة والشبكة
                </span>
                <div className="font-bold text-[18px] text-[#34422a] leading-[28px] mt-[6px]">
                  {log.responseTime || "4.2 ثانية"}
                </div>
                <span className="font-medium text-[11px] text-[#54624c] leading-[16px] mt-[4px]">
                  ضمن المعدل المثالي
                </span>
              </div>
            </div>

            {/* Entity Context Strip */}
            <div className="bg-[rgba(229,234,224,0.4)] rounded-[12px] p-[16px] flex flex-col gap-[12px] border border-[#e5eae0]/70">
              <div className="font-bold text-[12px] text-[#454840] leading-[18px]">
                الكيان المرتبط وسياق الحجز
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px]">
                {/* 1. Booking ref */}
                <div className="bg-white rounded-[8px] p-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0]/80 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-[11px] text-[#454840] leading-[16px] block">
                      رقم الحجز
                    </span>
                    <span className="font-bold text-[12px] text-[#34422a] leading-[18px]">
                      {log.bookingId || "BK-10482"}
                    </span>
                  </div>
                  <Calendar className="size-[16px] text-[#34422a]" />
                </div>

                {/* 2. Guest */}
                <div className="bg-white rounded-[8px] p-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0]/80 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-[11px] text-[#454840] leading-[16px] block">
                      النزيل المستلم
                    </span>
                    <span className="font-semibold text-[12px] text-[#181d17] leading-[18px] block">
                      {log.guestName || "خالد العتيبي"}
                    </span>
                    <span className="font-normal text-[11px] text-[#75786f] leading-[16px]">
                      {log.guestPhone || "+966 50 123 4567"}
                    </span>
                  </div>
                  <User className="size-[16px] text-[#454840]" />
                </div>

                {/* 3. Property */}
                <div className="bg-white rounded-[8px] p-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0]/80 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-[11px] text-[#454840] leading-[16px] block">
                      العقار
                    </span>
                    <span className="font-semibold text-[12px] text-[#181d17] leading-[18px] block">
                      {log.propertyName || "عمارة النخيل"}
                    </span>
                    <span className="font-medium text-[11px] text-[#75786f] leading-[16px]">
                      الرياض - حي النخيل
                    </span>
                  </div>
                  <Building2 className="size-[16px] text-[#454840]" />
                </div>

                {/* 4. Unit */}
                <div className="bg-white rounded-[8px] p-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0]/80 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-[11px] text-[#454840] leading-[16px] block">
                      الوحدة
                    </span>
                    <span className="font-semibold text-[12px] text-[#181d17] leading-[18px] block">
                      {log.unitName || "شقة فندقية 204"}
                    </span>
                    <span className="font-medium text-[11px] text-[#75786f] leading-[16px]">
                      الدور الثاني
                    </span>
                  </div>
                  <Key className="size-[16px] text-[#454840]" />
                </div>
              </div>
            </div>

            {/* Bottom Timings Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-[8px] text-[11px] font-medium text-[#75786f]">
              <div>
                <span>وقت الإطلاق: {log.date || "18 سبتمبر 2026"} — {log.time || "09:00:14 ص"}</span>
                <span className="mx-2">•</span>
                <span>تأكيد الاستلام: 18 سبتمبر 2026 — 09:00:18 ص</span>
              </div>
              <div className="text-[#54624c]">
                سيرفر: me-central-riyadh-02
              </div>
            </div>
          </div>

          {/* SECTION B: Generated Message & Variables Resolution (Figma node 1:25678) */}
          <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col gap-[20px]">
            {/* Header */}
            <div className="border-b border-[#e5eae0]/60 pb-[16px] flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-bold text-[18px] text-[#181d17] leading-[28px]">
                الرسالة المولّدة عند التنفيذ
              </h2>
              <span className="bg-[#ebefe6] text-[#454840] font-medium text-[11px] px-[12px] py-[4px] rounded-[6px] inline-flex items-center gap-[6px]">
                <span>قالب WhatsApp Business معتمد من Meta</span>
                <ShieldCheck className="size-[13px] text-[#4b5940]" />
              </span>
            </div>

            {/* Grid of Preview and Resolved Variables */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] items-start">
              {/* Left in Desktop Grid (7 cols) - Resolved Variables Table */}
              <div className="md:col-span-7 flex flex-col gap-[8px]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[12px] text-[#181d17] leading-[18px]">
                    قيم المتغيرات المستبدلة ديناميكيًا
                  </span>
                  <span className="font-medium text-[11px] text-[#75786f] leading-[16px]">
                    8 متغيرات تم التحقق منها بنجاح
                  </span>
                </div>

                <div className="bg-[#f1f5eb] rounded-[12px] border border-[#e5eae0] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-[rgba(229,234,224,0.6)] px-[16px] py-[8px] flex items-center justify-between text-[11px] font-bold text-[#454840]">
                    <span>اسم المتغير في القالب</span>
                    <span>القيمة المستخرجة من السجل</span>
                  </div>

                  {/* Rows */}
                  <div className="divide-y divide-[#e5eae0]/40 text-[12px]">
                    <div className="px-[16px] py-[8px] flex items-center justify-between">
                      <span className="font-mono text-[#75786f]">{`{{guest_name}}`}</span>
                      <span className="font-semibold text-[#181d17]">{log.guestName || "خالد العتيبي"}</span>
                    </div>

                    <div className="px-[16px] py-[8px] flex items-center justify-between">
                      <span className="font-mono text-[#75786f]">{`{{property_name}}`}</span>
                      <span className="font-semibold text-[#181d17]">{log.propertyName || "عمارة النخيل"}</span>
                    </div>

                    <div className="px-[16px] py-[8px] flex items-center justify-between">
                      <span className="font-mono text-[#75786f]">{`{{unit_number}}`}</span>
                      <span className="font-bold text-[#181d17]">204</span>
                    </div>

                    <div className="px-[16px] py-[8px] flex items-center justify-between">
                      <span className="font-mono text-[#75786f]">{`{{smart_lock_pin}}`}</span>
                      <span className="font-bold text-[#34422a] bg-[#ebefe6] px-1.5 py-0.5 rounded">482913</span>
                    </div>

                    <div className="px-[16px] py-[8px] flex items-center justify-between">
                      <span className="font-mono text-[#75786f]">{`{{checkin_date}}`}</span>
                      <span className="font-normal text-[#181d17]">18 سبتمبر 2026</span>
                    </div>

                    <div className="px-[16px] py-[8px] flex items-center justify-between">
                      <span className="font-mono text-[#75786f]">{`{{checkin_time}}`}</span>
                      <span className="font-normal text-[#181d17]">02:00 م</span>
                    </div>

                    <div className="px-[16px] py-[8px] flex items-center justify-between">
                      <span className="font-mono text-[#75786f]">{`{{checkout_date}}`}</span>
                      <span className="font-normal text-[#181d17]">21 سبتمبر 2026</span>
                    </div>

                    <div className="px-[16px] py-[8px] flex items-center justify-between">
                      <span className="font-mono text-[#75786f]">{`{{map_link}}`}</span>
                      <span className="font-normal text-[11px] text-[#2563eb] truncate max-w-[180px]">maps.abraj.sa/loc/nakheel-204</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] font-normal text-[#75786f] leading-[16.5px] mt-[4px]">
                  * تم استخراج المتغيرات في زمن حقيقي لحظي من قاعدة بيانات إدارة الأصول ومزامنتها مع محرك قفل الباب الذكي Tuya/Yale Gateway.
                </p>
              </div>

              {/* Right in Desktop Grid (5 cols) - Realistic WhatsApp Chat Preview Card */}
              <div className="md:col-span-5 bg-[#f1f5eb] rounded-[16px] p-[16px] flex flex-col gap-[8px] border border-[#e5eae0]">
                <div className="font-bold text-[11px] text-[#454840] leading-[16px]">
                  معاينة تسليم الشاشة (مستلم)
                </div>

                {/* Chat Mock */}
                <div className="bg-[#efeae2] rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden border border-[#d8d0c5]">
                  {/* WhatsApp Header */}
                  <div className="bg-[#075e54] text-white px-[12px] py-[10px] flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <div className="size-[32px] rounded-full bg-white/20 flex items-center justify-center font-bold text-[12px]">
                        رِ
                      </div>
                      <div>
                        <div className="font-bold text-[12px] leading-[16px] flex items-center gap-1">
                          <span>BYTE HOME لإدارة الأصول</span>
                          <span className="text-[10px] bg-white/30 rounded-full px-1">✓</span>
                        </div>
                        <div className="text-[10px] text-white/80 leading-[12px] mt-0.5">
                          حساب تجاري رسمي
                        </div>
                      </div>
                    </div>
                    <div className="text-white/80 font-bold text-[14px]">⋮</div>
                  </div>

                  {/* Message Bubble Body */}
                  <div className="p-[12px]">
                    <div className="bg-white rounded-[8px] p-[12px] text-right text-[12px] leading-[20px] text-[#111b21] shadow-xs space-y-[6px]">
                      <p>
                        مرحبًا <strong className="text-[#34422a] font-bold">{log.guestName || "خالد العتيبي"}</strong>،
                      </p>
                      <p>
                        يسعدنا استقبالكم في <strong className="text-[#34422a] font-bold">{log.propertyName || "عمارة النخيل"}</strong> - الوحدة <strong>204</strong>.
                      </p>
                      <p>
                        📅 <strong>تاريخ الوصول:</strong> 18 سبتمبر 2026 الساعة 02:00 م
                      </p>
                      <p>
                        🗓️ <strong>تاريخ المغادرة:</strong> 21 سبتمبر 2026 الساعة 12:00 م
                      </p>
                      <div>
                        🔐 <strong>كود الدخول للباب الذكي:</strong>{" "}
                        <span className="bg-[#ebefe6] text-[#34422a] font-bold px-[6px] py-[2px] rounded text-[12px] tracking-[0.6px]">
                          482913
                        </span>
                      </div>
                      <p>
                        📍 <strong>رابط الموقع:</strong>{" "}
                        <span className="text-[#2563eb] underline text-[11px]">
                          https://maps.abraaj.sa/loc/nakheel-204
                        </span>
                      </p>
                      <p className="text-[#111b21]">
                        نتمنى لكم إقامة ممتعة وخدمة ممتازة!
                      </p>

                      <div className="flex items-center justify-end gap-[4px] pt-[2px] text-[10px] text-[#6b7280]">
                        <span>09:00 AM</span>
                        <CheckCheck className="size-[12px] text-[#34b7f1]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Delivery Status Details */}
                <div className="bg-[#ebefe6] rounded-[8px] p-[8px] flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-[4px] text-[#34422a] font-semibold">
                    <CheckCheck className="size-[14px] text-[#34422a]" />
                    <span>تمت القراءة (Read Receipt)</span>
                  </div>
                  <div className="text-[#75786f] font-mono text-[10px]">
                    MessageID: wamid.HBgM104
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN IN RTL (4 cols out of 12) - Operational Timeline & Audit Metrics */}
        <div className="lg:col-span-4 flex flex-col gap-[24px]">
          {/* SECTION A: Step-by-Step Execution Timeline (Figma node 1:25804) */}
          <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col gap-[16px]">
            {/* Header */}
            <div className="border-b border-[#e5eae0]/60 pb-[16px] flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[18px] text-[#181d17] leading-[28px]">
                  الخط الزمني الدقيق
                </h2>
                <p className="font-medium text-[11px] text-[#454840] leading-[16px]">
                  تسلسل دورة حياة المعالجة اللحظية
                </p>
              </div>

              <div className="size-[32px] rounded-full bg-[#d8e8cb] flex items-center justify-center font-bold text-[12px] text-[#34422a]">
                7/7
              </div>
            </div>

            {/* Vertical Timeline Items with Connecting Line */}
            <div className="relative pr-[12px] flex flex-col gap-[16px]">
              {/* Vertical connecting line */}
              <div className="absolute right-[19px] top-[14px] bottom-[14px] w-[2px] bg-[#dfe4db]" />

              {/* Step 1 */}
              <div className="flex items-start gap-[16px] relative">
                <div className="size-[16px] rounded-full bg-[#34422a] ring-4 ring-white shrink-0 mt-[4px] z-10" />
                <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex-1 border border-[#e5eae0]/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#181d17] leading-[18px]">
                      1. اكتشاف المحفز
                    </span>
                    <span className="font-normal text-[11px] text-[#75786f]">09:00 ص</span>
                  </div>
                  <p className="font-normal text-[13px] text-[#454840] leading-[20px] mt-[2px]">
                    مجدول قبل موعد الوصول بـ 24 ساعة للحجز{" "}
                    <strong className="text-[#34422a] font-bold">BK-10482</strong>.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-[16px] relative">
                <div className="size-[16px] rounded-full bg-[#34422a] ring-4 ring-white shrink-0 mt-[4px] z-10" />
                <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex-1 border border-[#e5eae0]/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#181d17] leading-[18px]">
                      2. تقييم قاعدة الأتمتة
                    </span>
                    <span className="font-normal text-[11px] text-[#75786f]">09:00:01 ص</span>
                  </div>
                  <p className="font-normal text-[13px] text-[#454840] leading-[20px] mt-[2px]">
                    التحقق من نشاط القاعدة، صلاحيات الاشتراك، ومطابقة أولويات المهام.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-[16px] relative">
                <div className="size-[16px] rounded-full bg-[#34422a] ring-4 ring-white shrink-0 mt-[4px] z-10" />
                <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex-1 border border-[#e5eae0]/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#181d17] leading-[18px]">
                      3. التحقق من الشروط
                    </span>
                    <span className="font-normal text-[11px] text-[#75786f]">09:00:02 ص</span>
                  </div>
                  <div className="flex flex-col gap-[4px] mt-[4px] text-[11px] font-medium text-[#54624c]">
                    <div className="flex items-center gap-[4px]">
                      <Check className="size-[13px] text-[#54624c]" />
                      <span>{`حالة الحجز = "مؤكد" (متحقق ✓)`}</span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <Check className="size-[13px] text-[#54624c]" />
                      <span>{`سداد العربون = "مدفوع بالكامل" (متحقق ✓)`}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-[16px] relative">
                <div className="size-[16px] rounded-full bg-[#34422a] ring-4 ring-white shrink-0 mt-[4px] z-10" />
                <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex-1 border border-[#e5eae0]/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#181d17] leading-[18px]">
                      4. استدعاء وتحميل القالب
                    </span>
                    <span className="font-normal text-[11px] text-[#75786f]">09:00:03 ص</span>
                  </div>
                  <p className="font-normal text-[13px] text-[#454840] leading-[20px] mt-[2px]">
                    استدعاء قالب <span className="font-bold text-[#34422a]">checkin_details</span> المعتمد رسمياً لدى مزود الخدمة.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-[16px] relative">
                <div className="size-[16px] rounded-full bg-[#34422a] ring-4 ring-white shrink-0 mt-[4px] z-10" />
                <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex-1 border border-[#e5eae0]/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#181d17] leading-[18px]">
                      5. استبدال وتجهيز المتغيرات
                    </span>
                    <span className="font-normal text-[11px] text-[#75786f]">09:00:04 ص</span>
                  </div>
                  <p className="font-normal text-[13px] text-[#454840] leading-[20px] mt-[2px]">
                    استخراج بيانات الضيف وتوليد الرمز السري للباب <span className="font-bold text-[#34422a]">482913</span> بنجاح.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex items-start gap-[16px] relative">
                <div className="size-[16px] rounded-full bg-[#34422a] ring-4 ring-white shrink-0 mt-[4px] z-10" />
                <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex-1 border border-[#e5eae0]/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#181d17] leading-[18px]">
                      6. إرسال الطلب للبوابة
                    </span>
                    <span className="font-normal text-[11px] text-[#75786f]">09:00:05 ص</span>
                  </div>
                  <p className="font-normal text-[13px] text-[#454840] leading-[20px] mt-[2px]">
                    تم دفع الطلب إلى Meta Cloud API عبر المسار الآمن TLS 1.3 بنجاح.
                  </p>
                </div>
              </div>

              {/* Step 7 (Final Status Webhook) */}
              <div className="flex items-start gap-[16px] relative">
                <div className="size-[16px] rounded-full bg-[#3e8a5a] ring-4 ring-white flex items-center justify-center shrink-0 mt-[4px] z-10">
                  <span className="size-[6px] rounded-full bg-white" />
                </div>
                <div className="bg-[rgba(216,232,203,0.4)] border border-[#d8e8cb] rounded-[12px] p-[10px] flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[12px] text-[#34422a] leading-[18px]">
                      7. تأكيد التسليم والقراءة (Webhook)
                    </span>
                    <span className="font-bold text-[11px] text-[#54624c]">09:00:18 ص</span>
                  </div>
                  <p className="font-normal text-[13px] text-[#5a6952] leading-[20px] mt-[2px]">
                    ورد إشعار Webhook: الرسالة تم استلامها وقراءتها من هاتف النزيل مباشرة.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: Audit Safeguards, Compliance & Health Metrics (Figma node 1:25915) */}
          <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col gap-[16px]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[18px] text-[#181d17] leading-[28px]">
                  الحوكمة والامتثال الرقابي
                </h2>
                <p className="font-medium text-[11px] text-[#454840] leading-[16px]">
                  الضمانات التشغيلية ومعايير الاعتماد
                </p>
              </div>

              <div className="size-[36px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center text-[#4b5940]">
                <ShieldCheck className="size-[18px]" />
              </div>
            </div>

            {/* Informative Safeguards Box */}
            <div className="bg-[rgba(229,234,224,0.4)] rounded-[12px] p-[16px] flex flex-col gap-[6px] border border-[#e5eae0]/70">
              <div className="flex items-center gap-[6px] text-[#34422a] font-bold text-[12px]">
                <ShieldAlert className="size-[14px]" />
                <span>آلية الحماية والتعافي التلقائي</span>
              </div>
              <p className="font-normal text-[13px] text-[#454840] leading-[21px]">
                في حال حدوث أي إخفاق أو انقطاع، يتم تلقائيًا تسجيل رمز الخطأ البرمجي الدقيق (مثل 408 Timeout أو 131026) ، وإعادة المحاولة مرتين مع إرسال تنبيه فوري عبر لوحة عمليات المشرف المناوب.
              </p>
            </div>

            {/* Quick Telemetry Stats */}
            <div className="flex flex-col gap-[6px] text-[13px]">
              {/* Row 1 */}
              <div className="bg-[#f1f5eb] rounded-[8px] p-[10px] flex items-center justify-between border border-[#e5eae0]/40">
                <span className="font-normal text-[#454840]">إجمالي وقت المعالجة:</span>
                <span className="font-bold text-[#34422a]">{log.responseTime || "4.8 ثوانٍ"}</span>
              </div>

              {/* Row 2 */}
              <div className="bg-[#f1f5eb] rounded-[8px] p-[10px] flex items-center justify-between border border-[#e5eae0]/40">
                <span className="font-normal text-[#454840]">حالة بوابة الاتصال:</span>
                <div className="flex items-center gap-[6px]">
                  <span className="font-semibold text-[#54624c]">متصل ومستقر (Cloud API)</span>
                  <span className="size-[8px] rounded-full bg-[#54624c]" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="bg-[#f1f5eb] rounded-[8px] p-[10px] flex items-center justify-between border border-[#e5eae0]/40">
                <span className="font-normal text-[#454840]">الاعتماد والامتثال:</span>
                <div className="flex items-center gap-[4px] font-semibold text-[#34422a]">
                  <span>مطابق لضوابط CITC</span>
                  <ShieldCheck className="size-[14px] text-[#34422a]" />
                </div>
              </div>

              {/* Row 4 */}
              <div className="bg-[#f1f5eb] rounded-[8px] p-[10px] flex items-center justify-between border border-[#e5eae0]/40">
                <span className="font-normal text-[#454840]">التكلفة المحسوبة للرسالة:</span>
                <span className="font-bold text-[#181d17]">0.12 ر.س (Meta Utility)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
