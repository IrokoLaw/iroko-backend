"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_factory_1 = require("../../src/database/data-source-factory");
const test_database_setup_1 = require("../../src/database/test-database-setup");
module.exports = async () => {
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
        await (0, test_database_setup_1.stopTestContainer)();
        process.exit(1);
    }
};
//# sourceMappingURL=jestGlobalSetup.js.map