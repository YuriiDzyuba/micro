import { Post } from '../types/post.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../../account.module/types/account.type';
import { AccountEntity } from '../../account.module/entities/account.entity';
import { CommentEntity } from '../../comment.module/entities/comment.entity';

@Entity({ name: 'posts' })
export class PostEntity implements Post {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column()
  body: string;

  @ManyToOne(() => AccountEntity)
  postAuthor: Account;

  @ManyToMany(() => CommentEntity)
  @JoinTable()
  comments: Comment[];

  @ManyToOne(() => AccountEntity)
  likedBy: Account[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
