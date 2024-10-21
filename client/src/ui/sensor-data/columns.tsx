import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getProgressBarColor } from "@/utils/cn";
import { splitTimestamp } from "@/utils/fn";
import { SensorDataType } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SensorStatusType = {
  id: string;
  location: string;
  progress: number;
  status: "active" | "inactive";
};

export const columns: ColumnDef<SensorDataType>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string;
      const { date, time } = splitTimestamp(timestamp);
      return (
        <div className="flex flex-col">
          <span className="text-sm text-black">{date}</span>
          <span className="text-xs text-[#ABB0C5] [font-family:Inter]">
            {time}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "segmentId",
    header: "Segment ID",
  },
  {
    accessorKey: "avgElevation",
    header: "Avg Elevation (m)",
  },
  {
    accessorKey: "varElevation",
    header: "Elevation Variability(m)",
  },
  {
    accessorKey: "locationId",
    header: "Location ID",
  },
  {
    accessorKey: "severeLevel",
    header: "Severity Level",
    cell: ({ row }) => {
      const severityLevel = row.getValue("severeLevel") as string;
      return (
        <div
          className={cn(
            "flex w-20 items-center justify-center rounded-xl border border-solid px-0.5 py-2",
            {
              "border-[rgba(250,0,0,0.60)] [background:#F8E8E8]":
                severityLevel === "high",
              "border-[rgba(82,199,82,0.60)] [background:#EAF9F1]":
                severityLevel === "low",
              "border-[rgba(255,186,8,0.60)] [background:#FEF7EA]":
                severityLevel === "medium",
            },
          )}
        >
          <span
            className={cn(
              "text-[10px] font-semibold uppercase leading-[normal] [font-family:Inter]",
              {
                "text-[#C72F2F]": severityLevel === "high",
                "text-[#46C67B]": severityLevel === "low",
                "text-[#FAAF31]": severityLevel === "medium",
              },
            )}
          >
            {severityLevel}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return <div className="text-sm uppercase">{type}</div>;
    },
  },
];
