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
exports.QuestionAnsweringHandler = exports.FindChatEvaluationQuery = exports.FindUserDiscussionsQuery = exports.FindChatSourcesQuery = exports.FindDiscussionChatsQuery = void 0;
const common_1 = require("@nestjs/common");
const question_answering_di_token_1 = require("../question-answering.di-token");
const source_entity_1 = require("../domain/entities/source/source.entity");
const oxide_ts_1 = require("oxide.ts");
const query_base_1 = require("../../../libs/domain/query.base");
const repository_port_1 = require("../../../libs/domain/repository.port");
const gcs_service_1 = require("../../../gcs/gcs.service");
class FindDiscussionChatsQuery extends query_base_1.PaginatedQueryBase {
    constructor(props) {
        super(props);
        this.discussionId = props.discussionId;
    }
}
exports.FindDiscussionChatsQuery = FindDiscussionChatsQuery;
class FindChatSourcesQuery extends query_base_1.PaginatedQueryBase {
    constructor(props) {
        super(props);
        this.chatId = props.chatId;
    }
}
exports.FindChatSourcesQuery = FindChatSourcesQuery;
class FindUserDiscussionsQuery extends query_base_1.PaginatedQueryBase {
    constructor(props) {
        super(props);
        this.userId = props.userId;
    }
}
exports.FindUserDiscussionsQuery = FindUserDiscussionsQuery;
class FindChatEvaluationQuery {
    constructor(props) {
        this.chatId = props.chatId;
    }
}
exports.FindChatEvaluationQuery = FindChatEvaluationQuery;
let QuestionAnsweringHandler = class QuestionAnsweringHandler {
    constructor(discussionRepository, chatRepository, sourceRepository, evaluationRepository, fileStorage) {
        this.discussionRepository = discussionRepository;
        this.chatRepository = chatRepository;
        this.sourceRepository = sourceRepository;
        this.evaluationRepository = evaluationRepository;
        this.fileStorage = fileStorage;
    }
    async findDiscussionChats(query) {
        const records = await this.chatRepository.findAllPaginated({
            page: query.page,
            limit: query.limit,
            orderBy: {
                field: "createdAt",
                param: "ASC",
            },
            filterBy: [
                {
                    field: "discussionId",
                    value: query.discussionId,
                },
            ],
        });
        return (0, oxide_ts_1.Ok)(new repository_port_1.Paginated({
            data: records.data,
            count: records.count,
            limit: query.limit,
            page: query.page,
        }));
    }
    async findChatSources(query) {
        const records = await this.sourceRepository.findAllPaginated({
            page: query.page,
            limit: query.limit,
            orderBy: query.orderBy,
            filterBy: [
                {
                    field: "chatId",
                    value: query.chatId,
                },
            ],
        });
        const sourceData = await Promise.all(records.data.map(async (source) => source_entity_1.SourceEntity.create({
            chatId: source.getProps().chatId,
            legalTextName: source.getProps().legalTextName,
            bloc: source.getProps().bloc,
            status: source.getProps().status,
            chapterNumber: source.getProps().chapterNumber,
            articleNumber: source.getProps().articleNumber,
            pathDoc: await this.fileStorage.getSignedUrl(source.getProps().pathDoc),
            action: source.getProps().action,
            book: source.getProps().book,
            title: source.getProps().title,
            sectionNumber: source.getProps().sectionNumber,
            legalTextType: source.getProps().legalTextType,
            titleNumber: source.getProps().titleNumber,
            chapter: source.getProps().chapter,
            section: source.getProps().section,
            pathMetadata: source.getProps().pathMetadata,
            reference: source.getProps().reference,
            page: source.getProps().page,
        })));
        return (0, oxide_ts_1.Ok)(new repository_port_1.Paginated({
            data: sourceData,
            count: records.count,
            limit: query.limit,
            page: query.page,
        }));
    }
    async findUserDiscussions(query) {
        const records = await this.discussionRepository.findAllPaginated({
            page: query.page,
            limit: query.limit,
            orderBy: {
                field: "createdAt",
                param: "DESC",
            },
            filterBy: [
                {
                    field: "userId",
                    value: query.userId,
                },
            ],
        });
        return (0, oxide_ts_1.Ok)(new repository_port_1.Paginated({
            data: records.data,
            count: records.count,
            limit: query.limit,
            page: query.page,
        }));
    }
};
exports.QuestionAnsweringHandler = QuestionAnsweringHandler;
exports.QuestionAnsweringHandler = QuestionAnsweringHandler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(question_answering_di_token_1.DISCUSSION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(question_answering_di_token_1.CHAT_REPOSITORY)),
    __param(2, (0, common_1.Inject)(question_answering_di_token_1.SOURCE_REPOSITORY)),
    __param(3, (0, common_1.Inject)(question_answering_di_token_1.EVALUATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, gcs_service_1.GCSService])
], QuestionAnsweringHandler);
//# sourceMappingURL=question-answering-querie-handler.js.map