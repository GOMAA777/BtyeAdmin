"use client";

import React from "react";

interface TableSkeletonRowsProps {
  columns: number;
  rows?: number;
}

export function TableSkeletonRows({
  columns,
  rows = 5,
}: TableSkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr
          key={rIdx}
          className="border-b border-[#EEF2E6]/80 animate-pulse select-none"
        >
          {Array.from({ length: columns }).map((_, cIdx) => (
            <td key={cIdx} className="py-4 px-4 sm:px-5">
              <div
                className={`h-4 bg-[#DCE2D7]/70 rounded-md ${
                  cIdx === 0
                    ? "w-28 sm:w-36"
                    : cIdx === columns - 1
                    ? "w-16 mx-auto"
                    : "w-20 sm:w-24"
                }`}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
