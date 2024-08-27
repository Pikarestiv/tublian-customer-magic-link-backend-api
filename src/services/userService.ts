import dotenv from "dotenv";
import redis from "../utils/redisClient";

dotenv.config();

export const saveUser = async (userData: {
  name: string;
  email: string;
  companyName: string;
}) => {
  await redis.hset(`user:${userData.email}`, userData);
};

export const userExists = async (email: string): Promise<boolean> => {
  const user = await redis.hgetall(`user:${email}`);
  return Object.keys(user).length > 0;
};
