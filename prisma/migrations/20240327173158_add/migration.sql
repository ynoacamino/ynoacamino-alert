/*
  Warnings:

  - Added the required column `numberPhoneId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "queryId" INTEGER NOT NULL,
    "numberPhoneId" INTEGER NOT NULL,
    CONSTRAINT "Message_numberPhoneId_fkey" FOREIGN KEY ("numberPhoneId") REFERENCES "NumberPhone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_queryId_fkey" FOREIGN KEY ("queryId") REFERENCES "Query" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("createdAt", "id", "queryId") SELECT "createdAt", "id", "queryId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
