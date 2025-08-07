export interface Doc {
    path_doc: string;
}
export declare class AnswerFormattingService {
    parseAnswerCitation(answer: string, docs: Doc[]): string;
}
