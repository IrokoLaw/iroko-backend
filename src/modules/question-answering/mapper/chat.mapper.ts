import { z } from "zod";
import { DocumentTypeEnum } from "../domain/values-objects/chat-document-type-value-object";
import { LegalSubjectEnum } from "../domain/values-objects/chat-legal-subject-value-object";
import { Injectable } from "@nestjs/common";
import { Mapper } from "@/libs/domain/mapper.interface";
import { ChatEntity } from "../domain/entities/chat/chat.entity";
import { ChatDbEntity } from "../infrastructure/persistance/chat.entity.db";
import { ChatResponseDto } from "../dtos/chat.response.dto";

export const chatSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  question: z.string().min(1),
  answer: z.string().min(1),
  discussionId: z.string().uuid(),
  documentTypes: z.array(z.nativeEnum(DocumentTypeEnum)).optional(),
  legalSubjects: z.array(z.nativeEnum(LegalSubjectEnum)).optional(),
});

export type ChatModel = z.TypeOf<typeof chatSchema>;

@Injectable()
export class ChatMapper
  implements Mapper<ChatEntity, ChatModel, ChatResponseDto>
{
  toDomain(dbEntity: ChatDbEntity): ChatEntity {
    const {
      id,
      question,
      answer,
      documentTypes,
      legalSubjects,
      createdAt,
      updatedAt,
      discussionId,
    } = dbEntity;
    return new ChatEntity({
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      props: {
        question,
        answer,
        documentTypes,
        legalSubjects,
        discussionId,
      },
    });
  }

  toPersistence(domainEntity: ChatEntity): ChatDbEntity {
    const copy = domainEntity.getProps();
    const record: ChatModel = {
      id: copy.id,
      question: copy.question,
      answer: copy.answer,
      documentTypes: copy.documentTypes,
      legalSubjects: copy.legalSubjects,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      discussionId: copy.discussionId,
    };

    chatSchema.parse(record);
    const dbEntity = new ChatDbEntity();
    Object.assign(dbEntity, record);
    return dbEntity;
  }

  toResponse(domainEntity: ChatEntity): ChatResponseDto {
    const props = domainEntity.getProps();
    return new ChatResponseDto(props);
  }
}
