import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({ select: ['id', 'username'] });
    }

    public async findByName(username: string): Promise<UserEntity> {
        return await this.userRepository.findOne({ username });
    }

    public async register(newUser: UserDto): Promise<UserEntity> {
        const { username } = newUser;
        let user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(newUser);
        return await this.userRepository.save(user);
    }

    async checkPassword(attempt: string, password: string): Promise<boolean> {
        return await bcrypt.compare(password, attempt);
    }
}
