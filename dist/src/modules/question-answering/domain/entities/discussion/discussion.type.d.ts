import { BaseEntityProps } from '@/libs/domain/entity.base';
export interface DiscussionProps {
    title: string;
    userId: string;
}
export interface CreateDiscussionProps {
    title: string;
    userId: string;
}
export interface DiscussionEntityProps extends DiscussionProps, BaseEntityProps {
}
