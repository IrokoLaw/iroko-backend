"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryBase = void 0;
const typeorm_transactional_1 = require("typeorm-transactional");
const oxide_ts_1 = require("oxide.ts");
const AppRequestContext_1 = require("../application/context/AppRequestContext");
const repository_port_1 = require("../domain/repository.port");
const exceptions_1 = require("../exceptions");
const database_exceptions_code_1 = require("../exceptions/database.exceptions.code");
class RepositoryBase {
    constructor(repository, mapper, logger) {
        this.repository = repository;
        this.mapper = mapper;
        this.logger = logger;
    }
    async insert(entity) {
        const entities = Array.isArray(entity) ? entity : [entity];
        entities.forEach((entity) => entity.validate());
        this.logger.debug(`[${AppRequestContext_1.RequestContextService.getRequestId()}] writing ${entities.length} entities to "${this.tableName}" table: ${entities
            .map((e) => e.id)
            .join(', ')}`);
        const records = entities.map(this.mapper.toPersistence);
        try {
            await this.repository
                .createQueryBuilder(this.tableName)
                .insert()
                .values(records)
                .execute();
        }
        catch (error) {
            if (error.code === database_exceptions_code_1.DATABASE_UNIQUE_VIOLATION_CODE ||
                error.code === database_exceptions_code_1.DATABASE_FOREIGN_KEY_VIOLATION_CODE) {
                this.logger.debug(`[${AppRequestContext_1.RequestContextService.getRequestId()}] ${error.detail}`);
                throw new exceptions_1.ConflictException('Record already exists', error);
            }
            throw error;
        }
    }
    async findOneById(id) {
        const result = await this.repository
            .createQueryBuilder(this.tableName)
            .where(`${this.tableName}.id = :id`, { id })
            .getOne();
        return result ? (0, oxide_ts_1.Some)(this.mapper.toDomain(result)) : oxide_ts_1.None;
    }
    async findAll() {
        const results = await this.repository
            .createQueryBuilder(this.tableName)
            .getMany();
        return results.map(this.mapper.toDomain);
    }
    async findManyByCondition(column, value) {
        const results = await this.repository
            .createQueryBuilder(this.tableName)
            .where(`${this.tableName}.${String(column)}= :value`, { value })
            .getMany();
        return results.map(this.mapper.toDomain);
    }
    async findAllPaginated(params) {
        const page = params.page ?? 1;
        const limit = params.limit ?? 10;
        const query = this.repository
            .createQueryBuilder(this.tableName)
            .skip((page - 1) * limit)
            .take(limit);
        if (params.orderBy?.field) {
            const orderField = params.orderBy.field === true
                ? `${this.tableName}.id`
                : `${this.tableName}.${String(params.orderBy.field)}`;
            query.orderBy(orderField, params.orderBy.param ?? 'ASC');
        }
        if (params.filterBy?.length) {
            params.filterBy.forEach((filter, index) => {
                const paramKey = `filter${index}`;
                const whereMethod = index === 0 ? 'where' : 'andWhere';
                query[whereMethod](`${this.tableName}.${String(filter.field)} IN (:...${paramKey})`, {
                    [paramKey]: Array.isArray(filter.value)
                        ? filter.value
                        : [filter.value],
                });
            });
        }
        const results = await query.getMany();
        const entities = results.map(this.mapper.toDomain);
        return new repository_port_1.Paginated({
            data: entities,
            count: results.length,
            limit: limit,
            page: page,
        });
    }
    async delete(entity) {
        entity.validate();
        const dbModel = this.mapper.toPersistence(entity);
        this.logger.debug(`[${AppRequestContext_1.RequestContextService.getRequestId()}] deleting entities ${entity.id} from ${this.tableName}`);
        const result = await this.repository
            .createQueryBuilder(this.tableName)
            .delete()
            .where('id = :id', { id: dbModel.id })
            .execute();
        return result.affected > 0;
    }
    async transaction(handler) {
        return (0, typeorm_transactional_1.runInTransaction)(handler, { propagation: typeorm_transactional_1.Propagation.REQUIRES_NEW });
    }
}
exports.RepositoryBase = RepositoryBase;
//# sourceMappingURL=reposiroty.base.js.map