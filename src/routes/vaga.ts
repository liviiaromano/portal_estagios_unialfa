import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import autenticacao from "../middlewares/autenticacao";

import { Vaga } from "../models/Vaga";
import { VagaRepository } from "../repositories/VagaRepository";
import { VagaService } from "../services/VagaService";
import { VagaController } from "../controllers/VagaController";

const router = Router();

/*
|--------------------------------------------------------------------------
| Repository
|--------------------------------------------------------------------------
*/
const repo = new VagaRepository(
  AppDataSource.getRepository(Vaga)
);

/*
|--------------------------------------------------------------------------
| Service
|--------------------------------------------------------------------------
*/
const service = new VagaService(repo);

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
const controller = new VagaController(service);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Públicas
router.get("/", controller.listar);
router.get("/:id", controller.buscar);

// Empresa autenticada
router.post(
  "/",
  autenticacao,
  controller.criar
);

router.put(
  "/:id",
  autenticacao,
  controller.atualizar
);

router.delete(
  "/:id",
  autenticacao,
  controller.deletar
);

export default router;