import { Boom } from "@hapi/boom";
import { ErrorRequestHandler } from "express";
import { logger } from "../config";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

/**
 * Middleware para loggear los errores
 * @param err objeto de error
 * @param req requesst
 * @param res response
 * @param next siguiente handler
 */
const logErrores: ErrorRequestHandler = (err: Error, req, res, next) => {
  logger.error(err);
  next(err);
};

/**
 * Middleware para atrapar los errores de boom (manejados por el servidor)
 */
const boomErrorHandler: ErrorRequestHandler = (err: Boom, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

/**
 * Middleware para atrapar los errores de prisma
 */
const prismaClientValidationErrorHandler: ErrorRequestHandler = (
  err: Error,
  req,
  res,
  next
) => {
  if (err instanceof PrismaClientValidationError) {
    const { name, message } = err;
    res.status(400).json({ errorType: "¡Error de prisma!", name, message });
  } else {
    next(err);
  }
};

/**
 * MIddleware para atrapar los errores del servidor
 */
const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

export {
  logErrores,
  errorHandler,
  prismaClientValidationErrorHandler,
  boomErrorHandler,
};
