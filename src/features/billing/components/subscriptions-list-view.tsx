"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Plus,
  RotateCcw,
  RotateCw,
  FolderArchive,
  ArrowUp,
  ChevronDown,
  Calendar,
  CheckCircle2,
  Clock,
  Info,
  MoreVertical,
  Play,
  Eye,
  User,
  Pause,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { TablePagination } from "@/components/shared/table-pagination";
import { FilterButton } from "@/components/shared/filter-button";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { SubscriptionsAdvancedFilterDrawer } from "./subscriptions-advanced-filter-drawer";
import { Subscription } from "../types";
import { initialSubscriptions } from "../data/mock-billing";

export function SubscriptionsListView() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "trial" | "expiring_soon" | "paused" | "cancelled"
  >("all");
  const [packageFilter, setPackageFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [billingCycleFilter, setBillingCycleFilter] = useState<string>("all");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const activeBillingFiltersCount =
    (packageFilter !== "all" ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0) +
    (paymentStatusFilter !== "all" ? 1 : 0) +
    (billingCycleFilter !== "all" ? 1 : 0);

  const subCounts = useMemo(() => {
    const total = subscriptions.length;
    const active = subscriptions.filter((s) => s.status === "active").length;
    const trial = subscriptions.filter((s) => s.status === "trial").length;
    const expiring = subscriptions.filter((s) => s.status === "expiring_soon" || s.status === "pending_payment").length;
    const paused = subscriptions.filter((s) => s.status === "paused").length;
    const cancelled = subscriptions.filter((s) => s.status === "cancelled").length;
    const activePct = total > 0 ? ((active / total) * 100).toFixed(1) + "%" : "0%";
    return { total, active, trial, expiring, paused, cancelled, activePct };
  }, [subscriptions]);

  const billingTabs = useMemo(
    () => [
      { id: "all", label: "الكل", count: subCounts.total },
      { id: "active", label: "نشطة", count: subCounts.active },
      { id: "trial", label: "تجريبية", count: subCounts.trial },
      { id: "expiring_soon", label: "منتهية", count: subCounts.expiring },
      { id: "paused", label: "موقوفة", count: subCounts.paused },
      { id: "cancelled", label: "ملغاة", count: subCounts.cancelled },
    ],
    [subCounts]
  );

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("تم تحديث بيانات الاشتراكات والفوترة اللحظية.");
    }, 600);
  };

  const handleExport = () => {
    toast.info("جارٍ تجهيز سجل الاشتراكات الضريبية بصيغة CSV...");
    setTimeout(() => {
      toast.success("تم تصدير سجل الاشتراكات بنجاح!");
    }, 800);
  };

  const handleToggleResume = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: "active",
              statusLabel: "نشط",
              statusBadgeVariant: "active",
              statusSubText: "تم استئناف الاشتراك",
              usedUnits: sub.purchasedUnits,
              remainingUnits: 0,
              usagePercentage: 100,
            }
          : sub
      )
    );
    toast.success("تم استئناف الاشتراك وتفعيل الوحدات بنجاح.");
  };

  const handlePauseSubscription = (id: string, ownerName: string) => {
    setOpenMenuId(null);
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: "paused",
              statusLabel: "موقوف",
              statusBadgeVariant: "paused",
              statusSubText: "طلب إيقاف مالك",
            }
          : sub
      )
    );
    toast.warning(`تم تعليق اشتراك ${ownerName} مؤقتاً.`);
  };

  const handleCancelSubscription = (id: string, ownerName: string) => {
    setOpenMenuId(null);
    toast.error(`تم إلغاء اشتراك ${ownerName}.`);
  };

  const handleRenewSubscription = (ownerName: string) => {
    setOpenMenuId(null);
    toast.success(`تم إرسال طلب تجديد الاشتراك للمالك ${ownerName}.`);
  };

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.ownerPhone.includes(searchQuery) ||
        (sub.ownerCompany && sub.ownerCompany.toLowerCase().includes(searchQuery.toLowerCase())) ||
        sub.subscriptionCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && sub.status === "active") ||
        (activeTab === "trial" && sub.status === "trial") ||
        (activeTab === "expiring_soon" && (sub.status === "expiring_soon" || sub.status === "pending_payment")) ||
        (activeTab === "paused" && sub.status === "paused") ||
        (activeTab === "cancelled" && sub.status === "cancelled");

      const matchesCycle =
        billingCycleFilter === "all" || sub.billingCycle === billingCycleFilter;

      const matchesStatus =
        statusFilter === "all" || sub.status === statusFilter;

      return matchesSearch && matchesTab && matchesCycle && matchesStatus;
    });
  }, [subscriptions, searchQuery, activeTab, billingCycleFilter, statusFilter]);

  const totalFiltered = filteredSubscriptions.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedSubscriptions = filteredSubscriptions.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="space-y-6 font-cairo" dir="rtl">
      {/* 1. Header Card [1:26764] - TOP HERO GREETING BAR */}
      <div className="bg-white rounded-[16px] px-8 py-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#181d17] leading-[34px]">
            الاشتراكات
          </h1>
          <p className="text-[13px] font-medium text-[#454840] leading-[20px] mt-1">
            إدارة اشتراكات أصحاب العقارات ومتابعة الباقات وحالات الدفع والأرصدة المستهلكة بدقة فائقة.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Secondary Action: Export Log */}
          <button
            type="button"
            onClick={handleExport}
            className="bg-white hover:bg-[#f9faf7] text-[#181d17] text-[14px] font-semibold px-4 h-[44px] rounded-[12px] border border-[#e5eae0] flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] cursor-pointer transition-colors"
          >
            <span>تصدير السجل</span>
            <Download className="w-4 h-4 text-[#454840]" />
          </button>

          {/* Primary Action: Add Subscription */}
          <button
            type="button"
            onClick={() => toast.info("نافذة إضافة اشتراك جديد متاحة لمدراء النظام")}
            className="bg-[#4b5940] hover:bg-[#3d4934] text-white text-[14px] font-medium px-5 h-[44px] rounded-[12px] flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] cursor-pointer transition-colors"
          >
            <span>إضافة اشتراك</span>
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Summary Cards [1:27241] */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[14px]">
        {/* Card 1: Total (Rightmost in RTL) */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#e5eae0]/50 flex flex-col justify-between h-[118px]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#454840]">إجمالي الاشتراكات</span>
            <div className="size-8 rounded-[8px] bg-[#f1f5eb] flex items-center justify-center text-[#454840]">
              <FolderArchive className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">{subCounts.total}</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#f1f5eb] text-[#454840]">
              كل المسجل
            </span>
          </div>
        </div>

        {/* Card 2: Active */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#e5eae0]/50 flex flex-col justify-between h-[118px]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#454840]">نشطة</span>
            <div className="size-8 rounded-[8px] bg-[rgba(216,232,203,0.5)] flex items-center justify-center text-[#34422a]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">{subCounts.active}</span>
              <span className="size-2.5 rounded-full bg-[#059669]" />
            </div>
            <span className="text-[11px] font-medium text-[#54624c]">{subCounts.activePct}</span>
          </div>
        </div>

        {/* Card 3: Trial */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#e5eae0]/50 flex flex-col justify-between h-[118px]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#454840]">تجريبية</span>
            <div className="size-8 rounded-[8px] bg-[#dde4dc] flex items-center justify-center text-[#181d17]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">{subCounts.trial}</span>
              <span className="size-2.5 rounded-full bg-[#3b82f6]" />
            </div>
            <span className="text-[11px] font-medium text-[#454840]">فترة مجانية</span>
          </div>
        </div>

        {/* Card 4: Expiring */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#e5eae0]/50 flex flex-col justify-between h-[118px]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#454840]">منتهية</span>
            <div className="size-8 rounded-[8px] bg-[rgba(255,218,214,0.6)] flex items-center justify-center text-[#ba1a1a]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">{subCounts.expiring}</span>
              <span className="size-2.5 rounded-full bg-[#ba1a1a]" />
            </div>
            <span className="text-[11px] font-medium text-[#ba1a1a]">بحاجة للتجديد</span>
          </div>
        </div>

        {/* Card 5: Paused */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#e5eae0]/50 flex flex-col justify-between h-[118px]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#454840]">متوقفة</span>
            <div className="size-8 rounded-[8px] bg-[#fef3c7] flex items-center justify-center text-[#ca8a04]">
              <Pause className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">{subCounts.paused}</span>
              <span className="size-2.5 rounded-full bg-[#f59e0b]" />
            </div>
            <span className="text-[11px] font-medium text-[#454840]">تعليق إداري</span>
          </div>
        </div>
      </div>

      {/* 3. Main Content Container: Tabs, Search, Filters & Table [1:26783] */}
      <div className="bg-white rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#e5eae0]/60 overflow-hidden">
        {/* Status Tabs Bar & Toolbar [1:26822] */}
        <div className="p-4 sm:p-5 border-b border-[#e5eae0] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#454840]">قائمة الاشتراكات والعقود</span>
            <button
              type="button"
              onClick={handleRefresh}
              className="flex items-center gap-2 text-[11px] font-medium text-[#454840] hover:text-[#181d17] transition-colors cursor-pointer shrink-0"
            >
              <span>آخر تحديث: منذ دقيقتين</span>
              <RotateCw className={`size-3 text-[#454840] ${isRefreshing ? "animate-spin text-[#4b5940]" : ""}`} />
            </button>
          </div>

          <TableToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="ابحث باسم المالك، المعرف، أو رقم الاشتراك..."
            tabs={billingTabs}
            currentTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId as any)}
            onOpenAdvancedFilter={() => setIsFilterDrawerOpen(true)}
            activeFiltersCount={activeBillingFiltersCount}
            filterButtonTitle="تصفية الاشتراكات المتقدمة"
          />
        </div>

        {/* 4. Subscriptions Data Table [1:26857] */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-[#f1f5eb] text-[#454840] text-[12px] font-semibold border-b border-[#e5eae0]">
                <th className="py-4 pr-6 font-semibold whitespace-nowrap">صاحب العقار</th>
                <th className="py-4 px-3 text-center font-semibold whitespace-nowrap leading-[18px]">
                  دورة<br />الفوترة
                </th>
                <th className="py-4 px-3 text-center font-semibold whitespace-nowrap leading-[18px]">
                  الشقق<br />المشتراة
                </th>
                <th className="py-4 px-3 font-semibold whitespace-nowrap">استهلاك الوحدات</th>
                <th className="py-4 px-3 text-center font-semibold whitespace-nowrap">المتبقي</th>
                <th className="py-4 px-3 font-semibold whitespace-nowrap leading-[18px]">
                  قيمة<br />الاشتراك
                </th>
                <th className="py-4 px-3 font-semibold whitespace-nowrap leading-[18px]">
                  تاريخ<br />البداية
                </th>
                <th className="py-4 px-3 font-semibold whitespace-nowrap leading-[18px]">
                  تاريخ التجديد<br />/ الانتهاء
                </th>
                <th className="py-4 px-3 text-center font-semibold whitespace-nowrap">الحالة</th>
                <th className="py-4 pl-6 text-center font-semibold whitespace-nowrap">الاجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5eae0] text-[#181d17]">
              {paginatedSubscriptions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-[#75786f] text-[13px] font-medium">
                    لا توجد أي اشتراكات مسجلة تطابق خيارات التصفية الحالية
                  </td>
                </tr>
              ) : (
                paginatedSubscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-[#fafbf9] transition-colors"
                >
                  {/* Column 1: Owner */}
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-3">
                      <div className="size-[36px] rounded-full bg-[#dfe4db] text-[#34422a] font-bold text-[12px] flex items-center justify-center shrink-0">
                        {sub.avatarInitials}
                      </div>
                      <div>
                        <div className="font-semibold text-[14px] text-[#181d17]">
                          {sub.ownerName}
                        </div>
                        <div className="text-[11px] text-[#75786f] font-medium mt-0.5 tracking-[0.5px]">
                          {sub.ownerCompany || sub.ownerPhone}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Billing Cycle */}
                  <td className="py-4 px-3 text-center">
                    <span
                      className={`inline-block px-[10px] py-[6px] rounded-[6px] text-[11px] font-medium ${
                        sub.billingCycle === "annual"
                          ? "bg-[#faf6ed] text-[#854d0e]"
                          : "bg-[#ebefe6] text-[#454840]"
                      }`}
                    >
                      {sub.billingCycleLabel}
                    </span>
                  </td>

                  {/* Column 3: Purchased Units */}
                  <td className="py-4 px-3 text-center whitespace-nowrap">
                    <div className="inline-flex items-center justify-center gap-1 font-semibold text-[13px] text-[#181d17]">
                      <span>{sub.purchasedUnits}</span>
                      <span className="text-[11px] text-[#75786f] font-normal">
                        {sub.purchasedUnits > 10 ? "شقة" : "شقق"}
                      </span>
                    </div>
                  </td>

                  {/* Column 4: Units Usage Progress */}
                  <td className="py-4 px-3 min-w-[140px]">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-[#181d17]">
                          {sub.status === "paused" ? `${sub.purchasedUnits} معطلة` : `${sub.usedUnits} مستخدمة`}
                        </span>
                        <span className="text-[#75786f] font-medium">{sub.usagePercentage}%</span>
                      </div>
                      <div className="w-full h-[6px] rounded-full bg-[#ebefe6] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            sub.status === "paused"
                              ? "bg-gray-400"
                              : "bg-[#4b5940]"
                          }`}
                          style={{ width: `${sub.usagePercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Column 5: Remaining Units Badge */}
                  <td className="py-4 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold ${
                        sub.status === "paused"
                          ? "bg-[#ebefe6] text-[#75786f]"
                          : sub.remainingUnits > 0
                          ? "bg-[#e5eae0] text-[#34422a]"
                          : "bg-[#ffd8d6] text-[#ba1a1a]"
                      }`}
                    >
                      <span>{sub.remainingUnits}</span>
                      <span className="text-[11px]">
                        {sub.remainingUnits === 1 ? "شقة" : sub.remainingUnits > 10 ? "شقة" : "شقق"}
                      </span>
                    </span>
                  </td>

                  {/* Column 6: Price */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-[14px] text-[#181d17] leading-tight">
                      {sub.subscriptionPrice.toLocaleString()} ر.س
                    </div>
                    <div className="text-[11px] text-[#75786f] font-medium mt-0.5">
                      {sub.vatNotice}
                    </div>
                  </td>

                  {/* Column 7: Start Date */}
                  <td className="py-4 px-3 text-[#454840] text-[11px] font-medium">
                    <div>{sub.startDate}</div>
                  </td>

                  {/* Column 8: Renewal Date & Countdown */}
                  <td className="py-4 px-3">
                    <div className="font-medium text-[11px] text-[#181d17]">{sub.renewalDate}</div>
                    <div
                      className={`text-[11px] font-medium mt-0.5 ${
                        sub.status === "expiring_soon"
                          ? "text-[#ba1a1a] font-bold"
                          : sub.status === "pending_payment"
                          ? "text-[#ba1a1a] font-semibold"
                          : sub.status === "paused"
                          ? "text-[#ba1a1a]"
                          : sub.statusSubText?.includes("متبقي")
                          ? "text-[#34422a]"
                          : "text-[#75786f]"
                      }`}
                    >
                      {sub.statusSubText || `متبقي ${sub.renewalCountdownDays} يوماً`}
                    </div>
                  </td>

                  {/* Column 9: Status Badge */}
                  <td className="py-4 px-3 text-center">
                    {sub.status === "active" ? (
                      <span className="inline-block px-[10px] py-[2px] rounded-full text-[11px] font-semibold bg-[#e5eae0] text-[#34422a]">
                        نشط
                      </span>
                    ) : sub.status === "pending_payment" ? (
                      <span className="inline-block px-[10px] py-[2px] rounded-full text-[11px] font-semibold bg-[#faeed6] text-[#854d0e]">
                        بانتظار الدفع
                      </span>
                    ) : sub.status === "expiring_soon" ? (
                      <span className="inline-block px-[10px] py-[2px] rounded-full text-[11px] font-semibold bg-[#ffd8d6] text-[#ba1a1a]">
                        قريب الانتهاء
                      </span>
                    ) : (
                      <span className="inline-block px-[10px] py-[2px] rounded-full text-[11px] font-semibold bg-[#ebefe6] text-[#75786f]">
                        موقوف
                      </span>
                    )}
                  </td>

                  {/* Column 10: Actions (Dropdown [1:27421]) */}
                  <td className="py-4 pl-6 text-center relative" onClick={(e) => e.stopPropagation()}>
                    {sub.status === "paused" ? (
                      <button
                        type="button"
                        onClick={(e) => handleToggleResume(sub.id, e)}
                        className="size-8 rounded-full border border-[#ebefe6] flex items-center justify-center text-[#454840] hover:text-[#34422a] hover:bg-[#ebefe6] transition-colors cursor-pointer inline-flex"
                        title="استئناف وتفعيل الاشتراك"
                      >
                        <Play className="size-3.5 fill-current" />
                      </button>
                    ) : (
                      <div className="relative inline-block text-right">
                        <button
                          type="button"
                          onClick={() => setOpenMenuId(openMenuId === sub.id ? null : sub.id)}
                          className={`size-8 rounded-[8px] flex items-center justify-center transition-colors cursor-pointer ${
                            openMenuId === sub.id
                              ? "bg-[#ebefe6] text-[#34422a]"
                              : "hover:bg-[#ebefe6] text-[#75786f]"
                          }`}
                          title="الإجراءات"
                        >
                          <MoreVertical className="size-4" />
                        </button>

                        {/* Floating Action Menu [1:27421] - EXACT FIGMA REPRODUCTION */}
                        {openMenuId === sub.id && (
                          <div
                            ref={menuRef}
                            className="absolute left-0 top-full mt-1 w-[192px] bg-white border border-[#ebefe6] rounded-[12px] p-[6px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] z-50 flex flex-col gap-[2px] text-right animate-in fade-in-50 zoom-in-95 duration-100"
                            data-node-id="1:27421"
                          >
                            {/* 1. عرض الاشتراك */}
                            <Link
                              href={`/billing/${sub.id}/`}
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-[10px] px-3 py-2 rounded-[8px] hover:bg-[#f1f5eb] text-[#181d17] text-[11px] font-medium leading-[16px] transition-colors cursor-pointer"
                            >
                              <Eye className="size-[15px] text-[#181d17] shrink-0" />
                              <span>عرض الاشتراك</span>
                            </Link>

                            {/* 2. عرض المالك */}
                            <Link
                              href={`/owners/${sub.ownerId}/`}
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-[10px] px-3 py-2 rounded-[8px] hover:bg-[#f1f5eb] text-[#181d17] text-[11px] font-medium leading-[16px] transition-colors cursor-pointer"
                            >
                              <User className="size-[15px] text-[#181d17] shrink-0" />
                              <span>عرض المالك</span>
                            </Link>

                            {/* 3. تغيير الباقة */}
                            <Link
                              href="/billing/pricing/"
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-[10px] px-3 py-2 rounded-[8px] hover:bg-[#f1f5eb] text-[#181d17] text-[11px] font-medium leading-[16px] transition-colors cursor-pointer"
                            >
                              <ArrowUp className="size-[15px] text-[#181d17] shrink-0" />
                              <span>تغيير الباقة</span>
                            </Link>

                            {/* 4. تجديد الاشتراك */}
                            <button
                              type="button"
                              onClick={() => handleRenewSubscription(sub.ownerName)}
                              className="flex items-center gap-[10px] px-3 py-2 rounded-[8px] hover:bg-[#f1f5eb] text-[#181d17] text-[11px] font-medium leading-[16px] transition-colors cursor-pointer w-full text-right"
                            >
                              <RotateCw className="size-[15px] text-[#181d17] shrink-0" />
                              <span>تجديد الاشتراك</span>
                            </button>

                            {/* Divider line */}
                            <div className="h-px bg-[#ebefe6] my-1 w-full" />

                            {/* 5. تعليق الاشتراك */}
                            <button
                              type="button"
                              onClick={() => handlePauseSubscription(sub.id, sub.ownerName)}
                              className="flex items-center gap-[10px] px-3 py-2 rounded-[8px] hover:bg-[#fef3c7]/60 text-[#b45309] text-[11px] font-medium leading-[16px] transition-colors cursor-pointer w-full text-right"
                            >
                              <Pause className="size-[14px] text-[#b45309] shrink-0" />
                              <span>تعليق الاشتراك</span>
                            </button>

                            {/* 6. إلغاء الاشتراك */}
                            <button
                              type="button"
                              onClick={() => handleCancelSubscription(sub.id, sub.ownerName)}
                              className="flex items-center gap-[10px] px-3 py-2 rounded-[8px] hover:bg-[#fee2e2]/60 text-[#ba1a1a] text-[11px] font-medium leading-[16px] transition-colors cursor-pointer w-full text-right"
                            >
                              <XCircle className="size-[15px] text-[#ba1a1a] shrink-0" />
                              <span>إلغاء الاشتراك</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>

        {/* 5. Table Footer / Pagination */}
        <TablePagination
          currentPage={activePage}
          totalPages={totalPages}
          totalCount={totalFiltered}
          fromIndex={totalFiltered === 0 ? 0 : startIndex + 1}
          toIndex={Math.min(startIndex + pageSize, totalFiltered)}
          pageSize={pageSize}
          pageSizeOptions={[5, 8, 10, 20]}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          entityName="اشتراك"
          pluralEntityName="اشتراكات"
          registeredLabel="مسجل"
        />
      </div>

      {/* 6. Quick Reference / Policy Notice Banner [1:27231] */}
      <div className="p-4 rounded-[16px] bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0]/50 flex items-start gap-4">
        {/* Info Icon Box on Right in RTL */}
        <div className="size-9 rounded-[12px] bg-[rgba(75,89,64,0.2)] flex items-center justify-center text-[#4b5940] shrink-0 mt-0.5">
          <Info className="size-[17px]" />
        </div>

        {/* Policy Text on Left in RTL */}
        <div className="space-y-1">
          <h4 className="text-[14px] font-semibold text-[#181d17] leading-[20px]">
            سياسة احتساب استهلاك العقارات وتعديل الباقات
          </h4>
          <p className="text-[13px] font-normal leading-[21.13px] text-[#454840]">
            يتم احتساب عدد العقارات بناءً على العقارات النشطة فقط والمسندة لمالك العقار. عند تخفيض الباقة أو انتهاء مدتها، لا يتم مسح أو تجميد العقارات الفائضة تلقائياً لضمان سلامة العمليات التشغيلية، بل يتم إرسال إشعار للمالك وظهور تنبيه تجاوز الحد لإدارة المنصة لاتخاذ الإجراء المناسب.
          </p>
        </div>
      </div>
      <SubscriptionsAdvancedFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={{
          packageFilter,
          statusFilter,
          paymentStatusFilter,
          billingCycleFilter,
        }}
        onApplyFilters={(newFilters) => {
          setPackageFilter(newFilters.packageFilter);
          setStatusFilter(newFilters.statusFilter);
          setPaymentStatusFilter(newFilters.paymentStatusFilter);
          setBillingCycleFilter(newFilters.billingCycleFilter);
        }}
        onResetFilters={() => {
          setPackageFilter("all");
          setStatusFilter("all");
          setPaymentStatusFilter("all");
          setBillingCycleFilter("all");
        }}
        totalResultsCount={filteredSubscriptions.length}
      />
    </div>
  );
}
