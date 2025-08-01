import { RequestContext } from 'nestjs-request-context';
export declare class AppRequestContext extends RequestContext {
    requestId: string;
}
export declare class RequestContextService {
    static getContext(): AppRequestContext;
    static setRequestId(id: string): void;
    static getRequestId(): string;
}
