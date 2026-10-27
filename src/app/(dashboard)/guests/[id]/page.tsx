import { Suspense } from "react";
import type { Metadata } from "next";
import { GuestDetailView } from "@/features/guests/components/guest-detail-view";
import { defaultGuestDetail } from "@/features/guests/data/mock-guest-detail";
import { guestStaticParams } from "@/lib/static-params";

export const metadata: Metadata = {
  title: "بيانات العميل | منصة BYTE HOME",
  description: "الملف التعريفي للنزيل وسجل العمليات والحجوزات المسجلة عبر المنصة",
};

export function generateStaticParams() {
  return guestStaticParams();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GuestDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<GuestDetailSkeleton />}>
      <GuestDetailContent params={params} />
    </Suspense>
  );
}

async function GuestDetailContent({ params }: PageProps) {
  const { id } = await params;

  // Enrich default guest detail with the id param
  const guest = {
    ...defaultGuestDetail,
    id: id || defaultGuestDetail.id,
    guestCode: id?.startsWith("GUST-") ? id : defaultGuestDetail.guestCode,
  };

  return <GuestDetailView guest={guest} />;
}

function GuestDetailSkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-pulse" dir="rtl">
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-24" />
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-72" />
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-80" />
    </div>
  );
}
