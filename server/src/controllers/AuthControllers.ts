import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { TryCatch } from "../middlewares/error";
import z from "zod";

export const prisma = new PrismaClient();


const SigninSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string(),
});

// ✔ SIGNIN
export const Signin = TryCatch(async (req: Request, res: Response) => {
    const parsed = SigninSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: parsed.error,
        });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
        message: "Signin successful",
        user,
    });
});

// ✔ SIGNUP
export const Signup = TryCatch(async (req: Request, res: Response) => {
    const parsed = SignUpSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: parsed.error,
        });
    }

    const { name, email, password } = parsed.data;

    const exists = await prisma.user.findUnique({ where: { email } });

    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const dbUser = await prisma.user.create({
        data: { name, email, password },
    });

    return res.status(201).json({
        message: "Signup successful",
        user: dbUser,
    });
});

