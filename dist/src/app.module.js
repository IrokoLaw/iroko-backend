"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const core_1 = require("@nestjs/core");
const ContextInterceptor_1 = require("./libs/application/context/ContextInterceptor");
const exception_interceptor_1 = require("./libs/application/interceptors/exception.interceptor");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_service_1 = require("./database/typeorm-config.service");
const typeorm_2 = require("typeorm");
const typeorm_transactional_1 = require("typeorm-transactional");
const config_1 = require("@nestjs/config");
const database_config_1 = require("./database/config/database.config");
const s3_config_1 = require("./file-storage/config/s3-config");
const llm_config_1 = require("./config/llm-config");
const app_config_1 = require("./config/app-config");
const user_module_1 = require("./modules/account/user.module");
const nestjs_request_context_1 = require("nestjs-request-context");
const auth_config_1 = require("./modules/auth/config/auth.config");
const question_answering_module_1 = require("./modules/question-answering/question-answering.module");
const gcs_config_1 = require("./gcs/config/gcs-config");
const interceptors = [
    {
        provide: core_1.APP_INTERCEPTOR,
        useClass: ContextInterceptor_1.ContextInterceptor,
    },
    {
        provide: core_1.APP_INTERCEPTOR,
        useClass: exception_interceptor_1.ExceptionInterceptor,
    },
];
const infrastructureDatabaseModule = typeorm_1.TypeOrmModule.forRootAsync({
    useClass: typeorm_config_service_1.TypeOrmConfigService,
    dataSourceFactory: async (options) => {
        return ((0, typeorm_transactional_1.getDataSourceByName)("default") ||
            (0, typeorm_transactional_1.addTransactionalDataSource)(new typeorm_2.DataSource(options)).initialize());
    },
});
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    database_config_1.default,
                    app_config_1.default,
                    auth_config_1.default,
                    s3_config_1.default,
                    llm_config_1.default,
                    gcs_config_1.default,
                ],
                envFilePath: [
                    process.env.NODE_ENV == "test" ? "../.env.test" : "../.env",
                ],
            }),
            infrastructureDatabaseModule,
            nestjs_request_context_1.RequestContextModule,
            user_module_1.UserModule,
            question_answering_module_1.QuestionAnsweringModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, ...interceptors],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map