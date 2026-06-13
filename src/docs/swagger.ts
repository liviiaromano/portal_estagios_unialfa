import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec =
  swaggerJsdoc({
    definition: {
      openapi: "3.0.0",

      info: {
        title:
          "Portal de Estágios API",

        version: "1.0.0",

        description:
          "API do Hackathon Portal de Estágios",
      },

      servers: [
        {
          url:
            "http://localhost:3000",
        },
      ],
    },

    apis: [],
  });