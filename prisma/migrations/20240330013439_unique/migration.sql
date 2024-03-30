/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `MailAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MailAddress_address_key" ON "MailAddress"("address");
