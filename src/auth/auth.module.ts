import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../database/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
//import appConfig from '../config/appConfig';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: '3jJjVw0h2zPkZntAtIv5UvDt7gxz4NTcKxVUzn9GtA9fo0vFTlfZXTe2jwzhLw1',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}