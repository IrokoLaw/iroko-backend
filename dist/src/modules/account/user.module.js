"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_mapper_1 = require("./mappers/user.mapper");
const user_repository_1 = require("./infrastructure/persistance/repositories/user.repository");
const user_entity_db_1 = require("./infrastructure/persistance/user.entity.db");
const user_command_controller_1 = require("./commands/user-command.controller");
const user_service_1 = require("./commands/user.service");
const user_queries_controller_1 = require("./queries/user-queries.controller");
const user_query_handler_1 = require("./queries/user-query-handler");
const user_di_token_1 = require("./user.di-token");
const httpControllers = [user_command_controller_1.UserCommandHttpController, user_queries_controller_1.UserQueryHttpController];
const mappers = [user_mapper_1.UserMapper];
const repositories = [
    { provide: user_di_token_1.USER_REPOSITORY, useClass: user_repository_1.UserRepository },
];
const handlers = [user_query_handler_1.UserQueryHandler];
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_db_1.UserDbEntity])],
        controllers: [...httpControllers],
        providers: [common_1.Logger, user_service_1.UserService, ...repositories, ...handlers, ...mappers],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map