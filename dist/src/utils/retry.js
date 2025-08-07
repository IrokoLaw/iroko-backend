"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
exports.isValidLegalDocumentNumber = isValidLegalDocumentNumber;
async function withRetry(fn, options = {}) {
    const { maxRetries = 3, baseDelay = 1000, retryableErrorCodes = [
        "ETIMEDOUT",
        "ECONNRESET",
        "ECONNREFUSED",
        "EADDRNOTAVAIL",
    ], retryableErrorMessages = ["connection"], logger, operationName = "operation", } = options;
    let retries = 0;
    while (true) {
        try {
            return await fn();
        }
        catch (error) {
            retries++;
            if (retries >= maxRetries) {
                if (logger) {
                    logger.error(`Failed to execute ${operationName} after ${maxRetries} attempts: ${error.message}`, error.stack);
                }
                throw error;
            }
            const isRetryableCode = error.code && retryableErrorCodes.includes(error.code);
            const isRetryableMessage = retryableErrorMessages.some((msg) => error.message &&
                error.message.toLowerCase().includes(msg.toLowerCase()));
            if (!isRetryableCode && !isRetryableMessage) {
                if (logger) {
                    logger.error(`Non-retryable error during ${operationName}: ${error.message}`, error.stack);
                }
                throw error;
            }
            const delay = baseDelay * Math.pow(2, retries - 1);
            if (logger) {
                logger.warn(`${operationName} failed (attempt ${retries}/${maxRetries}). Retrying in ${delay}ms...`, error.message);
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}
function isValidLegalDocumentNumber(documentNumber) {
    if (!documentNumber) {
        return false;
    }
    const pattern = /^\d{4}-\d+$/;
    if (!pattern.test(documentNumber)) {
        return false;
    }
    const year = parseInt(documentNumber.substring(0, 4), 10);
    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
        return false;
    }
    return true;
}
//# sourceMappingURL=retry.js.map