import { BlocEnum } from '../../values-objects/source-bloc-value-object';
import { ActionEnum } from '../../values-objects/text-action-object-value';
import { StatusEnum } from '../../values-objects/text-status-value-object';
import { SourceEntity } from './source.entity';
import { CreateSourceProps } from './source.type';
import { LegalTextTypeEnum } from '../../values-objects/legal-text-type-value-object';
describe('SourceEntity', () => {
  let validSourceData: CreateSourceProps;

  beforeEach(() => {
    validSourceData = {
      title: 'Code du travail',
      titleNumber: 'I',
      chapter: 'Chapitre 2',
      chapterNumber: 'II',
      section: 'Section A',
      sectionNumber: 'III',
      legalTextName: 'Code du travail',
      legalTextType: LegalTextTypeEnum.LOI,
      bloc: BlocEnum.LEGISLATIVE,
      status: StatusEnum.APPLICABLE,
      articleNumber: '17',
      action: ActionEnum.PRECISION,
      book: 'Livre 1',
      pathDoc: 'https://docs/lois.pdf',
      pathMetadata: 'https://docs/metadata.json',
      chatId: '1242536HOUbsssd',
    };
  });

  test('should create a SourceEntity with valid data', () => {
    const source = SourceEntity.create(validSourceData);
    expect(source).toBeInstanceOf(SourceEntity);
  });
});
