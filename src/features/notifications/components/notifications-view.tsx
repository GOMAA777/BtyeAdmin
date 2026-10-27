"use client";

import { useState, useMemo } from "react";
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
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { AnimatedTabItem } from "@/components/shared/animated-tabs";
import { useNotificationsStore } from "../stores/use-notifications-store";
import { NotificationItem, NotificationFilterTab, NotificationPriority, NotificationCategory } from "../types";
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
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold border border-red-200">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          عاجل جداً
        </span>
      );
    case "high":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200">
          هام
        </span>
      );
    case "normal":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EFF2EB] text-[#4B5940] text-[11px] font-medium border border-[#DCE2D7]">
          عادي
        </span>
      );
    case "low":
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F5F1E9] text-[#7C694E] text-[11px] font-medium border border-[#E5DEC9]">
          منخفض
        </span>
      );
  }
}

export function NotificationsView() {
  const router = useRouter();
  const {
    notifications,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    clearReadNotifications,
    resetToDefault,
  } = useNotificationsStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<NotificationFilterTab>("all");
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

  // Stats calculation
  const totalCount = notifications.length;
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );
  const urgentCount = useMemo(
    () =>
      notifications.filter(
        (n) => n.priority === "urgent" || n.category === "operations"
      ).length,
    [notifications]
  );
  const financeAndBookingCount = useMemo(
    () =>
      notifications.filter(
        (n) => n.category === "bookings" || n.category === "billing"
      ).length,
    [notifications]
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
      { id: "all", label: "الكل", badge: totalCount },
      { id: "unread", label: "غير مقروءة", badge: unreadCount },
      {
        id: "bookings",
        label: "الحجوزات",
        badge: notifications.filter((n) => n.category === "bookings").length,
      },
      {
        id: "operations",
        label: "العمليات",
        badge: notifications.filter((n) => n.category === "operations").length,
      },
      {
        id: "billing",
        label: "المالية",
        badge: notifications.filter((n) => n.category === "billing").length,
      },
      {
        id: "automation",
        label: "الأتمتة",
        badge: notifications.filter((n) => n.category === "automation").length,
      },
      {
        id: "system",
        label: "النظام",
        badge: notifications.filter((n) => n.category === "system").length,
      },
    ],
    [totalCount, unreadCount, notifications]
  );

  return (
    <div className="space-y-6 font-cairo">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#DCE2D7] shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#4B5940] text-white flex items-center justify-center shadow-2xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#252A24]">
                  مركز الإشعارات والتنبيهات
                </h1>
                {unreadCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C02828] text-white">
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
            <div className="text-2xl font-bold text-[#252A24] mt-1">{totalCount}</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#EFF2EB] text-[#4B5940] flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-2xl border border-[#DCE2D7] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#687163]">تنبيهات غير مقروءة</span>
            <div className="text-2xl font-bold text-[#C02828] mt-1">{unreadCount}</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#C02828]/10 text-[#C02828] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-2xl border border-[#DCE2D7] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#687163]">بلاغات الصيانة والتشغيل</span>
            <div className="text-2xl font-bold text-amber-700 mt-1">{urgentCount}</div>
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
              {financeAndBookingCount}
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

      {/* 4. Notifications List */}
      <div className="bg-white rounded-2xl border border-[#DCE2D7] shadow-xs overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#EFF2EB] text-[#727A6E] flex items-center justify-center mx-auto mb-4">
              <CheckCheck className="w-8 h-8 text-[#4B5940]" />
            </div>
            <h3 className="text-base font-bold text-[#252A24]">لا توجد إشعارات تطابق معايير البحث</h3>
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
          <div className="divide-y divide-[#EFF2EB]">
            {filteredNotifications.map((item) => {
              const categoryMeta = getCategoryMeta(item.category);
              const Icon = categoryMeta.icon;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "p-4 sm:p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group",
                    !item.read
                      ? "bg-[#F7F9F5] hover:bg-[#EFF3EB]/80"
                      : "hover:bg-[#F9FAF8]"
                  )}
                >
                  {/* Left part: Icon + Content */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105",
                        categoryMeta.bg,
                        categoryMeta.text,
                        categoryMeta.border
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-[#252A24]">
                          {item.title}
                        </span>

                        {!item.read && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-[#4B5940] text-white text-[10px] font-bold">
                            جديد
                          </span>
                        )}

                        <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-md", categoryMeta.bg, categoryMeta.text)}>
                          {categoryMeta.label}
                        </span>

                        {getPriorityBadge(item.priority)}

                        <span className="text-xs text-[#8C9588] ms-auto flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#8C9588]" />
                          <span>{item.timeAgo}</span>
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4B5346] leading-relaxed">
                        {item.message}
                      </p>

                      {/* Metadata Chips */}
                      {item.metadata && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {item.metadata.propertyName && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#EFF2EB] text-[#303A2C]">
                              العقار: {item.metadata.propertyName}
                            </span>
                          )}
                          {item.metadata.unitNumber && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#EFF2EB] text-[#303A2C]">
                              الوحدة: {item.metadata.unitNumber}
                            </span>
                          )}
                          {item.metadata.bookingCode && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#EBF0E6] text-[#4B5940]">
                              كود: {item.metadata.bookingCode}
                            </span>
                          )}
                          {item.metadata.amount && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                              المبلغ: {item.metadata.amount}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right part: Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {/* Mark read/unread toggle */}
                    <button
                      type="button"
                      onClick={() =>
                        item.read ? markAsUnread(item.id) : markAsRead(item.id)
                      }
                      className={cn(
                        "p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5",
                        item.read
                          ? "border-[#DCE2D7] text-[#687163] hover:bg-[#EFF2EB]"
                          : "border-[#4B5940]/40 text-[#4B5940] bg-[#4B5940]/10 hover:bg-[#4B5940]/20"
                      )}
                      title={item.read ? "تحديد كغير مقروء" : "تحديد كمقروء"}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span className="text-[11px]">
                        {item.read ? "مقروء" : "تعيين كمقروء"}
                      </span>
                    </button>

                    {/* Target link button */}
                    {item.linkUrl && (
                      <Link
                        href={item.linkUrl}
                        onClick={() => {
                          if (!item.read) markAsRead(item.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#4B5940] hover:bg-[#3E4A35] text-white text-xs font-bold transition-all shadow-2xs group-hover:shadow-xs"
                      >
                        <span>{item.actionLabel || "عرض"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => deleteNotification(item.id)}
                      className="p-2 rounded-xl text-[#8C9588] hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                      title="حذف الإشعار"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
