import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SensorStatus from "@/ui/sensor-status";
import React from "react";
import { SensorStatusType } from "./columns";
import { cn } from "@/lib/utils";
import { getProgressBarColor } from "@/utils/cn";
import { Link } from "react-router-dom";

type Props = {};

const data: SensorStatusType[] = [
  {
    id: "SENSOR-001",
    location: "location",
    progress: 100,
    status: "active",
  },
  {
    id: "SENSOR-002",
    location: "location",
    progress: 50,
    status: "active",
  },
  {
    id: "SENSOR-003",
    location: "location",
    progress: 20,
    status: "inactive",
  },
  // {
  //   id: "SENSOR-004",
  //   location: "location",
  //   progress: 80,
  //   status: "inactive",
  // },
];

const SensorStatusPreview = (props: Props) => {
  return (
    <div className="flex w-full flex-col items-start justify-between rounded-[20px] px-[29px] py-6 [background:#FFF]">
      <h2 className="w-[510px] text-2xl font-semibold leading-[normal] text-black [font-family:Roboto]">
        Sensor Status
      </h2>
      {data.map((item, ind) => (
        <div
          key={ind}
          className={cn(
            "flex items-center justify-between self-stretch rounded-md p-2.5",
            {
              "[background:#FBFCFC]": ind % 2 == 0,
            },
          )}
        >
          <div className="flex flex-col items-start justify-center gap-0.5">
            <span className="text-xs font-normal leading-[normal] text-black [font-family:Inter]">
              {item.id}
            </span>
            <span className="text-xs font-normal leading-[normal] text-[#ABB0C5] [font-family:Inter]">
              {item.location}
            </span>
          </div>
          <Progress
            value={item.progress}
            className="w-[239px] rounded-[70px] [background:#E4E5E7]"
            progressBarColor={getProgressBarColor(item.progress)}
          />
          <Button
            variant="default"
            className={cn(
              "w-20 rounded-xl px-4 py-2 text-xs font-semibold [font-family:Inter]",

              {
                "text-[#870505] [background:rgba(250,0,0,0.60)]":
                  item.status === "inactive",
                "text-[#46B685] [background:#F0FDF4]": item.status === "active",
              },
            )}
          >
            {item.status}
          </Button>
        </div>
      ))}
      <Link
        to="sensor-data"
        className="self-stretch text-center text-xs font-normal uppercase leading-[normal] text-black [font-family:Inter]"
      >
        See more &rarr;
      </Link>
    </div>
  );
};

export default SensorStatusPreview;
