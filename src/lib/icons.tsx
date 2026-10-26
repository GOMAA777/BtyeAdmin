import React from "react";
import { cn } from "@/lib/utils";

export interface LucideProps extends React.HTMLAttributes<HTMLElement> {
  size?: number | string;
  strokeWidth?: number | string;
  color?: string;
}

export type LucideIcon = React.FC<LucideProps>;

function createIcon(iconClass: string, displayName: string): LucideIcon {
  const IconComponent: React.FC<LucideProps> = ({
    className,
    size,
    strokeWidth: _strokeWidth,
    color,
    style,
    ...props
  }) => {
    let customFontSize: string | undefined = undefined;
    if (size) {
      customFontSize = typeof size === "number" ? `${size}px` : size;
    } else if (className) {
      const match = className.match(/(?:w|h|size)-\[([0-9.]+)px\]/);
      if (match) {
        customFontSize = `${match[1]}px`;
      }
    }

    const inlineStyles: React.CSSProperties = {
      ...(customFontSize ? { fontSize: customFontSize } : {}),
      ...(color ? { color } : {}),
      ...style,
    };

    return (
      <i
        className={cn(
          "lucide-icon inline-flex items-center justify-center shrink-0 not-italic leading-none select-none",
          iconClass,
          className
        )}
        style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
        aria-hidden="true"
        {...props}
      />
    );
  };

  IconComponent.displayName = displayName;
  return IconComponent;
}

export const AlertCircle = createIcon("icon-alert-circle", "AlertCircle");
export const AlertTriangle = createIcon("icon-alert-triangle", "AlertTriangle");
export const Armchair = createIcon("icon-armchair", "Armchair");
export const ArrowLeft = createIcon("icon-arrow-left", "ArrowLeft");
export const ArrowLeftRight = createIcon("icon-arrow-left-right", "ArrowLeftRight");
export const ArrowRight = createIcon("icon-arrow-right", "ArrowRight");
export const ArrowRightLeft = createIcon("icon-arrow-right-left", "ArrowRightLeft");
export const ArrowUpDown = createIcon("icon-arrow-up-down", "ArrowUpDown");
export const ArrowUpRight = createIcon("icon-arrow-up-right", "ArrowUpRight");
export const AtSign = createIcon("icon-at-sign", "AtSign");
export const BadgeCheck = createIcon("icon-badge-check", "BadgeCheck");
export const Banknote = createIcon("icon-banknote", "Banknote");
export const BarChart2 = createIcon("icon-bar-chart-2", "BarChart2");
export const BarChart3 = createIcon("icon-bar-chart-3", "BarChart3");
export const Battery = createIcon("icon-battery", "Battery");
export const BatteryCharging = createIcon("icon-battery-charging", "BatteryCharging");
export const BatteryMedium = createIcon("icon-battery-medium", "BatteryMedium");
export const Bed = createIcon("icon-bed", "Bed");
export const BedDouble = createIcon("icon-bed-double", "BedDouble");
export const Bell = createIcon("icon-bell", "Bell");
export const Bookmark = createIcon("icon-bookmark", "Bookmark");
export const BookmarkCheck = createIcon("icon-bookmark-check", "BookmarkCheck");
export const Bot = createIcon("icon-bot", "Bot");
export const BrushCleaning = createIcon("icon-brush-cleaning", "BrushCleaning");
export const Building = createIcon("icon-building", "Building");
export const Building2 = createIcon("icon-building-2", "Building2");
export const Calendar = createIcon("icon-calendar", "Calendar");
export const CalendarCheck = createIcon("icon-calendar-check", "CalendarCheck");
export const CalendarDays = createIcon("icon-calendar-days", "CalendarDays");
export const CalendarPlus = createIcon("icon-calendar-plus", "CalendarPlus");
export const CalendarSync = createIcon("icon-calendar-sync", "CalendarSync");
export const CalendarX = createIcon("icon-calendar-x", "CalendarX");
export const CalendarX2 = createIcon("icon-calendar-x-2", "CalendarX2");
export const Camera = createIcon("icon-camera", "Camera");
export const Check = createIcon("icon-check", "Check");
export const CheckCheck = createIcon("icon-check-check", "CheckCheck");
export const CheckCircle = createIcon("icon-check-circle", "CheckCircle");
export const CheckCircle2 = createIcon("icon-check-circle-2", "CheckCircle2");
export const CheckSquare = createIcon("icon-check-square", "CheckSquare");
export const ChevronDown = createIcon("icon-chevron-down", "ChevronDown");
export const ChevronLeft = createIcon("icon-chevron-left", "ChevronLeft");
export const ChevronRight = createIcon("icon-chevron-right", "ChevronRight");
export const Circle = createIcon("icon-circle", "Circle");
export const CirclePause = createIcon("icon-circle-pause", "CirclePause");
export const ClipboardCheck = createIcon("icon-clipboard-check", "ClipboardCheck");
export const ClipboardList = createIcon("icon-clipboard-list", "ClipboardList");
export const Clock = createIcon("icon-clock", "Clock");
export const Clock3 = createIcon("icon-clock-3", "Clock3");
export const Coffee = createIcon("icon-coffee", "Coffee");
export const Copy = createIcon("icon-copy", "Copy");
export const Cpu = createIcon("icon-cpu", "Cpu");
export const CreditCard = createIcon("icon-credit-card", "CreditCard");
export const Crosshair = createIcon("icon-crosshair", "Crosshair");
export const DollarSign = createIcon("icon-dollar-sign", "DollarSign");
export const DoorClosed = createIcon("icon-door-closed", "DoorClosed");
export const DoorOpen = createIcon("icon-door-open", "DoorOpen");
export const Download = createIcon("icon-download", "Download");
export const Edit = createIcon("icon-edit", "Edit");
export const ExternalLink = createIcon("icon-external-link", "ExternalLink");
export const Eye = createIcon("icon-eye", "Eye");
export const EyeOff = createIcon("icon-eye-off", "EyeOff");
export const FileCheck = createIcon("icon-file-check", "FileCheck");
export const FileDown = createIcon("icon-file-down", "FileDown");
export const FileEdit = createIcon("icon-file-edit", "FileEdit");
export const FileSignature = createIcon("icon-file-signature", "FileSignature");
export const FileText = createIcon("icon-file-text", "FileText");
export const Filter = createIcon("icon-filter", "Filter");
export const Flag = createIcon("icon-flag", "Flag");
export const Globe = createIcon("icon-globe", "Globe");
export const HelpCircle = createIcon("icon-help-circle", "HelpCircle");
export const History = createIcon("icon-history", "History");
export const Home = createIcon("icon-home", "Home");
export const Hourglass = createIcon("icon-hourglass", "Hourglass");
export const HousePlus = createIcon("icon-house-plus", "HousePlus");
export const IdCard = createIcon("icon-id-card", "IdCard");
export const Image = createIcon("icon-image", "Image");
export const Info = createIcon("icon-info", "Info");
export const Key = createIcon("icon-key", "Key");
export const KeyRound = createIcon("icon-key-round", "KeyRound");
export const Landmark = createIcon("icon-landmark", "Landmark");
export const Laptop = createIcon("icon-laptop", "Laptop");
export const Layers = createIcon("icon-layers", "Layers");
export const LayoutGrid = createIcon("icon-layout-grid", "LayoutGrid");
export const Loader2 = createIcon("icon-loader-2", "Loader2");
export const Lock = createIcon("icon-lock", "Lock");
export const LogIn = createIcon("icon-log-in", "LogIn");
export const LogOut = createIcon("icon-log-out", "LogOut");
export const Mail = createIcon("icon-mail", "Mail");
export const Map = createIcon("icon-map", "Map");
export const MapPin = createIcon("icon-map-pin", "MapPin");
export const Maximize2 = createIcon("icon-maximize-2", "Maximize2");
export const Menu = createIcon("icon-menu", "Menu");
export const MessageSquare = createIcon("icon-message-square", "MessageSquare");
export const Minus = createIcon("icon-minus", "Minus");
export const MinusCircle = createIcon("icon-minus-circle", "MinusCircle");
export const Moon = createIcon("icon-moon", "Moon");
export const MoreHorizontal = createIcon("icon-more-horizontal", "MoreHorizontal");
export const MoreVertical = createIcon("icon-more-vertical", "MoreVertical");
export const Navigation = createIcon("icon-navigation", "Navigation");
export const Network = createIcon("icon-network", "Network");
export const Pause = createIcon("icon-pause", "Pause");
export const Pencil = createIcon("icon-pencil", "Pencil");
export const Percent = createIcon("icon-percent", "Percent");
export const Phone = createIcon("icon-phone", "Phone");
export const PhoneCall = createIcon("icon-phone-call", "PhoneCall");
export const Plane = createIcon("icon-plane", "Plane");
export const Play = createIcon("icon-play", "Play");
export const Plus = createIcon("icon-plus", "Plus");
export const PlusCircle = createIcon("icon-plus-circle", "PlusCircle");
export const Radio = createIcon("icon-radio", "Radio");
export const Receipt = createIcon("icon-receipt", "Receipt");
export const RefreshCw = createIcon("icon-refresh-cw", "RefreshCw");
export const RotateCcw = createIcon("icon-rotate-ccw", "RotateCcw");
export const Save = createIcon("icon-save", "Save");
export const Search = createIcon("icon-search", "Search");
export const Send = createIcon("icon-send", "Send");
export const SendHorizontal = createIcon("icon-send-horizontal", "SendHorizontal");
export const Settings = createIcon("icon-settings", "Settings");
export const Shapes = createIcon("icon-shapes", "Shapes");
export const Share2 = createIcon("icon-share-2", "Share2");
export const Shield = createIcon("icon-shield", "Shield");
export const ShieldAlert = createIcon("icon-shield-alert", "ShieldAlert");
export const ShieldCheck = createIcon("icon-shield-check", "ShieldCheck");
export const Sliders = createIcon("icon-sliders", "Sliders");
export const SlidersHorizontal = createIcon("icon-sliders-horizontal", "SlidersHorizontal");
export const Smartphone = createIcon("icon-smartphone", "Smartphone");
export const Sparkles = createIcon("icon-sparkles", "Sparkles");
export const Square = createIcon("icon-square", "Square");
export const SquareCheck = createIcon("icon-square-check", "SquareCheck");
export const SquarePen = createIcon("icon-square-pen", "SquarePen");
export const Star = createIcon("icon-star", "Star");
export const StickyNote = createIcon("icon-sticky-note", "StickyNote");
export const Tag = createIcon("icon-tag", "Tag");
export const Thermometer = createIcon("icon-thermometer", "Thermometer");
export const Ticket = createIcon("icon-ticket", "Ticket");
export const ToggleRight = createIcon("icon-toggle-right", "ToggleRight");
export const Trash2 = createIcon("icon-trash-2", "Trash2");
export const TrendingUp = createIcon("icon-trending-up", "TrendingUp");
export const Tv = createIcon("icon-tv", "Tv");
export const Upload = createIcon("icon-upload", "Upload");
export const User = createIcon("icon-user", "User");
export const UserCheck = createIcon("icon-user-check", "UserCheck");
export const UserCircle2 = createIcon("icon-user-circle-2", "UserCircle2");
export const UserMinus = createIcon("icon-user-minus", "UserMinus");
export const UserPlus = createIcon("icon-user-plus", "UserPlus");
export const UserRound = createIcon("icon-user-round", "UserRound");
export const UserSearch = createIcon("icon-user-search", "UserSearch");
export const Users = createIcon("icon-users", "Users");
export const Users2 = createIcon("icon-users-2", "Users2");
export const Video = createIcon("icon-video", "Video");
export const Wallet = createIcon("icon-wallet", "Wallet");
export const Wand2 = createIcon("icon-wand-2", "Wand2");
export const Wifi = createIcon("icon-wifi", "Wifi");
export const WifiOff = createIcon("icon-wifi-off", "WifiOff");
export const Wind = createIcon("icon-wind", "Wind");
export const Workflow = createIcon("icon-workflow", "Workflow");
export const Wrench = createIcon("icon-wrench", "Wrench");
export const X = createIcon("icon-x", "X");
export const XCircle = createIcon("icon-x-circle", "XCircle");
export const Zap = createIcon("icon-zap", "Zap");
export const Gauge: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
};
export const Car: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 11 2 11.4V16c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
};

// Common aliases used in components
export const CalendarIcon = Calendar;
export const CalendarCheck2 = CalendarCheck;

export const Ban: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m4.9 4.9 14.2 14.2" />
    </svg>
  );
};

export const BatteryLow: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
      <line x1="22" x2="22" y1="11" y2="13" />
      <line x1="6" x2="6" y1="11" y2="13" />
    </svg>
  );
};

export const GitBranch: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
};

export const PauseCircle = CirclePause;
export const Edit3 = Edit;

export const Code2: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  );
};

export const Mic: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
};

export const ArrowUp: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
};

export const RotateCw: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
};

export const FolderArchive: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <circle cx="12" cy="13" r="2" />
      <path d="M4 20V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M2 10h20" />
    </svg>
  );
};

export const Grid: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
};

export const Award: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
    </svg>
  );
};

export const Server: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
};

export const UploadCloud: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
};

export const CalendarRange: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="M17 14h-6" />
      <path d="M13 18H7" />
      <path d="M7 14h.01" />
      <path d="M17 18h.01" />
    </svg>
  );
};

export const Headphones: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
};

export const Palette: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
};

export const Power: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M12 2v10" />
      <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
    </svg>
  );
};

export const Activity: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
};

export const Archive: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
};

export const Boxes: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l6 3.43a2 2 0 0 0 1.97 0l6-3.43a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71l-6-3.43a2 2 0 0 0-1.97 0z" />
      <path d="m2 14.5 7.5 4.3 7.5-4.3" />
      <path d="M9.5 23v-8.5" />
      <path d="M14.97 1.92A2 2 0 0 0 14 3.63v3.24a2 2 0 0 0 .97 1.71l6 3.43a2 2 0 0 0 1.97 0l6-3.43a2 2 0 0 0 .97-1.71V3.63a2 2 0 0 0-.97-1.71l-6-3.43a2 2 0 0 0-1.97 0z" />
    </svg>
  );
};

export const Brush: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </svg>
  );
};

export const Hash: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <line x1="4" x2="20" y1="9" y2="9" />
      <line x1="4" x2="20" y1="15" y2="15" />
      <line x1="10" x2="8" y1="3" y2="21" />
      <line x1="16" x2="14" y1="3" y2="21" />
    </svg>
  );
};

export const Cloud: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
};

export const Router: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6.01 18H6" />
      <path d="M10.01 18H10" />
      <path d="M15 10v4" />
      <path d="M17.84 7.17a4 4 0 0 0-5.66 0" />
      <path d="M20.66 4.34a8 8 0 0 0-11.31 0" />
    </svg>
  );
};

export const Unlink: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="m18.84 12.25 1.72-1.71a4.5 4.5 0 0 0-6.36-6.36l-1.72 1.71" />
      <path d="m5.16 11.75-1.72 1.71a4.5 4.5 0 0 0 6.36 6.36l1.72-1.71" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
};

export const Link2Off: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M9 17H7A5 5 0 0 1 7 7" />
      <path d="M15 7h2a5 5 0 0 1 4 8" />
      <line x1="8" x2="12" y1="12" y2="12" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
};

export const Link2: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
      <line x1="8" x2="16" y1="12" y2="12" />
    </svg>
  );
};

export const Link: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
};

export const QrCode: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  );
};

export const BellRing: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <path d="M4 2C2.8 3.7 2 5.7 2 8" />
      <path d="M22 8c0-2.3-.8-4.3-2-6" />
    </svg>
  );
};

export const Monitor: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
};

export const Database: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  );
};
export const MailCheck: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <path d="m16 19 2 2 4-4" />
    </svg>
  );
};

export const UserX: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="17" x2="22" y1="8" y2="13" />
      <line x1="22" x2="17" y1="8" y2="13" />
    </svg>
  );
};

export const FileX: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m14.5 12.5-5 5" />
      <path d="m9.5 12.5 5 5" />
    </svg>
  );
};

export const FileSpreadsheet: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M8 13h2" />
      <path d="M14 13h2" />
      <path d="M8 17h2" />
      <path d="M14 17h2" />
    </svg>
  );
};

export const Coins: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
};

export const Languages: LucideIcon = ({ className, size, color, style }) => {
  const customFontSize = typeof size === "number" ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      style={{
        ...(customFontSize ? { width: customFontSize, height: customFontSize } : {}),
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  );
};
