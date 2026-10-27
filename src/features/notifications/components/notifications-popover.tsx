"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  CalendarDays,
  Wrench,
  Receipt,
  Zap,
  ShieldCheck,
  ArrowLeft,
  Clock,
  Sparkles,
  ChevronLeft,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useNotificationsStore } from "../stores/use-notifications-store";
import { NotificationItem, NotificationCategory } from "../types";

function getCategoryIcon(category: NotificationCategory) {
  switch (category) {
    case "bookings":
      return {
        icon: CalendarDays,
        bg: "bg-[#4B5940]/10",
        text: "text-[#4B5940]",
        label: "حجوزات",
      };
    case "operations":
      return {
        icon: Wrench,
        bg: "bg-amber-500/10",
        text: "text-amber-700",
        label: "عمليات",
      };
    case "billing":
      return {
        icon: Receipt,
        bg: "bg-emerald-500/10",
        text: "text-emerald-700",
        label: "مالية",
      };
    case "automation":
      return {
        icon: Zap,
        bg: "bg-purple-500/10",
        text: "text-purple-700",
        label: "أتمتة",
      };
    case "system":
    default:
      return {
        icon: ShieldCheck,
        bg: "bg-blue-500/10",
        text: "text-blue-700",
        label: "النظام",
      };
  }
}

function getShortMessage(message: string): string {
  const words = message
    .replace(/#[a-zA-Z0-9_-]+/g, "")
    .replace(/[()]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length <= 4) return words.join(" ") + "...";
  return words.slice(0, 4).join(" ") + "...";
}

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const {
    notifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationsStore();

  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const filteredList = useMemo(() => {
    if (activeTab === "unread") {
      return notifications.filter((n) => !n.read);
    }
    return notifications;
  }, [notifications, activeTab]);

  // Preview only the top 5 recent notifications in the popup
  const previewList = useMemo(() => filteredList.slice(0, 5), [filteredList]);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = Math.min(340, window.innerWidth - 20);

    // Anchor popup start at the bell icon so it extends towards the right/content area
    let left = rect.left - 12;

    // Boundary checks for viewport edges
    if (left + menuWidth > window.innerWidth - 12) {
      left = window.innerWidth - menuWidth - 12;
    }
    if (left < 12) {
      left = 12;
    }

    const top = rect.bottom + 8;
    setCoords({ top, left });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen, updatePosition]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleMarkAllRead = () => {
    markAllAsRead();
    toast.success("تم تحديد جميع الإشعارات كمقروءة");
  };

  const handleNotificationClick = (item: NotificationItem) => {
    if (!item.read) {
      markAsRead(item.id);
    }
    setIsOpen(false);
    if (item.linkUrl) {
      router.push(item.linkUrl);
    }
  };

  const handleViewAll = () => {
    setIsOpen(false);
    router.push("/notifications");
  };

  return (
    <>
      {/* Notification Bell Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "relative p-2 rounded-xl text-[#252A24] transition-all cursor-pointer shrink-0 select-none",
          isOpen
            ? "bg-[#EAEFE6] text-[#4B5940] shadow-inner"
            : "hover:text-[#4B5940] hover:bg-[#EFF2EB]"
        )}
        title="التنبيهات والإشعارات"
        aria-label="التنبيهات والإشعارات"
        aria-expanded={isOpen}
      >
        <Bell className="w-4 h-4" />

        {/* Live Red Badge with count */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -start-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C02828] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs animate-in zoom-in-75 duration-200">
            {unreadCount > 9 ? "+9" : unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown Portal */}
      {isMounted &&
        isOpen &&
        coords &&
        createPortal(
          <div
            ref={menuRef}
            dir="rtl"
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${Math.min(340, window.innerWidth - 24)}px`,
            }}
            className="z-50 bg-white rounded-2xl border border-[#DCE2D7] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-cairo"
          >
            {/* Header: Title + Unread Count Badge + Mark All Read CTA */}
            <div className="px-3.5 py-2.5 bg-gradient-to-b from-[#F9FAF8] to-white border-b border-[#DCE2D7]/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#4B5940]/10 text-[#4B5940] flex items-center justify-center shrink-0">
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-[#252A24] leading-tight">
                    الإشعارات
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#C02828]/10 text-[#C02828]">
                      {unreadCount} جديد
                    </span>
                  )}
                </div>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4B5940] hover:text-[#3E4A35] transition-colors cursor-pointer"
                  title="تحديد الكل كمقروء"
                >
                  <CheckCheck className="w-3 h-3" />
                  <span>قراءة الكل</span>
                </button>
              )}
            </div>

            {/* Compact Filter Tabs */}
            <div className="flex items-center px-3 py-1.5 gap-1.5 bg-white border-b border-[#EFF2EB]">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "px-2.5 py-0.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1",
                  activeTab === "all"
                    ? "bg-[#4B5940] text-white shadow-2xs"
                    : "text-[#687163] hover:text-[#252A24] hover:bg-[#EFF2EB]"
                )}
              >
                <span>الكل</span>
                <span
                  className={cn(
                    "text-[9px] px-1 rounded-full",
                    activeTab === "all"
                      ? "bg-white/20 text-white"
                      : "bg-[#EFF2EB] text-[#687163]"
                  )}
                >
                  {notifications.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("unread")}
                className={cn(
                  "px-2.5 py-0.5 text-[11px] font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1",
                  activeTab === "unread"
                    ? "bg-[#4B5940] text-white shadow-2xs"
                    : "text-[#687163] hover:text-[#252A24] hover:bg-[#EFF2EB]"
                )}
              >
                <span>غير مقروءة</span>
                {unreadCount > 0 && (
                  <span
                    className={cn(
                      "text-[9px] px-1 rounded-full",
                      activeTab === "unread"
                        ? "bg-[#C02828] text-white"
                        : "bg-[#C02828]/10 text-[#C02828]"
                    )}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* Notifications Body: Compact scrollable list */}
            <div className="max-h-[270px] overflow-y-auto divide-y divide-[#EFF2EB] overscroll-contain">
              {!isMounted ? (
                <div className="p-3 space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-10 bg-[#EFF2EB] rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : previewList.length === 0 ? (
                <div className="py-8 px-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#EFF2EB] text-[#727A6E] flex items-center justify-center mx-auto mb-2">
                    <CheckCheck className="w-5 h-5 text-[#4B5940]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#252A24]">
                    {activeTab === "unread"
                      ? "لا توجد تنبيهات غير مقروءة"
                      : "لا توجد أي إشعارات حالياً"}
                  </h4>
                </div>
              ) : (
                previewList.map((item) => {
                  const categoryInfo = getCategoryIcon(item.category);
                  const Icon = categoryInfo.icon;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item)}
                      className={cn(
                        "px-3 py-2 transition-colors cursor-pointer flex items-center gap-2.5 group relative",
                        !item.read
                          ? "bg-[#F7F9F5] hover:bg-[#EFF3EB]"
                          : "hover:bg-[#F9FAF8]"
                      )}
                    >
                      {/* Compact Category Icon */}
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                          categoryInfo.bg,
                          categoryInfo.text
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      {/* Content: Title & Time next to each other, plus 4-word preview */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#252A24] truncate group-hover:text-[#4B5940] transition-colors">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-[#8C9588] shrink-0 font-medium whitespace-nowrap">
                            {item.timeAgo}
                          </span>
                          {!item.read && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#4B5940] shrink-0 ms-auto"
                              title="غير مقروء"
                            />
                          )}
                        </div>

                        <p className="text-[11px] text-[#687163] mt-0.5 truncate">
                          {getShortMessage(item.message)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Popup Footer: View All Notifications Button */}
            <div className="p-2 sm:px-3 sm:py-2 bg-[#F9FAF8] border-t border-[#DCE2D7] flex items-center justify-between gap-2">
              <span className="text-[11px] text-[#687163] font-medium">
                {notifications.length} إشعارات
              </span>

              <button
                type="button"
                onClick={handleViewAll}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4B5940] hover:bg-[#3E4A35] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer select-none group"
              >
                <span>عرض كافة الإشعارات</span>
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
