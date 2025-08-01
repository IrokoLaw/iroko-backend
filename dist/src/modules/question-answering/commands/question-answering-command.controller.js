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
exports.QuestionAnsweringCommandController = void 0;
const common_1 = require("@nestjs/common");
const question_answering_service_1 = require("./question-answering.service");
const oxide_ts_1 = require("oxide.ts");
const routes_1 = require("../../../config/routes");
const create_new_chat_request_dto_1 = require("./chat/create-new-chat.request.dto");
const id_response_dto_1 = require("../../../libs/api/id.response.dto");
const swagger_1 = require("@nestjs/swagger");
const api_error_response_1 = require("../../../libs/api/api-error.response");
const exceptions_1 = require("../../../libs/exceptions");
const create_new_evaluation_request_dto_1 = require("./evaluation/create-new-evaluation.request.dto");
const evaluation_error_1 = require("../domain/entities/evaluation/evaluation.error");
const create_new_discussion_request_dto_1 = require("./discussion/create-new-discussion.request.dto");
let QuestionAnsweringCommandController = class QuestionAnsweringCommandController {
    constructor(service) {
        this.service = service;
    }
    async create(body) {
        const result = await this.service.createChat(body);
        return (0, oxide_ts_1.match)(result, {
            Ok: (id) => new id_response_dto_1.IdResponse(id),
            Err: (error) => {
                throw error;
            },
        });
    }
    async addChatToDiscussion(body, params) {
        const result = await this.service.addChatToDiscussion(body, params.discussionId);
        return (0, oxide_ts_1.match)(result, {
            Ok: (id) => new id_response_dto_1.IdResponse(id),
            Err: (error) => {
                if (error instanceof exceptions_1.NotFoundException)
                    throw new common_1.NotFoundException(error.message);
                throw error;
            },
        });
    }
    async createEvaluation(params, body) {
        const result = await this.service.createEvaluation(body, params.chatId);
        return (0, oxide_ts_1.match)(result, {
            Ok: (id) => new id_response_dto_1.IdResponse(id),
            Err: (error) => {
                if (error instanceof exceptions_1.NotFoundException)
                    throw new common_1.NotFoundException(error.message);
                if (error instanceof evaluation_error_1.ChatAlreadyHasEvaluationError)
                    throw new common_1.ConflictException(error.message);
                throw error;
            },
        });
    }
    async updateChat(params, body) {
        const result = await this.service.updateChat(body, params.chatId);
        return (0, oxide_ts_1.match)(result, {
            Ok: (id) => new id_response_dto_1.IdResponse(id),
            Err: (error) => {
                if (error instanceof exceptions_1.NotFoundException)
                    throw new common_1.NotFoundException(error.message);
                throw error;
            },
        });
    }
    async updateEvaluation(params, body) {
        const result = await this.service.updateEvaluation(body, params.evaluationId);
        return (0, oxide_ts_1.match)(result, {
            Ok: (id) => new id_response_dto_1.IdResponse(id),
            Err: (error) => {
                if (error instanceof exceptions_1.NotFoundException)
                    throw new common_1.NotFoundException(error.message);
                throw error;
            },
        });
    }
    async createDiscussion(body) {
        const result = await this.service.createDiscussion(body);
        return (0, oxide_ts_1.match)(result, {
            Ok: (id) => new id_response_dto_1.IdResponse(id),
            Err: (error) => {
                throw error;
            },
        });
    }
};
exports.QuestionAnsweringCommandController = QuestionAnsweringCommandController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new chat' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: id_response_dto_1.IdResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, common_1.Post)(routes_1.routesV1.chat.root),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_new_chat_request_dto_1.CreateNewChatRequestDto]),
    __metadata("design:returntype", Promise)
], QuestionAnsweringCommandController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add a chat to discussion id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: id_response_dto_1.IdResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: exceptions_1.NotFoundException.message,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, common_1.Post)(routes_1.routesV1.chat.addChatToDiscussion),
    (0, swagger_1.ApiParam)({ name: 'discussionId', type: 'string' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_new_chat_request_dto_1.CreateNewChatRequestDto, Object]),
    __metadata("design:returntype", Promise)
], QuestionAnsweringCommandController.prototype, "addChatToDiscussion", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'add a new evaluation to a chat' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: id_response_dto_1.IdResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: exceptions_1.NotFoundException.message,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: evaluation_error_1.ChatAlreadyHasEvaluationError.message,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, common_1.Post)(routes_1.routesV1.chat.evaluation),
    (0, swagger_1.ApiParam)({ name: 'chatId', type: 'string' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_new_evaluation_request_dto_1.CreateNewEvaluationRequestDto]),
    __metadata("design:returntype", Promise)
], QuestionAnsweringCommandController.prototype, "createEvaluation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a chat' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: id_response_dto_1.IdResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: exceptions_1.NotFoundException.message,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, swagger_1.ApiParam)({ name: 'chatId', type: 'string' }),
    (0, common_1.Patch)(routes_1.routesV1.chat.update),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_new_chat_request_dto_1.UpdateChatRequestDto]),
    __metadata("design:returntype", Promise)
], QuestionAnsweringCommandController.prototype, "updateChat", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a evaluation' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: id_response_dto_1.IdResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: exceptions_1.NotFoundException.message,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, swagger_1.ApiParam)({ name: 'evaluationId', type: 'string' }),
    (0, common_1.Patch)(routes_1.routesV1.evaluation.update),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_new_evaluation_request_dto_1.UpdateEvaluationRequestDto]),
    __metadata("design:returntype", Promise)
], QuestionAnsweringCommandController.prototype, "updateEvaluation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new discussion' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: id_response_dto_1.IdResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        type: api_error_response_1.ApiErrorResponse,
    }),
    (0, common_1.Post)(routes_1.routesV1.discussion.root),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_new_discussion_request_dto_1.CreateNewDiscussionRequestDto]),
    __metadata("design:returntype", Promise)
], QuestionAnsweringCommandController.prototype, "createDiscussion", null);
exports.QuestionAnsweringCommandController = QuestionAnsweringCommandController = __decorate([
    (0, common_1.Controller)(routes_1.routesV1.version),
    __metadata("design:paramtypes", [question_answering_service_1.QuestionAnsweringService])
], QuestionAnsweringCommandController);
//# sourceMappingURL=question-answering-command.controller.js.map