import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "@/config/config.type";
import { GCSClient } from "./gcs-client";
export declare class GCSService {
    private configService;
    private gcsClient;
    private bucketName;
    private filePrefix;
    private readonly logger;
    constructor(configService: ConfigService<AllConfigType>, gcsClient: GCSClient);
    private getBucketName;
    private configureBucketCors;
    getSignedUrl(filePath: string, expiresIn?: number): Promise<string>;
    listObjects(prefix: string): Promise<string[]>;
    getObjectContent(key: string): Promise<string>;
}
