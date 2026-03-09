import type { GeneratePlanResponse } from '@travel/shared';

export function parseAgentOutput(raw: unknown): GeneratePlanResponse {
  return raw as GeneratePlanResponse;
}
