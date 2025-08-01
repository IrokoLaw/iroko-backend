import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
export declare const ClerkClientProvider: {
    provide: symbol;
    useFactory: (configService: ConfigService<AllConfigType>) => import("@clerk/backend").ClerkClient;
    inject: (typeof ConfigService)[];
};
