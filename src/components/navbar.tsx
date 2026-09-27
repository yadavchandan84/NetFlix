"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Session = { userId: string; email: string; role: string } | null;

function getInitials(email: string) {
  const name = email.split("@")[0];
  return name.slice(0, 2).toUpperCase();
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session>(null);
  const [scrolled, setScrolled] = useState(false);

  // Fetch session for avatar initials
  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((d) => setSession(d.session ?? null))
      .catch(() => {});
  }, []);

  // Add scrolled class so navbar goes solid after scrolling
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const links = [
    ["Home", "/"],
    ["Movies", "/browse"],
    ["My List", "/mylist"],
  ];

  const initials = session ? getInitials(session.email) : "N";
  const isAdmin = session?.role === "ADMIN";

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      {/* Brand */}
      <Link className="brand" href="/">
        NETFLIX
      </Link>

      {/* Primary nav */}
      <nav aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? "active" : ""}
          >
            {label}
          </Link>
        ))}
        {isAdmin && (
          <Link
            href="/admin/dashboard"
            className={pathname.startsWith("/admin") ? "active" : ""}
            style={{ color: "#e50914" }}
          >
            Admin
          </Link>
        )}
      </nav>

      {/* Right-side actions */}
      <div className="nav-actions">
        {/* Search */}
        <Link
          href="/search"
          className={`nav-search-btn${pathname === "/search" ? " active" : ""}`}
          aria-label="Search"
          title="Search"
        >
          🔍
        </Link>

        {/* Avatar → profile */}
        <Link href="/profile" className="avatar" title="My Profile" aria-label="My profile">
          {initials}
        </Link>

        {/* Sign out */}
        <button className="logout" onClick={logout}>
          Sign out
        </button>
      </div>
    </header>
  );
}
