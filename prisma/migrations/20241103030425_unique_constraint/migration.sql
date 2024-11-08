/*
  Warnings:

  - A unique constraint covering the columns `[client_id]` on the table `shopping_carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[client_id]` on the table `wishlists` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shopping_carts_client_id_key" ON "shopping_carts"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishlists_client_id_key" ON "wishlists"("client_id");
