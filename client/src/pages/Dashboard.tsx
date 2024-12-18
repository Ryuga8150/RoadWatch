import React from "react";
import SensorDataPreview from "@/ui/sensor-data/preview";
import LidarChart from "@/ui/Chart";
import LocationMap from "@/ui/LocationMap";
import { useUser } from "@/providers/userProvider";
import RoadStatusPreview from "@/ui/road-status/preview";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-x-8 gap-y-6">
      <RoadStatusPreview />
      <span className="h-full w-full rounded-[20px] px-[29px] py-6 [background:#FFF]">
        <LocationMap />
      </span>
      <SensorDataPreview />
      {/* <span className="w-full h-full [background:#FFF] rounded-[20px] py-6 px-[29px]">
        Data
      </span> */}
      <span className="h-full w-full rounded-[20px] px-[29px] py-6 [background:#FFF]">
        <LidarChart />
      </span>
    </div>
  );
};

export default Dashboard;
