import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}
  async createComment(createCommentDto: CreateCommentDto) {
    const newComment = await this.commentRepository.createComment(
      createCommentDto,
    );
    return newComment;
  }

  async findAllComments() {
    const foundedComments = await this.commentRepository.findAllComments();
    return foundedComments;
  }

  async findOneComment(commentId: string) {
    const foundedComment = await this.commentRepository.findOneComment(
      commentId,
    );
    return foundedComment;
  }

  async updateComment(commentId: string, updateCommentDto: UpdateCommentDto) {
    const updatedComment = await this.commentRepository.updateComment(
      commentId,
      updateCommentDto,
    );
    return updatedComment;
  }

  async removeComment(commentId: string) {
    await this.commentRepository.removeComment(commentId);
  }
}
