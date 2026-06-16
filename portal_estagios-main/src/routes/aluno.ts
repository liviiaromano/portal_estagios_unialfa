import { Router } from "express";
import { AppDataSource } from "../database/data-source";

import { Aluno } from "../models/Aluno";

import { AlunoRepository } from "../repositories/AlunoRepository";
import { AlunoService } from "../services/AlunoService";
import { AlunoController } from "../controllers/AlunoController";

const router = Router();

const repo = new AlunoRepository(
  AppDataSource.getRepository(Aluno)
);

const service = new AlunoService(repo);

const controller =
  new AlunoController(service);

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gerenciamento de alunos
 */

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Criar aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *               curso:
 *                 type: string
 *                 example: Engenharia de Software
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *
 *   get:
 *     summary: Listar alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos
 */

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Buscar aluno por ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *
 *   put:
 *     summary: Atualizar aluno
 *     tags: [Alunos]
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
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               curso:
 *                 type: string
 *                 example: Engenharia de Software
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *
 *   delete:
 *     summary: Remover aluno
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Aluno removido
 */

/**
 * @swagger
 * /alunos/{id}/apto:
 *   patch:
 *     summary: Marcar aluno como apto para estágio
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno marcado como apto
 */

/**
 * @swagger
 * /alunos/{id}/inapto:
 *   patch:
 *     summary: Marcar aluno como inapto para estágio
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno marcado como inapto
 */

router.post("/", controller.criar);

router.get("/", controller.listar);

router.get("/:id", controller.buscar);

router.put("/:id", controller.atualizar);

router.delete("/:id", controller.deletar);

router.patch(
  "/:id/apto",
  controller.marcarApto
);

router.patch(
  "/:id/inapto",
  controller.marcarInapto
);

export default router;