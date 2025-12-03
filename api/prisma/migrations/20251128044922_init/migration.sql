-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending'
    CHECK(priority IN ('low', 'medium', 'high')),
    CHECK(status IN ('pending', 'progress', 'completed'))
);
