import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import autenticacao from "../middlewares/autenticacao";
import { Candidatura } from "../models/Candidatura";
import { CandidaturaRepository } from "../repositories/CandidaturaRepository";
import { DashboardAlunoService } from "../services/DashboardAlunoService";
import { DashboardAlunoController } from "../controllers/DashboardAlunoController";

const router = Router();

/*
|--------------------------------------------------------------------------
| Repository
|--------------------------------------------------------------------------
*/
const candidaturaRepo = new CandidaturaRepository(
  AppDataSource.getRepository(Candidatura)
);

/*
|--------------------------------------------------------------------------
| Service
|--------------------------------------------------------------------------
*/
const dashboardService = new DashboardAlunoService(candidaturaRepo);

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
const controller = new DashboardAlunoController(dashboardService);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// dashboard do aluno (protegido)
router.get(
  "/aluno",
  autenticacao,
  controller.getDashboard
);

export default router;