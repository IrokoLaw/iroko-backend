import { ExceptionBase } from '@/libs/exceptions';

export class ChatAlreadyHasEvaluationError extends ExceptionBase {
  static readonly message = 'Chat already has an evaluation';

  public readonly code = 'EVALUATION.CHAT_ALREADY_HAS_EVALUATION';

  constructor(cause?: Error, metadata?: unknown) {
    super(ChatAlreadyHasEvaluationError.message, cause, metadata);
  }
}
