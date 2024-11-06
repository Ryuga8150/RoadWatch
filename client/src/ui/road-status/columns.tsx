import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getProgressBarColor } from "@/utils/cn";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RoadStatusType = {
  id: string;
  location: string;
  progress: number;
  // status: "active" | "inactive";
  severeLevel: "high" | "medium" | "low";
};

export const columns: ColumnDef<RoadStatusType>[] = [
  {
    accessorKey: "id",
    header: "Sensor ID",
  },
  {
    accessorKey: "location",
    header: "Location ID",
  },
  {
    accessorKey: "progress",
    header: "Road Health",
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number;
      return (
        <Progress
          value={progress}
          className="w-[239px] rounded-[70px] [background:#E4E5E7]"
          progressBarColor={getProgressBarColor(progress)}
        />
      );
    },
  },
  {
    accessorKey: "severeLevel",
    header: () => {
      return <div className="text-left">Severity Level</div>;
    },
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
    // cell: ({ row }) => {
    //   const status = row.getValue("status") as string;
    //   return (
    //     <div className="text-left">
    //       <Button
    //         variant="default"
    //         className={cn(
    //           "h-7 w-20 rounded-xl px-4 py-2 text-xs font-semibold [font-family:Inter]",

    //           {
    //             "text-[#870505] [background:rgba(250,0,0,0.60)]":
    //               status === "inactive",
    //             "text-[#46B685] [background:#F0FDF4]": status === "active",
    //           },
    //         )}
    //       >
    //         {status}
    //       </Button>
    //     </div>
    //   );
    // },
  },
];
