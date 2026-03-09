import { env } from './config/env.js';
import { buildApp } from './app.js';

async function start(): Promise<void> {
  const app = await buildApp();

  try {
    await app.listen({ host: env.API_HOST, port: env.API_PORT });
    app.log.info(`API server running at http://${env.API_HOST}:${env.API_PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
