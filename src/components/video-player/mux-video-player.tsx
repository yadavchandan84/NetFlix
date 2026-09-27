"use client";
import MuxPlayer from "@mux/mux-player-react";
export function MuxVideoPlayer({ playbackId, title }: { playbackId?: string; title: string }) { if (!playbackId) return <div className="player-placeholder"><span>▶</span><p>{title}</p><small>Connect a Mux upload to start streaming this title.</small></div>; return <MuxPlayer playbackId={playbackId} streamType="on-demand" accentColor="#e50914" title={title} className="mux-player" />; }
