import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import autenticacao from "../middlewares/autenticacao";

import { Candidatura } from "../models/Candidatura";
import { Notificacao } from "../models/Notificacao";

import { CandidaturaRepository } from "../repositories/CandidaturaRepository";
import { NotificacaoRepository } from "../repositories/NotificacaoRepository";

import { CandidaturaService } from "../services/CandidaturaService";
import { CandidaturaController } from "../controllers/CandidaturaController";

const router = Router();

/*
|--------------------------------------------------------------------------
| Repositories
|--------------------------------------------------------------------------
*/
const candidaturaRepository =
  new CandidaturaRepository(
    AppDataSource.getRepository(Candidatura)
  );

const notificacaoRepository =
  new NotificacaoRepository(
    AppDataSource.getRepository(Notificacao)
  );

/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/
const candidaturaService =
  new CandidaturaService(
    candidaturaRepository,
    notificacaoRepository
  );

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
const controller =
  new CandidaturaController(
    candidaturaService
  );

/*
|--------------------------------------------------------------------------
| Todas as rotas exigem autenticação
|--------------------------------------------------------------------------
*/
router.use(autenticacao);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Criar candidatura
router.post(
  "/",
  controller.criar
);

// Listar todas
router.get(
  "/",
  controller.listar
);

// Dashboard do aluno logado
router.get(
  "/dashboard/aluno",
  controller.dashboardAluno
);

// Buscar candidatos de uma vaga
router.get(
  "/vaga/:vagaId",
  controller.buscarPorVaga
);

// Buscar candidatura por ID
router.get(
  "/:id",
  controller.buscar
);

// Alterar status
router.patch(
  "/:id/status",
  controller.atualizarStatus
);

export default router;