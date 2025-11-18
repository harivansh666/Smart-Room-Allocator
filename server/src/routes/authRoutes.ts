import { Router } from "express";
import { checkAuth, Signin, Signup } from "../controllers/AuthControllers";
import { createRoom } from "../controllers/generateRooms";
import { protect } from "../middlewares/VerifyAuth";

const userRoutes = Router()

userRoutes.post('/signin', Signin)
userRoutes.post('/signup', Signup)
userRoutes.get('/auth/check', protect, checkAuth)


export default userRoutes;
