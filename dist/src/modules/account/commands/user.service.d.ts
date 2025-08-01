import { UserRepositoryPort } from '../infrastructure/persistance/repositories/user.repository.port';
import { CreateUserProps } from '../domain/entities/user/user.types';
import { Err, Ok } from 'oxide.ts';
import { UserAlreadyExistsError } from '../domain/entities/user/user.errors';
export declare class UserService {
    protected readonly userRepo: UserRepositoryPort;
    constructor(userRepo: UserRepositoryPort);
    create(data: CreateUserProps): Promise<Ok<string> | Err<UserAlreadyExistsError>>;
}
