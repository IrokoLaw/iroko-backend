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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SourceRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const reposiroty_base_1 = require("../../../../../libs/db/reposiroty.base");
const source_mapper_1 = require("../../../mapper/source.mapper");
const source_entity_db_1 = require("../source.entity.db");
let SourceRepository = SourceRepository_1 = class SourceRepository extends reposiroty_base_1.RepositoryBase {
    constructor(mapper, sourceRepository) {
        super(sourceRepository, mapper, new common_1.Logger(SourceRepository_1.name));
        this.mapper = mapper;
        this.sourceRepository = sourceRepository;
        this.tableName = source_entity_db_1.SourceDbEntity.name;
    }
    async deleteByChatId(chatId) {
        await this.sourceRepository.delete({ chatId });
    }
};
exports.SourceRepository = SourceRepository;
exports.SourceRepository = SourceRepository = SourceRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(source_entity_db_1.SourceDbEntity)),
    __metadata("design:paramtypes", [source_mapper_1.SourceMapper,
        typeorm_2.Repository])
], SourceRepository);
//# sourceMappingURL=source.repository.js.map