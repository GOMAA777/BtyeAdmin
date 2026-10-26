export default function ProfileLoading() {
  return (
    <div className="space-y-6 animate-pulse" dir="rtl">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-32 bg-[#dfe4db]/60 rounded-md" />

      {/* Identity Banner Skeleton */}
      <div className="bg-white rounded-[16px] p-8 border border-[#dfe4db]/50 h-[180px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-20 rounded-[16px] bg-[#dfe4db]" />
          <div className="space-y-3">
            <div className="h-8 w-48 bg-[#dfe4db] rounded-lg" />
            <div className="h-4 w-64 bg-[#dfe4db]/60 rounded-md" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-11 w-32 bg-[#dfe4db] rounded-[12px]" />
          <div className="h-11 w-32 bg-[#dfe4db] rounded-[12px]" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-[172px] bg-white rounded-[16px] border border-[#dfe4db]/50" />
            <div className="h-[172px] bg-white rounded-[16px] border border-[#dfe4db]/50" />
            <div className="h-[172px] bg-white rounded-[16px] border border-[#dfe4db]/50" />
          </div>
          <div className="h-[320px] bg-white rounded-[16px] border border-[#dfe4db]/50" />
          <div className="h-[380px] bg-white rounded-[16px] border border-[#dfe4db]/50" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="h-[380px] bg-white rounded-[16px] border border-[#dfe4db]/50" />
          <div className="h-[280px] bg-white rounded-[16px] border border-[#dfe4db]/50" />
          <div className="h-[320px] bg-white rounded-[16px] border border-[#dfe4db]/50" />
        </div>
      </div>
    </div>
  );
}
