import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { VideoRow } from "@/components/video-row";
import { featuredVideo, populatedGenres, videosForGenre } from "@/lib/demo-data";

export default function HomePage() {
  const genreRows = populatedGenres().slice(0, 14);

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="hero"
          style={
            featuredVideo.backdropUrl
              ? {
                  backgroundImage: `url(${featuredVideo.backdropUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 20%",
                }
              : undefined
          }
        >
          {!featuredVideo.backdropUrl && (
            <div className={`absolute inset-0 bg-gradient-to-br ${featuredVideo.gradient}`} />
          )}
          <div className="hero-copy">
            <div className="top10-badge">Top 10 in India Today</div>
            <h1>{featuredVideo.title}</h1>

            <div className="hero-meta">
              {featuredVideo.imdbRating && (
                <span className="imdb-badge">
                  <span className="imdb-star">★</span>
                  {featuredVideo.imdbRating}
                  <span className="imdb-label">&nbsp;IMDb</span>
                </span>
              )}
              <span className="match">98% Match</span>
              <span>{featuredVideo.year}</span>
              <span className="rating-badge">{featuredVideo.maturity}</span>
              <span>{featuredVideo.duration}</span>
            </div>

            <p>{featuredVideo.description}</p>

            <div className="hero-actions">
              <Link className="button light" href={`/watch/${featuredVideo.slug}`}>
                ▶&nbsp;&nbsp;Watch Trailer
              </Link>
              <Link className="button dark" href={`/title/${featuredVideo.slug}`}>
                ⓘ&nbsp;&nbsp;More Info
              </Link>
            </div>
          </div>
        </section>

        {/* ── Genre rows ───────────────────────────────────────────────────── */}
        <div className="rows">
          {genreRows.map((genre) => (
            <VideoRow
              key={genre}
              title={genre}
              videos={videosForGenre(genre)}
              seeAllHref={
                genre !== "Trending Now"
                  ? `/browse?genre=${encodeURIComponent(genre)}`
                  : "/browse"
              }
            />
          ))}
        </div>
      </main>
    </>
  );
}
