import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import { S3Client } from './s3-client';
export declare class S3Service {
    private configService;
    private s3Client;
    private bucketName;
    private filePrefix;
    constructor(configService: ConfigService<AllConfigType>, s3Client: S3Client);
    private getBucketName;
    getSignedUrl(filePath: string, expiresIn?: number): Promise<string>;
}
