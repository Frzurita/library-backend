import { AuthPassword } from '../../../../src/contexts/auth/domain/object_values/auth.password.value_object';
import { WordMother } from '../../../shared/domain/word.mother';

export class AuthPasswordMother {
  static create(value: string): AuthPassword {
    return new AuthPassword(value);
  }

  static random(): AuthPassword {
    return this.create(`@${WordMother.random({ maxLength: 20 })}12Aa`);
  }

  static invalid(): string {
    return 'e'.repeat(12);
  }
}
