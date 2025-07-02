import mongoose from "mongoose";
import  "dotenv/config";

async function makeConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to db")
    } catch (error) {
        console.log("error in connecting to db")
    }
}

export const connectToDb = () =>{
    makeConnection().catch(err => console.log(err));
}
