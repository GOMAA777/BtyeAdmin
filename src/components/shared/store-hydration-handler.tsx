"use client";

import { useEffect } from "react";
import { ensureStoreHydrated } from "@/stores/use-app-data-store";

/**
 * Triggers safe client-side rehydration of the persisted app data store on initial mount.
 * This runs strictly after React hydration, preventing any SSR mismatch errors.
 */
export function StoreHydrationHandler() {
  useEffect(() => {
    ensureStoreHydrated();
  }, []);

  return null;
}
