import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import { Notificacao } from "../models/Notificacao";

import { NotificacaoRepository } from "../repositories/NotificacaoRepository";
import { NotificacaoService } from "../services/NotificacaoService";
import { NotificacaoController } from "../controllers/NotificacaoController";

const router = Router();

const repo =
  new NotificacaoRepository(
    AppDataSource.getRepository(
      Notificacao
    )
  );

const service =
  new NotificacaoService(repo);

const controller =
  new NotificacaoController(
    service
  );

router.get(
  "/aluno/:id",
  controller.listarPorAluno
);

router.patch(
  "/:id/lida",
  controller.marcarComoLida
);

export default router;