import { z } from "zod";
import { DocumentTypeEnum } from "../domain/values-objects/chat-document-type-value-object";
import { LegalSubjectEnum } from "../domain/values-objects/chat-legal-subject-value-object";
import { Mapper } from "@/libs/domain/mapper.interface";
import { ChatEntity } from "../domain/entities/chat/chat.entity";
import { ChatDbEntity } from "../infrastructure/persistance/chat.entity.db";
import { ChatResponseDto } from "../dtos/chat.response.dto";
export declare const chatSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    question: z.ZodString;
    answer: z.ZodString;
    discussionId: z.ZodString;
    documentTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof DocumentTypeEnum>, "many">>;
    legalSubjects: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof LegalSubjectEnum>, "many">>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    question?: string;
    answer?: string;
    documentTypes?: DocumentTypeEnum[];
    legalSubjects?: LegalSubjectEnum[];
    discussionId?: string;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    question?: string;
    answer?: string;
    documentTypes?: DocumentTypeEnum[];
    legalSubjects?: LegalSubjectEnum[];
    discussionId?: string;
}>;
export type ChatModel = z.TypeOf<typeof chatSchema>;
export declare class ChatMapper implements Mapper<ChatEntity, ChatModel, ChatResponseDto> {
    toDomain(dbEntity: ChatDbEntity): ChatEntity;
    toPersistence(domainEntity: ChatEntity): ChatDbEntity;
    toResponse(domainEntity: ChatEntity): ChatResponseDto;
}
