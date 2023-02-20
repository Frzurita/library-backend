import { MotherCreator } from './mother_creator';

export class UuidMother {
  static random(): string {
    return MotherCreator.random().datatype.uuid();
  }
}
