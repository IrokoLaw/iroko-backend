import { QuestionAnsweringHandler } from "./question-answering-querie-handler";
import { PaginatedQueryRequestDto } from "@/libs/api/paginated-query.request.dto";
import { ChatPaginatedResponseDto } from "../dtos/chat.paginated.response.dto";
import { SourcePaginatedResponseDto } from "../dtos/source.paginated.response.dto";
import { DiscussionPaginatedResponseDto } from "../dtos/discussion.paginated.response.dto";
export declare class QuestionAnsweringQueryHttpController {
    private readonly handler;
    constructor(handler: QuestionAnsweringHandler);
    findDiscussionChats(discussionId: string, queryParams: PaginatedQueryRequestDto): Promise<ChatPaginatedResponseDto>;
    findChatSources(queryParams: PaginatedQueryRequestDto, chatId: string): Promise<SourcePaginatedResponseDto>;
    findDiscussionByUserId(userId: string, queryParams: PaginatedQueryRequestDto): Promise<DiscussionPaginatedResponseDto>;
}
