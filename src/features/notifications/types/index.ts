export type NotificationCategory =
  | "all"
  | "bookings"
  | "operations"
  | "billing"
  | "automation"
  | "system";

export type NotificationPriority = "urgent" | "high" | "normal" | "low";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: "bookings" | "operations" | "billing" | "automation" | "system";
  priority: NotificationPriority;
  read: boolean;
  createdAt: string; // ISO format or relative
  timeAgo: string; // Arabic display e.g. "منذ 10 دقائق"
  linkUrl?: string; // Target page e.g. "/bookings/1"
  actionLabel?: string; // Arabic CTA e.g. "عرض تفاصيل الحجز"
  metadata?: {
    propertyName?: string;
    unitNumber?: string;
    bookingCode?: string;
    amount?: string;
    guestName?: string;
    ticketId?: string;
  };
}

export type NotificationFilterTab =
  | "all"
  | "unread"
  | "bookings"
  | "operations"
  | "billing"
  | "automation"
  | "system";
