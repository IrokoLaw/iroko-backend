import { Inject, Injectable } from '@nestjs/common';
import {
  CHAT_REPOSITORY,
  DISCUSSION_REPOSITORY,
  EVALUATION_REPOSITORY,
  SOURCE_REPOSITORY,
} from '../question-answering.di-token';
import { DiscussionRepositoryPort } from '../domain/ports/discussion.repository.port';
import { ChatRepositoryPort } from '../domain/ports/chat.repository.port';
import { SourceRepositoryPort } from '../domain/ports/source.repository.port';
import { ChatEntity } from '../domain/entities/chat/chat.entity';
import { SourceEntity } from '../domain/entities/source/source.entity';
import { DiscussionEntity } from '../domain/entities/discussion/discussion.entity';

import { DiscussionEntityProps } from '../domain/entities/discussion/discussion.type';

import { Err, Ok, Result } from 'oxide.ts';
import { PaginatedParams, PaginatedQueryBase } from '@/libs/domain/query.base';
import { Paginated } from '@/libs/domain/repository.port';
import { ChatEntityProps } from '../domain/entities/chat/chat.type';
import { SourceEntityProps } from '../domain/entities/source/source.type';
import { S3Service } from '@/file-storage/s3.service';
import { EvaluationRepositoryPort } from '../domain/ports/evaluation.repository.port';
import { EvaluationEntity } from '../domain/entities/evaluation/evaluation.entity';
import { NotFoundException } from '@/libs/exceptions';
export class FindDiscussionChatsQuery extends PaginatedQueryBase<ChatEntityProps> {
  readonly discussionId: string;
  constructor(
    props: PaginatedParams<FindDiscussionChatsQuery, ChatEntityProps>,
  ) {
    super(props);
    this.discussionId = props.discussionId;
  }
}

export class FindChatSourcesQuery extends PaginatedQueryBase<SourceEntityProps> {
  readonly chatId: string;
  constructor(props: PaginatedParams<FindChatSourcesQuery, SourceEntityProps>) {
    super(props);
    this.chatId = props.chatId;
  }
}

export class FindUserDiscussionsQuery extends PaginatedQueryBase<DiscussionEntityProps> {
  userId: string;
  constructor(
    props: PaginatedParams<FindUserDiscussionsQuery, DiscussionEntityProps>,
  ) {
    super(props);
    this.userId = props.userId;
  }
}

export class FindChatEvaluationQuery {
  chatId: string;
  constructor(props: { chatId: string }) {
    this.chatId = props.chatId;
  }
}
@Injectable()
export class QuestionAnsweringHandler {
  constructor(
    @Inject(DISCUSSION_REPOSITORY)
    private readonly discussionRepository: DiscussionRepositoryPort,
    @Inject(CHAT_REPOSITORY)
    private readonly chatRepository: ChatRepositoryPort,
    @Inject(SOURCE_REPOSITORY)
    private readonly sourceRepository: SourceRepositoryPort,
    @Inject(EVALUATION_REPOSITORY)
    private readonly evaluationRepository: EvaluationRepositoryPort,
    private readonly s3Service: S3Service,
  ) {}

  async findDiscussionChats(
    query: FindDiscussionChatsQuery,
  ): Promise<Result<Paginated<ChatEntity>, Error>> {
    const records = await this.chatRepository.findAllPaginated<ChatEntityProps>(
      {
        page: query.page,
        limit: query.limit,
        orderBy: {
          field: 'createdAt',
          param: 'ASC',
        },
        filterBy: [
          {
            field: 'discussionId',
            value: query.discussionId,
          },
        ],
      },
    );

    return Ok(
      new Paginated({
        data: records.data,
        count: records.count,
        limit: query.limit,
        page: query.page,
      }),
    );
  }

  async findChatSources(
    query: FindChatSourcesQuery,
  ): Promise<Result<Paginated<SourceEntity>, Error>> {
    const records =
      await this.sourceRepository.findAllPaginated<SourceEntityProps>({
        page: query.page,
        limit: query.limit,
        orderBy: query.orderBy,
        filterBy: [
          {
            field: 'chatId',
            value: query.chatId,
          },
        ],
      });

    const sourceData = await Promise.all(
      records.data.map(async (source) =>
        SourceEntity.create({
          chatId: source.getProps().chatId,
          legalTextName: source.getProps().legalTextName,
          bloc: source.getProps().bloc,
          status: source.getProps().status,
          chapterNumber: source.getProps().chapterNumber,
          articleNumber: source.getProps().articleNumber,
          pathDoc: await this.s3Service.getSignedUrl(source.getProps().pathDoc),
          action: source.getProps().action,
          book: source.getProps().book,
          title: source.getProps().title,
          sectionNumber: source.getProps().sectionNumber,
          legalTextType: source.getProps().legalTextType,
          titleNumber: source.getProps().titleNumber,
          chapter: source.getProps().chapter,
          section: source.getProps().section,
          pathMetadata: source.getProps().pathMetadata,
        }),
      ),
    );
    return Ok(
      new Paginated({
        data: sourceData,
        count: records.count,
        limit: query.limit,
        page: query.page,
      }),
    );
  }

  async findUserDiscussions(
    query: FindUserDiscussionsQuery,
  ): Promise<Result<Paginated<DiscussionEntity>, Error>> {
    const records =
      await this.discussionRepository.findAllPaginated<DiscussionEntityProps>({
        page: query.page,
        limit: query.limit,
        orderBy: {
          field: 'createdAt',
          param: 'DESC',
        },

        filterBy: [
          {
            field: 'userId',
            value: query.userId,
          },
        ],
      });

    return Ok(
      new Paginated({
        data: records.data,
        count: records.count,
        limit: query.limit,
        page: query.page,
      }),
    );
  }

  async findChatEvaluation(
    query: FindChatEvaluationQuery,
  ): Promise<Result<EvaluationEntity, Error>> {
    const chat = await this.chatRepository.findOneById(query.chatId);

    if (chat.isNone()) return Err(new NotFoundException());

    const evaluation = await this.evaluationRepository.findOneById(
      chat.unwrap().getProps().evaluationId,
    );

    if (evaluation.isNone()) return Err(new NotFoundException());

    console.log('data :', evaluation);
    return Ok(evaluation.unwrap());
  }
}
