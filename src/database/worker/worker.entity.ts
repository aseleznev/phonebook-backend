import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('worker')
export class WorkerEntity {
    constructor(init?: Partial<WorkerEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @ApiProperty()
    @Column('varchar', { nullable: false })
    cn: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    title: string;

    @ApiProperty()
    @PrimaryColumn('varchar')
    mail: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    l: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    company: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    division: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    departmentNumber: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    telephoneNumber: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    ipPhone: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    mobile: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    facsimileTelephoneNumber: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    description: string;
}
