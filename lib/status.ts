import { hours, timeZone } from "@/content/hours";

export type Status = { open: boolean; text: string; todayIndex: number };

function fmt(mins: number) {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  const ap = h24 >= 12 ? "PM" : "AM";
  return m === 0 ? `${h} ${ap}` : `${h}:${String(m).padStart(2, "0")} ${ap}`;
}

/** Current weekday (0=Sun) and minutes after midnight in America/New_York. */
export function nowInNewYork(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const mins = Number(get("hour")) * 60 + Number(get("minute"));
  return { day, mins };
}

function nextOpening(fromDay: number) {
  for (let i = 1; i <= 7; i++) {
    const d = (fromDay + i) % 7;
    const h = hours[d];
    if (h.open !== null) return { day: d, label: i === 1 ? "tomorrow" : h.short, open: h.open };
  }
  return null;
}

export function getStatus(date = new Date()): Status {
  const { day, mins } = nowInNewYork(date);
  const today = hours[day];
  if (today.open === null || today.close === null) {
    const n = nextOpening(day);
    return { open: false, todayIndex: day, text: n ? `Closed today · Opens ${cap(n.label)} ${fmt(n.open)}` : "Closed today" };
  }
  if (mins < today.open) return { open: false, todayIndex: day, text: `Opens at ${fmt(today.open)}` };
  if (mins < today.close) return { open: true, todayIndex: day, text: `Open now · Kitchen until ${fmt(today.close)}` };
  const n = nextOpening(day);
  return { open: false, todayIndex: day, text: n ? `Closed now · Opens ${cap(n.label)} ${fmt(n.open)}` : "Closed now" };
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
