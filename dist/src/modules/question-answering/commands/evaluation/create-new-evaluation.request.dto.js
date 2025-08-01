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
exports.UpdateEvaluationRequestDto = exports.CreateNewEvaluationRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const evaluation_note_value_object_1 = require("../../domain/values-objects/evaluation-note-value-object");
const class_validator_1 = require("class-validator");
class CreateNewEvaluationRequestDto {
}
exports.CreateNewEvaluationRequestDto = CreateNewEvaluationRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: evaluation_note_value_object_1.EvaluationNoteEnum.SATISFIED,
        description: 'give a mark of a response',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNewEvaluationRequestDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'the answer is good',
        description: 'comment the mark',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewEvaluationRequestDto.prototype, "comment", void 0);
class UpdateEvaluationRequestDto extends CreateNewEvaluationRequestDto {
}
exports.UpdateEvaluationRequestDto = UpdateEvaluationRequestDto;
//# sourceMappingURL=create-new-evaluation.request.dto.js.map