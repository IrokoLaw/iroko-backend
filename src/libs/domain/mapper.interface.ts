import { ObjectLiteral } from '../types/object-literal.type';
import { BaseEntity } from './entity.base';

export interface Mapper<
  DomainEntity extends BaseEntity<any>,
  DbRecord extends ObjectLiteral,
  Response = any,
> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: DbRecord): DomainEntity;
  toResponse(entity: DomainEntity): Response;
}
