import { BaseEntityProps } from './entity.base';
import { OrderBy, PaginatedQueryParams } from './repository.port';
export declare abstract class QueryBase {
}
export declare abstract class PaginatedQueryBase<P> extends QueryBase {
    limit: number;
    offset: number;
    orderBy: OrderBy<P extends BaseEntityProps ? P : never>;
    page: number;
    constructor(props: PaginatedParams<PaginatedQueryBase<P>, P>);
}
export type PaginatedParams<T, P> = Omit<T, 'limit' | 'offset' | 'orderBy' | 'page'> & Partial<Omit<PaginatedQueryParams<P>, 'offset'>>;
