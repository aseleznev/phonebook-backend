import { Body, Controller, HttpStatus, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/database/user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDto } from '../database/user/dto/user.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

//@UseGuards(LocalAuthGuard)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersService: UserService) {}

    @Post('register')
    public async register(@Response() res, @Body() userDto: UserDto) {
        const result = await this.authService.register(userDto);
        if (!result.success) {
            return res.status(HttpStatus.BAD_REQUEST).send(result);
        }
        return res.status(HttpStatus.OK).send(result);
    }

    @Post('login')
    @ApiBody({ type: UserDto })
    @ApiOkResponse({ description: 'result Token' })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
