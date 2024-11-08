import express, {
  RequestHandler
} from 'express'
import { ParsedQs } from 'qs'
import { TagFindFirst } from './TagFindFirst';
import { TagFindMany } from './TagFindMany';
import { TagFindUnique } from './TagFindUnique';
import { TagCreate } from './TagCreate';
import { TagCreateMany } from './TagCreateMany';
import { TagUpdate } from './TagUpdate';
import { TagUpdateMany } from './TagUpdateMany';
import { TagUpsert } from './TagUpsert';
import { TagDelete } from './TagDelete';
import { TagDeleteMany } from './TagDeleteMany';
import { TagAggregate } from './TagAggregate';
import { TagCount } from './TagCount';
import { TagGroupBy } from './TagGroupBy';
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
 * Generates an Express router for Tag model.
 * @param config Contains optional middleware to enable routes.
 * @param customUrlPrefix Optional custom URL prefix for the routes.
 * @returns {express.Router}
 */
export function TagRouter(config: RouteConfig<RequestHandler>) {
  const router = express.Router();
  const basePath = removeTrailingSlash(config.customUrlPrefix || '') +
                  removeTrailingSlash(config.addModelPrefix !== false ? '/tag' : '');

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
    setupRoute('/first', 'get', before, TagFindFirst as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/first', ...after);
    }
  }

  if (config.enableAll || config?.findMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.findMany || defaultBeforeAfter;
    setupRoute('/', 'get', before, TagFindMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.create) {
    const { before = [], after = [], inputValidator, outputValidator } = config.create || defaultBeforeAfter;
    setupRoute('/', 'post', before, TagCreate as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.createMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.createMany || defaultBeforeAfter;
    setupRoute('/many', 'post', before, TagCreateMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/many', ...after);
    }
  }

  if (config.enableAll || config?.update) {
    const { before = [], after = [], inputValidator, outputValidator } = config.update || defaultBeforeAfter;
    setupRoute('/', 'put', before, TagUpdate as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.updateMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.updateMany || defaultBeforeAfter;
    setupRoute('/many', 'put', before, TagUpdateMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/many', ...after);
    }
  }

  if (config.enableAll || config?.upsert) {
    const { before = [], after = [], inputValidator, outputValidator } = config.upsert || defaultBeforeAfter;
    setupRoute('/', 'patch', before, TagUpsert as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.delete) {
    const { before = [], after = [], inputValidator, outputValidator } = config.delete || defaultBeforeAfter;
    setupRoute('/', 'delete', before, TagDelete as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath + '/'), ...after);
    }
  }

  if (config.enableAll || config?.deleteMany) {
    const { before = [], after = [], inputValidator, outputValidator } = config.deleteMany || defaultBeforeAfter;
    setupRoute('/many', 'delete', before, TagDeleteMany as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/many', ...after);
    }
  }

  if (config.enableAll || config?.aggregate) {
    const { before = [], after = [], inputValidator, outputValidator } = config.aggregate || defaultBeforeAfter;
    setupRoute('/aggregate', 'get', before, TagAggregate as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/aggregate', ...after);
    }
  }

  if (config.enableAll || config?.count) {
    const { before = [], after = [], inputValidator, outputValidator } = config.count || defaultBeforeAfter;
    setupRoute('/count', 'get', before, TagCount as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/count', ...after);
    }
  }

  if (config.enableAll || config?.groupBy) {
    const { before = [], after = [], inputValidator, outputValidator } = config.groupBy || defaultBeforeAfter;
    setupRoute('/groupby', 'get', before, TagGroupBy as RequestHandler, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/groupby', ...after);
    }
  }

  
  if (config.enableAll || config?.findUnique) {
    const { before = [], after = [], inputValidator, outputValidator } = config.findUnique || defaultBeforeAfter;
    setupRoute('/unique', 'get', before, TagFindUnique as any, inputValidator, outputValidator);
    if (after.length) {
      router.use(removeTrailingSlash(basePath) + '/:id', ...after);
    }
  }

  return router;
}
