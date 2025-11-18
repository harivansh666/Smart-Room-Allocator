import { Router } from "express";
import { checkAuth, Logout, Signin, Signup, warmup } from "../controllers/AuthControllers";
import { createRoom } from "../controllers/generateRooms";
import { protect } from "../middlewares/VerifyAuth";

const userRoutes = Router()

userRoutes.get('/warmup', warmup)
userRoutes.post('/signin', Signin)
userRoutes.post('/signup', Signup)
userRoutes.post('/logout', Logout)
userRoutes.get('/auth/check', protect, checkAuth)


export default userRoutes;
