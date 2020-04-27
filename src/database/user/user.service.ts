import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    public async findByName(userName: string): Promise<UserEntity> {
        return await this.userRepository.findOne({ name: userName });
    }

    public async findById(id: string): Promise<UserEntity> {
        return await this.userRepository.findOneOrFail(id);
    }

    public async create(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }

    public async update(id: string, newValue: UserEntity): Promise<UserEntity> {
        const user = await this.userRepository.findOneOrFail(id);
        if (!user.id) {
            console.error("User doesn't exist");
        }
        await this.userRepository.update(id, newValue);
        return await this.userRepository.findOne(id);
    }

    public async delete(id: string): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    public async register(newUser: UserEntity): Promise<UserEntity> {
        const { name } = newUser;
        let user = await this.userRepository.findOne({ where: { name } });
        if (!user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(newUser);
        return await this.userRepository.save(user);
    }
}
