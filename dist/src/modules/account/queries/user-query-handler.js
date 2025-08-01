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
exports.UserQueryHandler = exports.FindUsersQuery = void 0;
const query_base_1 = require("../../../libs/domain/query.base");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const user_di_token_1 = require("../user.di-token");
const repository_port_1 = require("../../../libs/domain/repository.port");
class FindUsersQuery extends query_base_1.PaginatedQueryBase {
    constructor(props) {
        super(props);
    }
}
exports.FindUsersQuery = FindUsersQuery;
let UserQueryHandler = class UserQueryHandler {
    constructor(repository) {
        this.repository = repository;
    }
    async list(query) {
        const records = await this.repository.findAllPaginated({
            page: query.page,
            limit: query.limit,
            orderBy: query.orderBy,
        });
        return (0, oxide_ts_1.Ok)(new repository_port_1.Paginated({
            data: records.data,
            count: records.count,
            limit: query.limit,
            page: query.page,
        }));
    }
};
exports.UserQueryHandler = UserQueryHandler;
exports.UserQueryHandler = UserQueryHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_di_token_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UserQueryHandler);
//# sourceMappingURL=user-query-handler.js.map