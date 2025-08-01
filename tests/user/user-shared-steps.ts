import { DefineStepFunction } from 'jest-cucumber';
import { Mutable } from '@/libs/types';
import { CreateUserRequestDto } from '@/modules/account/commands/create-user.request.dto';
import { ApiClient } from '@tests/test-utils/api-client';
import { TestContext } from '@tests/test-utils/text-context';

/**
 * Test steps that are shared between multiple users tests
 */

export type CreateUserTestContext = {
  createUserDto: Mutable<CreateUserRequestDto>;
};

export const givenUserData = (
  given: DefineStepFunction,
  ctx: TestContext<CreateUserTestContext>,
): void => {
  given(/^user data$/, (table: CreateUserRequestDto[]) => {
    ctx.context.createUserDto = table[0];
  });
};

export const iSendARequestToCreateAUser = (
  when: DefineStepFunction,
  ctx: TestContext<CreateUserTestContext>,
): void => {
  when('I send a request to create the user', async () => {
    const response = await new ApiClient().createUser(
      ctx.context.createUserDto,
    );

    ctx.latestResponse = response;
  });
};
