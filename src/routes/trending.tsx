import { createFileRoute } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { VideoRow } from "@/components/vidora/VideoCard";
import { videos } from "@/lib/videos";

export const Route = createFileRoute("/trending")({
  head: () => ({
    meta: [
      { title: "Trending on Vidora" },
      { name: "description", content: "The most-watched videos on Vidora right now." },
      { property: "og:title", content: "Trending on Vidora" },
      { property: "og:description", content: "The most-watched videos on Vidora right now." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Trending,
});

function Trending() {
  const list = videos.slice().sort((a, b) => b.views - a.views);
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-ember">
          <Flame className="size-6 text-primary-foreground" />
        </span>
        <h1 className="text-3xl font-bold">Trending</h1>
      </div>
      <ol className="flex flex-col gap-5">
        {list.map((v, i) => (
          <li key={v.id} className="flex items-start gap-3 sm:gap-4">
            <span className="w-6 pt-1 text-right font-display text-lg font-bold text-muted-foreground tabular-nums">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <VideoRow video={v} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
