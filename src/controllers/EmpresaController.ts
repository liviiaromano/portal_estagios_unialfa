import { Request, Response } from "express";
import { z } from "zod";
import { EmpresaService } from "../services/EmpresaService";

export class EmpresaController {
  constructor(private service: EmpresaService) {}

  private schema = z.object({
    nome: z.string(),
    email: z.string().email(),
    cnpj: z.string(),
    telefone: z.string().optional(),
  });

  // =========================
  // CRIAR EMPRESA
  // =========================
  criar = async (req: Request, res: Response) => {
    const data = this.schema.parse(req.body);

    const empresa = await this.service.criar(data);

    return res.status(201).json(empresa);
  };

  // =========================
  // LISTAR EMPRESAS
  // =========================
  listar = async (_req: Request, res: Response) => {
    const empresas = await this.service.listar();
    return res.json(empresas);
  };

  // =========================
  // BUSCAR POR ID
  // =========================
  buscar = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const empresa = await this.service.buscarPorId(id);

    return res.json(empresa);
  };

  // =========================
  // ATUALIZAR EMPRESA
  // =========================
  atualizar = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const empresa = await this.service.atualizar(id, req.body);

    return res.json(empresa);
  };

  // =========================
  // DELETAR EMPRESA
  // =========================
  deletar = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    await this.service.remover(id);

    return res.json({ message: "Empresa removida com sucesso" });
  };

  // =========================
  // APROVAR EMPRESA (ADMIN)
  // =========================
  aprovar = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const empresa = await this.service.aprovar(id);

    return res.json(empresa);
  };

  // =========================
  // BLOQUEAR EMPRESA (ADMIN)
  // =========================
  bloquear = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const empresa = await this.service.bloquear(id);

    return res.json(empresa);
  };
}