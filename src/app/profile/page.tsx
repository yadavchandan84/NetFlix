"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { VideoCard } from "@/components/video-card";
import { findVideo } from "@/lib/demo-data";
import type { DemoVideo } from "@/lib/demo-data";

type SessionData = {
  userId: string;
  email: string;
  role: string;
};

type HistoryItem = {
  id: string;
  videoId: string;
  progressSeconds: number;
  completed: boolean;
  video?: { id: string; title: string; slug: string; durationSeconds: number };
};

const PLAN_COLORS: Record<string, string> = {
  FREE: "#aaa",
  BASIC: "#46d369",
  STANDARD: "#2e65a6",
  PREMIUM: "#e50914",
};

export default function ProfilePage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [history, setHistory] = useState<{ video: DemoVideo; progress: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/session").then((r) => r.json()),
      fetch("/api/history").then((r) => (r.ok ? r.json() : { items: [] })),
    ])
      .then(([sessionRes, historyRes]) => {
        setSession(sessionRes.session ?? null);

        const items: { video: DemoVideo; progress: number }[] = (
          historyRes.items as HistoryItem[]
        )
          .map((item) => {
            const demoVideo = findVideo(item.video?.id ?? item.videoId);
            // Calculate progress % from seconds, default to a small non-zero value
            const durationSec = item.video?.durationSeconds ?? 7200;
            const pct = Math.min(
              100,
              Math.round((item.progressSeconds / durationSec) * 100)
            );
            return { video: demoVideo, progress: pct };
          })
          .filter(Boolean)
          .slice(0, 6);

        setHistory(items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const initials = session
    ? session.email.slice(0, 1).toUpperCase()
    : "N";
  const displayName = session?.email.split("@")[0] ?? "Netflix Member";
  const isAdmin = session?.role === "ADMIN";

  // Demo "continue watching" when history is empty — show some items with fake progress
  const continueWatching =
    history.length > 0
      ? history
      : [
          { video: findVideo("neon-horizon"), progress: 65 },
          { video: findVideo("orbit"), progress: 42 },
          { video: findVideo("red-line"), progress: 18 },
          { video: findVideo("kingpin"), progress: 83 },
        ];

  return (
    <>
      <Navbar />
      <main className="page">
        <h1>Account & Profiles</h1>

        {/* ── Profile card ─────────────────────────────────────────────── */}
        <section className="profile-card">
          <div className="profile-avatar lg">{initials}</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: "0 0 0.2rem", fontSize: "1.15rem" }}>
              {loading ? "Loading…" : displayName}
            </h2>
            {session && (
              <p style={{ margin: "0 0 0.6rem", color: "#aaa", fontSize: "0.88rem" }}>
                {session.email}
              </p>
            )}
            <span className="plan-badge">
              {isAdmin ? "Admin" : "Premium"}
            </span>
            <p style={{ margin: "0.6rem 0 0.9rem", color: "#aaa", fontSize: "0.85rem" }}>
              {isAdmin
                ? "Full admin access · Manage content"
                : "4 screens · Ultra HD · Downloads"}
            </p>
            <button className="button outline sm">Manage account</button>
          </div>
        </section>

        {/* ── Profiles ─────────────────────────────────────────────────── */}
        <h2 style={{ marginBottom: "1rem" }}>Profiles</h2>
        <div className="profiles">
          <div className="profile-item">
            <div className="profile-avatar lg">{initials}</div>
            <span>{displayName}</span>
          </div>
          <div className="profile-item">
            <div className="profile-avatar lg alt">A</div>
            <span>Alex</span>
          </div>
          <div className="profile-item">
            <div className="profile-avatar lg alt2">K</div>
            <span>Kids</span>
          </div>
          <div className="profile-item">
            <button className="profile-add" title="Add profile">＋</button>
            <span style={{ fontSize: "0.78rem", color: "#777" }}>Add</span>
          </div>
        </div>

        {/* ── Continue Watching ─────────────────────────────────────────── */}
        <h2 style={{ marginBottom: "1rem" }}>Continue Watching</h2>
        <div className="card-grid">
          {continueWatching.map(({ video, progress }) => (
            <VideoCard key={video.id} video={video} progress={progress} />
          ))}
        </div>

        {/* ── Admin link ───────────────────────────────────────────────── */}
        {isAdmin && (
          <>
            <hr className="section-divider" />
            <h2 style={{ marginBottom: "0.75rem" }}>Admin</h2>
            <p className="subtle" style={{ marginBottom: "1rem" }}>
              You have admin access. Manage content and users from the dashboard.
            </p>
            <a className="button red sm" href="/admin/dashboard">
              Open Admin Dashboard →
            </a>
          </>
        )}
      </main>
    </>
  );
}
