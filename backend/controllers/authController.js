import { registerService, loginService } from "../services/authService.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const result = await registerService(email, password);
  if (result.error) return res.status(400).json({ error: result.error });

  res.json({ message: "Register success" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);
  if (result.error) return res.status(400).json({ error: result.error });

  res.json(result);
};