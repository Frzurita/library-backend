import { AggregateRoot } from '@nestjs/cqrs';
import { AuthEmail } from './object_values/auth.email.value_object';
import { AuthPassword } from './object_values/auth.password.value_object';

export class Auth extends AggregateRoot {
  readonly email: AuthEmail;
  readonly password: AuthPassword;

  constructor(email: AuthEmail, password: AuthPassword) {
    super();
    this.email = email;
    this.password = password;
  }

  static fromPrimitives(plainData: { email: string; password: string }): Auth {
    return new Auth(
      new AuthEmail(plainData.email),
      new AuthPassword(plainData.password),
    );
  }

  toPrimitives(): any {
    return {
      email: this.email.value,
      password: this.password.value,
    };
  }
}
