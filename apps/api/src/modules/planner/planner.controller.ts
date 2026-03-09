import type { GeneratePlanRequest } from '@travel/shared';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { GeneratePlanUsecase } from '../../application/usecases/generate-plan.usecase.js';
import { ok } from '../../common/utils/response.js';
import { generatePlanBodySchema } from '../../schemas/planner.schema.js';

export class PlannerController {
  constructor(private readonly generatePlanUsecase: GeneratePlanUsecase) {}

  generate = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const input = generatePlanBodySchema.parse(request.body) as GeneratePlanRequest;
    const data = await this.generatePlanUsecase.execute(input);
    reply.send(ok(data));
  };
}
