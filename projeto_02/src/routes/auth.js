import { Router } from "express";
import mongoose from "../../../projeto_01/node_modules/mongoose/index.js";
import Joi from "joi";

const CanalModel = mongoose.model("canal");
const router = Router();

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().min(3).required()
});

const registerSchema = Joi.object({
  nome: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(3).required()
});

router.post("/register", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  try {
    const exists = await CanalModel.findOne({ email: value.email }).exec();
    if (exists) return res.status(409).json({ error: "E-mail já cadastrado" });
    const canal = await CanalModel.create(value);
    return res.status(201).json({ id: canal._id, nome: canal.nome, email: canal.email });
  } catch (err) {
    return res.status(500).json({ error: "Falha ao registrar" });
  }
});

router.post("/login", async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  try {
    const canal = await CanalModel.findOne({ email: value.email, senha: value.senha }).exec();
    if (!canal) return res.status(401).json({ error: "Credenciais inválidas" });
    req.session.user = { id: canal._id, nome: canal.nome, email: canal.email };
    return res.json({ message: "Autenticado", user: req.session.user });
  } catch (err) {
    return res.status(500).json({ error: "Falha no login" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(()=> res.json({ ok: true }));
});

router.get("/me", (req, res) => res.json({ user: req.session.user || null }));

export default router;
