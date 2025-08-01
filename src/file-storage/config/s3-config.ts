import { IsString, MinLength } from 'class-validator';
import { S3Config } from './s3-config-types';
import { registerAs } from '@nestjs/config';
import validateConfig from '@/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @MinLength(1)
  S3_REGION: string;

  @IsString()
  @MinLength(1)
  S3_BUCKET: string;

  @IsString()
  @MinLength(1)
  S3_ACCESS_KEY_ID: string;

  @IsString()
  @MinLength(1)
  S3_SECRET_ACCESS_KEY: string;

  @IsString()
  @MinLength(1)
  S3_FILE_PREFIX: string;
}

export default registerAs<S3Config>('s3Config', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    filePrefix: process.env.S3_FILE_PREFIX,
  };
});
