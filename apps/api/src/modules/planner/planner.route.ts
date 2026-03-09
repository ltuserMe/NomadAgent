import type { FastifyInstance } from 'fastify';
import { AgentService } from '../../agent/agent.service.js';
import { GeneratePlanUsecase } from '../../application/usecases/generate-plan.usecase.js';
import { PlannerController } from './planner.controller.js';

export async function plannerRoutes(app: FastifyInstance): Promise<void> {
  const controller = new PlannerController(new GeneratePlanUsecase(new AgentService()));

  app.post('/api/plan/generate', controller.generate);
}
