import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { randomUUID } from 'crypto';
import { CreateAccountProps, AccountProps } from './account.types';
import {
  AccountType,
  AccountTypeEnum,
} from '../../value-objects/account-type-value-object';
import {
  InvoicingType,
  InvoicingTypeEnum,
} from '../../value-objects/invoicing-type-value-object';
import {
  AccountStatus,
  AccountStatusEnum,
} from '../../value-objects/account-status-value-object';
import { FREE_DAY } from '@/modules/account/constant';

export class AccountEntity extends BaseEntity<AccountProps> {
  protected readonly _id: AggregateID;

  static create(data: CreateAccountProps): AccountEntity {
    const id = randomUUID();

    const accountType = new AccountType({ value: data.type });
    const invoicingType = new InvoicingType({ value: data.invoicingType });
    const status = new AccountStatus({ value: AccountStatusEnum.ACTIVATED });
    const expirePaymentDate = AccountEntity.calculateExpirationDate(
      data.invoicingType,
    );
    const account = new AccountEntity({
      id,
      props: {
        ...data,
        type: accountType.unpack(),
        invoicingType: invoicingType.unpack(),
        status: status.unpack(),
        expirePaymentDate,
      },
    });
    return account;
  }

  private changeStatus(status: AccountStatusEnum) {
    this.props.status = status;
  }

  public makeInactive() {
    this.changeStatus(AccountStatusEnum.INACTIVATED);
  }
  public makeActive() {
    this.changeStatus(AccountStatusEnum.ACTIVATED);
  }

  public makePendingPayment() {
    this.changeStatus(AccountStatusEnum.PENDING_PAYMENT);
  }

  public makeArchived() {
    this.changeStatus(AccountStatusEnum.ARCHIVED);
  }

  private changeType(type: AccountTypeEnum) {
    this.props.type = type;
  }

  public makeEnterprise(capacity?: number) {
    const capacityValue = capacity ?? 2;

    if (this.props.type == AccountTypeEnum.SOLO) {
      this.props.capacity = capacityValue;
      this.changeType(AccountTypeEnum.ENTERPRISE);
    } else {
      throw new Error('Account is not a solo account');
    }
  }

  public updateCapacity(capacity: number) {
    if (this.props.type == AccountTypeEnum.ENTERPRISE) {
      this.props.capacity = capacity;
    } else {
      throw new Error('Account is not a enterprise account');
    }
  }

  public updateExpirePaymentDate(invType: InvoicingTypeEnum) {
    this.props.expirePaymentDate =
      AccountEntity.calculateExpirationDate(invType);
  }

  static calculateExpirationDate(invType: InvoicingTypeEnum) {
    const newDate = new Date();
    switch (invType) {
      case InvoicingTypeEnum.ANNUAL:
        newDate.setFullYear(newDate.getFullYear() + 1);

        break;
      case InvoicingTypeEnum.MONTHLY:
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case InvoicingTypeEnum.TRY:
        newDate.setDate(newDate.getDate() + FREE_DAY);
        break;
      default:
        throw new Error('Invalid invoicing type');
    }

    return newDate;
  }

  public makeSolo() {
    const capacityValue = 1;

    if (this.props.type == AccountTypeEnum.ENTERPRISE) {
      this.props.capacity = capacityValue;
      this.changeType(AccountTypeEnum.SOLO);
    } else {
      throw new Error('Account is not an enterprise account');
    }
  }

  private validateAccountType() {
    switch (this.props.type) {
      case AccountTypeEnum.SOLO:
        if (this.props.capacity !== 1) {
          throw new Error('Invoicing type must be monthly for solo account');
        }
        break;
      case AccountTypeEnum.ENTERPRISE:
        if (this.props.capacity < 2) {
          throw new Error(
            'Capacity must be greater than 1 when account type is enterprise',
          );
        }
        if (this.props.invoicingType == InvoicingTypeEnum.TRY) {
          throw new Error(
            'Invoicing type must be monthly or annual for enterprise account',
          );
        }
        break;
      default:
        throw new Error('Account type is invalid');
    }
  }
  public validate() {
    this.validateAccountType();
    const now = new Date();
    if (this.props.expirePaymentDate.getTime() < now.getTime()) {
      throw new Error('Expire payment date must be in the future');
    }
  }
}
