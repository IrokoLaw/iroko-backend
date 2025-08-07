"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const gcs_client_1 = require("./gcs-client");
const gcs_service_1 = require("./gcs.service");
let FileStorageModule = class FileStorageModule {
};
exports.FileStorageModule = FileStorageModule;
exports.FileStorageModule = FileStorageModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            gcs_client_1.GCSClient,
            gcs_client_1.GCSClientProvider,
            gcs_service_1.GCSService,
        ],
        exports: [gcs_service_1.GCSService],
    })
], FileStorageModule);
//# sourceMappingURL=file-storage.module.js.map