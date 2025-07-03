import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/",protectRoute,getAllUsers)


export default userRouter;