import { BaseEntityDb } from "@/libs/db/base-entity-db";
import { StatusEnum } from "../../domain/values-objects/text-status-value-object";
import { ActionEnum } from "../../domain/values-objects/text-action-object-value";
import { ChatDbEntity } from "./chat.entity.db";
import { BlocEnum } from "../../domain/values-objects/source-bloc-value-object";
import { LegalTextTypeEnum } from "../../domain/values-objects/legal-text-type-value-object";
export declare class SourceDbEntity extends BaseEntityDb {
    legalTextName?: string;
    bloc?: BlocEnum;
    status?: StatusEnum;
    legalTextType?: LegalTextTypeEnum;
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
    chat: ChatDbEntity;
    chatId: string;
    reference?: string;
    page: number;
}
