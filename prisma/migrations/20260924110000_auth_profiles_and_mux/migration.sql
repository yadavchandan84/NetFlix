CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "VideoStatus" AS ENUM ('DRAFT', 'PROCESSING', 'READY', 'ERRORED');

ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER';
ALTER TABLE "Video" ALTER COLUMN "muxPlaybackId" DROP NOT NULL;
ALTER TABLE "Video" ADD COLUMN "muxAssetId" TEXT;
ALTER TABLE "Video" ADD COLUMN "muxUploadId" TEXT;
ALTER TABLE "Video" ADD COLUMN "status" "VideoStatus" NOT NULL DEFAULT 'DRAFT';
ALTER TABLE "Video" ADD COLUMN "cast" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
CREATE UNIQUE INDEX "Video_muxAssetId_key" ON "Video"("muxAssetId");
CREATE UNIQUE INDEX "Video_muxUploadId_key" ON "Video"("muxUploadId");

CREATE TABLE "Profile" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "avatarUrl" TEXT,
  "isKids" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Profile_userId_idx" ON "Profile"("userId");
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
