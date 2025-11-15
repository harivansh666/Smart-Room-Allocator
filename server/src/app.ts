import express, { NextFunction, Request, Response } from "express"
import userRoutes from "./routes/authRoutes"
import cors from 'cors'
import { errorMiddleware } from "./middlewares/error"
const app = express()

app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173"

    }))


app.use('/api/user', userRoutes)

app.get("/check", (req: Request, res: Response) => {
    res.json({ success: true })
})

app.use(errorMiddleware)

app.listen(3000, () => {
    console.log("Port is running on 3000")
})
