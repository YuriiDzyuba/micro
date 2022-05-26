import { Account } from '../../account.module/types/account.type';

export type Post = {
  postId: string;

  body: string;

  postAuthor: Account;

  likedBy: Account[];

  comments: Comment[];

  createdAt: Date;

  updatedAt: Date;
};
