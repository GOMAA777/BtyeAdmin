"use client";

import Link from "next/link";
import {
  Plus,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Wrench,
  ShieldAlert,
  Send,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Share2,
  RotateCcw,
  Key,
  LogOut,
  Bell,
  BatteryLow,
  Star,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterButton } from "@/components/shared/filter-button";
import { AutomationRuleActionDropdown } from "./automation-rule-action-dropdown";
import { AutomationMainTab, AutomationRule } from "../../types";
import { AutomationTabsNav } from "../automation-tabs-nav";
import { TablePagination } from "@/components/shared/table-pagination";
import { PauseRuleModal } from "./modals/pause-rule-modal";
import { ActivateRuleModal } from "./modals/activate-rule-modal";
import { DeleteRuleModal } from "./modals/delete-rule-modal";
import { useAutomationRulesManager } from "../../controllers/use-automation-rules-manager";
import { AutomationEmptyStateCard } from "../automation-empty-state-card";
import { AutomationGraphIcon, AddUserPlusIcon } from "../automation-figma-icons";

interface AutomationRulesViewProps {
  onSelectRule?: (ruleId: string) => void;
  onTabChange?: (tab: AutomationMainTab) => void;
}

function getTriggerIcon(rule: AutomationRule) {
  if (rule.triggerType === "whatsapp_failed") {
    return <ShieldAlert className="size-[15px] text-[#ba1a1a]" />;
  }
  if (rule.triggerType === "battery_low") {
    return <BatteryLow className="size-[15px] text-[#34422a]" />;
  }
  if (rule.triggerType === "checkout_done") {
    return <LogOut className="size-[15px] text-[#34422a]" />;
  }
  if (rule.triggerType === "before_checkin_24h" || rule.triggerType === "before_checkout_6h" || rule.triggerType === "after_checkout_2h") {
    return <Clock className="size-[15px] text-[#34422a]" />;
  }
  return <Clock className="size-[15px] text-[#34422a]" />;
}

function getActionIcon(rule: AutomationRule) {
  if (rule.actionType === "whatsapp" || rule.actionSummary.includes("WhatsApp")) {
    return <MessageSquare className="size-[15px] text-[#34422a]" />;
  }
  if (rule.actionType === "smart_lock" || rule.actionSummary.includes("كود الدخول")) {
    return <Key className="size-[15px] text-[#181d17]" />;
  }
  if (rule.actionType === "cleaning_task" || rule.actionSummary.includes("تنظيف")) {
    return <Sparkles className="size-[15px] text-[#181d17]" />;
  }
  if (rule.actionType === "security_alert" && rule.actionSummary.includes("صيانة")) {
    return <Wrench className="size-[15px] text-[#181d17]" />;
  }
  if (rule.actionType === "security_alert") {
    return <Bell className="size-[15px] text-[#181d17]" />;
  }
  if (rule.actionType === "review") {
    return <Star className="size-[15px] text-[#181d17]" />;
  }
  return <Send className="size-[15px] text-[#181d17]" />;
}

export function AutomationRulesView({ onSelectRule, onTabChange }: AutomationRulesViewProps) {
  const {
    rules,
    searchQuery,
    categoryFilter,
    triggerFilter,
    actionFilter,
    statusFilter,
    activeFiltersCount,
    isEmptyPreview,
    activeRuleForModal,
    isPauseOpen,
    isActivateOpen,
    isDeleteOpen,
    filteredRules,
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    totalFiltered,
    totalPages,
    activePage,
    startIndex,
    paginatedRules,
    setSearchQuery,
    setCategoryFilter,
    setTriggerFilter,
    setActionFilter,
    setStatusFilter,
    handleResetFilters,
    setIsEmptyPreview,
    setIsPauseOpen,
    setIsActivateOpen,
    setIsDeleteOpen,
    handleExport,
    handleToggleStatus,
    handlePauseRule,
    handleActivateRule,
    handleDeleteRule,
    confirmPause,
    confirmActivate,
    confirmDelete,
  } = useAutomationRulesManager();

  return (
    <div className="space-y-5 font-cairo">
      {/* Top 3 Main Tabs Nav (Figma node 1:21388) */}
      <AutomationTabsNav activeTab="rules" onTabChange={onTabChange} />

      {/* 1. Hero Greeting Bar (Figma node 1:21354) */}
      <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[24px] font-bold text-[#181d17] leading-[34px]">
            قواعد الأتمتة
          </h2>
          <p className="text-[13px] font-medium text-[#454840] leading-[20px] mt-1">
            إدارة القواعد والإجراءات التلقائية المرتبطة بالحجوزات والتشغيل وواتساب.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/automation/rules/new/"
            className="bg-[#4b5940] hover:bg-[#34422a] text-white text-[14px] font-medium px-[20px] py-[10px] rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] inline-flex items-center gap-[8px] transition-colors shadow-2xs"
          >
            <span>إنشاء قاعدة</span>
            <Plus className="size-[14px]" />
          </Link>

          <button
            type="button"
            onClick={handleExport}
            className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5e8e2] text-[#181d17] text-[14px] font-semibold h-[44px] px-[16px] rounded-[12px] inline-flex items-center gap-[8px] hover:bg-[#f6f7f4] transition-colors cursor-pointer"
          >
            <span>تصدير السجل</span>
            <Download className="size-[14px] text-[#181d17]" />
          </button>

          {/* Toggle for empty state view testing */}
          <button
            type="button"
            onClick={() => setIsEmptyPreview(!isEmptyPreview)}
            className="px-2.5 py-1 text-xs text-[#4b5940] bg-[#ebefe6] rounded-lg border border-[#e5e8e2] hover:underline cursor-pointer"
          >
            {isEmptyPreview ? "عرض البيانات" : "معاينة فارغة"}
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Toolbar (Matching Subscriptions Design Fidelity) */}
      <div className="bg-[rgba(241,245,235,0.4)] p-4 sm:p-5 rounded-[16px] border border-[#e5eae0]/60 flex flex-col lg:flex-row items-center justify-between gap-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Search Input (Right side in RTL) */}
        <div className="relative flex-1 max-w-[480px] w-full">
          <div className="bg-white h-[44px] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-transparent focus-within:border-[#4b5940] flex items-center pr-11 pl-4 transition-colors">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم القاعدة، الكود، المحفز، أو الإجراء..."
              className="w-full bg-transparent text-[13px] text-[#181d17] placeholder-[#75786f] focus:outline-none"
            />
          </div>
          <Search className="size-[15px] text-[#75786f] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Filter Dropdowns & Reset Button (Left side in RTL) */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <FilterButton
            activeCount={activeFiltersCount}
            title="تصفية قواعد الأتمتة السريعة"
          />

          {/* 1. Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-[44px] pr-3.5 pl-8 rounded-[12px] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[12px] font-semibold text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#4b5940] cursor-pointer appearance-none border-0"
            >
              <option value="all">الفئة: الكل</option>
              <option value="confirm_checkout">واتساب وحجوزات</option>
              <option value="self_checkin">وصول ذاتي</option>
              <option value="cleaning_ops">تشغيل ميداني</option>
              <option value="governance_security">حوكمة وأمان</option>
              <option value="marketing_review">تسويق وتقييمات</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* 2. Trigger Filter */}
          <div className="relative">
            <select
              value={triggerFilter}
              onChange={(e) => setTriggerFilter(e.target.value)}
              className="h-[44px] pr-3.5 pl-8 rounded-[12px] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[12px] font-semibold text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#4b5940] cursor-pointer appearance-none border-0"
            >
              <option value="all">المحفز: الكل</option>
              <option value="booking_created">عند إنشاء حجز</option>
              <option value="before_checkin_24h">قبل الوصول بـ 24 ساعة</option>
              <option value="before_checkout_6h">قبل انتهاء الحجز بـ 6 ساعات</option>
              <option value="checkout_done">عند انتهاء الحجز وتسجيل الخروج</option>
              <option value="after_checkout_2h">بعد المغادرة بساعتين</option>
              <option value="battery_low">انخفاض بطارية القفل</option>
              <option value="whatsapp_failed">فشل إرسال WhatsApp</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* 3. Action Type Filter */}
          <div className="relative">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="h-[44px] pr-3.5 pl-8 rounded-[12px] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[12px] font-semibold text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#4b5940] cursor-pointer appearance-none border-0"
            >
              <option value="all">الإجراء: الكل</option>
              <option value="whatsapp">رسالة WhatsApp</option>
              <option value="smart_lock">كود القفل الذكي</option>
              <option value="cleaning_task">مهمة تنظيف</option>
              <option value="security_alert">تنبيه أمان / صيانة</option>
              <option value="review">طلب تقييم</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* 4. Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-[44px] pr-3.5 pl-8 rounded-[12px] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[12px] font-semibold text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#4b5940] cursor-pointer appearance-none border-0"
            >
              <option value="all">الحالة: الكل</option>
              <option value="active">مفعلة</option>
              <option value="paused">متوقفة</option>
              <option value="draft">مسودة</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* 5. Reset Filters Button */}
          <button
            type="button"
            onClick={handleResetFilters}
            className="size-[44px] rounded-[12px] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#454840] hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
            title="إعادة ضبط الفلاتر"
          >
            <RotateCcw className="size-[14px]" />
          </button>
        </div>
      </div>

      {/* Empty State View [1:26151] vs Table View */}
      {isEmptyPreview || filteredRules.length === 0 ? (
        <AutomationEmptyStateCard
          icon={<AutomationGraphIcon className="size-[40px]" />}
          title="لا توجد قواعد أتمتة"
          description={
            <>
              <p>لم يتم إنشاء أي قواعد أتمتة على المنصة حتى الآن. ابدأ بتهيئة سير العمل</p>
              <p>التلقائي لإرسال أكواد الدخول الذكية، تنبيهات المغادرة، وتعيين مهام التنظيف</p>
              <p>آلياً.</p>
            </>
          }
          secondaryAction={{
            label: "تحديث الصفحة",
            onClick: () => {
              setIsEmptyPreview(false);
              handleResetFilters();
            },
          }}
          primaryAction={{
            label: "إنشاء قاعدة جديدة",
            href: "/automation/rules/new/",
            icon: <AddUserPlusIcon className="size-[16px] text-white" />,
          }}
        />
      ) : (
        <div className="bg-white border border-[#e5e8e2] rounded-[16px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-[#f9faf8] border-b border-[#e5e8e2] h-[62px] text-[#73786f] text-[11px] font-bold tracking-[0.55px] uppercase">
                    <th className="py-4 px-6 whitespace-nowrap">اسم القاعدة وتصنيفها</th>
                    <th className="py-4 px-5 whitespace-nowrap">المحفز (TRIGGER)</th>
                    <th className="py-4 px-5 whitespace-nowrap">الإجراء المنفذ (ACTION)</th>
                    <th className="py-4 px-5 whitespace-nowrap">النطاق المستهدف</th>
                    <th className="py-4 px-5 whitespace-nowrap">آخر تشغيل ومعدل النجاح</th>
                    <th className="py-4 px-4 text-center whitespace-nowrap">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e8e2]">
                  {paginatedRules.map((rule) => {
                    const isAlert = rule.triggerType === "whatsapp_failed";
                    const isWhatsAppAction = rule.actionType === "whatsapp" || rule.actionSummary.includes("WhatsApp");

                    return (
                      <tr
                        key={rule.id}
                        className="hover:bg-[#f9faf8]/60 transition-colors group"
                      >
                        {/* Name & Classification (Figma node 1:21430) */}
                        <td className="py-5 px-6">
                          <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/automation/rules/${rule.id}/`}
                                className="font-bold text-[18px] text-[#181d17] hover:text-[#34422a] leading-[28px] transition-colors"
                              >
                                {rule.title}
                              </Link>
                              <span className="bg-[#e5eae0] text-[#181d17] text-[11px] font-medium rounded-full px-2.5 py-0.5 whitespace-nowrap">
                                {rule.categoryLabel}
                              </span>
                            </div>
                            <p className="text-[13px] text-[#454840] font-normal leading-[21px] max-w-[380px]">
                              {rule.description}
                            </p>
                          </div>
                        </td>

                        {/* Trigger (Figma node 1:21439) */}
                        <td className="py-5 px-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[13px] text-[#181d17]">
                              {rule.triggerLabel}
                            </span>
                            <div
                              className={cn(
                                "size-8 rounded-[8px] flex items-center justify-center shrink-0",
                                isAlert ? "bg-[#ffdad6]/60" : "bg-[#ebefe6]"
                              )}
                            >
                              {getTriggerIcon(rule)}
                            </div>
                          </div>
                        </td>

                        {/* Action (Figma node 1:21445) */}
                        <td className="py-5 px-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[13px] text-[#181d17]">
                              {rule.actionSummary}
                            </span>
                            <div
                              className={cn(
                                "size-8 rounded-[8px] flex items-center justify-center shrink-0",
                                isWhatsAppAction ? "bg-[#d8e8cb]/80" : "bg-[#e5eae0]"
                              )}
                            >
                              {getActionIcon(rule)}
                            </div>
                          </div>
                        </td>

                        {/* Target Scope (Figma node 1:21451) */}
                        <td className="py-5 px-5 whitespace-nowrap">
                          <div className="bg-[#ebefe6] content-stretch inline-flex gap-[6px] items-center px-[10px] py-[4px] rounded-[8px]">
                            <Building2 className="size-[11.25px] text-[#181d17]" />
                            <span className="text-[#181d17] text-[11px] font-medium leading-[16px]">
                              {rule.scope}
                            </span>
                          </div>
                        </td>

                        {/* Last Run & Success Rate (Figma node 1:21457) */}
                        <td className="py-5 px-5 whitespace-nowrap">
                          <div className="flex flex-col gap-0.5">
                            <p className="font-medium text-[13px] text-[#181d17] leading-[20px]">
                              {rule.lastExecution}
                            </p>
                            {rule.bookingRef && (
                              <p className="text-[11px] font-normal text-[#75786f] font-mono leading-[16px]">
                                ({rule.bookingRef})
                              </p>
                            )}
                            <div className="flex items-center gap-1.5 pt-0.5">
                              <CheckCircle2 className="size-[11.67px] text-[#54624c]" />
                              <span className="text-[11px] font-semibold text-[#54624c] leading-[16px]">
                                {rule.successRate}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Actions Dropdown (Figma node 1:21467 & 1:23723) */}
                        <td className="py-5 px-4 text-center whitespace-nowrap">
                          <AutomationRuleActionDropdown
                            rule={rule}
                            onPause={handlePauseRule}
                            onActivate={handleActivateRule}
                            onDelete={handleDeleteRule}
                            className="mx-auto"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer / Pagination */}
            <TablePagination
              currentPage={activePage}
              totalPages={totalPages}
              totalCount={totalFiltered}
              fromIndex={totalFiltered === 0 ? 0 : startIndex + 1}
              toIndex={Math.min(startIndex + pageSize, totalFiltered)}
              pageSize={pageSize}
              pageSizeOptions={[5, 10]}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
              entityName="قاعدة"
              pluralEntityName="قواعد"
              registeredLabel="مسجلة"
            />
          </div>
        )
      }

      {/* Confirmation Modals */}
      <PauseRuleModal
        isOpen={isPauseOpen}
        onClose={() => setIsPauseOpen(false)}
        rule={activeRuleForModal}
        onConfirm={confirmPause}
      />

      <ActivateRuleModal
        isOpen={isActivateOpen}
        onClose={() => setIsActivateOpen(false)}
        rule={activeRuleForModal}
        onConfirm={confirmActivate}
      />

      <DeleteRuleModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        rule={activeRuleForModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
