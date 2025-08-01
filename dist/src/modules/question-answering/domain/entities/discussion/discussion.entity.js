"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionEntity = void 0;
const entity_base_1 = require("../../../../../libs/domain/entity.base");
const crypto_1 = require("crypto");
class DiscussionEntity extends entity_base_1.BaseEntity {
    static create(data) {
        const id = (0, crypto_1.randomUUID)();
        const discussion = new DiscussionEntity({
            id,
            props: {
                ...data,
            },
        });
        return discussion;
    }
    validate() {
        if (this.props.title === '') {
            throw new Error('the title is invalid');
        }
    }
}
exports.DiscussionEntity = DiscussionEntity;
//# sourceMappingURL=discussion.entity.js.map