import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { VideoRow } from "@/components/video-row";
import { findVideo, videos } from "@/lib/demo-data";
import { WatchlistButton } from "@/components/watchlist-button";

export default async function TitlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const video = findVideo((await params).id);

  // More Like This — same genres, exclude self
  const moreLikeThis = videos
    .filter(
      (v) =>
        v.id !== video.id &&
        v.genres.some((g) => video.genres.includes(g))
    )
    .slice(0, 12);

  return (
    <>
      <Navbar />
      <div className="detail">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section
          className="detail-hero"
          style={
            video.backdropUrl
              ? {
                  backgroundImage: `url(${video.backdropUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }
              : undefined
          }
        >
          {/* Fallback gradient overlay when no backdrop */}
          {!video.backdropUrl && (
            <div className={`detail-hero-gradient bg-gradient-to-br ${video.gradient}`} />
          )}
          <div className="detail-hero-content">
            {video.badge && (
              <div className="top10-badge">{video.badge} in Films Today</div>
            )}
            <h1>{video.title}</h1>

            <div className="detail-meta">
              {video.imdbRating && (
                <span className="imdb-badge">
                  <span className="imdb-star">★</span>
                  {video.imdbRating}
                  <span className="imdb-label">&nbsp;IMDb</span>
                </span>
              )}
              <span className="match">98% Match</span>
              <span>{video.year}</span>
              <span className="rating-badge">{video.maturity}</span>
              <span>{video.duration}</span>
            </div>

            <p className="detail-desc">{video.description}</p>

            <div className="detail-actions">
              <Link className="button light" href={`/watch/${video.slug}`}>
                ▶&nbsp;&nbsp;Watch Trailer
              </Link>
              <WatchlistButton videoId={video.id} title={video.title} />
            </div>
          </div>
        </section>

        {/* ── Info panel ─────────────────────────────────────────────────── */}
        <div className="detail-info">
          <div className="detail-info-left">
            <p>
              <b>Director: </b>
              {video.director}
            </p>
            <p>
              <b>Cast: </b>
              {video.cast
                .map((c) => c.replace("Voice: ", ""))
                .join(", ")}
            </p>
            <p>
              <b>Genres: </b>
              {video.genres.map((g, i) => (
                <span key={g}>
                  {i > 0 && <span style={{ color: "#555" }}> · </span>}
                  <Link
                    href={`/browse?genre=${encodeURIComponent(g)}`}
                    style={{ color: "#ccc", transition: "color .15s" }}
                    className="genre-link"
                  >
                    {g}
                  </Link>
                </span>
              ))}
            </p>
            <p>
              <b>Maturity: </b>
              <span className="rating-badge" style={{ border: "1px solid #aaa", padding: "0.05rem 0.4rem", fontSize: "0.78rem", color: "#aaa" }}>
                {video.maturity}
              </span>
            </p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            {video.imdbRating && (
              <>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#777" }}>IMDb Rating</p>
                <p style={{ margin: "0.2rem 0 0", fontSize: "2rem", fontWeight: 900, color: "#f5c518", lineHeight: 1 }}>
                  {video.imdbRating}
                  <span style={{ fontSize: "1rem", color: "#555" }}>/10</span>
                </p>
              </>
            )}
            <p className="match" style={{ fontSize: "1rem", marginTop: "0.7rem" }}>
              98% Match
            </p>
          </div>
        </div>

        <hr className="section-divider" />

        {/* ── Cast ───────────────────────────────────────────────────────── */}
        {video.cast.length > 0 && (
          <div className="detail-section">
            <h2>Cast</h2>
            <div className="cast-strip">
              {video.cast.map((name) => {
                const cleanName = name.replace("Voice: ", "");
                return (
                  <div key={name} className="cast-card">
                    <div className="cast-avatar">
                      {cleanName.slice(0, 1)}
                    </div>
                    <p>{cleanName}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── More Like This ──────────────────────────────────────────────── */}
        {moreLikeThis.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <VideoRow title="More Like This" videos={moreLikeThis} />
          </div>
        )}
      </div>
    </>
  );
}
