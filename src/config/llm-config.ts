import { IsString, MinLength } from 'class-validator';
import { LLMConfig } from './llm-config-types';
import { registerAs } from '@nestjs/config';
import validateConfig from '@/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @MinLength(1)
  LLM_AGENT_URL: string;
}

export default registerAs<LLMConfig>('llmConfig', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    url: process.env.LLM_AGENT_URL,
  };
});
