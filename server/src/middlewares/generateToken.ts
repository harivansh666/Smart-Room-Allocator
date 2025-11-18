import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken";

import { Response } from 'express';

const secret = process.env.JWT_SECRET;
export const generayeJwtToken = (userId: number, res: Response) => {

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ auth: userId }, secret as string, { expiresIn: "7d", })

    res.cookie("auth", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true,
    })
    return token
}