import { InvalidArgumentError } from './invalid_argument.error';
import { ValueObject } from './base.value_object';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidEmail(value);
  }

  private ensureIsValidEmail(email: string): void {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(email)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${email}>`,
      );
    }
  }
}
