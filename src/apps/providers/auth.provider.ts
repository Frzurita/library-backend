import { AUTH_REPOSITORY } from '../../contexts/auth/domain/auth.repository';
import { AuthRepositoryTypeOrm } from '../../contexts/auth/infrastructure/auth.repository.typeorm';

export const AuthProviders = [
  {
    provide: AUTH_REPOSITORY,
    useClass: AuthRepositoryTypeOrm,
  },
];
