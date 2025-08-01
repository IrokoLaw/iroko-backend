"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iSendARequestToCreateAUser = exports.givenUserData = void 0;
const api_client_1 = require("../test-utils/api-client");
const givenUserData = (given, ctx) => {
    given(/^user data$/, (table) => {
        ctx.context.createUserDto = table[0];
    });
};
exports.givenUserData = givenUserData;
const iSendARequestToCreateAUser = (when, ctx) => {
    when('I send a request to create the user', async () => {
        const response = await new api_client_1.ApiClient().createUser(ctx.context.createUserDto);
        ctx.latestResponse = response;
    });
};
exports.iSendARequestToCreateAUser = iSendARequestToCreateAUser;
//# sourceMappingURL=user-shared-steps.js.map