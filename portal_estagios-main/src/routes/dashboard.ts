import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import autenticacao from "../middlewares/autenticacao";

import { Candidatura } from "../models/Candidatura";
import { Vaga } from "../models/Vaga";

import { CandidaturaRepository } from "../repositories/CandidaturaRepository";
import { VagaRepository } from "../repositories/VagaRepository";

import { DashboardAlunoService } from "../services/DashboardAlunoService";
import { DashboardEmpresaService } from "../services/DashboardEmpresaService";

import { DashboardAlunoController } from "../controllers/DashboardAlunoController";
import { DashboardEmpresaController } from "../controllers/DashboardEmpresaController";

const router = Router();

/*
|--------------------------------------------------------------------------
| Repositories
|--------------------------------------------------------------------------
*/
const candidaturaRepo = new CandidaturaRepository(
  AppDataSource.getRepository(Candidatura)
);

const vagaRepo = new VagaRepository(
  AppDataSource.getRepository(Vaga)
);

/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/
const dashboardAlunoService = new DashboardAlunoService(candidaturaRepo);

const dashboardEmpresaService = new DashboardEmpresaService(
  vagaRepo,
  candidaturaRepo
);

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
*/
const dashboardAlunoController = new DashboardAlunoController(
  dashboardAlunoService
);

const dashboardEmpresaController = new DashboardEmpresaController(
  dashboardEmpresaService
);

/*
|--------------------------------------------------------------------------
| Swagger Tags
|--------------------------------------------------------------------------
*/
/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Indicadores e métricas do sistema
 */

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

/**
 * @swagger
 * /dashboard/aluno:
 *   get:
 *     summary: Dashboard do aluno
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do dashboard do aluno
 *       401:
 *         description: Não autorizado
 */
router.get(
  "/aluno",
  autenticacao,
  dashboardAlunoController.getDashboard
);

/**
 * @swagger
 * /dashboard/empresa:
 *   get:
 *     summary: Dashboard da empresa
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do dashboard da empresa
 *       401:
 *         description: Não autorizado
 */
router.get(
  "/empresa",
  autenticacao,
  dashboardEmpresaController.getDashboard
);

export default router;