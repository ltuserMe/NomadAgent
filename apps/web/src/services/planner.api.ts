import type { GeneratePlanRequest, GeneratePlanResponse } from '@travel/shared';
import { apiClient, unwrapResponse } from './api-client';

export const plannerApi = {
  generatePlan: (payload: GeneratePlanRequest) =>
    unwrapResponse<GeneratePlanResponse>(apiClient.post('/api/plan/generate', payload)),
};
