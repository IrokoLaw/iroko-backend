"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
const routes_1 = require("../../src/config/routes");
const jestSetupAfterEnv_1 = require("../setup/jestSetupAfterEnv");
class ApiClient {
    constructor() {
        this.url = `/${routes_1.routesV1.version}/${routes_1.routesV1.user.root}`;
    }
    async createUser(dto) {
        const response = await (0, jestSetupAfterEnv_1.getHttpServer)().post(this.url).send(dto);
        return response.body;
    }
    async findAllUser(dto) {
        const response = await (0, jestSetupAfterEnv_1.getHttpServer)().get(this.url).send(dto);
        return response.body;
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=api-client.js.map