import { defaultOwners } from "@/features/owners/data/mock-owners";
import { defaultProperties } from "@/features/properties/data/mock-properties";
import { initialUnits } from "@/features/units/data/mock-units";
import { defaultMainBookings } from "@/features/bookings/data/mock-main-bookings";
import { initialSubscriptions } from "@/features/billing/data/mock-billing";
import { initialOperationsTasks } from "@/features/operations/data/mock-operations";
import {
  initialAutomationRules,
  initialExecutionLogs,
} from "@/features/automation/data/mock-automation";

/** Deduplicate string ids into Next.js generateStaticParams shape. */
export function toStaticParams(...groups: Array<Iterable<string | number | null | undefined>>) {
  const ids = new Set<string>();
  for (const group of groups) {
    for (const value of group) {
      if (value === null || value === undefined || value === "") continue;
      ids.add(String(value));
    }
  }
  return Array.from(ids).map((id) => ({ id }));
}

export function ownerStaticParams() {
  return toStaticParams(
    defaultOwners.map((o) => o.id),
    Array.from({ length: 5 }, (_, i) => `owner-${i + 1}`),
    Array.from({ length: 5 }, (_, i) => `o${i + 1}`),
    initialUnits.map((u) => u.ownerId),
    initialOperationsTasks.map((t) => t.ownerId),
    ["PO-8821", "8821", "1"]
  );
}

export function propertyStaticParams() {
  return toStaticParams(
    defaultProperties.map((p) => p.id),
    Array.from({ length: 5 }, (_, i) => `prop-${i + 1}`),
    Array.from({ length: 5 }, (_, i) => `p${i + 1}`),
    initialUnits.map((u) => u.propertyId),
    initialOperationsTasks.map((t) => t.propertyId),
    ["014", "prop-014", "nakheel", "oasis", "aqeeq", "1"]
  );
}

export function unitStaticParams() {
  return toStaticParams(
    initialUnits.map((u) => u.id),
    Array.from({ length: 5 }, (_, i) => `unit-${i + 1}`),
    initialOperationsTasks.map((t) => t.unitId),
    ["204", "U-204", "108", "305", "210", "101", "402"]
  );
}

export function bookingStaticParams() {
  return toStaticParams(
    defaultMainBookings.map((b) => b.id),
    defaultMainBookings.map((b) => b.bookingCode),
    Array.from({ length: 5 }, (_, i) => `bk-${i + 1}`),
    Array.from({ length: 5 }, (_, i) => `BK-${i + 1}`),
    Array.from({ length: 15 }, (_, i) => `BK-${10480 + i}`),
    initialOperationsTasks.map((t) => t.bookingId),
    [
      "1048",
      "10482",
      "10483",
      "bk-1048",
      "BK-1048",
      "BK-10482",
      "BK-10483",
      "bk-10482",
      "bk-9824",
      "bk-8410",
      "bk-7192",
      "BK-2026-8942",
    ]
  );
}

export function guestStaticParams() {
  return toStaticParams(
    Array.from({ length: 10 }, (_, i) => String(i + 1)),
    ["gust-89324", "GUST-89324", "89324", "khaled"]
  );
}

export function billingStaticParams() {
  return toStaticParams(
    initialSubscriptions.map((s) => s.id),
    Array.from({ length: 6 }, (_, i) => String(i + 1)),
    ["SUB-101", "SUB-102", "SUB-103", "SUB-104", "SUB-105", "SUB-106"]
  );
}

export function automationRuleStaticParams() {
  return toStaticParams(
    initialAutomationRules.map((r) => r.id),
    ["AUT-101", "AUT-102", "AUT-103", "AUT-104", "AUT-105", "AUT-106", "AUT-107", "AUT-108", "1"]
  );
}

export function automationLogStaticParams() {
  return toStaticParams(
    initialExecutionLogs.map((l) => l.id),
    ["EX-104829", "EX-104828", "EX-104825"]
  );
}

export function cleaningTaskStaticParams() {
  return toStaticParams(
    initialOperationsTasks.filter((t) => t.type === "cleaning").map((t) => t.id),
    ["1", "2"]
  );
}

export function maintenanceTaskStaticParams() {
  return toStaticParams(
    initialOperationsTasks.filter((t) => t.type === "maintenance").map((t) => t.id),
    ["1", "2"]
  );
}
