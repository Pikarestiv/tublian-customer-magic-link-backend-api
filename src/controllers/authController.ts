import { Request, Response } from "express";
import {
  generateOtp,
  validateOtp,
  regenerateOtp,
} from "../services/otpService";
import { saveUser, userExists } from "../services/userService";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../services/emailService";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const initiateRegistration = async (req: Request, res: Response) => {
  const { name, email, companyName } = req.body;

  // If only e-mail should be unique
  if (await userExists(email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const otp = await generateOtp(email);

  await sendOtpEmail(email, otp);

  res.status(200).json({ message: "OTP sent to email", otp });
};

export const completeRegistration = async (req: Request, res: Response) => {
  const { email, otp, name, companyName } = req.body;

  if (await validateOtp(email, otp)) {
    await saveUser({ name, email, companyName });

    // Consider tweaking expiration
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "User registered successfully", token });
  } else {
    res.status(400).json({ message: "Invalid or expired OTP" });
  }
};

export const initiateLogin = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!(await userExists(email))) {
    return res.status(400).json({ message: "User not registered" });
  }

  const otp = await regenerateOtp(email);

  await sendOtpEmail(email, otp);

  res.status(200).json({ message: "OTP sent to email", otp });
};

export const completeLogin = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (await validateOtp(email, otp)) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "User logged in successfully", token });
  } else {
    res.status(400).json({ message: "Invalid or expired OTP" });
  }
};

export const resendOtpEndpoint = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!(await userExists(email))) {
    return res.status(400).json({ message: "User not registered" });
  }

  const otp = await regenerateOtp(email);

  await sendOtpEmail(email, otp);

  res.status(200).json({ message: "OTP resent to email", otp });
};
