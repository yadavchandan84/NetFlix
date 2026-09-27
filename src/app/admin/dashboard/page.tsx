"use client";

import { useState, useEffect } from "react";
import MuxUploader from "@mux/mux-uploader-react";
import { Navbar } from "@/components/navbar";

type VideoRecord = {
  id: string;
  title: string;
  status: "DRAFT" | "PROCESSING" | "READY" | "ERRORED";
  releaseYear: number;
  durationSeconds: number;
  genres: { genre: { name: string } }[];
  createdAt: string;
};

export default function AdminDashboard() {
  const [uploadUrl, setUploadUrl] = useState<string>();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"ok" | "error">("ok");
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // Load existing videos
  useEffect(() => {
    fetch("/api/admin/videos")
      .then((r) => (r.ok ? r.json() : { videos: [] }))
      .then((d) => setVideos(d.videos ?? []))
      .catch(() => {})
      .finally(() => setLoadingVideos(false));
  }, []);

  async function prepare(formData: FormData) {
    setMessage("");
    setUploadUrl(undefined);
    const body = Object.fromEntries(formData);
    const response = await fetch("/api/admin/uploads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error || "Unable to prepare upload.");
      setMessageType("error");
      return;
    }
    setUploadUrl(data.uploadUrl);
    setMessage("Upload URL created. Choose a video file — Mux will generate HLS automatically.");
    setMessageType("ok");
  }

  async function deleteVideo(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const r = await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
    if (r.ok) {
      setVideos((prev) => prev.filter((v) => v.id !== id));
    }
  }

  function formatDuration(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  return (
    <>
      <Navbar />
      <main className="page admin">
        <h1>Admin Dashboard</h1>

        {/* ── Analytics ──────────────────────────────────────────────────── */}
        <div className="analytics">
          <article>
            <b>{loadingVideos ? "…" : videos.length}</b>
            <span>Total videos (DB)</span>
          </article>
          <article>
            <b>{loadingVideos ? "…" : videos.filter((v) => v.status === "READY").length}</b>
            <span>Ready to stream</span>
          </article>
          <article>
            <b>{loadingVideos ? "…" : videos.filter((v) => v.status === "PROCESSING").length}</b>
            <span>Processing</span>
          </article>
        </div>

        {/* ── Upload form ────────────────────────────────────────────────── */}
        <div className="admin-panel">
          <h2>Upload a New Video</h2>
          <form action={prepare} className="upload-form">
            <input name="title" placeholder="Title *" required />
            <input name="releaseYear" type="number" placeholder="Release year *" required min={1900} max={2100} />
            <input
              name="description"
              placeholder="Description *"
              required
              className="full"
            />
            <input
              name="genres"
              placeholder="Genres (comma-separated, e.g. Sci-Fi, Drama) *"
              required
              className="full"
            />
            <input
              name="cast"
              placeholder="Cast (comma-separated)"
              className="full"
            />
            <input name="durationSeconds" type="number" placeholder="Duration in seconds *" required min={1} />
            <input name="maturityRating" placeholder="Maturity rating (e.g. U/A 16+)" />
            <button className="button light full" type="submit">
              Create upload URL
            </button>
          </form>

          {message && (
            <p
              className={messageType === "error" ? "error" : "subtle"}
              style={{ marginTop: "0.75rem" }}
            >
              {message}
            </p>
          )}
          {uploadUrl && <MuxUploader endpoint={uploadUrl} />}
        </div>

        {/* ── Content table ──────────────────────────────────────────────── */}
        <div className="admin-panel">
          <h2>Content Library</h2>
          {loadingVideos ? (
            <p className="subtle">Loading…</p>
          ) : videos.length === 0 ? (
            <p className="subtle">
              No videos in the database yet. Use the form above to upload your first title.
              <br />
              <span style={{ fontSize: "0.82rem", color: "#666", marginTop: "0.3rem", display: "block" }}>
                Run <code>prisma migrate dev</code> first if you haven't set up the database.
              </span>
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Duration</th>
                    <th>Genres</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((v) => (
                    <tr key={v.id}>
                      <td>{v.title}</td>
                      <td>{v.releaseYear}</td>
                      <td>{formatDuration(v.durationSeconds)}</td>
                      <td>
                        {v.genres.map((vg) => vg.genre.name).join(", ") || "—"}
                      </td>
                      <td>
                        <span className={`status-badge ${v.status.toLowerCase()}`}>
                          {v.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="button sm outline"
                          onClick={() => deleteVideo(v.id, v.title)}
                          style={{ fontSize: "0.76rem", padding: "0.25rem 0.65rem" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
