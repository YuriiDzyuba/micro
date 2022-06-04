import { Account } from '../../account.module/types/account.type';

export type Comment = {
  commentId: string;

  body: string;

  commentAuthor: Account;

  likedBy: Account[];

  comments: Comment[];

  createdAt: Date;

  updatedAt: Date;
};
