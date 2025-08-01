import { ClerkClient } from '@clerk/backend';
import { CreateUserRequestDto } from './create-auth-user.request.dto';
import { Ok } from 'oxide.ts';
export declare class AuthService {
    private readonly clerkClient;
    constructor(clerkClient: ClerkClient);
    createUser(create: CreateUserRequestDto): Promise<Ok<import("@clerk/backend").User>>;
}
