"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
const guard_1 = require("../../../../libs/guard");
class Email extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    static isProfessionalEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email))
            return false;
        const domain = email.split('@')[1].toLowerCase();
        return !this.freeDomains.has(domain);
    }
    validate(props) {
        if (!guard_1.Guard.lengthIsBetween(props.value, 2, 50)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Email length is out of range');
        }
        if (!Email.isProfessionalEmail(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Email must be a professional email ');
        }
    }
}
exports.Email = Email;
Email.freeDomains = new Set([
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'aol.com',
    'icloud.com',
]);
//# sourceMappingURL=email-value-object.js.map