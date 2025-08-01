import { QuestionAnsweringService } from './question-answering.service';
import { CreateNewChatRequestDto, UpdateChatRequestDto } from './chat/create-new-chat.request.dto';
import { IdResponse } from '@/libs/api/id.response.dto';
import { CreateNewEvaluationRequestDto, UpdateEvaluationRequestDto } from './evaluation/create-new-evaluation.request.dto';
import { CreateNewDiscussionRequestDto } from './discussion/create-new-discussion.request.dto';
export declare class QuestionAnsweringCommandController {
    private readonly service;
    constructor(service: QuestionAnsweringService);
    create(body: CreateNewChatRequestDto): Promise<IdResponse>;
    addChatToDiscussion(body: CreateNewChatRequestDto, params: {
        discussionId: string;
    }): Promise<IdResponse>;
    createEvaluation(params: {
        chatId: string;
    }, body: CreateNewEvaluationRequestDto): Promise<IdResponse>;
    updateChat(params: {
        chatId: string;
    }, body: UpdateChatRequestDto): Promise<IdResponse>;
    updateEvaluation(params: {
        evaluationId: string;
    }, body: UpdateEvaluationRequestDto): Promise<IdResponse>;
    createDiscussion(body: CreateNewDiscussionRequestDto): Promise<IdResponse>;
}
