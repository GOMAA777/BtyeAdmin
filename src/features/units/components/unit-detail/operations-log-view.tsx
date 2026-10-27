"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowRight,
  Download,
  Building2,
  CheckCircle2,
  User,
  History,
  SlidersHorizontal,
  CalendarCheck,
  ShieldCheck,
  Search,
  Calendar,
  Clock,
  KeyRound,
  Tag,
  Car,
  Wifi,
  Percent,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Globe,
  Sliders,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { SelectDropdown } from "@/components/shared/select-dropdown";
import { BackButton } from "@/components/shared/back-button";
import { TablePagination } from "@/components/shared/table-pagination";
import { TableToolbar } from "@/components/shared/table-toolbar";

interface OperationsLogViewProps {
  onBack?: () => void;
  unitNumber?: string;
  propertyName?: string;
}

interface ActivityEvent {
  id: string;
  reference: string;
  title: string;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  badgeDotColor: string;
  date: string;
  nodeBg: string;
  nodeIconType: "booking" | "price" | "lock" | "amenities" | "weekend" | "creation";
  contentNode: React.ReactNode;
  tags?: { label: string; icon: "parking" | "wifi" }[];
  performer: {
    name: string;
    role: string;
    iconType: "ota" | "admin" | "owner";
  };
  ip: string;
  hash: string;
  activityType: string;
  performerCategory: string;
}

export function OperationsLogView({
  onBack,
  unitNumber = "204",
  propertyName = "عمارة النخيل",
}: OperationsLogViewProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPerformer, setSelectedPerformer] = useState("all");
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Exact 6 events from Figma Node 1:15927
  const events: ActivityEvent[] = useMemo(
    () => [
      {
        id: "1",
        reference: "#EVT-9041",
        title: "تم إنشاء حجز مؤكد (BK-10482)",
        badgeText: "الحجوزات والنزلاء",
        badgeBg: "bg-[#D8E8CB]",
        badgeTextColor: "text-[#5A6952]",
        badgeDotColor: "bg-[#34422A]",
        date: "18 سبتمبر 2026 — 03:00 م",
        nodeBg: "bg-[#D8E8CB]",
        nodeIconType: "booking",
        activityType: "bookings",
        performerCategory: "ota",
        contentNode: (
          <p className="text-[14px] leading-[22.75px] text-[#181D17]">
            حجز مؤكد للنزيل{" "}
            <strong className="font-semibold text-[#181D17]">خالد العتيبي</strong>{" "}
            لمدة 3 ليالٍ (18 - 21 سبتمبر 2026). السعر الإجمالي للحجز{" "}
            <strong className="font-bold text-[#34422A]">862.50 ر.س</strong>، وتم
            إرسال كود الدخول ورسالة التأكيد التفصيلية عبر WhatsApp آلياً.
          </p>
        ),
        performer: {
          name: "بوابة الحجز الإلكتروني (OTA Integration)",
          role: " — معتمد آلياً",
          iconType: "ota",
        },
        ip: "198.51.100.44",
        hash: "7f83b...d9069",
      },
      {
        id: "2",
        reference: "#EVT-8921",
        title: "تم تحديث السعر الأساسي لليلة",
        badgeText: "تعديل أسعار",
        badgeBg: "bg-[#E5EAE0]",
        badgeTextColor: "text-[#181D17]",
        badgeDotColor: "bg-[#34422A]",
        date: "16 سبتمبر 2026 — 11:42 ص",
        nodeBg: "bg-[#E5EAE0]",
        nodeIconType: "price",
        activityType: "pricing",
        performerCategory: "admin",
        contentNode: (
          <p className="text-[14px] leading-[22.75px] text-[#181D17]">
            تم تعديل السعر الأساسي للوحدة من{" "}
            <span className="line-through text-[#75786F]">220 ر.س</span> إلى{" "}
            <strong className="font-bold text-[#34422A] text-[16px] sm:text-[18px]">
              250 ر.س / ليلة
            </strong>{" "}
            (<strong className="font-bold text-[#34422A]">+13.6%</strong>) بناءً على
            طلب المالك محمد العتيبي وتحديث خطة تسعير موسم فعاليات الخريف.
          </p>
        ),
        performer: {
          name: "محمد أحمد",
          role: " — مدير المنصة الإدارية",
          iconType: "admin",
        },
        ip: "10.0.12.89 (Riyadh HQ)",
        hash: "3b0c4...2b855",
      },
      {
        id: "3",
        reference: "#EVT-8794",
        title: "تغيير إعدادات وسياسة كود الدخول الذكي",
        badgeText: "أمان وأكواد",
        badgeBg: "bg-[#DDE4DC]",
        badgeTextColor: "text-[#171D18]",
        badgeDotColor: "bg-[#394039]",
        date: "14 سبتمبر 2026 — 05:15 م",
        nodeBg: "bg-[#DDE4DC]",
        nodeIconType: "lock",
        activityType: "security",
        performerCategory: "admin",
        contentNode: (
          <p className="text-[14px] leading-[22.75px] text-[#181D17]">
            تم ضبط سياسة إصدار كود الدخول الذكي إلى «
            <strong className="font-semibold text-[#181D17]">
              كود ديناميكي مؤقت لكل حجز
            </strong>
            » مع تحديد الصلاحية تلقائياً من ساعة تسجيل الوصول حتى ساعة المغادرة،
            وتم ربط المزامنة السحابية المباشرة مع بوابة القفل الإلكتروني الذكي{" "}
            <strong className="font-bold text-[#181D17]">TTLock G3 Gateway</strong>.
          </p>
        ),
        performer: {
          name: "محمد أحمد",
          role: " — مدير المنصة الإدارية",
          iconType: "admin",
        },
        ip: "10.0.12.89",
        hash: "e3b0c...52b85",
      },
      {
        id: "4",
        reference: "#EVT-8411",
        title: "تحديث بيانات الوحدة والتجهيزات",
        badgeText: "بيانات الوحدة",
        badgeBg: "bg-[#D8E8CB]",
        badgeTextColor: "text-[#121F0D]",
        badgeDotColor: "bg-[#34422A]",
        date: "02 سبتمبر 2026 — 09:30 ص",
        nodeBg: "bg-[#D8E8CB]",
        nodeIconType: "amenities",
        activityType: "unit_data",
        performerCategory: "owner",
        contentNode: (
          <p className="text-[14px] leading-[22.75px] text-[#181D17]">
            تم تحديث قائمة المرافق والتجهيزات الخاصة بالوحدة {unitNumber}: إضافة «
            <strong className="font-semibold text-[#181D17]">
              إنترنت ألياف ضوئية فائق السرعة 500Mbps
            </strong>
            » و«
            <strong className="font-semibold text-[#181D17]">
              موقف سيارات قبو مظلل خاص
            </strong>
            »، مع إعادة صياغة الوصف التسويقي لعرض الميزات الجديدة على منصات الحجز.
          </p>
        ),
        tags: [
          { label: "موقف قبو خاص", icon: "parking" },
          { label: "إنترنت فائق السرعة", icon: "wifi" },
        ],
        performer: {
          name: "محمد العتيبي",
          role: " — مالك العقار المعتمد",
          iconType: "owner",
        },
        ip: "94.200.15.11 (Mobile App)",
        hash: "4a5e1...2c2bc",
      },
      {
        id: "5",
        reference: "#EVT-8230",
        title: "تطبيق تسعير خاص لعطلة نهاية الأسبوع",
        badgeText: "تعديل أسعار",
        badgeBg: "bg-[#E5EAE0]",
        badgeTextColor: "text-[#181D17]",
        badgeDotColor: "bg-[#34422A]",
        date: "28 أغسطس 2026 — 02:10 م",
        nodeBg: "bg-[#E5EAE0]",
        nodeIconType: "weekend",
        activityType: "pricing",
        performerCategory: "owner",
        contentNode: (
          <p className="text-[14px] leading-[22.75px] text-[#181D17]">
            تفعيل قاعدة تسعير عطلة نهاية الأسبوع (الخميس والجمعة) بمبلغ{" "}
            <strong className="font-bold text-[#34422A]">280 ر.س / ليلة</strong>{" "}
            وتفعيل ميزة الخصم الديناميكي للحجوزات الأسبوعية الطويلة بنسبة{" "}
            <strong className="font-semibold text-[#181D17]">10%</strong>.
          </p>
        ),
        performer: {
          name: "محمد العتيبي",
          role: " — مالك العقار المعتمد",
          iconType: "owner",
        },
        ip: "94.200.15.11 (Mobile App)",
        hash: "9b2cf...6a6c4",
      },
      {
        id: "6",
        reference: "#EVT-8001",
        title: "إنشاء وتوثيق الوحدة العقارية",
        badgeText: "إنشاء أصل",
        badgeBg: "bg-[#34422A]",
        badgeTextColor: "text-white",
        badgeDotColor: "bg-[#D8E8CB]",
        date: "15 أغسطس 2026 — 10:00 ص",
        nodeBg: "bg-[#34422A]",
        nodeIconType: "creation",
        activityType: "creation",
        performerCategory: "admin",
        contentNode: (
          <p className="text-[14px] leading-[22.75px] text-[#181D17]">
            تسجيل الوحدة {unitNumber} كأصل عقاري فرعي ذي صك مستقل تابع لـ{" "}
            <strong className="font-semibold text-[#181D17]">
              {propertyName} (PR-1048)
            </strong>
            ، ومطابقة وثائق صك الملكية الرقمي الصادر من الهيئة العامة للعقار،
            وتفعيل حالة الوحدة رسمياً كـ «جاهزة للإدراج والتأجير».
          </p>
        ),
        performer: {
          name: "محمد أحمد",
          role: " — مدير المنصة الإدارية",
          iconType: "admin",
        },
        ip: "10.0.12.89 (Riyadh HQ)",
        hash: "01a4e...9d2d9",
      },
    ],
    [unitNumber, propertyName]
  );

  // Filter events by search, type, and performer
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchSearch =
        search.trim() === "" ||
        ev.title.includes(search.trim()) ||
        ev.reference.toLowerCase().includes(search.toLowerCase()) ||
        ev.performer.name.includes(search.trim()) ||
        ev.hash.toLowerCase().includes(search.toLowerCase());

      const matchType =
        selectedType === "all" || ev.activityType === selectedType;

      const matchPerformer =
        selectedPerformer === "all" ||
        ev.performerCategory === selectedPerformer;

      return matchSearch && matchType && matchPerformer;
    });
  }, [events, search, selectedType, selectedPerformer]);

  const totalFiltered = filteredEvents.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const currentPage = Math.min(activePage, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + pageSize
  );

  // Activity type dropdown options
  const activityTypeOptions = [
    { value: "all", label: "كل أنواع الأنشطة" },
    { value: "bookings", label: "الحجوزات والنزلاء" },
    { value: "pricing", label: "تعديل أسعار" },
    { value: "security", label: "أمان وأكواد" },
    { value: "unit_data", label: "بيانات الوحدة" },
    { value: "creation", label: "إنشاء أصل" },
  ];

  // Performer dropdown options
  const performerOptions = [
    { value: "all", label: "كافة المنفذين" },
    { value: "admin", label: "إدارة المنصة (محمد أحمد)" },
    { value: "owner", label: "مالك العقار (محمد العتيبي)" },
    { value: "ota", label: "بوابة الحجز (OTA)" },
  ];

  const handleExportPdf = () => {
    toast.success("جاري تصدير وتجهيز تقرير سجل نشاط الوحدة (PDF)...");
  };

  return (
    <div className="space-y-6 text-start" dir="rtl">
      {/* 1. TOP HERO GREETING BAR (Figma Node 1:15929) */}
      <div className="bg-white rounded-[16px] p-6 border border-[#EEF2E6] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          {/* Title */}
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#181D17] leading-[34px]">
            سجل نشاط الوحدة — الوحدة {unitNumber}
          </h1>

          {/* Subtitle / Metadata row */}
          <div className="flex items-center gap-2 flex-wrap text-[13px] leading-[20px] text-[#454840] mt-1.5">
            <div className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-[#454840] shrink-0" />
              <span>{propertyName}</span>
              <span className="text-[#75786F]">(PR-1048)</span>
            </div>

            <span className="text-[#C5C8BD]">•</span>
            <span>الرياض — حي العليا</span>

            <span className="text-[#C5C8BD]">•</span>
            <div className="flex items-center gap-1 text-[#34422A] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34422A] shrink-0" />
              <span>حساب معتمد وموثق</span>
            </div>

            <span className="text-[#C5C8BD]">•</span>
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#454840] shrink-0" />
              <span className="text-[#454840]">المالك:</span>
              <span className="font-semibold text-[#181D17]">محمد العتيبي</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Primary Action: Export PDF */}
          <button
            type="button"
            onClick={handleExportPdf}
            className="bg-[#4B5940] hover:bg-[#3D4934] text-white rounded-[12px] px-5 py-2.5 text-[14px] font-medium drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-2 transition-colors cursor-pointer select-none"
          >
            <Download className="w-[15px] h-[15px] shrink-0" />
            <span>تصدير سجل النشاط (PDF)</span>
          </button>

          {/* Secondary Action: Back */}
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="bg-white hover:bg-[#F6F8F4] border border-[#E5E8E2] text-[#252A24] rounded-[12px] px-4 py-2.5 text-[14px] font-medium flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span>العودة</span>
              <ArrowRight className="w-[14px] h-[14px] shrink-0 text-[#252A24]" />
            </button>
          ) : (
            <BackButton
              fallbackHref="/units/"
              className="bg-white hover:bg-[#F6F8F4] border border-[#E5E8E2] text-[#252A24] rounded-[12px] px-4 py-2.5 text-[14px] font-medium flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span>العودة</span>
              <ArrowRight className="w-[14px] h-[14px] shrink-0 text-[#252A24]" />
            </BackButton>
          )}
        </div>
      </div>

      {/* 2. AUDIT SUMMARY TELEMETRY (4 Bento-Style Indicator Cards - Figma Node 1:15966) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 (Rightmost): إجمالي الأحداث الموثقة */}
        <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#EEF2E6] flex flex-col justify-between min-h-[135px]">
          <div className="flex items-start justify-between w-full">
            <div className="bg-[#F1F5EB] rounded-[12px] size-[48px] flex items-center justify-center shrink-0">
              <History className="w-5 h-5 text-[#4B5940]" />
            </div>
            <div className="text-end">
              <span className="text-[#454840] text-[12px] font-semibold block leading-[18px]">
                إجمالي الأحداث الموثقة
              </span>
              <div className="flex items-baseline gap-1.5 justify-end mt-1">
                <span className="text-[#181D17] text-[30px] font-bold leading-[42px]">
                  18
                </span>
                <span className="text-[#75786F] text-[11px] font-normal">
                  حدثاً
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#454840] text-[11px] font-medium pt-3 mt-1 border-t border-[#F6F8F4]">
            <Calendar className="w-3.5 h-3.5 text-[#454840] shrink-0" />
            <span>سجل كامل منذ إدراج الأصل</span>
          </div>
        </div>

        {/* Card 2: تعديلات إدارة المنصة */}
        <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#EEF2E6] flex flex-col justify-between min-h-[135px]">
          <div className="flex items-start justify-between w-full">
            <div className="bg-[#F1F5EB] rounded-[12px] size-[48px] flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-5 h-5 text-[#4B5940]" />
            </div>
            <div className="text-end">
              <span className="text-[#454840] text-[12px] font-semibold block leading-[18px]">
                تعديلات إدارة المنصة
              </span>
              <div className="flex items-baseline gap-1.5 justify-end mt-1">
                <span className="text-[#181D17] text-[30px] font-bold leading-[42px]">
                  6
                </span>
                <span className="text-[#75786F] text-[11px] font-normal">
                  إجراءات
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#454840] text-[11px] font-medium pt-3 mt-1 border-t border-[#F6F8F4]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#454840] shrink-0" />
            <span>بواسطة المشرف المعتمد</span>
          </div>
        </div>

        {/* Card 3: أحداث الحجز والنزلاء */}
        <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#EEF2E6] flex flex-col justify-between min-h-[135px]">
          <div className="flex items-start justify-between w-full">
            <div className="bg-[#F1F5EB] rounded-[12px] size-[48px] flex items-center justify-center shrink-0">
              <CalendarCheck className="w-5 h-5 text-[#4B5940]" />
            </div>
            <div className="text-end">
              <span className="text-[#454840] text-[12px] font-semibold block leading-[18px]">
                أحداث الحجز والنزلاء
              </span>
              <div className="flex items-baseline gap-1.5 justify-end mt-1">
                <span className="text-[#181D17] text-[30px] font-bold leading-[42px]">
                  8
                </span>
                <span className="text-[#75786F] text-[11px] font-normal">
                  حركات
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#454840] text-[11px] font-medium pt-3 mt-1 border-t border-[#F6F8F4]">
            <Clock className="w-3.5 h-3.5 text-[#454840] shrink-0" />
            <span>آخر حجز مسجل اليوم</span>
          </div>
        </div>

        {/* Card 4 (Leftmost - Dark Green Card): الأمان وسلامة التشفير */}
        <div className="bg-[#34422A] text-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between min-h-[135px]">
          <div className="flex items-start justify-between w-full">
            <div className="bg-[#4B5940] rounded-[12px] size-[48px] flex items-center justify-center shrink-0 shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]">
              <ShieldCheck className="w-5 h-5 text-[#BCCCAC]" />
            </div>
            <div className="text-end">
              <span className="text-[#BCCCAC] text-[12px] font-semibold block leading-[18px]">
                الأمان وسلامة التشفير
              </span>
              <div className="flex items-baseline gap-1.5 justify-end mt-1">
                <span className="text-white text-[24px] font-bold leading-[34px]">
                  SHA-256
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#BCCCAC] text-[11px] font-medium pt-3 mt-1 border-t border-[#4B5940]/50">
            <span className="bg-[#D8E8CB] rounded-full size-[8px] shrink-0 inline-block shadow-[0_0_6px_rgba(216,232,203,0.8)]" />
            <span>غير قابل للتعديل (Immutable Log)</span>
          </div>
        </div>
      </div>

      {/* 3. FILTER CONTROLS GROUP (Figma Node 1:16033) */}
      <TableToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="ابحث في وصف النشاط، اسم المنفذ، أو الرقم المرجعي..."
      >
        {/* Timeframe filter */}
        <button
          type="button"
          onClick={() => toast.info("نطاق البحث: آخر 30 يوماً افتراضياً")}
          className="bg-[#EFF2EB] hover:bg-[#E2E7DE] h-10 rounded-full px-3.5 flex items-center gap-2 cursor-pointer transition-colors text-xs font-semibold text-[#181D17] select-none font-cairo"
        >
          <Calendar className="w-4 h-4 text-[#181D17] shrink-0" />
          <span>النطاق: آخر 30 يوم</span>
        </button>

        {/* Performer filter */}
        <div className="w-[145px]">
          <SelectDropdown
            value={selectedPerformer}
            onChange={setSelectedPerformer}
            options={performerOptions}
            triggerClassName="h-10 bg-[#EFF2EB] hover:bg-[#E2E7DE] border-0 rounded-full px-3.5 text-xs font-semibold text-[#181D17] font-cairo"
          />
        </div>

        {/* Type filter */}
        <div className="w-[160px]">
          <SelectDropdown
            value={selectedType}
            onChange={setSelectedType}
            options={activityTypeOptions}
            triggerClassName="h-10 bg-[#EFF2EB] hover:bg-[#E2E7DE] border-0 rounded-full px-3.5 text-xs font-semibold text-[#181D17] font-cairo"
          />
        </div>
      </TableToolbar>

      {/* 4. CHRONOLOGICAL AUDIT TIMELINE LAYOUT (Figma Node 1:16060) */}
      <div className="relative space-y-6 pt-2">
        {/* Continuous Vertical Guide Line behind icons on the right in RTL */}
        <div className="absolute start-[23px] top-[24px] bottom-[24px] w-[2px] bg-[#DFE4DB] hidden sm:block pointer-events-none" />

        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-[16px] p-12 text-center border border-[#E5E8E2]">
            <History className="w-12 h-12 text-[#75786F] mx-auto mb-3 opacity-40" />
            <h3 className="text-[16px] font-bold text-[#181D17]">
              لا توجد أحداث مطابقة لخيارات البحث أو التصفية
            </h3>
            <p className="text-[12px] text-[#75786F] mt-1">
              جرب تغيير كلمات البحث أو إعادة تعيين الفلاتر لعرض السجل الكامل
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedType("all");
                setSelectedPerformer("all");
              }}
              className="mt-4 px-4 py-2 bg-[#F1F5EB] hover:bg-[#E5EAE0] rounded-[10px] text-xs font-semibold text-[#181D17] transition-colors cursor-pointer"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        ) : (
          paginatedEvents.map((evt) => (
            <div
              key={evt.id}
              className="flex items-start gap-4 relative w-full group"
            >
              {/* 1. Timeline Node Icon (On the Right in RTL) */}
              <div
                className={`${evt.nodeBg} drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] size-[48px] flex items-center justify-center shrink-0 z-10`}
              >
                {evt.nodeIconType === "booking" && (
                  <CalendarCheck className="w-5 h-5 text-[#34422A]" />
                )}
                {evt.nodeIconType === "price" && (
                  <Tag className="w-5 h-5 text-[#34422A]" />
                )}
                {evt.nodeIconType === "lock" && (
                  <KeyRound className="w-5 h-5 text-[#171D18]" />
                )}
                {evt.nodeIconType === "amenities" && (
                  <Building2 className="w-5 h-5 text-[#34422A]" />
                )}
                {evt.nodeIconType === "weekend" && (
                  <Percent className="w-5 h-5 text-[#34422A]" />
                )}
                {evt.nodeIconType === "creation" && (
                  <Sparkles className="w-5 h-5 text-white" />
                )}
              </div>

              {/* 2. Event Card Container (After icon, to the Left in RTL) */}
              <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EEF2E6] rounded-[16px] p-5 sm:p-6 flex-1 space-y-4">
                {/* Header row */}
                <div className="border-b border-[#F1F5EB] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  {/* Right side in RTL: Title, Ref, Badge */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Badge */}
                    <div
                      className={`${evt.badgeBg} ${evt.badgeTextColor} px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shrink-0`}
                    >
                      <span>{evt.badgeText}</span>
                      <span
                        className={`${evt.badgeDotColor} rounded-full size-[6px] shrink-0`}
                      />
                    </div>

                    {/* Title */}
                    <h2 className="text-[16px] sm:text-[18px] font-bold text-[#181D17] leading-[28px]">
                      {evt.title}
                    </h2>

                    {/* Ref */}
                    <span className="text-[#75786F] text-[11px] font-mono font-medium">
                      {evt.reference}
                    </span>
                  </div>

                  {/* Left side in RTL: Timestamp */}
                  <div className="flex items-center gap-1.5 text-[#75786F] text-[11px] font-medium shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#75786F]" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                {/* Event Content Description */}
                <div>
                  {evt.contentNode}

                  {/* Optional Tags (e.g. for Event 4) */}
                  {evt.tags && evt.tags.length > 0 && (
                    <div className="flex items-center gap-2 pt-2.5 flex-wrap">
                      {evt.tags.map((tag, idx) => (
                        <div
                          key={idx}
                          className="bg-[#EBEFE6] px-2.5 py-1 rounded-[8px] flex items-center gap-1 text-[11px] font-medium text-[#181D17]"
                        >
                          {tag.icon === "parking" ? (
                            <Car className="w-3.5 h-3.5 text-[#181D17]" />
                          ) : (
                            <Wifi className="w-3.5 h-3.5 text-[#181D17]" />
                          )}
                          <span>{tag.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Metadata row (Performer, IP, Hash) */}
                <div className="bg-[#F1F5EB] rounded-[12px] p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
                  {/* Right side in RTL: Performer */}
                  <div className="flex items-center gap-2.5">
                    <div className="bg-[#EBEFE6] rounded-[8px] size-[28px] flex items-center justify-center shrink-0">
                      {evt.performer.iconType === "ota" ? (
                        <Globe className="w-3.5 h-3.5 text-[#34422A]" />
                      ) : evt.performer.iconType === "admin" ? (
                        <Sliders className="w-3.5 h-3.5 text-[#34422A]" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-[#34422A]" />
                      )}
                    </div>
                    <div className="text-[13px] leading-[20px]">
                      <span className="text-[#454840]">المنفذ: </span>
                      <span className="font-semibold text-[#181D17]">
                        {evt.performer.name}
                      </span>
                      <span className="text-[#454840]">
                        {evt.performer.role}
                      </span>
                    </div>
                  </div>

                  {/* Left side in RTL: Hash & IP */}
                  <div className="flex items-center gap-3 text-[#75786F] text-[12px] font-mono flex-wrap">
                    <span>{evt.ip}</span>
                    <span className="text-[#C5C8BD]">•</span>
                    <span>{evt.hash}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5. ELEGANT PAGINATION CONTROLS (Figma Node 1:16324) */}
      <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EEF2E6] rounded-[16px] overflow-hidden">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalFiltered}
          fromIndex={totalFiltered === 0 ? 0 : startIndex + 1}
          toIndex={Math.min(startIndex + pageSize, totalFiltered)}
          pageSize={pageSize}
          pageSizeOptions={[5, 10]}
          onPageChange={(page) => setActivePage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setActivePage(1);
          }}
          entityName="حدث"
          pluralEntityName="أحداث"
          registeredLabel="مسجل"
        />
      </div>
    </div>
  );
}
