"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv_1 = require("dotenv");
const path = require("path");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const envPath = path.resolve(__dirname, process.env.NODE_ENV === 'test' ? '../../.env.test' : '../../.env');
(0, dotenv_1.config)({ path: envPath });
const dataSourceOption = {
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
    entities: [__dirname + '/../**/*.entity.db{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        entitiesDir: 'src',
        subscribersDir: 'subscriber',
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
exports.AppDataSource = new typeorm_1.DataSource(dataSourceOption);
//# sourceMappingURL=data-source.js.map