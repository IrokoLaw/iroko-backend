"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerFormattingService = void 0;
const common_1 = require("@nestjs/common");
let AnswerFormattingService = class AnswerFormattingService {
    parseAnswerCitation(answer, docs) {
        const citations = answer.match(/\[\d+\]\./g) ?? [];
        const uniqueCitations = [...new Set(citations)];
        uniqueCitations.forEach((citation) => {
            const sourcesNum = citation.match(/\d+/g) ?? [];
            let citationWithLink = citation;
            sourcesNum.forEach((num) => {
                const sourceIndex = parseInt(num, 10) - 1;
                if (docs[sourceIndex]) {
                    citationWithLink = citationWithLink.replace(num, `[${num}](${docs[sourceIndex]})`);
                }
            });
            answer = answer.replace(citation, citationWithLink);
        });
        return answer;
    }
};
exports.AnswerFormattingService = AnswerFormattingService;
exports.AnswerFormattingService = AnswerFormattingService = __decorate([
    (0, common_1.Injectable)()
], AnswerFormattingService);
//# sourceMappingURL=answer-formatting.service.js.map