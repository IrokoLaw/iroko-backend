import { DatabaseConfig } from "@/database/config/database-config.type";
import { AppConfig } from "./app-config.type";
import { AuthConfig } from "@/modules/auth/config/auth-config.type";
import { S3Config } from "../file-storage/config/s3-config-types";
import { LLMConfig } from "./llm-config-types";
import { GCSConfig } from "@/gcs/config/gcs-config-types";

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
  s3Config: S3Config;
  llmConfig: LLMConfig;
  gcsConfig: GCSConfig;
};
