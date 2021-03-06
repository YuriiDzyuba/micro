import { Post } from '../../post.module/types/post.type';
import { Role } from './role.enum';
import { Comment } from '../../comment.module/types/comment.type';

export type Account = {
  userId: string;
  accountId: string;
  name: string;
  avatar: string;
  title: string;
  description: string;
  role: Role;
  posts: Post[];
  favoritePosts: Post[];
  comments: Comment[];
  favoriteComments: Comment[];
  createdAt: Date;
  updatedAt: Date;
};
