import { ChatRepositoryPort } from "../../domain/ports/chat.repository.port";
import { DiscussionRepositoryPort } from "../../domain/ports/discussion.repository.port";
import { SourceRepositoryPort } from "../../domain/ports/source.repository.port";
import { Result } from "oxide.ts";
import { CreateNewChatRequestDto } from "./create-new-chat.request.dto";
import { LLMQuestionAnsweringPort } from "../../domain/ports/llm-question-answering.port";
import { S3Service } from "@/file-storage/s3.service";
import { AnswerFormattingService } from "../answer-formatting.service";
export declare class ChatService {
    protected readonly chatRepo: ChatRepositoryPort;
    protected readonly discussionRepo: DiscussionRepositoryPort;
    protected readonly sourceRepo: SourceRepositoryPort;
    protected readonly llmQuestionAnswering: LLMQuestionAnsweringPort;
    protected readonly s3Service: S3Service;
    private readonly answerFormattingService;
    private storage;
    private bucketName;
    constructor(chatRepo: ChatRepositoryPort, discussionRepo: DiscussionRepositoryPort, sourceRepo: SourceRepositoryPort, llmQuestionAnswering: LLMQuestionAnsweringPort, s3Service: S3Service, answerFormattingService: AnswerFormattingService);
    addChatToDiscussion(data: CreateNewChatRequestDto, discussionId: string): Promise<Result<string, Error>>;
    private createNewChatAndAddToDiscussion;
    uploadAudio(file: Express.Multer.File): Promise<string>;
}
