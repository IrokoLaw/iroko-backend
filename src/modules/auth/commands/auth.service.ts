import { Inject, Injectable } from '@nestjs/common';
import { AUTH_TOKEN } from '../auth-di.token';
import { ClerkClient } from '@clerk/backend';
import { CreateUserRequestDto } from './create-auth-user.request.dto';
import { Ok } from 'oxide.ts';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_TOKEN)
    private readonly clerkClient: ClerkClient,
  ) {}

  async createUser(create: CreateUserRequestDto) {
    const user = await this.clerkClient.users.createUser({
      emailAddress: [create.email],
      password: create.password,
      skipPasswordChecks: false,
    });

    return Ok(user);
  }
}
