import { Storage } from "@google-cloud/storage";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "@/config/config.type";
export declare class GCSClient extends Storage {
    private readonly configService;
    constructor(configService: ConfigService<AllConfigType>);
}
export declare const GCSClientProvider: {
    provide: typeof GCSClient;
    useFactory: (configService: ConfigService<AllConfigType>) => GCSClient;
    inject: (typeof ConfigService)[];
};
