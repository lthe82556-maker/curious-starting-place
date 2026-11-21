import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { VideoCard } from "@/components/vidora/VideoCard";
import { categories, videos } from "@/lib/videos";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ category: z.string().optional() });

export const Route = createFileRoute("/")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Vidora — Watch nature, tech and animation videos" },
      {
        name: "description",
        content: "Browse the latest videos on Vidora: ocean drone flights, sunsets, tech reactions and animated shorts.",
      },
      { property: "og:title", content: "Vidora — Watch nature, tech and animation videos" },
      {
        property: "og:description",
        content: "Browse the latest videos on Vidora: ocean drone flights, sunsets, tech reactions and animated shorts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { category = "All" } = Route.useSearch();
  const list = (category === "All" ? videos : videos.filter((v) => v.category === category))
    .slice()
    .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));

  return (
    <div className="px-4 pb-12 sm:px-6">
      <div className="scrollbar-none sticky top-16 z-30 -mx-4 flex gap-2 overflow-x-auto bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        {categories.map((c) => (
          <Link
            key={c}
            to="/"
            search={c === "All" ? {} : { category: c }}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              c === category
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground hover:bg-accent",
            )}
          >
            {c}
          </Link>
        ))}
      </div>
      <h1 className="sr-only">Recommended videos</h1>
      <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {list.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}
