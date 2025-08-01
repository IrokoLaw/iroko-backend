import { ResponseBase } from '@/libs/api/response.base';
import { BrandEnum } from '../domain/value-objects/brand-value-object';
import { CardStatusEnum } from '../domain/value-objects/card-status-value-object';
export declare class CardResponseDto extends ResponseBase {
    brand: BrandEnum;
    token: string;
    numberLast4: string;
    expMonth: number;
    expYear: number;
    holderName: string;
    status: CardStatusEnum;
    isPrincipal: boolean;
    userId: string;
}
