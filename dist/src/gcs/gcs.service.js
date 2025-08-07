"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GCSService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCSService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const gcs_client_1 = require("./gcs-client");
const retry_1 = require("../utils/retry");
let GCSService = GCSService_1 = class GCSService {
    constructor(configService, gcsClient) {
        this.configService = configService;
        this.gcsClient = gcsClient;
        this.logger = new common_1.Logger(GCSService_1.name);
        this.bucketName = this.getBucketName();
        this.filePrefix = this.configService.getOrThrow("gcsConfig.filePrefix", {
            infer: true,
        });
        this.configureBucketCors();
    }
    getBucketName() {
        return this.configService.getOrThrow("gcsConfig.bucket", { infer: true });
    }
    configureBucketCors() {
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
    async getSignedUrl(filePath, expiresIn = 3600) {
        const bucket = this.gcsClient.bucket(this.bucketName);
        const file = bucket.file(`${this.filePrefix}/${filePath}`);
        const options = {
            version: "v4",
            action: "read",
            expires: Date.now() + expiresIn * 1000,
        };
        const [url] = await file.getSignedUrl(options);
        return url;
    }
    async listObjects(prefix) {
        const bucket = this.gcsClient.bucket(this.bucketName);
        const options = {
            prefix: `${this.filePrefix}/${prefix}`,
        };
        const [files] = await bucket.getFiles(options);
        return files.map((file) => file.name);
    }
    async getObjectContent(key) {
        const bucket = this.gcsClient.bucket(this.bucketName);
        const file = bucket.file(key);
        return (0, retry_1.withRetry)(async () => {
            const [content] = await file.download();
            return content.toString("utf-8");
        }, {
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
        });
    }
};
exports.GCSService = GCSService;
exports.GCSService = GCSService = GCSService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        gcs_client_1.GCSClient])
], GCSService);
//# sourceMappingURL=gcs.service.js.map