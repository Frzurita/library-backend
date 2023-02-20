import { Test, TestingModule } from '@nestjs/testing';
import { AuthMother } from '../domain/auth.mother';
import { AuthRepositoryMock } from '../infrastructure/auth.repository.mock';
import {
  AuthRepository,
  AUTH_REPOSITORY,
} from '../../../../src/contexts/auth/domain/auth.repository';
import { AuthService } from '../../../../src/contexts/auth/application/auth.service';
import { JwtServiceMock } from '../infrastructure/jwt.service.mock';
import { JwtService } from '@nestjs/jwt';
import { UserIdMother } from '../../book/domain/user.id.mother';

describe('Auth Service', () => {
  let authService: AuthService;
  let authRepository;
  let jwtService;
  const accessToken = 'access_token';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AUTH_REPOSITORY, useFactory: AuthRepositoryMock },
        { provide: JwtService, useFactory: JwtServiceMock },
      ],
    }).compile();

    authRepository = app.get<AuthRepository>(AUTH_REPOSITORY);
    jwtService = app.get<JwtService>(JwtService);
    authService = app.get<AuthService>(AuthService);
  });

  describe('doing a signup', () => {
    it('should call "signUp"', async () => {
      const auth = AuthMother.random();
      const userId = UserIdMother.random();
      authRepository.validateUserPassword.mockResolvedValue(userId);
      jwtService.sign.mockResolvedValue(accessToken);
      expect(await authService.signUp(auth));
      expect(authRepository.signUp).toHaveBeenCalledWith(auth);
      expect(authRepository.validateUserPassword).toHaveBeenCalledWith(auth);
      expect(jwtService.sign).toHaveBeenCalledWith({ id: userId.value });
    });
  });

  describe('doing a signIn', () => {
    it('should call "signIn"', async () => {
      const auth = AuthMother.random();
      const userId = UserIdMother.random();
      authRepository.validateUserPassword.mockResolvedValue(userId);
      jwtService.sign.mockResolvedValue(accessToken);
      expect(await authService.signIn(auth));
      expect(authRepository.validateUserPassword).toHaveBeenCalledWith(auth);
      expect(jwtService.sign).toHaveBeenCalledWith({ id: userId.value });
    });
  });
});
