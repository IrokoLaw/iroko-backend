import { Repository } from 'typeorm';
import { RepositoryBase } from '@/libs/db/reposiroty.base';
import { SourceMapper } from '@/modules/question-answering/mapper/source.mapper';
import { SourceEntity } from '@/modules/question-answering/domain/entities/source/source.entity';
import { SourceDbEntity } from '../source.entity.db';
import { SourceRepositoryPort } from '../../../domain/ports/source.repository.port';
export declare class SourceRepository extends RepositoryBase<SourceEntity, SourceDbEntity> implements SourceRepositoryPort {
    readonly mapper: SourceMapper;
    readonly sourceRepository: Repository<SourceDbEntity>;
    protected readonly tableName: string;
    constructor(mapper: SourceMapper, sourceRepository: Repository<SourceDbEntity>);
    deleteByChatId(chatId: string): Promise<void>;
}
