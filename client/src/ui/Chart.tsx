import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LidarChart = () => {
  const baseValue = 500; // A stable base value
  const initialDataPoints = Array.from(
    { length: 7 },
    () => baseValue + faker.number.int({ min: -5, max: 5 }),
  );

  const [dataPoints, setDataPoints] = useState<number[]>(initialDataPoints); // Initialize with realistic data
  const [labels, setLabels] = useState<string[]>([]); // State to hold timestamps
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const updateLabels = () => {
      const now = new Date();
      const newLabels = Array.from({ length: 7 }, (_, index) => {
        const timestamp = new Date(now.getTime() + index * 1000); // Increment by seconds
        const hours = timestamp.getHours().toString().padStart(2, "0"); // Ensure 2 digits
        const minutes = timestamp.getMinutes().toString().padStart(2, "0"); // Ensure 2 digits
        const seconds = timestamp.getSeconds().toString().padStart(2, "0"); // Ensure 2 digits
        return `${hours}:${minutes}\n${seconds}`; // Split on two lines
      });
      setLabels(newLabels);
    };

    updateLabels(); // Initialize labels

    const interval = setInterval(() => {
      // Simulate Lidar data with minor fluctuations around a base value
      setDataPoints((prevData) => {
        return prevData.map(() => {
          const newValue = baseValue + faker.number.int({ min: -5, max: 5 });
          return Math.max(-1000, Math.min(1000, newValue)); // Keep values within the bounds
        });
      });

      updateLabels(); // Update labels every second

      // Check if the data is ready to remove the loading message
      if (dataPoints.length > 0) {
        setIsLoading(false);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Lidar Sensor Data",
        data: dataPoints, // Directly use the data points
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true, // Optional: Fill under the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    // scales: {
    //   x: {
    //     ticks: {
    //       callback: (value: number, index: number) => {
    //         return labels[index]; // Return the timestamp directly from state
    //       },
    //     },
    //     title: {
    //       display: true,
    //       text: "Time",
    //     },
    //   },
    //   y: {
    //     beginAtZero: false, // Do not start at zero
    //     min: baseValue - 50, // Set a minimum value slightly below the base
    //     max: baseValue + 50, // Set a maximum value slightly above the base
    //   },
    // },
  };

  return (
    <div className="h-full w-full">
      <h2 className="mb-4 text-2xl font-semibold leading-[normal] text-black [font-family:Roboto]">
        Realtime Data
      </h2>
      {isLoading ? (
        <div className="flex h-full items-center justify-center text-center text-xl text-gray-500">
          <div className="mb-12 animate-pulse font-semibold">
            Loading chart data...
          </div>
        </div>
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
};

export default LidarChart;
