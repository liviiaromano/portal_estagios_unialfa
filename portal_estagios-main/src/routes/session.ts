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
const sessionController = new SessionController(
  sessionService
);

/*
|--------------------------------------------------------------------------
| Swagger Tags
|--------------------------------------------------------------------------
*/
/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login de alunos e empresas
 */

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Realizar login (Aluno ou Empresa)
 *     tags: [Autenticação]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: aluno@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: 1
 *                 nome: João Silva
 *                 email: joao@email.com
 *                 tipo: aluno
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             example:
 *               message: Credenciais inválidas
 */

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
router.post("/", sessionController.login);

export default router;