import { RequestHandler } from "express";
import { sb } from "../app";
import boom from "@hapi/boom";

export const authHandler: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = req.headers["refreshtoken"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (refreshToken && accessToken) {
    sb.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken as string,
    });

    // TODO: lógica de validacion de ids
    // const { data } = await sb.auth.getUser();
    // const clientId = data.user.user_metadata["client_id"];
    // const cartId = data.user.user_metadata["cart_id"];
    // const wishlistId = data.user.user_metadata["wishlist_id"];
    next();
  } else {
    throw boom.unauthorized();
  }
};
