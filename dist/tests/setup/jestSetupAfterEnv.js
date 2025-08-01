"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestServer = void 0;
exports.generateTestingApplication = generateTestingApplication;
exports.getTestServer = getTestServer;
exports.getEntityManager = getEntityManager;
exports.getHttpServer = getHttpServer;
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_transactional_1 = require("typeorm-transactional");
const app_module_1 = require("../../src/app.module");
const test_database_setup_1 = require("../../src/database/test-database-setup");
class TestServer {
    constructor(serverApplication, testingModule) {
        this.serverApplication = serverApplication;
        this.testingModule = testingModule;
    }
    static async new(testingModuleBuilder) {
        (0, typeorm_transactional_1.initializeTransactionalContext)();
        const testingModule = await testingModuleBuilder.compile();
        const app = testingModule.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
        app.enableShutdownHooks();
        await app.init();
        return new TestServer(app, testingModule);
    }
}
exports.TestServer = TestServer;
let testServer;
let entityManager;
async function generateTestingApplication() {
    testServer = await TestServer.new(testing_1.Test.createTestingModule({
        imports: [app_module_1.AppModule],
    }));
    entityManager = testServer.testingModule.get(typeorm_1.EntityManager);
    console.log('Test server and entity manager initialized');
}
function getTestServer() {
    if (!testServer) {
        throw new Error('Test server not initialized. Did you call generateTestingApplication()?');
    }
    return testServer;
}
function getEntityManager() {
    if (!entityManager) {
        throw new Error('Entity manager not initialized. Did you call generateTestingApplication()?');
    }
    return entityManager;
}
function getHttpServer() {
    return request(getTestServer().serverApplication.getHttpServer());
}
beforeAll(async () => {
    await generateTestingApplication();
});
afterAll(async () => {
    await (0, test_database_setup_1.teardownTestDatabase)();
    if (testServer?.serverApplication) {
        await testServer.serverApplication.close();
    }
});
//# sourceMappingURL=jestSetupAfterEnv.js.map