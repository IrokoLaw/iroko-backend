"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_transactional_1 = require("typeorm-transactional");
const helmet_1 = require("helmet");
const class_validator_1 = require("class-validator");
async function bootstrap() {
    (0, typeorm_transactional_1.initializeTransactionalContext)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    const configService = app.get((config_1.ConfigService));
    app.enableShutdownHooks();
    app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }), {
        exclude: ['/'],
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.enableCors({
        origin: ['http://localhost:3002', 'http://localhost:3000'],
        methods: 'GET,POST,PUT,DELETE, PATCH',
        allowedHeaders: 'Content-Type, Accept',
        credentials: true,
    });
    app.use((0, helmet_1.default)());
    const options = new swagger_1.DocumentBuilder()
        .setTitle(configService.getOrThrow('app.name', { infer: true }))
        .setDescription(configService.getOrThrow('app.description', { infer: true }))
        .setVersion(configService.getOrThrow('app.version', { infer: true }))
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
//# sourceMappingURL=main.js.map