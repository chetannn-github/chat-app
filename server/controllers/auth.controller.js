import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../generateToken.js";
import { isValidEmail } from "../utils/isValidEmail.js";
import { uploadImage } from "../config/cloudinary.config.js";


export const signup = async(req,res)=>{
    try {
        const {username,email,password} = req.body;

        if(!username || !password ||!email) {
            return res.json({message:"please fill all fields", "success" : false})
        }

        if(password.length < 6) {
            return res.json({message:"password is too short ", "success" : false})
        }

        let existingUser = await User.findOne({username});

        if(existingUser) {
            return res.json({message:"Arre bhai, username pehle hi booked hai! 😅", "success" : false})
        }

        existingUser = await User.findOne({email});
        if(existingUser) {
            return res.json({"message" : "user already exists","success" : false});
        }

        if(!isValidEmail(email)) {
            return res.json({"message" : "email is not valid","success" : false});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        const profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        const newUser = new User({email,username,password:hash,profilePic});
        await newUser.save();

        const token = generateToken(newUser.id);
        newUser.password = undefined;

        res.json({user : newUser,token,"success" : true})
    } catch (error) {
        console.log(error);
        return res.json({"message" : error.message,"success" : false});
    }
    
};

export const login = async(req,res) =>{
    try {
        let {username, password} = req.body;
        if(!username  || !password) {
            return res.json({"message" : "some fields are missing" , "success" : false});
        }

        const user = await User.findOne({username});
        // console.log(user);
        if(!user) {
            return res.json({"message" : "username or password is incorrect","success" : false});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        
        if(!isPasswordCorrect) {
            return res.json({"message" : "username or password is incorrect","success" : false});
        }
        
        const token = generateToken(user.id);
        user.password = undefined;
        // console.log(token);
        return res.json({user, token,"success" : true});

    } catch (error) {
        console.log(error);
        return res.json({"message" : "internal server error","success" : false});
    }
}


export const updateProfile = async(req,res) => {
    try {
        const {profilePic} = req.body;
        if(!profilePic) {
            return res.json({"message" : "profile image is missing" , "success" : false});
        }

        let {secure_url} = await uploadImage(profilePic);
        let updatedUser = await User.findByIdAndUpdate(req.user._id, {profilePic : secure_url}, {new : true})
        return res.json({user : updatedUser, "success" : true});

        
    } catch (error) {
        console.log(error);
        return res.json({"message" : "internal server error","success" : false});
    }

   
}

