import { Progress } from "@/components/ui/progress";
import React from "react";
import { cn } from "@/lib/utils";
import { getProgressBarColor } from "@/utils/cn";
import { Link } from "react-router-dom";
import { RoadStatusType } from "./columns";

type Props = {};

const data: RoadStatusType[] = [
  {
    id: "SENSOR-001",
    location: "location-8",
    progress: 100,
    severeLevel: "low",
  },
  {
    id: "SENSOR-002",
    location: "location-7",
    progress: 50,
    severeLevel: "medium",
  },
  {
    id: "SENSOR-003",
    location: "location-12",
    progress: 20,
    severeLevel: "high",
  },
  // {
  //   id: "SENSOR-004",
  //   location: "location",
  //   progress: 80,
  //   status: "inactive",
  // },
];

const columns = ["Sensor ID", "Road Health", "Severity Level"];

const RoadStatusPreview = (props: Props) => {
  return (
    <div className="flex w-full flex-col items-start justify-between rounded-[20px] px-[29px] py-6 [background:#FFF]">
      <h2 className="w-[510px] text-2xl font-semibold leading-[normal] text-black [font-family:Roboto]">
        Road Status
      </h2>
      <div className="grid grid-cols-[1fr,239px,1fr] items-center justify-center gap-4 p-2.5">
        {columns.map((title, ind) => (
          <span
            key={ind}
            className={cn(
              "text-sm font-normal uppercase leading-[normal] text-[#7C819A] [font-family:Roboto]",
              {
                "text-center": ind != 0,
                "pl-4": ind === 2,
              },
            )}
          >
            {title}
          </span>
        ))}
      </div>
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
          {/* <Button
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
          </Button> */}
          <div
            className={cn(
              "flex w-16 items-center justify-center rounded-xl border border-solid px-0.5 py-2",
              {
                "border-[rgba(250,0,0,0.60)] [background:#F8E8E8]":
                  item.severeLevel === "high",
                "border-[rgba(82,199,82,0.60)] [background:#EAF9F1]":
                  item.severeLevel === "low",
                "border-[rgba(255,186,8,0.60)] [background:#FEF7EA]":
                  item.severeLevel === "medium",
              },
            )}
          >
            <span
              className={cn(
                "text-[10px] font-semibold uppercase leading-[normal] [font-family:Inter]",
                {
                  "text-[#C72F2F]": item.severeLevel === "high",
                  "text-[#46C67B]": item.severeLevel === "low",
                  "text-[#FAAF31]": item.severeLevel === "medium",
                },
              )}
            >
              {item.severeLevel}
            </span>
          </div>
        </div>
      ))}
      <Link
        to="/road-status"
        className="self-stretch text-center text-xs font-normal uppercase leading-[normal] text-black [font-family:Inter]"
      >
        See more &rarr;
      </Link>
    </div>
  );
};

export default RoadStatusPreview;
