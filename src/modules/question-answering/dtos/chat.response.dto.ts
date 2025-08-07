import { ApiProperty } from "@nestjs/swagger";
import { ResponseBase } from "@/libs/api/response.base";
import { DocumentTypeEnum } from "../domain/values-objects/chat-document-type-value-object";
import { LegalSubjectEnum } from "../domain/values-objects/chat-legal-subject-value-object";
import { ChatEntityProps } from "../domain/entities/chat/chat.type";
export class ChatResponseDto extends ResponseBase {
  constructor(props: ChatEntityProps) {
    super(props);
    this.question = props.question;
    this.answer = props.answer;
    this.documentTypes = props.documentTypes;
    this.legalSubjects = props.legalSubjects;
    this.discussionId = props.discussionId;
  }
  @ApiProperty({
    example: "Quelle est la loi sur le travail ?",
    description: "La question posée dans le chat",
  })
  question: string;

  @ApiProperty({
    example: "La loi sur le travail stipule que...",
    description: "La réponse générée pour la question posée",
  })
  answer: string;

  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "Identifiant unique de la discussion associée",
  })
  discussionId: string;

  @ApiProperty({
    example: "LEGAL_DOCUMENT",
    description: "Type du document associé à la réponse",
    enum: DocumentTypeEnum,
    required: false,
  })
  documentTypes?: DocumentTypeEnum[];

  @ApiProperty({
    example: "LABOR_LAW",
    description: "Domaine du droit auquel se rapporte la réponse",
    enum: LegalSubjectEnum,
    required: false,
  })
  legalSubjects?: LegalSubjectEnum[];
}
