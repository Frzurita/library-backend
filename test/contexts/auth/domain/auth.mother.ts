import { AuthEmail } from '../../../../src/contexts/auth/domain/object_values/auth.email.value_object';
import { AuthPassword } from '../../../../src/contexts/auth/domain/object_values/auth.password.value_object';
import { Auth } from '../../../../src/contexts/auth/domain/auth.aggregate';
import { AuthEmailMother } from './auth.email.mother';
import { AuthPasswordMother } from './auth.password.mother';

export class AuthMother {
  static create(email: AuthEmail, password: AuthPassword): Auth {
    return new Auth(email, password);
  }

  static random(): Auth {
    return this.create(AuthEmailMother.random(), AuthPasswordMother.random());
  }
}
