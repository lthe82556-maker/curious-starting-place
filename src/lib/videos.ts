import t1 from "@/assets/thumbs/thumb1.jpg.asset.json";
import t2 from "@/assets/thumbs/thumb2.jpg.asset.json";
import t3 from "@/assets/thumbs/thumb3.jpg.asset.json";
import t4 from "@/assets/thumbs/thumb4.jpg.asset.json";
import t5 from "@/assets/thumbs/thumb5.jpg.asset.json";
import t6 from "@/assets/thumbs/thumb6.jpg.asset.json";
import t7 from "@/assets/thumbs/thumb7.jpg.asset.json";
import t8 from "@/assets/thumbs/thumb8.jpg.asset.json";
import t9 from "@/assets/thumbs/thumb9.jpg.asset.json";
import t10 from "@/assets/thumbs/thumb10.jpg.asset.json";
import t11 from "@/assets/thumbs/thumb11.jpg.asset.json";

export type Channel = {
  id: string;
  name: string;
  handle: string;
  subscribers: number;
  about: string;
  /** 1-5, maps to the --chart-N color tokens */
  tone: 1 | 2 | 3 | 4 | 5;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  channelId: string;
  category: string;
  views: number;
  likes: number;
  uploadedAt: string;
  durationSec: number;
  src: string;
  thumbnail: string;
};

export const channels: Channel[] = [
  {
    id: "blue-horizon",
    name: "Blue Horizon",
    handle: "@bluehorizon",
    subscribers: 1_240_000,
    about: "Drone footage of coastlines, reefs and open water from around the world.",
    tone: 2,
  },
  {
    id: "golden-hour",
    name: "Golden Hour Club",
    handle: "@goldenhourclub",
    subscribers: 486_000,
    about: "Slow, quiet landscapes filmed in the first and last light of the day.",
    tone: 4,
  },
  {
    id: "future-lab",
    name: "Future Lab",
    handle: "@futurelab",
    subscribers: 2_310_000,
    about: "Hands-on looks at the gadgets and ideas shaping tomorrow.",
    tone: 1,
  },
  {
    id: "petal-stem",
    name: "Petal & Stem",
    handle: "@petalandstem",
    subscribers: 92_400,
    about: "Macro nature films: flowers, insects and tiny worlds up close.",
    tone: 5,
  },
  {
    id: "open-movie-night",
    name: "Open Movie Night",
    handle: "@openmovienight",
    subscribers: 3_870_000,
    about: "Clips and trailers from open animated films made by independent studios.",
    tone: 3,
  },
  {
    id: "archive-reels",
    name: "Archive Reels",
    handle: "@archivereels",
    subscribers: 158_000,
    about: "Restored public-domain film from the golden age of cinema.",
    tone: 4,
  },
];

export const videos: Video[] = [
  {
    id: "aerial-coast-waves",
    title: "Waves Crashing on a Wild Coast — 4K Drone Flight",
    description:
      "We flew straight over a rocky stretch of coastline at high tide. Turn the sound up, sit back and let the water do the talking.\n\nShot on a compact drone at 2.5K, 30fps.",
    channelId: "blue-horizon",
    category: "Ocean",
    views: 2_480_311,
    likes: 84_200,
    uploadedAt: "2026-11-14T10:00:00Z",
    durationSec: 33,
    src: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    thumbnail: t1.url,
  },
  {
    id: "lone-tree-sunset",
    title: "A Lone Tree at Sunset | Timelapse",
    description:
      "One tree, one field, one evening. A calm timelapse of the sun dropping behind the hills.",
    channelId: "golden-hour",
    category: "Nature",
    views: 612_904,
    likes: 21_300,
    uploadedAt: "2026-11-18T18:30:00Z",
    durationSec: 14,
    src: "https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4",
    thumbnail: t2.url,
  },
  {
    id: "turquoise-cliffs",
    title: "Turquoise Water Meets the Cliffs (Bird's-Eye View)",
    description:
      "Looking straight down as foam rolls over dark rock and into a hidden beach. Filmed on a windy morning in early spring.",
    channelId: "blue-horizon",
    category: "Ocean",
    views: 1_045_772,
    likes: 39_800,
    uploadedAt: "2026-10-30T08:15:00Z",
    durationSec: 21,
    src: "https://videos.pexels.com/video-files/1409899/1409899-hd_1920_1080_25fps.mp4",
    thumbnail: t3.url,
  },
  {
    id: "kids-try-vr",
    title: "Kids Try Virtual Reality for the First Time",
    description:
      "We set up a VR headset at a science fair and let visitors take it for a spin. Their reactions say it all.",
    channelId: "future-lab",
    category: "Tech",
    views: 5_902_118,
    likes: 201_400,
    uploadedAt: "2026-11-20T15:00:00Z",
    durationSec: 14,
    src: "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4",
    thumbnail: t4.url,
  },
  {
    id: "golden-rocks",
    title: "Golden Light on the Rocks — 8 Seconds of Calm",
    description: "Sunlight pouring over a rocky shore while the tide comes in. Short and sweet.",
    channelId: "golden-hour",
    category: "Nature",
    views: 88_410,
    likes: 4_120,
    uploadedAt: "2026-09-12T19:45:00Z",
    durationSec: 8,
    src: "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4",
    thumbnail: t5.url,
  },
  {
    id: "open-sea-from-above",
    title: "Open Sea From Above | Relaxing Ocean Footage",
    description:
      "Deep green water and white foam, filmed far from shore. Perfect background for studying or winding down.",
    channelId: "blue-horizon",
    category: "Ocean",
    views: 734_005,
    likes: 18_900,
    uploadedAt: "2026-08-03T12:00:00Z",
    durationSec: 15,
    src: "https://videos.pexels.com/video-files/1918465/1918465-hd_1920_1080_24fps.mp4",
    thumbnail: t6.url,
  },
  {
    id: "flower-blooming",
    title: "Watch a Flower Bloom in Seconds",
    description:
      "A macro timelapse of a tiny red flower opening up. Filmed over several hours, sped up to just a few seconds.",
    channelId: "petal-stem",
    category: "Nature",
    views: 342_660,
    likes: 15_700,
    uploadedAt: "2026-11-02T07:00:00Z",
    durationSec: 5,
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail: t7.url,
  },
  {
    id: "friday-office-1940s",
    title: "Friday at the Office, 1940s Style",
    description:
      "A short restored clip of an office scene from a classic black-and-white film. Public domain.",
    channelId: "archive-reels",
    category: "Classic film",
    views: 51_230,
    likes: 2_380,
    uploadedAt: "2026-07-21T16:20:00Z",
    durationSec: 6,
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    thumbnail: t8.url,
  },
  {
    id: "sintel-teaser",
    title: "Sintel — Snowy Mountain Chase (Clip)",
    description:
      "A young woman searches for her lost dragon in this scene from Sintel, an open animated short film by the Blender Foundation.",
    channelId: "open-movie-night",
    category: "Animation",
    views: 8_320_947,
    likes: 412_000,
    uploadedAt: "2026-06-10T09:00:00Z",
    durationSec: 10,
    src: "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4",
    thumbnail: t9.url,
  },
  {
    id: "jellyfish-drift",
    title: "Jellyfish Drifting in the Deep — Aquarium Footage",
    description:
      "Glowing jellyfish slowly pulsing through dark water. Filmed at a public aquarium.",
    channelId: "blue-horizon",
    category: "Ocean",
    views: 1_998_004,
    likes: 66_100,
    uploadedAt: "2026-11-08T21:00:00Z",
    durationSec: 10,
    src: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    thumbnail: t10.url,
  },
  {
    id: "big-buck-bunny-meadow",
    title: "Big Buck Bunny — Morning in the Meadow (Clip)",
    description:
      "The opening scene of Big Buck Bunny, a much-loved open animated film from the Blender Foundation.",
    channelId: "open-movie-night",
    category: "Animation",
    views: 12_604_330,
    likes: 530_900,
    uploadedAt: "2026-05-01T11:00:00Z",
    durationSec: 10,
    src: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
    thumbnail: t11.url,
  },
];

export const categories = ["All", ...Array.from(new Set(videos.map((v) => v.category)))];

export function getVideo(id: string) {
  return videos.find((v) => v.id === id);
}

export function getChannel(id: string) {
  return channels.find((c) => c.id === id);
}

export function videosByChannel(channelId: string) {
  return videos.filter((v) => v.channelId === channelId);
}

export function searchVideos(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return videos.filter((v) => {
    const channel = getChannel(v.channelId);
    return [v.title, v.description, v.category, channel?.name ?? ""].some((field) =>
      field.toLowerCase().includes(q),
    );
  });
}

/** Same channel first, then same category, then everything else. */
export function upNext(current: Video) {
  const score = (v: Video) =>
    (v.channelId === current.channelId ? 2 : 0) + (v.category === current.category ? 1 : 0);
  return videos
    .filter((v) => v.id !== current.id)
    .sort((a, b) => score(b) - score(a) || b.views - a.views);
}
