import { Comment } from '../types/comment.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from '../../account.module/entities/account.entity';
import { Account } from '../../account.module/types/account.type';

@Entity({ name: 'comment' })
export class CommentEntity implements Comment {
  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @Column()
  body: string;

  @ManyToOne(() => AccountEntity)
  commentAuthor: Account;

  @ManyToMany(() => CommentEntity)
  comments: Comment[];

  @ManyToOne(() => AccountEntity)
  likedBy: Account[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
