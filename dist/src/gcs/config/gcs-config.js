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
const class_validator_1 = require("class-validator");
const config_1 = require("@nestjs/config");
const validate_config_1 = require("../../utils/validate-config");
class EnvironmentVariablesValidator {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "GCS_PROJECT_ID", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "GCS_BUCKET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "GCS_KEY_FILENAME", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "GCS_FILE_PREFIX", void 0);
exports.default = (0, config_1.registerAs)("gcsConfig", () => {
    (0, validate_config_1.default)(process.env, EnvironmentVariablesValidator);
    return {
        projectId: process.env.GCS_PROJECT_ID,
        bucket: process.env.GCS_BUCKET,
        keyFilename: process.env.GCS_KEY_FILENAME,
        filePrefix: process.env.GCS_FILE_PREFIX,
    };
});
//# sourceMappingURL=gcs-config.js.map