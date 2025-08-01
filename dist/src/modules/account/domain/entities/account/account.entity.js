"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountEntity = void 0;
const entity_base_1 = require("../../../../../libs/domain/entity.base");
const crypto_1 = require("crypto");
const account_type_value_object_1 = require("../../value-objects/account-type-value-object");
const invoicing_type_value_object_1 = require("../../value-objects/invoicing-type-value-object");
const account_status_value_object_1 = require("../../value-objects/account-status-value-object");
const constant_1 = require("../../../constant");
class AccountEntity extends entity_base_1.BaseEntity {
    static create(data) {
        const id = (0, crypto_1.randomUUID)();
        const accountType = new account_type_value_object_1.AccountType({ value: data.type });
        const invoicingType = new invoicing_type_value_object_1.InvoicingType({ value: data.invoicingType });
        const status = new account_status_value_object_1.AccountStatus({ value: account_status_value_object_1.AccountStatusEnum.ACTIVATED });
        const expirePaymentDate = AccountEntity.calculateExpirationDate(data.invoicingType);
        const account = new AccountEntity({
            id,
            props: {
                ...data,
                type: accountType.unpack(),
                invoicingType: invoicingType.unpack(),
                status: status.unpack(),
                expirePaymentDate,
            },
        });
        return account;
    }
    changeStatus(status) {
        this.props.status = status;
    }
    makeInactive() {
        this.changeStatus(account_status_value_object_1.AccountStatusEnum.INACTIVATED);
    }
    makeActive() {
        this.changeStatus(account_status_value_object_1.AccountStatusEnum.ACTIVATED);
    }
    makePendingPayment() {
        this.changeStatus(account_status_value_object_1.AccountStatusEnum.PENDING_PAYMENT);
    }
    makeArchived() {
        this.changeStatus(account_status_value_object_1.AccountStatusEnum.ARCHIVED);
    }
    changeType(type) {
        this.props.type = type;
    }
    makeEnterprise(capacity) {
        const capacityValue = capacity ?? 2;
        if (this.props.type == account_type_value_object_1.AccountTypeEnum.SOLO) {
            this.props.capacity = capacityValue;
            this.changeType(account_type_value_object_1.AccountTypeEnum.ENTERPRISE);
        }
        else {
            throw new Error('Account is not a solo account');
        }
    }
    updateCapacity(capacity) {
        if (this.props.type == account_type_value_object_1.AccountTypeEnum.ENTERPRISE) {
            this.props.capacity = capacity;
        }
        else {
            throw new Error('Account is not a enterprise account');
        }
    }
    updateExpirePaymentDate(invType) {
        this.props.expirePaymentDate =
            AccountEntity.calculateExpirationDate(invType);
    }
    static calculateExpirationDate(invType) {
        const newDate = new Date();
        switch (invType) {
            case invoicing_type_value_object_1.InvoicingTypeEnum.ANNUAL:
                newDate.setFullYear(newDate.getFullYear() + 1);
                break;
            case invoicing_type_value_object_1.InvoicingTypeEnum.MONTHLY:
                newDate.setMonth(newDate.getMonth() + 1);
                break;
            case invoicing_type_value_object_1.InvoicingTypeEnum.TRY:
                newDate.setDate(newDate.getDate() + constant_1.FREE_DAY);
                break;
            default:
                throw new Error('Invalid invoicing type');
        }
        return newDate;
    }
    makeSolo() {
        const capacityValue = 1;
        if (this.props.type == account_type_value_object_1.AccountTypeEnum.ENTERPRISE) {
            this.props.capacity = capacityValue;
            this.changeType(account_type_value_object_1.AccountTypeEnum.SOLO);
        }
        else {
            throw new Error('Account is not an enterprise account');
        }
    }
    validateAccountType() {
        switch (this.props.type) {
            case account_type_value_object_1.AccountTypeEnum.SOLO:
                if (this.props.capacity !== 1) {
                    throw new Error('Invoicing type must be monthly for solo account');
                }
                break;
            case account_type_value_object_1.AccountTypeEnum.ENTERPRISE:
                if (this.props.capacity < 2) {
                    throw new Error('Capacity must be greater than 1 when account type is enterprise');
                }
                if (this.props.invoicingType == invoicing_type_value_object_1.InvoicingTypeEnum.TRY) {
                    throw new Error('Invoicing type must be monthly or annual for enterprise account');
                }
                break;
            default:
                throw new Error('Account type is invalid');
        }
    }
    validate() {
        this.validateAccountType();
        const now = new Date();
        if (this.props.expirePaymentDate.getTime() < now.getTime()) {
            throw new Error('Expire payment date must be in the future');
        }
    }
}
exports.AccountEntity = AccountEntity;
//# sourceMappingURL=account.entity.js.map