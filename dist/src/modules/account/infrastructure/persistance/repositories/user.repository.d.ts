import { Repository } from 'typeorm';
import { UserRepositoryPort } from './user.repository.port';
import { RepositoryBase } from '@/libs/db/reposiroty.base';
import { UserDbEntity } from '../user.entity.db';
import { UserMapper } from '@/modules/account/mappers/user.mapper';
import { UserEntity } from '@/modules/account/domain/entities/user/user.entity';
export declare class UserRepository extends RepositoryBase<UserEntity, UserDbEntity> implements UserRepositoryPort {
    readonly mapper: UserMapper;
    readonly userRepository: Repository<UserDbEntity>;
    protected readonly tableName = "users";
    constructor(mapper: UserMapper, userRepository: Repository<UserDbEntity>);
}
