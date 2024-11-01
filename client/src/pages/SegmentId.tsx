import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";
import { SlashIcon } from "@radix-ui/react-icons";
import Heatmap from "@/ui/Heatmap";
import LocationMap from "@/ui/LocationMap";
import LidarChart from "@/ui/Chart";

const SegmentId = () => {
  const params = useParams();
  const id = params.id;

  return (
    <div className="container mx-auto h-full">
      <div className="flex h-full w-full flex-col gap-4 rounded-xl p-8 [background:#FFF]">
        {/* <h2 className="text-2xl font-semibold uppercase leading-[normal] text-black [font-family:Roboto]">
          Data Insights
        </h2> */}
        <Breadcrumb>
          <BreadcrumbList>
            {/* <BreadcrumbSeparator /> */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/sensor-data" className="text-xl">
                Sensor Data
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon className="!h-4 !w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl">
                Segment - {id}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex h-full justify-between gap-10">
          <Heatmap />
          <div className="flex w-[50%] flex-col gap-10">
            <LocationMap />
            <LidarChart title="Graph" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentId;
