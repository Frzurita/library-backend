import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/health_check.controller';
import { AppService } from '../contexts/health_heck/application/app.service';
import { BookController } from './controllers/book/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../contexts/shared/infrastructure/persistence/typeorm/config';
import { Book } from '../contexts/books/infrastructure/book.entity.typeorm';
import { BookProviders } from './providers/book.provider';
import { BookService } from '../contexts/books/application/book.service';
import { User } from '../shared/infrastructure/user.entity.typeorm';
import { AuthService } from '../contexts/auth/application/auth.service';
import { AuthProviders } from './providers/auth.provider';
import { AuthController } from './controllers/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategyJWT } from '../contexts/auth/infrastructure/auth.strategy.service.jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Book, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController, BookController, HealthCheckController],
  providers: [
    AuthStrategyJWT,
    PassportModule,
    AppService,
    BookService,
    AuthService,
    ...AuthProviders,
    ...BookProviders,
  ],
})
export class AppModule { }
