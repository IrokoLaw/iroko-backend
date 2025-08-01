import { Injectable } from '@nestjs/common';
import {
  GetAnswerWithSourcesProps,
  LLMQuestionAnsweringPort,
} from '../../domain/ports/llm-question-answering.port';
import { AllConfigType } from '@/config/config.type';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { LLMQuestionAnsweringSourceToDomainSourceMapper } from './mapper';
import { SourceProps } from '../../domain/entities/source/source.type';
@Injectable()
export class LLMQuestionAnswering implements LLMQuestionAnsweringPort {
  private readonly endpoint: string;
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly httpService: HttpService,
  ) {
    this.endpoint =
      this.configService.getOrThrow('llmConfig.url', {
        infer: true,
      }) + '/question_answering';
  }

  async getAnswerWithSources(props: GetAnswerWithSourcesProps): Promise<{
    answer: string;
    documents: Omit<SourceProps, 'chatId'>[];
  }> {
    try {
      const params = new URLSearchParams();

      params.append('query', props.question);

      props.legalSubjects?.forEach((subject) => {
        params.append('sources', subject);
      });

      const { data } = await this.httpService.axiosRef.get(
        `${this.endpoint}?${params.toString()}`,
      );

      return {
        answer: data.answer,
        documents: data.documents.map(
          LLMQuestionAnsweringSourceToDomainSourceMapper,
        ),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
