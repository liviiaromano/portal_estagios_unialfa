import "reflect-metadata";
import "dotenv/config";

import express, {
  NextFunction,
  Request,
  Response,
} from "express";

import cors from "cors";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import AppError from "./utils/AppError";
import { ZodError } from "zod";
import { AppDataSource } from "./database/data-source";
import { swaggerSpec } from "./docs/swagger";

const app = express();
const PORT = process.env.PORT || 3000;

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/
app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| Swagger
|--------------------------------------------------------------------------
*/
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,

    customSiteTitle: "Portal de Estágios API",

    customCss: `
      .swagger-ui .topbar {
        display: none;
      }

      .swagger-ui .info {
        margin-bottom: 20px;
      }

      .swagger-ui .scheme-container {
        padding: 10px;
        border-radius: 8px;
      }
    `,

    swaggerOptions: {
      persistAuthorization: true, // 🔥 mantém token após login
      filter: true,
      docExpansion: "list",
      displayRequestDuration: true,
      defaultModelsExpandDepth: 1,
    },
  })
);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/
app.use(routes);

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/
app.use(
  (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        issues: error.format(),
      });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Erro interno do servidor",
    });
  }
);

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
AppDataSource.initialize()
  .then(() => {
    console.info("Database connection is ready");

    app.listen(Number(PORT), () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Falha na conexão TypeORM:", err);
    process.exit(1);
  });