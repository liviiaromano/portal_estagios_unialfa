import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Portal de Estágios API",
      version: "1.0.0",
      description:
        "API completa do Portal de Estágios com autenticação JWT, alunos, empresas, vagas, candidaturas, notificações e dashboards.",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        LoginRequest: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: {
              type: "string",
              example: "aluno@email.com",
            },
            senha: {
              type: "string",
              example: "123456",
            },
          },
        },

        LoginResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            usuario: {
              type: "object",
              example: {
                id: 1,
                nome: "João Silva",
                tipo: "ALUNO",
              },
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Erro de validação",
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    tags: [
      { name: "Autenticação" },
      { name: "Alunos" },
      { name: "Empresas" },
      { name: "Vagas" },
      { name: "Candidaturas" },
      { name: "Notificações" },
      { name: "Dashboard" },
    ],
  },

  apis: ["./src/routes/*.ts", "./src/routes/**/*.ts"],
});