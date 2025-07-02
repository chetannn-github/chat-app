import { Router } from "express";
import { login, signup, updateProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const authRouter = Router();


authRouter.post("/signup",signup)
authRouter.post("/login", login);
authRouter.put("/update-profile",protectRoute,updateProfile)
export default authRouter;
