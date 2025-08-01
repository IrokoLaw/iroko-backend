import { RepositoryPort } from '@/libs/domain/repository.port';
import { ChatEntity } from '@/modules/question-answering/domain/entities/chat/chat.entity';
import { ChatProps } from '../entities/chat/chat.type';
export interface ChatRepositoryPort extends RepositoryPort<ChatEntity> {
  associateEvaluation(chatId: string, evaluationId: string): Promise<void>;
  updateQuestionFields(
    chatId: string,
    query: Pick<ChatProps, 'question' | 'legalSubjects' | 'documentTypes'>,
  ): Promise<void>;
  updateAnswer(chatId: string, answer: string): Promise<void>;
}
