import { Suspense } from "react";
import { UnitDetailPage } from "@/features/units/components/unit-detail/unit-detail-page";
import { unitStaticParams } from "@/lib/static-params";

export const metadata = {
  title: "سجل نشاط الوحدة — منصة أبراج",
  description: "سجل النشاط والتدقيق الزمني الشامل للوحدة السكنية والعمليات الفندقية والميدانية",
};

export function generateStaticParams() {
  return unitStaticParams();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UnitActivityRoutePage({ params }: PageProps) {
  return (
    <Suspense fallback={<UnitActivitySkeleton />}>
      <UnitActivityContent params={params} />
    </Suspense>
  );
}

async function UnitActivityContent({ params }: PageProps) {
  const { id } = await params;
  return <UnitDetailPage unitId={id} initialShowOperationsLog={true} />;
}

function UnitActivitySkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-pulse" dir="rtl">
      <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-28" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-32" />
        <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-32" />
        <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-32" />
        <div className="bg-[#34422A] rounded-[16px] p-6 h-32" />
      </div>
      <div className="bg-white rounded-[16px] p-4 border border-[#E2E6DC] h-18" />
      <div className="space-y-6">
        <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-48" />
        <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-48" />
      </div>
    </div>
  );
}
