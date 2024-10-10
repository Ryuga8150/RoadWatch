export type SensorDataType = {
  timestamp: string;
  segmentId: string;
  avgElevation: number;
  varElevation: number;
  locationId: string;
  severeLevel: "high" | "low" | "medium";
  type: "crack" | "pothole";
};
