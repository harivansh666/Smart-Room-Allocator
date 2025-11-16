import dotenv from 'dotenv';
dotenv.config();
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient, } from '@prisma/client';
import { User } from '../generated/prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
    user?: User; // Attach user object here
}

interface JwtAuthPayload extends JwtPayload {
    auth: number;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.auth;

        if (!token) {
            return res.status(401).json({ message: "Authentication token missing" });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined in environment variables");
        }

        let decoded: JwtAuthPayload;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtAuthPayload;
        } catch {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const user = await prisma.user.findUnique({ where: { userId: decoded.auth } });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Protect middleware error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
