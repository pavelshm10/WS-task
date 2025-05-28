import express from "express";
import http from "http";
import cors from "cors";
import { setupWebSocket } from "./websocket";
import authRouter from "./routes/auth";

const app = express();
const PORT = 4000;

// CORS setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use("/api", authRouter);

const server = http.createServer(app);
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
