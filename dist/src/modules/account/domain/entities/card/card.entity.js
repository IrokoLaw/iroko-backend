"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardEntity = void 0;
const crypto_1 = require("crypto");
const entity_base_1 = require("../../../../../libs/domain/entity.base");
const card_status_value_object_1 = require("../../value-objects/card-status-value-object");
const brand_value_object_1 = require("../../value-objects/brand-value-object");
class CardEntity extends entity_base_1.BaseEntity {
    static create(data) {
        const id = (0, crypto_1.randomUUID)();
        const status = new card_status_value_object_1.CardStatus({ value: card_status_value_object_1.CardStatusEnum.ACTIVATED });
        const brand = new brand_value_object_1.Brand({ value: data.brand });
        const card = new CardEntity({
            id,
            props: {
                ...data,
                status: status.unpack(),
                brand: brand.unpack(),
            },
        });
        return card;
    }
    changeCardStatus(status) {
        this.props.status = status;
    }
    updateExpYear(expYear) {
        this.props.expYear = expYear;
    }
    makeExpire() {
        const now = new Date();
        if (this.props.expYear < now.getFullYear()) {
            this.changeCardStatus(card_status_value_object_1.CardStatusEnum.EXPIRED);
            return;
        }
        if (this.props.expYear === now.getFullYear() &&
            now.getMonth() > this.props.expMonth) {
            this.changeCardStatus(card_status_value_object_1.CardStatusEnum.EXPIRED);
        }
    }
    switchPrincipal() {
        this.props.isPrincipal = !this.props.isPrincipal;
    }
    validate() {
        const count = this.props.numberLast4.length;
        if (count !== 4) {
            throw new Error('Number last 4 must be 4 digits');
        }
        if (this.props.expMonth > 12) {
            throw new Error('Expire date is invalid');
        }
        const now = new Date();
        if (this.props.expYear === now.getFullYear() &&
            now.getMonth() > this.props.expMonth) {
            throw new Error('Expire month is in the past');
        }
        if (this.props.expYear < now.getFullYear()) {
            throw new Error('Expire date is in the past');
        }
    }
}
exports.CardEntity = CardEntity;
//# sourceMappingURL=card.entity.js.map