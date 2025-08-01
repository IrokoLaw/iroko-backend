import { routesV1 } from '@/config/routes';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ConflictException as ConflictHttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@/libs/api/id.response.dto';
import { UserAlreadyExistsError } from '../domain/entities/user/user.errors';
import { ApiErrorResponse } from '@/libs/api/api-error.response';
import { AggregateID } from '@/libs/domain/entity.base';
import { match, Result } from 'oxide.ts';
import { CreateUserRequestDto } from './create-user.request.dto';

@Controller(routesV1.version)
export class UserCommandHttpController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.user.root)
  async create(@Body() body: CreateUserRequestDto): Promise<IdResponse> {
    const result: Result<AggregateID, UserAlreadyExistsError> =
      await this.service.create(body);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof UserAlreadyExistsError)
          throw new ConflictHttpException(error.message);
        throw error;
      },
    });
  }
}
