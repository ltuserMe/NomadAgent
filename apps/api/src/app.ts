import cors from '@fastify/cors';
import Fastify from 'fastify';
import { notFoundHandler } from './common/errors/app-error.js';
import { registerErrorHandler } from './common/middleware/error-handler.js';
import { registerRequestLogger } from './common/middleware/request-logger.js';
import { registerRoutes } from './routes/index.js';

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true });

  registerRequestLogger(app);
  registerErrorHandler(app);

  await registerRoutes(app);

  app.setNotFoundHandler(notFoundHandler);
  return app;
}
