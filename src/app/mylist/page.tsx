"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { VideoCard } from "@/components/video-card";
import { findVideo } from "@/lib/demo-data";
import type { DemoVideo } from "@/lib/demo-data";
import Link from "next/link";

type WatchlistItem = {
  id: string;
  videoId: string;
  createdAt: string;
  video?: { id: string; title: string; slug: string };
};

export default function MyListPage() {
  const [items, setItems] = useState<DemoVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/watchlist")
      .then(async (r) => {
        if (r.status === 401) {
          setError("auth");
          return;
        }
        if (!r.ok) throw new Error("Failed to load");
        const data = await r.json();
        // Map DB items back to demo videos by id/slug
        const mapped: DemoVideo[] = (data.items as WatchlistItem[])
          .map((item) => {
            // Try DB video first, fall back to demo data lookup
            const dbVideoId = item.video?.id ?? item.videoId;
            return findVideo(dbVideoId);
          })
          .filter(Boolean);
        // De-duplicate by id
        const unique = Array.from(new Map(mapped.map((v) => [v.id, v])).values());
        setItems(unique);
      })
      .catch(() => setError("load"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="page">
        <h1>My List</h1>

        {loading && (
          <p className="subtle">Loading your list…</p>
        )}

        {error === "auth" && (
          <div style={{ maxWidth: 480 }}>
            <p className="subtle">
              Sign in to save titles to your list.
            </p>
            <Link className="button red" href="/login" style={{ marginTop: "1rem", display: "inline-block" }}>
              Sign in
            </Link>
          </div>
        )}

        {error === "load" && (
          <p className="subtle">
            Couldn't load your list right now. Try refreshing.
          </p>
        )}

        {!loading && !error && items.length === 0 && (
          <div style={{ maxWidth: 500 }}>
            <p className="subtle">
              You haven't saved anything yet. Browse titles and hit{" "}
              <strong>+ My List</strong> to save them here.
            </p>
            <Link className="button red" href="/browse" style={{ marginTop: "1rem", display: "inline-block" }}>
              Browse Titles
            </Link>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="card-grid">
            {items.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
