-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gallery" TEXT NOT NULL,
    "spec_surface" TEXT NOT NULL,
    "spec_duration" TEXT NOT NULL,
    "spec_budget" TEXT NOT NULL,
    "spec_team" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "color" TEXT NOT NULL DEFAULT '#2d3a2e',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
