import { Link } from "@tanstack/react-router";
import { ChannelAvatar } from "./ChannelAvatar";
import { formatDuration, formatViews, timeAgo } from "@/lib/format";
import { getChannel, type Video } from "@/lib/videos";
import { cn } from "@/lib/utils";

function Thumb({ video, className }: { video: Video; className?: string }) {
  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-xl bg-muted", className)}>
      <img
        src={video.thumbnail}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute right-1.5 bottom-1.5 rounded-md bg-overlay px-1.5 py-0.5 text-xs font-semibold text-overlay-foreground tabular-nums">
        {formatDuration(video.durationSec)}
      </span>
    </div>
  );
}

export function VideoCard({ video }: { video: Video }) {
  const channel = getChannel(video.channelId);
  return (
    <article className="group">
      <Link to="/watch/$videoId" params={{ videoId: video.id }} className="block">
        <Thumb video={video} />
      </Link>
      <div className="mt-3 flex gap-3">
        {channel && (
          <Link to="/channel/$channelId" params={{ channelId: channel.id }} aria-label={channel.name}>
            <ChannelAvatar channel={channel} />
          </Link>
        )}
        <div className="min-w-0">
          <Link
            to="/watch/$videoId"
            params={{ videoId: video.id }}
            className="line-clamp-2 font-semibold leading-snug text-foreground"
          >
            {video.title}
          </Link>
          {channel && (
            <Link
              to="/channel/$channelId"
              params={{ channelId: channel.id }}
              className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
            >
              {channel.name}
            </Link>
          )}
          <p className="text-sm text-muted-foreground">
            {formatViews(video.views)} · {timeAgo(video.uploadedAt)}
          </p>
        </div>
      </div>
    </article>
  );
}

/** Horizontal layout used in search results and the "Up next" rail. */
export function VideoRow({ video, size = "md" }: { video: Video; size?: "sm" | "md" }) {
  const channel = getChannel(video.channelId);
  return (
    <Link
      to="/watch/$videoId"
      params={{ videoId: video.id }}
      className={cn("group flex gap-3", size === "md" ? "flex-col sm:flex-row sm:gap-4" : "")}
    >
      <Thumb
        video={video}
        className={cn("shrink-0", size === "sm" ? "w-40" : "w-full sm:w-80")}
      />
      <div className="min-w-0 py-0.5">
        <h3
          className={cn(
            "line-clamp-2 font-sans font-semibold leading-snug tracking-normal text-foreground",
            size === "sm" ? "text-sm" : "text-lg",
          )}
        >
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          {formatViews(video.views)} · {timeAgo(video.uploadedAt)}
        </p>
        {channel && (
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
            {size === "md" && <ChannelAvatar channel={channel} className="size-6 text-[10px]" />}
            {channel.name}
          </div>
        )}
        {size === "md" && (
          <p className="mt-2 line-clamp-2 hidden text-sm text-muted-foreground sm:block">
            {video.description}
          </p>
        )}
      </div>
    </Link>
  );
}
