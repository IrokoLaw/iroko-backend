"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationResponseDto = void 0;
const response_base_1 = require("../../../libs/api/response.base");
const swagger_1 = require("@nestjs/swagger");
const evaluation_note_value_object_1 = require("../domain/values-objects/evaluation-note-value-object");
class EvaluationResponseDto extends response_base_1.ResponseBase {
    constructor(props) {
        super(props);
        this.note = props.note;
        this.comment = props.comment;
    }
}
exports.EvaluationResponseDto = EvaluationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: evaluation_note_value_object_1.EvaluationNoteEnum.USEFUL,
        description: "give a mark of a response",
    }),
    __metadata("design:type", String)
], EvaluationResponseDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "the answer is good",
        description: "comment the mark",
    }),
    __metadata("design:type", String)
], EvaluationResponseDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "the chat id",
    }),
    __metadata("design:type", String)
], EvaluationResponseDto.prototype, "chatId", void 0);
//# sourceMappingURL=evaluation.response.dto.js.map