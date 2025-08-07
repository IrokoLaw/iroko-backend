import { SourceProps } from "../../domain/entities/source/source.type";
import { LLMQuestionAnsweringSource } from "./llm-question-answering.type";
export declare function LLMQuestionAnsweringSourceToDomainSourceMapper(source: LLMQuestionAnsweringSource): Omit<SourceProps, "chatId">;
