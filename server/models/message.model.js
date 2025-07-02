import mongoose from "mongoose"


const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true,
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true,
    },
    image : {
        type : String,
        default : "",
    },
    text : {
        type : String,
        default : "",
    }
},{timestamps : true});


const Message = mongoose.model("Message", messageSchema);
export default Message;