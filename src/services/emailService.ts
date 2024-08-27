// src/services/emailService.ts
import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT, // or 465 if using SSL
//   secure: process.env.SMTP_SECURE === "true",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// } as nodemailer.TransportOptions);

export const sendOtpEmail = async (email: string, otp: string) => {
  console.log("🚀 ~ sendOtpEmail ~ otp:", otp)
  
  // await transporter.sendMail({
  //   from: process.env.EMAIL_USER,
  //   to: email,
  //   subject: "Your OTP Code",
  //   text: `Your OTP code is ${otp}`,
  // });
};
