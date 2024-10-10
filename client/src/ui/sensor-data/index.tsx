import { SensorStatusType, columns } from "./columns";
import { DataTable } from "./data-table";

const generateRandomInsightsData = (count: number): SensorDataType[] => {
  const severeLevels: ("high" | "low" | "medium")[] = ["high", "medium", "low"];
  const types: ("crack" | "pothole")[] = ["crack", "pothole"];
  const data: SensorDataType[] = [];

  for (let i = 1; i <= count; i++) {
    const segmentId = String(i).padStart(4, "0"); // Pad with zeros to create segmentId
    const timestamp = new Date().toISOString(); // Generate a timestamp
    const avgElevation = parseFloat((Math.random() * 40).toFixed(2)); // Random avgElevation between 0 and 40
    const varElevation = parseFloat((Math.random() * 0.01).toFixed(3)); // Random varElevation between 0 and 0.01
    const locationId = `loc${String(i).padStart(3, "0")}`; // Create locationId with leading zeros
    const severityLevel =
      severeLevels[Math.floor(Math.random() * severeLevels.length)];
    const type = types[Math.floor(Math.random() * types.length)];

    data.push({
      timestamp,
      segmentId,
      avgElevation,
      varElevation,
      locationId,
      severityLevel,
      type,
    });
  }

  return data;
};

export default function SensorData() {
  const data = generateRandomInsightsData(20);
  return (
    <div className="container mx-auto h-full">
      <div className="flex h-full w-full flex-col gap-4 rounded-xl p-8 [background:#FFF]">
        <h2 className="text-2xl font-semibold uppercase leading-[normal] text-black [font-family:Roboto]">
          Data Insights
        </h2>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
