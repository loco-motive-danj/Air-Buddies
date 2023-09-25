-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "products" TEXT,
    "user" TEXT,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products " (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" DOUBLE PRECISION,
    "image_url" TEXT,
    "description" TEXT,
    "country_of_origin" TEXT,

    CONSTRAINT "products _pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

