import { ValueObject } from '@/libs/domain/value-object.base';
export declare class Email extends ValueObject<string> {
    constructor(props: {
        value: string;
    });
    private static freeDomains;
    static isProfessionalEmail(email: string): boolean;
    protected validate(props: {
        value: string;
    }): void;
}
