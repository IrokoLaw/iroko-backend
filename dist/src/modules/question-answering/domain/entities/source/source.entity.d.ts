import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { CreateSourceProps, SourceProps } from './source.type';
export declare class SourceEntity extends BaseEntity<SourceProps> {
    protected readonly _id: AggregateID;
    static create(data: CreateSourceProps): SourceEntity;
    validate(): void;
}
