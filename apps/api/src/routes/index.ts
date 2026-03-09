import type { FastifyInstance } from 'fastify';
import { healthRoutes } from '../modules/health/health.route.js';
import { plannerRoutes } from '../modules/planner/planner.route.js';

export async function registerRoutes(app: FastifyInstance): Promise<void> {
  await app.register(healthRoutes);
  await app.register(plannerRoutes);
}
