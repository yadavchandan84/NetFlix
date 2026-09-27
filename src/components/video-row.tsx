import Link from "next/link";
import type { DemoVideo } from "@/lib/demo-data";
import { VideoCard } from "./video-card";
import { Reveal } from "./reveal";

export function VideoRow({
  title,
  videos,
  seeAllHref,
}: {
  title: string;
  videos: DemoVideo[];
  seeAllHref?: string;
}) {
  if (!videos.length) return null;
  return (
    <Reveal as="section" className="row">
      <div className="row-header">
        <h2>{title}</h2>
        {seeAllHref && (
          <Link href={seeAllHref} className="row-see-all">
            See all →
          </Link>
        )}
      </div>
      <div className="rail-wrap">
        <div className="rail">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
