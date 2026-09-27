-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('FREE', 'BASIC', 'STANDARD', 'PREMIUM');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL, "email" TEXT NOT NULL, "passwordHash" TEXT, "name" TEXT, "imageUrl" TEXT,
    "plan" "SubscriptionPlan" NOT NULL DEFAULT 'FREE', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Video" (
    "id" TEXT NOT NULL, "title" TEXT NOT NULL, "slug" TEXT NOT NULL, "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL, "muxPlaybackId" TEXT NOT NULL, "durationSeconds" INTEGER NOT NULL,
    "maturityRating" TEXT, "releaseYear" INTEGER NOT NULL, "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Genre" (
    "id" TEXT NOT NULL, "name" TEXT NOT NULL, "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "VideoGenre" (
    "videoId" TEXT NOT NULL, "genreId" TEXT NOT NULL, CONSTRAINT "VideoGenre_pkey" PRIMARY KEY ("videoId", "genreId")
);

CREATE TABLE "WatchHistory" (
    "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "videoId" TEXT NOT NULL, "progressSeconds" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Watchlist" (
    "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "videoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Review" (
    "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "videoId" TEXT NOT NULL, "rating" INTEGER NOT NULL, "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Video_slug_key" ON "Video"("slug");
CREATE UNIQUE INDEX "Video_muxPlaybackId_key" ON "Video"("muxPlaybackId");
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");
CREATE UNIQUE INDEX "Genre_slug_key" ON "Genre"("slug");
CREATE INDEX "WatchHistory_userId_updatedAt_idx" ON "WatchHistory"("userId", "updatedAt");
CREATE UNIQUE INDEX "WatchHistory_userId_videoId_key" ON "WatchHistory"("userId", "videoId");
CREATE INDEX "Watchlist_userId_createdAt_idx" ON "Watchlist"("userId", "createdAt");
CREATE UNIQUE INDEX "Watchlist_userId_videoId_key" ON "Watchlist"("userId", "videoId");
CREATE INDEX "Review_videoId_createdAt_idx" ON "Review"("videoId", "createdAt");
CREATE UNIQUE INDEX "Review_userId_videoId_key" ON "Review"("userId", "videoId");

ALTER TABLE "VideoGenre" ADD CONSTRAINT "VideoGenre_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "VideoGenre" ADD CONSTRAINT "VideoGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
