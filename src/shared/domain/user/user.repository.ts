import { Nullable } from '../../../shared/domain/utility_types/nullable.utility_type';
import { UserId } from './object_values/user.id.value_object';
import { User } from './user.aggregate';

export interface UserRepository {
  create(user: User): Promise<void>;

  update(user: User): Promise<void>;

  get(id: UserId): Promise<Nullable<User>>;

  getAll(): Promise<User[]>;

  delete(id: UserId): Promise<void>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
