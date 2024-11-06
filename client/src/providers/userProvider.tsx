// context/UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // You might not need to expose this in the client
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);

  // Effect to load user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("roadWatchUser");
    if (storedUser) {
      setUserState(JSON.parse(storedUser)); // Parse and set the user data
    }
  }, []);

  // Set the user and persist it to localStorage
  const handleSetUser = (user: User | null) => {
    if (user) {
      localStorage.setItem("roadWatchUser", JSON.stringify(user)); // Persist user data
    } else {
      localStorage.removeItem("roadWatchUser"); // Clear user data on logout
    }
    setUserState(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
