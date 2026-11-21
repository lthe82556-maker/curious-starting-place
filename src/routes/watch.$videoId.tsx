import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Bell, BellRing, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ChannelAvatar } from "@/components/vidora/ChannelAvatar";
import { VideoRow } from "@/components/vidora/VideoCard";
import { Switch } from "@/components/ui/switch";
import { compactNumber, timeAgo } from "@/lib/format";
import { getChannel, getVideo, upNext, type Video } from "@/lib/videos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/watch/$videoId")({
  loader: ({ params }) => {
    const video = getVideo(params.videoId);
    if (!video) throw notFound();
    return { video };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.video.title} — Vidora` : "Video — Vidora";
    const description = loaderData?.video.description.split("\n")[0] ?? "Watch this video on Vidora.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "video.other" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-bold">This video isn't available</h1>
      <Link to="/" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
        Browse videos
      </Link>
    </div>
  ),
  component: WatchPage,
});

function WatchPage() {
  const { video } = Route.useLoaderData();
  return <Watch key={video.id} video={video} />;
}

const sampleComments = [
  { name: "Mara Okafor", text: "I've watched this on loop about ten times now. So calming.", likes: 412, ago: "2 days ago" },
  { name: "Leo Brandt", text: "The colors in this are unreal. What camera settings did you use?", likes: 128, ago: "5 days ago" },
  { name: "Priya S.", text: "Came here to relax after a long shift. Exactly what I needed.", likes: 87, ago: "1 week ago" },
];

function Watch({ video }: { video: Video }) {
  const channel = getChannel(video.channelId);
  const next = upNext(video);
  const navigate = useNavigate();
  const [autoplay, setAutoplay] = useState(true);
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(sampleComments);
  const [draft, setDraft] = useState("");

  const likes = video.likes + (reaction === "like" ? 1 : 0);

  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-6 px-0 py-0 sm:px-6 sm:py-6 xl:flex-row">
      <div className="min-w-0 flex-1">
        <div className="aspect-video w-full overflow-hidden bg-overlay sm:rounded-2xl">
          <video
            src={video.src}
            poster={video.thumbnail}
            controls
            autoPlay
            playsInline
            className="h-full w-full"
            onEnded={() => {
              const first = next[0];
              if (autoplay && first) navigate({ to: "/watch/$videoId", params: { videoId: first.id } });
            }}
          />
        </div>

        <div className="px-4 sm:px-0">
          <h1 className="mt-4 text-xl font-bold sm:text-2xl">{video.title}</h1>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            {channel && (
              <div className="flex items-center gap-3">
                <Link to="/channel/$channelId" params={{ channelId: channel.id }}>
                  <ChannelAvatar channel={channel} className="size-10" />
                </Link>
                <div>
                  <Link
                    to="/channel/$channelId"
                    params={{ channelId: channel.id }}
                    className="font-semibold leading-tight"
                  >
                    {channel.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {compactNumber(channel.subscribers + (subscribed ? 1 : 0))} subscribers
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubscribed((s) => !s);
                    toast(subscribed ? `Unsubscribed from ${channel.name}` : `Subscribed to ${channel.name}`);
                  }}
                  className={cn(
                    "ml-2 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    subscribed
                      ? "bg-secondary text-secondary-foreground hover:bg-accent"
                      : "bg-foreground text-background hover:opacity-90",
                  )}
                >
                  {subscribed ? <BellRing className="size-4" /> : <Bell className="size-4" />}
                  {subscribed ? "Subscribed" : "Subscribe"}
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="flex items-center overflow-hidden rounded-full bg-secondary">
                <button
                  aria-pressed={reaction === "like"}
                  onClick={() => setReaction((r) => (r === "like" ? null : "like"))}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:bg-accent"
                >
                  <ThumbsUp className={cn("size-4", reaction === "like" && "fill-current text-primary")} />
                  {compactNumber(likes)}
                </button>
                <span className="h-6 w-px bg-border" />
                <button
                  aria-label="Dislike"
                  aria-pressed={reaction === "dislike"}
                  onClick={() => setReaction((r) => (r === "dislike" ? null : "dislike"))}
                  className="px-4 py-2 hover:bg-accent"
                >
                  <ThumbsDown className={cn("size-4", reaction === "dislike" && "fill-current")} />
                </button>
              </div>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied");
                  } catch {
                    toast.error("Couldn't copy the link");
                  }
                }}
                className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold hover:bg-accent"
              >
                <Share2 className="size-4" /> Share
              </button>
            </div>
          </div>

          <button
            onClick={() => setExpanded((e) => !e)}
            className="mt-4 w-full rounded-xl bg-secondary p-3 text-left text-sm transition-colors hover:bg-accent"
          >
            <p className="font-semibold">
              {video.views.toLocaleString("en-US")} views · {timeAgo(video.uploadedAt)} ·{" "}
              <span className="text-primary">#{video.category.replace(/\s+/g, "")}</span>
            </p>
            <p className={cn("mt-1 whitespace-pre-line", !expanded && "line-clamp-2")}>{video.description}</p>
            <span className="mt-1 inline-block font-semibold">{expanded ? "Show less" : "...more"}</span>
          </button>

          <section className="mt-6">
            <h2 className="text-lg font-bold">{comments.length} Comments</h2>
            <form
              className="mt-4 flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const text = draft.trim();
                if (!text) return;
                setComments((c) => [{ name: "You", text, likes: 0, ago: "just now" }, ...c]);
                setDraft("");
              }}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold">
                Y
              </span>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add a comment..."
                aria-label="Add a comment"
                className="flex-1 border-b border-input bg-transparent pb-1 text-sm outline-none focus:border-foreground"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
              >
                Comment
              </button>
            </form>
            <ul className="mt-6 flex flex-col gap-5">
              {comments.map((c, i) => (
                <li key={`${c.name}-${i}`} className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold">
                    {c.name[0]}
                  </span>
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">{c.name}</span>{" "}
                      <span className="text-xs text-muted-foreground">{c.ago}</span>
                    </p>
                    <p className="mt-0.5 text-sm">{c.text}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <ThumbsUp className="size-3.5" /> {c.likes}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <aside className="w-full shrink-0 px-4 pb-10 sm:px-0 xl:w-[400px]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold">Up next</h2>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Autoplay
            <Switch checked={autoplay} onCheckedChange={setAutoplay} />
          </label>
        </div>
        <div className="flex flex-col gap-3">
          {next.map((v) => (
            <VideoRow key={v.id} video={v} size="sm" />
          ))}
        </div>
      </aside>
    </div>
  );
}
