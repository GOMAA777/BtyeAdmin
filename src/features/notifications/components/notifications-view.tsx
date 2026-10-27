"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  CalendarDays,
  Wrench,
  Receipt,
  Zap,
  ShieldCheck,
  Search,
  Trash2,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
  Clock,
  Sparkles,
  Filter,
  Check,
  X,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ChevronLeft,
  CheckCircle2,
  Radio,
  Layers,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { AnimatedTabItem } from "@/components/shared/animated-tabs";
import { useNotificationsStore } from "../stores/use-notifications-store";
import {
  NotificationItem,
  NotificationFilterTab,
  NotificationPriority,
  NotificationCategory,
} from "../types";
import {
  NotificationsFilterDrawer,
  NotificationsFilterState,
  initialNotificationsFilterState,
} from "./notifications-filter-drawer";

function getCategoryMeta(category: NotificationCategory) {
  switch (category) {
    case "bookings":
      return {
        icon: CalendarDays,
        bg: "bg-[#4B5940]/10",
        text: "text-[#4B5940]",
        border: "border-[#4B5940]/20",
        label: "الحجوزات",
      };
    case "operations":
      return {
        icon: Wrench,
        bg: "bg-amber-500/10",
        text: "text-amber-700",
        border: "border-amber-200",
        label: "الصيانة والتشغيل",
      };
    case "billing":
      return {
        icon: Receipt,
        bg: "bg-emerald-500/10",
        text: "text-emerald-700",
        border: "border-emerald-200",
        label: "الاشتراكات والفوترة",
      };
    case "automation":
      return {
        icon: Zap,
        bg: "bg-purple-500/10",
        text: "text-purple-700",
        border: "border-purple-200",
        label: "الأتمتة والرسائل",
      };
    case "system":
    default:
      return {
        icon: ShieldCheck,
        bg: "bg-blue-500/10",
        text: "text-blue-700",
        border: "border-blue-200",
        label: "أمان ونظام",
      };
  }
}

function getPriorityBadge(priority: NotificationPriority) {
  switch (priority) {
    case "urgent":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold border border-red-200">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          عاجل جداً
        </span>
      );
    case "high":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200">
          هام
        </span>
      );
    case "normal":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF2EB] text-[#4B5940] text-[11px] font-medium border border-[#DCE2D7]">
          عادي
        </span>
      );
    case "low":
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F5F1E9] text-[#7C694E] text-[11px] font-medium border border-[#E5DEC9]">
          منخفض
        </span>
      );
  }
}

export function NotificationsView() {
  const router = useRouter();
  const {
    notifications,
    hasHydrated,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    clearReadNotifications,
    resetToDefault,
  } = useNotificationsStore();

  const isHydrated = hasHydrated;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<NotificationFilterTab>("all");
  const [viewMode, setViewMode] = useState<"cards" | "compact">("cards");
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<NotificationsFilterState>(
    initialNotificationsFilterState
  );

  // Active filters count for "شكل الفلتر" badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.readStatus !== "all") count++;
    if (advancedFilters.priority !== "all") count++;
    if (advancedFilters.category !== "all") count++;
    return count;
  }, [advancedFilters]);

  // Stats calculation (strictly guarded by isHydrated to prevent phantom numbers on initial load)
  const totalCount = isHydrated ? notifications.length : 0;
  const unreadCount = useMemo(
    () => (isHydrated ? notifications.filter((n) => !n.read).length : 0),
    [notifications, isHydrated]
  );
  const urgentCount = useMemo(
    () =>
      isHydrated
        ? notifications.filter(
            (n) => n.priority === "urgent" || n.category === "operations"
          ).length
        : 0,
    [notifications, isHydrated]
  );
  const financeAndBookingCount = useMemo(
    () =>
      isHydrated
        ? notifications.filter(
            (n) => n.category === "bookings" || n.category === "billing"
          ).length
        : 0,
    [notifications, isHydrated]
  );

  // Filtered Notifications combining Tabs, Advanced Drawer Filters, and Search
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      // 0. Only Unread Quick Toggle
      if (onlyUnread && item.read) return false;

      // 1. Tab filter
      if (activeTab === "unread" && item.read) return false;
      if (activeTab !== "all" && activeTab !== "unread" && item.category !== activeTab) {
        return false;
      }

      // 2. Advanced Drawer Filters
      if (advancedFilters.readStatus === "unread" && item.read) return false;
      if (advancedFilters.readStatus === "read" && !item.read) return false;
      if (advancedFilters.priority !== "all" && item.priority !== advancedFilters.priority) {
        return false;
      }
      if (advancedFilters.category !== "all" && item.category !== advancedFilters.category) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesMessage = item.message.toLowerCase().includes(q);
        const matchesGuest = item.metadata?.guestName?.toLowerCase().includes(q);
        const matchesUnit = item.metadata?.unitNumber?.toLowerCase().includes(q);
        const matchesBooking = item.metadata?.bookingCode?.toLowerCase().includes(q);
        const matchesProperty = item.metadata?.propertyName?.toLowerCase().includes(q);

        if (
          !matchesTitle &&
          !matchesMessage &&
          !matchesGuest &&
          !matchesUnit &&
          !matchesBooking &&
          !matchesProperty
        ) {
          return false;
        }
      }

      return true;
    });
  }, [notifications, activeTab, onlyUnread, advancedFilters, searchQuery]);

  // Group notifications into organized timeline sections (اليوم، أمس، سابقاً)
  const groupedNotifications = useMemo(() => {
    const todayItems: NotificationItem[] = [];
    const yesterdayItems: NotificationItem[] = [];
    const earlierItems: NotificationItem[] = [];

    filteredNotifications.forEach((item) => {
      if (
        item.timeAgo.includes("دقيقة") ||
        item.timeAgo.includes("ساعة") ||
        item.timeAgo === "الآن"
      ) {
        todayItems.push(item);
      } else if (item.timeAgo.includes("أمس")) {
        yesterdayItems.push(item);
      } else {
        earlierItems.push(item);
      }
    });

    const groups: { id: string; title: string; count: number; items: NotificationItem[] }[] = [];
    if (todayItems.length > 0) {
      groups.push({ id: "today", title: "اليوم", count: todayItems.length, items: todayItems });
    }
    if (yesterdayItems.length > 0) {
      groups.push({ id: "yesterday", title: "أمس", count: yesterdayItems.length, items: yesterdayItems });
    }
    if (earlierItems.length > 0) {
      groups.push({ id: "earlier", title: "سابقاً", count: earlierItems.length, items: earlierItems });
    }

    return groups;
  }, [filteredNotifications]);

  const handleMarkAllRead = () => {
    markAllAsRead();
    toast.success("تم تحديد جميع الإشعارات كمقروءة");
  };

  const handleClearRead = () => {
    const readCount = notifications.filter((n) => n.read).length;
    if (readCount === 0) {
      toast.info("لا توجد إشعارات مقروءة لحذفها");
      return;
    }
    clearReadNotifications();
    toast.success(`تم حذف ${readCount} إشعار مقروء`);
  };

  const handleResetDefaults = () => {
    resetToDefault();
    toast.success("تم استعادة التنبيهات الافتراضية بنجاح");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveTab("all");
    setOnlyUnread(false);
    setAdvancedFilters(initialNotificationsFilterState);
    toast.success("تم إعادة ضبط الفلاتر والبحث بنجاح");
  };

  // Concise tab labels so ALL elements fit on the SAME line without wrapping
  const tabs: AnimatedTabItem[] = useMemo(
    () => [
      { id: "all", label: "الكل", badge: isHydrated ? totalCount : undefined },
      { id: "unread", label: "غير مقروءة", badge: isHydrated ? unreadCount : undefined },
      {
        id: "bookings",
        label: "الحجوزات",
        badge: isHydrated
          ? notifications.filter((n) => n.category === "bookings").length
          : undefined,
      },
      {
        id: "operations",
        label: "العمليات",
        badge: isHydrated
          ? notifications.filter((n) => n.category === "operations").length
          : undefined,
      },
      {
        id: "billing",
        label: "المالية",
        badge: isHydrated
          ? notifications.filter((n) => n.category === "billing").length
          : undefined,
      },
      {
        id: "automation",
        label: "الأتمتة",
        badge: isHydrated
          ? notifications.filter((n) => n.category === "automation").length
          : undefined,
      },
      {
        id: "system",
        label: "النظام",
        badge: isHydrated
          ? notifications.filter((n) => n.category === "system").length
          : undefined,
      },
    ],
    [totalCount, unreadCount, notifications, isHydrated]
  );

  return (
    <div className="space-y-6 font-cairo">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#DCE2D7] shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#4B5940] text-white flex items-center justify-center shadow-2xs shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-[#252A24]">
                  مركز الإشعارات والتنبيهات
                </h1>
                {unreadCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C02828] text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {unreadCount} غير مقروء
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#687163] mt-0.5">
                المتابعة الزمنية واللحظية لكافة عمليات الحجز، بلاغات الصيانة، الفواتير، وأتمتة الواتساب
              </p>
            </div>
          </div>
        </div>

        {/* Global Control Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EFF2EB] hover:bg-[#E2E7DE] text-[#4B5940] text-xs font-bold transition-all cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>تحديد الكل كمقروء</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleClearRead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DCE2D7] hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-[#687163] text-xs font-semibold transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>حذف المقروءة</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#DCE2D7] hover:bg-[#EFF2EB] text-[#727A6E] text-xs font-medium transition-all cursor-pointer"
            title="إعادة تعيين البيانات الافتراضية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">استعادة الافتراضي</span>
          </button>
        </div>
      </div>

      {/* 2. Stat / Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-2xl border border-[#DCE2D7] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#687163]">إجمالي الإشعارات</span>
            <div className="text-2xl font-bold text-[#252A24] mt-1">
              {!isHydrated ? (
                <span className="inline-block w-8 h-7 bg-[#EFF2EB] rounded animate-pulse" />
              ) : (
                totalCount
              )}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#EFF2EB] text-[#4B5940] flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-2xl border border-[#DCE2D7] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#687163]">تنبيهات غير مقروءة</span>
            <div className="text-2xl font-bold text-[#C02828] mt-1">
              {!isHydrated ? (
                <span className="inline-block w-8 h-7 bg-[#EFF2EB] rounded animate-pulse" />
              ) : (
                unreadCount
              )}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#C02828]/10 text-[#C02828] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-2xl border border-[#DCE2D7] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#687163]">بلاغات الصيانة والتشغيل</span>
            <div className="text-2xl font-bold text-amber-700 mt-1">
              {!isHydrated ? (
                <span className="inline-block w-8 h-7 bg-[#EFF2EB] rounded animate-pulse" />
              ) : (
                urgentCount
              )}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-2xl border border-[#DCE2D7] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#687163]">حجوزات وفوترة مالية</span>
            <div className="text-2xl font-bold text-[#4B5940] mt-1">
              {!isHydrated ? (
                <span className="inline-block w-8 h-7 bg-[#EFF2EB] rounded animate-pulse" />
              ) : (
                financeAndBookingCount
              )}
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#4B5940]/10 text-[#4B5940] flex items-center justify-center">
            <Receipt className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Standard Unified TableToolbar - strictly on ONE line with Filter button */}
      <TableToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="ابحث في نص التنبيه، اسم النزيل، رقم الوحدة، أو كود الحجز..."
        searchWidthClassName="w-full sm:w-60 md:w-72"
        tabs={tabs}
        currentTab={activeTab}
        onTabChange={(id) => setActiveTab(id as NotificationFilterTab)}
        tabsLayoutId="notificationsFilterPill"
        onOpenAdvancedFilter={() => setIsFilterDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
        filterButtonTitle="تصفية الإشعارات والتنبيهات"
        filterButtonLabel="فلتر"
        onResetFilter={handleResetFilters}
        resetFilterTitle="إعادة ضبط الفلاتر والبحث"
      />

      {/* Advanced Filter Drawer */}
      <NotificationsFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={advancedFilters}
        onApplyFilters={setAdvancedFilters}
        onResetFilters={handleResetFilters}
        totalResultsCount={filteredNotifications.length}
      />

      {/* 4. Highly-Organized Two-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Feed Column (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Subheader: Results count & View Mode Switcher */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-[#DCE2D7] shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#252A24]">
                عرض {filteredNotifications.length} من إجمالي {totalCount} إشعار
              </span>
              {(activeTab !== "all" || searchQuery || activeFiltersCount > 0) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] font-semibold text-[#4B5940] hover:underline cursor-pointer ms-2"
                >
                  إلغاء التصفية
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-[#EFF2EB] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  viewMode === "cards"
                    ? "bg-white text-[#4B5940] shadow-2xs"
                    : "text-[#687163] hover:text-[#252A24]"
                )}
                title="عرض البطاقات المنظمة"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">بطاقات</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("compact")}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  viewMode === "compact"
                    ? "bg-white text-[#4B5940] shadow-2xs"
                    : "text-[#687163] hover:text-[#252A24]"
                )}
                title="عرض القائمة المدمجة"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">قائمة</span>
              </button>
            </div>
          </div>

          {/* Grouped Notifications List */}
          {!isHydrated ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-[#DCE2D7] p-4 animate-pulse flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#EFF2EB] shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[#EFF2EB] rounded w-1/3" />
                    <div className="h-3 bg-[#EFF2EB] rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : groupedNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#DCE2D7] shadow-xs p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#EFF2EB] text-[#727A6E] flex items-center justify-center mx-auto mb-4">
                <CheckCheck className="w-8 h-8 text-[#4B5940]" />
              </div>
              <h3 className="text-base font-bold text-[#252A24]">
                لا توجد إشعارات تطابق معايير البحث
              </h3>
              <p className="text-xs sm:text-sm text-[#687163] mt-1 max-w-sm mx-auto">
                يمكنك تعديل البحث أو اختيار تبويب آخر لعرض الإشعارات السابقة.
              </p>
              {(searchQuery || activeFiltersCount > 0 || activeTab !== "all") && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4B5940] text-white text-xs font-bold hover:bg-[#3E4A35] transition-colors cursor-pointer"
                >
                  <span>إعادة ضبط الفلاتر</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {groupedNotifications.map((group) => (
                <div key={group.id} className="space-y-3">
                  {/* Group Header Strip */}
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4B5940]" />
                    <h3 className="text-sm font-bold text-[#181D17]">
                      {group.title}
                    </h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EBF0E6] text-[#4B5940]">
                      {group.count}
                    </span>
                  </div>

                  {/* Group Items */}
                  <div className={cn(viewMode === "cards" ? "space-y-3.5" : "space-y-2")}>
                    {group.items.map((item) => {
                      const categoryMeta = getCategoryMeta(item.category);
                      const Icon = categoryMeta.icon;

                      if (viewMode === "compact") {
                        // Dense / Compact List Row
                        return (
                          <div
                            key={item.id}
                            className={cn(
                              "bg-white rounded-xl border transition-all p-3 shadow-xs flex items-center justify-between gap-3 group",
                              !item.read
                                ? "border-s-4 border-s-[#4B5940] border-[#DCE2D7] bg-[#FAFBF9]"
                                : "border-[#DCE2D7] hover:border-[#CCD5C5]"
                            )}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div
                                className={cn(
                                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                                  categoryMeta.bg,
                                  categoryMeta.text,
                                  categoryMeta.border
                                )}
                              >
                                <Icon className="w-4 h-4" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs sm:text-sm font-bold text-[#181D17] truncate">
                                    {item.title}
                                  </span>
                                  {!item.read && (
                                    <span className="w-2 h-2 rounded-full bg-[#4B5940] shrink-0" />
                                  )}
                                  <span className="text-[10px] text-[#727A6E] shrink-0 font-medium">
                                    {item.timeAgo}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[#687163] truncate mt-0.5">
                                  {item.message}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  item.read ? markAsUnread(item.id) : markAsRead(item.id)
                                }
                                className={cn(
                                  "h-7 px-2.5 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1",
                                  item.read
                                    ? "border-[#DCE2D7] text-[#687163] hover:bg-[#EFF2EB]"
                                    : "border-[#4B5940]/40 text-[#4B5940] bg-[#4B5940]/10 hover:bg-[#4B5940]/20"
                                )}
                              >
                                <Check className="w-3 h-3" />
                                <span className="hidden sm:inline">
                                  {item.read ? "غير مقروء" : "مقروء"}
                                </span>
                              </button>

                              {item.linkUrl && (
                                <Link
                                  href={item.linkUrl}
                                  onClick={() => {
                                    if (!item.read) markAsRead(item.id);
                                  }}
                                  className="h-7 px-2.5 rounded-lg bg-[#4B5940] hover:bg-[#3E4A35] text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs"
                                >
                                  <span>{item.actionLabel || "عرض"}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </Link>
                              )}

                              <button
                                type="button"
                                onClick={() => deleteNotification(item.id)}
                                className="w-7 h-7 rounded-lg text-[#8C9588] hover:text-red-700 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                                title="حذف"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      }

                      // Rich Structured Card View (Eliminates wide voids)
                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "bg-white rounded-2xl border transition-all p-4 sm:p-5 shadow-xs relative flex flex-col justify-between gap-3.5 group",
                            !item.read
                              ? "border-s-4 border-s-[#4B5940] border-[#DCE2D7] bg-gradient-to-b from-[#F9FAF8] to-white hover:shadow-sm"
                              : "border-[#DCE2D7] hover:border-[#CCD5C5]"
                          )}
                        >
                          {/* Top Row: Category Icon + Title + Badges on Start, Timestamp on End */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0 flex-1">
                              {/* Category Icon */}
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 mt-0.5",
                                  categoryMeta.bg,
                                  categoryMeta.text,
                                  categoryMeta.border
                                )}
                              >
                                <Icon className="w-5 h-5" />
                              </div>

                              {/* Title & Badges */}
                              <div className="space-y-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-sm sm:text-base font-bold text-[#181D17]">
                                    {item.title}
                                  </span>

                                  {!item.read && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#4B5940] text-white text-[10px] font-bold shadow-2xs">
                                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                      جديد
                                    </span>
                                  )}

                                  <span
                                    className={cn(
                                      "text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border",
                                      categoryMeta.bg,
                                      categoryMeta.text,
                                      categoryMeta.border
                                    )}
                                  >
                                    {categoryMeta.label}
                                  </span>

                                  {getPriorityBadge(item.priority)}
                                </div>
                              </div>
                            </div>

                            {/* Timestamp Badge (Top Corner Anchor) */}
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EFF2EB] text-[#5A6354] text-xs font-semibold shrink-0">
                              <Clock className="w-3.5 h-3.5 text-[#727A6E]" />
                              <span>{item.timeAgo}</span>
                            </div>
                          </div>

                          {/* Description Text */}
                          <p className="text-xs sm:text-sm text-[#384034] leading-relaxed ps-0 sm:ps-[52px]">
                            {item.message}
                          </p>

                          {/* Metadata Chips if present */}
                          {item.metadata && (
                            <div className="flex flex-wrap items-center gap-2 ps-0 sm:ps-[52px]">
                              {item.metadata.propertyName && (
                                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#EFF2EB] text-[#252A24] border border-[#DCE2D7]">
                                  العقار: {item.metadata.propertyName}
                                </span>
                              )}
                              {item.metadata.unitNumber && (
                                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#EFF2EB] text-[#252A24] border border-[#DCE2D7]">
                                  الوحدة: {item.metadata.unitNumber}
                                </span>
                              )}
                              {item.metadata.bookingCode && (
                                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#EBF0E6] text-[#4B5940] border border-[#4B5940]/20">
                                  كود الحجز: {item.metadata.bookingCode}
                                </span>
                              )}
                              {item.metadata.amount && (
                                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  المبلغ: {item.metadata.amount}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Bottom Footer Bar: Status on Start, Actions on End */}
                          <div className="border-t border-[#EFF2EB] pt-3 mt-1 flex flex-wrap items-center justify-between gap-3 ps-0 sm:ps-[52px]">
                            <div className="flex items-center gap-2 text-xs text-[#727A6E]">
                              <span
                                className={cn(
                                  "w-2 h-2 rounded-full",
                                  !item.read ? "bg-[#4B5940]" : "bg-[#CCD4C6]"
                                )}
                              />
                              <span className="font-medium">
                                {item.read ? "تم الاطلاع على التنبيه" : "تنبيه جديد غير مقروء"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 ms-auto">
                              {/* Mark Read/Unread */}
                              <button
                                type="button"
                                onClick={() =>
                                  item.read ? markAsUnread(item.id) : markAsRead(item.id)
                                }
                                className={cn(
                                  "h-8 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5",
                                  item.read
                                    ? "border-[#DCE2D7] text-[#687163] hover:bg-[#EFF2EB]"
                                    : "border-[#4B5940]/40 text-[#4B5940] bg-[#4B5940]/10 hover:bg-[#4B5940]/20"
                                )}
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>{item.read ? "تحديد كغير مقروء" : "تعيين كمقروء"}</span>
                              </button>

                              {/* Action Link button */}
                              {item.linkUrl && (
                                <Link
                                  href={item.linkUrl}
                                  onClick={() => {
                                    if (!item.read) markAsRead(item.id);
                                  }}
                                  className="h-8 inline-flex items-center gap-1.5 px-3.5 rounded-lg bg-[#4B5940] hover:bg-[#3E4A35] text-white text-xs font-bold transition-all shadow-2xs group-hover:shadow-xs"
                                >
                                  <span>{item.actionLabel || "عرض التفاصيل"}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                              )}

                              {/* Delete button */}
                              <button
                                type="button"
                                onClick={() => deleteNotification(item.id)}
                                className="w-8 h-8 rounded-lg text-[#8C9588] hover:text-red-700 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                                title="حذف الإشعار"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Side Panel Column (4 cols on lg) - Sticky on desktop */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
          {/* Card 1: Categories Breakdown & Quick Filter */}
          <div className="bg-white rounded-2xl border border-[#DCE2D7] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFF2EB]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#4B5940]" />
                <h3 className="text-sm font-bold text-[#181D17]">
                  تصنيف التنبيهات
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#687163]">
                {totalCount} إجمالي
              </span>
            </div>

            <div className="space-y-1.5">
              {[
                {
                  id: "bookings",
                  label: "الحجوزات والنزلاء",
                  icon: CalendarDays,
                  count: notifications.filter((n) => n.category === "bookings").length,
                  unread: notifications.filter((n) => n.category === "bookings" && !n.read).length,
                },
                {
                  id: "operations",
                  label: "الصيانة والتشغيل",
                  icon: Wrench,
                  count: notifications.filter((n) => n.category === "operations").length,
                  unread: notifications.filter((n) => n.category === "operations" && !n.read).length,
                },
                {
                  id: "billing",
                  label: "الاشتراكات والفوترة",
                  icon: Receipt,
                  count: notifications.filter((n) => n.category === "billing").length,
                  unread: notifications.filter((n) => n.category === "billing" && !n.read).length,
                },
                {
                  id: "automation",
                  label: "الأتمتة ورسائل الواتساب",
                  icon: Zap,
                  count: notifications.filter((n) => n.category === "automation").length,
                  unread: notifications.filter((n) => n.category === "automation" && !n.read).length,
                },
                {
                  id: "system",
                  label: "أمان ونظام المنصة",
                  icon: ShieldCheck,
                  count: notifications.filter((n) => n.category === "system").length,
                  unread: notifications.filter((n) => n.category === "system" && !n.read).length,
                },
              ].map((cat) => {
                const CatIcon = cat.icon;
                const isSelected = activeTab === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveTab(isSelected ? "all" : (cat.id as NotificationFilterTab))}
                    className={cn(
                      "w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all cursor-pointer",
                      isSelected
                        ? "bg-[#4B5940] text-white font-bold shadow-2xs"
                        : "hover:bg-[#EFF2EB] text-[#252A24]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <CatIcon
                        className={cn(
                          "w-4 h-4",
                          isSelected ? "text-white" : "text-[#4B5940]"
                        )}
                      />
                      <span>{cat.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {cat.unread > 0 && (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                            isSelected
                              ? "bg-white text-[#4B5940]"
                              : "bg-[#C02828] text-white"
                          )}
                        >
                          {cat.unread} جديد
                        </span>
                      )}
                      <span
                        className={cn(
                          "font-bold text-xs",
                          isSelected ? "text-white/80" : "text-[#727A6E]"
                        )}
                      >
                        {cat.count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 2: Priority Distribution */}
          <div className="bg-white rounded-2xl border border-[#DCE2D7] p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFF2EB]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-[#181D17]">
                  توزيع درجات الأهمية
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              {/* Urgent */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-50 border border-red-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-bold text-red-800">عاجل جداً</span>
                </div>
                <span className="text-xs font-bold text-red-900">
                  {notifications.filter((n) => n.priority === "urgent").length}
                </span>
              </div>

              {/* High */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <span className="text-xs font-bold text-amber-800">هام</span>
                </div>
                <span className="text-xs font-bold text-amber-900">
                  {notifications.filter((n) => n.priority === "high").length}
                </span>
              </div>

              {/* Normal / Low */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#EFF2EB] border border-[#DCE2D7]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4B5940]" />
                  <span className="text-xs font-medium text-[#252A24]">عادي ومنخفض</span>
                </div>
                <span className="text-xs font-bold text-[#4B5940]">
                  {notifications.filter((n) => n.priority === "normal" || n.priority === "low").length}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Alert Channels Status */}
          <div className="bg-white rounded-2xl border border-[#DCE2D7] p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFF2EB]">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#4B5940]" />
                <h3 className="text-sm font-bold text-[#181D17]">
                  قنوات التنبيه الفوري
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                متصل
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#454840]">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>واتساب للأعمال</span>
                </div>
                <span className="text-emerald-700 font-bold text-[11px]">نشط تلقائياً</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#454840]">
                  <Bell className="w-3.5 h-3.5 text-[#4B5940]" />
                  <span>تنبيهات المنصة المباشرة</span>
                </div>
                <span className="text-emerald-700 font-bold text-[11px]">مفعل لحظياً</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#454840]">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>إشعارات الأمان والأنظمة</span>
                </div>
                <span className="text-emerald-700 font-bold text-[11px]">مؤمن 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
