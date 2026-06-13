import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import { Aluno } from "../models/Aluno";
import { Empresa } from "../models/Empresa";

import { AlunoRepository } from "../repositories/AlunoRepository";
import { EmpresaRepository } from "../repositories/EmpresaRepository";

import { SessionService } from "../services/SessionService";
import { SessionController } from "../controllers/SessionController";

const router = Router();

/*
|--------------------------------------------------------------------------
| Repositories
|--------------------------------------------------------------------------
*/

const alunoRepository = new AlunoRepository(
  AppDataSource.getRepository(Aluno)
);

const empresaRepository = new EmpresaRepository(
  AppDataSource.getRepository(Empresa)
);

/*
|--------------------------------------------------------------------------
| Service
|--------------------------------------------------------------------------
*/

const sessionService = new SessionService(
  alunoRepository,
  empresaRepository
);

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/

const sessionController = new SessionController(sessionService);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

router.post("/", sessionController.login);

export default router;