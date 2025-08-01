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
exports.SourceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const source_bloc_value_object_1 = require("../domain/values-objects/source-bloc-value-object");
const text_status_value_object_1 = require("../domain/values-objects/text-status-value-object");
const text_action_object_value_1 = require("../domain/values-objects/text-action-object-value");
const response_base_1 = require("../../../libs/api/response.base");
const legal_text_type_value_object_1 = require("../domain/values-objects/legal-text-type-value-object");
class SourceResponseDto extends response_base_1.ResponseBase {
    constructor(props) {
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
}
exports.SourceResponseDto = SourceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Code Civil',
        description: 'Nom du texte juridique',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "legalTextName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BLOC_1',
        description: 'Bloc juridique',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "bloc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'VALID',
        description: 'Statut du texte',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Loi',
        description: 'la nature du texte',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "legalTextType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'MODIFY',
        description: 'Action sur le texte',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Livre II',
        description: 'Livre concerné',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "book", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Titre I',
        description: 'Titre du texte',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        description: 'Numéro du titre',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "titleNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Chapitre II',
        description: 'Chapitre du texte',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "chapter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2',
        description: 'Numéro du chapitre',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "chapterNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Section A',
        description: 'Section du texte',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'A-1',
        description: 'Numéro de la section',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "sectionNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1101',
        description: "Numéro de l'article",
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "articleNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '/docs/code-civil.pdf',
        description: 'Chemin du document source',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "pathDoc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '/metadata/code-civil.json',
        description: 'Chemin des métadonnées',
        required: false,
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "pathMetadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID du chat',
    }),
    __metadata("design:type", String)
], SourceResponseDto.prototype, "chatId", void 0);
//# sourceMappingURL=source.response.dto.js.map