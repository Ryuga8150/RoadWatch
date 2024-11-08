import React, { useEffect, useState } from "react";

// Define the sensor reading interface
interface SensorReading {
  angle: number;
  distance: number; // Distance received from the sensor
}

// Define the grid dimensions
const dimension = 31;

type ColorRanges = {
  green: string[];
  amber: string[];
  red: string[];
};

const colorRanges: ColorRanges = {
  green: ["#8dba98", "#76ac83", "#5f9e6f", "#48905a", "#318246", "#1a7431"],
  amber: ["#ffdb81", "#ffd468", "#ffcd4f", "#ffc535", "#ffbe1c", "#ffb703"],
  red: ["#e88080", "#e36666", "#de4d4d", "#d93333", "#d51a1a", "#d00000"],
};

const stdDistance = 45;

// Assign color based on absolute distance (0-18)
function getColorForDistance(distance: number): string {
  const absDistance = distance - stdDistance;
  console.log(absDistance);
  if (absDistance < 0) return "#1a7431";
  else if (absDistance >= 0 && absDistance <= 6) {
    // Green range (0-6)
    return colorRanges.green[
      Math.floor((absDistance / 6) * (colorRanges.green.length - 1))
    ];
  } else if (absDistance >= 7 && absDistance <= 12) {
    // Amber range (7-12)
    return colorRanges.amber[
      Math.floor(((absDistance - 7) / 6) * (colorRanges.amber.length - 1))
    ];
  } else if (absDistance >= 13 && absDistance <= 18) {
    // Red range (13-18)
    return colorRanges.red[
      Math.floor(((absDistance - 13) / 6) * (colorRanges.red.length - 1))
    ];
  }

  // Default if out of range (shouldn't happen with valid input)
  return "#d00000";
}

const Heatmap: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorReading[]>([]);

  // Load the sensor data from the JSON file on mount
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch("/road_data.json"); // Fetch data from public folder
        const data: SensorReading[] = await response.json();
        // Take the first `dimension * dimension` (900) readings
        const filteredData = data.slice(0, dimension * dimension);

        setSensorData(filteredData); // Set the filtered sensor data to state
      } catch (error) {
        console.error("Error loading sensor data:", error);
      }
    };

    fetchSensorData();
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg px-8">
      <h2 className="mb-4 self-start text-2xl font-semibold leading-[normal] text-black [font-family:Roboto]">
        Heatmap
      </h2>
      <div
        className="grid gap-x-0 gap-y-0"
        style={{
          gridTemplateColumns: `repeat(${dimension}, 1fr)`,
          gridTemplateRows: `repeat(${dimension}, 1fr)`,
        }}
      >
        {sensorData.map((segment, index) => (
          <div
            key={index}
            className="flex items-center justify-center font-bold text-white"
            style={{
              backgroundColor: getColorForDistance(Math.abs(segment.distance)),
              height: "15px", // Set a fixed height for square cells
              width: "15px", // Set a fixed width for square cells
            }}
          >
            {/* Uncomment to see the exact distance value in each cell */}
            {/* {segment.distance.toFixed(2)} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
