/*
  Warnings:

  - You are about to drop the column `country_origin` on the `brand_sellers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "brand_sellers" DROP COLUMN "country_origin",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "reference_location" DROP NOT NULL;
