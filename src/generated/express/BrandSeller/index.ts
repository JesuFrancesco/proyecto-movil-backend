import express, {
  RequestHandler
} from 'express'
import { ParsedQs } from 'qs'
import { BrandSellerFindFirst } from './BrandSellerFindFirst';
import { BrandSellerFindMany } from './BrandSellerFindMany';
import { BrandSellerFindUnique } from './BrandSellerFindUnique';
import { BrandSellerCreate } from './BrandSellerCreate';
import { BrandSellerCreateMany } from './BrandSellerCreateMany';
import { BrandSellerUpdate } from './BrandSellerUpdate';
import { BrandSellerUpdateMany } from './BrandSellerUpdateMany';
import { BrandSellerUpsert } from './BrandSellerUpsert';
import { BrandSellerDelete } from './BrandSellerDelete';
import { BrandSellerDeleteMany } from './BrandSellerDeleteMany';
import { BrandSellerAggregate } from './BrandSellerAggregate';
import { BrandSellerCount } from './BrandSellerCount';
import { BrandSellerGroupBy } from './BrandSellerGroupBy';
import { createValidatorMiddleware, removeTrailingSlash } from '../createValidatorMiddleware'
import { RouteConfig, ValidatorConfig } from '../routeConfig'
import { parseQueryParams } from "../parseQueryParams";

const defaultBeforeAfter = {
  before: [] as RequestHandler[],
  after: [] as RequestHandler[],
  inputValidator: undefined,
  outputValidator: undefined,
};

/**
 * Generates an Express router for BrandSeller model.
 * @param config Contains optional middleware to enable routes.
 * @param customUrlPrefix Optional custom URL prefix for the routes.
 * @returns {express.Router}
 */
export function BrandSellerRouter(config: RouteConfig<RequestHandler>) {
  const router = express.Router();
  const basePath = removeTrailingSlash(config.customUrlPrefix || '') +
                  removeTrailingSlash(config.addModelPrefix !== false ? '/brandseller' : '');

  const setupRoute = (
    path: string,
    method: "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head",
    middlewares: RequestHandler[],
    handler: RequestHandler,
    inputValidator?: ValidatorConfig,
    outputValidator?: ValidatorConfig
  ) => {
    const middlewaresWithValidators: RequestHandler[] = [
      (req, res, next) => {
        if (req.query) {
          req.query = parseQueryParams(req.query as Record<string, string>) as ParsedQs;
        }
        next();
      },
      ...middlewares
    ];
  
    if (inputValidator) {
      middlewaresWithValidators.push(createValidatorMiddleware({
        schema: inputValidator.schema,
        allowedPaths: inputValidator.allow,
        forbiddenPaths: inputValidator.forbid,
        target: method === 'get' ? 'query' : 'body',
      }));
    }
  
    middlewaresWithValidators.push((req, res, next) => {
      res.locals.outputValidator = outputValidator;
      next();
    });
  
    middlewaresWithValidators.push(handler);
  
    router[method](removeTrailingSlash(basePath + path), ...middlewaresWithValidators);
  };


  if (config.enableAll || config?.findFirst) {
    const { before = [], after = [], inputValidator, outputValidator } = config.findFirst || defaultBeforeAfter;
    setupRoute('/first', 'get', before, BrandSellerFindFirst as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/first', ...after);
    }
  }

  if (config.enableAll || config?.findMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.findMany || defaultBeforeAfter;
    setupRoute('/', 'get', before, BrandSellerFindMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.create) {
    const { before = [], after = [], inputValidator, outputValidator } = config.create || defaultBeforeAfter;
    setupRoute('/', 'post', before, BrandSellerCreate as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.createMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.createMany || defaultBeforeAfter;
    setupRoute('/many', 'post', before, BrandSellerCreateMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/many', ...after);
    }
  }

  if (config.enableAll || config?.update) {
    const { before = [], after = [], inputValidator, outputValidator } = config.update || defaultBeforeAfter;
    setupRoute('/', 'put', before, BrandSellerUpdate as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.updateMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.updateMany || defaultBeforeAfter;
    setupRoute('/many', 'put', before, BrandSellerUpdateMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/many', ...after);
    }
  }

  if (config.enableAll || config?.upsert) {
    const { before = [], after = [], inputValidator, outputValidator } = config.upsert || defaultBeforeAfter;
    setupRoute('/', 'patch', before, BrandSellerUpsert as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.delete) {
    const { before = [], after = [], inputValidator, outputValidator } = config.delete || defaultBeforeAfter;
    setupRoute('/', 'delete', before, BrandSellerDelete as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.deleteMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.deleteMany || defaultBeforeAfter;
    setupRoute('/many', 'delete', before, BrandSellerDeleteMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/many', ...after);
    }
  }

  if (config.enableAll || config?.aggregate) {
    const { before = [], after = [], inputValidator, outputValidator } = config.aggregate || defaultBeforeAfter;
    setupRoute('/aggregate', 'get', before, BrandSellerAggregate as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/aggregate', ...after);
    }
  }

  if (config.enableAll || config?.count) {
    const { before = [], after = [], inputValidator, outputValidator } = config.count || defaultBeforeAfter;
    setupRoute('/count', 'get', before, BrandSellerCount as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/count', ...after);
    }
  }

  if (config.enableAll || config?.groupBy) {
    const { before = [], after = [], inputValidator, outputValidator } = config.groupBy || defaultBeforeAfter;
    setupRoute('/groupby', 'get', before, BrandSellerGroupBy as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/groupby', ...after);
    }
  }

  
  if (config.enableAll || config?.findUnique) {
    const { before = [], after = [], inputValidator, outputValidator } = config.findUnique || defaultBeforeAfter;
    setupRoute('/unique', 'get', before, BrandSellerFindUnique as any, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/:id', ...after);
    }
  }

  return router;
}
