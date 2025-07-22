// utils/mailer.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your gmail
    pass: process.env.GMAIL_PASS, // your app password
  },
});

export const sendEmail = async ({ to, subject, text }) => {
  await transporter.sendMail({
    from: `"EduLearn Pvt ltd" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
