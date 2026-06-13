import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import { Vaga } from "../models/Vaga";

import { VagaRepository } from "../repositories/VagaRepository";
import { VagaService } from "../services/VagaService";
import { VagaController } from "../controllers/VagaController";

const router = Router();

const repo = new VagaRepository(
  AppDataSource.getRepository(Vaga)
);

const service =
  new VagaService(repo);

const controller =
  new VagaController(service);

router.post("/", controller.criar);

router.get("/", controller.listar);

router.get("/:id", controller.buscar);

router.put("/:id", controller.atualizar);

router.delete("/:id", controller.deletar);

export default router;