"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTestDatabase = initTestDatabase;
exports.setupDatabaseTest = setupDatabaseTest;
exports.teardownTestDatabase = teardownTestDatabase;
exports.stopTestContainer = stopTestContainer;
require("reflect-metadata");
const postgresql_1 = require("@testcontainers/postgresql");
const dotenv_1 = require("dotenv");
const path = require("path");
const data_source_factory_1 = require("./data-source-factory");
const data_source_1 = require("./data-source");
const child_process_1 = require("child_process");
const envPath = path.resolve(__dirname, process.env.NODE_ENV === 'test' ? '../../.env.test' : '../../.env');
(0, dotenv_1.config)({ path: envPath });
async function initTestDatabase() {
    try {
        console.log('\nStart initialization');
        const dataSource = await (0, data_source_factory_1.createDataSource)();
        console.log('Data Source Initialized.');
        console.log('Running migrations...');
        await dataSource.runMigrations();
        console.log('Migrations ran successfully.');
        await dataSource.destroy();
    }
    catch (error) {
        console.error('Error running migrations:', error);
        await stopTestContainer();
        process.exit(1);
    }
}
async function setupDatabaseTest() {
    const testContainer = await new postgresql_1.PostgreSqlContainer()
        .withName('alia-backend-test-database')
        .withExposedPorts(5432)
        .withDatabase(process.env.DATABASE_NAME)
        .withPassword(process.env.DATABASE_PASSWORD)
        .withUsername(process.env.DATABASE_USERNAME)
        .start();
    process.env.DATABASE_HOST = testContainer.getHost();
    process.env.DATABASE_PORT = testContainer.getPort().toString();
    process.env.SETUP_TEST_DATABASE = 'ok';
}
async function teardownTestDatabase() {
    try {
        if (data_source_1.AppDataSource.isInitialized) {
            await data_source_1.AppDataSource.destroy();
            console.log('Data source destroyed successfully.');
        }
    }
    catch (error) {
        console.error('Error while destroying the data source:', error);
    }
    await stopTestContainer();
}
async function stopTestContainer() {
    try {
        (0, child_process_1.execSync)('docker remove alia-backend-test-database -f');
        console.log('Test container stopped successfully.');
    }
    catch (error) {
        console.error('Error while stopping the test container:', error);
    }
}
//# sourceMappingURL=test-database-setup.js.map