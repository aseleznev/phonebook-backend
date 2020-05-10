import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../database/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '30d' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
