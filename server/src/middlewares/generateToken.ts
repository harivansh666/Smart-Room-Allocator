import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken";

import { Response } from 'express';

export const generayeJwtToken = (userId: number, res: Response) => {

    if (!process.env.JtwSecret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ auth: userId }, process.env.JtwSecret, { expiresIn: "7d", })

    res.cookie("auth", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true,
    })
    return token
}