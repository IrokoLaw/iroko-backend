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
exports.SourcePaginatedResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const paginated_response_base_1 = require("../../../libs/api/paginated.response.base");
const source_response_dto_1 = require("./source.response.dto");
class SourcePaginatedResponseDto extends paginated_response_base_1.PaginatedResponseDto {
}
exports.SourcePaginatedResponseDto = SourcePaginatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: source_response_dto_1.SourceResponseDto, isArray: true }),
    __metadata("design:type", Array)
], SourcePaginatedResponseDto.prototype, "data", void 0);
//# sourceMappingURL=source.paginated.response.dto.js.map