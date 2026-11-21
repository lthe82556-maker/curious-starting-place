import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ChannelAvatar } from "@/components/vidora/ChannelAvatar";
import { VideoCard } from "@/components/vidora/VideoCard";
import { compactNumber } from "@/lib/format";
import { getChannel, videosByChannel } from "@/lib/videos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/channel/$channelId")({
  loader: ({ params }) => {
    const channel = getChannel(params.channelId);
    if (!channel) throw notFound();
    return { channel };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.channel.name} — Vidora` : "Channel — Vidora";
    const description = loaderData?.channel.about ?? "A channel on Vidora.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-bold">This channel doesn't exist</h1>
      <Link to="/" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
        Browse videos
      </Link>
    </div>
  ),
  component: ChannelPage,
});

function ChannelPage() {
  const { channel } = Route.useLoaderData();
  const list = videosByChannel(channel.id);
  const [sort, setSort] = useState<"latest" | "popular">("latest");
  const [subscribed, setSubscribed] = useState(false);
  const sorted = list
    .slice()
    .sort((a, b) => (sort === "latest" ? b.uploadedAt.localeCompare(a.uploadedAt) : b.views - a.views));
  const banner = list[0]?.thumbnail;

  return (
    <div className="mx-auto max-w-[1500px] px-4 pb-12 sm:px-6">
      <div className="relative mt-4 h-32 overflow-hidden rounded-2xl bg-ember sm:h-52">
        {banner && <img src={banner} alt="" className="h-full w-full object-cover opacity-70" />}
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <ChannelAvatar channel={channel} className="size-20 text-2xl sm:size-28 sm:text-3xl" />
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{channel.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {channel.handle} · {compactNumber(channel.subscribers + (subscribed ? 1 : 0))} subscribers ·{" "}
            {list.length} {list.length === 1 ? "video" : "videos"}
          </p>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{channel.about}</p>
        </div>
        <button
          onClick={() => {
            setSubscribed((s) => !s);
            toast(subscribed ? `Unsubscribed from ${channel.name}` : `Subscribed to ${channel.name}`);
          }}
          className={cn(
            "self-start rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:self-center",
            subscribed ? "bg-secondary hover:bg-accent" : "bg-foreground text-background hover:opacity-90",
          )}
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      <div className="mt-8 flex items-center gap-2 border-b pb-3">
        <h2 className="mr-4 text-lg font-bold">Videos</h2>
        {(["latest", "popular"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium capitalize",
              sort === s ? "bg-foreground text-background" : "bg-secondary hover:bg-accent",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {sorted.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}
