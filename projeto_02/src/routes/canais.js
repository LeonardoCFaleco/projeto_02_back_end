import { Router } from "express";
import mongoose from "../../../projeto_01/node_modules/mongoose/index.js";
import Joi from "joi";
import { ensureAuth } from "../middleware/auth.js";

const CanalModel = mongoose.model("canal");
const router = Router();

const canalUpdate = Joi.object({
  nome: Joi.string().min(2).optional(),
  senha: Joi.string().min(3).optional()
}).min(1);

router.get("/me", ensureAuth, async (req, res) => {
  const user = await CanalModel.findById(req.session.user.id).select("-__v").exec();
  res.json(user);
});

router.put("/me", ensureAuth, async (req, res) => {
  const { error, value } = canalUpdate.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const updated = await CanalModel.findByIdAndUpdate(req.session.user.id, value, { new: true }).select("-__v").exec();
  res.json(updated);
});

router.delete("/me", ensureAuth, async (req, res) => {
  await CanalModel.findByIdAndDelete(req.session.user.id).exec();
  req.session.destroy(()=> res.json({ ok: true }));
});

export default router;
