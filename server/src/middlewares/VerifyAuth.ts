import dotenv from "dotenv";
dotenv.config();

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../config/prisma";

declare module "express-serve-static-core" {
    interface Request {
        user?: any;
    }
}

interface AuthPayload extends JwtPayload {
    auth: number; // userId
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req)
        const token = req.cookies.auth;
        console.log(token)

        if (!token) {
            return res.status(401).json({ message: "No authentication token provided" });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET missing in .env");
        }

        let decoded: any;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthPayload;
            console.log("Decoded JWT:", decoded); // <-- IMPORTANT
        } catch {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const user = await prisma.user.findUnique({
            where: { userId: decoded.auth },
        });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Protect error:", (err as Error).message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
