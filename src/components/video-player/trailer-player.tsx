"use client";

import { useState } from "react";

interface TrailerPlayerProps {
  youtubeId: string;
  title: string;
}

export function TrailerPlayer({ youtubeId, title }: TrailerPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Thumbnail from YouTube's HD thumbnail endpoint
  const thumbUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white&iv_load_policy=3`;

  function handlePlay() {
    setClicked(true);
  }

  return (
    <div className="trailer-wrap">
      {!clicked ? (
        /* ── Click-to-play thumbnail ──────────────────────────────────── */
        <div className="trailer-thumb" onClick={handlePlay} role="button" tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handlePlay()}
          aria-label={`Play official trailer for ${title}`}
        >
          {/* Thumbnail image via next/image would need domain config; use <img> */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbUrl}
            alt={`${title} trailer thumbnail`}
            className="trailer-thumb-img"
            onError={(e) => {
              // Fallback to lower-res if maxresdefault doesn't exist
              (e.target as HTMLImageElement).src =
                `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
            }}
          />
          {/* Dark overlay */}
          <div className="trailer-overlay" />

          {/* Play button */}
          <div className="trailer-play-btn" aria-hidden="true">
            <svg viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="34" cy="34" r="34" fill="rgba(0,0,0,0.6)" />
              <circle cx="34" cy="34" r="33" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" />
              <path d="M27 22L50 34L27 46V22Z" fill="white" />
            </svg>
          </div>

          {/* Label */}
          <div className="trailer-label">
            <span className="trailer-label-badge">▶ Official Trailer</span>
            <p className="trailer-label-title">{title}</p>
          </div>
        </div>
      ) : (
        /* ── Actual YouTube embed ─────────────────────────────────────── */
        <div className="trailer-iframe-wrap">
          {!loaded && (
            <div className="trailer-loading">
              <div className="trailer-spinner" />
              <span>Loading trailer…</span>
            </div>
          )}
          <iframe
            className="trailer-iframe"
            src={embedUrl}
            title={`${title} — Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0 }}
          />
        </div>
      )}

      {/* Attribution note */}
      <p className="trailer-attribution">
        Official trailer via YouTube · Content owned by respective studios
      </p>
    </div>
  );
}
