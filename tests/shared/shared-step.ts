import { ApiErrorResponse } from '@/libs/api/api-error.response';
import { DefineStepFunction } from 'jest-cucumber';
import { TestContext } from 'tests/test-utils/text-context';
import { CreateUserTestContext } from 'tests/user/user-shared-steps';

/**
 * Test steps that can be shared between all tests
 */

export const iReceiveAnErrorWithStatusCode = (
  then: DefineStepFunction,
  ctx: TestContext<CreateUserTestContext>,
): void => {
  then(
    /^I receive an error "(.*)" with status code (\d+)$/,
    async (errorMessage: string, statusCode: string) => {
      const apiError = ctx.latestResponse as ApiErrorResponse;
      expect(apiError.statusCode).toBe(parseInt(statusCode));
      expect(apiError.error).toBe(errorMessage);
    },
  );
};
