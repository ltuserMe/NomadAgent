import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: '../../.env' });

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().default(4000),
  API_HOST: z.string().default('0.0.0.0'),
  AI_PROVIDER: z.string().default('langchain'),
  OPENAI_API_KEY: z.string().optional(),
});

export const env = EnvSchema.parse(process.env);
