import { DefineStepFunction } from 'jest-cucumber';
import { Mutable } from '@/libs/types';
import { CreateUserRequestDto } from '@/modules/account/commands/create-user.request.dto';
import { TestContext } from '@tests/test-utils/text-context';
export type CreateUserTestContext = {
    createUserDto: Mutable<CreateUserRequestDto>;
};
export declare const givenUserData: (given: DefineStepFunction, ctx: TestContext<CreateUserTestContext>) => void;
export declare const iSendARequestToCreateAUser: (when: DefineStepFunction, ctx: TestContext<CreateUserTestContext>) => void;
