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

router.use(autenticacao);

/**
 * @swagger
 * tags:
 *   name: Notificações
 *   description: Sistema de notificações dos usuários
 */

/**
 * @swagger
 * /notificacoes/aluno/{id}:
 *   get:
 *     summary: Listar notificações de um aluno
 *     tags: [Notificações]
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
 *         description: Lista de notificações
 */
router.get(
  "/aluno/:id",
  controller.listarPorAluno
);

/**
 * @swagger
 * /notificacoes/{id}:
 *   get:
 *     summary: Buscar notificação por ID
 *     tags: [Notificações]
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
 *         description: Notificação encontrada
 *       404:
 *         description: Não encontrada
 */
router.get(
  "/:id",
  controller.buscar
);

/**
 * @swagger
 * /notificacoes/{id}/lida:
 *   patch:
 *     summary: Marcar notificação como lida
 *     tags: [Notificações]
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
 *         description: Notificação marcada como lida
 */
router.patch(
  "/:id/lida",
  controller.marcarComoLida
);

/**
 * @swagger
 * /notificacoes/{id}:
 *   delete:
 *     summary: Remover notificação
 *     tags: [Notificações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Notificação removida
 */
router.delete(
  "/:id",
  controller.deletar
);

export default router;