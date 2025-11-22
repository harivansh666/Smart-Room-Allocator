import express, { Request, Response } from "express"
import dotenv from "dotenv"
import cors from 'cors'
import userRoutes from "./routes/authRoutes"
import { errorMiddleware } from "./middlewares/error"
import roomRouter from "./routes/createRoom.Route"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config();

app.use(express.json())
app.use(cookieParser())

// app.use(cors({
//     origin: process.env.CLIENT_API,
//     methods: ["GET,POST,PUT,DELETE,PATCH"],
//     credentials: true
// }))
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://lambent-centaur-321a6e.netlify.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use('/api', userRoutes)
app.use('/api/rooms', roomRouter)

app.get("/api/check", (req: Request, res: Response) => {
    res.json({ success: true })
})

app.use(errorMiddleware)

app.listen(3000, () => {
    console.log("Port is running on 3000")
})
