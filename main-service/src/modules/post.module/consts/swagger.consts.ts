import { PostEntity } from '../entities/post.entity';

export const createPost = {
  apiOperation: {
    summary: 'create new Post ',
  },
  apiResponse: {
    status: 201,
    description: 'created new Post',
    type: PostEntity,
  },
};

export const findAllPosts = {
  apiOperation: {
    summary: 'find many Post',
  },
  apiResponse: {
    status: 200,
    description: 'founded Post',
    type: PostEntity,
  },
};

export const findOnePost = {
  apiOperation: {
    summary: 'update current Post ',
  },
  apiResponse: {
    status: 200,
    description: 'updated Post',
    type: PostEntity,
  },
};

export const updatePost = {
  apiOperation: {
    summary: 'update current Post ',
  },
  apiResponse: {
    status: 200,
    description: 'updated Post',
    type: PostEntity,
  },
};

export const removePost = {
  apiOperation: {
    summary: 'update current Post ',
  },
  apiResponse: {
    status: 200,
    description: 'updated Post',
    type: PostEntity,
  },
};
