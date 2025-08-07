import { IsString, MinLength } from "class-validator";
import { GCSConfig } from "./gcs-config-types";
import { registerAs } from "@nestjs/config";
import validateConfig from "@/utils/validate-config";

class EnvironmentVariablesValidator {
  @IsString()
  @MinLength(1)
  GCS_PROJECT_ID: string;

  @IsString()
  @MinLength(1)
  GCS_BUCKET: string;

  @IsString()
  @MinLength(1)
  GCS_KEY_FILENAME: string;

  @IsString()
  @MinLength(1)
  GCS_FILE_PREFIX: string;
}

export default registerAs<GCSConfig>("gcsConfig", () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    projectId: process.env.GCS_PROJECT_ID,
    bucket: process.env.GCS_BUCKET,
    keyFilename: process.env.GCS_KEY_FILENAME,
    filePrefix: process.env.GCS_FILE_PREFIX,
  };
});
