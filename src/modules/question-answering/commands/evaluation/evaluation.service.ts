import { Inject, Injectable } from "@nestjs/common";
import { ChatRepositoryPort } from "../../domain/ports/chat.repository.port";
import { EvaluationRepositoryPort } from "../../domain/ports/evaluation.repository.port";
import { Transactional } from "typeorm-transactional";
import { Err, Ok, Result } from "oxide.ts";
import {
  CHAT_REPOSITORY,
  EVALUATION_REPOSITORY,
} from "../../question-answering.di-token";
import { ConflictException, NotFoundException } from "@/libs/exceptions";
import {
  CreateNewEvaluationRequestDto,
  UpdateEvaluationRequestDto,
} from "./create-new-evaluation.request.dto";
import { EvaluationEntity } from "../../domain/entities/evaluation/evaluation.entity";
import { ChatAlreadyHasEvaluationError } from "../../domain/entities/evaluation/evaluation.error";

@Injectable()
export class EvaluationService {
  constructor(
    @Inject(CHAT_REPOSITORY)
    protected readonly chatRepo: ChatRepositoryPort,
    @Inject(EVALUATION_REPOSITORY)
    protected readonly evaluationRepo: EvaluationRepositoryPort
  ) {}

  async createEvaluation(
    data: CreateNewEvaluationRequestDto,
    chatId: string
  ): Promise<Result<string, Error>> {
    try {
      const chat = await this.chatRepo.findOneById(chatId);
      const chatEntity = chat.unwrap();
      if (chat.isNone()) return Err(new NotFoundException());

      const evaluation = EvaluationEntity.create({
        note: data.note,
        comment: data.comment,
      });

      await this.evaluationRepo.transaction(async () => {
        await this.evaluationRepo.insert(evaluation);
      });

      return Ok(evaluation.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new ChatAlreadyHasEvaluationError());
      }
      throw error;
    }
  }

  @Transactional()
  async updateEvaluation(
    data: UpdateEvaluationRequestDto,
    evaluationId: string
  ): Promise<Result<string, Error>> {
    const evaluation = await this.evaluationRepo.findOneById(evaluationId);
    if (evaluation.isNone()) return Err(new NotFoundException());

    await this.evaluationRepo.transaction(async () => {
      await this.evaluationRepo.update(evaluationId, data);
    });

    return Ok(evaluationId);
  }
}
