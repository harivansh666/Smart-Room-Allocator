import { Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import z from 'zod'
import prisma from "../config/prisma";

const CreateRoomSchema = z.object({
    exam: z.string(),
    noOfStudents: z.number(),
    roomCapacity: z.number(),
    allocatedTeacherId: z.number().optional(),
})

export const createRoom = TryCatch(async (req, res) => {

    const parsed = CreateRoomSchema.safeParse(req.body)


    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: parsed.error,
        })
    }

    const responseDb = await prisma.room.create({
        data: {
            exam: parsed.data.exam,
            noOfStudents: parsed.data.noOfStudents,
            roomCapacity: parsed.data.roomCapacity,
            allocatedTeacherId: parsed.data.allocatedTeacherId ?? null,
        }
    })
    console.log("responseDb", responseDb)
    return res.status(200).json({ responseDb, msg: "OK" });

})
export const getRooms = TryCatch(

    async (req, res) => {
        const id = req.body
        console.log(id)
        const dbresult = await prisma.user.findUnique(id)
        console.log(dbresult)

    }
)