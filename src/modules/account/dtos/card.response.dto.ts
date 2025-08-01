import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@/libs/api/response.base';
import { BrandEnum } from '../domain/value-objects/brand-value-object';
import { CardStatusEnum } from '../domain/value-objects/card-status-value-object';

export class CardResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'VISA',
    description: 'Brand of the card',
  })
  brand: BrandEnum;

  @ApiProperty({
    example: 'tok_123456789',
    description: 'Unique token associated with the card',
  })
  token: string;

  @ApiProperty({
    example: '4242',
    description: 'Last 4 digits of the card number',
  })
  numberLast4: string;

  @ApiProperty({
    example: 12,
    description: 'Expiration month of the card',
  })
  expMonth: number;

  @ApiProperty({
    example: 2025,
    description: 'Expiration year of the card',
  })
  expYear: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the card holder',
  })
  holderName: string;

  @ApiProperty({
    example: 'ACTIVATED',
    description: 'Status of the card',
  })
  status: CardStatusEnum;

  @ApiProperty({
    example: true,
    description: 'Indicates if this is the principal card of the user',
  })
  isPrincipal: boolean;

  @ApiProperty({
    example: 'user_12345',
    description: 'ID of the user who owns the card',
  })
  userId: string;
}
