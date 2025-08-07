import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "@/config/config.type";
import { GCSClient } from "./gcs-client";
import { GetSignedUrlConfig } from "@google-cloud/storage";
import { withRetry } from "@/utils/retry";

@Injectable()
export class GCSService {
  private bucketName: string;
  private filePrefix: string;
  private readonly logger = new Logger(GCSService.name);

  constructor(
    private configService: ConfigService<AllConfigType>,
    private gcsClient: GCSClient
  ) {
    this.bucketName = this.getBucketName();
    this.filePrefix = this.configService.getOrThrow("gcsConfig.filePrefix", {
      infer: true,
    });
    this.configureBucketCors();
  }

  private getBucketName() {
    return this.configService.getOrThrow("gcsConfig.bucket", { infer: true });
  }

  private configureBucketCors() {
    const bucket = this.gcsClient.bucket(this.bucketName);
    bucket.setCorsConfiguration([
      {
        origin: [
          "http://localhost:3002",
          "http://localhost:3000",
          "https://alia-frontend-707753137274.us-central1.run.app",
          "https://alia-backend-707753137274.us-central1.run.app",
          "https://alia-frontend-dev-707753137274.us-central1.run.app",
          "https://alia-backend-dev-707753137274.us-central1.run.app",
          "https://app.alia-legal.com",
        ],
        responseHeader: ["*"],
        method: ["GET", "HEAD", "PUT", "POST", "DELETE"],
        maxAgeSeconds: 3600,
      },
    ]);
  }

  async getSignedUrl(
    filePath: string,
    expiresIn: number = 3600
  ): Promise<string> {
    const bucket = this.gcsClient.bucket(this.bucketName);
    const file = bucket.file(`${this.filePrefix}/${filePath}`);

    const options: GetSignedUrlConfig = {
      version: "v4",
      action: "read",
      expires: Date.now() + expiresIn * 1000,
    };

    const [url] = await file.getSignedUrl(options);
    return url;
  }

  async listObjects(prefix: string): Promise<string[]> {
    const bucket = this.gcsClient.bucket(this.bucketName);
    const options = {
      prefix: `${this.filePrefix}/${prefix}`,
    };

    const [files] = await bucket.getFiles(options);
    return files.map((file) => file.name);
  }

  /**
   * Get the content of a specific object from GCS
   * @param key The object key (path)
   * @returns The object content as a string
   */
  async getObjectContent(key: string): Promise<string> {
    const bucket = this.gcsClient.bucket(this.bucketName);
    const file = bucket.file(key);

    return withRetry(
      async () => {
        const [content] = await file.download();
        return content.toString("utf-8");
      },
      {
        maxRetries: 3,
        baseDelay: 1000,
        retryableErrorCodes: [
          "ECONNRESET",
          "ETIMEDOUT",
          "ECONNREFUSED",
          "ENOTFOUND",
          "EADDRNOTAVAIL",
        ],
        logger: this.logger,
        operationName: `GCS download (${key})`,
      }
    );
  }
}
