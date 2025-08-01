import { DiscussionRepositoryPort } from '../domain/ports/discussion.repository.port';
import { ChatRepositoryPort } from '../domain/ports/chat.repository.port';
import { SourceRepositoryPort } from '../domain/ports/source.repository.port';
import { ChatEntity } from '../domain/entities/chat/chat.entity';
import { SourceEntity } from '../domain/entities/source/source.entity';
import { DiscussionEntity } from '../domain/entities/discussion/discussion.entity';
import { DiscussionEntityProps } from '../domain/entities/discussion/discussion.type';
import { Result } from 'oxide.ts';
import { PaginatedParams, PaginatedQueryBase } from '@/libs/domain/query.base';
import { Paginated } from '@/libs/domain/repository.port';
import { ChatEntityProps } from '../domain/entities/chat/chat.type';
import { SourceEntityProps } from '../domain/entities/source/source.type';
import { S3Service } from '@/file-storage/s3.service';
import { EvaluationRepositoryPort } from '../domain/ports/evaluation.repository.port';
import { EvaluationEntity } from '../domain/entities/evaluation/evaluation.entity';
export declare class FindDiscussionChatsQuery extends PaginatedQueryBase<ChatEntityProps> {
    readonly discussionId: string;
    constructor(props: PaginatedParams<FindDiscussionChatsQuery, ChatEntityProps>);
}
export declare class FindChatSourcesQuery extends PaginatedQueryBase<SourceEntityProps> {
    readonly chatId: string;
    constructor(props: PaginatedParams<FindChatSourcesQuery, SourceEntityProps>);
}
export declare class FindUserDiscussionsQuery extends PaginatedQueryBase<DiscussionEntityProps> {
    userId: string;
    constructor(props: PaginatedParams<FindUserDiscussionsQuery, DiscussionEntityProps>);
}
export declare class FindChatEvaluationQuery {
    chatId: string;
    constructor(props: {
        chatId: string;
    });
}
export declare class QuestionAnsweringHandler {
    private readonly discussionRepository;
    private readonly chatRepository;
    private readonly sourceRepository;
    private readonly evaluationRepository;
    private readonly s3Service;
    constructor(discussionRepository: DiscussionRepositoryPort, chatRepository: ChatRepositoryPort, sourceRepository: SourceRepositoryPort, evaluationRepository: EvaluationRepositoryPort, s3Service: S3Service);
    findDiscussionChats(query: FindDiscussionChatsQuery): Promise<Result<Paginated<ChatEntity>, Error>>;
    findChatSources(query: FindChatSourcesQuery): Promise<Result<Paginated<SourceEntity>, Error>>;
    findUserDiscussions(query: FindUserDiscussionsQuery): Promise<Result<Paginated<DiscussionEntity>, Error>>;
    findChatEvaluation(query: FindChatEvaluationQuery): Promise<Result<EvaluationEntity, Error>>;
}
