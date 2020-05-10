import { Injectable } from '@nestjs/common';
import { UserService } from '../database/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../database/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

    async register(user: UserDto) {
        let status = {
            success: true,
            message: 'user registered'
        };
        try {
            await this.usersService.register(user);
        } catch (err) {
            status = { success: false, message: err };
        }
        return status;
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByName(username);
        if (user && (await this.usersService.checkPassword(user.password, pass))) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}
