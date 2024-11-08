import express, {
  RequestHandler
} from 'express'
import { ParsedQs } from 'qs'
import { OrderItemFindFirst } from './OrderItemFindFirst';
import { OrderItemFindMany } from './OrderItemFindMany';
import { OrderItemFindUnique } from './OrderItemFindUnique';
import { OrderItemCreate } from './OrderItemCreate';
import { OrderItemCreateMany } from './OrderItemCreateMany';
import { OrderItemUpdate } from './OrderItemUpdate';
import { OrderItemUpdateMany } from './OrderItemUpdateMany';
import { OrderItemUpsert } from './OrderItemUpsert';
import { OrderItemDelete } from './OrderItemDelete';
import { OrderItemDeleteMany } from './OrderItemDeleteMany';
import { OrderItemAggregate } from './OrderItemAggregate';
import { OrderItemCount } from './OrderItemCount';
import { OrderItemGroupBy } from './OrderItemGroupBy';
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
 * Generates an Express router for OrderItem model.
 * @param config Contains optional middleware to enable routes.
 * @param customUrlPrefix Optional custom URL prefix for the routes.
 * @returns {express.Router}
 */
export function OrderItemRouter(config: RouteConfig<RequestHandler>) {
  const router = express.Router();
  const basePath = removeTrailingSlash(config.customUrlPrefix || '') +
                  removeTrailingSlash(config.addModelPrefix !== false ? '/orderitem' : '');

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
    setupRoute('/first', 'get', before, OrderItemFindFirst as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/first', ...after);
    }
  }

  if (config.enableAll || config?.findMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.findMany || defaultBeforeAfter;
    setupRoute('/', 'get', before, OrderItemFindMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.create) {
    const { before = [], after = [], inputValidator, outputValidator } = config.create || defaultBeforeAfter;
    setupRoute('/', 'post', before, OrderItemCreate as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.createMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.createMany || defaultBeforeAfter;
    setupRoute('/many', 'post', before, OrderItemCreateMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/many', ...after);
    }
  }

  if (config.enableAll || config?.update) {
    const { before = [], after = [], inputValidator, outputValidator } = config.update || defaultBeforeAfter;
    setupRoute('/', 'put', before, OrderItemUpdate as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.updateMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.updateMany || defaultBeforeAfter;
    setupRoute('/many', 'put', before, OrderItemUpdateMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/many', ...after);
    }
  }

  if (config.enableAll || config?.upsert) {
    const { before = [], after = [], inputValidator, outputValidator } = config.upsert || defaultBeforeAfter;
    setupRoute('/', 'patch', before, OrderItemUpsert as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.delete) {
    const { before = [], after = [], inputValidator, outputValidator } = config.delete || defaultBeforeAfter;
    setupRoute('/', 'delete', before, OrderItemDelete as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.deleteMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.deleteMany || defaultBeforeAfter;
    setupRoute('/many', 'delete', before, OrderItemDeleteMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/many', ...after);
    }
  }

  if (config.enableAll || config?.aggregate) {
    const { before = [], after = [], inputValidator, outputValidator } = config.aggregate || defaultBeforeAfter;
    setupRoute('/aggregate', 'get', before, OrderItemAggregate as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/aggregate', ...after);
    }
  }

  if (config.enableAll || config?.count) {
    const { before = [], after = [], inputValidator, outputValidator } = config.count || defaultBeforeAfter;
    setupRoute('/count', 'get', before, OrderItemCount as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/count', ...after);
    }
  }

  if (config.enableAll || config?.groupBy) {
    const { before = [], after = [], inputValidator, outputValidator } = config.groupBy || defaultBeforeAfter;
    setupRoute('/groupby', 'get', before, OrderItemGroupBy as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/groupby', ...after);
    }
  }

  
  if (config.enableAll || config?.findUnique) {
    const { before = [], after = [], inputValidator, outputValidator } = config.findUnique || defaultBeforeAfter;
    setupRoute('/unique', 'get', before, OrderItemFindUnique as any, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/:id', ...after);
    }
  }

  return router;
}
