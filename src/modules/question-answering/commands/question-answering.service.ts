import { Injectable } from '@nestjs/common';
import { Result } from 'oxide.ts';
import {
  CreateNewChatRequestDto,
  UpdateChatRequestDto,
} from './chat/create-new-chat.request.dto';
import {
  CreateNewEvaluationRequestDto,
  UpdateEvaluationRequestDto,
} from './evaluation/create-new-evaluation.request.dto';
import { CreateNewDiscussionRequestDto } from './discussion/create-new-discussion.request.dto';
import { ChatService } from './chat/chat.service';
import { DiscussionService } from './discussion/discussion.service';
import { EvaluationService } from './evaluation/evaluation.service';

@Injectable()
export class QuestionAnsweringService {
  constructor(
    private readonly chatService: ChatService,
    private readonly discussionService: DiscussionService,
    private readonly evaluationService: EvaluationService,
  ) {}

  async createChat(data: CreateNewChatRequestDto) {
    return this.discussionService.createChat(data);
  }

  async addChatToDiscussion(
    data: CreateNewChatRequestDto,
    discussionId: string,
  ) {
    return this.chatService.addChatToDiscussion(data, discussionId);
  }

  async createEvaluation(
    data: CreateNewEvaluationRequestDto,
    chatId: string,
  ): Promise<Result<string, Error>> {
    return this.evaluationService.createEvaluation(data, chatId);
  }

  async updateChat(data: UpdateChatRequestDto, chatId: string) {
    return this.chatService.updateChat(data, chatId);
  }

  async updateEvaluation(
    data: UpdateEvaluationRequestDto,
    evaluationId: string,
  ): Promise<Result<string, Error>> {
    return this.evaluationService.updateEvaluation(data, evaluationId);
  }

  async createDiscussion(data: CreateNewDiscussionRequestDto) {
    return this.discussionService.createDiscussion(data);
  }
}
