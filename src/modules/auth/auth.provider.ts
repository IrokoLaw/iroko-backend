import { createClerkClient } from '@clerk/backend';
import { ConfigService } from '@nestjs/config';
import { AUTH_TOKEN } from './auth-di.token';
import { AllConfigType } from '@/config/config.type';

export const ClerkClientProvider = {
  provide: AUTH_TOKEN,
  useFactory: (configService: ConfigService<AllConfigType>) => {
    return createClerkClient({
      publishableKey: configService.get('auth.publishableKey', { infer: true }),
      secretKey: configService.get('auth.secretKey', { infer: true }),
    });
  },
  inject: [ConfigService],
};
