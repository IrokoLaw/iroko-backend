import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { ExceptionInterceptor } from './libs/application/interceptors/exception.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  addTransactionalDataSource,
  getDataSourceByName,
} from 'typeorm-transactional';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database/config/database.config';
import s3Config from './file-storage/config/s3-config';
import llmConfig from './config/llm-config';
import appConfig from './config/app-config';
import { UserModule } from './modules/account/user.module';
import { RequestContextModule } from 'nestjs-request-context';
import authConfig from './modules/auth/config/auth.config';
import { QuestionAnsweringModule } from './modules/question-answering/question-answering.module';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return (
      getDataSourceByName('default') ||
      addTransactionalDataSource(new DataSource(options)).initialize()
    );
  },
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig, s3Config, llmConfig],
      envFilePath: [
        process.env.NODE_ENV == 'test' ? '../.env.test' : '../.env',
      ],
    }),
    infrastructureDatabaseModule,
    RequestContextModule,

    UserModule,
    QuestionAnsweringModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...interceptors],
})
export class AppModule {}
