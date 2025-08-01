"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iReceiveAnErrorWithStatusCode = void 0;
const iReceiveAnErrorWithStatusCode = (then, ctx) => {
    then(/^I receive an error "(.*)" with status code (\d+)$/, async (errorMessage, statusCode) => {
        const apiError = ctx.latestResponse;
        expect(apiError.statusCode).toBe(parseInt(statusCode));
        expect(apiError.error).toBe(errorMessage);
    });
};
exports.iReceiveAnErrorWithStatusCode = iReceiveAnErrorWithStatusCode;
//# sourceMappingURL=shared-step.js.map