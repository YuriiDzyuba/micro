import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { CommentPresenter } from './comment.presenter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  createComment,
  findAllComments,
  findOneComment,
  updateComment,
  removeComment,
} from './consts/swagger.consts';

@ApiTags('Comment module')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentPresenter: CommentPresenter,
  ) {}

  @ApiOperation(createComment.apiOperation)
  @ApiResponse(createComment.apiResponse)
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(
      createCommentDto,
    );
    return this.commentPresenter.mapCommentResponse(newComment);
  }

  @ApiOperation(findAllComments.apiOperation)
  @ApiResponse(findAllComments.apiResponse)
  @Get()
  async findAllComments() {
    const foundedComments = await this.commentService.findAllComments();
    return this.commentPresenter.mapMenuCommentResponse(foundedComments);
  }

  @ApiOperation(findOneComment.apiOperation)
  @ApiResponse(findOneComment.apiResponse)
  @Get(':commentId')
  async findOneComment(@Param('commentId') commentId: string) {
    const foundedComment = await this.commentService.findOneComment(commentId);
    return this.commentPresenter.mapCommentResponse(foundedComment);
  }

  @ApiOperation(updateComment.apiOperation)
  @ApiResponse(updateComment.apiResponse)
  @Patch(':commentId')
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.commentService.updateComment(
      commentId,
      updateCommentDto,
    );
    return this.commentPresenter.mapCommentResponse(updatedComment);
  }

  @ApiOperation(removeComment.apiOperation)
  @ApiResponse(removeComment.apiResponse)
  @Delete(':commentId')
  async removeComment(@Param('commentId') commentId: string) {
    const removedComment = await this.commentService.removeComment(commentId);
    return this.commentPresenter.mapCommentResponse(removedComment);
  }
}
