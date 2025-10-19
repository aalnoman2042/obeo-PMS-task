/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { AccountItem, ReportSection } from "../../../types/types";

// ✅ Utility: Currency Formatter
const formatCurrency = (amount: number): string => {
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// ✅ Utility: Calculates the total amount for a section (recursive sum)
export const calculateTotal = (section: ReportSection): number => {
  let total = 0;

  if (section.items) {
    total += section.items.reduce((sum, item) => sum + item.amount, 0);
  }

  if (section.subSections) {
    total += section.subSections.reduce((sum, sub) => sum + calculateTotal(sub), 0);
  }

  return total;
};

interface RendererProps {
  sections: ReportSection[];
  level?: number; // Tracks depth for indentation
}

export function RecursiveRenderer({ sections, level = 0 }: RendererProps) {
  if (!sections || sections.length === 0) {
    // ✅ No sections at all
    return (
      <TableRow>
        <TableCell colSpan={2} className="text-center py-2 text-sm text-gray-500 italic">
          No data available
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {sections.map((section, index) => {
        const nextLevel = level + 1;
        const sectionTotal = calculateTotal(section);
        const paddingLeft = nextLevel * 16;
        const isGroupTitle = level === 0;

        const hasItems = section.items && section.items.length > 0;
        const hasSubSections = section.subSections && section.subSections.length > 0;

        return (
          <React.Fragment key={section.title + index}>
            {/* SECTION TITLE */}
            <TableRow
              className={`hover:bg-gray-50/50 ${
                isGroupTitle ? "bg-gray-50" : ""
              }`}
            >
              <TableCell
                style={{ paddingLeft: `${paddingLeft}px` }}
                className={`py-1.5 ${
                  isGroupTitle
                    ? "font-bold text-base"
                    : "font-semibold text-sm"
                }`}
              >
                {section.title}
              </TableCell>
              <TableCell className="text-right py-1.5" />
            </TableRow>

            {/* ✅ NO DATA INSIDE THIS SECTION */}
            {!hasItems && !hasSubSections && (
              <TableRow>
                <TableCell
                  colSpan={2}
                  style={{ paddingLeft: `${paddingLeft + 16}px` }}
                  className="text-gray-500 italic text-sm py-1.5"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}

            {/* DIRECT ITEMS */}
            {hasItems &&
              section.items!.map((item: AccountItem, itemIndex: number) => (
                <TableRow key={item.name + itemIndex} className="hover:bg-gray-50">
                  <TableCell
                    style={{ paddingLeft: `${paddingLeft + 16}px` }}
                    className="py-1 text-sm"
                  >
                    {item.name}
                  </TableCell>
                  <TableCell className="text-right py-1 text-sm">
                    {formatCurrency(item.amount)}
                  </TableCell>
                </TableRow>
              ))}

            {/* SUB-SECTIONS */}
            {hasSubSections && (
              <RecursiveRenderer sections={section.subSections!} level={nextLevel} />
            )}

            {/* SUBTOTAL ROW */}
            {sectionTotal > 0 && (
              <TableRow className="font-bold border-t border-b hover:bg-gray-100/80">
                <TableCell
                  style={{ paddingLeft: `${paddingLeft}px` }}
                  className="py-1.5 text-sm"
                >
                  Total {section.title}
                </TableCell>
                <TableCell className="text-right py-1.5 text-sm">
                  {formatCurrency(sectionTotal)}
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
