import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/mailer.js"; // Assuming you have a mailer utility set up
const router = express.Router();

router.route("/message").post(async (req, res) => {
    // console.log("Message received:", req.body)

    try{
        const { userId, subject, body, recipient} = req.body;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.message.push({
            subject,
            body,
            recipient,
            sender: user._id, // Assuming the sender is the logged-in user
        });
        await user.save();

        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });

    }catch(error){
        console.error("Error in message route:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
        
// router.route("/emails").post(async (req, res) => {
//     try {
//          const { userId , message , emails} = req.body;
//           console.log("Fetching emails for userId:", req.body);
//          const user = User.findById({_id:userId});

//       if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//      }
//         const emailMessages = emails.map(email => ({
//             subject: "Invitation to join",
//             body: message,
//             recipient: email,
//             sender: user._id, // Assuming the sender is the logged-in user
//         }));

//         user.emailMessages.push(...emailMessages);
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: "Emails sent successfully",
           
//         });
//     } catch (error) {
//         console.error("Error in sending emails:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// }
// );

router.route("/emails").post(async (req, res) => {
  const { userId, message, emails } = req.body;
//   console.log("Fetching emails for userId:", req.body);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const emailMessages = [];

    for (const email of emails) {
      // Send real email
      await sendEmail({
        to: email,
        subject: "Invitation to Join",
        text: message,
      });

      emailMessages.push({
        subject: "Invitation to join",
        body: message,
        recipient: email,
        sender: user._id,
      });
    }

    // Store sent emails in user's document
    user.emailMessages.push(...emailMessages);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Emails sent successfully",
      emails: emailMessages,
    });
  } catch (error) {
    console.error("Error in sending emails:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});


export default router;