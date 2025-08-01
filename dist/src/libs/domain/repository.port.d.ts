import { Option } from 'oxide.ts';
export declare class Paginated<T> {
    readonly count: number;
    readonly limit: number;
    readonly page: number;
    readonly data: readonly T[];
    constructor(props: Paginated<T>);
}
export type OrderBy<T> = {
    field: keyof T | true;
    param: 'ASC' | 'DESC';
};
export type FilterBy<T> = {
    field: keyof T;
    value: string;
}[];
export type PaginatedQueryParams<T> = {
    limit?: number;
    page?: number;
    filterBy?: FilterBy<T>;
    orderBy: OrderBy<T>;
};
export interface RepositoryPort<Entity> {
    insert(entity: Entity | Entity[]): Promise<void>;
    findOneById(id: string): Promise<Option<Entity>>;
    findManyByCondition<T>(column: keyof T, value: string | string[]): Promise<Entity[]>;
    findAll(): Promise<Entity[]>;
    findAllPaginated<T>(params: PaginatedQueryParams<T>): Promise<Paginated<Entity>>;
    delete(entity: Entity): Promise<boolean>;
    transaction<T>(handler: () => Promise<T>): Promise<T>;
}
