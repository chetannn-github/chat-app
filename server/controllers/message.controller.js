import { uploadImage } from "../config/cloudinary.config.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res) =>{
  try{
    let recieverId = req.params.id;
    let {text, image} = req.body;
    let myId = req.user._id;

    if(!text && !image) return res.json({success : false, error : "invalid message"});
    
    let imageURL  = image ? (await uploadImage(image))?.secure_url : null;
    let newMessage;

    if(!image) newMessage = new Message({text,senderId : myId,recieverId});
    else if (!text) newMessage = new Message({image : imageURL,senderId : myId,recieverId});
    else newMessage = new Message({image : imageURL,senderId : myId,text, recieverId});
    
    let conversation = await Conversation.findOne({
      participants:{$all:[myId,recieverId]}
    });

   

    if(!conversation){
        conversation = new Conversation({
            participants:[myId,recieverId],
        });
       
    } 
    conversation.messages.push(newMessage._id)
    await newMessage.save();
    await conversation.save();

    // await Promise.all([newMessage.save(),conversation.save()])

    return res.json({newMessage, success :true});


  }catch(err){
    console.log("error in sending message" + err.message);
    return res.status(500).json({error:"internal server error", success : false})
  }
}

export const getMessages= async(req,res) =>{
    try{
        let recieverId = req.params.id;
        let myId = req.user._id;
    
        let conversation = await Conversation.findOne({
            participants:{$all:[myId,recieverId]}
        }).populate("messages");
    
        
        if(!conversation){
          return res.status(200).json({allMessages : [], success : true});
        }
        return res.json({allMessages : conversation.messages, success : true});
    
    
      }catch(err){
        console.log("error in getting messages" + err.message);
        return res.status(500).json({error:"internal server error", success : false});
      }
}