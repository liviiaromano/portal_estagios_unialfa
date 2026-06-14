import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import autenticacao from "../middlewares/autenticacao";

import { Notificacao } from "../models/Notificacao";
import { NotificacaoRepository } from "../repositories/NotificacaoRepository";
import { NotificacaoService } from "../services/NotificacaoService";
import { NotificacaoController } from "../controllers/NotificacaoController";

const router = Router();

/*
|--------------------------------------------------------------------------
| Repository
|--------------------------------------------------------------------------
*/
const repo = new NotificacaoRepository(
  AppDataSource.getRepository(Notificacao)
);

/*
|--------------------------------------------------------------------------
| Service
|--------------------------------------------------------------------------
*/
const service = new NotificacaoService(repo);

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
const controller = new NotificacaoController(service);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Todas as rotas exigem autenticação
router.use(autenticacao);

router.get(
  "/aluno/:id",
  controller.listarPorAluno
);

router.get(
  "/:id",
  controller.buscar
);

router.patch(
  "/:id/lida",
  controller.marcarComoLida
);

router.delete(
  "/:id",
  controller.deletar
);

export default router;