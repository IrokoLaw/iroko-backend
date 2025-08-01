import { Injectable } from '@nestjs/common';
import { S3Client as S3ClientAWS } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';

@Injectable()
export class S3Client extends S3ClientAWS {
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    super({
      region: configService.getOrThrow('s3Config.region', { infer: true }),
      credentials: {
        accessKeyId: configService.getOrThrow('s3Config.accessKeyId', {
          infer: true,
        }),
        secretAccessKey: configService.getOrThrow('s3Config.secretAccessKey', {
          infer: true,
        }),
      },
    });
  }
}

export const S3ClientProvider = {
  provide: S3Client,
  useFactory: (configService: ConfigService<AllConfigType>) =>
    new S3Client(configService),
  inject: [ConfigService],
};
