import { BlocEnum } from '../domain/values-objects/source-bloc-value-object';
import { StatusEnum } from '../domain/values-objects/text-status-value-object';
import { ActionEnum } from '../domain/values-objects/text-action-object-value';
import { ResponseBase } from '@/libs/api/response.base';
import { LegalTextTypeEnum } from '../domain/values-objects/legal-text-type-value-object';
import { SourceEntityProps } from '../domain/entities/source/source.type';
export declare class SourceResponseDto extends ResponseBase {
    constructor(props: SourceEntityProps);
    legalTextName?: string;
    bloc?: BlocEnum;
    status?: StatusEnum;
    legalTextType: LegalTextTypeEnum;
    action?: ActionEnum;
    book?: string;
    title?: string;
    titleNumber?: string;
    chapter?: string;
    chapterNumber?: string;
    section?: string;
    sectionNumber?: string;
    articleNumber?: string;
    pathDoc?: string;
    pathMetadata?: string;
    chatId: string;
}
