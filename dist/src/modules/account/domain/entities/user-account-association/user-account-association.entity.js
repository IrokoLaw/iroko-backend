"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountAssociationEntity = void 0;
const entity_base_1 = require("../../../../../libs/domain/entity.base");
const crypto_1 = require("crypto");
const userAccountAssociation_role_value_object_1 = require("../../value-objects/userAccountAssociation-role-value-object");
class UserAccountAssociationEntity extends entity_base_1.BaseEntity {
    static create(data) {
        const id = (0, crypto_1.randomUUID)();
        const role = new userAccountAssociation_role_value_object_1.UserAccountAssociationRole({ value: data.role });
        return new UserAccountAssociationEntity({
            id,
            props: {
                ...data,
                role: role.unpack(),
            },
        });
    }
    validate() { }
}
exports.UserAccountAssociationEntity = UserAccountAssociationEntity;
//# sourceMappingURL=user-account-association.entity.js.map