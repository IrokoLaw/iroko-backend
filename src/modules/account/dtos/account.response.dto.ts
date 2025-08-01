import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '../domain/value-objects/account-type-value-object';
import { InvoicingType } from '../domain/value-objects/invoicing-type-value-object';
import { AccountStatus } from '../domain/value-objects/account-status-value-object';
import { ResponseBase } from '@/libs/api/response.base';

export class AccountResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'SOLO',
    description: 'Account type',
  })
  type: AccountType;

  @ApiProperty({
    example: 'MONTHLY',
    description: 'Invoicing type',
  })
  invoicingType: InvoicingType;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Expire payment date',
  })
  expirePaymentDate: Date;

  @ApiProperty({
    example: 100,
    description: 'Capacity',
  })
  capacity: number;

  @ApiProperty({
    example: 'ACTIVATED',
    description: 'Account status',
  })
  status: AccountStatus;
}
