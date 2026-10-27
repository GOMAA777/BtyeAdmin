"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  User,
  RotateCcw,
  Download,
  ArrowRight,
  FileText,
  Sparkles,
  Wrench,
  Gauge,
  Search,
  Calendar,
  ChevronDown,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  KeyRound,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { SelectDropdown } from "@/components/shared/select-dropdown";
import { BackButton } from "@/components/shared/back-button";
import { TablePagination } from "@/components/shared/table-pagination";
import { TableToolbar } from "@/components/shared/table-toolbar";

interface OperationRecord {
  id: string;
  reference: string;
  category: string;
  title: string;
  subtitle: string;
  iconType: "cleaning" | "maintenance" | "safety" | "deep-cleaning";
  date: string;
  performerInitials: string;
  performerInitialsBg: string;
  performerInitialsColor: string;
  performerName: string;
  performerDept: string;
  duration: string;
  durationSubtext: string;
  durationSubtextColor?: string;
  statusText: string;
  operationType: "cleaning" | "maintenance" | "safety";
}

interface UnitOperationsLogViewProps {
  onBack?: () => void;
  onViewDetails?: (operationId?: string) => void;
  unitNumber?: string;
  propertyName?: string;
  ownerName?: string;
}

export function UnitOperationsLogView({
  onBack,
  onViewDetails,
  unitNumber = "204",
  propertyName = "عمارة النخيل",
  ownerName = "محمد العتيبي",
}: UnitOperationsLogViewProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRange, setSelectedRange] = useState("30");
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Exact 4 table operations from Figma Node 1:15457
  const operations: OperationRecord[] = useMemo(
    () => [
      {
        id: "op-1",
        reference: "#CLN-2026-902",
        category: "مهمة فندقية دورية",
        title: "تنظيف الوحدة والتعقيم الشامل",
        subtitle: "تم فحص كافة المرافق وتجديد المستلزمات بالكامل...",
        iconType: "cleaning",
        date: "17 سبتمبر 2026",
        performerInitials: "رع",
        performerInitialsBg: "bg-[#EBEFE6]",
        performerInitialsColor: "text-[#34422A]",
        performerName: "فريق التنظيف",
        performerDept: "شركة رعاية الفندقية",
        duration: "45 دقيقة",
        durationSubtext: "تم اجتياز الفحص 100%",
        durationSubtextColor: "text-[#34422A]",
        statusText: "مكتمل",
        operationType: "cleaning",
      },
      {
        id: "op-2",
        reference: "#CLN-2026-902",
        category: "مهمة فندقية دورية",
        title: "صيانة القفل الذكي وبوابة الدخول",
        subtitle: "تم استبدال خلايا الطاقة وإعادة معايرة الاتصال السحابي...",
        iconType: "maintenance",
        date: "17 سبتمبر 2026",
        performerInitials: "عش",
        performerInitialsBg: "bg-[#4B5940]",
        performerInitialsColor: "text-[#BFCFAF]",
        performerName: "م. عبد الله الشمري",
        performerDept: "فريق الصيانة الميدانية",
        duration: "25 دقيقة",
        durationSubtext: "استبدال بطارية القفل ومزامنة",
        durationSubtextColor: "text-[#454840]",
        statusText: "مكتمل",
        operationType: "maintenance",
      },
      {
        id: "op-3",
        reference: "#CLN-2026-902",
        category: "مهمة فندقية دورية",
        title: "تنظيف الوحدة والتعقيم الشامل",
        subtitle: "تم فحص كافة المرافق وتجديد المستلزمات بالكامل...",
        iconType: "safety",
        date: "17 سبتمبر 2026",
        performerInitials: "سل",
        performerInitialsBg: "bg-[#DFE4DB]",
        performerInitialsColor: "text-[#34422A]",
        performerName: "فريق السلامة الوقائية",
        performerDept: "إدارة المخاطر - رواق",
        duration: "30 دقيقة",
        durationSubtext: "شهادة سلامة معتمدة",
        durationSubtextColor: "text-[#34422A]",
        statusText: "مكتمل",
        operationType: "safety",
      },
      {
        id: "op-4",
        reference: "#CLN-2026-902",
        category: "مهمة فندقية دورية",
        title: "تنظيف الوحدة والتعقيم الشامل",
        subtitle: "تم فحص كافة المرافق وتجديد المستلزمات بالكامل...",
        iconType: "deep-cleaning",
        date: "17 سبتمبر 2026",
        performerInitials: "نظ",
        performerInitialsBg: "bg-[#EBEFE6]",
        performerInitialsColor: "text-[#34422A]",
        performerName: "فريق النظافة المتخصص",
        performerDept: "مؤسسة البريق الماسي",
        duration: "90 دقيقة",
        durationSubtext: "تم الاعتماد المخبري",
        durationSubtextColor: "text-[#34422A]",
        statusText: "مكتمل",
        operationType: "cleaning",
      },
    ],
    []
  );

  const typeOptions = [
    { value: "all", label: "نوع العملية: الكل" },
    { value: "cleaning", label: "تنظيف وتعقيم" },
    { value: "maintenance", label: "صيانة فنية" },
    { value: "safety", label: "فحص وسلامة" },
  ];

  const statusOptions = [
    { value: "all", label: "الحالة: الكل" },
    { value: "completed", label: "مكتمل" },
    { value: "in_progress", label: "قيد التنفيذ" },
    { value: "archived", label: "مؤرشف" },
  ];

  const rangeOptions = [
    { value: "30", label: "النطاق: آخر 30 يوم" },
    { value: "7", label: "النطاق: آخر 7 أيام" },
    { value: "90", label: "النطاق: آخر 90 يوم" },
    { value: "all", label: "كامل السجل" },
  ];

  const filteredOperations = useMemo(() => {
    return operations.filter((op) => {
      const matchSearch =
        !search ||
        op.reference.toLowerCase().includes(search.toLowerCase()) ||
        op.title.toLowerCase().includes(search.toLowerCase()) ||
        op.performerName.toLowerCase().includes(search.toLowerCase()) ||
        op.performerDept.toLowerCase().includes(search.toLowerCase());

      const matchType =
        selectedType === "all" || op.operationType === selectedType;

      const matchStatus =
        selectedStatus === "all" ||
        (selectedStatus === "completed" && op.statusText === "مكتمل");

      return matchSearch && matchType && matchStatus;
    });
  }, [operations, search, selectedType, selectedStatus]);

  const totalFiltered = filteredOperations.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const currentPage = Math.min(activePage, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOperations = filteredOperations.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleExportExcel = () => {
    toast.success("جاري تصدير سجل العمليات التشغيلي (Excel / CSV)...");
  };

  const handleRefresh = () => {
    toast.success("تم تحديث ومزامنة سجل العمليات بنجاح.");
  };

  return (
    <div className="space-y-6 text-start" dir="rtl">
      {/* 1. TOP HERO GREETING BAR (Figma Node 1:15459) */}
      <div className="bg-white rounded-[16px] p-6 border border-[#EEF2E6] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          {/* Title */}
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#181D17] leading-[34px]">
            سجل العمليات — الوحدة {unitNumber}
          </h1>

          {/* Subtitle / Metadata row */}
          <div className="flex items-center gap-2 flex-wrap text-[13px] leading-[20px] text-[#454840] mt-1.5">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#454840] shrink-0" />
              <span>{propertyName}</span>
              <span className="text-[#75786F]">(PR-1048)</span>
            </div>

            <span className="text-[#C5C8BD]">•</span>
            <span>الرياض — حي العليا</span>

            <span className="text-[#C5C8BD]">•</span>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#454840] shrink-0" />
              <span className="text-[#454840]">المالك:</span>
              <span className="font-semibold text-[#181D17]">
                {ownerName} (OWN-4491)
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Primary Action: Export Excel / CSV */}
          <button
            type="button"
            onClick={handleExportExcel}
            className="bg-[#4B5940] hover:bg-[#3D4934] text-white rounded-[12px] px-5 py-2.5 text-[14px] font-medium drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-2 transition-colors cursor-pointer select-none"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>تصدير السجل (Excel / CSV)</span>
          </button>

          {/* Secondary Action: Refresh Log */}
          <button
            type="button"
            onClick={handleRefresh}
            className="bg-[#F1F5EB] hover:bg-[#E5EAE0] text-[#181D17] rounded-[12px] h-[44px] px-4 text-[14px] font-semibold drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-2 transition-colors cursor-pointer select-none"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0 text-[#181D17]" />
            <span>تحديث السجل</span>
          </button>

          {/* Back to Unit Details */}
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="bg-white hover:bg-[#F6F8F4] border border-[#E5E8E2] text-[#252A24] rounded-[12px] h-[44px] px-4 text-[14px] font-medium flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span>العودة للوحدة</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#252A24]" />
            </button>
          ) : (
            <BackButton
              fallbackHref="/units/"
              className="bg-white hover:bg-[#F6F8F4] border border-[#E5E8E2] text-[#252A24] rounded-[12px] h-[44px] px-4 text-[14px] font-medium flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span>العودة للوحدة</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#252A24]" />
            </BackButton>
          )}
        </div>
      </div>

      {/* 2. OPERATIONAL STATS TELEMETRY (4 Indicator Cards - Figma Node 1:15485) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: إجمالي العمليات المسجلة (Rightmost in RTL) */}
        <div className="bg-white rounded-[16px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] flex items-center justify-between min-h-[86px]">
          <div className="bg-[#F1F5EB] rounded-[12px] size-12 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#54624C]" />
          </div>
          <div className="text-end flex flex-col items-end">
            <span className="text-[#75786F] text-[11px] font-medium leading-[16px]">
              إجمالي العمليات المسجلة
            </span>
            <div className="flex items-baseline gap-1.5 justify-end mt-1">
              <span className="text-[#181D17] text-[24px] font-bold leading-[34px]">
                24
              </span>
              <span className="text-[#34422A] text-[11px] font-medium">
                عملية معتمدة
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: مهام التنظيف المعتمدة */}
        <div className="bg-white rounded-[16px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] flex items-center justify-between min-h-[86px]">
          <div className="bg-[#D8E8CB] rounded-[12px] size-12 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#34422A]" />
          </div>
          <div className="text-end flex flex-col items-end">
            <span className="text-[#75786F] text-[11px] font-medium leading-[16px]">
              مهام التنظيف المعتمدة
            </span>
            <div className="flex items-baseline gap-1.5 justify-end mt-1">
              <span className="text-[#181D17] text-[24px] font-bold leading-[34px]">
                16
              </span>
              <span className="text-[#34422A] text-[11px] font-medium">
                مكتملة 100%
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: بلاغات الصيانة */}
        <div className="bg-white rounded-[16px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] flex items-center justify-between min-h-[86px]">
          <div className="bg-[#F1F5EB] rounded-[12px] size-12 flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5 text-[#54624C]" />
          </div>
          <div className="text-end flex flex-col items-end">
            <span className="text-[#75786F] text-[11px] font-medium leading-[16px]">
              بلاغات الصيانة
            </span>
            <div className="flex items-baseline gap-1.5 justify-end mt-1">
              <span className="text-[#181D17] text-[24px] font-bold leading-[34px]">
                8
              </span>
              <span className="text-[#75786F] text-[11px] font-medium">
                7 مكتملة • 1 مؤرشف
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: متوسط زمن الاستجابة (Leftmost in RTL) */}
        <div className="bg-white rounded-[16px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] flex items-center justify-between min-h-[86px]">
          <div className="bg-[#EBEFE6] rounded-[12px] size-12 flex items-center justify-center shrink-0">
            <Gauge className="w-5 h-5 text-[#34422A]" />
          </div>
          <div className="text-end flex flex-col items-end">
            <span className="text-[#75786F] text-[11px] font-medium leading-[16px]">
              متوسط زمن الاستجابة
            </span>
            <div className="flex items-baseline gap-1.5 justify-end mt-1">
              <span className="text-[#181D17] text-[24px] font-bold leading-[34px]">
                35
              </span>
              <span className="text-[#34422A] text-[11px] font-medium">
                دقيقة / مهمة
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & FILTER CONTROLS BAR */}
      <TableToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="ابحث في تفاصيل العملية، رقم التذكرة، أو اسم المنفذ..."
      >
        {/* Timeframe Filter */}
        <div className="w-full sm:w-[175px]">
          <SelectDropdown
            value={selectedRange}
            options={rangeOptions}
            onChange={setSelectedRange}
            triggerClassName="bg-[#EFF2EB] hover:bg-[#E2E7DE] border-0 text-[#181D17] text-xs font-semibold rounded-full h-10 px-3.5 transition-all font-cairo"
          />
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-[130px]">
          <SelectDropdown
            value={selectedStatus}
            options={statusOptions}
            onChange={setSelectedStatus}
            triggerClassName="bg-[#EFF2EB] hover:bg-[#E2E7DE] border-0 text-[#181D17] text-xs font-semibold rounded-full h-10 px-3.5 transition-all font-cairo"
          />
        </div>

        {/* Type Filter */}
        <div className="w-full sm:w-[160px]">
          <SelectDropdown
            value={selectedType}
            options={typeOptions}
            onChange={setSelectedType}
            triggerClassName="bg-[#EFF2EB] hover:bg-[#E2E7DE] border-0 text-[#181D17] text-xs font-semibold rounded-full h-10 px-3.5 transition-all font-cairo"
          />
        </div>
      </TableToolbar>

      {/* 4. HIGH-FIDELITY OPERATIONS TABLE CONTAINER (Figma Node 1:15566) */}
      <div className="bg-white rounded-[16px] border border-[#E5E8E2] overflow-hidden drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#F9FAF8] border-b border-[#E5E8E2] text-[#73786F] text-[11px] font-bold tracking-[0.55px] uppercase">
                <th className="py-4 px-4 w-[160px]">رقم المرجع</th>
                <th className="py-4 px-4 min-w-[240px]">
                  نوع العملية وتفاصيل الإجراء
                </th>
                <th className="py-4 px-4 w-[140px]">التاريخ والتوقيت الدقيق</th>
                <th className="py-4 px-4 w-[180px]">الفريق / المنفذ المسؤول</th>
                <th className="py-4 px-4 w-[160px]">المدة المستغرقة والفحص</th>
                <th className="py-4 px-4 w-[110px] text-center">
                  الحالة التشغيلية
                </th>
                <th className="py-4 px-4 w-[120px] text-center">الإجراءات</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#E5E8E2]">
              {paginatedOperations.length > 0 ? (
                paginatedOperations.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-[#F9FAF8]/60 transition-colors group"
                  >
                    {/* 1. Reference & Category */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#34422A] text-[14px] leading-[20px]">
                          {row.reference}
                        </span>
                        <span className="text-[#75786F] text-[11px] font-medium mt-0.5">
                          {row.category}
                        </span>
                      </div>
                    </td>

                    {/* 2. Operation Type & Subtitle */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-9 rounded-[12px] flex items-center justify-center shrink-0 ${
                            row.iconType === "maintenance"
                              ? "bg-[#EBEFE6] text-[#34422A]"
                              : "bg-[#D8E8CB] text-[#34422A]"
                          }`}
                        >
                          {row.iconType === "maintenance" ? (
                            <Wrench className="w-4 h-4" />
                          ) : row.iconType === "safety" ? (
                            <Shield className="w-4 h-4" />
                          ) : (
                            <Sparkles className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-[#181D17] text-[14px] leading-[22px] truncate">
                            {row.title}
                          </span>
                          <span className="text-[#75786F] text-[12px] leading-[18px] truncate mt-0.5 max-w-[280px]">
                            {row.subtitle}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 3. Date & Precise Time */}
                    <td className="py-4 px-4 align-middle text-[#181D17] text-[14px] font-medium whitespace-nowrap">
                      {row.date}
                    </td>

                    {/* 4. Responsible Performer */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`size-8 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 ${row.performerInitialsBg} ${row.performerInitialsColor}`}
                        >
                          {row.performerInitials}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-[#181D17] text-[12px] leading-[18px] truncate">
                            {row.performerName}
                          </span>
                          <span className="text-[#75786F] text-[11px] font-medium leading-[16px] truncate">
                            {row.performerDept}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 5. Duration & Inspection Status */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-medium text-[#181D17] text-[14px] leading-[22px]">
                          {row.duration}
                        </span>
                        <span
                          className={`text-[11px] font-medium mt-0.5 ${
                            row.durationSubtextColor ?? "text-[#34422A]"
                          }`}
                        >
                          {row.durationSubtext}
                        </span>
                      </div>
                    </td>

                    {/* 6. Operational Status Badge */}
                    <td className="py-4 px-4 align-middle text-center">
                      <span className="bg-[#D8E8CB] text-[#5A6952] font-semibold text-[11px] px-3 py-1 rounded-full inline-flex items-center gap-1.5 whitespace-nowrap">
                        <span className="size-1.5 rounded-full bg-[#34422A]" />
                        <span>{row.statusText}</span>
                      </span>
                    </td>

                    {/* 7. Action Button: عرض التفاصيل (Opens Figma Node 1:15927) */}
                    <td className="py-4 px-4 align-middle text-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (onViewDetails) {
                            onViewDetails(row.id);
                          }
                        }}
                        className="text-[#34422A] hover:bg-[#F1F5EB] font-semibold text-[12px] px-2.5 py-1.5 rounded-[8px] inline-flex items-center gap-1.5 transition-colors cursor-pointer select-none"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span>عرض التفاصيل</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-[#75786F] text-sm"
                  >
                    لا توجد عمليات مطابقة لخيارات البحث المحددة.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination Controls (Figma Node 1:15586) */}
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
          entityName="عملية تشغيلية"
          pluralEntityName="عمليات"
          registeredLabel="مسجلة"
        />
      </div>

      {/* 5. GOVERNANCE & AUDIT FOOTNOTE (Figma Node 1:15819) */}
      <div className="bg-white/50 border border-[#E5E8E2] rounded-[16px] p-4 flex items-start sm:items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-[#34422A] shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-[13px] leading-[21px] text-[#454840]">
          <strong className="font-semibold text-[#181D17]">
            تنويه التدقيق والحوكمة:{" "}
          </strong>
          سجل التدقيق التشغيلي موثق ومحمي برمجياً ضد التعديل أو الحذف اليدوي وفق
          اشتراطات الحوكمة لمنصة رواق لإدارة الأصول العقارية. يتاح للمشرفين
          الاطلاع الكامل وتصدير السجلات المعتمدة لأغراض الرقابة المالية
          والميدانية فقط.
        </p>
      </div>
    </div>
  );
}
