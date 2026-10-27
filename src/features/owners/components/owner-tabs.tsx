"use client";

import { useState } from "react";
import { LayoutGrid, Building2, Calendar, CreditCard, History } from "lucide-react";
import { AnimatedTabs } from "@/components/shared/animated-tabs";

interface OwnerTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  propertiesCount?: number;
  bookingsCount?: number;
  activityCount?: number;
}

export function OwnerTabs({
  activeTab: controlledTab,
  onTabChange,
  propertiesCount = 3,
  bookingsCount = 18,
  activityCount = 24,
}: OwnerTabsProps) {
  const [internalTab, setInternalTab] = useState("overview");
  const currentTab = controlledTab ?? internalTab;

  const handleSelect = (id: string) => {
    if (controlledTab === undefined) {
      setInternalTab(id);
    }
    onTabChange?.(id);
  };

  const tabs = [
    { id: "overview", label: "نظرة عامة", icon: LayoutGrid },
    { id: "properties", label: `العقارات (${propertiesCount})`, icon: Building2 },
    { id: "bookings", label: `الحجوزات (${bookingsCount})`, icon: Calendar },
    { id: "billing", label: "الاشتراك والفوترة", icon: CreditCard },
    { id: "activity", label: `سجل النشاط (${activityCount})`, icon: History },
  ];

  return (
    <AnimatedTabs
      tabs={tabs}
      value={currentTab}
      onChange={handleSelect}
      layoutId="ownerActiveTabIndicator"
      variant="dark"
      size="md"
    />
  );
}
