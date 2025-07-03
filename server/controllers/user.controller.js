import User from "../models/user.model.js"


export const getAllUsers = async(req,res) =>{
    try{
        let loggedInUserId = req.user._id;
        let allUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.json({success : true , allUsers});

    }catch(err){
        console.log(error);
        return res.json({"message" : "internal server error","success" : false});
    }
}