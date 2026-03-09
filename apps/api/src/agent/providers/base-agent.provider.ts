import type { GeneratePlanRequest, GeneratePlanResponse } from '@travel/shared';

export abstract class BaseAgentProvider {
  abstract name: string;

  abstract generatePlan(input: GeneratePlanRequest): Promise<GeneratePlanResponse>;
}
