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
exports.UserCommandHttpController = void 0;
const routes_1 = require("../../../config/routes");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const id_response_dto_1 = require("../../../libs/api/id.response.dto");
const user_errors_1 = require("../domain/entities/user/user.errors");
const api_error_response_1 = require("../../../libs/api/api-error.response");
const oxide_ts_1 = require("oxide.ts");
const create_user_request_dto_1 = require("./create-user.request.dto");
let UserCommandHttpController = class UserCommandHttpController {
    constructor(service) {
        this.service = service;
    }
    async create(body) {
        const result = await this.service.create(body);
        return (0, oxide_ts_1.match)(result, {
            Ok: (id) => new id_response_dto_1.IdResponse(id),
            Err: (error) => {
                if (error instanceof user_errors_1.UserAlreadyExistsError)
                    throw new common_1.ConflictException(error.message);
                throw error;
            },
        });
    }
};
exports.UserCommandHttpController = UserCommandHttpController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: id_response_dto_1.IdResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: user_errors_1.UserAlreadyExistsError.message,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, common_1.Post)(routes_1.routesV1.user.root),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_request_dto_1.CreateUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserCommandHttpController.prototype, "create", null);
exports.UserCommandHttpController = UserCommandHttpController = __decorate([
    (0, common_1.Controller)(routes_1.routesV1.version),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserCommandHttpController);
//# sourceMappingURL=user-command.controller.js.map