import { LoggerPort } from '../ports/logger.port';
import { ObjectLiteral, Repository } from 'typeorm';
import { Option } from 'oxide.ts';
import { Paginated, PaginatedQueryParams, RepositoryPort } from '../domain/repository.port';
import { Mapper } from '../domain/mapper.interface';
import { BaseEntity } from '../domain/entity.base';
export declare abstract class RepositoryBase<Entity extends BaseEntity<any>, DbEntity extends ObjectLiteral> implements RepositoryPort<Entity> {
    private readonly repository;
    protected readonly mapper: Mapper<Entity, DbEntity>;
    protected readonly logger: LoggerPort;
    protected abstract tableName: string;
    constructor(repository: Repository<DbEntity>, mapper: Mapper<Entity, DbEntity>, logger: LoggerPort);
    insert(entity: Entity | Entity[]): Promise<void>;
    findOneById(id: string): Promise<Option<Entity>>;
    findAll(): Promise<Entity[]>;
    findManyByCondition<T>(column: keyof T, value: string): Promise<Entity[]>;
    findAllPaginated<T>(params: PaginatedQueryParams<T>): Promise<Paginated<Entity>>;
    delete(entity: Entity): Promise<boolean>;
    transaction<T>(handler: () => Promise<T>): Promise<T>;
}
