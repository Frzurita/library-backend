import { ValueObject } from '../../../../shared/domain/value_object/base.value_object';
import { InvalidArgumentError } from '../../../../shared/domain/value_object/invalid_argument.error';

export class AuthPassword extends ValueObject<string> {
  static regexp = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  constructor(value: string) {
    super(value);
    this.ensureIsValidPassword(value);
  }

  private ensureIsValidPassword(password: string): void {
    if (!AuthPassword.regexp.test(password)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${password}>`,
      );
    }
  }
}
