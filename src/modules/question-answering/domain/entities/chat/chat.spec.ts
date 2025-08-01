import { DocumentTypeEnum } from '../../values-objects/chat-document-type-value-object';
import { LegalSubjectEnum } from '../../values-objects/chat-legal-subject-value-object';
import { ChatEntity } from './chat.entity';
import { CreateChatProps } from './chat.type';

describe('ChatEntity', () => {
  let validateChatData: CreateChatProps;

  beforeEach(() => {
    validateChatData = {
      question: "la lois sur le travail des enfants en côte d'ivoire",
      answer: 'la lois numéro 2013 portant interdiction du travail des enfants',
      legalSubjects: [LegalSubjectEnum.LABOR_LAW],
      documentTypes: [DocumentTypeEnum.CIRCULARS],
      discussionId: '124498Ghshszu',
    };
  });

  test('should create an discussion with valid data', () => {
    const discussion = ChatEntity.create(validateChatData);
    expect(discussion).toBeInstanceOf(ChatEntity);
  });
});
