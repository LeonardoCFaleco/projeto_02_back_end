import { Router } from "express";
import mongoose from "../../../projeto_01/node_modules/mongoose/index.js";
import Joi from "joi";
import { ensureAuth } from "../middleware/auth.js";

const VideoModel = mongoose.model("video");
const CanalModel = mongoose.model("canal");
const router = Router();

const videoSchema = Joi.object({
  titulo: Joi.string().min(1).required(),
  descricao: Joi.string().min(1).required(),
  duracao: Joi.number().integer().min(1).required(),
  canal: Joi.string().hex().length(24).optional()
});

router.get("/", ensureAuth, async (req, res) => {
  try {
    const videos = await VideoModel.find().populate("canal","nome").exec();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Falha ao buscar vídeos" });
  }
});

router.post("/", ensureAuth, async (req, res) => {
  const { error, value } = videoSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  try {
    const canalId = value.canal || req.session.user.id;
    const canal = await CanalModel.findById(canalId).exec();
    if(!canal) return res.status(400).json({ error: "Canal inválido" });
    const created = await VideoModel.create({ ...value, canal: canalId });
    const populated = await VideoModel.findById(created._id).populate("canal","nome").exec();
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: "Falha ao criar vídeo" });
  }
});

router.get("/:id", ensureAuth, async (req, res) => {
  try {
    const v = await VideoModel.findById(req.params.id).populate("canal","nome").exec();
    if(!v) return res.status(404).json({ error: "Vídeo não encontrado" });
    res.json(v);
  } catch (err) {
    res.status(500).json({ error: "Falha ao buscar vídeo" });
  }
});

router.put("/:id", ensureAuth, async (req, res) => {
  const { error, value } = videoSchema.min(1).validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  try {
    const v = await VideoModel.findByIdAndUpdate(req.params.id, value, { new: true })
      .populate("canal","nome")
      .exec();
    if(!v) return res.status(404).json({ error: "Vídeo não encontrado" });
    res.json(v);
  } catch (err) {
    res.status(500).json({ error: "Falha ao atualizar vídeo" });
  }
});

router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const v = await VideoModel.findByIdAndDelete(req.params.id).exec();
    if(!v) return res.status(404).json({ error: "Vídeo não encontrado" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Falha ao deletar vídeo" });
  }
});

export default router;
