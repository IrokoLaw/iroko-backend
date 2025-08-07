import { Injectable } from "@nestjs/common";
import { Mapper } from "@/libs/domain/mapper.interface";
import { z } from "zod";
import { SourceDbEntity } from "../infrastructure/persistance/source.entity.db";
import { SourceResponseDto } from "../dtos/source.response.dto";
import { BlocEnum } from "../domain/values-objects/source-bloc-value-object";
import { ActionEnum } from "../domain/values-objects/text-action-object-value";
import { StatusEnum } from "../domain/values-objects/text-status-value-object";
import { SourceEntity } from "../domain/entities/source/source.entity";
import { LegalTextTypeEnum } from "../domain/values-objects/legal-text-type-value-object";

export const sourceSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  legalTextName: z.string().default(""),
  bloc: z.nativeEnum(BlocEnum),
  status: z.nativeEnum(StatusEnum),
  legalTextType: z.nativeEnum(LegalTextTypeEnum),
  action: z.nativeEnum(ActionEnum),
  book: z.string().optional().default(""),
  title: z.string().optional().default(""),
  titleNumber: z.string().optional().default(""),
  chapter: z.string().optional().default(""),
  chapterNumber: z.string().optional().default(""),
  section: z.string().optional().default(""),
  sectionNumber: z.string().optional().default(""),
  articleNumber: z.string().default(""),
  text: z.string().default(""),
  pathDoc: z.string().default(""),
  pathMetadata: z.string().default(""),
  chatId: z.string(),
  reference: z.string().optional(),
  page: z.number().int().default(1),
});

export type SourceModel = z.TypeOf<typeof sourceSchema>;

@Injectable()
export class SourceMapper
  implements Mapper<SourceEntity, SourceModel, SourceResponseDto>
{
  toDomain(dbEntity: SourceDbEntity): SourceEntity {
    const {
      id,
      createdAt,
      updatedAt,
      legalTextName,
      bloc,
      status,
      legalTextType,
      action,
      book,
      title,
      titleNumber,
      chapter,
      chapterNumber,
      section,
      sectionNumber,
      articleNumber,
      pathDoc,
      pathMetadata,
      chatId,
      reference,
      page,
    } = dbEntity;

    return new SourceEntity({
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      props: {
        legalTextName,
        bloc,
        status,
        legalTextType,
        action,
        book,
        title,
        titleNumber,
        chapter,
        chapterNumber,
        section,
        sectionNumber,
        articleNumber,
        pathDoc,
        pathMetadata,
        chatId,
        reference,
        page,
      },
    });
  }

  toPersistence(domainEntity: SourceEntity): SourceDbEntity {
    const copy = domainEntity.getProps();
    const record: SourceModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      legalTextName: copy.legalTextName ?? "",
      bloc: copy.bloc,
      status: copy.status,
      legalTextType: copy.legalTextType ?? LegalTextTypeEnum.LOI,
      action: copy.action,
      book: copy.book ?? "",
      title: copy.title ?? "",
      titleNumber: copy.titleNumber ?? "",
      chapter: copy.chapter ?? "",
      chapterNumber: copy.chapterNumber ?? "",
      section: copy.section ?? "",
      sectionNumber: copy.sectionNumber ?? "",
      articleNumber: copy.articleNumber ?? "",
      pathDoc: copy.pathDoc ?? "",
      pathMetadata: copy.pathMetadata ?? "",
      chatId: copy.chatId,
      page: copy.page ?? 1,
      reference: copy.reference ?? "",
    };

    sourceSchema.parse(record);

    const dbEntity = new SourceDbEntity();
    Object.assign(dbEntity, record);
    return dbEntity;
  }

  toResponse(domainEntity: SourceEntity): SourceResponseDto {
    const props = domainEntity.getProps();
    const response = new SourceResponseDto(props);
    return response;
  }
}
