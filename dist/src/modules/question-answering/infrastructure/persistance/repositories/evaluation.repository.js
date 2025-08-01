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
var EvaluationRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const reposiroty_base_1 = require("../../../../../libs/db/reposiroty.base");
const evaluation_mapper_1 = require("../../../mapper/evaluation.mapper");
const evaluation_entity_db_1 = require("../evaluation.entity.db");
let EvaluationRepository = EvaluationRepository_1 = class EvaluationRepository extends reposiroty_base_1.RepositoryBase {
    constructor(mapper, evaluationRepository) {
        super(evaluationRepository, mapper, new common_1.Logger(EvaluationRepository_1.name));
        this.mapper = mapper;
        this.evaluationRepository = evaluationRepository;
        this.tableName = evaluation_entity_db_1.EvaluationDbEntity.name;
    }
    async update(id, props) {
        await this.evaluationRepository.update(id, props);
    }
};
exports.EvaluationRepository = EvaluationRepository;
exports.EvaluationRepository = EvaluationRepository = EvaluationRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(evaluation_entity_db_1.EvaluationDbEntity)),
    __metadata("design:paramtypes", [evaluation_mapper_1.EvaluationMapper,
        typeorm_2.Repository])
], EvaluationRepository);
//# sourceMappingURL=evaluation.repository.js.map