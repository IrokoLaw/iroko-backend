"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionDbEntity = void 0;
const base_entity_db_1 = require("../../../../libs/db/base-entity-db");
const user_entity_db_1 = require("../../../account/infrastructure/persistance/user.entity.db");
const typeorm_1 = require("typeorm");
const chat_entity_db_1 = require("./chat.entity.db");
let DiscussionDbEntity = class DiscussionDbEntity extends base_entity_db_1.BaseEntityDb {
};
exports.DiscussionDbEntity = DiscussionDbEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], DiscussionDbEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chat_entity_db_1.ChatDbEntity, (chat) => chat.discussion, { cascade: true }),
    __metadata("design:type", Array)
], DiscussionDbEntity.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_db_1.UserDbEntity, (user) => user.discussions),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_db_1.UserDbEntity)
], DiscussionDbEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DiscussionDbEntity.prototype, "userId", void 0);
exports.DiscussionDbEntity = DiscussionDbEntity = __decorate([
    (0, typeorm_1.Entity)('discussion')
], DiscussionDbEntity);
//# sourceMappingURL=discussion.entity.db.js.map