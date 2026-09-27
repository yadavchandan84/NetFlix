import Link from "next/link";
import { TrailerPlayer } from "@/components/video-player/trailer-player";
import { findVideo } from "@/lib/demo-data";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const video = findVideo((await params).id);

  return (
    <main className="watch">
      {/* Back nav */}
      <Link className="back" href={`/title/${video.slug}`}>
        ← Back to {video.title}
      </Link>

      {/* Trailer / Mux player */}
      <TrailerPlayer
        youtubeId={video.trailerYouTubeId}
        title={video.title}
      />

      {/* Info below player */}
      <div className="watch-info">
        <div className="watch-info-header">
          <div>
            <h1>{video.title}</h1>
            <div className="watch-meta">
              <span className="watch-year">{video.year}</span>
              <span className="rating-badge">{video.maturity}</span>
              <span className="watch-duration">{video.duration}</span>
              {video.imdbRating && (
                <span className="imdb-badge">
                  <span className="imdb-star">★</span> {video.imdbRating}
                  <span className="imdb-label">&nbsp;IMDb</span>
                </span>
              )}
            </div>
          </div>
          <Link className="button red sm" href={`/title/${video.slug}`}>
            View Details
          </Link>
        </div>

        <p className="watch-desc">{video.description}</p>

        <div className="watch-credits">
          <p>
            <b>Director</b>&nbsp;
            <span className="watch-credit-value">{video.director}</span>
          </p>
          <p>
            <b>Cast</b>&nbsp;
            <span className="watch-credit-value">
              {video.cast.slice(0, 4).join(", ")}
            </span>
          </p>
          <p>
            <b>Genres</b>&nbsp;
            <span className="watch-credit-value">
              {video.genres.join(", ")}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
