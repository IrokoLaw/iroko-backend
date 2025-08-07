import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { RepositoryBase } from "@/libs/db/reposiroty.base";

import { ChatEntity } from "@/modules/question-answering/domain/entities/chat/chat.entity";
import { ChatDbEntity } from "../chat.entity.db";
import { ChatRepositoryPort } from "../../../domain/ports/chat.repository.port";
import { ChatMapper } from "@/modules/question-answering/mapper/chat.mapper";
import { Injectable, Logger } from "@nestjs/common";
import { ChatProps } from "@/modules/question-answering/domain/entities/chat/chat.type";

@Injectable()
export class ChatRepository
  extends RepositoryBase<ChatEntity, ChatDbEntity>
  implements ChatRepositoryPort
{
  protected readonly tableName = ChatDbEntity.name;

  constructor(
    readonly mapper: ChatMapper,
    @InjectRepository(ChatDbEntity)
    readonly chatRepository: Repository<ChatDbEntity>
  ) {
    super(chatRepository, mapper, new Logger(ChatRepository.name));
  }

  async updateQuestionFields(
    chatId: string,
    query: Pick<ChatProps, "question" | "documentTypes" | "legalSubjects">
  ): Promise<void> {
    await this.chatRepository.update(chatId, query);
  }

  async updateAnswer(chatId: string, answer: string): Promise<void> {
    await this.chatRepository.update(chatId, { answer });
  }
}
