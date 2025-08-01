import { UserService } from './user.service';
import { IdResponse } from '@/libs/api/id.response.dto';
import { CreateUserRequestDto } from './create-user.request.dto';
export declare class UserCommandHttpController {
    private readonly service;
    constructor(service: UserService);
    create(body: CreateUserRequestDto): Promise<IdResponse>;
}
