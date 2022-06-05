import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentPresenter {
  mapCommentResponse(comment) {
    return { comment };
  }

  mapMenuCommentResponse(comments) {
    return { comments };
  }
}
