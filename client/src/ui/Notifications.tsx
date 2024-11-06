import { useEffect, useState } from "react";
import { BellIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/providers/userProvider";

// Type definition for notification
type Notification = {
  _id: string;
  userId: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

const Notifications = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser(); // Assuming user context provides user data
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications when user is available
  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      setError(null);

      fetch(`${url}/api/notification/notifications/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setNotifications(data.data.notifications);
          } else {
            setError("Failed to load notifications");
          }
        })
        .catch(() => setError("Failed to load notifications"))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleMarkAsRead = (notificationId: string) => {
    // Mark the notification as read by updating the backend
    fetch(`${url}/api/notification/notifications/${notificationId}/read`, {
      method: "PATCH",
    }).then(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif,
        ),
      );
    });
  };

  const unreadNotifications = notifications.filter((notif) => !notif.isRead);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <BellIcon className="h-7 w-7" color="#59595c" />
          {unreadNotifications.length > 0 && (
            <span className="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-red-500"></span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        {/* Notifications */}
        {loading ? (
          <DropdownMenuItem>Loading...</DropdownMenuItem>
        ) : error ? (
          <DropdownMenuItem>{error}</DropdownMenuItem>
        ) : notifications.length === 0 ? (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification._id}
              onClick={() => handleMarkAsRead(notification._id)} // Mark as read when clicked
              className={`${
                notification.isRead ? "text-gray-500" : "font-semibold"
              }`}
            >
              <div className="flex flex-col">
                <span>{notification.message}</span>
                <span className="text-xs text-gray-500">
                  {/* {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })} */}
                </span>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
