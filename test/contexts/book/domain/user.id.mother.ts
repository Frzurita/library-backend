import { UserId } from '../../../../src/shared/domain/user/object_values/user.id.value_object';
import { UuidMother } from '../../../shared/domain/uuid.mother';

export class UserIdMother {
  static create(value: string): UserId {
    return new UserId(value);
  }
  static random(): UserId {
    return this.create(UuidMother.random());
  }
}
