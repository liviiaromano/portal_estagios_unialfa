import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import { Aluno } from "../models/Aluno";

import { AlunoRepository } from "../repositories/AlunoRepository";
import { AlunoService } from "../services/AlunoService";
import { AlunoController } from "../controllers/AlunoController";

const router = Router();

const repo = new AlunoRepository(
  AppDataSource.getRepository(Aluno)
);

const service = new AlunoService(repo);

const controller =
  new AlunoController(service);

router.post("/", controller.criar);

router.get("/", controller.listar);

router.get("/:id", controller.buscar);

router.put("/:id", controller.atualizar);

router.delete("/:id", controller.deletar);

/*
|--------------------------------------------------------------------------
| Elegibilidade para estágio
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/apto",
  controller.marcarApto
);

router.patch(
  "/:id/inapto",
  controller.marcarInapto
);

export default router;