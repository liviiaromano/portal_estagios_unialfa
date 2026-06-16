import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import { Empresa } from "../models/Empresa";
import { EmpresaRepository } from "../repositories/EmpresaRepository";
import { EmpresaService } from "../services/EmpresaService";
import { EmpresaController } from "../controllers/EmpresaController";

const router = Router();

const repo = new EmpresaRepository(
  AppDataSource.getRepository(Empresa)
);

const service = new EmpresaService(repo);

const controller =
  new EmpresaController(service);

/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Gerenciamento de empresas
 */

/**
 * @swagger
 * /empresas:
 *   post:
 *     summary: Criar empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cnpj
 *               - email
 *               - telefone
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Tech Solutions LTDA
 *               cnpj:
 *                 type: string
 *                 example: 12.345.678/0001-99
 *               email:
 *                 type: string
 *                 example: contato@tech.com
 *               telefone:
 *                 type: string
 *                 example: 11999999999
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Empresa criada com sucesso
 *
 *   get:
 *     summary: Listar empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Lista de empresas
 */

/**
 * @swagger
 * /empresas/{id}:
 *   get:
 *     summary: Buscar empresa por ID
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empresa encontrada
 *
 *   put:
 *     summary: Atualizar empresa
 *     tags: [Empresas]
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
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa atualizada
 *
 *   delete:
 *     summary: Remover empresa
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Empresa removida
 */

router.post("/", controller.criar);

router.get("/", controller.listar);

router.get("/:id", controller.buscar);

router.put("/:id", controller.atualizar);

router.delete("/:id", controller.deletar);

export default router;