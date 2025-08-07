import { DiscussionRepositoryPort } from "../../domain/ports/discussion.repository.port";
import { ChatRepositoryPort } from "../../domain/ports/chat.repository.port";
import { SourceRepositoryPort } from "../../domain/ports/source.repository.port";
import { Result } from "oxide.ts";
import { CreateNewChatRequestDto } from "../chat/create-new-chat.request.dto";
import { LLMQuestionAnsweringPort } from "../../domain/ports/llm-question-answering.port";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "@/config/config.type";
import { S3Service } from "@/file-storage/s3.service";
import { CreateNewDiscussionRequestDto } from "./create-new-discussion.request.dto";
import { AnswerFormattingService } from "../answer-formatting.service";
export declare class DiscussionService {
    protected readonly chatRepo: ChatRepositoryPort;
    protected readonly discussionRepo: DiscussionRepositoryPort;
    protected readonly sourceRepo: SourceRepositoryPort;
    protected readonly llmQuestionAnswering: LLMQuestionAnsweringPort;
    protected readonly s3Service: S3Service;
    private readonly configService;
    private readonly answerFormattingService;
    constructor(chatRepo: ChatRepositoryPort, discussionRepo: DiscussionRepositoryPort, sourceRepo: SourceRepositoryPort, llmQuestionAnswering: LLMQuestionAnsweringPort, s3Service: S3Service, configService: ConfigService<AllConfigType>, answerFormattingService: AnswerFormattingService);
    createChat(data: CreateNewChatRequestDto): Promise<Result<string, Error>>;
    createDiscussion(data: CreateNewDiscussionRequestDto): Promise<Result<string, Error>>;
}
