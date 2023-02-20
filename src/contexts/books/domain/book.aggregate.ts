import { AggregateRoot } from '@nestjs/cqrs';
import { UserId } from '../../../shared/domain/user/object_values/user.id.value_object';
import { BookId } from './object_values/book.id.value_object';
import { BookName } from './object_values/book.name.value_object';

export class Book extends AggregateRoot {
  readonly id: BookId;
  readonly name: BookName;
  readonly userId: UserId;

  constructor(id: BookId, name: BookName, userId: UserId) {
    super();
    this.id = id;
    this.name = name;
    this.userId = userId;
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    userId: string;
  }): Book {
    return new Book(
      new BookId(plainData.id),
      new BookName(plainData.name),
      new UserId(plainData.userId),
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      userId: this.userId.value,
    };
  }
}
