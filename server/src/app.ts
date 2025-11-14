import express, { Request, Response } from "express"

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.json({ success: true })
})

app.listen(3000, () => {
    console.log("Port is running on 3000")
})
