import React, { useState, useEffect } from "react";
import {
  ComplaintIcon,
  DashboardIcon,
  DataIcon,
  SensorStatusIcon,
  UploadIcon,
} from "../utils/icons";
import IconButton from "./IconButton";
import Logo from "./Logo";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/providers/userProvider";

type Props = {};

const Sidebar = (props: Props) => {
  const [active, setActive] = useState<string>("dashboard");
  const { setUser } = useUser(); // Access the setUser function from UserContext
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current URL path

  // Define menu items
  const menuItems = [
    {
      title: "dashboard",
      to: "/dashboard",
      icon: DashboardIcon,
      color: "#919298",
    },
    {
      title: "data",
      to: "/sensor-data",
      icon: DataIcon,
      color: "black",
    },
    {
      title: "road status",
      to: "/road-status",
      icon: SensorStatusIcon,
      color: "black",
    },
    {
      title: "complaint",
      to: "/complaint",
      icon: ComplaintIcon,
      color: "black",
    },
    {
      title: "upload",
      to: "/upload",
      icon: UploadIcon,
      color: "#5d5d62",
    },
  ];

  // Effect to sync active state with the URL
  useEffect(() => {
    // Match the current path with the menu item
    const activeItem = menuItems.find((item) => location.pathname === item.to);
    if (activeItem) {
      setActive(activeItem.title); // Set the active item based on the URL
    }
  }, [location.pathname]); // Re-run effect on pathname change

  // Handle logout
  const handleLogout = async () => {
    try {
      const res = await fetch(`${url}/api/auth/signout`);
      const data = await res.json();

      if (data.status !== "success") {
        toast.error("Error While Logging Out");
        return;
      }

      // Clear the user data from localStorage
      localStorage.removeItem("roadWatchUser");

      // Reset user state in global context
      setUser(null);

      // Optionally, show a success toast after logout
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Cannot Logout");
    }
  };

  return (
    <div className="row-span-full flex h-full w-full flex-col items-center gap-8 border-r-[1px] border-r-black/30 p-5">
      <Logo />
      <div className="align-items-center flex flex-grow flex-col gap-7 p-6">
        {menuItems.map((item, ind) => {
          const Icon = item.icon;
          return (
            <div
              key={ind}
              onClick={() => setActive(item.title)}
              className="w-full"
            >
              <IconButton
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

      <div onClick={handleLogout}>
        <IconButton text="Logout">
          <span className="text-xl text-gray-700">&larr;</span>
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
