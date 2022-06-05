import { CommentEntity } from './entities/comment.entity';

export class CommentMapper {
  mapCommentEntityToComment(comment: CommentEntity) {
    return {};
  }

  mapCommentEntitiesToComments(comments: CommentEntity[]) {
    return comments.map((comment) => this.mapCommentEntityToComment(comment));
  }
}
