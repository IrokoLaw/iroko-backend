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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_transactional_1 = require("typeorm-transactional");
const oxide_ts_1 = require("oxide.ts");
const exceptions_1 = require("../../../libs/exceptions");
const user_di_token_1 = require("../user.di-token");
const user_entity_1 = require("../domain/entities/user/user.entity");
const user_errors_1 = require("../domain/entities/user/user.errors");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(data) {
        const user = user_entity_1.UserEntity.create({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            externalUserId: data.externalUserId,
            userRole: data.userRole,
        });
        try {
            await this.userRepo.transaction(async () => this.userRepo.insert(user));
            return (0, oxide_ts_1.Ok)(user.id);
        }
        catch (error) {
            if (error instanceof exceptions_1.ConflictException) {
                return (0, oxide_ts_1.Err)(new user_errors_1.UserAlreadyExistsError(error));
            }
            throw error;
        }
    }
};
exports.UserService = UserService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "create", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_di_token_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map