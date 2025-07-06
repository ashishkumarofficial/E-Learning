import jwt from "jsonwebtoken";

export const generateToken =(res,user,message)=>{
    const token = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"5d"})
    return res
    .status(200)
    .cookie("token", token,{
        httpOnly:true ,
         sameSite:"strict",
          maxAge:(5*24*60*60*1000)// 5 days 
        }).json({
            success:true,
            message,
            user
        });
    
}

// maxAge:24*60*60*1000 for one day(1day)