export interface PlatformInfo {
  name: string;
  website: string;
  description: string;
  officialEmail: string;
  contactNumber: string;
}

export interface SupportInfo {
  supportEmail: string;
  whatsappNumber: string;
  helpCenterUrl: string;
}

export interface MaintenanceSettings {
  isMaintenanceMode: boolean;
  title: string;
  message: string;
  expectedEndTime: string;
}

export interface GeneralSettingsState {
  info: PlatformInfo;
  support: SupportInfo;
  maintenance: MaintenanceSettings;
  activeLogoName: string;
  activeLogoSvg: string;
  lastUpdated: string;
  updatedBy: string;
}

export type PropertyInitialStatus = "active" | "draft" | "review";
export type PricingModel = "daily" | "monthly" | "yearly";

export interface PlatformConfigState {
  // Properties Default
  defaultPropertyStatus: PropertyInitialStatus;
  defaultArchitectureType: string;
  nationalAddressVerification: boolean;

  // Units & Pricing Default
  defaultUnitStatus: "available" | "cleaning" | "occupied";
  baseCurrency: "SAR";
  defaultPricingModel: PricingModel;
  minimumNoticeHours: number;
  maximumGuests: number;

  // Owner Accounts & Registration
  allowOwnerSelfRegistration: boolean;
  requireAdminApproval: boolean;
  allowOwnersAddPropertiesDirectly: boolean;
  defaultPlan: string;

  // Central Rules & Automation
  autoUnitStatusSync: boolean;
  strictAuditLogWorm: boolean;
  realtimeOtaSync: boolean;
  broadcastSystemAnnouncements: boolean;

  // Metadata
  lastUpdated: string;
  updatedBy: string;
}

export interface BookingSettingsState {
  // قواعد التواريخ
  defaultCheckInTime: string;
  defaultCheckOutTime: string;
  allowSameDayBooking: boolean;
  minStayNights: number;
  maxStayNights: number;

  // التوافر وإدارة المخزون
  preventDoubleBooking: boolean;
  autoUpdateUnitStatus: boolean;
  autoCreateCleaningOnCheckout: boolean;

  // مصادر الحجز والقنوات المتصلة
  enableBookingCom: boolean;
  enableAirbnb: boolean;
  enableDirectEngine: boolean;
  enableManualReception: boolean;

  // الحجوزات الملغاة وسياسة الأرشفة
  retainCancelledBookings: boolean;
  allowPermanentDeleteCancelled: boolean;

  // صلاحيات تعديل الحجوزات
  allowOwnerEditBookingDetails: boolean;
  allowOwnerChangeDates: boolean;
  allowOwnerExtendStay: boolean;
  requireAvailabilityCheckBeforeEdit: boolean;

  // Metadata
  lastUpdated: string;
  updatedBy: string;
}

export interface OperationsSettingsState {
  // أتمتة دورة التنظيف
  autoCreateCleaningAfterCheckout: boolean;
  defaultUnitStatusOnSchedule: string;
  cleaningAssignmentMethod: string;
  requireCleaningCompletionApproval: boolean;
  lockUnitReadinessUntilCleaningComplete: boolean;

  // حوكمة الصيانة والأعطال
  requireMaintenanceFieldCompletion: boolean;
  mandatoryCleaningAfterMaintenance: boolean;
  autoCreateCleaningAfterMaintenanceClose: boolean;

  // فترات التجهيز الفاصلة
  autoPreparationBuffer: string;

  // Metadata
  lastUpdated: string;
  updatedBy: string;
}

export interface BookingRuleComparisonItem {
  id: string;
  title: string;
  tag: string;
  oldValue: string;
  newValue: string;
}

export type DefaultCodeType = "per_booking" | "static_unit";
export type CodeLengthOption = 4 | 6;

export interface AccessCodesSettingsState {
  // نوع الكود الافتراضي
  defaultCodeType: DefaultCodeType;

  // قواعد إنشاء وتوليد الكود
  autoGenerateOnConfirm: boolean;
  codeLength: CodeLengthOption;
  allowRepeatedOrSequentialDigits: boolean;

  // صلاحية وتوقيت الكود
  validityStartMinutesBeforeCheckin: number;
  validityEndMinutesAfterCheckout: number;

  // الأمان وحماية الخصوصية
  maskCodeByDefault: boolean;
  requireVerificationBeforeReveal: boolean;
  logAllCodeViews: boolean;

  // المزامنة والتحديث اللحظي
  autoSyncOnBookingModification: boolean;

  // Metadata
  lastUpdated: string;
  updatedBy: string;
}

export interface WhatsAppKPIs {
  totalSent: number;
  totalSentTrend: string;
  delivered: number;
  deliveredRate: string;
  read: number;
  readRate: string;
  failed: number;
  failedRate: string;
}

export interface WhatsAppAutomationRules {
  bookingConfirmation: boolean;
  smartAccessPin: boolean;
  checkoutReminderAndSurvey: boolean;
  maintenanceStatusAlert: boolean;
  stayExtensionAndReceipt: boolean;
  masterBroadcastEnabled: boolean;
}

export interface WhatsAppRateLimits {
  tierName: string;
  dailyQuotaLimit: number;
  dailyQuotaUsed: number;
  quotaUsedPercentage: number;
  retryAttempts: string;
  retryDelay: string;
  quietHoursEnabled: boolean;
}

export interface WhatsAppAccountInfo {
  accountName: string;
  osName: string;
  wabaId: string;
  officialPhoneNumber: string;
  provider: string;
  serverRegion: string;
  webhookLatency: string;
  certificateExpiryDate: string;
  certificateStatus: string;
  isConnected: boolean;
}

export interface WhatsAppSettingsState {
  account: WhatsAppAccountInfo;
  kpis: WhatsAppKPIs;
  automations: WhatsAppAutomationRules;
  rateLimits: WhatsAppRateLimits;
  lastUpdated: string;
  updatedBy: string;
}

export type NotificationChannel = "in_app" | "email" | "whatsapp" | "sms" | "push";
export type NotificationCategory = "all" | "bookings" | "operations" | "platform";

export interface NotificationEventChannels {
  in_app: boolean;
  email: boolean;
  whatsapp: boolean;
  sms: boolean;
  push: boolean;
}

export interface NotificationEventDefinition {
  id: string;
  name: string;
  description: string;
  category: "bookings" | "operations" | "platform";
  badge?: {
    text: string;
    variant: "critical" | "warning";
  };
  defaultChannels: NotificationEventChannels;
}

export interface NotificationGatewayStatus {
  id: string;
  name: string;
  subtitle: string;
  status: "connected" | "active" | "verified" | "certified";
  statusLabel: string;
  metric: string;
}

export interface NotificationsSettingsState {
  // حوكمة الملاك والتفضيلات
  allowOwnersCustomizeNotifications: boolean;
  mandatoryEmergencyAndSafetyAlerts: boolean;

  // مصفوفة الأحداث
  events: Record<string, NotificationEventChannels>;

  // Metadata
  lastUpdated: string;
  updatedBy: string;
}

