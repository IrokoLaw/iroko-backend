import { Logger } from "@nestjs/common";

/**
 * Options for the retry function
 */
export interface RetryOptions {
  /**
   * Maximum number of retry attempts
   * @default 3
   */
  maxRetries?: number;

  /**
   * Base delay in milliseconds before retrying
   * @default 1000 (1 second)
   */
  baseDelay?: number;

  /**
   * List of error codes that should trigger a retry
   * @default ['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED', 'EADDRNOTAVAIL']
   */
  retryableErrorCodes?: string[];

  /**
   * Additional error message substrings that should trigger a retry
   * @default ['connection']
   */
  retryableErrorMessages?: string[];

  /**
   * Logger instance for logging retry attempts
   * @default undefined (no logging)
   */
  logger?: Logger;

  /**
   * Name of the operation for logging purposes
   * @default 'operation'
   */
  operationName?: string;
}

/**
 * Executes a function with retry logic
 *
 * @param fn The function to execute with retry logic
 * @param options Retry options
 * @returns The result of the function execution
 * @throws The last error encountered if all retries fail
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    retryableErrorCodes = [
      "ETIMEDOUT",
      "ECONNRESET",
      "ECONNREFUSED",
      "EADDRNOTAVAIL",
    ],
    retryableErrorMessages = ["connection"],
    logger,
    operationName = "operation",
  } = options;

  let retries = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      retries++;

      // Check if we've reached max retries
      if (retries >= maxRetries) {
        if (logger) {
          logger.error(
            `Failed to execute ${operationName} after ${maxRetries} attempts: ${error.message}`,
            error.stack
          );
        }
        throw error;
      }

      // Check if this error is retryable
      const isRetryableCode =
        error.code && retryableErrorCodes.includes(error.code);
      const isRetryableMessage = retryableErrorMessages.some(
        (msg) =>
          error.message &&
          error.message.toLowerCase().includes(msg.toLowerCase())
      );

      if (!isRetryableCode && !isRetryableMessage) {
        if (logger) {
          logger.error(
            `Non-retryable error during ${operationName}: ${error.message}`,
            error.stack
          );
        }
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, retries - 1);

      if (logger) {
        logger.warn(
          `${operationName} failed (attempt ${retries}/${maxRetries}). Retrying in ${delay}ms...`,
          error.message
        );
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * Validates a legal document number according to the format YYYY-NUMBER
 *
 * @param documentNumber The document number to validate
 * @returns True if the document number is valid, false otherwise
 */
export function isValidLegalDocumentNumber(documentNumber: string): boolean {
  if (!documentNumber) {
    return false;
  }

  // Must match the pattern /^\d{4}-\d+$/
  const pattern = /^\d{4}-\d+$/;
  if (!pattern.test(documentNumber)) {
    return false;
  }

  // Year part must not exceed the current year
  const year = parseInt(documentNumber.substring(0, 4), 10);
  const currentYear = new Date().getFullYear();
  if (year > currentYear) {
    return false;
  }

  return true;
}
