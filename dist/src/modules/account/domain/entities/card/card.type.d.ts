import { BrandEnum } from '../../value-objects/brand-value-object';
import { CardStatusEnum } from '../../value-objects/card-status-value-object';
export interface CardProps {
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
export interface CreateCardProps {
    brand: BrandEnum;
    token: string;
    numberLast4: string;
    expMonth: number;
    expYear: number;
    holderName: string;
    isPrincipal: boolean;
    userId: string;
}
