import { Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import z, { success } from 'zod'
import prisma from "../config/prisma";
import { tr } from "zod/v4/locales";

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
            allocatedTeacher: parsed.data.allocatedTeacherId ? {
                connect: { userId: parsed.data.allocatedTeacherId }
            } : undefined,
        }, include: {
            allocatedTeacher: true,
        }

    })
    console.log("responseDb", responseDb)
    return res.status(200).json({ responseDb, msg: "OK" });

})
export const getRooms = TryCatch(

    async (req, res) => {
        const id = req.query.userId
        const userId = Number(id);
        console.log(id)
        const dbresult = await prisma.user.findUnique({
            where: { userId }, include: {
                roomsAllocated: true,
            }
        });
        return res.status(200).json({
            success: true,
            dbresult
        });
    }
)

export const getTeachers = TryCatch(async (req, res) => {

    const teachers = await prisma.user.findMany({
        where: { isAdmin: false },
        select: {
            userId: true,
            name: true
        }
    })
    console.log(teachers)
    return res.json({
        success: true,

        teachers
    })
})