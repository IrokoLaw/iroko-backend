import { routesV1 } from "@/config/routes";
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  NotFoundException as NotFoundHttpException,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import {
  FindChatSourcesQuery,
  FindDiscussionChatsQuery,
  FindUserDiscussionsQuery,
  QuestionAnsweringHandler,
} from "./question-answering-querie-handler";
import { ChatEntity } from "../domain/entities/chat/chat.entity";
import { SourceEntity } from "../domain/entities/source/source.entity";
import { DiscussionEntity } from "../domain/entities/discussion/discussion.entity";
import { PaginatedQueryRequestDto } from "@/libs/api/paginated-query.request.dto";
import { Result } from "oxide.ts";
import { Paginated } from "@/libs/domain/repository.port";
import { ResponseBase } from "@/libs/api/response.base";
import { ChatPaginatedResponseDto } from "../dtos/chat.paginated.response.dto";
import { SourcePaginatedResponseDto } from "../dtos/source.paginated.response.dto";
import { DiscussionPaginatedResponseDto } from "../dtos/discussion.paginated.response.dto";

@Controller(routesV1.version)
export class QuestionAnsweringQueryHttpController {
  constructor(private readonly handler: QuestionAnsweringHandler) {}

  @Get(routesV1.discussion.chats)
  @ApiOperation({ summary: "Get chats of a given discussion id" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async findDiscussionChats(
    @Param("discussionId") discussionId: string,
    @Query() queryParams: PaginatedQueryRequestDto
  ): Promise<ChatPaginatedResponseDto> {
    const cleanedDiscussionId = discussionId.trim();

    const query = new FindDiscussionChatsQuery({
      limit: queryParams.limit ?? 10,
      page: queryParams.page ?? 1,
      discussionId: cleanedDiscussionId,
      orderBy: {
        field: "createdAt",
        param: "ASC",
      },
    });

    const result: Result<
      Paginated<ChatEntity>,
      Error
    > = await this.handler.findDiscussionChats(query);

    const paginated = result.unwrap();

    return new ChatPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((chat) => {
        const { id, createdAt, updatedAt, ...rest } = chat.getProps();
        return {
          ...new ResponseBase({
            id: id,
            createdAt: createdAt,
            updatedAt: updatedAt,
          }),
          ...rest,
        };
      }),
    });
  }

  @Get(routesV1.chat.sources)
  @ApiOperation({ summary: "Get sources of a given chat Id" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async findChatSources(
    @Query() queryParams: PaginatedQueryRequestDto,
    @Param("chatId") chatId: string
  ): Promise<SourcePaginatedResponseDto> {
    const cleanedsourceId = chatId.trim();

    const query = new FindChatSourcesQuery({
      limit: queryParams.limit ?? 100,
      page: queryParams.page ?? 1,
      chatId: cleanedsourceId,
    });

    const result: Result<
      Paginated<SourceEntity>,
      Error
    > = await this.handler.findChatSources(query);

    const paginated = result.unwrap();

    return new SourcePaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((chat) => {
        const { id, createdAt, updatedAt, ...rest } = chat.getProps();
        return {
          ...new ResponseBase({
            id: id,
            createdAt: createdAt,
            updatedAt: updatedAt,
          }),
          ...rest,
        };
      }),
    });
  }

  @Get(routesV1.user.discussions)
  @ApiOperation({ summary: "Get discussions of a given user id" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async findDiscussionByUserId(
    @Param("userId") userId: string,
    @Query() queryParams: PaginatedQueryRequestDto
  ): Promise<DiscussionPaginatedResponseDto> {
    const cleanedUserId = userId.trim();

    const query = new FindUserDiscussionsQuery({
      limit: queryParams.limit ?? 10,
      page: queryParams.page ?? 1,
      orderBy: { field: "createdAt", param: "DESC" },
      userId: cleanedUserId,
    });

    const result: Result<
      Paginated<DiscussionEntity>,
      Error
    > = await this.handler.findUserDiscussions(query);

    const paginated = result.unwrap();

    return new DiscussionPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((chat) => {
        const { id, createdAt, updatedAt, ...rest } = chat.getProps();
        return {
          ...new ResponseBase({
            id: id,
            createdAt: createdAt,
            updatedAt: updatedAt,
          }),
          ...rest,
        };
      }),
    });
  }
}
