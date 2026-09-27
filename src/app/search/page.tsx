"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/navbar";
import { VideoCard } from "@/components/video-card";
import { videos, populatedGenres } from "@/lib/demo-data";

const DISPLAY_GENRES = populatedGenres().filter((g) => g !== "Trending Now");

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const results = useMemo(() => {
    return videos.filter((video) => {
      const matchesTerm =
        !term ||
        `${video.title} ${video.genres.join(" ")} ${video.cast.join(" ")}`
          .toLowerCase()
          .includes(term.toLowerCase());
      const matchesGenre =
        !activeGenre || video.genres.includes(activeGenre);
      return matchesTerm && matchesGenre;
    });
  }, [term, activeGenre]);

  function toggleGenre(genre: string) {
    setActiveGenre((prev) => (prev === genre ? null : genre));
  }

  const hasQuery = term.length > 0 || activeGenre !== null;

  return (
    <>
      <Navbar />
      <main className="page">
        <h1>Search</h1>

        {/* Search input */}
        <input
          className="search-input"
          autoFocus
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Titles, genres, cast…"
          aria-label="Search titles"
        />

        {/* Genre chips */}
        <div className="genre-chips">
          {DISPLAY_GENRES.map((genre) => (
            <button
              key={genre}
              className={`genre-chip${activeGenre === genre ? " active" : ""}`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Results */}
        {hasQuery ? (
          <>
            <p className="subtle" style={{ marginBottom: "1.2rem" }}>
              {results.length} result{results.length !== 1 ? "s" : ""}
              {activeGenre ? ` in ${activeGenre}` : ""}
              {term ? ` for "${term}"` : ""}
            </p>
            {results.length > 0 ? (
              <div className="card-grid">
                {results.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="search-empty">
                <h3>No results found</h3>
                <p>Try a different title, genre, or cast member.</p>
              </div>
            )}
          </>
        ) : (
          // Default state — show popular titles
          <>
            <p className="subtle" style={{ marginBottom: "1.2rem" }}>
              Popular on Netflix
            </p>
            <div className="card-grid">
              {videos
                .filter((v) => v.badge)
                .slice(0, 18)
                .map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
