import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
         mongoose.set("debug",true);
        console.log("mongoDB is connected");
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;