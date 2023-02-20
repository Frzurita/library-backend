import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserTypeOrm } from '../../../shared/infrastructure/user.entity.typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../shared/domain/user/user.aggregate';
import { UserId } from '../../../shared/domain/user/object_values/user.id.value_object';

@Injectable()
export class AuthStrategyJWT extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserTypeOrm)
    private userEntity: Repository<UserTypeOrm>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { id: string }): Promise<User> {
    const id = new UserId(payload.id);
    const user = await this.userEntity.findOneBy({ id: id.value });

    if (!user) {
      throw new UnauthorizedException();
    }

    return User.fromPrimitives(user);
  }
}
