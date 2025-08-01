import { defineFeature, loadFeature } from 'jest-cucumber';
import {
  CreateUserTestContext,
  givenUserData,
  iSendARequestToCreateAUser,
} from '../user-shared-steps';
import { IdResponse } from '@/libs/api/id.response.dto';
import { UserResponseDto } from '@/modules/account/dtos/user.response.dto';
import { ApiClient } from '@tests/test-utils/api-client';
import { TestContext } from '@tests/test-utils/text-context';
import { iReceiveAnErrorWithStatusCode } from '@tests/shared/shared-step';
import { teardownTestDatabase } from '@/database/test-database-setup';

const feature = loadFeature('tests/user/create-user/create-user.feature');

defineFeature(feature, (test) => {
  const apiClient = new ApiClient();

  afterAll(async () => {
    await teardownTestDatabase();
  });

  test('I can create a user', ({ given, when, then, and }) => {
    const ctx = new TestContext<CreateUserTestContext>();

    givenUserData(given, ctx);

    iSendARequestToCreateAUser(when, ctx);

    then('I receive the user ID', () => {
      const response = ctx.latestResponse as IdResponse;
      expect(typeof response.id).toBe('string');
    });

    and('I can see my user in a list of all users', async () => {
      const res = await apiClient.findAllUser({});

      const response = ctx.latestResponse as IdResponse;

      expect(
        res.data.some((item: UserResponseDto) => item.id === response.id),
      ).toBe(true);
    });
  });

  test('I try to create a user with invalid data', ({ given, when, then }) => {
    const ctx = new TestContext<CreateUserTestContext>();

    givenUserData(given, ctx);

    iSendARequestToCreateAUser(when, ctx);

    iReceiveAnErrorWithStatusCode(then, ctx);
  });

  test('I try to create a duplicate user', async ({ given, when, then }) => {
    const ctx = new TestContext<CreateUserTestContext>();

    givenUserData(given, ctx);

    iSendARequestToCreateAUser(when, ctx);

    then('I receive the user ID', () => {
      const response = ctx.latestResponse as IdResponse;
      expect(typeof response.id).toBe('string');
    });

    iSendARequestToCreateAUser(when, ctx);

    iReceiveAnErrorWithStatusCode(then, ctx);
  });
});
