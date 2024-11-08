/**
 * disclaimer !!!!!!!!!
 * La presente configuración es bastante insegura de por sí.
 * Su implementación responde únicamente al propósito de tener un CRUD de manera rápida.
 * Una implementación más segura requiere un mejor uso del middleware de Supabase para evitar peticiones que NO deberían ser usados por usuarios externos
 */
import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import { PrismaClient } from "@prisma/client";

import { ProfileRouter } from "../generated/express/Profile";
import { ClientRouter } from "../generated/express/Client";
import { MarketRouter } from "../generated/express/Market";
import { ProductRouter } from "../generated/express/Product";
import { NotificationRouter } from "../generated/express/Notification";
import { ProductRatingRouter } from "../generated/express/ProductRating";
import { ProductQuestionRouter } from "../generated/express/ProductQuestion";

import { OrderRouter } from "../generated/express/Order";

import { ShoppingCartRouter } from "../generated/express/ShoppingCart";
import { CartItemRouter } from "../generated/express/CartItem";

import { WishlistRouter } from "../generated/express/Wishlist";
import { WishlistItemRouter } from "../generated/express/WishlistItem";

import { RouteConfig } from "../generated/express/routeConfig";
import { TagRouter } from "../generated/express/Tag";
import { authHandler } from "../middleware/authorization.handler";

const API_ROUTER = Router();

// prisma init
const prisma = new PrismaClient();

// custom express + prisma middleware
const addPrisma: RequestHandler = (
  req: Request & { prisma: PrismaClient },
  res: Response,
  next: NextFunction
) => {
  req.prisma = prisma;
  next();
};

API_ROUTER.use(addPrisma);

const commonRouterConfig: RouteConfig<any> = {
  addModelPrefix: true,
  enableAll: true,
};

// == routers habilitados
// protected routes
const profileRouter = ProfileRouter(commonRouterConfig);
// profileRouter.use(authHandler);
API_ROUTER.use(profileRouter);

const clientRouter = ClientRouter(commonRouterConfig);
// clientRouter.use(authHandler);
API_ROUTER.use(clientRouter);

const wishlistRouter = WishlistRouter(commonRouterConfig);
// wishlistRouter.use(authHandler);
API_ROUTER.use(wishlistRouter);

const wishlistItemRouter = WishlistItemRouter(commonRouterConfig);
// wishlistItemRouter.use(authHandler);
API_ROUTER.use(wishlistItemRouter);

const shoppingCartRouter = ShoppingCartRouter(commonRouterConfig);
// shoppingCartRouter.use(authHandler);
API_ROUTER.use(shoppingCartRouter);

const cartItemRouter = CartItemRouter(commonRouterConfig);
// cartItemRouter.use(authHandler);
API_ROUTER.use(cartItemRouter);

const orderRouter = OrderRouter(commonRouterConfig);
// orderRouter.use(authHandler);
API_ROUTER.use(orderRouter);

// public router
API_ROUTER.use(ProductRouter(commonRouterConfig));

API_ROUTER.use(MarketRouter(commonRouterConfig));

API_ROUTER.use(ProductRatingRouter(commonRouterConfig));

API_ROUTER.use(ProductQuestionRouter(commonRouterConfig));

API_ROUTER.use(TagRouter(commonRouterConfig));

API_ROUTER.use(NotificationRouter(commonRouterConfig));

export = API_ROUTER;
