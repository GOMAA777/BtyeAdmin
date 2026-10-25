"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Download,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Zap,
  Sliders,
  Search,
  ChevronDown,
  Wrench,
  ExternalLink,
  ShieldCheck,
  User,
  Lock,
  Wifi,
  Battery,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/shared/back-button";
import { OperationsAdvancedFilterDrawer } from "./operations-advanced-filter-drawer";
import { OperationFilterState, initialOperationFilterState } from "../types";

interface FullOperationsLogViewProps {
  unitId?: string;
}

export function FullOperationsLogView({ unitId: propUnitId }: FullOperationsLogViewProps) {
  const searchParams = useSearchParams();
  const unitId = propUnitId || searchParams?.get("unitId") || "204";
  const [filterCategory, setFilterCategory] = useState<"all" | "cleaning" | "maintenance">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<OperationFilterState>(initialOperationFilterState);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.type !== "all") count++;
    if (advancedFilters.status !== "all") count++;
    if (advancedFilters.priority !== "all") count++;
    if (advancedFilters.city !== "all") count++;
    if (advancedFilters.property !== "all") count++;
    if (advancedFilters.assigneeStatus !== "all") count++;
    if (advancedFilters.assigneeName !== "all") count++;
    if (advancedFilters.timePeriod !== "all") count++;
    if (advancedFilters.sortBy !== "default") count++;
    return count;
  }, [advancedFilters]);

  const handleExport = () => {
    toast.success("جاري تصدير سجل التشغيل الكامل للوحدة (PDF / Excel)...");
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto font-cairo">
      {/* 1. PAGE HEADER BAR (Figma 1:20794) */}
      <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Right side: Title & Metadata */}
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <BackButton
              fallbackHref="/operations/"
              className="w-9 h-9 rounded-xl bg-[#ebefe6] hover:bg-[#dfe4db] flex items-center justify-center text-[#34422a] transition-colors"
            />
            <h1 className="text-2xl font-semibold text-[#181d17] tracking-[-0.6px]">
              سجل التشغيل — الوحدة {unitId}
            </h1>
            <div className="bg-[#d8e8cb] flex items-center gap-[6px] px-3 py-1 rounded-full">
              <span className="text-[#34422a] text-[11px] font-medium leading-[16px]">
                متاحة للحجز
              </span>
              <span className="w-2 h-2 rounded-full bg-[#34422a]" />
            </div>
          </div>
          <p className="text-[13px] text-[#454840] mt-2 mr-12 leading-relaxed">
            التوثيق الزمني التشغيلي المباشر لمهام النظافة والتعقيم وبلاغات الصيانة والأعطال الفنية للوحدة العقارية •
          </p>
        </div>

        {/* Left side: Action Button Group */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/operations/maintenance/new/"
            className="h-[44px] px-5 rounded-[12px] bg-[#34422a] hover:bg-[#283420] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>إنشاء بلاغ صيانة</span>
          </Link>

          <button
            type="button"
            onClick={handleExport}
            className="h-[44px] px-5 rounded-[12px] bg-[#f1f5eb] hover:bg-[#e4ebdc] text-[#34422a] text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#34422a]" />
            <span>تصدير السجل (PDF/Excel)</span>
          </button>
        </div>
      </div>

      {/* 2. Metadata Pill Strip (Figma 1:20820) */}
      <div className="bg-white rounded-[12px] p-4 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-gray-100">
          {/* 1: الوحدة والتفاصيل */}
          <div className="flex items-center gap-3 pt-2 lg:pt-0">
            <div className="size-[40px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center text-[#34422a] shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-[#75786f] font-medium block leading-[16px]">الوحدة والتفاصيل</span>
              <p className="font-semibold text-[#181d17] text-[14px] mt-0.5 leading-[20px]">
                {unitId} (الطابق الثاني - 3 غرف وصالة)
              </p>
            </div>
          </div>

          {/* 2: العقار والموقع */}
          <div className="flex items-center gap-3 pt-2 lg:pt-0 pr-0 lg:pr-4">
            <div className="size-[40px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center text-[#34422a] shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-[#75786f] font-medium block leading-[16px]">العقار والموقع</span>
              <p className="font-semibold text-[#181d17] text-[14px] mt-0.5 leading-[20px]">
                عمارة النخيل (حي العليا - الرياض)
              </p>
            </div>
          </div>

          {/* 3: مالك العقار */}
          <div className="flex items-center gap-3 pt-2 lg:pt-0 pr-0 lg:pr-4">
            <div className="size-[40px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center text-[#34422a] shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-[#75786f] font-medium block leading-[16px]">مالك العقار</span>
              <p className="font-semibold text-[#181d17] text-[14px] mt-0.5 leading-[20px]">
                محمد العتيبي (OWN-4491)
              </p>
            </div>
          </div>

          {/* 4: مؤشر الجاهزية */}
          <div className="flex items-center gap-3 pt-2 lg:pt-0 pr-0 lg:pr-4">
            <div className="size-[40px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center text-[#34422a] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-[#75786f] font-medium block leading-[16px]">مؤشر الجاهزية</span>
              <p className="font-semibold text-[#181d17] text-[14px] mt-0.5 leading-[20px]">
                100% معتمدة بالكامل
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section - High-Density KPI Metrics Strip (Figma 1:20857) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {/* Card 1: عمليات الشهر الحالي */}
        <div className="bg-white rounded-[16px] p-4 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs flex items-center justify-between min-h-[122px]">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#75786f] block leading-[16px]">عمليات الشهر الحالي</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[24px] font-bold text-[#181d17] leading-[34px]">8</span>
              <span className="text-[11px] font-medium text-[#75786f]">عمليات مسجلة</span>
            </div>
            <p className="text-[11px] font-medium text-[#34422a] leading-[16px]">5 تنظيف • 3 صيانة فنية</p>
          </div>
          <div className="size-[44px] rounded-[12px] bg-[rgba(216,232,203,0.6)] flex items-center justify-center text-[#34422a] shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: متوسط دورة التنظيف */}
        <div className="bg-white rounded-[16px] p-4 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs flex items-center justify-between min-h-[122px]">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#75786f] block leading-[16px]">متوسط دورة التنظيف</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[24px] font-bold text-[#181d17] leading-[34px]">48</span>
              <span className="text-[11px] font-medium text-[#75786f]">دقيقة / دورة</span>
            </div>
            <p className="text-[11px] font-medium text-[#454840] leading-[16px]">ضمن النطاق القياسي (أقل من 60 د)</p>
          </div>
          <div className="size-[44px] rounded-[12px] bg-[rgba(216,232,203,0.6)] flex items-center justify-center text-[#34422a] shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: معدل استجابة الصيانة */}
        <div className="bg-white rounded-[16px] p-4 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs flex items-center justify-between min-h-[122px]">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#75786f] block leading-[16px]">معدل استجابة الصيانة</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[24px] font-bold text-[#181d17] leading-[34px]">35</span>
              <span className="text-[11px] font-medium text-[#75786f]">دقيقة للاستجابة</span>
            </div>
            <p className="text-[11px] font-medium text-[#34422a] leading-[16px]">أسرع بـ 12 دقيقة من SLA المنصة</p>
          </div>
          <div className="size-[44px] rounded-[12px] bg-[rgba(216,232,203,0.6)] flex items-center justify-center text-[#34422a] shrink-0">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: الالتزام بقوائم الفحص */}
        <div className="bg-white rounded-[16px] p-4 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs flex items-center justify-between min-h-[122px]">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#75786f] block leading-[16px]">الالتزام بقوائم الفحص</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[24px] font-bold text-[#181d17] leading-[34px]">100%</span>
              <span className="text-[11px] font-semibold text-[#34422a]">ممتاز</span>
            </div>
            <p className="text-[11px] font-medium text-[#454840] leading-[16px]">اعتماد رقمي بالصور والشواهد</p>
          </div>
          <div className="size-[44px] rounded-[12px] bg-[rgba(216,232,203,0.6)] flex items-center justify-center text-[#34422a] shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 4. Operations Log Core Container (Figma 1:20906) */}
      <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs space-y-6">
        {/* Category Tabs Navigation (Figma 1:20907) */}
        <div className="flex justify-center">
          <div className="bg-[#f1f5eb] p-[6px] rounded-[12px] flex items-center gap-[8px]">
            <button
              type="button"
              onClick={() => setFilterCategory("all")}
              className={cn(
                "flex items-center gap-[8px] px-[16px] py-[8px] rounded-[8px] text-[14px] font-semibold transition-all cursor-pointer",
                filterCategory === "all"
                  ? "bg-white text-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs"
                  : "text-[#454840] hover:text-[#181d17]"
              )}
            >
              <span>الكل</span>
              <span
                className={cn(
                  "px-[8px] py-[2px] rounded-full text-[11px] font-semibold",
                  filterCategory === "all" ? "bg-[#d8e8cb] text-[#5a6952]" : "bg-[#dfe4db] text-[#454840]"
                )}
              >
                24
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterCategory("cleaning")}
              className={cn(
                "flex items-center gap-[8px] px-[16px] py-[8px] rounded-[8px] text-[14px] font-semibold transition-all cursor-pointer",
                filterCategory === "cleaning"
                  ? "bg-white text-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs"
                  : "text-[#454840] hover:text-[#181d17]"
              )}
            >
              <span>التنظيف والتعقيم</span>
              <span
                className={cn(
                  "px-[8px] py-[2px] rounded-full text-[11px] font-semibold",
                  filterCategory === "cleaning" ? "bg-[#d8e8cb] text-[#5a6952]" : "bg-[#dfe4db] text-[#454840]"
                )}
              >
                16
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterCategory("maintenance")}
              className={cn(
                "flex items-center gap-[8px] px-[16px] py-[8px] rounded-[8px] text-[14px] font-semibold transition-all cursor-pointer",
                filterCategory === "maintenance"
                  ? "bg-white text-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shadow-xs"
                  : "text-[#454840] hover:text-[#181d17]"
              )}
            >
              <span>الصيانة الفنية</span>
              <span
                className={cn(
                  "px-[8px] py-[2px] rounded-full text-[11px] font-semibold",
                  filterCategory === "maintenance" ? "bg-[#d8e8cb] text-[#5a6952]" : "bg-[#dfe4db] text-[#454840]"
                )}
              >
                8
              </span>
            </button>
          </div>
        </div>

        {/* Filter & Search Toolbar (Figma 1:20924) */}
        <div className="bg-[#f1f5eb] p-[8px] rounded-[12px] flex flex-col md:flex-row items-center gap-[8px]">
          {/* Search Input */}
          <div className="relative flex-[1_0_0] w-full min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث برقم المهمة، المنفذ، أو نوع الإجراء..."
              className="w-full h-[40px] bg-white rounded-[8px] pl-[12px] pr-[36px] text-[13px] text-[#181d17] placeholder:text-[#75786f] focus:outline-none focus:ring-1 focus:ring-[#34422a] transition-all"
            />
            <Search className="absolute right-[12px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#75786f]" />
          </div>

          {/* Period Filter */}
          <div className="h-[40px] bg-white rounded-[8px] px-[12px] flex items-center justify-between gap-3 text-[13px] text-[#181d17] cursor-pointer hover:bg-gray-50 border border-transparent shrink-0">
            <span>آخر 30 يوماً (سبتمبر 2026)</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#75786f]" />
          </div>

          {/* Status Filter */}
          <div className="h-[40px] bg-white rounded-[8px] px-[12px] flex items-center justify-between gap-3 text-[13px] text-[#181d17] cursor-pointer hover:bg-gray-50 border border-transparent shrink-0">
            <span>جميع الحالات</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#75786f]" />
          </div>

          {/* Assignee / Team Filter */}
          <div className="h-[40px] bg-white rounded-[8px] px-[12px] flex items-center justify-between gap-3 text-[13px] text-[#181d17] cursor-pointer hover:bg-gray-50 border border-transparent shrink-0">
            <span>كافة الفرق والمنفذين</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#75786f]" />
          </div>

          {/* Advanced Filter Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className={cn(
              "h-[40px] px-3.5 rounded-[8px] text-[13px] font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 select-none",
              activeFiltersCount > 0
                ? "bg-[#34422a] text-white shadow-xs"
                : "bg-white hover:bg-gray-50 text-[#181d17]"
            )}
            title="التصفية المتقدمة"
          >
            <span>تصفية متقدمة</span>
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#d8e8cb] text-[#34422a] text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Vertical Operational Timeline Section (Figma 1:20953) */}
        <div className="relative pr-[24px] space-y-8">
          {/* Continuous Timeline Spine */}
          <div className="absolute right-[23px] top-[24px] bottom-[24px] w-[2px] bg-[#dfe4db]" />

          {/* TIMELINE GROUP 1: 18 سبتمبر 2026 (Cleaning Track) */}
          {(filterCategory === "all" || filterCategory === "cleaning") && (
            <div className="space-y-4">
              {/* Date Header Pill */}
              <div className="flex items-center gap-[12px] relative z-10">
                <div className="size-[48px] rounded-[12px] bg-[#ebefe6] flex items-center justify-center shrink-0 border border-[#dfe4db]">
                  <Calendar className="w-5 h-5 text-[#34422a]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#181d17] leading-[28px]">18 سبتمبر 2026</h3>
                  <p className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                    دورة تنظيف وتعقيم كاملة — المهمة CL-10482
                  </p>
                </div>
              </div>

              {/* Events under Group 1 */}
              <div className="pr-[56px] space-y-4">
                {/* Event 1: Completed Cleaning with 4 Photos */}
                <div className="bg-[rgba(241,245,235,0.6)] border border-[#e0e7db] rounded-[16px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] space-y-3">
                  {/* Top Row */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="bg-[#d8e8cb] text-[#5a6952] rounded-full px-3 py-1 text-[11px] font-semibold leading-[16px]">
                        تنظيف وتعقيم (CL-10482)
                      </span>
                      <h4 className="text-[14px] font-bold text-[#181d17] leading-[20px]">
                        اكتمل التنظيف واعتماد الجودة الفنية
                      </h4>
                    </div>
                    <span className="text-[11px] font-medium text-[#75786f] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      01:07 م
                    </span>
                  </div>

                  {/* Paragraph */}
                  <p className="text-[14px] text-[#454840] leading-[22.75px]">
                    اكتملت أعمال التنظيف والتعقيم الشاملة بنجاح عقب مغادرة النزيل في الحجز{" "}
                    <span className="font-medium text-[#181d17]">(BK-2026-1048)</span>. تم اعتماد قائمة الفحص الرقمية بنسبة{" "}
                    <span className="font-bold text-[#34422a]">5/5</span> وتوثيق 4 صور ميدانية للأثاث، دورات المياه، ومفاتيح التكييف.
                  </p>

                  {/* 4 Photo Gallery Verification Embed */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
                    <div className="h-[96px] rounded-[12px] overflow-hidden relative bg-[#ebefe6] group">
                      <img
                        src="/images/operations/figma_photo_kitchen.png"
                        alt="المطبخ والأجهزة"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/images/operations/maintenance_3.webp";
                        }}
                      />
                      <div className="absolute bottom-[4px] right-[4px] bg-[rgba(255,255,255,0.85)] px-[6px] py-[2px] rounded-[4px] text-[10px] font-normal text-[#181d17]">
                        المطبخ والأجهزة
                      </div>
                    </div>

                    <div className="h-[96px] rounded-[12px] overflow-hidden relative bg-[#ebefe6] group">
                      <img
                        src="/images/operations/figma_photo_bathroom.png"
                        alt="دورة المياه"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/images/operations/maintenance_4.webp";
                        }}
                      />
                      <div className="absolute bottom-[4px] right-[4px] bg-[rgba(255,255,255,0.85)] px-[6px] py-[2px] rounded-[4px] text-[10px] font-normal text-[#181d17]">
                        دورة المياه
                      </div>
                    </div>

                    <div className="h-[96px] rounded-[12px] overflow-hidden relative bg-[#ebefe6] group">
                      <img
                        src="/images/operations/figma_photo_bedroom.png"
                        alt="غرفة النوم الرئيسية"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/images/operations/maintenance_5.webp";
                        }}
                      />
                      <div className="absolute bottom-[4px] right-[4px] bg-[rgba(255,255,255,0.85)] px-[6px] py-[2px] rounded-[4px] text-[10px] font-normal text-[#181d17]">
                        غرفة النوم الرئيسية
                      </div>
                    </div>

                    <div className="h-[96px] rounded-[12px] overflow-hidden relative bg-[#ebefe6] group">
                      <img
                        src="/images/operations/figma_photo_living.png"
                        alt="الصالة الرئيسية"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/images/operations/maintenance_6.webp";
                        }}
                      />
                      <div className="absolute bottom-[4px] right-[4px] bg-[rgba(255,255,255,0.85)] px-[6px] py-[2px] rounded-[4px] text-[10px] font-normal text-[#181d17]">
                        الصالة الرئيسية
                      </div>
                    </div>
                  </div>

                  {/* Automated Result Notice & Actor */}
                  <div className="bg-white rounded-[12px] p-2 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                    {/* Actor */}
                    <div className="flex items-center gap-2">
                      <div className="size-[32px] rounded-full bg-[#d8e8cb] text-[#34422a] font-bold text-[12px] flex items-center justify-center shrink-0">
                        أس
                      </div>
                      <div>
                        <span className="text-[12px] font-semibold text-[#181d17] block leading-[18px]">أحمد سالم</span>
                        <span className="text-[11px] font-medium text-[#75786f] block leading-[16px]">
                          مشرف ميداني — شركة النقاء للنظافة
                        </span>
                      </div>
                    </div>

                    {/* Result Pill & Button */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="bg-[#ebefe6] rounded-[8px] px-3 py-1 flex items-center gap-1.5 text-[11px] text-[#454840]">
                        <Sparkles className="w-3.5 h-3.5 text-[#34422a]" />
                        <span>
                          تحويل تلقائي لحالة الوحدة إلى: <strong className="font-bold text-[#34422a]">متاحة</strong>
                        </span>
                      </div>
                      <Link
                        href="/operations/cleaning/CL-10482/"
                        className="bg-[#34422a] text-white rounded-[8px] px-3 py-1.5 text-[11px] font-medium flex items-center gap-1 hover:bg-[#283420] transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 text-white" />
                        <span>عرض مهمة التنظيف CL-10482</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Event 2: Start cleaning */}
                <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] rounded-[16px] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#ebefe6] text-[#454840] rounded-full px-3 py-1 text-[11px] font-medium">
                        تنظيف وتعقيم (CL-10482)
                      </span>
                      <h4 className="text-[14px] font-semibold text-[#181d17]">
                        بدأ التنظيف والمباشرة الميدانية
                      </h4>
                    </div>
                    <span className="text-[11px] font-medium text-[#75786f] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      12:25 م
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-[14px] text-[#454840] leading-[22px]">
                      تم تسجيل دخول الطاقم الميداني للوحدة عبر كود الدخول المؤقت الذكي{" "}
                      <span className="bg-[#ebefe6] rounded-[4px] px-2 py-0.5 font-mono text-[14px] text-[#181d17]">
                        #9281-OTP
                      </span>{" "}
                      (صالح لمدة 90 دقيقة).
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="size-[24px] rounded-full bg-[#dfe4db] flex items-center justify-center text-[#75786f]">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="text-[11px] font-medium text-[#181d17]">المنفذ: أحمد سالم</span>
                    </div>
                  </div>
                </div>

                {/* Event 3: Assign task */}
                <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] rounded-[16px] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#ebefe6] text-[#454840] rounded-full px-3 py-1 text-[11px] font-medium">
                        تنظيف وتعقيم (CL-10482)
                      </span>
                      <h4 className="text-[14px] font-semibold text-[#181d17]">
                        تم تعيين المهمة إلى طاقم النظافة
                      </h4>
                    </div>
                    <span className="text-[11px] font-medium text-[#75786f] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      11:40 ص
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[14px] text-[#454840] leading-[22px]">
                      قام محرك التوزيع التلقائي بتعيين المشرف أحمد سالم مع إرسال إشعار فوري عبر تطبيق الجوال ورسالة WhatsApp لمركز عمليات شركة النقاء.
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#75786f]">
                      <Sparkles className="w-3.5 h-3.5 text-[#34422a]" />
                      <span>نظام الأتمتة الذكي (إشراف: محمد أحمد)</span>
                    </div>
                  </div>
                </div>

                {/* Event 4: Auto Create Task */}
                <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] rounded-[16px] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#ebefe6] text-[#454840] rounded-full px-3 py-1 text-[11px] font-medium">
                        تنظيف وتعقيم (CL-10482)
                      </span>
                      <h4 className="text-[14px] font-semibold text-[#181d17]">
                        تم إنشاء مهمة التنظيف تلقائياً
                      </h4>
                    </div>
                    <span className="text-[11px] font-medium text-[#75786f] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      11:00 ص
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-[14px] text-[#454840] leading-[22px]">
                      تم إنشاء البلاغ آلياً إثر تسجيل مغادرة النزيل (Check-out) في موعده المحدد من الحجز BK-2026-1048.
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0 text-[11px] font-medium text-[#75786f]">
                      <Zap className="w-3.5 h-3.5 text-[#34422a]" />
                      <span>أتمتة النظام (Check-out Trigger)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TIMELINE GROUP 2: 17 سبتمبر 2026 (Maintenance Track) */}
          {(filterCategory === "all" || filterCategory === "maintenance") && (
            <div className="space-y-4 pt-4">
              {/* Date Header Pill */}
              <div className="flex items-center gap-[12px] relative z-10">
                <div className="size-[48px] rounded-[12px] bg-[#ebefe6] flex items-center justify-center shrink-0 border border-[#dfe4db]">
                  <Wrench className="w-5 h-5 text-[#34422a]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#181d17] leading-[28px]">17 سبتمبر 2026</h3>
                  <p className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                    بلاغ صيانة فنية عاجل — البلاغ MT-2048
                  </p>
                </div>
              </div>

              {/* Events under Group 2 */}
              <div className="pr-[56px] space-y-4">
                {/* Event 5: Completed Maintenance with Diagnostic Box */}
                <div className="bg-[rgba(241,245,235,0.6)] border border-[#e0e7db] rounded-[16px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="bg-[#ffdad6] text-[#93000a] rounded-full px-3 py-1 text-[11px] font-semibold leading-[16px]">
                        صيانة فنية طارئة (MT-2048)
                      </span>
                      <h4 className="text-[14px] font-bold text-[#181d17] leading-[20px]">
                        تم إكمال الصيانة بنجاح واختبار الربط السحابي
                      </h4>
                    </div>
                    <span className="text-[11px] font-medium text-[#75786f] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      05:40 م
                    </span>
                  </div>

                  <p className="text-[14px] text-[#454840] leading-[22.75px]">
                    استبدال تروس محرك القفل الذكي (Smart Lock Actuator) وتحديث حزمة البرامج الثابتة (Firmware v4.12) واختبار كود الدخول الرقمي عبر البوابة بنجاح 3 مرات متتالية. تم فحص البطارية وهي عند مستوى{" "}
                    <span className="font-bold text-[#34422a]">100%</span>.
                  </p>

                  {/* Maintenance Diagnostic Box */}
                  <div className="bg-white rounded-[12px] p-2.5 grid grid-cols-1 md:grid-cols-3 gap-2 border border-[#e8ece3]">
                    <div className="flex items-center gap-2.5 p-1.5">
                      <div className="size-[32px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4 text-[#34422a]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-[#75786f] block leading-[16px]">الجزء المستبدل</span>
                        <span className="text-[12px] font-semibold text-[#181d17] block leading-[18px]">
                          محرك قفل باب إلكتروني Gen-3
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-1.5 border-t md:border-t-0 md:border-r border-gray-100">
                      <div className="size-[32px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center shrink-0">
                        <Wifi className="w-4 h-4 text-[#34422a]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-[#75786f] block leading-[16px]">حالة الاتصال السحابي</span>
                        <span className="text-[12px] font-semibold text-[#181d17] block leading-[18px]">
                          متصل بنجاح (زمن استجابة 18ms)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-1.5 border-t md:border-t-0 md:border-r border-gray-100">
                      <div className="size-[32px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center shrink-0">
                        <Battery className="w-4 h-4 text-[#34422a]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-[#75786f] block leading-[16px]">طاقة مستشعر القفل</span>
                        <span className="text-[12px] font-semibold text-[#181d17] block leading-[18px]">
                          بطاريات ليثيوم جديدة 100%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer with Actor and Button */}
                  <div className="bg-white rounded-[12px] p-2 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <div className="size-[32px] rounded-full bg-[#4b5940] text-white font-bold text-[12px] flex items-center justify-center shrink-0">
                        طع
                      </div>
                      <div>
                        <span className="text-[12px] font-semibold text-[#181d17] block leading-[18px]">م. طارق العسيري</span>
                        <span className="text-[11px] font-medium text-[#75786f] block leading-[16px]">
                          مهندس أنظمة أمنية — فريق الصيانة المعتمد
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="bg-[#ebefe6] rounded-[8px] px-3 py-1 flex items-center gap-1.5 text-[11px] text-[#454840]">
                        <ChevronLeft className="w-3.5 h-3.5 text-[#34422a]" />
                        <span>
                          تم تحويل الوحدة لمرحلة: <strong className="font-bold text-[#34422a]">تحت التنظيف</strong>
                        </span>
                      </div>
                      <Link
                        href="/operations/maintenance/MT-2048/"
                        className="bg-[#e5eae0] text-[#181d17] rounded-[8px] px-3 py-1.5 text-[11px] font-medium flex items-center gap-1 hover:bg-[#d8e0d1] transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 text-[#181d17]" />
                        <span>عرض بلاغ الصيانة MT-2048</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Event 6: Start maintenance */}
                <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] rounded-[16px] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#ebefe6] text-[#454840] rounded-full px-3 py-1 text-[11px] font-medium">
                        صيانة فنية (MT-2048)
                      </span>
                      <h4 className="text-[14px] font-semibold text-[#181d17]">
                        بدأت أعمال الصيانة الميدانية
                      </h4>
                    </div>
                    <span className="text-[11px] font-medium text-[#75786f] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      05:10 م
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-[14px] text-[#454840] leading-[22px]">
                      وصول مهندس الصيانة للوحدة وفك الغطاء الخارجي للقفل الرقمي لتشخيص تعطل حساس الاستجابة الحركية.
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="size-[24px] rounded-full bg-[#dfe4db] flex items-center justify-center text-[#75786f]">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="text-[11px] font-medium text-[#181d17]">المنفذ: م. طارق العسيري</span>
                    </div>
                  </div>
                </div>

                {/* Event 7: Assign ticket */}
                <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] rounded-[16px] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#ebefe6] text-[#454840] rounded-full px-3 py-1 text-[11px] font-medium">
                        صيانة فنية (MT-2048)
                      </span>
                      <h4 className="text-[14px] font-semibold text-[#181d17]">
                        تم تعيين البلاغ إلى فريق الصيانة المعتمد
                      </h4>
                    </div>
                    <span className="text-[11px] font-medium text-[#75786f] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      04:40 م
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-[14px] text-[#454840] leading-[22px]">
                      تمت المراجعة والتكليف العاجل لضمان جاهزية الوحدة قبل موعد وصول النزيل القادم صباح اليوم التالي.
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="size-[24px] rounded-full bg-[#dfe4db] flex items-center justify-center text-[#75786f]">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="text-[11px] font-medium text-[#181d17]">المنفذ: سارة القحطاني (مديرة العقار)</span>
                    </div>
                  </div>
                </div>

                {/* Event 8: Create ticket */}
                <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] rounded-[16px] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#ebefe6] text-[#454840] rounded-full px-3 py-1 text-[11px] font-medium">
                        صيانة فنية (MT-2048)
                      </span>
                      <h4 className="text-[14px] font-semibold text-[#181d17]">
                        تم إنشاء بلاغ صيانة MT-2048
                      </h4>
                    </div>
                    <span className="text-[11px] font-medium text-[#75786f] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      04:15 م
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-[14px] text-[#454840] leading-[22px]">
                      رصد إشارة تحذيرية من بوابة القفل السحابي بتعطل مستشعر فتح القفل الذكي (Smart Lock Failure Alert).
                    </p>
                    <div className="flex items-center gap-1.5 shrink-0 text-[11px] font-medium text-[#75786f]">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>مستشعر بوابة القفل السحابي (IoT Alert)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Pagination & Audit Meta Footer (Figma 1:21225) */}
        <div className="border-t border-[rgba(197,200,189,0.3)] pt-[17px] flex items-center justify-between text-xs text-[#75786f]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="size-[36px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center text-[#181d17] hover:bg-[#dfe4db] transition-colors cursor-pointer"
              title="الصفحة التالية"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="px-2 text-[11px] font-semibold text-[#181d17]">
              صفحة 1 من 3
            </span>
            <button
              type="button"
              disabled
              className="size-[36px] rounded-[8px] bg-[#ebefe6] opacity-50 flex items-center justify-center text-[#181d17] cursor-not-allowed"
              title="الصفحة السابقة"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <span className="text-[11px] font-medium text-[#75786f]">
            إجمالي السجلات: 24 حركة تشغيلية موثقة
          </span>
        </div>
      </div>

      {/* Advanced Filter Drawer */}
      <OperationsAdvancedFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={advancedFilters}
        onApplyFilters={(newFilters) => {
          setAdvancedFilters(newFilters);
        }}
        onResetFilters={() => {
          setAdvancedFilters(initialOperationFilterState);
        }}
        totalResultsCount={24}
      />
    </div>
  );
}
