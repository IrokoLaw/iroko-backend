"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataSource = createDataSource;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const test_database_setup_1 = require("./test-database-setup");
const dotenv_1 = require("dotenv");
const path = require("path");
const envPath = path.resolve(__dirname, process.env.NODE_ENV === 'test' ? '../../.env.test' : '../../.env');
(0, dotenv_1.config)({ path: envPath });
async function createDataSource() {
    if (process.env.NODE_ENV === 'test' && !process.env.SETUP_TEST_DATABASE) {
        await (0, test_database_setup_1.setupDatabaseTest)();
        console.log('Test container ready:', process.env.DATABASE_HOST, process.env.DATABASE_PORT);
    }
    try {
        const dataSourceOptions = {
            type: process.env.DATABASE_TYPE,
            url: process.env.DATABASE_URL,
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT
                ? parseInt(process.env.DATABASE_PORT, 10)
                : 5432,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
            dropSchema: false,
            keepConnectionAlive: true,
            logging: process.env.NODE_ENV !== 'production',
            entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
            migrations: [path.join(__dirname, '../../dist/src/database/migrations')],
            cli: {
                entitiesDir: 'dist',
                subscribersDir: 'subscriber',
                migrationsDir: 'dist',
            },
            extra: {
                max: process.env.DATABASE_MAX_CONNECTIONS
                    ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
                    : 100,
                ssl: process.env.DATABASE_SSL_ENABLED === 'true'
                    ? {
                        rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
                        ca: process.env.DATABASE_CA ?? undefined,
                        key: process.env.DATABASE_KEY ?? undefined,
                        cert: process.env.DATABASE_CERT ?? undefined,
                    }
                    : undefined,
            },
        };
        const dataSource = new typeorm_1.DataSource(dataSourceOptions);
        await dataSource.initialize();
        return dataSource;
    }
    catch (error) {
        console.error('Database initialization failed:', error);
        await (0, test_database_setup_1.stopTestContainer)();
        process.exit(1);
    }
}
//# sourceMappingURL=data-source-factory.js.map