import { BaseEntityProps } from "@/libs/domain/entity.base";
import { BlocEnum } from "../../values-objects/source-bloc-value-object";
import { ActionEnum } from "../../values-objects/text-action-object-value";
import { StatusEnum } from "../../values-objects/text-status-value-object";
import { LegalTextTypeEnum } from "../../values-objects/legal-text-type-value-object";
export interface SourceProps {
    title: string;
    titleNumber?: string;
    chapter?: string;
    chapterNumber?: string;
    section?: string;
    sectionNumber?: string;
    legalTextName: string;
    legalTextType: LegalTextTypeEnum;
    bloc: BlocEnum;
    status: StatusEnum;
    articleNumber: string;
    pathDoc: string;
    action: ActionEnum;
    book?: string;
    pathMetadata: string;
    chatId: string;
    reference?: string;
    page: number;
}
export interface CreateSourceProps {
    title: string;
    titleNumber?: string;
    chapter?: string;
    chapterNumber?: string;
    section?: string;
    sectionNumber?: string;
    legalTextName: string;
    legalTextType: LegalTextTypeEnum;
    bloc: BlocEnum;
    status: StatusEnum;
    articleNumber: string;
    pathDoc: string;
    action: ActionEnum;
    book?: string;
    pathMetadata: string;
    chatId: string;
    reference?: string;
    page: number;
}
export interface SourceEntityProps extends SourceProps, BaseEntityProps {
}
