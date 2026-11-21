import { formatDistanceStrict } from "date-fns";

export function compactNumber(n: number) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function formatViews(n: number) {
  return `${compactNumber(n)} views`;
}

export function formatDuration(totalSec: number) {
  const s = Math.round(totalSec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

export function timeAgo(iso: string, now: Date = new Date()) {
  return `${formatDistanceStrict(new Date(iso), now)} ago`;
}
