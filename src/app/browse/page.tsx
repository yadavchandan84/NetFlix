"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { VideoCard } from "@/components/video-card";
import { useSearchParams } from "next/navigation";
import { populatedGenres, videosForGenre, videos } from "@/lib/demo-data";
import { Suspense } from "react";

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre") ?? "All";

  const [activeGenre, setActiveGenre] = useState(initialGenre);

  const allGenres = ["All", ...populatedGenres().filter((g) => g !== "Trending Now")];

  const displayed = useMemo(() => {
    if (activeGenre === "All") return videos;
    return videosForGenre(activeGenre);
  }, [activeGenre]);

  return (
    <>
      <Navbar />
      <main className="page">
        <h1>Browse by Genre</h1>

        {/* Genre filter tabs */}
        <div className="genre-tabs">
          {allGenres.map((genre) => (
            <button
              key={genre}
              className={`genre-tab${activeGenre === genre ? " active" : ""}`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="subtle" style={{ marginBottom: "1.2rem" }}>
          {displayed.length} title{displayed.length !== 1 ? "s" : ""}
          {activeGenre !== "All" ? ` in ${activeGenre}` : ""}
        </p>

        {/* Grid */}
        <div className="card-grid">
          {displayed.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {displayed.length === 0 && (
          <p className="empty">No titles in this genre yet.</p>
        )}
      </main>
    </>
  );
}

export default function BrowsePage() {
  return (
    <Suspense>
      <BrowseContent />
    </Suspense>
  );
}
