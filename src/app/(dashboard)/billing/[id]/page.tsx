import { Metadata } from "next";
import { SubscriptionDetailView } from "@/features/billing/components/subscription-detail-view";
import { billingStaticParams } from "@/lib/static-params";

export const metadata: Metadata = {
  title: "تفاصيل الاشتراك والفوترة | إبراج",
  description: "عرض تفاصيل باقة المالك وسعة الشقق والعمليات المحاسبية والفواتير الضريبية",
};

export function generateStaticParams() {
  return billingStaticParams();
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubscriptionDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <SubscriptionDetailView />;
}
