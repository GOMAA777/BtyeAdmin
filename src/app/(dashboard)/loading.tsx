export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse select-none" dir="rtl">
      {/* 1. Breadcrumb Skeleton */}
      <div className="h-4 w-36 bg-[#DCE2D7]/70 rounded-md" />

      {/* 2. Page Header / Banner Skeleton */}
      <div className="bg-white rounded-2xl p-6 border border-[#E0E4D8] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2.5">
          <div className="h-7 w-48 bg-[#DCE2D7] rounded-lg" />
          <div className="h-4 w-64 bg-[#DCE2D7]/60 rounded-md" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-28 bg-[#DCE2D7]/80 rounded-xl" />
          <div className="h-10 w-32 bg-[#4B5940]/20 rounded-xl" />
        </div>
      </div>

      {/* 3. Metric KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-white border border-[#E0E4D8] p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-[#DCE2D7]/70 rounded-md" />
              <div className="w-8 h-8 rounded-xl bg-[#DCE2D7]/60" />
            </div>
            <div className="space-y-1.5">
              <div className="h-6 w-28 bg-[#DCE2D7] rounded-md" />
              <div className="h-3 w-16 bg-[#DCE2D7]/50 rounded-sm" />
            </div>
          </div>
        ))}
      </div>

      {/* 4. Main Content / Data Grid Skeleton */}
      <div className="rounded-2xl bg-white border border-[#E0E4D8] p-6 space-y-4">
        {/* Toolbar skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-[#E0E4D8]/60">
          <div className="h-10 w-64 bg-[#DCE2D7]/60 rounded-xl" />
          <div className="flex items-center gap-2">
            <div className="h-10 w-24 bg-[#DCE2D7]/60 rounded-xl" />
            <div className="h-10 w-24 bg-[#DCE2D7]/60 rounded-xl" />
          </div>
        </div>

        {/* Rows skeleton */}
        <div className="space-y-3 pt-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 w-full bg-[#F4F6F0]/80 rounded-xl border border-[#E0E4D8]/50 flex items-center px-4 justify-between"
            >
              <div className="h-4 w-32 bg-[#DCE2D7]/70 rounded-md" />
              <div className="h-4 w-24 bg-[#DCE2D7]/60 rounded-md hidden sm:block" />
              <div className="h-4 w-20 bg-[#DCE2D7]/60 rounded-md hidden md:block" />
              <div className="h-4 w-16 bg-[#DCE2D7]/60 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
