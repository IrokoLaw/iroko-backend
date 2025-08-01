import { ApiProperty } from '@nestjs/swagger';
import { BlocEnum } from '../domain/values-objects/source-bloc-value-object';
import { StatusEnum } from '../domain/values-objects/text-status-value-object';
import { ActionEnum } from '../domain/values-objects/text-action-object-value';
import { ResponseBase } from '@/libs/api/response.base';
import { LegalTextTypeEnum } from '../domain/values-objects/legal-text-type-value-object';
import { SourceEntityProps } from '../domain/entities/source/source.type';
export class SourceResponseDto extends ResponseBase {
  constructor(props: SourceEntityProps) {
    super(props);
    this.legalTextName = props.legalTextName;
    this.bloc = props.bloc;
    this.status = props.status;
    this.legalTextType = props.legalTextType;
    this.action = props.action;
    this.book = props.book;
    this.title = props.title;
    this.titleNumber = props.titleNumber;
    this.chapter = props.chapter;
    this.chapterNumber = props.chapterNumber;
    this.section = props.section;
    this.sectionNumber = props.sectionNumber;
    this.articleNumber = props.articleNumber;
    this.pathDoc = props.pathDoc;
    this.pathMetadata = props.pathMetadata;
    this.chatId = props.chatId;
  }

  @ApiProperty({
    example: 'Code Civil',
    description: 'Nom du texte juridique',
    required: false,
  })
  legalTextName?: string;

  @ApiProperty({
    example: 'BLOC_1',
    description: 'Bloc juridique',
    required: false,
  })
  bloc?: BlocEnum;

  @ApiProperty({
    example: 'VALID',
    description: 'Statut du texte',
    required: false,
  })
  status?: StatusEnum;

  @ApiProperty({
    example: 'Loi',
    description: 'la nature du texte',
    required: false,
  })
  legalTextType: LegalTextTypeEnum;

  @ApiProperty({
    example: 'MODIFY',
    description: 'Action sur le texte',
    required: false,
  })
  action?: ActionEnum;

  @ApiProperty({
    example: 'Livre II',
    description: 'Livre concerné',
    required: false,
  })
  book?: string;

  @ApiProperty({
    example: 'Titre I',
    description: 'Titre du texte',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: '1',
    description: 'Numéro du titre',
    required: false,
  })
  titleNumber?: string;

  @ApiProperty({
    example: 'Chapitre II',
    description: 'Chapitre du texte',
    required: false,
  })
  chapter?: string;

  @ApiProperty({
    example: '2',
    description: 'Numéro du chapitre',
    required: false,
  })
  chapterNumber?: string;

  @ApiProperty({
    example: 'Section A',
    description: 'Section du texte',
    required: false,
  })
  section?: string;

  @ApiProperty({
    example: 'A-1',
    description: 'Numéro de la section',
    required: false,
  })
  sectionNumber?: string;

  @ApiProperty({
    example: '1101',
    description: "Numéro de l'article",
    required: false,
  })
  articleNumber?: string;

  @ApiProperty({
    example: '/docs/code-civil.pdf',
    description: 'Chemin du document source',
    required: false,
  })
  pathDoc?: string;

  @ApiProperty({
    example: '/metadata/code-civil.json',
    description: 'Chemin des métadonnées',
    required: false,
  })
  pathMetadata?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID du chat',
  })
  chatId: string;
}
