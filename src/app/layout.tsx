import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "A video streaming application",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* Cinematic background vignette overlay */}
        <div className="bg-vignette" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
