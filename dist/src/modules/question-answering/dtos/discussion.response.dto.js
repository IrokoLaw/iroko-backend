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
exports.DiscussionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_base_1 = require("../../../libs/api/response.base");
class DiscussionResponseDto extends response_base_1.ResponseBase {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.userId = props.userId;
    }
}
exports.DiscussionResponseDto = DiscussionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Discussion sur la réglementation bancaire',
        description: 'Titre de la discussion',
    }),
    __metadata("design:type", String)
], DiscussionResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: "ID de l'utilisateur ayant initié la discussion",
    }),
    __metadata("design:type", String)
], DiscussionResponseDto.prototype, "userId", void 0);
//# sourceMappingURL=discussion.response.dto.js.map