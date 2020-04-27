import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
//import appConfig from '../../config/appConfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '3jJjVw0h2zPkZntAtIv5UvDt7gxz4NTcKxVUzn9GtA9fo0vFTlfZXTe2jwzhLw1',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}