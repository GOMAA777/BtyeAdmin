import type { Metadata } from "next";
import { MaintenanceDetailView } from "@/features/operations/components/maintenance-detail-view";

import { maintenanceTaskStaticParams } from "@/lib/static-params";

export function generateStaticParams() {
  return maintenanceTaskStaticParams();
}

interface MaintenanceTicketPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MaintenanceTicketPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `بلاغ صيانة ${id} - BYTE HOME`,
    description: `تفاصيل ومتابعة بلاغ الصيانة ${id} على مستوى المنصة`,
  };
}

export default async function MaintenanceTicketPage({ params }: MaintenanceTicketPageProps) {
  const { id } = await params;
  return <MaintenanceDetailView ticketId={id} />;
}
