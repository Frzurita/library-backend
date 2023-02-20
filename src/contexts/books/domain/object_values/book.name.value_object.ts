import { StringValueObject } from '../../../../shared/domain/value_object/string.value_object';
import { CourseNameLengthExceeded } from './book.name_lengh_exceed.value_object';

export class BookName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan255Characters(value);
  }

  private ensureLengthIsLessThan255Characters(value: string): void {
    if (value.length > 255) {
      throw new CourseNameLengthExceeded(
        `The Book Name <${value}> has more than 255 characters`,
      );
    }
  }
}
