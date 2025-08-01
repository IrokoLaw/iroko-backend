import { PaginatedParams, PaginatedQueryBase } from '@/libs/domain/query.base';
import { Result } from 'oxide.ts';
import { UserRepositoryPort } from '../infrastructure/persistance/repositories/user.repository.port';
import { Paginated } from '@/libs/domain/repository.port';
import { UserEntity } from '../domain/entities/user/user.entity';
import { UserProps } from '../domain/entities/user/user.types';
export declare class FindUsersQuery extends PaginatedQueryBase<UserProps> {
    constructor(props: PaginatedParams<FindUsersQuery, UserProps>);
}
export declare class UserQueryHandler {
    private readonly repository;
    constructor(repository: UserRepositoryPort);
    list(query: FindUsersQuery): Promise<Result<Paginated<UserEntity>, Error>>;
}
