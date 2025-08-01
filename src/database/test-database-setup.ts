import 'reflect-metadata';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { config } from 'dotenv';
import * as path from 'path';
import { createDataSource } from './data-source-factory';
import { AppDataSource } from './data-source';
import { execSync } from 'child_process';

const envPath: string = path.resolve(
  __dirname,
  process.env.NODE_ENV === 'test' ? '../../.env.test' : '../../.env',
);

config({ path: envPath });

export async function initTestDatabase() {
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
}

export async function setupDatabaseTest() {
  const testContainer = await new PostgreSqlContainer()
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

export async function teardownTestDatabase(): Promise<void> {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Data source destroyed successfully.');
    }
  } catch (error) {
    console.error('Error while destroying the data source:', error);
  }

  await stopTestContainer();
}

export async function stopTestContainer() {
  try {
    execSync('docker remove alia-backend-test-database -f');
    console.log('Test container stopped successfully.');
  } catch (error) {
    console.error('Error while stopping the test container:', error);
  }
}
