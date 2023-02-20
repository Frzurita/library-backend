import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserTypeOrm } from '../../../shared/infrastructure/user.entity.typeorm';
import { Auth } from '../domain/auth.aggregate';
import { AuthRepository } from '../domain/auth.repository';
import { UserId } from '../../../shared/domain/user/object_values/user.id.value_object';

@Injectable()
export class AuthRepositoryTypeOrm implements AuthRepository {
  constructor(
    @InjectRepository(UserTypeOrm)
    private userEntity: Repository<UserTypeOrm>,
  ) { }
  async signUp(auth: Auth): Promise<void> {
    try {
      const salt = await bcrypt.genSalt();
      const password = await this.hashPassword(auth.password.value, salt);
      await this.userEntity.insert({ email: auth.email.value, password, salt });
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(auth: Auth): Promise<UserId> {
    const { email, password } = auth.toPrimitives();
    const user = await this.userEntity.findOneBy({ email: email });

    if (user && (await user.validatePassword(password))) {
      return new UserId(user.id);
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
