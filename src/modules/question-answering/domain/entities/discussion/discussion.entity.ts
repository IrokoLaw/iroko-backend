import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { CreateDiscussionProps, DiscussionProps } from './discussion.type';
import { randomUUID } from 'crypto';

export class DiscussionEntity extends BaseEntity<DiscussionProps> {
  protected readonly _id: AggregateID;

  static create(data: CreateDiscussionProps): DiscussionEntity {
    const id = randomUUID();
    const discussion = new DiscussionEntity({
      id,
      props: {
        ...data,
      },
    });
    return discussion;
  }

  public validate() {
    if (this.props.title === '') {
      throw new Error('the title is invalid');
    }
  }
}
