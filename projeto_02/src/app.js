import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

import { connBD } from "../../projeto_01/services/db.js";

await import("../../projeto_01/models/canal.js");
await import("../../projeto_01/models/video.js");
await import("../../projeto_01/models/playlist.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.get("/", (req, res) => res.send("API do Projeto 2 está no ar. Use /api/health"));
const allowed = (process.env.ALLOWED_ORIGINS || "").split(",").map(s=>s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(new Error("Origin not allowed by CORS"), false);
  },
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || "segredo",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000*60*60 }
}));

await connBD(process.env.MONGO_URL);

// Healthcheck
app.get("/api/health", (req, res)=>{
  res.json({ ok: true, user: req.session.user || null });
});

// 2) Só agora, depois dos models carregados, importamos as rotas dinamicamente
const { default: authRoutes } = await import("./routes/auth.js");
const { default: videoRoutes } = await import("./routes/videos.js");
const { default: playlistRoutes } = await import("./routes/playlists.js");
const { default: canalRoutes } = await import("./routes/canais.js");

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/canais", canalRoutes);

export default app;
