import boom from "@hapi/boom";
import { RequestHandler } from "express";
import { ObjectSchema } from "joi";

/**
 * Función de primer orden que genera una validador de esquemas
 * @param schema JOI esquema a validar
 * @param property propiedad de donde viene la data
 * @returns función de segundo orden que validará la data
 */
export const validatorHandler = (
  schema: ObjectSchema,
  property: "body" | "params" | "query"
): RequestHandler => {
  return (req, res, next) => {
    const data = req[property as keyof typeof req];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
};
