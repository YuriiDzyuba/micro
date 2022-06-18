import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentPresenter } from './comment.presenter';
import { CommentMapper } from './comment.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository,
    CommentPresenter,
    CommentMapper,
  ],
})
export class CommentModule {}
