import { Router } from "express";
import { Signin, Signup } from "../controllers/AuthControllers";
import { createRoom } from "../controllers/generateRooms";

const userRoutes = Router()

userRoutes.post('/signin', Signin)
userRoutes.post('/signup', Signup)
userRoutes.post('/createRoom', createRoom)


export default userRoutes;
