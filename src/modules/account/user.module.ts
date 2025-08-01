import { Logger, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserMapper } from './mappers/user.mapper';
import { UserRepository } from './infrastructure/persistance/repositories/user.repository';
import { UserDbEntity } from './infrastructure/persistance/user.entity.db';
import { UserCommandHttpController } from './commands/user-command.controller';
import { UserService } from './commands/user.service';
import { UserQueryHttpController } from './queries/user-queries.controller';
import { UserQueryHandler } from './queries/user-query-handler';
import { USER_REPOSITORY } from './user.di-token';

const httpControllers = [UserCommandHttpController, UserQueryHttpController];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

const handlers = [UserQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserDbEntity])],
  controllers: [...httpControllers],
  providers: [Logger, UserService, ...repositories, ...handlers, ...mappers],
})
export class UserModule {}
