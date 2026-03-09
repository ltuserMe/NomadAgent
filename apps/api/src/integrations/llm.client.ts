export class LlmClient {
  async complete(_prompt: string): Promise<string> {
    return 'mock llm response';
  }
}
