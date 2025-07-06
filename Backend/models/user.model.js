import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["instructor", "student"],
    default: "student",
  },
  enrolledCourses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", 
        required: true,
      },
      status: {
        type: Boolean,
        default: false,
      },
    }
  ],

  emailMessages: [
    {
      subject: {
        type: String,
        required: true,
        default: "Invitation a new friends",
      },
      body: {
        type: String,
        required: true,
      },
      recipient: {
        type: String, // Assuming recipient is an email
        required: true,
      },
      
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ],
  message:[
    {
      subject: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      recipient: {
        type: String, // Assuming recipient is an email
        required: true,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ],

  photoUrl:{
    type:String,
    default:"",
  }

},{timestamps:true});

export const User = mongoose.model("User",userSchema)