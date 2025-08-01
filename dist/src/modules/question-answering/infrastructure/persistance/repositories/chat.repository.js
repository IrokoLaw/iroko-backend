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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reposiroty_base_1 = require("../../../../../libs/db/reposiroty.base");
const chat_entity_db_1 = require("../chat.entity.db");
const chat_mapper_1 = require("../../../mapper/chat.mapper");
const common_1 = require("@nestjs/common");
let ChatRepository = ChatRepository_1 = class ChatRepository extends reposiroty_base_1.RepositoryBase {
    constructor(mapper, chatRepository) {
        super(chatRepository, mapper, new common_1.Logger(ChatRepository_1.name));
        this.mapper = mapper;
        this.chatRepository = chatRepository;
        this.tableName = chat_entity_db_1.ChatDbEntity.name;
    }
    async associateEvaluation(chatId, evaluationId) {
        await this.chatRepository.update(chatId, { evaluationId });
    }
    async updateQuestionFields(chatId, query) {
        await this.chatRepository.update(chatId, query);
    }
    async updateAnswer(chatId, answer) {
        await this.chatRepository.update(chatId, { answer });
    }
};
exports.ChatRepository = ChatRepository;
exports.ChatRepository = ChatRepository = ChatRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(chat_entity_db_1.ChatDbEntity)),
    __metadata("design:paramtypes", [chat_mapper_1.ChatMapper,
        typeorm_2.Repository])
], ChatRepository);
//# sourceMappingURL=chat.repository.js.map