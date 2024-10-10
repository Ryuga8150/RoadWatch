import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getProgressBarColor } from "@/utils/cn";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SensorStatusType = {
  id: string;
  location: string;
  progress: number;
  status: "active" | "inactive";
};

export const columns: ColumnDef<SensorStatusType>[] = [
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
    header: "Sensor Health",
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number;
      return (
        <Progress
          value={progress}
          className="w-[239px] [background:#E4E5E7] rounded-[70px]"
          progressBarColor={getProgressBarColor(progress)}
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return <div className="text-left">Status</div>;
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="text-left">
          <Button
            variant="default"
            className={cn(
              " w-20 h-7 px-4 py-2 rounded-xl [font-family:Inter] text-xs font-semibold",

              {
                "[background:rgba(250,0,0,0.60)] text-[#870505]":
                  status === "inactive",
                "[background:#F0FDF4]  text-[#46B685]": status === "active",
              }
            )}
          >
            {status}
          </Button>
        </div>
      );
    },
  },
];
