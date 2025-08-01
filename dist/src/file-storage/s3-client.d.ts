import { S3Client as S3ClientAWS } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
export declare class S3Client extends S3ClientAWS {
    private readonly configService;
    constructor(configService: ConfigService<AllConfigType>);
}
export declare const S3ClientProvider: {
    provide: typeof S3Client;
    useFactory: (configService: ConfigService<AllConfigType>) => S3Client;
    inject: (typeof ConfigService)[];
};
