-- CreateTable
CREATE TABLE "Imagenes" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Imagenes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Imagenes_url_key" ON "Imagenes"("url");
