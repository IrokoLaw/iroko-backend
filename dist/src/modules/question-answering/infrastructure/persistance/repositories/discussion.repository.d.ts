import { Repository } from 'typeorm';
import { RepositoryBase } from '@/libs/db/reposiroty.base';
import { DiscussionEntity } from '@/modules/question-answering/domain/entities/discussion/discussion.entity';
import { DiscussionDbEntity } from '../discussion.entity.db';
import { DiscussionRepositoryPort } from '../../../domain/ports/discussion.repository.port';
import { DiscussionMapper } from '@/modules/question-answering/mapper/discussion.mapper';
export declare class DiscussionRepository extends RepositoryBase<DiscussionEntity, DiscussionDbEntity> implements DiscussionRepositoryPort {
    readonly mapper: DiscussionMapper;
    readonly discussionRepository: Repository<DiscussionDbEntity>;
    protected readonly tableName: string;
    constructor(mapper: DiscussionMapper, discussionRepository: Repository<DiscussionDbEntity>);
}
