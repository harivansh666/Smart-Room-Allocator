import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { TryCatch } from "../middlewares/error";
import z, { success } from "zod";
import { generayeJwtToken } from "../middlewares/generateToken";
import prisma from "../config/prisma";



const SigninSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string(),
});


// /api/signin
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

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    await generayeJwtToken(user.userId, res)

    return res.status(200).json({
        success: true,
        message: "Signin successful",
        user: {
            id: user.userId,
            name: user.name,
            email: user.email
        },
    });
});

// /api/signup

export const Signup = TryCatch(async (req: Request, res: Response) => {

    const parsed = SignUpSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Validation error",
            errors: parsed.error,
        });
    }

    const { name, email, password } = parsed.data;

    const exists = await prisma.user.findUnique({ where: { email }, });

    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    console.log(salt)
    const dbUser = await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });

    return res.status(201).json({
        message: "Signup successful",
        user: dbUser,
    });
});

export const checkAuth = TryCatch(async (req, res) => {
    try {
        const token = req.cookies.auth;
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("error is checkauth controller", error);
        return res.status(400).json(error);
    }
});



