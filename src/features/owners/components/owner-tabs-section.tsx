"use client";

import { useQueryState, parseAsString } from "nuqs";
import { AnimatedTabPanel } from "@/components/shared/animated-tabs";
import { OwnerTabs } from "./owner-tabs";
import { OwnerOperationsSummary } from "./owner-operations-summary";
import { OwnerActivityTimeline } from "./owner-activity-timeline";
import { OwnerQuickActions } from "./owner-quick-actions";
import { OwnerTransferableBalance } from "./owner-transferable-balance";
import { OwnerPropertiesTabView } from "./owner-properties-tab-view";
import { OwnerBookingsTabView } from "./owner-bookings-tab-view";
import { OwnerBillingTabView } from "./owner-billing-tab-view";
import { OwnerActivityTabView } from "./owner-activity-tab-view";

interface OwnerTabsSectionProps {
  initialTab?: string;
  propertiesCount?: number;
  bookingsCount?: number;
  activityCount?: number;
}

export function OwnerTabsSection({
  initialTab = "overview",
  propertiesCount = 4,
  bookingsCount = 18,
  activityCount = 24,
}: OwnerTabsSectionProps) {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsString.withDefault(initialTab).withOptions({ shallow: true })
  );

  return (
    <div className="space-y-6">
      {/* Top Tab Bar */}
      <OwnerTabs
        activeTab={tab}
        onTabChange={(newTab) => setTab(newTab)}
        propertiesCount={propertiesCount}
        bookingsCount={bookingsCount}
        activityCount={activityCount}
      />

      <AnimatedTabPanel tabKey={tab}>
        {tab === "properties" ? (
          <OwnerPropertiesTabView />
        ) : tab === "bookings" ? (
          <OwnerBookingsTabView />
        ) : tab === "billing" ? (
          <OwnerBillingTabView />
        ) : tab === "activity" ? (
          <OwnerActivityTabView />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-6">
              <OwnerOperationsSummary onNavigateToProperties={() => setTab("properties")} />
              <OwnerActivityTimeline onNavigateToActivity={() => setTab("activity")} />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <OwnerQuickActions />
              <OwnerTransferableBalance />
            </div>
          </div>
        )}
      </AnimatedTabPanel>
    </div>
  );
}
