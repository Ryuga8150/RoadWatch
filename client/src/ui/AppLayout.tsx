import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "@/providers/userProvider"; // Make sure this is imported correctly
import { toast } from "sonner";

type Props = {};

const AppLayout = (props: Props) => {
  // const { user } = useUser(); // Get user from global state
  // const [isLoading, setIsLoading] = useState(true); // Loading state to prevent flickering
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Simulating user authentication check delay (can remove if using actual API calls)
  //   const checkUserStatus = () => {
  //     if (!user?.id) {
  //       toast.error("You must be logged in to view this page.");
  //       navigate("/login");
  //     } else {
  //       setIsLoading(false); // User is authenticated, stop loading
  //     }
  //   };

  //   checkUserStatus();
  // }, [user, navigate]);

  // if (isLoading) {
  //   // Return null or a loading spinner until user authentication state is checked
  //   return <div>Loading...</div>; // You can replace this with a spinner or nothing at all
  // }

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
