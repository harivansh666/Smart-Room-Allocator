import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class";
import { ControllerType } from "../types/types";

export const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {

    err.message ||= "";
    err.statusCode ||= 500

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}
// /user
export const TryCatch = (func: ControllerType) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(func(req, res, next)).catch((err) => {
            console.error("🔥 SERVER ERROR:", err)
            next(err)
        })
    }