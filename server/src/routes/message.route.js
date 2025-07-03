import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const messageRouter = Router();


messageRouter.get("/:id",protectRoute,getMessages);
messageRouter.post("/send/:id",protectRoute,sendMessage)

export default messageRouter;