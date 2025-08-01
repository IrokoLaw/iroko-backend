import { LegalTextTypeEnum } from '../../domain/values-objects/legal-text-type-value-object';
import { BlocEnum } from '../../domain/values-objects/source-bloc-value-object';
import { ActionEnum } from '../../domain/values-objects/text-action-object-value';
import { StatusEnum } from '../../domain/values-objects/text-status-value-object';

export interface LLMQuestionAnsweringSource {
  id: string;
  num_title: string;
  chapter: string;
  num_chapter: string;
  num_section: string;
  text_juridique_name: string;
  text_juridique_id: string;
  bloc: BlocEnum;
  path_doc: string;
  pk: number;
  status: StatusEnum;
  action: ActionEnum;
  nature_juridique: LegalTextTypeEnum;
  path_metadata: string;
  livre: string;
  title: string;
  section: string;
  article_num: string;
}

export interface LLMQuestionAnsweringResponse {
  answer: string;
  documents: LLMQuestionAnsweringSource[];
}
