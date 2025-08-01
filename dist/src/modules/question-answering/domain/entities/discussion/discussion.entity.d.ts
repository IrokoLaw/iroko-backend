import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { CreateDiscussionProps, DiscussionProps } from './discussion.type';
export declare class DiscussionEntity extends BaseEntity<DiscussionProps> {
    protected readonly _id: AggregateID;
    static create(data: CreateDiscussionProps): DiscussionEntity;
    validate(): void;
}
