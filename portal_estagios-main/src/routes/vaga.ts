import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import autenticacao from "../middlewares/autenticacao";

import { Vaga } from "../models/Vaga";
import { VagaRepository } from "../repositories/VagaRepository";
import { VagaService } from "../services/VagaService";
import { VagaController } from "../controllers/VagaController";

const router = Router();

/*
|--------------------------------------------------------------------------
| Repository
|--------------------------------------------------------------------------
*/
const repo = new VagaRepository(
  AppDataSource.getRepository(Vaga)
);

/*
|--------------------------------------------------------------------------
| Service
|--------------------------------------------------------------------------
*/
const service = new VagaService(repo);

/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
*/
const controller = new VagaController(service);

/**
 * @swagger
 * tags:
 *   name: Vagas
 *   description: Gerenciamento de vagas de estágio
 */

/**
 * @swagger
 * /vagas:
 *   get:
 *     summary: Listar vagas
 *     tags: [Vagas]
 *     responses:
 *       200:
 *         description: Lista de vagas
 *
 *   post:
 *     summary: Criar vaga
 *     tags: [Vagas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Desenvolvedor Backend
 *               descricao:
 *                 type: string
 *                 example: Vaga para estágio em Node.js
 *               bolsa:
 *                 type: number
 *                 example: 1500
 *               local:
 *                 type: string
 *                 example: São Paulo - SP
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /vagas/{id}:
 *   get:
 *     summary: Buscar vaga por ID
 *     tags: [Vagas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vaga encontrada
 *       404:
 *         description: Vaga não encontrada
 *
 *   put:
 *     summary: Atualizar vaga
 *     tags: [Vagas]
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
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               bolsa:
 *                 type: number
 *               local:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vaga atualizada
 *       401:
 *         description: Não autorizado
 *
 *   delete:
 *     summary: Remover vaga
 *     tags: [Vagas]
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
 *         description: Vaga removida
 *       401:
 *         description: Não autorizado
 */

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Públicas
router.get("/", controller.listar);
router.get("/:id", controller.buscar);

// Empresa autenticada
router.post(
  "/",
  autenticacao,
  controller.criar
);

router.put(
  "/:id",
  autenticacao,
  controller.atualizar
);

router.delete(
  "/:id",
  autenticacao,
  controller.deletar
);

export default router;