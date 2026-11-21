import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { z } from "zod";
import { VideoRow } from "@/components/vidora/VideoCard";
import { searchVideos } from "@/lib/videos";

export const Route = createFileRoute("/search")({
  validateSearch: (s) => z.object({ q: z.string().catch("") }).parse(s),
  head: () => ({
    meta: [
      { title: "Search — Vidora" },
      { name: "description", content: "Search Vidora for videos and channels." },
      { property: "og:title", content: "Search — Vidora" },
      { property: "og:description", content: "Search Vidora for videos and channels." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = searchVideos(q);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <h1 className="mb-6 text-xl font-semibold">
        {results.length} {results.length === 1 ? "result" : "results"} for “{q}”
      </h1>
      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <SearchX className="size-12 text-muted-foreground" />
          <p className="text-muted-foreground">No videos match that search. Try “ocean” or “animation”.</p>
          <Link to="/" className="rounded-full bg-secondary px-4 py-2 text-sm font-medium hover:bg-accent">
            Back to home
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {results.map((v) => (
            <VideoRow key={v.id} video={v} />
          ))}
        </div>
      )}
    </div>
  );
}
