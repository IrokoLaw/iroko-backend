import { Injectable } from "@nestjs/common";
import { Storage } from "@google-cloud/storage";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "@/config/config.type";

@Injectable()
export class GCSClient extends Storage {
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    super({
      projectId: configService.getOrThrow("gcsConfig.projectId", {
        infer: true,
      }),
      keyFilename: configService.getOrThrow("gcsConfig.keyFilename", {
        infer: true,
      }),
    });
  }
}

export const GCSClientProvider = {
  provide: GCSClient,
  useFactory: (configService: ConfigService<AllConfigType>) =>
    new GCSClient(configService),
  inject: [ConfigService],
};
