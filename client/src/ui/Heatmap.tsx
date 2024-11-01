// Heatmap.tsx
import React from "react";

interface RoadSegment {
  id: number;
  quality: number; // Assume 0-100
}

// Generate sample data for a 16x16 grid
const dimension = 30;
const sampleData: RoadSegment[] = Array.from(
  { length: dimension * dimension },
  (_, i) => ({
    id: i + 1,
    quality: Math.floor(Math.random() * 101), // Random quality from 0 to 100
  }),
);

const getColor = (quality: number) => {
  const red = Math.min(255, Math.floor((100 - quality) * 2.55));
  const green = Math.min(255, Math.floor(quality * 2.55));
  return `rgb(${red}, ${green}, 0)`;
};

const Heatmap: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg px-8">
      <h2 className="mb-4 self-start text-2xl font-semibold leading-[normal] text-black [font-family:Roboto]">
        Heatmap
      </h2>
      <div
        className={`grid gap-x-0 gap-y-0`}
        style={{
          gridTemplateColumns: `repeat(${dimension}, 1fr)`,
          gridTemplateRows: `repeat(${dimension}, 1fr)`,
        }}
      >
        {sampleData.map((segment) => (
          <div
            key={segment.id}
            className="flex items-center justify-center font-bold text-white"
            style={{
              backgroundColor: getColor(segment.quality),
              height: "15px", // Set a fixed height for square cells
              width: "15px", // Set a fixed width for square cells
            }}
          >
            {/* {segment.quality} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
