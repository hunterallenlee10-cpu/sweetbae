/**
 * Kitchen hours, verbatim from the live site. Times are America/New_York.
 * open/close are minutes after midnight; null means CLOSED.
 */
export type DayHours = {
  day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  short: string;
  /** schema.org day */
  schema: string;
  label: string;
  open: number | null;
  close: number | null;
};

export const timeZone = "America/New_York";

/** Index 0 = Sunday, matching Date.getDay(). */
export const hours: DayHours[] = [
  { day: "Sunday", short: "Sun", schema: "https://schema.org/Sunday", label: "11:30 AM – 8 PM", open: 690, close: 1200 },
  { day: "Monday", short: "Mon", schema: "https://schema.org/Monday", label: "CLOSED", open: null, close: null },
  { day: "Tuesday", short: "Tue", schema: "https://schema.org/Tuesday", label: "11:30 AM – 8:30 PM", open: 690, close: 1230 },
  { day: "Wednesday", short: "Wed", schema: "https://schema.org/Wednesday", label: "11:30 AM – 8:30 PM", open: 690, close: 1230 },
  { day: "Thursday", short: "Thu", schema: "https://schema.org/Thursday", label: "11:30 AM – 8:30 PM", open: 690, close: 1230 },
  { day: "Friday", short: "Fri", schema: "https://schema.org/Friday", label: "11:30 AM – 9 PM", open: 690, close: 1260 },
  { day: "Saturday", short: "Sat", schema: "https://schema.org/Saturday", label: "11:30 AM – 9 PM", open: 690, close: 1260 },
];

export const hoursTitle = "Kitchen Hours";
