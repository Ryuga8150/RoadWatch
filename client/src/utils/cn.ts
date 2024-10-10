import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProgressBarColor = (progress: number) => {
  if (progress >= 75) {
    return "#52C752"; // Green for healthy
  } else if (progress >= 50) {
    return "#FFBA08"; // Yellow for warning
  } else {
    return "#E01E37"; // Red for critical
  }
};
