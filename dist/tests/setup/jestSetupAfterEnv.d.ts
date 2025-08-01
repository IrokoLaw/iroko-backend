import { TestingModuleBuilder, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as request from 'supertest';
import { EntityManager } from 'typeorm';
export declare class TestServer {
    readonly serverApplication: NestExpressApplication;
    readonly testingModule: TestingModule;
    constructor(serverApplication: NestExpressApplication, testingModule: TestingModule);
    static new(testingModuleBuilder: TestingModuleBuilder): Promise<TestServer>;
}
export declare function generateTestingApplication(): Promise<void>;
export declare function getTestServer(): TestServer;
export declare function getEntityManager(): EntityManager;
export declare function getHttpServer(): import("supertest/lib/agent")<request.SuperTestStatic.Test>;
