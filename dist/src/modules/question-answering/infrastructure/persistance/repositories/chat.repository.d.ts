import { Repository } from 'typeorm';
import { RepositoryBase } from '@/libs/db/reposiroty.base';
import { ChatEntity } from '@/modules/question-answering/domain/entities/chat/chat.entity';
import { ChatDbEntity } from '../chat.entity.db';
import { ChatRepositoryPort } from '../../../domain/ports/chat.repository.port';
import { ChatMapper } from '@/modules/question-answering/mapper/chat.mapper';
import { ChatProps } from '@/modules/question-answering/domain/entities/chat/chat.type';
export declare class ChatRepository extends RepositoryBase<ChatEntity, ChatDbEntity> implements ChatRepositoryPort {
    readonly mapper: ChatMapper;
    readonly chatRepository: Repository<ChatDbEntity>;
    protected readonly tableName: string;
    constructor(mapper: ChatMapper, chatRepository: Repository<ChatDbEntity>);
    associateEvaluation(chatId: string, evaluationId: string): Promise<void>;
    updateQuestionFields(chatId: string, query: Pick<ChatProps, 'question' | 'documentTypes' | 'legalSubjects'>): Promise<void>;
    updateAnswer(chatId: string, answer: string): Promise<void>;
}
