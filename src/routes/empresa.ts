import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import { Empresa } from "../models/Empresa";
import { EmpresaRepository } from "../repositories/EmpresaRepository";
import { EmpresaService } from "../services/EmpresaService";
import { EmpresaController } from "../controllers/EmpresaController";

const router = Router();

const repo = new EmpresaRepository(AppDataSource.getRepository(Empresa));
const service = new EmpresaService(repo);
const controller = new EmpresaController(service);

router.post("/", controller.criar);
router.get("/", controller.listar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

export default router;