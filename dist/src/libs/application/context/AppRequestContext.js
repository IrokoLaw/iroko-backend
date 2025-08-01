"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextService = exports.AppRequestContext = void 0;
const nestjs_request_context_1 = require("nestjs-request-context");
class AppRequestContext extends nestjs_request_context_1.RequestContext {
}
exports.AppRequestContext = AppRequestContext;
class RequestContextService {
    static getContext() {
        const ctx = nestjs_request_context_1.RequestContext.currentContext.req;
        return ctx;
    }
    static setRequestId(id) {
        const ctx = this.getContext();
        ctx.requestId = id;
    }
    static getRequestId() {
        return this.getContext().requestId;
    }
}
exports.RequestContextService = RequestContextService;
//# sourceMappingURL=AppRequestContext.js.map