import { CreateCommentDto } from './dto/create.comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentMapper } from './comment.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly comment: Repository<CommentEntity>,
    readonly commentMapper: CommentMapper,
  ) {}

  async createComment(commentToSave: CreateCommentDto) {
    const newComment = await this.comment.save(commentToSave);
    return newComment
      ? this.commentMapper.mapCommentEntityToComment(newComment)
      : null;
  }

  async findAllComments() {
    const foundedComments = await this.comment.find();
    return foundedComments
      ? this.commentMapper.mapCommentEntitiesToComments(foundedComments)
      : [];
  }

  async findOneComment(commentId: string) {
    const foundedComment = await this.comment.findOne({ commentId });
    return foundedComment
      ? this.commentMapper.mapCommentEntityToComment(foundedComment)
      : null;
  }

  async updateComment(commentId: string, fieldsToUpdate) {
    const { affected } = await this.comment.update(
      { commentId },
      {
        ...fieldsToUpdate,
      },
    );
    return !!affected;
  }

  async removeComment(commentId: string): Promise<boolean> {
    const { affected } = await this.comment.delete(commentId);
    return !!affected;
  }
}
