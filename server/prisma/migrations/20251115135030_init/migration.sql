-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "duty" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomId" SERIAL NOT NULL,
    "exam" TEXT NOT NULL,
    "noOfStudents" INTEGER NOT NULL,
    "roomCapacity" INTEGER NOT NULL,
    "allocatedTeacherId" INTEGER,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_allocatedTeacherId_fkey" FOREIGN KEY ("allocatedTeacherId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
