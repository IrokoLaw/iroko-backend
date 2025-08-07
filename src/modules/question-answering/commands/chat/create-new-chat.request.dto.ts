import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  MinLength,
} from "class-validator";
import { LegalSubjectEnum } from "../../domain/values-objects/chat-legal-subject-value-object";
import { DocumentTypeEnum } from "../../domain/values-objects/chat-document-type-value-object";
import { ApiProperty } from "@nestjs/swagger";
import { LLMQuestionAnsweringSource } from "../../infrastructure/llm-question-answering/llm-question-answering.type";

export class CreateNewChatRequestDto {
  @ApiProperty({
    example: "La loi sur le travail ?",
    description: "The question asked in the chat",
  })
  @MinLength(1)
  @IsString()
  question: string;

  @ApiProperty({
    example: [LegalSubjectEnum.DEFAULT_LAW, LegalSubjectEnum.LABOR_LAW],
    description: "The legal subjects related to the question",
    enum: LegalSubjectEnum,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(LegalSubjectEnum, { each: true })
  legalSubjects?: LegalSubjectEnum[];

  @ApiProperty({
    example: "La loi sur le travail ?",
    description: "The question asked in the chat",
  })
  @MinLength(1)
  @IsString()
  answer: string;

  @ApiProperty({
    example: [],
    description: "The legal subjects related to the question",
    required: false,
  })
  @IsOptional()
  @IsArray()
  documents: LLMQuestionAnsweringSource[];

  @ApiProperty({
    example: [DocumentTypeEnum.LAWS, DocumentTypeEnum.DECREES],
    description: "The type of document associated with the answer",
    enum: DocumentTypeEnum,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(DocumentTypeEnum, { each: true })
  documentTypes?: DocumentTypeEnum[];
}

export class UpdateChatRequestDto extends CreateNewChatRequestDto {}
