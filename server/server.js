import express from "express"
import "dotenv/config"
import authRouter from "./routes/auth.routes.js";
import { connectToDb } from "./config/db.config.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({extended : true}))

app.get("/api/test", (req,res)=>{
    return res.json({"message" : "server is running fine"});
})

app.use("/api/auth", authRouter);




app.listen(PORT, ()=> {
    connectToDb();
    console.log("Server is running on port " + PORT)
})
