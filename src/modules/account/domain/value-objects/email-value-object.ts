import { ValueObject } from '@/libs/domain/value-object.base';
import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
} from '@/libs/exceptions';
import { Guard } from '@/libs/guard';

export class Email extends ValueObject<string> {
  constructor(props: { value: string }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  private static freeDomains = new Set([
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'aol.com',
    'icloud.com',
  ]);

  static isProfessionalEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return false;
    const domain = email.split('@')[1].toLowerCase();
    return !this.freeDomains.has(domain);
  }

  protected validate(props: { value: string }): void {
    if (!Guard.lengthIsBetween(props.value, 2, 50)) {
      throw new ArgumentOutOfRangeException('Email length is out of range');
    }

    if (!Email.isProfessionalEmail(props.value)) {
      throw new ArgumentInvalidException('Email must be a professional email ');
    }
  }
}
