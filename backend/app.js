import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import tradingRoutes from './routes/trading/tradingRoutes.js';
import { connectDB, sequelize } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/trading', tradingRoutes);

connectDB();
await sequelize.sync();

export default app;