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
