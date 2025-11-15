import { Router } from "express";
import mongoose from "../../../projeto_01/node_modules/mongoose/index.js";
import Joi from "joi";
import { ensureAuth } from "../middleware/auth.js";

const PlaylistModel = mongoose.model("playlist");
const router = Router();

const playlistSchema = Joi.object({
  titulo: Joi.string().min(1).required(),
  descricao: Joi.string().allow("").optional()
});

router.get("/", ensureAuth, async (req, res) => {
  try {
    const all = await PlaylistModel.find({ canal: req.session.user.id }).populate("videos").exec();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "Falha ao buscar playlists" });
  }
});

router.post("/", ensureAuth, async (req, res) => {
  const { error, value } = playlistSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  try {
    const created = await PlaylistModel.create({ ...value, canal: req.session.user.id, videos: [] });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Falha ao criar playlist" });
  }
});

router.get("/:id", ensureAuth, async (req, res) => {
  try {
    const p = await PlaylistModel.findOne({ _id: req.params.id, canal: req.session.user.id })
      .populate({ path: "videos", populate: { path: "canal", select: "nome" } })
      .exec();
    if(!p) return res.status(404).json({ error: "Playlist não encontrada" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: "Falha ao buscar playlist" });
  }
});

router.put("/:id", ensureAuth, async (req, res) => {
  const { error, value } = playlistSchema.min(1).validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  try {
    const p = await PlaylistModel.findOneAndUpdate({ _id: req.params.id, canal: req.session.user.id }, value, { new: true }).exec();
    if(!p) return res.status(404).json({ error: "Playlist não encontrada" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: "Falha ao atualizar playlist" });
  }
});

router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const p = await PlaylistModel.findOneAndDelete({ _id: req.params.id, canal: req.session.user.id }).exec();
    if(!p) return res.status(404).json({ error: "Playlist não encontrada" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Falha ao deletar playlist" });
  }
});

router.post("/:id/videos/:videoId", ensureAuth, async (req, res) => {
  try {
    const p = await PlaylistModel.findOneAndUpdate(
      { _id: req.params.id, canal: req.session.user.id },
      { $addToSet: { videos: req.params.videoId } },
      { new: true }
    ).populate("videos").exec();
    if(!p) return res.status(404).json({ error: "Playlist não encontrada" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: "Falha ao adicionar vídeo na playlist" });
  }
});

router.delete("/:id/videos/:videoId", ensureAuth, async (req, res) => {
  try {
    const p = await PlaylistModel.findOneAndUpdate(
      { _id: req.params.id, canal: req.session.user.id },
      { $pull: { videos: req.params.videoId } },
      { new: true }
    ).populate("videos").exec();
    if(!p) return res.status(404).json({ error: "Playlist não encontrada" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: "Falha ao remover vídeo da playlist" });
  }
});

export default router;
