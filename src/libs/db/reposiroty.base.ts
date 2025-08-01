import { Propagation, runInTransaction } from 'typeorm-transactional';
import { LoggerPort } from '../ports/logger.port';
import { ObjectLiteral, Repository } from 'typeorm';
import { None, Option, Some } from 'oxide.ts';
import { RequestContextService } from '../application/context/AppRequestContext';
import {
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from '../domain/repository.port';
import { Mapper } from '../domain/mapper.interface';
import { BaseEntity } from '../domain/entity.base';
import { ConflictException } from '../exceptions';
import {
  DATABASE_FOREIGN_KEY_VIOLATION_CODE,
  DATABASE_UNIQUE_VIOLATION_CODE,
} from '../exceptions/database.exceptions.code';

export abstract class RepositoryBase<
  Entity extends BaseEntity<any>,
  DbEntity extends ObjectLiteral,
> implements RepositoryPort<Entity>
{
  protected abstract tableName: string;

  constructor(
    private readonly repository: Repository<DbEntity>,
    protected readonly mapper: Mapper<Entity, DbEntity>,
    protected readonly logger: LoggerPort,
  ) {}

  async insert(entity: Entity | Entity[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];

    entities.forEach((entity) => entity.validate());

    this.logger.debug(
      `[${RequestContextService.getRequestId()}] writing ${
        entities.length
      } entities to "${this.tableName}" table: ${entities
        .map((e) => e.id)
        .join(', ')}`,
    );

    const records = entities.map(this.mapper.toPersistence);

    try {
      await this.repository
        .createQueryBuilder(this.tableName)
        .insert()
        .values(records)
        .execute();
    } catch (error) {
      if (
        error.code === DATABASE_UNIQUE_VIOLATION_CODE ||
        error.code === DATABASE_FOREIGN_KEY_VIOLATION_CODE
      ) {
        this.logger.debug(
          `[${RequestContextService.getRequestId()}] ${error.detail}`,
        );
        throw new ConflictException('Record already exists', error);
      }

      throw error;
    }
  }

  async findOneById(id: string): Promise<Option<Entity>> {
    const result = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id = :id`, { id })
      .getOne();

    return result ? Some(this.mapper.toDomain(result)) : None;
  }

  async findAll(): Promise<Entity[]> {
    const results = await this.repository
      .createQueryBuilder(this.tableName)
      .getMany();

    return results.map(this.mapper.toDomain);
  }

  async findManyByCondition<T>(
    column: keyof T,
    value: string,
  ): Promise<Entity[]> {
    const results = await this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.${String(column)}= :value`, { value })
      .getMany();

    return results.map(this.mapper.toDomain);
  }

  async findAllPaginated<T>(
    params: PaginatedQueryParams<T>,
  ): Promise<Paginated<Entity>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    const query = this.repository
      .createQueryBuilder(this.tableName)
      .skip((page - 1) * limit)
      .take(limit);

    // Apply ordering if provided
    if (params.orderBy?.field) {
      const orderField =
        params.orderBy.field === true
          ? `${this.tableName}.id` // Default ordering by ID
          : `${this.tableName}.${String(params.orderBy.field)}`;

      query.orderBy(orderField, params.orderBy.param ?? 'ASC');
    }

    // Apply filtering if filters exist
    if (params.filterBy?.length) {
      params.filterBy.forEach((filter, index) => {
        const paramKey = `filter${index}`;
        const whereMethod = index === 0 ? 'where' : 'andWhere';

        query[whereMethod](
          `${this.tableName}.${String(filter.field)} IN (:...${paramKey})`,
          {
            [paramKey]: Array.isArray(filter.value)
              ? filter.value
              : [filter.value],
          },
        );
      });
    }

    const results = await query.getMany();

    const entities = results.map(this.mapper.toDomain);

    return new Paginated({
      data: entities,
      count: results.length,
      limit: limit,
      page: page,
    });
  }

  async delete(entity: Entity): Promise<boolean> {
    entity.validate();
    const dbModel = this.mapper.toPersistence(entity);

    this.logger.debug(
      `[${RequestContextService.getRequestId()}] deleting entities ${
        entity.id
      } from ${this.tableName}`,
    );

    const result = await this.repository
      .createQueryBuilder(this.tableName)
      .delete()
      .where('id = :id', { id: dbModel.id })
      .execute();

    return result.affected > 0;
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return runInTransaction(handler, { propagation: Propagation.REQUIRES_NEW });
  }
}
