export const splitTimestamp = (
  timestamp: string,
): { date: string; time: string } => {
  const dateTimeParts = timestamp.split("T"); // Split into date and time parts
  const date = dateTimeParts[0]; // The date part is before 'T'
  const time = dateTimeParts[1]?.split(".")[0] || ""; // The time part is after 'T', excluding milliseconds

  return { date, time };
};
