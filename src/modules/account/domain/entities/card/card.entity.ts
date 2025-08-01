import { randomUUID } from 'crypto';
import { CardProps, CreateCardProps } from './card.type';
import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import {
  CardStatus,
  CardStatusEnum,
} from '../../value-objects/card-status-value-object';
import { Brand } from '../../value-objects/brand-value-object';

export class CardEntity extends BaseEntity<CardProps> {
  protected readonly _id: AggregateID;

  static create(data: CreateCardProps): CardEntity {
    const id = randomUUID();
    const status = new CardStatus({ value: CardStatusEnum.ACTIVATED });
    const brand = new Brand({ value: data.brand });
    const card = new CardEntity({
      id,
      props: {
        ...data,
        status: status.unpack(),
        brand: brand.unpack(),
      },
    });
    return card;
  }

  public changeCardStatus(status: CardStatusEnum) {
    this.props.status = status;
  }
  public updateExpYear(expYear: number) {
    this.props.expYear = expYear;
  }

  public makeExpire() {
    const now = new Date();
    if (this.props.expYear < now.getFullYear()) {
      this.changeCardStatus(CardStatusEnum.EXPIRED);
      return;
    }
    if (
      this.props.expYear === now.getFullYear() &&
      now.getMonth() > this.props.expMonth
    ) {
      this.changeCardStatus(CardStatusEnum.EXPIRED);
    }
  }
  public switchPrincipal() {
    this.props.isPrincipal = !this.props.isPrincipal;
  }

  public validate() {
    const count = this.props.numberLast4.length;
    if (count !== 4) {
      throw new Error('Number last 4 must be 4 digits');
    }

    if (this.props.expMonth > 12) {
      throw new Error('Expire date is invalid');
    }

    const now = new Date();
    if (
      this.props.expYear === now.getFullYear() &&
      now.getMonth() > this.props.expMonth
    ) {
      throw new Error('Expire month is in the past');
    }
    if (this.props.expYear < now.getFullYear()) {
      throw new Error('Expire date is in the past');
    }
  }
}
