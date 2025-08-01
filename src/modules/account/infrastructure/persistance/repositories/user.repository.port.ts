import { RepositoryPort } from '@/libs/domain/repository.port';
import { UserEntity } from '@/modules/account/domain/entities/user/user.entity';

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {}
