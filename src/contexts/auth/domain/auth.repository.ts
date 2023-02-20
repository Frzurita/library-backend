import { UserId } from '../../../shared/domain/user/object_values/user.id.value_object';
import { Auth } from './auth.aggregate';

export interface AuthRepository {
  signUp(auth: Auth): Promise<void>;

  validateUserPassword(auth: Auth): Promise<UserId>;
}

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';
