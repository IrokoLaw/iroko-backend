import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@/libs/api/response.base';
import { TransactionCurrencyEnum } from '../domain/value-objects/transaction-currency-value-object';
import { TransactionStatusEnum } from '../domain/value-objects/transaction-status-value-object';
import { TransactionMethodEnum } from '../domain/value-objects/transaction-method-value-object';

export class TransactionResponseDto extends ResponseBase {
  @ApiProperty({
    example: 100.5,
    description: 'Transaction amount',
  })
  amount: number;

  @ApiProperty({
    example: 'XOF',
    description: 'Transaction currency',
    enum: TransactionCurrencyEnum,
  })
  currency: TransactionCurrencyEnum;

  @ApiProperty({
    example: 'US',
    description: 'Country where the transaction was made',
  })
  country: string;

  @ApiProperty({
    example: 'SUCCESS',
    description: 'Transaction Status',
    enum: TransactionStatusEnum,
  })
  status: TransactionStatusEnum;

  @ApiProperty({
    example: 'card_12345abcdef',
    description: 'ID of the card used for the transaction',
  })
  cardId: string;

  @ApiProperty({
    example: 'op_67890xyz',
    description: 'Transaction ID related to the transaction',
  })
  operationId: string;

  @ApiProperty({
    example: 'ONLINE_PAYMENT',
    description: 'Method used for the transaction',
    enum: TransactionMethodEnum,
  })
  method: TransactionMethodEnum;

  @ApiProperty({
    example: '2024-02-17T12:34:56.789Z',
    description: 'Date and time of transaction',
  })
  date: string;
}
