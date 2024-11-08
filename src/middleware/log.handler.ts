import { NextFunction, Request, RequestHandler, Response } from "express";
import { logger } from "../config";
import boom from "@hapi/boom";

export const logInitHandler: RequestHandler = (req, res, next) => {
  logger.info(`PETICION INICIADA... | ${req.path}`);
  next();
};

export const logOutputHandler = (
  req: Request,
  res: Response & { json: any },
  next: NextFunction
) => {
  const originalJson = res.json;

  res.json = function (body) {
    if (res.statusCode < 400) {
      logger.info(`PETICION FINALIZADA | STATUS CODE ${res.statusCode}`);
    } else {
      logger.error(`ALGO SALIO MAL | STATUS CODE ${res.statusCode}`);
    }
    originalJson.call(this, body);
  };

  next();
};

export const notFoundLogHandler: RequestHandler = (req, res, next) => {
  if (!req.route) {
    logger.error("LA RUTA NO EXISTE | STATUS CODE 404");
    throw boom.notFound();
  }
  next();
};
