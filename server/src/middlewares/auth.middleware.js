import jwt from "jsonwebtoken";
import User  from "../models/user.model.js";

export const protectRoute =async function(req,res,next) {
    try {
        let token = req.header("Authorization")?.replace("Bearer ","");
        if(!token) return res.json({"message" : "No Authorisation token , Access denied","success" : false})
        let userId = jwt.verify(token,process.env.JWT_SECRET);

        let user = await User.findById(userId).select(["-password"]);
        if(!user) return res.json({"message" : "No valid Authorisation token , Access denied","success" : false})
        req.user = user;
        next();


    } catch (error) {
        console.log(error)
        return res.json({"message" : "No Authorisation token , Access denied","success" : false })
    }
   
}   