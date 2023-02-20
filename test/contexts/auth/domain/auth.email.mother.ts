import { AuthEmail } from '../../../../src/contexts/auth/domain/object_values/auth.email.value_object';
import { WordMother } from '../../../shared/domain/word.mother';

export class AuthEmailMother {
  static create(value: string): AuthEmail {
    return new AuthEmail(value);
  }

  static random(): AuthEmail {
    return this.create(
      `${WordMother.random({
        minLength: 3,
        maxLength: 10,
      })}@${WordMother.random({
        minLength: 3,
        maxLength: 10,
      })}.${WordMother.random({ maxLength: 3 })}`,
    );
  }

  static invalidEmail(): string {
    return WordMother.random({ minLength: 3, maxLength: 20 });
  }
}
