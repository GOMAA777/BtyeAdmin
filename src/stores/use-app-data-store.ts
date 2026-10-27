import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Property } from "@/features/properties/types";
import type { Owner } from "@/features/owners/types";
import type { Unit } from "@/features/units/types";
import type { MainBookingItem } from "@/features/bookings/types";
import type { OperationTask } from "@/features/operations/types";
import type { TeamMember } from "@/features/team/types";
import type { AutomationRule } from "@/features/automation/types";
import type { WhatsAppConversationItem } from "@/features/whatsapp/types";
import type { Subscription } from "@/features/billing/types";

export interface AppDataState {
  properties: Property[];
  owners: Owner[];
  units: Unit[];
  bookings: MainBookingItem[];
  operations: OperationTask[];
  team: TeamMember[];
  automationRules: AutomationRule[];
  conversations: WhatsAppConversationItem[];
  subscriptions: Subscription[];

  // Property Actions
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;

  // Owner Actions
  setOwners: (owners: Owner[]) => void;
  addOwner: (owner: Owner) => void;
  updateOwner: (id: string, updates: Partial<Owner>) => void;
  deleteOwner: (id: string) => void;

  // Unit Actions
  setUnits: (units: Unit[]) => void;
  addUnit: (unit: Unit) => void;
  updateUnit: (id: string, updates: Partial<Unit>) => void;
  deleteUnit: (id: string) => void;

  // Booking Actions
  setBookings: (bookings: MainBookingItem[]) => void;
  addBooking: (booking: MainBookingItem) => void;
  updateBooking: (id: string, updates: Partial<MainBookingItem>) => void;
  deleteBooking: (id: string) => void;

  // Operation Actions
  setOperations: (tasks: OperationTask[]) => void;
  addOperation: (task: OperationTask) => void;
  updateOperation: (id: string, updates: Partial<OperationTask>) => void;
  deleteOperation: (id: string) => void;

  // Team Actions
  setTeam: (members: TeamMember[]) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Automation Actions
  setAutomationRules: (rules: AutomationRule[]) => void;
  addAutomationRule: (rule: AutomationRule) => void;
  updateAutomationRule: (id: string, updates: Partial<AutomationRule>) => void;
  deleteAutomationRule: (id: string) => void;

  // WhatsApp Actions
  setConversations: (conversations: WhatsAppConversationItem[]) => void;
  addConversation: (conversation: WhatsAppConversationItem) => void;

  // Subscriptions Actions
  setSubscriptions: (subscriptions: Subscription[]) => void;
  addSubscription: (subscription: Subscription) => void;

  // Reset
  resetAll: () => void;
}

export const useAppDataStore = create<AppDataState>()(
  persist(
    (set) => ({
      properties: [],
      owners: [],
      units: [],
      bookings: [],
      operations: [],
      team: [],
      automationRules: [],
      conversations: [],
      subscriptions: [],

      setProperties: (properties) => set({ properties }),
      addProperty: (property) =>
        set((state) => ({ properties: [property, ...state.properties] })),
      updateProperty: (id, updates) =>
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deleteProperty: (id) =>
        set((state) => ({
          properties: state.properties.filter((p) => p.id !== id),
        })),

      setOwners: (owners) => set({ owners }),
      addOwner: (owner) => set((state) => ({ owners: [owner, ...state.owners] })),
      updateOwner: (id, updates) =>
        set((state) => ({
          owners: state.owners.map((o) =>
            o.id === id ? { ...o, ...updates } : o
          ),
        })),
      deleteOwner: (id) =>
        set((state) => ({
          owners: state.owners.filter((o) => o.id !== id),
        })),

      setUnits: (units) => set({ units }),
      addUnit: (unit) => set((state) => ({ units: [unit, ...state.units] })),
      updateUnit: (id, updates) =>
        set((state) => ({
          units: state.units.map((u) => (u.id === id ? { ...u, ...updates } : u)),
        })),
      deleteUnit: (id) =>
        set((state) => ({
          units: state.units.filter((u) => u.id !== id),
        })),

      setBookings: (bookings) => set({ bookings }),
      addBooking: (booking) =>
        set((state) => ({ bookings: [booking, ...state.bookings] })),
      updateBooking: (id, updates) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),
      deleteBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        })),

      setOperations: (operations) => set({ operations }),
      addOperation: (task) =>
        set((state) => ({ operations: [task, ...state.operations] })),
      updateOperation: (id, updates) =>
        set((state) => ({
          operations: state.operations.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      deleteOperation: (id) =>
        set((state) => ({
          operations: state.operations.filter((t) => t.id !== id),
        })),

      setTeam: (team) => set({ team }),
      addTeamMember: (member) =>
        set((state) => ({ team: [member, ...state.team] })),
      updateTeamMember: (id, updates) =>
        set((state) => ({
          team: state.team.map((m) => (m.id === id ? { ...m, ...updates } : m)),
        })),
      deleteTeamMember: (id) =>
        set((state) => ({
          team: state.team.filter((m) => m.id !== id),
        })),

      setAutomationRules: (automationRules) => set({ automationRules }),
      addAutomationRule: (rule) =>
        set((state) => ({ automationRules: [rule, ...state.automationRules] })),
      updateAutomationRule: (id, updates) =>
        set((state) => ({
          automationRules: state.automationRules.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),
      deleteAutomationRule: (id) =>
        set((state) => ({
          automationRules: state.automationRules.filter((r) => r.id !== id),
        })),

      setConversations: (conversations) => set({ conversations }),
      addConversation: (conversation) =>
        set((state) => ({
          conversations: [conversation, ...state.conversations],
        })),

      setSubscriptions: (subscriptions) => set({ subscriptions }),
      addSubscription: (subscription) =>
        set((state) => ({
          subscriptions: [subscription, ...state.subscriptions],
        })),

      resetAll: () =>
        set({
          properties: [],
          owners: [],
          units: [],
          bookings: [],
          operations: [],
          team: [],
          automationRules: [],
          conversations: [],
          subscriptions: [],
        }),
    }),
    {
      name: "hb:app-data-store:v1",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      skipHydration: true,
    }
  )
);

/**
 * Safely returns fallback during SSR and initial client hydration to avoid hydration mismatches.
 * To read live reactive store data safely, prefer useSyncExternalStore or subscribe.
 */
export function getInitialHydratedState<T>(
  _selector: (state: AppDataState) => T,
  fallback: T
): T {
  return fallback;
}

/**
 * Ensures the app data store is hydrated on the client before reading or writing.
 */
export async function ensureStoreHydrated(): Promise<void> {
  if (typeof window !== "undefined" && !useAppDataStore.persist?.hasHydrated?.()) {
    await useAppDataStore.persist.rehydrate();
  }
}
