import { Request, Response } from "express";
import { z } from "zod";
import { EmpresaService } from "../services/EmpresaService";

export class EmpresaController {
  constructor(private service: EmpresaService) {}

  private createSchema = z.object({
    nome: z.string().min(3),
  email: z.string().email(),
  cnpj: z.string().min(14),
  senha: z.string().min(6),
  telefone: z.string().optional(),
  });

  private updateSchema =
    this.createSchema.partial();

  criar = async (
    req: Request,
    res: Response
  ) => {
    const data =
      this.createSchema.parse(
        req.body
      );

    const empresa =
      await this.service.criar(
        data
      );

    return res.status(201).json(
      empresa
    );
  };

  listar = async (
    _req: Request,
    res: Response
  ) => {
    const empresas =
      await this.service.listar();

    return res.json(empresas);
  };

  buscar = async (
    req: Request,
    res: Response
  ) => {
    const id = Number(
      req.params.id
    );

    const empresa =
      await this.service.buscarPorId(
        id
      );

    return res.json(empresa);
  };

  atualizar = async (
    req: Request,
    res: Response
  ) => {
    const id = Number(
      req.params.id
    );

    const data =
      this.updateSchema.parse(
        req.body
      );

    const empresa =
      await this.service.atualizar(
        id,
        data
      );

    return res.json(empresa);
  };

  deletar = async (
    req: Request,
    res: Response
  ) => {
    const id = Number(
      req.params.id
    );

    await this.service.remover(id);

    return res.json({
      message:
        "Empresa removida com sucesso",
    });
  };

  aprovar = async (
    req: Request,
    res: Response
  ) => {
    const id = Number(
      req.params.id
    );

    const empresa =
      await this.service.aprovar(
        id
      );

    return res.json(empresa);
  };

  bloquear = async (
    req: Request,
    res: Response
  ) => {
    const id = Number(
      req.params.id
    );

    const empresa =
      await this.service.bloquear(
        id
      );

    return res.json(empresa);
  };
}