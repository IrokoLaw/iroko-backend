import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { ChatProps, CreateChatProps } from './chat.type';
import { randomUUID } from 'crypto';
import { ChatDocumentType } from '../../values-objects/chat-document-type-value-object';
import { ChatLegalSubject } from '../../values-objects/chat-legal-subject-value-object';

export class ChatEntity extends BaseEntity<ChatProps> {
  protected readonly _id: AggregateID;

  static create(data: CreateChatProps): ChatEntity {
    const id = randomUUID();
    const documentType = data.documentTypes
      ? data.documentTypes.map((dt) => new ChatDocumentType({ value: dt }))
      : [];
    const legalSubject = data.legalSubjects
      ? data.legalSubjects.map((ls) => new ChatLegalSubject({ value: ls }))
      : [];

    const documentTypeEnums = documentType.map((v) => v.unpack());
    const legalSubjectEnums = legalSubject.map((v) => v.unpack());

    const chat = new ChatEntity({
      id,
      props: {
        ...data,
        documentTypes: documentTypeEnums,
        legalSubjects: legalSubjectEnums,
      },
    });

    return chat;
  }

  associateEvaluation(evaluationId: string) {
    this.props.evaluationId = evaluationId;
  }

  public validate() {}
}
