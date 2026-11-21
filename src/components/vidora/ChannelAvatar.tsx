import { cn } from "@/lib/utils";
import type { Channel } from "@/lib/videos";

const toneClass: Record<Channel["tone"], string> = {
  1: "bg-chart-1",
  2: "bg-chart-2",
  3: "bg-chart-3",
  4: "bg-chart-4",
  5: "bg-chart-5",
};

export function ChannelAvatar({ channel, className }: { channel: Channel; className?: string }) {
  const initials = channel.name
    .split(/\s+/)
    .filter((w) => /[a-z]/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-primary-foreground",
        toneClass[channel.tone],
        className,
      )}
    >
      {initials}
    </span>
  );
}
