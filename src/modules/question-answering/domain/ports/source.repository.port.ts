import { RepositoryPort } from '@/libs/domain/repository.port';
import { SourceEntity } from '@/modules/question-answering/domain/entities/source/source.entity';

export interface SourceRepositoryPort extends RepositoryPort<SourceEntity> {
  deleteByChatId(chatId: string): Promise<void>;
}
