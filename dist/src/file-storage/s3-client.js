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
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ClientProvider = exports.S3Client = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
let S3Client = class S3Client extends client_s3_1.S3Client {
    constructor(configService) {
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
        this.configService = configService;
    }
};
exports.S3Client = S3Client;
exports.S3Client = S3Client = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Client);
exports.S3ClientProvider = {
    provide: S3Client,
    useFactory: (configService) => new S3Client(configService),
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=s3-client.js.map