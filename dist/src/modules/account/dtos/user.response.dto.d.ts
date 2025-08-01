import { ResponseBase } from '@/libs/api/response.base';
export declare class UserResponseDto extends ResponseBase {
    firstName: string;
    lastName: string;
    email: string;
    externalUserId: string;
}
