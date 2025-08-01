import { ResponseBase } from '@/libs/api/response.base';
import { DiscussionEntityProps } from '../domain/entities/discussion/discussion.type';
export declare class DiscussionResponseDto extends ResponseBase {
    constructor(props: DiscussionEntityProps);
    title: string;
    userId: string;
}
