import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/shared/domain/user/user.aggregate';

export const GetUser = createParamDecorator((data, req): User => {
  return req.args[0].user || req.user;
});
