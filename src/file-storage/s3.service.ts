import { Injectable } from '@nestjs/common';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import { S3Client } from './s3-client';

@Injectable()
export class S3Service {
  private bucketName: string;
  private filePrefix: string;

  constructor(
    private configService: ConfigService<AllConfigType>,
    private s3Client: S3Client,
  ) {
    this.bucketName = this.getBucketName();
    this.filePrefix = this.configService.getOrThrow('s3Config.filePrefix', {
      infer: true,
    });
  }

  private getBucketName() {
    return this.configService.getOrThrow('s3Config.bucket', { infer: true });
  }

  async getSignedUrl(
    filePath: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: `${this.filePrefix}/${filePath}`,
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }
}
