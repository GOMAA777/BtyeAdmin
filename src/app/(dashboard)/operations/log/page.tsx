import type { Metadata } from "next";
import { Suspense } from "react";
import { FullOperationsLogView } from "@/features/operations/components/full-operations-log-view";

export const metadata: Metadata = {
  title: "سجل التشغيل الكامل — الوحدة 204 - ابراج",
  description: "التوثيق الزمني التشغيلي المباشر لمهام النظافة والتعقيم وبلاغات الصيانة والأعطال الفنية.",
};

export default function OperationsLogPage() {
  return (
    <Suspense fallback={<div className="min-h-[400px] animate-pulse rounded-2xl bg-[#f1f5eb]" />}>
      <FullOperationsLogView />
    </Suspense>
  );
}
