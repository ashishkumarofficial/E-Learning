// //! this file not use any where in that time

import { User } from "../models/user.model.js";

export const getAllpayment = async(req,res)=>{
    try{
       const users = await User.find({}).populate("enrolledCourses.courseId")
       return res.status(200).json({
           users
        })
    
    }catch(error){
        console.log("error",error)
    }
   
}