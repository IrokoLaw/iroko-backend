import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { randomUUID } from 'crypto';
import { CreateSourceProps, SourceProps } from './source.type';
import { SourceStatus } from '../../values-objects/text-status-value-object';
import { SourceAction } from '../../values-objects/text-action-object-value';
import { SourceBloc } from '../../values-objects/source-bloc-value-object';
import { LegalTextType } from '../../values-objects/legal-text-type-value-object';

export class SourceEntity extends BaseEntity<SourceProps> {
  protected readonly _id: AggregateID;

  static create(data: CreateSourceProps): SourceEntity {
    const id = randomUUID();
    const status = new SourceStatus({ value: data.status });
    const action = new SourceAction({ value: data.action });
    const bloc = new SourceBloc({ value: data.bloc });
    const legalTextType = new LegalTextType({
      value: data.legalTextType,
    });
    const source = new SourceEntity({
      id,
      props: {
        ...data,
        status: status.unpack(),
        action: action.unpack(),
        bloc: bloc.unpack(),
        legalTextType: legalTextType.unpack(),
      },
    });
    return source;
  }

  public validate() {}
}
