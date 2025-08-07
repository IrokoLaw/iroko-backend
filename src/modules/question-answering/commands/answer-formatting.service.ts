import { Injectable } from "@nestjs/common";

export interface Doc {
  path_doc: string;
}
@Injectable()
export class AnswerFormattingService {
  parseAnswerCitation(answer: string, docs: Doc[]): string {
    if (typeof answer !== "string") {
      return answer;
    }

    const citations = [...answer.matchAll(/\[\d+\]/g)];
    if (citations.length === 0) {
      return answer;
    }

    const citationMap = new Map<string, string>();

    citations.forEach(([citation]) => {
      const sourceNums = citation.match(/\d+/g) ?? [];
      let citationWithLink = citation;

      sourceNums.forEach((num) => {
        const sourceIndex = parseInt(num, 10);

        const doc = docs.find(
          (doc) => parseInt(doc.path_doc, 10) === sourceIndex
        );
        if (doc) {
          const docIndex = docs.indexOf(doc) + 1;
          citationWithLink = citationWithLink.replace(
            num,
            `[${docIndex}](${doc.path_doc})`
          );
        }
      });

      citationMap.set(citation, citationWithLink);
    });

    citationMap.forEach((updatedCitation, originalCitation) => {
      answer = answer.replaceAll(originalCitation, updatedCitation);
    });

    return answer;
  }
}
