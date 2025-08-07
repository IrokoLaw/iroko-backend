import { Logger } from "@nestjs/common";
export interface RetryOptions {
    maxRetries?: number;
    baseDelay?: number;
    retryableErrorCodes?: string[];
    retryableErrorMessages?: string[];
    logger?: Logger;
    operationName?: string;
}
export declare function withRetry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>;
export declare function isValidLegalDocumentNumber(documentNumber: string): boolean;
