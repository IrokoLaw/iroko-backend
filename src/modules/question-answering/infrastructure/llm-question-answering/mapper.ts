import { SourceProps } from "../../domain/entities/source/source.type";
import { LLMQuestionAnsweringSource } from "./llm-question-answering.type";

export function LLMQuestionAnsweringSourceToDomainSourceMapper(
  source: LLMQuestionAnsweringSource
): Omit<SourceProps, "chatId"> {
  return {
    titleNumber: source.num_title,
    chapter: source.chapter,
    chapterNumber: source.num_chapter,
    sectionNumber: source.num_section,
    legalTextName: source.text_juridique_name,
    bloc: source.bloc,
    pathDoc: source.path_doc,
    status: source.status,
    action: source.action,
    legalTextType: source.nature_juridique,
    pathMetadata: source.path_metadata,
    book: source.livre,
    title: source.title,
    section: source.section,
    articleNumber: source.article_num,
    reference: source.id,
    page:
      source.page && !isNaN(Number(source.page)) ? parseInt(source.page) : 1,
  };
}
