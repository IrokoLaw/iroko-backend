import { AccountTypeEnum } from '../../value-objects/account-type-value-object';
import { InvoicingTypeEnum } from '../../value-objects/invoicing-type-value-object';
import { AccountStatusEnum } from '../../value-objects/account-status-value-object';
import { CreateAccountProps } from './account.types';
import { AccountEntity } from './account.entity';

describe('AccountEntity', () => {
  let validAccountData: CreateAccountProps;

  beforeEach(() => {
    validAccountData = {
      type: AccountTypeEnum.SOLO,
      invoicingType: InvoicingTypeEnum.MONTHLY,
      capacity: 1,
    };
  });

  test('should create an account with valid data', () => {
    const account = AccountEntity.create(validAccountData);

    expect(account).toBeInstanceOf(AccountEntity);
    expect(account.getProps().type).toBe(AccountTypeEnum.SOLO);
    expect(account.getProps().invoicingType).toBe(InvoicingTypeEnum.MONTHLY);
    expect(account.getProps().status).toBe(AccountStatusEnum.ACTIVATED);
    expect(account.getProps().expirePaymentDate.getMonth()).toBe(
      new Date().getMonth() + 1,
    );
  });

  test('should throw error for invalid solo capacity', () => {
    validAccountData.capacity = 2;

    expect(() => AccountEntity.create(validAccountData)).toThrow(
      'Invoicing type must be monthly for solo account',
    );
  });

  test('should throw error for invalid enterprise capacity', () => {
    validAccountData.type = AccountTypeEnum.ENTERPRISE;
    validAccountData.capacity = 1;

    expect(() => AccountEntity.create(validAccountData)).toThrow(
      'Capacity must be greater than 1 when account type is enterprise',
    );
  });

  test('should update status correctly', () => {
    const account = AccountEntity.create(validAccountData);

    account.makeInactive();
    expect(account.getProps().status).toBe(AccountStatusEnum.INACTIVATED);

    account.makeActive();
    expect(account.getProps().status).toBe(AccountStatusEnum.ACTIVATED);

    account.makePendingPayment();
    expect(account.getProps().status).toBe(AccountStatusEnum.PENDING_PAYMENT);

    account.makeArchived();
    expect(account.getProps().status).toBe(AccountStatusEnum.ARCHIVED);
  });

  test('should convert solo account to enterprise', () => {
    const account = AccountEntity.create(validAccountData);

    account.makeEnterprise(5);
    expect(account.getProps().type).toBe(AccountTypeEnum.ENTERPRISE);
    expect(account.getProps().capacity).toBe(5);
  });

  test('should throw error when converting non-solo to enterprise', () => {
    validAccountData.type = AccountTypeEnum.ENTERPRISE;
    validAccountData.capacity = 2;
    const account = AccountEntity.create(validAccountData);

    expect(() => account.makeEnterprise(3)).toThrow(
      'Account is not a solo account',
    );
  });

  test('should update capacity for enterprise account', () => {
    validAccountData.type = AccountTypeEnum.ENTERPRISE;
    validAccountData.capacity = 2;
    const account = AccountEntity.create(validAccountData);

    account.updateCapacity(10);
    expect(account.getProps().capacity).toBe(10);
  });

  test('should throw error when updating capacity for non-enterprise account', () => {
    const account = AccountEntity.create(validAccountData);

    expect(() => account.updateCapacity(5)).toThrow(
      'Account is not a enterprise account',
    );
  });

  test('should update expire payment date correctly', () => {
    const account = AccountEntity.create(validAccountData);

    const oldExpireDate = account.getProps().expirePaymentDate;
    account.updateExpirePaymentDate(InvoicingTypeEnum.ANNUAL);

    expect(account.getProps().expirePaymentDate.getFullYear()).toBe(
      oldExpireDate.getFullYear() + 1,
    );
  });

  test('should convert enterprise account to solo', () => {
    validAccountData.type = AccountTypeEnum.ENTERPRISE;
    validAccountData.capacity = 2;
    const account = AccountEntity.create(validAccountData);

    account.makeSolo();
    expect(account.getProps().type).toBe(AccountTypeEnum.SOLO);
    expect(account.getProps().capacity).toBe(1);
  });

  test('should throw error when converting non-enterprise to solo', () => {
    const account = AccountEntity.create(validAccountData);

    expect(() => account.makeSolo()).toThrow(
      'Account is not an enterprise account',
    );
  });
  test('should throw error when a user chooses try invoicing type for enterprise account', () => {
    validAccountData.type = AccountTypeEnum.ENTERPRISE;
    validAccountData.invoicingType = InvoicingTypeEnum.TRY;
    validAccountData.capacity = 2;
    expect(() => AccountEntity.create(validAccountData)).toThrow(
      'Invoicing type must be monthly or annual for enterprise account',
    );
  });
});
