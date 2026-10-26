"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Subscription } from "../types";
import { initialSubscriptions } from "../data/mock-billing";

export function SubscriptionsListView() {
  const router = useRouter();
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

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
            <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">248</span>
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
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">214</span>
              <span className="size-2.5 rounded-full bg-[#059669]" />
            </div>
            <span className="text-[11px] font-medium text-[#54624c]">86.3%</span>
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
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">12</span>
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
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">14</span>
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
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">8</span>
              <span className="size-2.5 rounded-full bg-[#f59e0b]" />
            </div>
            <span className="text-[11px] font-medium text-[#454840]">تعليق إداري</span>
          </div>
        </div>
      </div>

      {/* 3. Main Content Container: Tabs, Search, Filters & Table [1:26783] */}
      <div className="bg-white rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#e5eae0]/60 overflow-hidden">
        {/* Status Tabs Bar [1:26784] */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 border-b border-[#e5eae0] gap-4">
          {/* Tabs Group (from right to left) */}
          <div className="flex items-center gap-8 overflow-x-auto w-full sm:w-auto">
            {/* Tab: الكل */}
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`py-4 relative text-[14px] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "all" ? "text-[#34422a] font-bold" : "text-[#454840] font-semibold hover:text-[#181d17]"
              }`}
            >
              <span>الكل</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  activeTab === "all" ? "bg-[#4b5940] text-white" : "bg-[#e5eae0] text-[#454840]"
                }`}
              >
                248
              </span>
              {activeTab === "all" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#4b5940] rounded-full" />
              )}
            </button>

            {/* Tab: نشطة */}
            <button
              type="button"
              onClick={() => setActiveTab("active")}
              className={`py-4 relative text-[14px] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "active" ? "text-[#34422a] font-bold" : "text-[#454840] font-semibold hover:text-[#181d17]"
              }`}
            >
              <span>نشطة</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  activeTab === "active" ? "bg-[#4b5940] text-white" : "bg-[#e5eae0] text-[#454840]"
                }`}
              >
                214
              </span>
              {activeTab === "active" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#4b5940] rounded-full" />
              )}
            </button>

            {/* Tab: تجريبية */}
            <button
              type="button"
              onClick={() => setActiveTab("trial")}
              className={`py-4 relative text-[14px] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "trial" ? "text-[#34422a] font-bold" : "text-[#454840] font-semibold hover:text-[#181d17]"
              }`}
            >
              <span>تجريبية</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  activeTab === "trial" ? "bg-[#4b5940] text-white" : "bg-[#e5eae0] text-[#454840]"
                }`}
              >
                12
              </span>
              {activeTab === "trial" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#4b5940] rounded-full" />
              )}
            </button>

            {/* Tab: منتهية */}
            <button
              type="button"
              onClick={() => setActiveTab("expiring_soon")}
              className={`py-4 relative text-[14px] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "expiring_soon" ? "text-[#34422a] font-bold" : "text-[#454840] font-semibold hover:text-[#181d17]"
              }`}
            >
              <span>منتهية</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  activeTab === "expiring_soon" ? "bg-[#4b5940] text-white" : "bg-[#e5eae0] text-[#454840]"
                }`}
              >
                14
              </span>
              {activeTab === "expiring_soon" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#4b5940] rounded-full" />
              )}
            </button>

            {/* Tab: موقوفة */}
            <button
              type="button"
              onClick={() => setActiveTab("paused")}
              className={`py-4 relative text-[14px] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "paused" ? "text-[#34422a] font-bold" : "text-[#454840] font-semibold hover:text-[#181d17]"
              }`}
            >
              <span>موقوفة</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  activeTab === "paused" ? "bg-[#4b5940] text-white" : "bg-[#e5eae0] text-[#454840]"
                }`}
              >
                8
              </span>
              {activeTab === "paused" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#4b5940] rounded-full" />
              )}
            </button>

            {/* Tab: ملغاة */}
            <button
              type="button"
              onClick={() => setActiveTab("cancelled")}
              className={`py-4 relative text-[14px] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "cancelled" ? "text-[#34422a] font-bold" : "text-[#454840] font-semibold hover:text-[#181d17]"
              }`}
            >
              <span>ملغاة</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  activeTab === "cancelled" ? "bg-[#4b5940] text-white" : "bg-[#e5eae0] text-[#454840]"
                }`}
              >
                0
              </span>
              {activeTab === "cancelled" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#4b5940] rounded-full" />
              )}
            </button>
          </div>

          {/* Last update timestamp & refresh button */}
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-2 text-[11px] font-medium text-[#454840] hover:text-[#181d17] transition-colors cursor-pointer py-3 shrink-0"
          >
            <span>آخر تحديث: منذ دقيقتين</span>
            <RotateCw className={`size-3 text-[#454840] ${isRefreshing ? "animate-spin text-[#4b5940]" : ""}`} />
          </button>
        </div>

        {/* Filters & Search Toolbar [1:26822] */}
        <div className="bg-[rgba(241,245,235,0.4)] p-6 flex flex-col lg:flex-row items-center justify-between gap-3 border-b border-[#e5eae0]">
          {/* Search Input [1:26851] (Right side in RTL) */}
          <div className="relative flex-1 max-w-[512px] w-full">
            <div className="bg-white h-[44px] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-transparent focus-within:border-[#4b5940] flex items-center pr-11 pl-4 transition-colors">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم المالك، المعرف، أو رقم الاشتراك..."
                className="w-full bg-transparent text-[13px] text-[#181d17] placeholder-[#75786f] focus:outline-none"
              />
            </div>
            <Search className="size-[15px] text-[#75786f] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filter Dropdowns & Reset Button [1:26823] (Left side in RTL) */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* 1. Package Filter */}
            <div className="relative">
              <select
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                className="h-[44px] pr-3 pl-8 rounded-[12px] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[12px] font-semibold text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#4b5940] cursor-pointer appearance-none border-0"
              >
                <option value="all">الباقة: الكل</option>
                <option value="standard">باقة الشقق المرخصة</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* 2. Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[44px] pr-3 pl-8 rounded-[12px] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[12px] font-semibold text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#4b5940] cursor-pointer appearance-none border-0"
              >
                <option value="all">الحالة: الكل</option>
                <option value="active">نشط</option>
                <option value="pending_payment">بانتظار الدفع</option>
                <option value="expiring_soon">قريب الانتهاء</option>
                <option value="paused">موقوف</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* 3. Payment Status Filter */}
            <div className="relative">
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="h-[44px] pr-3 pl-8 rounded-[12px] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[12px] font-semibold text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#4b5940] cursor-pointer appearance-none border-0"
              >
                <option value="all">حالة الدفع: الكل</option>
                <option value="paid">مسدد تلقائياً</option>
                <option value="pending">فاتورة معلقة</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* 4. Billing Cycle Filter */}
            <div className="relative">
              <select
                value={billingCycleFilter}
                onChange={(e) => setBillingCycleFilter(e.target.value)}
                className="h-[44px] pr-3 pl-8 rounded-[12px] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[12px] font-semibold text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#4b5940] cursor-pointer appearance-none border-0"
              >
                <option value="all">دورة الفوترة: الكل</option>
                <option value="monthly">شهري</option>
                <option value="annual">سنوي</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* 5. Reset Filters Button */}
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
                setBillingCycleFilter("all");
                setStatusFilter("all");
                setPaymentStatusFilter("all");
                setPackageFilter("all");
                toast.info("تمت استعادة إعدادات التصفية الافتراضية.");
              }}
              className="size-[44px] rounded-[12px] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#454840] hover:bg-gray-50 transition-colors cursor-pointer"
              title="إعادة ضبط الفلاتر"
            >
              <RotateCcw className="size-[14px]" />
            </button>
          </div>
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
              {paginatedSubscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  onClick={() => router.push(`/billing/${sub.id}/`)}
                  className="hover:bg-[#fafbf9] transition-colors group cursor-pointer"
                >
                  {/* Column 1: Owner */}
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-3">
                      <div className="size-[36px] rounded-full bg-[#dfe4db] text-[#34422a] font-bold text-[12px] flex items-center justify-center shrink-0">
                        {sub.avatarInitials}
                      </div>
                      <div>
                        <div className="font-semibold text-[14px] text-[#181d17] group-hover:text-[#4b5940] transition-colors">
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
              ))}
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
    </div>
  );
}
