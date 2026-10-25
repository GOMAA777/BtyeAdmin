"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  RotateCcw,
  RefreshCw,
  MessageSquare,
  Wrench,
  Lock,
  AlertCircle,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { ExecutionLog, AutomationMainTab } from "../../types";
import { initialExecutionLogs } from "../../data/mock-automation";
import { AutomationTabsNav } from "../automation-tabs-nav";
import { RetryExecutionModal } from "./modals/retry-execution-modal";

interface ExecutionLogsViewProps {
  onTabChange?: (tab: AutomationMainTab) => void;
}

export function ExecutionLogsView({ onTabChange }: ExecutionLogsViewProps) {
  const [logs, setLogs] = useState<ExecutionLog[]>(initialExecutionLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "success" | "failed" | "in_progress">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Retry modal state
  const [retryTargetLog, setRetryTargetLog] = useState<ExecutionLog | null>(null);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        log.logCode.toLowerCase().includes(q) ||
        log.guestName.toLowerCase().includes(q) ||
        log.bookingId.toLowerCase().includes(q) ||
        log.ruleName.toLowerCase().includes(q) ||
        log.propertyName.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" || log.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [logs, searchQuery, statusFilter]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("تم تحديث سجل التنفيذ التشغيلي وجلب آخر العمليات اللحظية.");
    }, 600);
  };

  const handleExport = () => {
    toast.info("جارٍ تجهيز ملف سجل العمليات بصيغة CSV...");
    setTimeout(() => {
      toast.success("تم تصدير سجل التنفيذ بنجاح!");
    }, 800);
  };

  const handleRetryConfirm = () => {
    if (!retryTargetLog) return;
    setLogs((prev) =>
      prev.map((l) =>
        l.id === retryTargetLog.id
          ? {
              ...l,
              status: "success",
              statusSummary: "تم التسليم والقراءة للمستلم (إعادة محاولة ناجحة)",
              responseTime: "2.1 ثانية",
            }
          : l
      )
    );
    toast.success(`تمت إعادة محاولة إرسال العملية (${retryTargetLog.logCode}) بنجاح!`);
    setRetryTargetLog(null);
  };

  return (
    <div className="space-y-[16px] font-cairo" dir="rtl">
      {/* 1. Internal Navigation Tabs (Figma node 1:25060) */}
      <AutomationTabsNav activeTab="logs" onTabChange={onTabChange} />

      {/* 2. Top Hero Greeting Bar (Figma node 1:25024) */}
      <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Right side in RTL: Title & Subtitle */}
        <div>
          <h1 className="text-[24px] font-bold text-[#181d17] leading-[34px]">
            سجل تنفيذ الأتمتة
          </h1>
          <p className="text-[13px] font-medium text-[#454840] leading-[20px] mt-[4px]">
            متابعة جميع عمليات التشغيل التلقائي ونتائجها بدقة لحظية للتدقيق التشغيلي وحوكمة المنصة.
          </p>
        </div>

        {/* Left side in RTL: Action Button Group */}
        <div className="flex items-center gap-[8px] flex-wrap self-end md:self-center">
          {/* Button 1: Update Data */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-[#4b5940] hover:bg-[#3d4934] text-white text-[14px] font-medium h-[44px] px-[20px] rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] inline-flex items-center gap-[8px] transition-colors cursor-pointer disabled:opacity-50"
          >
            <span>تحديث البيانات</span>
            <RefreshCw className={`size-[14px] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>

          {/* Button 2: Export Log */}
          <button
            type="button"
            onClick={handleExport}
            className="bg-white hover:bg-[#f6fbf1] text-[#181d17] text-[14px] font-semibold h-[44px] px-[16px] rounded-[12px] border border-[#e5eae0] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] inline-flex items-center gap-[8px] transition-colors cursor-pointer"
          >
            <span>تصدير السجل</span>
            <Download className="size-[14px] text-[#4b5940]" />
          </button>
        </div>
      </div>

      {/* 3. Search Field & Status Filter Bar (Figma node 1:25043) */}
      <div className="bg-white rounded-[16px] border border-[#e5e8e2] drop-shadow-[0px_2px_5px_rgba(0,0,0,0.03)] p-[16px] flex flex-col md:flex-row md:items-center justify-between gap-[16px]">
        {/* Right side in RTL: Search Input */}
        <div className="relative flex-1 max-w-full md:max-w-[480px]">
          <div className="bg-[#f6f7f4] rounded-[12px] flex items-center pr-[14px] pl-[16px] py-[8px] border border-transparent focus-within:border-[#4b5940] transition-colors">
            <Search className="size-[15px] text-[#73786f] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم الحجز، اسم العميل، اسم القاعدة أو معرف العملية..."
              className="w-full bg-transparent border-0 outline-none pr-[10px] text-[12px] font-medium text-[#181d17] placeholder:text-[rgba(115,120,111,0.7)]"
            />
          </div>
        </div>

        {/* Left side in RTL: Status Segmented Tabs */}
        <div className="bg-[#f6f7f4] rounded-[12px] p-[4px] flex items-center gap-[4px] self-start md:self-auto overflow-x-auto">
          {/* All */}
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-[16px] py-[6px] rounded-[8px] text-[12px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === "all"
                ? "bg-white text-[#252a24] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                : "text-[#73786f] hover:text-[#252a24]"
            }`}
          >
            الكل (14)
          </button>

          {/* Success */}
          <button
            type="button"
            onClick={() => setStatusFilter("success")}
            className={`px-[16px] py-[6px] rounded-[8px] text-[12px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === "success"
                ? "bg-white text-[#252a24] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                : "text-[#73786f] hover:text-[#252a24]"
            }`}
          >
            نجح (12)
          </button>

          {/* Failed */}
          <button
            type="button"
            onClick={() => setStatusFilter("failed")}
            className={`px-[16px] py-[6px] rounded-[8px] text-[12px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === "failed"
                ? "bg-white text-[#252a24] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                : "text-[#73786f] hover:text-[#252a24]"
            }`}
          >
            فشل (2)
          </button>

          {/* In Progress */}
          <button
            type="button"
            onClick={() => setStatusFilter("in_progress")}
            className={`px-[16px] py-[6px] rounded-[8px] text-[12px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === "in_progress"
                ? "bg-white text-[#252a24] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                : "text-[#73786f] hover:text-[#252a24]"
            }`}
          >
            قيد التنفيذ (2)
          </button>
        </div>
      </div>

      {/* 4. Master Data Table Container (Figma node 1:25083) */}
      <div className="bg-white rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#e5e8e2] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-[12px]">
            {/* Header */}
            <thead>
              <tr className="bg-[#f9faf8] border-b border-[#e5e8e2] text-[#75786f] font-semibold">
                <th className="py-[16px] px-[16px] whitespace-nowrap">التاريخ والوقت</th>
                <th className="py-[16px] px-[8px] whitespace-nowrap">المُعرّف</th>
                <th className="py-[16px] px-[16px] whitespace-nowrap">
                  <div>القاعدة</div>
                  <div>والمحفز</div>
                </th>
                <th className="py-[16px] px-[16px] whitespace-nowrap">الحجز والنزيل</th>
                <th className="py-[16px] px-[16px] whitespace-nowrap">العقار والوحدة</th>
                <th className="py-[16px] px-[16px] whitespace-nowrap">نوع الإجراء</th>
                <th className="py-[16px] px-[16px] whitespace-nowrap">
                  <div>الحالة</div>
                  <div>والنتيجة</div>
                </th>
                <th className="py-[16px] px-[16px] text-center whitespace-nowrap">الإجراء</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-[#f1f5eb] text-[#181d17]">
              {filteredLogs.map((log) => {
                const isFailed = log.status === "failed";
                const isInProgress = log.status === "in_progress";

                return (
                  <tr
                    key={log.id}
                    className={`transition-colors ${
                      isFailed
                        ? "bg-[rgba(255,218,214,0.15)] hover:bg-[rgba(255,218,214,0.3)]"
                        : "hover:bg-[#f6fbf1]/50"
                    }`}
                  >
                    {/* 1. Date & Time */}
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <div className="font-bold text-[13px] text-[#181d17] leading-[18px]">
                        {log.date}
                      </div>
                      <div className="text-[12px] font-normal text-[#75786f] leading-[20px]">
                        {log.time}
                      </div>
                    </td>

                    {/* 2. Identifier */}
                    <td className="py-[16px] px-[8px] whitespace-nowrap">
                      <span
                        className={`font-bold text-[12px] px-[8px] py-[2px] rounded-[6px] leading-[20px] inline-block ${
                          isFailed
                            ? "bg-[#ffdad6] text-[#93000a]"
                            : "bg-[#ebefe6] text-[#34422a]"
                        }`}
                      >
                        {log.logCode}
                      </span>
                    </td>

                    {/* 3. Rule & Trigger */}
                    <td className="py-[16px] px-[16px] whitespace-nowrap max-w-[200px]">
                      <div className="font-bold text-[13px] text-[#181d17] leading-[20px]">
                        {log.ruleName}
                      </div>
                      <div className="text-[12px] font-normal text-[#454840] leading-[20px]">
                        {log.triggerDetails}
                      </div>
                    </td>

                    {/* 4. Booking & Guest */}
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <div className="font-bold text-[13px] text-[#181d17] leading-[20px]">
                        {log.guestName}
                      </div>
                      <div className="text-[12px] font-normal text-[#75786f] leading-[20px]">
                        {log.bookingId}
                      </div>
                    </td>

                    {/* 5. Property & Unit */}
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <div className="font-medium text-[13px] text-[#181d17] leading-[20px]">
                        {log.propertyName}
                      </div>
                      <div className="text-[12px] font-normal text-[#454840] leading-[20px]">
                        {log.unitName}
                      </div>
                    </td>

                    {/* 6. Action Type Pill */}
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      {log.actionType === "whatsapp" && (
                        <span className="bg-[#d8e8cb] text-[#3d4b36] text-[12px] font-semibold px-[10px] py-[4px] rounded-full inline-flex items-center gap-[4px]">
                          <span>{log.actionBadgeLabel}</span>
                          <MessageSquare className="size-[12px] text-[#3d4b36]" />
                        </span>
                      )}
                      {log.actionType === "cleaning_task" && (
                        <span className="bg-[#e5eae0] text-[#181d17] text-[12px] font-semibold px-[10px] py-[4px] rounded-full inline-flex items-center gap-[4px]">
                          <span>{log.actionBadgeLabel}</span>
                          <Wrench className="size-[12px] text-[#454840]" />
                        </span>
                      )}
                      {log.actionType === "smart_lock" && (
                        <span className="bg-[#e5eae0] text-[#181d17] text-[12px] font-semibold px-[10px] py-[4px] rounded-full inline-flex items-center gap-[4px]">
                          <span>{log.actionBadgeLabel}</span>
                          <Lock className="size-[12px] text-[#454840]" />
                        </span>
                      )}
                      {log.actionType === "security_alert" && (
                        <span className="bg-[#ffdad6] text-[#ba1a1a] text-[12px] font-semibold px-[10px] py-[4px] rounded-full inline-flex items-center gap-[4px]">
                          <span>{log.actionBadgeLabel}</span>
                          <AlertCircle className="size-[12px] text-[#ba1a1a]" />
                        </span>
                      )}
                    </td>

                    {/* 7. Status & Summary */}
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      {log.status === "success" && (
                        <div>
                          <span className="bg-[#eaf4ee] text-[#2d6a44] text-[12px] font-bold px-[8px] py-[2px] rounded-full inline-flex items-center gap-[6px]">
                            <span>نجح</span>
                            <span className="size-[6px] rounded-full bg-[#3e8a5a]" />
                          </span>
                          <div className="text-[11px] font-normal text-[#75786f] leading-[18px] mt-[2px]">
                            {log.statusSummary}
                          </div>
                        </div>
                      )}

                      {isFailed && (
                        <div>
                          <span className="bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold px-[8px] py-[2px] rounded-full inline-flex items-center gap-[6px]">
                            <span>فشل الإرسال</span>
                            <span className="size-[6px] rounded-full bg-[#ba1a1a]" />
                          </span>
                          <div className="text-[11px] font-normal text-[#ba1a1a] leading-[18px] mt-[2px]">
                            {log.statusSummary}
                          </div>
                        </div>
                      )}

                      {isInProgress && (
                        <div>
                          <span className="bg-[#e1f0ff] text-[#0060a8] text-[11px] font-bold px-[8px] py-[2px] rounded-full inline-flex items-center gap-[6px]">
                            <span>قيد التنفيذ</span>
                            <span className="size-[6px] rounded-full bg-[#0060a8]" />
                          </span>
                          <div className="text-[11px] font-normal text-[#75786f] leading-[18px] mt-[2px]">
                            {log.statusSummary}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* 8. Action button */}
                    <td className="py-[16px] px-[16px] text-center whitespace-nowrap">
                      {isFailed && log.id === "EX-8488" ? (
                        <button
                          type="button"
                          onClick={() => setRetryTargetLog(log)}
                          className="bg-[#ba1a1a] hover:bg-[#93000a] text-white font-semibold text-[11px] px-[12px] py-[6px] rounded-[8px] transition-colors cursor-pointer inline-flex items-center gap-[6px]"
                        >
                          <RotateCcw className="size-[12px]" />
                          <span>إعادة المحاولة</span>
                        </button>
                      ) : isFailed && log.id === "EX-8480" ? (
                        <button
                          type="button"
                          onClick={() => toast.info("فتح شاشة المعالجة اليدوية لعملية الدفع المتعثرة")}
                          className="bg-[#ebefe6] hover:bg-[#dfe4db] text-[#454840] font-semibold text-[11px] px-[12px] py-[6px] rounded-[8px] transition-colors cursor-pointer"
                        >
                          معالجة يدوية
                        </button>
                      ) : isInProgress ? (
                        <button
                          type="button"
                          onClick={() => toast.info("عرض قائمة الانتظار الحالية لعمليات الأتمتة")}
                          className="bg-[#ebefe6] hover:bg-[#dfe4db] text-[#454840] font-semibold text-[11px] px-[12px] py-[6px] rounded-[8px] transition-colors cursor-pointer"
                        >
                          تفاصيل الطابور
                        </button>
                      ) : (
                        <Link
                          href={`/automation/logs/${log.id}/`}
                          className="bg-[#ebefe6] hover:bg-[#dfe4db] text-[#454840] font-semibold text-[11px] px-[12px] py-[6px] rounded-[8px] transition-colors inline-block"
                        >
                          عرض التفاصيل
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-[16px] border-t border-[#e5e8e2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[#75786f] text-[12px]">
          <div>
            عرض <span className="font-bold text-[#181d17]">1 - 7</span> من أصل{" "}
            <span className="font-bold text-[#181d17]">14 عملية</span> مسجلة
          </div>

          <div className="flex items-center gap-4">
            <span>الصفوف لكل صفحة: 10 عمليات</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="size-[28px] rounded-[6px] border border-[#e5e8e2] flex items-center justify-center text-[#75786f] disabled:opacity-40"
              >
                <ChevronRight className="size-[14px]" />
              </button>
              <button
                type="button"
                className="size-[28px] rounded-[6px] bg-[#4b5940] text-white font-bold flex items-center justify-center"
              >
                1
              </button>
              <button
                type="button"
                disabled
                className="size-[28px] rounded-[6px] border border-[#e5e8e2] flex items-center justify-center text-[#75786f] disabled:opacity-40"
              >
                <ChevronLeft className="size-[14px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Audit & Immutability Notice Card (Figma node 1:25022 footer) */}
      <div className="bg-[#f6fbf1] border border-[#d8e8cb] rounded-[16px] p-[16px] flex items-start gap-[12px]">
        <div className="size-[32px] rounded-[8px] bg-[#d8e8cb] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5">
          <ShieldCheck className="size-[18px]" />
        </div>
        <div>
          <h3 className="font-bold text-[13px] text-[#181d17] leading-[20px]">
            سجلات غير قابلة للتعديل أو الحذف
          </h3>
          <p className="font-normal text-[12px] text-[#454840] leading-[18px] mt-[2px]">
            سجلات تنفيذ الأتمتة محفوظة وموثقة رقمياً في مخزن تدقيق غير قابل للتعديل لضمان الامتثال وسياسات المراسلة والتشغيل المعتمدة في المملكة العربية السعودية. يتم توثيق معرف المرسل، حالة الشبكة، وطابع الوقت الزمني لكل استدعاء API بدقة أجزاء الثانية.
          </p>
        </div>
      </div>

      {/* 6. Retry Modal */}
      {retryTargetLog && (
        <RetryExecutionModal
          isOpen={!!retryTargetLog}
          onClose={() => setRetryTargetLog(null)}
          onConfirm={handleRetryConfirm}
          log={retryTargetLog}
        />
      )}
    </div>
  );
}
