import { Account } from "../types/account.type";
import {Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Post } from "../../post.module/types/post.type";
import { CommentEntity } from "../../comment.module/entities/comment.entity";
import { PostEntity } from "../../post.module/entities/post.entity";
import { Role } from "../types/role.enum";


@Entity({ name: 'accounts' })
export class AccountEntity implements Account {
    @PrimaryGeneratedColumn("uuid")
    accountId: string;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column()
    title: string;

    @Column()
    avatar: string;

    @Column()
    description: string;

    @Column()
    role: Role;

    @OneToMany(() => CommentEntity, (comment) => comment.commentAuthor)
    comments: Comment[];

    @OneToMany(() => CommentEntity, (comment) => comment.likedBy)
    favoriteComments: Comment[];

    @OneToMany(() => PostEntity, (post) => post.postAuthor)
    posts: Post[];

    @Column()
    favoritePosts: Post[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
