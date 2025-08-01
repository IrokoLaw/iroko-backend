import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { AuthConfig } from './auth-config.type';
import validateConfig from '@/utils/validate-config';

class EnvironnementVariableValidator {
  @IsString()
  CLERK_PUBLISHABLE_KEY: string;

  @IsString()
  CLERK_SECRET_KEY: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironnementVariableValidator);

  return {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  };
});
