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

