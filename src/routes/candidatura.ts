import { Router } from "express";
import { AppDataSource } from "../database/data-source";

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
const candidaturaRepository = new CandidaturaRepository(
  AppDataSource.getRepository(Candidatura)
);

const notificacaoRepository = new NotificacaoRepository(
  AppDataSource.getRepository(Notificacao)
);

/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/
const candidaturaService = new CandidaturaService(
  candidaturaRepository,
  notificacaoRepository
);

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
const controller = new CandidaturaController(candidaturaService);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// CRIAR
router.post("/", controller.criar);

// LISTAR (admin/debug)
router.get("/", controller.listar);

// DASHBOARD DO ALUNO (tem que vir antes do /:id)
router.get("/aluno/:alunoId", controller.dashboardAluno);

// BUSCAR POR VAGA (empresa)
router.get("/vaga/:vagaId", controller.buscarPorVaga);

// BUSCAR POR ID (sempre por último por causa do Express)
router.get("/:id", controller.buscar);

// ATUALIZAR STATUS
router.patch("/:id/status", controller.atualizarStatus);

export default router;