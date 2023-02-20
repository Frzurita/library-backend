import { AggregateRoot } from '@nestjs/cqrs';
import { UserEmail } from './object_values/user.email.value_object';
import { UserId } from './object_values/user.id.value_object';

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly email: UserEmail;

  constructor(id: UserId, email: UserEmail) {
    super();
    this.id = id;
    this.email = email;
  }

  static fromPrimitives(plainData: { id: string; email: string }): User {
    return new User(new UserId(plainData.id), new UserEmail(plainData.email));
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      email: this.email.value,
    };
  }
}
