import { CommentEntity } from '../entities/comment.entity';

export const createComment = {
  apiOperation: {
    summary: 'create new Comment ',
  },
  apiResponse: {
    status: 201,
    description: 'created new Comment',
    type: CommentEntity,
  },
};

export const findAllComments = {
  apiOperation: {
    summary: 'find many Comment',
  },
  apiResponse: {
    status: 200,
    description: 'founded Comment',
    type: CommentEntity,
  },
};

export const findOneComment = {
  apiOperation: {
    summary: 'update current Comment ',
  },
  apiResponse: {
    status: 200,
    description: 'updated Comment',
    type: CommentEntity,
  },
};

export const updateComment = {
  apiOperation: {
    summary: 'update current Comment ',
  },
  apiResponse: {
    status: 200,
    description: 'updated Comment',
    type: CommentEntity,
  },
};

export const removeComment = {
  apiOperation: {
    summary: 'update current Comment ',
  },
  apiResponse: {
    status: 200,
    description: 'updated Comment',
    type: CommentEntity,
  },
};
