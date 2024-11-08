import { cn } from "@/lib/utils";
import { SensorDataType } from "@/utils/types";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const columns = [
  "Segment Id",
  "Average Elevation (m)",
  "Elevation Variability (m)",
  "Severity Level",
  "Type",
];

const insightsData: Partial<SensorDataType>[] = [
  {
    segmentId: "0001",
    avgElevation: 11.2,
    varElevation: 0.003,
    severeLevel: "high",
    type: "pothole",
  },
  {
    segmentId: "0002",
    avgElevation: 15.5,
    varElevation: 0.002,
    severeLevel: "medium",
    type: "crack",
  },
  {
    segmentId: "0003",
    avgElevation: 20.1,
    varElevation: 0.004,
    severeLevel: "low",
    type: "crack",
  },
  {
    segmentId: "0004",
    avgElevation: 9.0,
    varElevation: 0.005,
    severeLevel: "high",
    type: "pothole",
  },
  {
    segmentId: "0005",
    avgElevation: 12.7,
    varElevation: 0.001,
    severeLevel: "medium",
    type: "crack",
  },
  {
    segmentId: "0006",
    avgElevation: 8.3,
    varElevation: 0.007,
    severeLevel: "low",
    type: "crack",
  },
  {
    segmentId: "0007",
    avgElevation: 25.4,
    varElevation: 0.006,
    severeLevel: "medium",
    type: "pothole",
  },
  {
    segmentId: "0008",
    avgElevation: 30.2,
    varElevation: 0.002,
    severeLevel: "high",
    type: "pothole",
  },
  {
    segmentId: "0009",
    avgElevation: 19.6,
    varElevation: 0.005,
    severeLevel: "low",
    type: "crack",
  },
  {
    segmentId: "0010",
    avgElevation: 5.5,
    varElevation: 0.003,
    severeLevel: "medium",
    type: "crack",
  },
];

const SensorDataPreview = (props: Props) => {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[20px] px-[29px] py-6 [background:#FFF]">
      <h2 className="mb-4 text-2xl font-semibold leading-[normal] text-black [font-family:Roboto]">
        Insights
      </h2>
      <div className="flex h-full w-full flex-col gap-2">
        <div className="grid grid-cols-5 gap-4">
          {columns.map((title, ind) => (
            <span
              key={ind}
              className="text-sm font-normal uppercase leading-[normal] text-[#7C819A] [font-family:Roboto]"
            >
              {title}
            </span>
          ))}
        </div>
        {insightsData
          .slice(0, 4)
          .map((item: Partial<SensorDataType>, index: number) => {
            return (
              <div key={index} className="grid grid-cols-5 items-center gap-4">
                <span className="flex-[1_0_0] text-xs font-normal leading-[normal] text-black [font-family:Inter]">
                  {item.segmentId}
                </span>
                <span className="flex-[1_0_0] text-xs font-normal leading-[normal] text-black [font-family:Inter]">
                  {item.avgElevation}
                </span>
                <span className="flex-[1_0_0] text-xs font-normal leading-[normal] text-black [font-family:Inter]">
                  {item.varElevation}
                </span>
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
                <span className="flex-[1_0_0] text-xs font-normal uppercase leading-[normal] text-black [font-family:Inter]">
                  {item.type}
                </span>
              </div>
            );
          })}
      </div>
      <Link
        to="/sensor-data"
        className="mt-4 text-center text-xs font-normal uppercase leading-[normal] text-black [font-family:Inter]"
      >
        See more &rarr;
      </Link>
    </div>
  );
};

export default SensorDataPreview;
