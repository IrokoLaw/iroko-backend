import { Result } from "oxide.ts";
import { CreateNewChatRequestDto } from "./chat/create-new-chat.request.dto";
import { CreateNewEvaluationRequestDto, UpdateEvaluationRequestDto } from "./evaluation/create-new-evaluation.request.dto";
import { CreateNewDiscussionRequestDto } from "./discussion/create-new-discussion.request.dto";
import { ChatService } from "./chat/chat.service";
import { DiscussionService } from "./discussion/discussion.service";
import { EvaluationService } from "./evaluation/evaluation.service";
export declare class QuestionAnsweringService {
    private readonly chatService;
    private readonly discussionService;
    private readonly evaluationService;
    constructor(chatService: ChatService, discussionService: DiscussionService, evaluationService: EvaluationService);
    createChat(data: CreateNewChatRequestDto): Promise<Result<string, Error>>;
    addChatToDiscussion(data: CreateNewChatRequestDto, discussionId: string): Promise<Result<string, Error>>;
    createEvaluation(data: CreateNewEvaluationRequestDto, chatId: string): Promise<Result<string, Error>>;
    updateEvaluation(data: UpdateEvaluationRequestDto, evaluationId: string): Promise<Result<string, Error>>;
    createDiscussion(data: CreateNewDiscussionRequestDto): Promise<Result<string, Error>>;
    uploadAudioFile(file: Express.Multer.File): Promise<string>;
}
