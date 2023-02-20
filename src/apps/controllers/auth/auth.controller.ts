import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { Auth } from '../../../contexts/auth/domain/auth.aggregate';
import { AuthService } from '../../../contexts/auth/application/auth.service';
import { AuthCredentialsValidator } from './validators/auth-credentials.validator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsValidator,
  ): Promise<{ accessToken: string }> {
    const auth = Auth.fromPrimitives(authCredentialsDto);
    return this.authService.signUp(auth);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsValidator,
  ): Promise<{ accessToken: string }> {
    const auth = Auth.fromPrimitives(authCredentialsDto);
    return this.authService.signIn(auth);
  }
}
