import { AggregateID, BaseEntity } from "@/libs/domain/entity.base";
import { ChatProps, CreateChatProps } from "./chat.type";
export declare class ChatEntity extends BaseEntity<ChatProps> {
    protected readonly _id: AggregateID;
    static create(data: CreateChatProps): ChatEntity;
    validate(): void;
}
