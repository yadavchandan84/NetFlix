"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { DemoVideo } from "@/lib/demo-data";

function badgeClass(badge: string) {
  if (badge === "TOP 10") return "top10";
  if (badge === "NEW") return "new";
  return "trending";
}

export function VideoCard({
  video,
  progress,
}: {
  video: DemoVideo;
  progress?: number;
}) {
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const showImage = !imgError && video.posterUrl;

  // Mouse-tracking 3D tilt
  function handleMove(e: React.MouseEvent) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = x * 16; // left-right
    const rotX = -y * 16; // up-down
    el.style.setProperty("--rot-x", `${rotX}deg`);
    el.style.setProperty("--rot-y", `${rotY}deg`);
    el.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  }

  function handleLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rot-x", "0deg");
    el.style.setProperty("--rot-y", "0deg");
  }

  return (
    <Link
      ref={cardRef}
      href={`/title/${video.slug}`}
      className="video-card tilt"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className={`poster${!showImage ? ` bg-gradient-to-br ${video.gradient}` : ""}`}>
        {showImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.posterUrl}
            alt={`${video.title} poster`}
            className="poster-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}

        {!showImage && (
          <div className="poster-fallback">
            <div className="poster-fallback-logo">{video.title.slice(0, 1)}</div>
            <div className="poster-fallback-title">{video.title}</div>
            <div className="poster-fallback-year">{video.year}</div>
          </div>
        )}

        {/* Cursor-follow glow sheen */}
        <div className="poster-glow" aria-hidden="true" />

        {video.badge && (
          <span className={`poster-badge ${badgeClass(video.badge)}`}>{video.badge}</span>
        )}
        {video.imdbRating && <span className="poster-imdb">★ {video.imdbRating}</span>}

        <div className="card-hover">
          <div className="card-play-btn" aria-hidden="true">▶</div>
          <p className="card-hover-title">{video.title}</p>
          <div className="card-hover-meta">
            <span className="card-maturity">{video.maturity}</span>
            <span className="card-duration">{video.duration}</span>
            <span className="card-duration">{video.year}</span>
          </div>
        </div>
      </div>

      <p className="video-card-label">{video.title}</p>
      <span className="genre-pill">{video.genres[0]}</span>

      {progress !== undefined && (
        <div className="progress">
          <i style={{ width: `${progress}%` }} />
        </div>
      )}
    </Link>
  );
}
