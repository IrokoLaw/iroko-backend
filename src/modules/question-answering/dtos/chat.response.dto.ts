import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@/libs/api/response.base';
import { DocumentTypeEnum } from '../domain/values-objects/chat-document-type-value-object';
import { LegalSubjectEnum } from '../domain/values-objects/chat-legal-subject-value-object';
import { ChatEntityProps } from '../domain/entities/chat/chat.type';
export class ChatResponseDto extends ResponseBase {
  constructor(props: ChatEntityProps) {
    super(props);
    this.question = props.question;
    this.answer = props.answer;
    this.documentTypes = props.documentTypes;
    this.legalSubjects = props.legalSubjects;
    this.discussionId = props.discussionId;
    this.evaluationId = props.evaluationId;
  }
  @ApiProperty({
    example: 'Quelle est la loi sur le travail ?',
    description: 'La question posée dans le chat',
  })
  question: string;

  @ApiProperty({
    example: 'La loi sur le travail stipule que...',
    description: 'La réponse générée pour la question posée',
  })
  answer: string;

  @ApiProperty({
    example: 'LEGAL_DOCUMENT',
    description: 'Type du document associé à la réponse',
    enum: DocumentTypeEnum,
    required: false,
  })
  documentTypes?: DocumentTypeEnum[];

  @ApiProperty({
    example: 'LABOR_LAW',
    description: 'Domaine du droit auquel se rapporte la réponse',
    enum: LegalSubjectEnum,
    required: false,
  })
  legalSubjects?: LegalSubjectEnum[];

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Identifiant de la discussion à laquelle appartient ce chat',
  })
  discussionId: string;

  @ApiProperty({
    example: 'c9d6f8a9-4e2c-4f21-bb62-123456789abc',
    description: "Identifiant de l'évaluation associée au chat, si applicable",
    required: false,
  })
  evaluationId?: string;
}
