import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { NotificationItem } from "../types";
import { INITIAL_NOTIFICATIONS } from "../data/mock-notifications";

interface NotificationsState {
  notifications: NotificationItem[];
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearReadNotifications: () => void;
  resetToDefault: () => void;
  addNotification: (item: Omit<NotificationItem, "id" | "createdAt" | "timeAgo">) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set) => ({
      notifications: INITIAL_NOTIFICATIONS,
      hasHydrated: false,
      setHasHydrated: (val: boolean) => set({ hasHydrated: val }),

      markAsRead: (id: string) =>
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, read: true } : item
          ),
        })),

      markAsUnread: (id: string) =>
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, read: false } : item
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((item) => ({
            ...item,
            read: true,
          })),
        })),

      deleteNotification: (id: string) =>
        set((state) => ({
          notifications: state.notifications.filter((item) => item.id !== id),
        })),

      clearReadNotifications: () =>
        set((state) => ({
          notifications: state.notifications.filter((item) => !item.read),
        })),

      resetToDefault: () =>
        set({
          notifications: INITIAL_NOTIFICATIONS,
        }),

      addNotification: (item) =>
        set((state) => {
          const newItem: NotificationItem = {
            ...item,
            id: `notif-${Date.now()}`,
            createdAt: new Date().toISOString(),
            timeAgo: "الآن",
            read: false,
          };
          return {
            notifications: [newItem, ...state.notifications],
          };
        }),
    }),
    {
      name: "hb:notifications-store:v1",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        notifications: state.notifications,
      }),
    }
  )
);
