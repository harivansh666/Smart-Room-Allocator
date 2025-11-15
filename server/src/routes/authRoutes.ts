import { Router } from "express";
import { Signin, Signup } from "../controllers/AuthControllers";

const userRoutes = Router()

userRoutes.post('/signin', Signin)
userRoutes.post('/signup', Signup)

export default userRoutes;
