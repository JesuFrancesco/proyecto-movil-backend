import { specs } from "./swagger";
import API_ROUTER from "./router";
import swaggerUi from "swagger-ui-express";
import express from "express";
import cors from "cors";
import {
  errorHandler,
  logErrores,
  prismaClientValidationErrorHandler,
  boomErrorHandler,
} from "./middleware/error.handler";
import { createClient } from "@supabase/supabase-js";

import { config } from "./config";
import {
  logInitHandler,
  logOutputHandler,
  notFoundLogHandler,
} from "./middleware/log.handler";

const API_PREFIX = "/api/v1";

// supabase anon client
export const sb = createClient(config.supabaseURL, config.supabaseAnonKey);

const app = express();

// == Swagger definition
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// == Logger | peticion
app.use(logInitHandler);
app.use(logOutputHandler);

// == Express JSON Middleware
app.use(express.json());
app.use(
  cors({
    origin: config.originAddress,
    optionsSuccessStatus: 200,
  })
);

// == Prisma Express Router
app.use(API_PREFIX, API_ROUTER);

// Logger: ruta no existe
app.use(notFoundLogHandler);

// == Custom middleware
app.use(boomErrorHandler);
app.use(prismaClientValidationErrorHandler);
app.use(logErrores);
app.use(errorHandler);

export default app;
