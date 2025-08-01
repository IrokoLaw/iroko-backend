"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAlreadyHasEvaluationError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ChatAlreadyHasEvaluationError extends exceptions_1.ExceptionBase {
    constructor(cause, metadata) {
        super(ChatAlreadyHasEvaluationError.message, cause, metadata);
        this.code = 'EVALUATION.CHAT_ALREADY_HAS_EVALUATION';
    }
}
exports.ChatAlreadyHasEvaluationError = ChatAlreadyHasEvaluationError;
ChatAlreadyHasEvaluationError.message = 'Chat already has an evaluation';
//# sourceMappingURL=evaluation.error.js.map