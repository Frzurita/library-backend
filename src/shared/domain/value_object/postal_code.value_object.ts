import { InvalidArgumentError } from './invalid_argument.error';
import { ValueObject } from './base.value_object';

export class PostalCode extends ValueObject<string> {
  static postalCodeRegexp = /^(?:0?[1-9]|[1-4]\d|5[0-2])\d{3}$/;
  constructor(value: string) {
    super(value);
    this.ensureIsValidPostalCode(value);
  }

  private ensureIsValidPostalCode(postalCode: string): void {
    if (!PostalCode.postalCodeRegexp.test(postalCode)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${postalCode}>`,
      );
    }
  }
}
