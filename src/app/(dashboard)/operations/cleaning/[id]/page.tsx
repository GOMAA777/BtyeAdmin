import type { Metadata } from "next";
import { CleaningDetailView } from "@/features/operations/components/cleaning-detail-view";

import { cleaningTaskStaticParams } from "@/lib/static-params";

export function generateStaticParams() {
  return cleaningTaskStaticParams();
}

interface CleaningTaskPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CleaningTaskPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `مهمة تنظيف ${id} - BYTE HOME`,
    description: `تفاصيل ومتابعة مهمة التنظيف ${id} على مستوى المنصة`,
  };
}

export default async function CleaningTaskPage({ params }: CleaningTaskPageProps) {
  const { id } = await params;
  return <CleaningDetailView taskId={id} />;
}
