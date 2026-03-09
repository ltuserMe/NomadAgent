import type { GeneratePlanRequest, GeneratePlanResponse } from '@travel/shared';
import { env } from '../config/env.js';
import { BaseAgentProvider } from './providers/base-agent.provider.js';
import { LangChainAgentProvider } from './providers/langchain-agent.provider.js';

export class AgentService {
  private readonly provider: BaseAgentProvider;

  constructor() {
    this.provider = this.createProvider(env.AI_PROVIDER);
  }

  private createProvider(providerName: string): BaseAgentProvider {
    if (providerName === 'langchain') {
      return new LangChainAgentProvider();
    }
    return new LangChainAgentProvider();
  }

  async generatePlan(input: GeneratePlanRequest): Promise<GeneratePlanResponse> {
    return this.provider.generatePlan(input);
  }
}
