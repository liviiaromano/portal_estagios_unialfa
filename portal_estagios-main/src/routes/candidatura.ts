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

/**
 * @swagger
 * tags:
 *   name: Candidaturas
 *   description: Gerenciamento de candidaturas
 */

/*
|--------------------------------------------------------------------------
| Todas as rotas exigem autenticação
|--------------------------------------------------------------------------
*/

router.use(autenticacao);

/**
 * @swagger
 * /candidaturas:
 *   post:
 *     summary: Criar candidatura
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vagaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Candidatura criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post(
  "/",
  controller.criar
);

/**
 * @swagger
 * /candidaturas:
 *   get:
 *     summary: Listar candidaturas
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de candidaturas
 */
router.get(
  "/",
  controller.listar
);

/**
 * @swagger
 * /candidaturas/dashboard/aluno:
 *   get:
 *     summary: Dashboard do aluno logado
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard retornado com sucesso
 */
router.get(
  "/dashboard/aluno",
  controller.dashboardAluno
);

/**
 * @swagger
 * /candidaturas/vaga/{vagaId}:
 *   get:
 *     summary: Buscar candidatos de uma vaga
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vagaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de candidatos da vaga
 */
router.get(
  "/vaga/:vagaId",
  controller.buscarPorVaga
);

/**
 * @swagger
 * /candidaturas/{id}:
 *   get:
 *     summary: Buscar candidatura por ID
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Candidatura encontrada
 *       404:
 *         description: Candidatura não encontrada
 */
router.get(
  "/:id",
  controller.buscar
);

/**
 * @swagger
 * /candidaturas/{id}/status:
 *   patch:
 *     summary: Atualizar status da candidatura
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: APROVADA
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       400:
 *         description: Status inválido
 */
router.patch(
  "/:id/status",
  controller.atualizarStatus
);

export default router;