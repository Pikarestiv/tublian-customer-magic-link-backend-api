import redis from "../utils/redisClient";
import crypto from "crypto";

const OTP_EXPIRATION = process.env.OTP_EXPIRATION
  ? parseInt(process.env.OTP_EXPIRATION)
  : 600; // Default to OTP TTL 10 minutes if not set

export const generateOtp = async (email: string): Promise<string> => {
  const otp = crypto.randomInt(100000, 999999).toString();
  await redis.setex(`otp:${email}`, OTP_EXPIRATION, otp);
  return otp;
};

export const validateOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  const storedOtp = await redis.get(`otp:${email}`);
  return storedOtp === otp;
};

export const regenerateOtp = async (email: string): Promise<string> => {
  const otp = await redis.get(`otp:${email}`);
  if (otp) {
    return otp; // Return existing OTP if it exists
  } else {
    return generateOtp(email); // Generate a new OTP if it doesn't
  }
};
