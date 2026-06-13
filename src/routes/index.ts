import { Router } from "express";

import alunoRoutes from "./aluno";
import empresaRoutes from "./empresa";
import vagaRoutes from "./vaga";
import candidaturaRoutes from "./candidatura";
import sessionRoutes from "./session";
import notificacaoRoutes from "./notificacao";
import dashboardRoutes from "./dashboard";

const routes = Router();

/*
|--------------------------------------------------------------------------
| Autenticação
|--------------------------------------------------------------------------
*/

routes.use(
  "/sessions",
  sessionRoutes
);

/*
|--------------------------------------------------------------------------
| Recursos
|--------------------------------------------------------------------------
*/

routes.use(
  "/alunos",
  alunoRoutes
);

routes.use(
  "/empresas",
  empresaRoutes
);

routes.use(
  "/vagas",
  vagaRoutes
);

routes.use(
  "/candidaturas",
  candidaturaRoutes
);

routes.use(
  "/notificacoes",
  notificacaoRoutes
);

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

routes.use(
  "/dashboard",
  dashboardRoutes
);

export default routes;