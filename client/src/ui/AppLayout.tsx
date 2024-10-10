import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

type Props = {};

const AppLayout = (props: Props) => {
  return (
    <div className="mx-auto grid h-screen max-w-[1440px] grid-cols-[266px,1fr] grid-rows-[auto,1fr] bg-[#f9f9f9]">
      <Sidebar />
      <Header />
      <main className="overflow-y-scroll p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
