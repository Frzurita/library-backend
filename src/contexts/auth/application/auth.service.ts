import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '../domain/auth.aggregate';
import { AuthRepository, AUTH_REPOSITORY } from '../domain/auth.repository';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @Inject(AUTH_REPOSITORY)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) { }

  async signUp(auth: Auth): Promise<{ accessToken: string }> {
    await this.authRepository.signUp(auth);
    return this.signIn(auth);
  }

  async signIn(auth: Auth): Promise<{ accessToken: string }> {
    const id = await this.authRepository.validateUserPassword(auth);

    if (!id) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { id: id.value };

    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }
}
