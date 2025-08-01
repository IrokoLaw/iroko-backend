import { ExceptionBase } from '@/libs/exceptions';
export declare class ChatAlreadyHasEvaluationError extends ExceptionBase {
    static readonly message = "Chat already has an evaluation";
    readonly code = "EVALUATION.CHAT_ALREADY_HAS_EVALUATION";
    constructor(cause?: Error, metadata?: unknown);
}
