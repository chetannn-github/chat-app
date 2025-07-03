import mongoose from "mongoose"


const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true,
    },
    recieverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true,
    },
    image : {
        type : String,
        default : null
    },
    text : {
        type : String,
        default : null
    }
},{timestamps : true});


const Message = mongoose.model("Message", messageSchema);
export default Message;