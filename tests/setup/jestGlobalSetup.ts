import { createDataSource } from '../../src/database/data-source-factory';
import { stopTestContainer } from '../../src/database/test-database-setup';

module.exports = async (): Promise<void> => {
  try {
    // Start the test container and update process.env with the container values
    console.log('\nStart initialization');

    const dataSource = await createDataSource();

    console.log('Data Source Initialized.');

    // Run migrations
    console.log('Running migrations...');
    await dataSource.runMigrations();

    console.log('Migrations ran successfully.');

    // Close the data source connection
    await dataSource.destroy();
  } catch (error) {
    console.error('Error running migrations:', error);
    await stopTestContainer();
    process.exit(1);
  }
};
