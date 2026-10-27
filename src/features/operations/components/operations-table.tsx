"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Sparkles, Wrench } from "lucide-react";
import { toast } from "sonner";
import { TablePagination } from "@/components/shared/table-pagination";
import { TableSkeletonRows } from "@/components/shared/table-skeleton";
import { TableErrorRow } from "@/components/shared/error-state";
import { OperationTask } from "../types";
import { OperationActionDropdown } from "./operation-action-dropdown";
import { CleaningAssignModal } from "./cleaning-assign-modal";

interface OperationsTableProps {
  tasks: OperationTask[];
  onSelectTask?: (task: OperationTask) => void;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function OperationsTable({
  tasks,
  onSelectTask,
  isLoading,
  error,
  onRetry,
}: OperationsTableProps) {
  const router = useRouter();
  const [assignTask, setAssignTask] = useState<OperationTask | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalCount = tasks.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedTasks = tasks.slice(startIndex, startIndex + pageSize);
  const getStatusBadge = (status: OperationTask["status"], label: string) => {
    switch (status) {
      case "needs_cleaning":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
            <span>{label}</span>
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span>{label}</span>
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
            <span>{label}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EBEBEB] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-[#F3F4F6] text-xs font-medium text-[#6B7280] bg-[#FAFBF9]">
              <th className="py-4 px-5">نوع العملية</th>
              <th className="py-4 px-5">رقم المهمة</th>
              <th className="py-4 px-5">الوحدة</th>
              <th className="py-4 px-5">العقار</th>
              <th className="py-4 px-5">المالك</th>
              <th className="py-4 px-5">تاريخ الإنشاء</th>
              <th className="py-4 px-5">الحالة</th>
              <th className="py-4 px-5">المسؤول</th>
              <th className="py-4 px-5 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6] text-sm">
            {isLoading ? (
              <TableSkeletonRows columns={9} rows={5} />
            ) : error ? (
              <TableErrorRow colSpan={9} message={error} onRetry={onRetry} />
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-[#9CA3AF]">
                  لا توجد مهام أو بلاغات مطابقة لخيارات البحث الحالية
                </td>
              </tr>
            ) : (
              paginatedTasks.map((task) => {
                const isCleaning = task.type === "cleaning";
                const detailHref = isCleaning
                  ? `/operations/cleaning/${task.id}/`
                  : `/operations/maintenance/${task.id}/`;

                return (
                  <tr
                    key={task.id}
                    onClick={() => {
                      if (onSelectTask) {
                        onSelectTask(task);
                      } else {
                        router.push(detailHref);
                      }
                    }}
                    className="hover:bg-[#F9FAF8] transition-colors cursor-pointer group"
                  >
                    {/* نوع العملية */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isCleaning
                              ? "bg-[#EAF3EA] text-[#1F3D2B]"
                              : "bg-[#F3F4F6] text-[#4B5563]"
                          }`}
                        >
                          {isCleaning ? (
                            <Sparkles className="w-4 h-4 text-[#1F3D2B]" />
                          ) : (
                            <Wrench className="w-4 h-4 text-[#4B5563]" />
                          )}
                        </div>
                        <span className="font-medium text-[#1F2937]">
                          {isCleaning ? "تنظيف" : "صيانة"}
                        </span>
                      </div>
                    </td>

                    {/* رقم المهمة */}
                    <td className="py-4 px-5">
                      <Link
                        href={detailHref}
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-[#1F2937] hover:text-[#1F3D2B] hover:underline"
                      >
                        {task.taskNumber}
                      </Link>
                    </td>

                    {/* الوحدة */}
                    <td className="py-4 px-5">
                      <div>
                        <p className="font-semibold text-[#1F2937]">{task.unitName}</p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{task.floor}</p>
                      </div>
                    </td>

                    {/* العقار */}
                    <td className="py-4 px-5">
                      <div>
                        <p className="font-medium text-[#374151]">{task.propertyName}</p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{task.city}</p>
                      </div>
                    </td>

                    {/* المالك */}
                    <td className="py-4 px-5">
                      <div>
                        <p className="font-medium text-[#374151]">{task.ownerName}</p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{task.ownerCode}</p>
                      </div>
                    </td>

                    {/* تاريخ الإنشاء */}
                    <td className="py-4 px-5 text-[#4B5563] whitespace-nowrap">
                      {task.createdAt}
                    </td>

                    {/* الحالة */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      {getStatusBadge(task.status, task.statusLabel)}
                    </td>

                    {/* المسؤول */}
                    <td className="py-4 px-5">
                      {task.assigneeCompany ? (
                        <div>
                          <p className="font-medium text-[#374151]">{task.assigneeName}</p>
                          <p className="text-xs text-[#9CA3AF] mt-0.5">
                            {task.assigneeCompany}
                          </p>
                        </div>
                      ) : (
                        <p
                          className={`font-medium ${
                            task.assigneeName?.includes("غير مسند")
                              ? "text-[#9CA3AF]"
                              : "text-[#374151]"
                          }`}
                        >
                          {task.assigneeName}
                        </p>
                      )}
                    </td>

                    {/* الإجراءات */}
                    <td
                      className="py-4 px-5 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <OperationActionDropdown
                        task={task}
                        onAssign={(t) => setAssignTask(t)}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Pagination */}
      <TablePagination
        currentPage={activePage}
        totalPages={totalPages}
        totalCount={totalCount}
        fromIndex={totalCount === 0 ? 0 : startIndex + 1}
        toIndex={Math.min(startIndex + pageSize, totalCount)}
        pageSize={pageSize}
        pageSizeOptions={[5, 10]}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        entityName="عملية"
        pluralEntityName="عمليات"
        registeredLabel="مسجلة"
      />

      {/* Assign Modal */}
      {assignTask && (
        <CleaningAssignModal
          isOpen={!!assignTask}
          onClose={() => setAssignTask(null)}
          onConfirm={(assignee) => {
            toast.success(
              `تم تعيين (${assignee}) للمهمة ${assignTask.taskNumber} بنجاح!`
            );
            setAssignTask(null);
          }}
          taskNumber={assignTask.taskNumber}
          unitName={assignTask.unitName}
          propertyName={assignTask.propertyName}
          ownerName={assignTask.ownerName}
        />
      )}
    </div>
  );
}
