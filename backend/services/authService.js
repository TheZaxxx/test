import { User } from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const registerService = async (email, password) => {
  const exists = await User.findOne({ where: { email } });
  if (exists) return { error: "Email already used" };

  const hashed = await hashPassword(password);
  const user = await User.create({ email, password: hashed });
  return user;
};

export const loginService = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { error: "Email not found" };

  const match = await comparePassword(password, user.password);
  if (!match) return { error: "Wrong password" };

  const access = generateAccessToken({ id: user.id });
  const refresh = generateRefreshToken({ id: user.id });

  return { access, refresh };
};