import { RepositoryPort } from '@/libs/domain/repository.port';
import { DiscussionEntity } from '@/modules/question-answering/domain/entities/discussion/discussion.entity';
export interface DiscussionRepositoryPort extends RepositoryPort<DiscussionEntity> {
}
