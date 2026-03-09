import type { GeneratePlanRequest, GeneratePlanResponse } from '@travel/shared';
import { AgentService } from '../../agent/agent.service.js';

export class GeneratePlanUsecase {
  constructor(private readonly agentService: AgentService) {}

  async execute(input: GeneratePlanRequest): Promise<GeneratePlanResponse> {
    return this.agentService.generatePlan(input);
  }
}
