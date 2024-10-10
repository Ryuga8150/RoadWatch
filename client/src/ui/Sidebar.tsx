import React, { useState } from "react";
import {
  ComplaintIcon,
  DashboardIcon,
  DataIcon,
  SensorStatusIcon,
} from "../utils/icons";
import IconButton from "./IconButton";
import Logo from "./Logo";

type Props = {};

const Sidebar = (props: Props) => {
  const [active, setActive] = useState("Dashboard");
  return (
    <div className="row-span-full flex h-full w-full flex-col items-center gap-8 border-r-[1px] border-r-black/30 p-5">
      <Logo />

      <div className="align-items-center flex flex-grow flex-col gap-7 p-6">
        {[
          {
            title: "Dashboard",
            to: "/",
            icon: DashboardIcon,
            color: "#919298",
          },
          {
            title: "Data",
            to: "/sensor-data",
            icon: DataIcon,
            color: "black",
          },
          {
            title: "Sensor Status",
            to: "/sensor-status",
            icon: SensorStatusIcon,
            color: "black",
          },
          {
            title: "Complaint",
            to: "/complaint",
            icon: ComplaintIcon,
            color: "black",
          },
        ].map((item, ind) => {
          const Icon = item.icon;
          console.log(active, item.title);
          return (
            <div onClick={() => setActive(item.title)} className="w-full">
              <IconButton
                key={ind}
                text={item.title}
                active={active === item.title}
                to={item.to}
              >
                <Icon color={active === item.title ? "#fff" : item.color} />
              </IconButton>
            </div>
          );
        })}
      </div>
      <IconButton text="Logout">
        <span className="text-xl text-gray-700">&larr;</span>
      </IconButton>
    </div>
  );
};

export default Sidebar;
