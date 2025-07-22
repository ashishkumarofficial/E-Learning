import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js";
import paymentRoute from "./routes/paymentRoute.js";
import courseProgressRoute from "./routes/courseProgress.route.js"

import purchaseRoute from "./routes/purchaseCourse.route.js"
import path from "path";
import messageRouter from "./routes/message.route.js";
dotenv.config({})

// ? call database connection here
connectDB();

const app  = express();
const PORT =process.env.PORT || 3000;
const _dirname= path.resolve();



app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(cors({
    origin:`https://e-learning-09sw.onrender.com`,
    // origin:"http://localhost:5173",
    credentials:true,
}))


app.use("/api/v1/media",mediaRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/messages",messageRouter);
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/payment",paymentRoute)
app.use("/api/v1/purchase",purchaseRoute)
app.use("/api/v1/progress",courseProgressRoute)

 
app.use(express.static(path.join(_dirname,"/Frontend/dist")))

app.get("*",(_,res)=>{
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"))
})

app.listen(PORT,()=>{
    // console.log(process.env.PORT); 
    console.log(`the server is running on http://localhost:${PORT}`);
})




// Note: The following line is commented out as it is not needed for the current setup.
// It was used to install dependencies and build the frontend, which is now handled separately.
//  "build": "npm install && npm install --prefix Frontend && npm run build --prefix Frontend"
