import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { ImageEntity } from '../image/image.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleEntity } from '../article/article.entity';
import { ReleaseEntity } from "../release/release.entity";

@Entity('tag')
export class TagEntity {
    constructor(init?: Partial<TagEntity>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @ApiProperty()
    @PrimaryColumn('varchar', { length: 30 })
    id: string;

    @ApiProperty()
    @Column('varchar', { nullable: true })
    title: string;

    @ApiProperty()
    @Column('text', { nullable: true })
    description: string;

    @ApiProperty({ type: () => ImageEntity })
    @OneToOne(type => ImageEntity, {onDelete: 'CASCADE'})
    @JoinColumn()
    image: ImageEntity;

    @ApiProperty({ type: () => ArticleEntity, isArray: true })
    @ManyToMany(
        type => ArticleEntity,
        article => article.tags,
        { nullable: true }
    )
    @JoinTable()
    articles: ArticleEntity[];
}
