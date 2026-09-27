"use client";

import { useEffect, useState } from "react";

export function WatchlistButton({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  // On mount, check if already in the user's watchlist
  useEffect(() => {
    fetch("/api/watchlist")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.items) return;
        const inList = data.items.some(
          (item: { videoId: string }) => item.videoId === videoId
        );
        setAdded(inList);
      })
      .catch(() => {});
  }, [videoId]);

  async function toggle() {
    setLoading(true);
    try {
      if (added) {
        await fetch("/api/watchlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId }),
        });
        setAdded(false);
      } else {
        await fetch("/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId }),
        });
        setAdded(true);
      }
    } catch {
      // silently ignore — user may not be logged in
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={`button dark mylist-btn${added ? " added" : ""}`}
      onClick={toggle}
      disabled={loading}
      title={added ? `Remove ${title} from My List` : `Add ${title} to My List`}
      aria-label={added ? "Remove from My List" : "Add to My List"}
    >
      {loading ? "…" : added ? "✓ My List" : "+ My List"}
    </button>
  );
}
