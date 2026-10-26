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
  Building2,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
  MoreVertical,
  SlidersHorizontal,
  FileText,
  Percent,
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
  const [pageSize, setPageSize] = useState(10);
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
    <div className="space-y-6" dir="rtl">
      {/* 1. Header Card [1:26764] - TOP HERO GREETING BAR */}
      <div className="bg-white rounded-[16px] p-6 border border-[#EBEBEB] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#181d17] leading-[34px] font-cairo">
            الاشتراكات
          </h1>
          <p className="text-[13px] text-[#454840] leading-[20px] mt-1 font-cairo">
            إدارة اشتراكات أصحاب العقارات ومتابعة الباقات وحالات الدفع والأرصدة المستهلكة بدقة فائقة.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-bold bg-white hover:bg-gray-50 text-[#181d17] border border-[#E5E8E2] transition-colors cursor-pointer shadow-2xs font-cairo"
          >
            <Download className="w-4 h-4 text-[#454840]" />
            <span>تصدير السجل</span>
          </button>

          <button
            type="button"
            onClick={() => toast.info("نافذة إضافة اشتراك جديد متاحة لمدراء النظام")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-bold bg-[#34422A] hover:bg-[#283320] text-white shadow-sm transition-colors cursor-pointer font-cairo"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>إضافة اشتراك</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Summary Cards [1:27241] */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total (Rightmost in RTL) */}
        <div className="bg-white rounded-[16px] p-4 border border-[#EBEBEB] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#454840]">إجمالي الاشتراكات</span>
            <div className="w-8 h-8 rounded-[8px] bg-[#f6f7f4] flex items-center justify-center text-[#454840]">
              <FolderArchive className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-[28px] font-bold font-mono text-[#181d17] leading-none">248</div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#f1f5eb] text-[#454840]">
              كل المسجل
            </span>
          </div>
        </div>

        {/* Card 2: Active */}
        <div className="bg-white rounded-[16px] p-4 border border-[#EBEBEB] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#454840]">نشطة</span>
            <div className="w-8 h-8 rounded-[8px] bg-[#d8e8c7] flex items-center justify-center text-[#34422a]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[28px] font-bold font-mono text-[#181d17] leading-none">214</span>
              <span className="w-2 h-2 rounded-full bg-[#4b5940]" />
            </div>
            <span className="text-[12px] font-bold text-[#34422a]">86.3%</span>
          </div>
        </div>

        {/* Card 3: Trial */}
        <div className="bg-white rounded-[16px] p-4 border border-[#EBEBEB] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#454840]">تجريبية</span>
            <div className="w-8 h-8 rounded-[8px] bg-[#e8f1fc] flex items-center justify-center text-[#1a56db]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[28px] font-bold font-mono text-[#181d17] leading-none">12</span>
              <span className="w-2 h-2 rounded-full bg-[#1a56db]" />
            </div>
            <span className="text-[11px] text-[#454840]">فترة مجانية</span>
          </div>
        </div>

        {/* Card 4: Expiring */}
        <div className="bg-white rounded-[16px] p-4 border border-[#EBEBEB] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#454840]">منتهية</span>
            <div className="w-8 h-8 rounded-[8px] bg-[#fde8e8] flex items-center justify-center text-[#c81e1e]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[28px] font-bold font-mono text-[#181d17] leading-none">14</span>
              <span className="w-2 h-2 rounded-full bg-[#c81e1e]" />
            </div>
            <span className="text-[11px] font-bold text-[#c81e1e]">بحاجة للتجديد</span>
          </div>
        </div>

        {/* Card 5: Paused */}
        <div className="bg-white rounded-[16px] p-4 border border-[#EBEBEB] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#454840]">متوقفة</span>
            <div className="w-8 h-8 rounded-[8px] bg-[#fef08a] flex items-center justify-center text-[#ca8a04]">
              <Pause className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[28px] font-bold font-mono text-[#181d17] leading-none">8</span>
              <span className="w-2 h-2 rounded-full bg-[#ca8a04]" />
            </div>
            <span className="text-[11px] text-[#454840]">تعليق إداري</span>
          </div>
        </div>
      </div>

      {/* 3. Main Data Card: Tabs, Filters, Table [1:26783] */}
      <div className="bg-white rounded-[16px] border border-[#EBEBEB] shadow-2xs overflow-hidden">
        {/* Status Tabs Bar [1:26784] */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 pt-3 border-b border-gray-100 gap-3">
          {/* Tabs Group */}
          <div className="flex items-center gap-6 overflow-x-auto w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`pb-3 relative text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "all" ? "text-[#181d17]" : "text-[#75786f] hover:text-[#181d17]"
              }`}
            >
              <span>الكل</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#34422A] text-white">
                248
              </span>
              {activeTab === "all" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#34422A] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("active")}
              className={`pb-3 relative text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "active" ? "text-[#181d17]" : "text-[#75786f] hover:text-[#181d17]"
              }`}
            >
              <span>نشطة</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#f1f5eb] text-[#454840]">
                214
              </span>
              {activeTab === "active" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#34422A] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("trial")}
              className={`pb-3 relative text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "trial" ? "text-[#181d17]" : "text-[#75786f] hover:text-[#181d17]"
              }`}
            >
              <span>تجريبية</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#f1f5eb] text-[#454840]">
                12
              </span>
              {activeTab === "trial" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#34422A] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("expiring_soon")}
              className={`pb-3 relative text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "expiring_soon" ? "text-[#181d17]" : "text-[#75786f] hover:text-[#181d17]"
              }`}
            >
              <span>منتهية</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#f1f5eb] text-[#454840]">
                14
              </span>
              {activeTab === "expiring_soon" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#34422A] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("paused")}
              className={`pb-3 relative text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "paused" ? "text-[#181d17]" : "text-[#75786f] hover:text-[#181d17]"
              }`}
            >
              <span>موقوفة</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#f1f5eb] text-[#454840]">
                8
              </span>
              {activeTab === "paused" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#34422A] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("cancelled")}
              className={`pb-3 relative text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "cancelled" ? "text-[#181d17]" : "text-[#75786f] hover:text-[#181d17]"
              }`}
            >
              <span>ملغاة</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#f1f5eb] text-[#454840]">
                0
              </span>
              {activeTab === "cancelled" && (
                <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#34422A] rounded-full" />
              )}
            </button>
          </div>

          {/* Last update timestamp & refresh button */}
          <button
            type="button"
            onClick={handleRefresh}
            className="pb-3 flex items-center gap-1.5 text-[12px] text-[#75786f] hover:text-[#181d17] transition-colors cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#75786f] ${isRefreshing ? "animate-spin text-[#34422A]" : ""}`} />
            <span>آخر تحديث: منذ دقيقتين</span>
          </button>
        </div>

        {/* Filters & Search Toolbar [1:26822] */}
        <div className="p-4 flex flex-col lg:flex-row items-center justify-between gap-3 border-b border-gray-100">
          {/* Search Input [1:26851] */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المالك، المعرّف، أو رقم الاشتراك..."
              className="w-full h-10 pr-10 pl-4 rounded-[12px] border border-gray-200 text-xs text-[#181d17] focus:outline-none focus:border-[#4b5940] transition-colors bg-white font-cairo"
            />
          </div>

          {/* Filter Dropdowns [1:26823] */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Package Filter */}
            <div className="relative">
              <select
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                className="h-10 pr-3 pl-8 rounded-[12px] border border-gray-200 text-xs font-semibold text-[#454840] bg-white focus:outline-none focus:border-[#4b5940] cursor-pointer appearance-none"
              >
                <option value="all">الباقة: الكل</option>
                <option value="standard">باقة الشقق المرخصة</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 pr-3 pl-8 rounded-[12px] border border-gray-200 text-xs font-semibold text-[#454840] bg-white focus:outline-none focus:border-[#4b5940] cursor-pointer appearance-none"
              >
                <option value="all">الحالة: الكل</option>
                <option value="active">نشط</option>
                <option value="pending_payment">بانتظار الدفع</option>
                <option value="expiring_soon">قريب الانتهاء</option>
                <option value="paused">موقوف</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Payment Status Filter */}
            <div className="relative">
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="h-10 pr-3 pl-8 rounded-[12px] border border-gray-200 text-xs font-semibold text-[#454840] bg-white focus:outline-none focus:border-[#4b5940] cursor-pointer appearance-none"
              >
                <option value="all">حالة الدفع: الكل</option>
                <option value="paid">مسدد تلقائياً</option>
                <option value="pending">فاتورة معلقة</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Billing Cycle Filter */}
            <div className="relative">
              <select
                value={billingCycleFilter}
                onChange={(e) => setBillingCycleFilter(e.target.value)}
                className="h-10 pr-3 pl-8 rounded-[12px] border border-gray-200 text-xs font-semibold text-[#454840] bg-white focus:outline-none focus:border-[#4b5940] cursor-pointer appearance-none"
              >
                <option value="all">دورة الفوترة: الكل</option>
                <option value="monthly">شهري</option>
                <option value="annual">سنوي</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Reset Filters Button */}
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
              className="w-10 h-10 rounded-[12px] border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
              title="إعادة ضبط الفلاتر"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4. Subscriptions Data Table [1:26857] */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-[#FAFBF9] border-b border-gray-100 text-[#454840] font-bold">
                <th className="py-4 pr-6">صاحب العقار</th>
                <th className="py-4 px-3">دورة الفوترة</th>
                <th className="py-4 px-3">الشقق المشتراة</th>
                <th className="py-4 px-3">استهلاك الوحدات</th>
                <th className="py-4 px-3">المتبقي</th>
                <th className="py-4 px-3">قيمة الاشتراك</th>
                <th className="py-4 px-3">تاريخ البداية</th>
                <th className="py-4 px-3">تاريخ التجديد / الانتهاء</th>
                <th className="py-4 px-3">الحالة</th>
                <th className="py-4 pl-6 text-center">الاجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#181d17]">
              {paginatedSubscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  onClick={() => router.push(`/billing/${sub.id}/`)}
                  className="hover:bg-[#FAFBF9]/80 transition-colors group cursor-pointer"
                >
                  {/* Owner */}
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#f1f5eb] text-[#34422A] font-bold text-xs flex items-center justify-center shrink-0">
                        {sub.avatarInitials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#181d17] group-hover:text-[#4b5940] transition-colors">
                          {sub.ownerName}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          {sub.ownerCompany || sub.ownerPhone}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Billing Cycle */}
                  <td className="py-4 px-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-[6px] text-[11px] font-semibold ${
                        sub.billingCycle === "annual"
                          ? "bg-[#faf6ed] text-[#854d0e]"
                          : "bg-gray-100 text-[#454840]"
                      }`}
                    >
                      {sub.billingCycleLabel}
                    </span>
                  </td>

                  {/* Purchased Units */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-sm text-[#181d17] font-mono leading-tight">
                      {sub.purchasedUnits}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {sub.purchasedUnits > 10 ? "شقة" : "شقق"}
                    </div>
                  </td>

                  {/* Units Usage Progress */}
                  <td className="py-4 px-3 min-w-[150px]">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-[#454840]">
                          {sub.status === "paused" ? `${sub.purchasedUnits} معطلة` : `${sub.usedUnits} مستخدمة`}
                        </span>
                        <span className="text-gray-400 font-mono">{sub.usagePercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            sub.status === "paused"
                              ? "bg-gray-300"
                              : sub.status === "expiring_soon"
                              ? "bg-amber-600"
                              : "bg-[#34422A]"
                          }`}
                          style={{ width: `${sub.usagePercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Remaining Units */}
                  <td className="py-4 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                        sub.remainingUnits > 0
                          ? "bg-[#ebefe6] text-[#34422a]"
                          : "bg-[#fee2e2] text-[#991b1b]"
                      }`}
                    >
                      {sub.remainingUnits} {sub.remainingUnits === 1 ? "شقة" : sub.remainingUnits > 10 ? "شقة" : "شقق"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-3">
                    <div className="font-bold font-mono text-sm text-[#181d17] leading-tight">
                      {sub.subscriptionPrice.toLocaleString()}
                    </div>
                    <div className="text-[11px] font-medium text-gray-500">ر.س</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{sub.vatNotice}</div>
                  </td>

                  {/* Start Date */}
                  <td className="py-4 px-3 text-[#454840]">
                    <div>{sub.startDate}</div>
                  </td>

                  {/* Renewal Date & Countdown */}
                  <td className="py-4 px-3">
                    <div className="font-semibold text-xs text-[#181d17]">{sub.renewalDate}</div>
                    <div
                      className={`text-[10px] font-medium mt-0.5 ${
                        sub.status === "expiring_soon" || sub.status === "pending_payment"
                          ? "text-red-600 font-bold"
                          : sub.status === "paused"
                          ? "text-red-600 font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      {sub.statusSubText || `متبقي ${sub.renewalCountdownDays} يوماً`}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-3">
                    {sub.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#d8e8cb] text-[#34422a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4b5940]" />
                        {sub.statusLabel}
                      </span>
                    ) : sub.status === "pending_payment" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#fef3c7] text-[#92400e]">
                        {sub.statusLabel}
                      </span>
                    ) : sub.status === "expiring_soon" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#fee2e2] text-[#b91c1c]">
                        {sub.statusLabel}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
                        {sub.statusLabel}
                      </span>
                    )}
                  </td>

                  {/* Actions (Column 10) [1:27421] */}
                  <td className="py-4 pl-6 text-center relative" onClick={(e) => e.stopPropagation()}>
                    {sub.status === "paused" ? (
                      <button
                        type="button"
                        onClick={(e) => handleToggleResume(sub.id, e)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#34422A] hover:bg-[#ebefe6] transition-colors cursor-pointer inline-flex"
                        title="استئناف وتفعيل الاشتراك"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    ) : (
                      <div className="relative inline-block text-right">
                        <button
                          type="button"
                          onClick={() => setOpenMenuId(openMenuId === sub.id ? null : sub.id)}
                          className={`w-8 h-8 rounded-[8px] flex items-center justify-center transition-colors cursor-pointer ${
                            openMenuId === sub.id
                              ? "bg-[#ebefe6] text-[#34422A]"
                              : "hover:bg-gray-100 text-gray-500"
                          }`}
                          title="الإجراءات"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Floating Action Menu [1:27421] */}
                        {openMenuId === sub.id && (
                          <div
                            ref={menuRef}
                            className="absolute left-0 top-full mt-1 w-48 bg-white border border-[#ebefe6] rounded-[12px] p-[6px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] z-50 flex flex-col gap-[2px] font-cairo text-right animate-in fade-in-50 zoom-in-95 duration-100"
                          >
                            {/* 1. عرض الاشتراك */}
                            <Link
                              href={`/billing/${sub.id}/`}
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center justify-between px-3 py-2 rounded-[8px] hover:bg-[#FAFBF9] text-[#181d17] text-[11px] font-medium transition-colors cursor-pointer"
                            >
                              <span>عرض الاشتراك</span>
                              <Eye className="w-3.5 h-3.5 text-[#181d17]" />
                            </Link>

                            {/* 2. عرض المالك */}
                            <Link
                              href={`/owners/${sub.ownerId}/`}
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center justify-between px-3 py-2 rounded-[8px] hover:bg-[#FAFBF9] text-[#181d17] text-[11px] font-medium transition-colors cursor-pointer"
                            >
                              <span>عرض المالك</span>
                              <User className="w-3.5 h-3.5 text-[#181d17]" />
                            </Link>

                            {/* 3. تغيير الباقة */}
                            <Link
                              href="/billing/pricing/"
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center justify-between px-3 py-2 rounded-[8px] hover:bg-[#FAFBF9] text-[#181d17] text-[11px] font-medium transition-colors cursor-pointer"
                            >
                              <span>تغيير الباقة</span>
                              <ArrowUp className="w-3.5 h-3.5 text-[#181d17]" />
                            </Link>

                            {/* 4. تجديد الاشتراك */}
                            <button
                              type="button"
                              onClick={() => handleRenewSubscription(sub.ownerName)}
                              className="flex items-center justify-between px-3 py-2 rounded-[8px] hover:bg-[#FAFBF9] text-[#181d17] text-[11px] font-medium transition-colors cursor-pointer w-full"
                            >
                              <span>تجديد الاشتراك</span>
                              <RotateCw className="w-3.5 h-3.5 text-[#181d17]" />
                            </button>

                            {/* Divider line */}
                            <div className="border-b border-[#ebefe6] my-1" />

                            {/* 5. تعليق الاشتراك */}
                            <button
                              type="button"
                              onClick={() => handlePauseSubscription(sub.id, sub.ownerName)}
                              className="flex items-center justify-between px-3 py-2 rounded-[8px] hover:bg-amber-50/60 text-[#b45309] text-[11px] font-medium transition-colors cursor-pointer w-full"
                            >
                              <span>تعليق الاشتراك</span>
                              <Pause className="w-3.5 h-3.5 text-[#b45309]" />
                            </button>

                            {/* 6. إلغاء الاشتراك */}
                            <button
                              type="button"
                              onClick={() => handleCancelSubscription(sub.id, sub.ownerName)}
                              className="flex items-center justify-between px-3 py-2 rounded-[8px] hover:bg-red-50/60 text-[#ba1a1a] text-[11px] font-medium transition-colors cursor-pointer w-full"
                            >
                              <span>إلغاء الاشتراك</span>
                              <XCircle className="w-3.5 h-3.5 text-[#ba1a1a]" />
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

        {/* 5. Pagination */}
        <TablePagination
          currentPage={activePage}
          totalPages={totalPages}
          totalCount={248}
          fromIndex={totalFiltered === 0 ? 0 : startIndex + 1}
          toIndex={Math.min(startIndex + pageSize, totalFiltered)}
          pageSize={pageSize}
          pageSizeOptions={[5, 10]}
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
      <div className="p-4 rounded-[16px] bg-[#f1f5eb] border border-[#e5e8e2]/60 flex items-center gap-4 text-xs text-gray-600">
        <div className="w-9 h-9 rounded-full bg-[#eaf1e8] flex items-center justify-center text-[#4b5940] shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-[#181d17] text-[13px] font-cairo">
            سياسة احتساب استهلاك العقارات وتعديل الباقات
          </h4>
          <p className="text-[12px] leading-relaxed text-[#454840] font-cairo">
            يتم احتساب عدد العقارات بناءً على العقارات النشطة فقط والمسندة لمالك العقار. عند تخفيض
            الباقة أو انتهاء مدتها، لا يتم مسح أو تجميد العقارات الفائضة تلقائياً لضمان سلامة العمليات
            التشغيلية، بل يتم إرسال إشعار للمالك وظهور تنبيه تجاوز الحد لإدارة المنصة لاتخاذ الإجراء
            المناسب.
          </p>
        </div>
      </div>
    </div>
  );
}
