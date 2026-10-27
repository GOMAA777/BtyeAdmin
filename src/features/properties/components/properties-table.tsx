"use client";

import { Eye, SlidersHorizontal, Building2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/constants";
import { PropertyStatus } from "../types";
import { PropertiesFilters } from "./properties-filters";
import { PropertiesAdvancedFilterDrawer } from "./properties-advanced-filter-drawer";
import { PropertiesEmptyState } from "./properties-empty-state";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { TablePagination } from "@/components/shared/table-pagination";
import { TableSkeletonRows } from "@/components/shared/table-skeleton";
import { TableErrorRow } from "@/components/shared/error-state";
import { usePropertiesManager } from "../controllers/use-properties-manager";

export function PropertiesTable() {
  const {
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
    isLoading,
    error,
    reloadProperties,
    setFilter,
    setSearch,
    setCurrentPage,
    setPageSize,
    setIsFilterDrawerOpen,
    setPropertyFilters,
    handleResetFilters,
    handleDeleteProperty,
  } = usePropertiesManager();

  const renderStatusBadge = (status: PropertyStatus) => {
    if (status === "active") {
      return (
        <span className="bg-[#D8E8CB] text-[#5A6952] text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5A6952]" />
          <span>نشط</span>
        </span>
      );
    }
    if (status === "inactive") {
      return (
        <span className="bg-[#E5EAE0] text-[#75786F] text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#75786F]" />
          <span>غير نشط</span>
        </span>
      );
    }
    return (
      <span className="bg-[#DFE4DB] text-[#54624C] text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#75786F]" />
        <span>مؤرشف</span>
      </span>
    );
  };

  return (
    <div className="space-y-4 font-cairo">
      {/* 1. Search & Tabs Filter Bar */}
      <PropertiesFilters
        currentFilter={filter}
        onFilterChange={setFilter}
        searchQuery={search}
        onSearchChange={setSearch}
        counts={counts}
        onOpenAdvancedFilter={() => setIsFilterDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
        onResetFilter={handleResetFilters}
        isLoading={isLoading}
      />

      {/* 2. Main High-Fidelity Table Container */}
      <div className="bg-white rounded-[16px] border border-[#E5E8E2] overflow-hidden drop-shadow-[0px_2px_5px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse min-w-[960px]">
            <thead>
              <tr className="bg-[#F9FAF8] border-b border-[#E5E8E2] text-[#73786F] text-[11px] font-bold tracking-[0.55px] uppercase">
                <th className="py-4 px-6 text-start">العقار</th>
                <th className="py-4 px-4 text-start">مالك العقار</th>
                <th className="py-4 px-4 text-start">الموقع</th>
                <th className="py-4 px-4 text-center">الوحدات</th>
                <th className="py-4 px-4 text-center">الحجوزات الحالية</th>
                <th className="py-4 px-4 text-center">تاريخ الإضافة</th>
                <th className="py-4 px-4 text-center">الحالة</th>
                <th className="py-4 px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8E2]">
              {isLoading ? (
                <TableSkeletonRows columns={8} rows={5} />
              ) : error ? (
                <TableErrorRow
                  colSpan={8}
                  message={error}
                  onRetry={reloadProperties}
                />
              ) : counts.all === 0 ? (
                <tr>
                  <td colSpan={8} className="p-4 sm:p-8">
                    <PropertiesEmptyState
                      onRefresh={() => {
                        setSearch("");
                        setFilter("all");
                        handleResetFilters();
                        reloadProperties();
                      }}
                    />
                  </td>
                </tr>
              ) : paginatedProperties.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-4 sm:p-8">
                    <div className="py-12 text-center text-[#73786F] text-[13px]">
                      لا توجد عقارات تطابق معايير البحث
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedProperties.map((property) => (
                  <tr
                    key={property.id}
                    className="hover:bg-[#F9FAF8]/70 transition-colors"
                  >
                    {/* 1. Property Name & Code */}
                    <td className="py-4 px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[12px] bg-[#EBEFE6] flex items-center justify-center shrink-0">
                          <i className="lucide-icon icon-building-2 w-[15px] h-[15px] text-[#4B5940]" />
                        </div>
                        <div>
                          <a
                            href={`${APP_CONFIG.basePath || ""}/properties/${property.id}/`}
                            className="font-semibold text-[14px] leading-[20px] text-[#181D17] hover:text-[#4B5940] transition-colors block text-right"
                          >
                            {property.title}
                          </a>
                          <div className="text-[11px] font-medium leading-[16px] text-[#54624C] mt-0.5 text-right">
                            {property.type} · #{property.code}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Property Owner */}
                    <td className="py-4 px-4 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E5E8E2] flex items-center justify-center shrink-0 text-[#4B5940] text-[12px] font-bold">
                          {property.ownerInitials}
                        </div>
                        <div>
                          <div className="font-bold text-[14px] leading-[20px] text-[#1E241C] text-right">
                            {property.ownerName}
                          </div>
                          <div className="text-[11px] font-normal leading-[16px] text-[#73786F] mt-0.5 text-right">
                            {property.ownerEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 3. Location */}
                    <td className="py-4 px-4 text-start">
                      <div className="text-right">
                        <div className="text-[14px] font-normal leading-[22px] text-[#181D17]">
                          {property.city}
                        </div>
                        <div className="flex items-center gap-1 text-[14px] font-normal leading-[22px] text-[#181D17]">
                          <i className="lucide-icon icon-map-pin w-[12px] h-[15px] shrink-0 text-[#73786F]" />
                          <span>{property.district}</span>
                        </div>
                      </div>
                    </td>

                    {/* 4. Units */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="font-semibold text-[14px] leading-[20px] text-[#181D17]">
                          {property.totalUnits} وحدة
                        </div>
                        <div className="text-[11px] font-medium leading-[16px] text-[#54624C] mt-0.5">
                          {property.occupiedUnits} مشغولة · {property.availableUnits} متاحة
                        </div>
                      </div>
                    </td>

                    {/* 5. Current Bookings */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        <div className="bg-[#EBEFE6] rounded-[8px] px-2.5 py-1.5 inline-flex flex-col items-center justify-center min-w-[92px]">
                          <div className="flex items-center gap-1.5 text-[12px] font-medium leading-[18px] text-[#181D17]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4B5940] shrink-0" />
                            <span>{property.activeBookings} حجوزات</span>
                          </div>
                          <span className="text-[12px] font-medium leading-[18px] text-[#181D17]">
                            نشطة
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 6. Date Added */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="text-[12px] font-normal leading-[16px] text-[#57534E]">
                          {property.dateAdded}
                        </div>
                        <div className="text-[10px] font-medium leading-[16px] text-[#047857] mt-0.5">
                          {property.relativeTime}
                        </div>
                      </div>
                    </td>

                    {/* 7. Status */}
                    <td className="py-4 px-4 text-center">
                      {renderStatusBadge(property.status)}
                    </td>

                    {/* 8. Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        <ActionDropdown
                          items={[
                            {
                              label: "تفاصيل العقار",
                              icon: Eye,
                              href: `/properties/${property.id}/`,
                            },
                            {
                              label: "تعديل البيانات",
                              icon: SlidersHorizontal,
                              onClick: () =>
                                toast.info(`تعديل بيانات: ${property.title}`),
                            },
                            {
                              label: "إدارة الوحدات",
                              icon: Building2,
                              href: `/properties/${property.id}/`,
                            },
                            {
                              label: "أرشفة العقار",
                              icon: Trash2,
                              variant: "destructive",
                              confirm: {
                                title: "أرشفة العقار",
                                message: `هل أنت متأكد من رغبتك في أرشفة العقار "${property.title}"؟ سيتم إيقاف تشغيل العقار وإخفاؤه من القوائم النشطة.`,
                                confirmLabel: "أرشفة العقار",
                                cancelLabel: "إلغاء",
                                variant: "destructive",
                              },
                              onClick: () =>
                                handleDeleteProperty(property.id, property.title),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 3. Table Footer / Pagination */}
        <TablePagination
          currentPage={activePage}
          totalPages={totalPages}
          totalCount={totalHeadlineCount}
          fromIndex={fromIndex}
          toIndex={toIndex}
          pageSize={pageSize}
          pageSizeOptions={[5, 10]}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          entityName="عقار"
          pluralEntityName="عقارات"
          registeredLabel="مسجل"
        />
      </div>

      {/* Advanced Filter Drawer */}
      <PropertiesAdvancedFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={propertyFilters}
        onApplyFilters={(newFilters) => {
          setPropertyFilters(newFilters);
          setCurrentPage(1);
        }}
        onResetFilters={handleResetFilters}
        totalResultsCount={totalFiltered}
      />
    </div>
  );
}
