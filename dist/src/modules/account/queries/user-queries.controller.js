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
exports.UserQueryHttpController = void 0;
const routes_1 = require("../../../config/routes");
const common_1 = require("@nestjs/common");
const user_query_handler_1 = require("./user-query-handler");
const swagger_1 = require("@nestjs/swagger");
const paginated_query_request_dto_1 = require("../../../libs/api/paginated-query.request.dto");
const response_base_1 = require("../../../libs/api/response.base");
const user_paginated_response_dto_1 = require("../dtos/user.paginated.response.dto");
let UserQueryHttpController = class UserQueryHttpController {
    constructor(handler) {
        this.handler = handler;
    }
    async findUsers(queryParams) {
        const query = new user_query_handler_1.FindUsersQuery({
            limit: queryParams.limit ?? 10,
            page: queryParams.page ?? 1,
        });
        const result = await this.handler.list(query);
        const paginated = result.unwrap();
        return new user_paginated_response_dto_1.UserPaginatedResponseDto({
            ...paginated,
            data: paginated.data.map((user) => ({
                ...new response_base_1.ResponseBase({
                    id: user.id,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }),
                firstName: user.getProps().firstName,
                lastName: user.getProps().lastName,
                email: user.getProps().email,
                externalUserId: user.getProps().externalUserId,
            })),
        });
    }
};
exports.UserQueryHttpController = UserQueryHttpController;
__decorate([
    (0, common_1.Get)(routes_1.routesV1.user.root),
    (0, swagger_1.ApiOperation)({ summary: 'Users projects' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: user_paginated_response_dto_1.UserPaginatedResponseDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginated_query_request_dto_1.PaginatedQueryRequestDto]),
    __metadata("design:returntype", Promise)
], UserQueryHttpController.prototype, "findUsers", null);
exports.UserQueryHttpController = UserQueryHttpController = __decorate([
    (0, common_1.Controller)(routes_1.routesV1.version),
    __metadata("design:paramtypes", [user_query_handler_1.UserQueryHandler])
], UserQueryHttpController);
//# sourceMappingURL=user-queries.controller.js.map