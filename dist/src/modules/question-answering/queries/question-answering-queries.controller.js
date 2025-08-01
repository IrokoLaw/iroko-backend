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
exports.QuestionAnsweringQueryHttpController = void 0;
const routes_1 = require("../../../config/routes");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const question_answering_querie_handler_1 = require("./question-answering-querie-handler");
const paginated_query_request_dto_1 = require("../../../libs/api/paginated-query.request.dto");
const oxide_ts_1 = require("oxide.ts");
const response_base_1 = require("../../../libs/api/response.base");
const chat_paginated_response_dto_1 = require("../dtos/chat.paginated.response.dto");
const source_paginated_response_dto_1 = require("../dtos/source.paginated.response.dto");
const discussion_paginated_response_dto_1 = require("../dtos/discussion.paginated.response.dto");
const evaluation_mapper_1 = require("../mapper/evaluation.mapper");
const exceptions_1 = require("../../../libs/exceptions");
let QuestionAnsweringQueryHttpController = class QuestionAnsweringQueryHttpController {
    constructor(handler) {
        this.handler = handler;
    }
    async findDiscussionChats(discussionId, queryParams) {
        const cleanedDiscussionId = discussionId.trim();
        const query = new question_answering_querie_handler_1.FindDiscussionChatsQuery({
            limit: queryParams.limit ?? 10,
            page: queryParams.page ?? 1,
            discussionId: cleanedDiscussionId,
            orderBy: {
                field: 'createdAt',
                param: 'ASC',
            },
        });
        const result = await this.handler.findDiscussionChats(query);
        const paginated = result.unwrap();
        return new chat_paginated_response_dto_1.ChatPaginatedResponseDto({
            ...paginated,
            data: paginated.data.map((chat) => {
                const { id, createdAt, updatedAt, ...rest } = chat.getProps();
                return {
                    ...new response_base_1.ResponseBase({
                        id: id,
                        createdAt: createdAt,
                        updatedAt: updatedAt,
                    }),
                    ...rest,
                };
            }),
        });
    }
    async findChatSources(queryParams, chatId) {
        const cleanedsourceId = chatId.trim();
        const query = new question_answering_querie_handler_1.FindChatSourcesQuery({
            limit: queryParams.limit ?? 10,
            page: queryParams.page ?? 1,
            chatId: cleanedsourceId,
        });
        const result = await this.handler.findChatSources(query);
        const paginated = result.unwrap();
        return new source_paginated_response_dto_1.SourcePaginatedResponseDto({
            ...paginated,
            data: paginated.data.map((chat) => {
                const { id, createdAt, updatedAt, ...rest } = chat.getProps();
                return {
                    ...new response_base_1.ResponseBase({
                        id: id,
                        createdAt: createdAt,
                        updatedAt: updatedAt,
                    }),
                    ...rest,
                };
            }),
        });
    }
    async findDiscussionByUserId(userId, queryParams) {
        const cleanedUserId = userId.trim();
        const query = new question_answering_querie_handler_1.FindUserDiscussionsQuery({
            limit: queryParams.limit ?? 10,
            page: queryParams.page ?? 1,
            orderBy: { field: 'createdAt', param: 'DESC' },
            userId: cleanedUserId,
        });
        const result = await this.handler.findUserDiscussions(query);
        const paginated = result.unwrap();
        return new discussion_paginated_response_dto_1.DiscussionPaginatedResponseDto({
            ...paginated,
            data: paginated.data.map((chat) => {
                const { id, createdAt, updatedAt, ...rest } = chat.getProps();
                return {
                    ...new response_base_1.ResponseBase({
                        id: id,
                        createdAt: createdAt,
                        updatedAt: updatedAt,
                    }),
                    ...rest,
                };
            }),
        });
    }
    async findChatEvaluation(chatId) {
        const cleanedChatId = chatId.trim();
        const query = new question_answering_querie_handler_1.FindChatEvaluationQuery({ chatId: cleanedChatId });
        const result = await this.handler.findChatEvaluation(query);
        return (0, oxide_ts_1.match)(result, {
            Ok: (evaluation) => {
                const mapper = new evaluation_mapper_1.EvaluationMapper();
                return mapper.toResponse(evaluation);
            },
            Err: (error) => {
                if (error instanceof exceptions_1.NotFoundException)
                    throw new common_1.NotFoundException(error.message);
                throw error;
            },
        });
    }
};
exports.QuestionAnsweringQueryHttpController = QuestionAnsweringQueryHttpController;
__decorate([
    (0, common_1.Get)(routes_1.routesV1.discussion.chats),
    (0, swagger_1.ApiOperation)({ summary: 'Get chats of a given discussion id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Param)('discussionId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, paginated_query_request_dto_1.PaginatedQueryRequestDto]),
    __metadata("design:returntype", Promise)
], QuestionAnsweringQueryHttpController.prototype, "findDiscussionChats", null);
__decorate([
    (0, common_1.Get)(routes_1.routesV1.chat.sources),
    (0, swagger_1.ApiOperation)({ summary: 'Get sources of a given chat Id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginated_query_request_dto_1.PaginatedQueryRequestDto, String]),
    __metadata("design:returntype", Promise)
], QuestionAnsweringQueryHttpController.prototype, "findChatSources", null);
__decorate([
    (0, common_1.Get)(routes_1.routesV1.user.discussions),
    (0, swagger_1.ApiOperation)({ summary: 'Get discussions of a given user id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, paginated_query_request_dto_1.PaginatedQueryRequestDto]),
    __metadata("design:returntype", Promise)
], QuestionAnsweringQueryHttpController.prototype, "findDiscussionByUserId", null);
__decorate([
    (0, common_1.Get)(routes_1.routesV1.chat.evaluation),
    (0, swagger_1.ApiOperation)({ summary: 'Get evaluation of a given chat id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
    }),
    __param(0, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionAnsweringQueryHttpController.prototype, "findChatEvaluation", null);
exports.QuestionAnsweringQueryHttpController = QuestionAnsweringQueryHttpController = __decorate([
    (0, common_1.Controller)(routes_1.routesV1.version),
    __metadata("design:paramtypes", [question_answering_querie_handler_1.QuestionAnsweringHandler])
], QuestionAnsweringQueryHttpController);
//# sourceMappingURL=question-answering-queries.controller.js.map