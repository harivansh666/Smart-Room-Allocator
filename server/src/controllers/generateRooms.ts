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

export const createRoom = TryCatch(async (req: Request, res: Response) => {

    const parsed = CreateRoomSchema.safeParse(req.body)

    console.log(parsed.data)

    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: parsed.error,
        })
    }

    // const data = parsed.room.create({
    //     data: {
    //         exam: data.exam,
    //         NoOfStudents: data.noOfStudents,
    //         RoomCapacity: data.roomCapacity,
    //         allocatedTeacherId: data.allocatedTeacherId ?? null,
    //     }
    // })
    prisma.user.create
    return res.status(200).json({ msg: "OK" });

})