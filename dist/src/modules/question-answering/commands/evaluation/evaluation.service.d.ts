import { ChatRepositoryPort } from '../../domain/ports/chat.repository.port';
import { EvaluationRepositoryPort } from '../../domain/ports/evaluation.repository.port';
import { Result } from 'oxide.ts';
import { CreateNewEvaluationRequestDto, UpdateEvaluationRequestDto } from './create-new-evaluation.request.dto';
export declare class EvaluationService {
    protected readonly chatRepo: ChatRepositoryPort;
    protected readonly evaluationRepo: EvaluationRepositoryPort;
    constructor(chatRepo: ChatRepositoryPort, evaluationRepo: EvaluationRepositoryPort);
    createEvaluation(data: CreateNewEvaluationRequestDto, chatId: string): Promise<Result<string, Error>>;
    updateEvaluation(data: UpdateEvaluationRequestDto, evaluationId: string): Promise<Result<string, Error>>;
}
