import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GCSClient, GCSClientProvider } from "./gcs-client";
import { GCSService } from "./gcs.service";

/**
 * File Storage Module
 *
 * This module provides file storage capabilities through a hexagonal architecture.
 * It allows switching between different storage providers (S3, GCS) by changing
 * the implementation of the FileStoragePort.
 */
@Module({
  imports: [ConfigModule],
  providers: [
    // GCS implementation
    GCSClient,
    GCSClientProvider,
    GCSService,
  ],
  exports: [GCSService],
})
export class FileStorageModule {}
