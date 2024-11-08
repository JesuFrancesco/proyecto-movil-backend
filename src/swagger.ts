import swaggerJsdoc, { Options } from "swagger-jsdoc";

// swagger docs
const options = {
  apis: ["./router/index.ts"],
  basePath: "/",
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Jiron Anime API",
      description:
        "API de Jiron Anime, recuerda usar los endpoints con /api/v1",
    },
  },
} satisfies Options;

export const specs = swaggerJsdoc(options);
