import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../database/user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserEntity } from '../database/user/user.entity';
import { UserRO } from '../database/user/user.ro';
import { debug } from 'console';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService) {}

    private readonly logger = new Logger(AuthService.name);

    async register(user: UserEntity) {
        let status: RegistrationStatus = {
            success: true,
            message: 'user register'
        };
        try {
            await this.usersService.register(user);
        } catch (err) {
            //debug(err);
            status = { success: false, message: err };
        }
        return status;
    }

    createToken(user: UserEntity) {
        //debug('get the expiration');
        const expiresIn = 3600;
        //debug('sign the token');
        //debug(user);

        const accessToken = jwt.sign(
            {
                id: user.id,
                name: user.name
            },
            'Codebrains',
            { expiresIn }
        );
        //debug('return the token');
        //debug(accessToken);
        return {
            expiresIn,
            accessToken
        };
    }

    async validateUserToken(payload: JwtPayload): Promise<UserEntity> {
        return await this.usersService.findById(payload.id);
    }
    async validateUser(name: string, password: string): Promise<UserEntity> {
        const user = await this.usersService.findByName(name);
        if (user && (await user.comparePassword(password))) {
            this.logger.log('password check success');
            // const { password, ...result } = user;
            return user;
        }
        return null;
    }
}
