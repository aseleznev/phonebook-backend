import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { UserRO } from './user.ro';

@Entity('tag')
export class UserEntity {
    constructor(init?: Partial<UserEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @ApiProperty()
    @PrimaryColumn('varchar')
    id: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    name: string;

    @ApiProperty()
    @Column('text', { nullable: true })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    toResponseObject(showToken: boolean = true): UserRO {
        const { id, name } = this;
        const responseObject: UserRO = {
            id,
            name
        };

        return responseObject;
    }
}
