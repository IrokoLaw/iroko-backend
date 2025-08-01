"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const entity_base_1 = require("../../../../../libs/domain/entity.base");
const crypto_1 = require("crypto");
const email_value_object_1 = require("../../value-objects/email-value-object");
const user_role_value_object_1 = require("../../value-objects/user-role-value-object");
class UserEntity extends entity_base_1.BaseEntity {
    static create(data) {
        const id = (0, crypto_1.randomUUID)();
        const email = new email_value_object_1.Email({ value: data.email });
        const userRole = new user_role_value_object_1.UserRole({ value: data.userRole });
        const user = new UserEntity({
            id,
            props: { ...data, email: email.unpack(), userRole: userRole.unpack() },
        });
        return user;
    }
    validate() { }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map