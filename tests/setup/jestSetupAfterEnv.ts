import { Test, TestingModuleBuilder, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as request from 'supertest';
import { ValidationPipe } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from '@/app.module';
import { teardownTestDatabase } from '@/database/test-database-setup';

export class TestServer {
  constructor(
    public readonly serverApplication: NestExpressApplication,
    public readonly testingModule: TestingModule,
  ) {}

  public static async new(
    testingModuleBuilder: TestingModuleBuilder,
  ): Promise<TestServer> {
    initializeTransactionalContext();

    const testingModule: TestingModule = await testingModuleBuilder.compile();
    const app: NestExpressApplication = testingModule.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.enableShutdownHooks();

    await app.init();

    return new TestServer(app, testingModule);
  }
}

let testServer: TestServer;
let entityManager: EntityManager;

export async function generateTestingApplication(): Promise<void> {
  testServer = await TestServer.new(
    Test.createTestingModule({
      imports: [AppModule],
    }),
  );

  entityManager = testServer.testingModule.get(EntityManager);

  console.log('Test server and entity manager initialized');
}

export function getTestServer(): TestServer {
  if (!testServer) {
    throw new Error(
      'Test server not initialized. Did you call generateTestingApplication()?',
    );
  }
  return testServer;
}

export function getEntityManager(): EntityManager {
  if (!entityManager) {
    throw new Error(
      'Entity manager not initialized. Did you call generateTestingApplication()?',
    );
  }
  return entityManager;
}

export function getHttpServer() {
  return request(getTestServer().serverApplication.getHttpServer());
}

// Setup
beforeAll(async (): Promise<void> => {
  await generateTestingApplication();
});

// // Cleanup
afterAll(async (): Promise<void> => {
  await teardownTestDatabase();
  if (testServer?.serverApplication) {
    await testServer.serverApplication.close();
  }
});
