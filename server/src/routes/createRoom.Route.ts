import { Router } from "express"
import { createRoom, getRooms, getTeachers } from "../controllers/generateRooms"
import { protect } from "../middlewares/VerifyAuth"

const roomRouter = Router()

roomRouter.get('/getteachers', protect, getTeachers)
roomRouter.get('/getrooms', protect, getRooms)
roomRouter.post('/createRoom', protect, createRoom)

export default roomRouter;
