import { IsString, MinLength, Matches, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthPassword } from '../../../../contexts/auth/domain/object_values/auth.password.value_object';

export class AuthCredentialsValidator {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Matches(AuthPassword.regexp, {
    message: 'password too weak',
  })
  password: string;
}
