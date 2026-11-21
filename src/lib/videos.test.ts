import { describe, expect, it } from "vitest";
import { searchVideos, upNext, getVideo } from "./videos";
import { formatDuration } from "./format";

describe("videos", () => {
  it("search matches channel names, not just titles", () => {
    const ids = searchVideos("open movie night").map((v) => v.id);
    expect(ids).toContain("sintel-teaser");
    expect(ids).toContain("big-buck-bunny-meadow");
  });

  it("empty search returns nothing", () => {
    expect(searchVideos("   ")).toHaveLength(0);
  });

  it("up next puts same-channel videos first and excludes the current one", () => {
    const current = getVideo("sintel-teaser")!;
    const next = upNext(current);
    expect(next[0]?.id).toBe("big-buck-bunny-meadow");
    expect(next.some((v) => v.id === current.id)).toBe(false);
  });

  it("formats durations like a video player", () => {
    expect(formatDuration(33)).toBe("0:33");
    expect(formatDuration(3725)).toBe("1:02:05");
  });
});
