"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorException = exports.NotFoundException = exports.ConflictException = exports.ArgumentOutOfRangeException = exports.ArgumentNotProvidedException = exports.ArgumentInvalidException = void 0;
const exceptions_codes_1 = require("./exceptions.codes");
const exceptions_base_1 = require("./exceptions.base");
class ArgumentInvalidException extends exceptions_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = exceptions_codes_1.ARGUMENT_INVALID;
    }
}
exports.ArgumentInvalidException = ArgumentInvalidException;
class ArgumentNotProvidedException extends exceptions_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = exceptions_codes_1.ARGUMENT_NOT_PROVIDED;
    }
}
exports.ArgumentNotProvidedException = ArgumentNotProvidedException;
class ArgumentOutOfRangeException extends exceptions_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = exceptions_codes_1.ARGUMENT_OUT_OF_RANGE;
    }
}
exports.ArgumentOutOfRangeException = ArgumentOutOfRangeException;
class ConflictException extends exceptions_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = exceptions_codes_1.CONFLICT;
    }
}
exports.ConflictException = ConflictException;
class NotFoundException extends exceptions_base_1.ExceptionBase {
    constructor(message = NotFoundException.message) {
        super(message);
        this.code = exceptions_codes_1.NOT_FOUND;
    }
}
exports.NotFoundException = NotFoundException;
NotFoundException.message = 'Not found';
class InternalServerErrorException extends exceptions_base_1.ExceptionBase {
    constructor(message = InternalServerErrorException.message) {
        super(message);
        this.code = exceptions_codes_1.INTERNAL_SERVER_ERROR;
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
InternalServerErrorException.message = 'Internal server error';
//# sourceMappingURL=exceptions.js.map