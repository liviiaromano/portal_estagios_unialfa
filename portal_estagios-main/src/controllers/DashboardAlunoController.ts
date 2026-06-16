import { Request, Response, NextFunction } from "express";
import { DashboardAlunoService } from "../services/DashboardAlunoService";

export class DashboardAlunoController {
  constructor(private service: DashboardAlunoService) {}

  getDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const usuario = req.usuario;

      if (!usuario) {
        return res.status(401).json({
          message: "Usuário não autenticado",
        });
      }

      const dashboard = await this.service.getDashboard(usuario.id);

      return res.json(dashboard);
    } catch (error) {
      next(error);
    }
  };
}