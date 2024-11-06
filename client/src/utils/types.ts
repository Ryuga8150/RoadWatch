export type SensorDataType = {
  timestamp: string;
  segmentId: string;
  avgElevation: number;
  varElevation: number;
  locationId: string;
  severeLevel: "high" | "low" | "medium";
  type: "crack" | "pothole";
};

// context/UserContext.tsx
export interface User {
  id: string; // _id from the database
  username: string;
  email: string;
  password: string; // Hashed password (kept as string)
  avatar?: string; // Optional avatar
  createdAt: string;
  updatedAt: string;
}
