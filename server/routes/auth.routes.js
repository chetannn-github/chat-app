import { Router } from "express";
import { checkAuth, login, signup, updateProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const authRouter = Router();

authRouter.post("/signup",signup);
authRouter.post("/login", login);
authRouter.put("/update-profile",protectRoute,updateProfile);
authRouter.get("/check",protectRoute, checkAuth);


export default authRouter;
