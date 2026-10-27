"use client";

import { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import { toast } from "sonner";
import {
  Property,
  PropertyStatus,
  MainPropertyFilterState,
  initialPropertyFilterState,
} from "../types";
import { propertiesService } from "@/services/properties-service";
import { useAppDataStore, ensureStoreHydrated } from "@/stores/use-app-data-store";

const emptyProperties: Property[] = [];

export function usePropertiesManager(initialData?: Property[]) {
  const storeProperties = useSyncExternalStore(
    useAppDataStore.subscribe,
    () => useAppDataStore.getState().properties,
    () => emptyProperties
  );
  const properties = initialData || storeProperties;

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [propertyFilters, setPropertyFilters] =
    useState<MainPropertyFilterState>(initialPropertyFilterState);

  useEffect(() => {
    ensureStoreHydrated();
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (propertyFilters.propertyType !== "all") count++;
    if (propertyFilters.city !== "all") count++;
    if (propertyFilters.district !== "all") count++;
    if (propertyFilters.status !== "all") count++;
    if (propertyFilters.unitsRange !== "all") count++;
    if (propertyFilters.occupancyState !== "all") count++;
    if (propertyFilters.activeBookings !== "all") count++;
    if (propertyFilters.owner !== "all") count++;
    if (propertyFilters.sortBy !== "default") count++;
    return count;
  }, [propertyFilters]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setPropertyFilters(initialPropertyFilterState);
    setCurrentPage(1);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filter === "active" && property.status !== "active") return false;
      if (filter === "inactive" && property.status !== "inactive") return false;
      if (filter === "archived" && property.status !== "archived") return false;

      if (
        propertyFilters.propertyType !== "all" &&
        property.type !== propertyFilters.propertyType
      ) {
        return false;
      }
      if (
        propertyFilters.city !== "all" &&
        !property.city.includes(propertyFilters.city)
      ) {
        return false;
      }
      if (
        propertyFilters.district !== "all" &&
        !property.district.includes(propertyFilters.district)
      ) {
        return false;
      }
      if (
        propertyFilters.status !== "all" &&
        property.status !== propertyFilters.status
      ) {
        return false;
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          property.title.toLowerCase().includes(q) ||
          property.ownerName.toLowerCase().includes(q) ||
          property.city.toLowerCase().includes(q) ||
          property.district.toLowerCase().includes(q) ||
          property.code.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [properties, filter, search, propertyFilters]);

  const totalHeadlineCount = properties.length;
  const totalFiltered = filteredProperties.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const activePage = Math.min(currentPage, totalPages);

  const startIndex = (activePage - 1) * pageSize;
  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + pageSize
  );

  const fromIndex = totalFiltered === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(startIndex + pageSize, totalFiltered);

  const counts = {
    all: properties.length,
    active: properties.filter((p) => p.status === "active").length,
    inactive: properties.filter((p) => p.status === "inactive").length,
    archived: properties.filter((p) => p.status === "archived").length,
  };

  const handleDeleteProperty = async (id: string, title: string) => {
    try {
      await propertiesService.remove(id);
      toast.success(`تم حذف "${title}" بنجاح`, {
        description: "تمت إزالة العقار وكافة وحداته من المنظومة التشغيلية.",
      });
    } catch {
      toast.error("حدث خطأ أثناء حذف العقار");
    }
  };

  const handleToggleStatus = async (id: string, newStatus: PropertyStatus) => {
    try {
      await propertiesService.update(id, { status: newStatus });
      toast.success("تم تحديث حالة العقار بنجاح");
    } catch {
      toast.error("حدث خطأ أثناء تحديث حالة العقار");
    }
  };

  return {
    properties,
    paginatedProperties,
    counts,
    totalHeadlineCount,
    totalFiltered,
    totalPages,
    activePage,
    fromIndex,
    toIndex,
    filter,
    search,
    pageSize,
    isFilterDrawerOpen,
    propertyFilters,
    activeFiltersCount,
    setFilter: handleFilterChange,
    setSearch: handleSearchChange,
    setCurrentPage,
    setPageSize,
    setIsFilterDrawerOpen,
    setPropertyFilters,
    handleResetFilters,
    handleDeleteProperty,
    handleToggleStatus,
  };
}
