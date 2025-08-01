import { BrandEnum } from '../../value-objects/brand-value-object';
import { CardStatusEnum } from '../../value-objects/card-status-value-object';
import { CardEntity } from './card.entity';
import { CreateCardProps } from './card.type';

describe('CardEntity', () => {
  let validCardData: CreateCardProps;
  beforeEach(() => {
    validCardData = {
      brand: BrandEnum.VISA,
      token: 'a3f1b2c4d5e67890f12a34bc5678de90abcdef1234567890abcdef1234567890',
      numberLast4: '1234',
      expMonth: 10,
      expYear: 2026,
      holderName: 'Sanga Ousmani',
      isPrincipal: true,
      userId: '12334',
    };
  });

  test('should create an card with valid data ', () => {
    const card = CardEntity.create(validCardData);
    expect(card).toBeInstanceOf(CardEntity);
    expect(card.getProps().brand).toBe(BrandEnum.VISA);
    expect(card.getProps().status).toBe(CardStatusEnum.ACTIVATED);
  });

  test('should update an card with valid data', () => {
    const card = CardEntity.create(validCardData);
    card.updateExpYear(2024);
    card.makeExpire();
    expect(card.getProps().status).toBe(CardStatusEnum.EXPIRED);
  });

  test('should update an card when property change to prinicipal', () => {
    const card = CardEntity.create(validCardData);
    card.switchPrincipal();
    expect(card.getProps().isPrincipal).toBe(false);
  });
});
