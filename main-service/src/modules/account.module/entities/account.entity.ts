import { Account } from '../types/account.type';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from '../../comment.module/entities/comment.entity';
import { PostEntity } from '../../post.module/entities/post.entity';
import { Role } from '../types/role.enum';
import { Post } from '../../post.module/types/post.type';
import { Comment } from '../../comment.module/types/comment.type';
import {IsEnum} from "class-validator";

@Entity({ name: 'account' })
export class AccountEntity implements Account {
  @PrimaryGeneratedColumn('uuid')
  accountId: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  description: string;

  @Column({ enum: Role , default: Role.STUDENT})
  role: Role;

  @OneToMany(() => CommentEntity, (comment) => comment.commentAuthor)
  comments: Comment[];

  @OneToMany(() => CommentEntity, (comment) => comment.likedBy)
  favoriteComments: Comment[];

  @OneToMany(() => PostEntity, (post) => post.postAuthor)
  posts: Post[];

  @OneToMany(() => PostEntity, (post) => post.likedBy)
  favoritePosts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
