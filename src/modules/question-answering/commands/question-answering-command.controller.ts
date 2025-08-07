import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  NotFoundException as NotFoundHttpException,
  ConflictException as ConflictHttpException,
  Patch,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { QuestionAnsweringService } from "./question-answering.service";
import { match, Result } from "oxide.ts";
import { AggregateID } from "@/libs/domain/entity.base";
import { routesV1 } from "@/config/routes";
import {
  CreateNewChatRequestDto,
  UpdateChatRequestDto,
} from "./chat/create-new-chat.request.dto";
import { IdResponse } from "@/libs/api/id.response.dto";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { ApiErrorResponse } from "@/libs/api/api-error.response";
import { NotFoundException } from "@/libs/exceptions";
import {
  CreateNewEvaluationRequestDto,
  UpdateEvaluationRequestDto,
} from "./evaluation/create-new-evaluation.request.dto";
import { ChatAlreadyHasEvaluationError } from "../domain/entities/evaluation/evaluation.error";
import { CreateNewDiscussionRequestDto } from "./discussion/create-new-discussion.request.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller(routesV1.version)
export class QuestionAnsweringCommandController {
  constructor(private readonly service: QuestionAnsweringService) {}

  @ApiOperation({ summary: "Create a new chat" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.chat.root)
  async create(@Body() body: CreateNewChatRequestDto) {
    const result: Result<AggregateID, Error> =
      await this.service.createChat(body);
    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        throw error;
      },
    });
  }

  @ApiOperation({ summary: "Add a chat to discussion id" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NotFoundException.message,
    type: ApiErrorResponse,
  })
  @Post(routesV1.chat.addChatToDiscussion)
  @ApiParam({ name: "discussionId", type: "string" })
  async addChatToDiscussion(
    @Body() body: CreateNewChatRequestDto,
    @Param() params: { discussionId: string }
  ) {
    const result: Result<AggregateID, Error> =
      await this.service.addChatToDiscussion(body, params.discussionId);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new NotFoundHttpException(error.message);
        throw error;
      },
    });
  }

  @ApiOperation({ summary: "add a new evaluation to a chat" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NotFoundException.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ChatAlreadyHasEvaluationError.message,
    type: ApiErrorResponse,
  })
  @Post(routesV1.chat.evaluation)
  @ApiParam({ name: "chatId", type: "string" })
  async createEvaluation(
    @Param() params: { chatId: string },
    @Body() body: CreateNewEvaluationRequestDto
  ) {
    const result: Result<AggregateID, Error> =
      await this.service.createEvaluation(body, params.chatId);
    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new NotFoundHttpException(error.message);
        if (error instanceof ChatAlreadyHasEvaluationError)
          throw new ConflictHttpException(error.message);
        throw error;
      },
    });
  }

  @ApiOperation({ summary: "Update a evaluation" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NotFoundException.message,
    type: ApiErrorResponse,
  })
  @ApiParam({ name: "evaluationId", type: "string" })
  @Patch(routesV1.evaluation.update)
  async updateEvaluation(
    @Param() params: { evaluationId: string },
    @Body() body: UpdateEvaluationRequestDto
  ) {
    const result: Result<AggregateID, Error> =
      await this.service.updateEvaluation(body, params.evaluationId);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof NotFoundException)
          throw new NotFoundHttpException(error.message);
        throw error;
      },
    });
  }

  @ApiOperation({ summary: "Create a new discussion" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.discussion.root)
  async createDiscussion(@Body() body: CreateNewDiscussionRequestDto) {
    const result: Result<AggregateID, Error> =
      await this.service.createDiscussion(body);
    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        throw error;
      },
    });
  }

  @ApiOperation({ summary: "upload audio file" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.chat.uploadFIle)
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: 5 * 1024 * 1024 }, // Limite à 5MB
    })
  )
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log("Uploading file to GCS:", file.originalname);
      const publicUrl = await this.service.uploadAudioFile(file);
      return { publicUrl };
    } catch (error) {
      throw new Error(`Erreur lors du téléversement: ${error.message}`);
    }
  }
}
