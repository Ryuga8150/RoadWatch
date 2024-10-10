import { SensorStatusType, columns } from "./columns";
import { DataTable } from "./data-table";

function generateRandomSensorData(numSensors = 20): SensorStatusType[] {
  const locations = [
    "location-1",
    "location-2",
    "location-3",
    "location-4",
    "location-5",
    "location-6",
    "location-7",
    "location-8",
    "location-9",
    "location-10",
  ];

  const statuses = ["active", "inactive"];

  const sensors: SensorStatusType[] = [];
  for (let i = 1; i <= numSensors; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const progress = Math.floor(Math.random() * 101); // Progress between 0 and 100
    const status = statuses[Math.floor(Math.random() * statuses.length)] as
      | "active"
      | "inactive";

    sensors.push({
      id: `SENSOR-${String(i).padStart(3, "0")}`,
      location,
      progress,
      status,
    });
  }

  return sensors;
}

export default function SensorStatus() {
  const data = generateRandomSensorData(20);
  return (
    <div className="container mx-auto h-full">
      <div className="flex h-full w-full flex-col gap-4 rounded-xl p-8 [background:#FFF]">
        <h2 className="text-2xl font-semibold uppercase leading-[normal] text-black [font-family:Roboto]">
          Sensor Status
        </h2>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
