/*
  Warnings:

  - The primary key for the `Imagenes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Imagenes" DROP CONSTRAINT "Imagenes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Imagenes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Imagenes_id_seq";
