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
import {ApiProperty} from "@nestjs/swagger";

@Entity({ name: 'account' })
export class AccountEntity implements Account {
  @ApiProperty({ example: '51316270-9535-4514-9332-2acdc6b74273', description: 'account primaryGeneratedColumn' })
  @PrimaryGeneratedColumn('uuid')
  accountId: string;

  @ApiProperty({ example: '0b04ae15-7a95-4936-8afa-9ffd172819eb', description: 'bounded user id' })
  @Column()
  userId: string;
  @ApiProperty({ example: 'Pol', description: 'account name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'it is my first account', description: 'account title' })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({ example: 'http://aws-s3/dfdd-dfd-dfd.jpeg', description: 'link to image file' })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({ example: ' simply dummy text of the printing and typesetting industry. Lorem Ipsum has b  ', description: 'account description' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 'STUDENT', description: 'account role ' })
  @Column({ enum: Role , default: Role.STUDENT})
  role: Role;

  @ApiProperty({ example: 'array of comments', description: 'an array of belonging comments' })
  @OneToMany(() => CommentEntity, (comment) => comment.commentAuthor)
  comments: Comment[];

  @ApiProperty({ example: 'array of favorite comments', description: 'an array of favorite comments' })
  @OneToMany(() => CommentEntity, (comment) => comment.likedBy)
  favoriteComments: Comment[];

  @ApiProperty({ example: 'array of posts', description: 'an array of belonging posts' })
  @OneToMany(() => PostEntity, (post) => post.postAuthor)
  posts: Post[];

  @ApiProperty({ example: 'array of favorite posts', description: 'an array of favorite posts' })
  @OneToMany(() => PostEntity, (post) => post.likedBy)
  favoritePosts: Post[];

  @ApiProperty({ example: new Date(), description: 'date of creation' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: new Date(), description: 'date of last update' })
  @UpdateDateColumn()
  updatedAt: Date;
}
