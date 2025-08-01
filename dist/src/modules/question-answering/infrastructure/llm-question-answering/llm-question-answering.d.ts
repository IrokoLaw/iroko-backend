import { GetAnswerWithSourcesProps, LLMQuestionAnsweringPort } from '../../domain/ports/llm-question-answering.port';
import { AllConfigType } from '@/config/config.type';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { SourceProps } from '../../domain/entities/source/source.type';
export declare class LLMQuestionAnswering implements LLMQuestionAnsweringPort {
    private readonly configService;
    private readonly httpService;
    private readonly endpoint;
    constructor(configService: ConfigService<AllConfigType>, httpService: HttpService);
    getAnswerWithSources(props: GetAnswerWithSourcesProps): Promise<{
        answer: string;
        documents: Omit<SourceProps, 'chatId'>[];
    }>;
}
