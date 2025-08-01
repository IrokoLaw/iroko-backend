"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClerkClientProvider = void 0;
const backend_1 = require("@clerk/backend");
const config_1 = require("@nestjs/config");
const auth_di_token_1 = require("./auth-di.token");
exports.ClerkClientProvider = {
    provide: auth_di_token_1.AUTH_TOKEN,
    useFactory: (configService) => {
        return (0, backend_1.createClerkClient)({
            publishableKey: configService.get('auth.publishableKey', { infer: true }),
            secretKey: configService.get('auth.secretKey', { infer: true }),
        });
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=auth.provider.js.map