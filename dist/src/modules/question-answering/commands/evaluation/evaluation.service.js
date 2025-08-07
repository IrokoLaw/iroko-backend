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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_transactional_1 = require("typeorm-transactional");
const oxide_ts_1 = require("oxide.ts");
const question_answering_di_token_1 = require("../../question-answering.di-token");
const exceptions_1 = require("../../../../libs/exceptions");
const create_new_evaluation_request_dto_1 = require("./create-new-evaluation.request.dto");
const evaluation_entity_1 = require("../../domain/entities/evaluation/evaluation.entity");
const evaluation_error_1 = require("../../domain/entities/evaluation/evaluation.error");
let EvaluationService = class EvaluationService {
    constructor(chatRepo, evaluationRepo) {
        this.chatRepo = chatRepo;
        this.evaluationRepo = evaluationRepo;
    }
    async createEvaluation(data, chatId) {
        try {
            const chat = await this.chatRepo.findOneById(chatId);
            const chatEntity = chat.unwrap();
            if (chat.isNone())
                return (0, oxide_ts_1.Err)(new exceptions_1.NotFoundException());
            const evaluation = evaluation_entity_1.EvaluationEntity.create({
                note: data.note,
                comment: data.comment,
            });
            await this.evaluationRepo.transaction(async () => {
                await this.evaluationRepo.insert(evaluation);
            });
            return (0, oxide_ts_1.Ok)(evaluation.id);
        }
        catch (error) {
            if (error instanceof exceptions_1.ConflictException) {
                return (0, oxide_ts_1.Err)(new evaluation_error_1.ChatAlreadyHasEvaluationError());
            }
            throw error;
        }
    }
    async updateEvaluation(data, evaluationId) {
        const evaluation = await this.evaluationRepo.findOneById(evaluationId);
        if (evaluation.isNone())
            return (0, oxide_ts_1.Err)(new exceptions_1.NotFoundException());
        await this.evaluationRepo.transaction(async () => {
            await this.evaluationRepo.update(evaluationId, data);
        });
        return (0, oxide_ts_1.Ok)(evaluationId);
    }
};
exports.EvaluationService = EvaluationService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_new_evaluation_request_dto_1.UpdateEvaluationRequestDto, String]),
    __metadata("design:returntype", Promise)
], EvaluationService.prototype, "updateEvaluation", null);
exports.EvaluationService = EvaluationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(question_answering_di_token_1.CHAT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(question_answering_di_token_1.EVALUATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], EvaluationService);
//# sourceMappingURL=evaluation.service.js.map