import { Injectable } from '@nestjs/common';

@Injectable()
export class AnswerFormattingService {
  parseAnswerCitation(answer: string, docs: string[]): string {
    const citations = answer.match(/\[\d+\]\./g) ?? [];

    const uniqueCitations = [...new Set(citations)];

    uniqueCitations.forEach((citation) => {
      const sourcesNum = citation.match(/\d+/g) ?? [];
      let citationWithLink = citation;

      sourcesNum.forEach((num) => {
        const sourceIndex = parseInt(num, 10) - 1;
        if (docs[sourceIndex]) {
          citationWithLink = citationWithLink.replace(
            num,
            `[${num}](${docs[sourceIndex]})`,
          );
        }
      });

      answer = answer.replace(citation, citationWithLink);
    });

    return answer;
  }
}
